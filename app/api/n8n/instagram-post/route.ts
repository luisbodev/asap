import { NextResponse } from "next/server";
import { z } from "zod";
import { enviarPostInstagramN8n } from "@/lib/services/n8nService";

const bodySchema = z.object({
  imageUrl: z.string().url(),
  caption: z.string().min(1),
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

  const result = await enviarPostInstagramN8n(parsed.data);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true, status: result.status });
}
