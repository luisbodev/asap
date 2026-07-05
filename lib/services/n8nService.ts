import "server-only";
import { env } from "@/lib/config/env";

export interface InstagramPostPayload {
  imageUrl: string;
  caption: string;
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
