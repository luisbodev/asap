import "server-only";
import { z } from "zod";

const envSchema = z.object({
  N8N_WEBHOOK_SECRET: z.string().min(1).optional(),
  OPENAI_API_KEY: z.string().min(1).optional(),
  META_ACCESS_TOKEN: z.string().min(1).optional(),
  META_PAGE_ID: z.string().optional(),
  USE_MOCK_APIS: z.preprocess(
    (val) => {
      if (val === undefined || val === "") return true;
      return val === "true" || val === "1";
    },
    z.boolean()
  ),
});

function parseEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("Invalid environment variables:", result.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  return result.data;
}

export const env = parseEnv();

export function assertServerOnly(): void {
  // Documentación: este módulo no debe importarse desde componentes "use client".
}

export function isOpenAIConfigured(): boolean {
  return !env.USE_MOCK_APIS && Boolean(env.OPENAI_API_KEY);
}

export function isMetaConfigured(): boolean {
  return !env.USE_MOCK_APIS && Boolean(env.META_ACCESS_TOKEN);
}

export function isWebhookSecretConfigured(): boolean {
  return Boolean(env.N8N_WEBHOOK_SECRET);
}
