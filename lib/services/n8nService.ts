import "server-only";
import { env } from "@/lib/config/env";

export interface InstagramPostPayload {
  imageUrl: string;
  caption: string;
}

export interface GenerateImagePayload {
  prompt: string;
}

const MOCK_IMAGE_URL =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";

const N8N_IMAGE_TIMEOUT_MS = 110_000;

export type GenerateImageResult =
  | { ok: true; kind: "url"; imageUrl: string }
  | { ok: true; kind: "binary"; buffer: Buffer; mime: string; fileName: string }
  | {
      ok: true;
      kind: "stream";
      body: ReadableStream<Uint8Array>;
      mime: string;
      fileName: string;
      contentLength?: number;
    }
  | { ok: false; error: string };

interface N8nBinaryFileMeta {
  mimeType?: string;
  fileType?: string;
  fileExtension?: string;
  fileName?: string;
  id?: string;
  bytes?: number;
  data?: string;
}

function parseImageMime(contentType: string | null): string {
  if (!contentType) return "image/png";
  const mime = contentType.split(";")[0].trim().toLowerCase();
  return mime.startsWith("image/") ? mime : "image/png";
}

function detectImageMimeFromBuffer(buffer: Buffer): string {
  if (
    buffer.length >= 4 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return "image/png";
  }

  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }

  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "image/webp";
  }

  return "image/png";
}

function buildFileName(meta: N8nBinaryFileMeta, mime: string): string {
  const base = meta.fileName ?? "data";
  const ext = meta.fileExtension ?? mime.split("/")[1] ?? "png";
  return base.includes(".") ? base : `${base}.${ext}`;
}

function parseBinaryFileName(
  contentDisposition: string | null,
  mime: string
): string {
  if (contentDisposition) {
    const match = contentDisposition.match(/filename\*?=(?:UTF-8''|")?([^";]+)/i);
    if (match?.[1]) return decodeURIComponent(match[1].trim());
  }

  const extension = mime.split("/")[1] ?? "png";
  return `data.${extension}`;
}

function extractImageUrl(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;

  const obj = data as Record<string, unknown>;

  if (typeof obj.url === "string" && obj.url) return obj.url;
  if (typeof obj.imageUrl === "string" && obj.imageUrl) return obj.imageUrl;

  if (typeof obj.b64_json === "string" && obj.b64_json) {
    return `data:image/png;base64,${obj.b64_json}`;
  }

  if (Array.isArray(obj.data) && obj.data[0] && typeof obj.data[0] === "object") {
    const first = obj.data[0] as Record<string, unknown>;
    if (typeof first.url === "string" && first.url) return first.url;
    if (typeof first.b64_json === "string" && first.b64_json) {
      return `data:image/png;base64,${first.b64_json}`;
    }
  }

  return null;
}

function getN8nBinaryFileMeta(data: unknown): N8nBinaryFileMeta | null {
  const candidates = Array.isArray(data) ? data : [data];

  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== "object") continue;

    const meta = candidate as N8nBinaryFileMeta;
    if (meta.mimeType?.startsWith("image/") || meta.fileType === "image") {
      return meta;
    }
  }

  return null;
}

function splitJsonAndTrailingBinary(
  buffer: Buffer
): { json: unknown; trailing: Buffer } | null {
  let depth = 0;
  let inString = false;
  let escaped = false;
  let started = false;
  let jsonEnd = -1;

  for (let i = 0; i < buffer.length; i++) {
    const char = String.fromCharCode(buffer[i]);

    if (!started) {
      if (char === "[" || char === "{") started = true;
      else continue;
    }

    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === "[" || char === "{") depth++;
    if (char === "]" || char === "}") {
      depth--;
      if (depth === 0) {
        jsonEnd = i;
        break;
      }
    }
  }

  if (jsonEnd === -1) return null;

  const jsonBuffer = buffer.subarray(0, jsonEnd + 1);
  const trailing = buffer.subarray(jsonEnd + 1);

  try {
    return { json: JSON.parse(jsonBuffer.toString("utf-8")), trailing };
  } catch {
    return null;
  }
}

function findImageStart(buffer: Buffer): number {
  for (let i = 0; i < buffer.length - 4; i++) {
    if (buffer[i] === 0x89 && buffer[i + 1] === 0x50 && buffer[i + 2] === 0x4e && buffer[i + 3] === 0x47) {
      return i;
    }
    if (buffer[i] === 0xff && buffer[i + 1] === 0xd8 && buffer[i + 2] === 0xff) {
      return i;
    }
  }
  return -1;
}

function binaryFromMetaAndTrailing(
  meta: N8nBinaryFileMeta,
  trailing: Buffer
): Buffer | null {
  if (typeof meta.data === "string" && meta.data.length > 0 && meta.data !== "filesystem-v2") {
    return Buffer.from(meta.data, "base64");
  }

  if (trailing.length === 0) return null;

  const expected = typeof meta.bytes === "number" ? meta.bytes : trailing.length;
  return trailing.length >= expected ? trailing.subarray(0, expected) : trailing;
}

function binaryResultFromBuffer(
  imageBuffer: Buffer,
  meta: N8nBinaryFileMeta | null,
  contentDisposition: string | null,
  fallbackMime?: string
): GenerateImageResult {
  const mime =
    meta?.mimeType ??
    fallbackMime ??
    detectImageMimeFromBuffer(imageBuffer);

  const fileName = meta
    ? buildFileName(meta, mime)
    : parseBinaryFileName(contentDisposition, mime);

  return {
    ok: true,
    kind: "binary",
    buffer: imageBuffer,
    mime,
    fileName,
  };
}

async function fetchN8nBinaryById(
  binaryId: string,
  webhookUrl: string
): Promise<Buffer | null> {
  const origin = new URL(webhookUrl).origin;
  const url = `${origin}/rest/binary-data?id=${encodeURIComponent(binaryId)}`;

  const headers: Record<string, string> = {};
  if (env.N8N_API_KEY) {
    headers["X-N8N-API-KEY"] = env.N8N_API_KEY;
  }

  try {
    const respuesta = await fetch(url, { headers });
    if (!respuesta.ok) {
      console.error("No se pudo descargar binary-data de n8n:", respuesta.status, url);
      return null;
    }

    return Buffer.from(await respuesta.arrayBuffer());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error("Error descargando binary-data de n8n:", message);
    return null;
  }
}

async function resolveN8nBinaryMeta(
  meta: N8nBinaryFileMeta,
  trailing: Buffer,
  webhookUrl: string,
  contentDisposition: string | null
): Promise<GenerateImageResult | null> {
  const inlineBuffer = binaryFromMetaAndTrailing(meta, trailing);
  if (inlineBuffer && inlineBuffer.length > 0) {
    return binaryResultFromBuffer(inlineBuffer, meta, contentDisposition);
  }

  if (meta.id?.startsWith("filesystem-v2:")) {
    if (!env.N8N_API_KEY) {
      console.error("n8n devolvió metadatos binary sin N8N_API_KEY configurada");
      return null;
    }

    const remoteBuffer = await fetchN8nBinaryById(meta.id, webhookUrl);
    if (remoteBuffer && remoteBuffer.length > 0) {
      return binaryResultFromBuffer(remoteBuffer, meta, contentDisposition);
    }
  }

  return null;
}

async function parseN8nImageResponse(
  buffer: Buffer,
  contentType: string | null,
  contentDisposition: string | null,
  webhookUrl: string
): Promise<GenerateImageResult> {
  if (buffer.length === 0) {
    return { ok: false, error: "Respuesta vacía de n8n" };
  }

  if (contentType?.toLowerCase().startsWith("image/")) {
    const mime = parseImageMime(contentType);
    return binaryResultFromBuffer(buffer, null, contentDisposition, mime);
  }

  const split = splitJsonAndTrailingBinary(buffer);
  if (split) {
    const imageUrl = extractImageUrl(split.json);
    if (imageUrl) return { ok: true, kind: "url", imageUrl };

    const meta = getN8nBinaryFileMeta(split.json);
    if (meta) {
      const resolved = await resolveN8nBinaryMeta(
        meta,
        split.trailing,
        webhookUrl,
        contentDisposition
      );
      if (resolved) return resolved;
    }
  }

  try {
    const data: unknown = JSON.parse(buffer.toString("utf-8"));
    const imageUrl = extractImageUrl(data);
    if (imageUrl) return { ok: true, kind: "url", imageUrl };

    const meta = getN8nBinaryFileMeta(data);
    if (meta) {
      const resolved = await resolveN8nBinaryMeta(
        meta,
        Buffer.alloc(0),
        webhookUrl,
        contentDisposition
      );
      if (resolved) return resolved;
    }
  } catch {
    // Not pure JSON — fall through to embedded binary detection.
  }

  const imageStart = findImageStart(buffer);
  if (imageStart >= 0) {
    return binaryResultFromBuffer(
      buffer.subarray(imageStart),
      null,
      contentDisposition
    );
  }

  if (!contentType?.includes("application/json")) {
    return binaryResultFromBuffer(buffer, null, contentDisposition);
  }

  return {
    ok: false,
    error:
      "n8n devolvió metadatos sin imagen. En el nodo Respond to Webhook usa modo Binary (propiedad data).",
  };
}

function streamResultFromResponse(
  respuesta: Response,
  contentDisposition: string | null
): GenerateImageResult {
  const contentType = respuesta.headers.get("content-type");
  const mime = parseImageMime(contentType);

  if (!respuesta.body) {
    return { ok: false, error: "Respuesta de n8n sin cuerpo" };
  }

  const contentLengthHeader = respuesta.headers.get("content-length");
  const contentLength = contentLengthHeader ? Number(contentLengthHeader) : undefined;

  return {
    ok: true,
    kind: "stream",
    body: respuesta.body,
    mime,
    fileName: parseBinaryFileName(contentDisposition, mime),
    contentLength: Number.isFinite(contentLength) ? contentLength : undefined,
  };
}

export async function enviarPostInstagramN8n(
  payload: InstagramPostPayload
): Promise<{ ok: true; status: number } | { ok: false; error: string }> {
  const webhookUrl = env.N8N_INSTAGRAM_WEBHOOK_URL;

  if (!webhookUrl) {
    if (env.USE_MOCK_APIS) {
      console.log("[mock] n8n instagram-post:", payload);
      return { ok: true, status: 200 };
    }
    return { ok: false, error: "N8N_INSTAGRAM_WEBHOOK_URL no configurada" };
  }

  try {
    const respuesta = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!respuesta.ok) {
      return { ok: false, error: `n8n respondió con status ${respuesta.status}` };
    }

    console.log("Enviado a n8n:", respuesta.status);
    return { ok: true, status: respuesta.status };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error("Error enviando a n8n:", message);
    return { ok: false, error: message };
  }
}

export async function generarImagenN8n(
  payload: GenerateImagePayload
): Promise<GenerateImageResult> {
  const webhookUrl = env.N8N_IMAGE_GENERATION_WEBHOOK_URL;

  if (!webhookUrl) {
    if (env.USE_MOCK_APIS) {
      console.log("[mock] n8n generate-image:", payload);
      return { ok: true, kind: "url", imageUrl: MOCK_IMAGE_URL };
    }
    return { ok: false, error: "N8N_IMAGE_GENERATION_WEBHOOK_URL no configurada" };
  }

  try {
    const respuesta = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: payload.prompt }),
      signal: AbortSignal.timeout(N8N_IMAGE_TIMEOUT_MS),
    });

    if (!respuesta.ok) {
      return { ok: false, error: `n8n respondió con status ${respuesta.status}` };
    }

    const contentType = respuesta.headers.get("content-type");
    const contentDisposition = respuesta.headers.get("content-disposition");

    if (contentType?.toLowerCase().startsWith("image/")) {
      return streamResultFromResponse(respuesta, contentDisposition);
    }

    const buffer = Buffer.from(await respuesta.arrayBuffer());
    const parsed = await parseN8nImageResponse(
      buffer,
      contentType,
      contentDisposition,
      webhookUrl
    );

    if (!parsed.ok) {
      console.error("Respuesta n8n no procesable:", {
        contentType,
        contentDisposition,
        size: buffer.length,
      });
    }

    return parsed;
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      return {
        ok: false,
        error: "Tiempo de espera agotado generando la imagen. Intenta de nuevo.",
      };
    }

    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error("Error generando imagen con n8n:", message);
    return { ok: false, error: message };
  }
}
