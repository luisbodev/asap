import type { Comentario, Competencia, TendenciaItem } from "@/types";

export const mockTendencias: TendenciaItem[] = [
  {
    id: "t1",
    titulo: "Reels de recetas rápidas",
    competidor: "FreshBite MX",
    cambio: 18.4,
    fecha: "2026-07-04",
  },
  {
    id: "t2",
    titulo: "Campaña de verano #ASAPStyle",
    competidor: "UrbanWear Co",
    cambio: 12.1,
    fecha: "2026-07-03",
  },
  {
    id: "t3",
    titulo: "Live shopping viernes",
    competidor: "ModaDirecta",
    cambio: -4.2,
    fecha: "2026-07-02",
  },
  {
    id: "t4",
    titulo: "Tutorial unboxing",
    competidor: "TechNova",
    cambio: 7.8,
    fecha: "2026-07-01",
  },
];

export const mockCompetencias: Competencia[] = [
  {
    id: "c1",
    nombre: "FreshBite MX",
    plataforma: "instagram",
    metricas: {
      seguidores: 84200,
      engagementRate: 4.8,
      postsRecientes: 12,
      tendencia: "subiendo",
    },
  },
  {
    id: "c2",
    nombre: "UrbanWear Co",
    plataforma: "tiktok",
    metricas: {
      seguidores: 156000,
      engagementRate: 6.2,
      postsRecientes: 8,
      tendencia: "estable",
    },
  },
  {
    id: "c3",
    nombre: "ModaDirecta",
    plataforma: "facebook",
    metricas: {
      seguidores: 42100,
      engagementRate: 2.1,
      postsRecientes: 5,
      tendencia: "bajando",
    },
  },
];

export const mockComentarios: Comentario[] = [
  {
    id: "cm1",
    autor: "maria_g",
    texto: "¡Me encantó el reel de ayer! ¿Tienen más colores?",
    plataforma: "instagram",
    sentiment: "positivo",
    fecha: "2026-07-04T10:30:00",
    respondido: false,
  },
  {
    id: "cm2",
    autor: "carlos_r",
    texto: "El envío tardó más de lo prometido.",
    plataforma: "facebook",
    sentiment: "negativo",
    fecha: "2026-07-04T09:15:00",
    respondido: false,
  },
  {
    id: "cm3",
    autor: "ana_p",
    texto: "¿Cuándo sale la nueva colección?",
    plataforma: "tiktok",
    sentiment: "neutral",
    fecha: "2026-07-03T18:45:00",
    respondido: true,
  },
  {
    id: "cm4",
    autor: "luis_t",
    texto: "Excelente atención al cliente, gracias.",
    plataforma: "instagram",
    sentiment: "positivo",
    fecha: "2026-07-03T14:20:00",
    respondido: false,
  },
];
