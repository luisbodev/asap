import { NextResponse } from "next/server";
import { z } from "zod";
import { generarImagenN8n } from "@/lib/services/n8nService";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const bodySchema = z.object({
  prompt: z.string().min(1),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Payload inválido", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const result = await generarImagenN8n(parsed.data);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 503 });
  }

  if (result.kind === "stream") {
    const headers: Record<string, string> = {
      "Content-Type": result.mime,
      "Content-Disposition": `inline; filename="${result.fileName}"`,
      "Cache-Control": "no-store",
    };

    if (result.contentLength) {
      headers["Content-Length"] = String(result.contentLength);
    }

    return new NextResponse(result.body, { status: 200, headers });
  }

  if (result.kind === "binary") {
    return new NextResponse(new Uint8Array(result.buffer), {
      status: 200,
      headers: {
        "Content-Type": result.mime,
        "Content-Length": String(result.buffer.length),
        "Content-Disposition": `inline; filename="${result.fileName}"`,
        "Cache-Control": "no-store",
      },
    });
  }

  return NextResponse.json({ ok: true, imageUrl: result.imageUrl });
}
