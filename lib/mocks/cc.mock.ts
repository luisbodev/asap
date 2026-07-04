import type { AssetEnTrabajo, SugerenciaContenido } from "@/types";

export const mockSugerenciasRecientes: SugerenciaContenido[] = [
  {
    id: "sug1",
    tipo: "foto",
    titulo: "Flat lay productos bestseller",
    copy: "Tus favoritos en un solo frame. ¿Cuál es el tuyo?",
    imagenUrl_mock: "https://picsum.photos/seed/cc1/400/300",
    shortGuideline: "Flat lay minimalista, fondo neutro.",
    estado: "aprobado",
    createdAt: "2026-07-01T10:00:00",
  },
  {
    id: "sug2",
    tipo: "video",
    titulo: "Tips de estilo en 30 segundos",
    copy: "3 formas de combinar tu pieza ASAP favorita. Guarda este reel.",
    imagenUrl_mock: "https://picsum.photos/seed/cc2/400/300",
    shortGuideline: "Reel educativo, texto on-screen.",
    estado: "pendiente",
    createdAt: "2026-07-02T14:00:00",
  },
];

export const mockAssetsEnTrabajo: AssetEnTrabajo[] = [
  {
    id: "a1",
    titulo: "Carrusel lanzamiento verano",
    tipo: "foto",
    progreso: 75,
  },
  {
    id: "a2",
    titulo: "Reel unboxing edición limitada",
    tipo: "video",
    progreso: 40,
  },
  {
    id: "a3",
    titulo: "Stories promoción flash",
    tipo: "foto",
    progreso: 90,
  },
];
