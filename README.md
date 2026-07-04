# ASAP

**ASAP** es una plataforma demo que unifica dos roles: **CMM** (Community/Media Manager) y **Content Creator (CC)**.

Repositorio: [github.com/luisbodev/asap](https://github.com/luisbodev/asap)

## Stack

- Next.js 15 (App Router)
- TypeScript
- [shadcn/ui](https://ui.shadcn.com/) + Tailwind CSS
- APIs simuladas (modo demo por defecto)

**Requisito:** Node.js >= 20.19.0 (ver `.nvmrc`).

## Instalación

```bash
nvm use          # usa Node 20.19.0 desde .nvmrc
npm install
cp .env.example .env.local   # opcional — la app arranca en modo mock sin este archivo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Copia `.env.example` a `.env.local` y configura solo lo necesario. **Nunca** commitees `.env.local`.

| Variable | Descripción |
|----------|-------------|
| `N8N_WEBHOOK_SECRET` | Secret para validar `POST /api/monitoring` (Fase 2+) |
| `OPENAI_API_KEY` | Clave OpenAI — solo servidor (Fase 3+) |
| `META_ACCESS_TOKEN` | Token Meta Graph API — solo servidor (Fase 5+) |
| `META_PAGE_ID` | ID de página Meta (Fase 5+) |
| `USE_MOCK_APIS` | `true` (default) simula integraciones; `false` usa APIs reales si hay keys |

Las API keys **nunca** deben usar el prefijo `NEXT_PUBLIC_`. Solo se leen en el servidor vía `lib/config/env.ts`.

### Ejemplo: webhook autenticado (Fase 2+)

```bash
curl -X POST http://localhost:3000/api/monitoring \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tu-secreto-n8n" \
  -d '{"tipo":"tendencia","data":{"titulo":"Test","competidor":"Demo","cambio":5}}'
```

## Fases de desarrollo

1. **Fase 1** — Dashboard 3 columnas con mocks y shadcn/ui
2. **Fase 2** — Monitoreo CMM + webhook n8n
3. **Fase 3** — Generación de contenido CC
4. **Fase 4** — Bucle de aprobación CMM ↔ CC
5. **Fase 5** — Comentarios sociales + Meta API simulada

> Los datos en memoria se pierden al reiniciar el servidor — comportamiento esperado en la demo.

## Licencia

_Por definir._
