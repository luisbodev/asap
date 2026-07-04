import type { SugerenciaContenido } from "@/types";

export const mockContenidosPendientes: SugerenciaContenido[] = [
  {
    id: "cnt1",
    tipo: "foto",
    titulo: "Lanzamiento colección verano",
    copy: "El verano llegó a ASAP. Descubre piezas frescas que combinan contigo. #ASAPStyle #Verano2026",
    imagenUrl_mock: "https://picsum.photos/seed/asap1/400/300",
    shortGuideline: "Foto lifestyle, luz natural, paleta cálida.",
    estado: "pendiente",
    createdAt: "2026-07-04T08:00:00",
  },
  {
    id: "cnt2",
    tipo: "video",
    titulo: "Behind the scenes — producción",
    copy: "Así creamos cada detalle. Un vistazo exclusivo a nuestro proceso creativo.",
    imagenUrl_mock: "https://picsum.photos/seed/asap2/400/300",
    shortGuideline: "Video vertical 15s, transiciones dinámicas.",
    estado: "pendiente",
    createdAt: "2026-07-03T16:30:00",
  },
  {
    id: "cnt3",
    tipo: "foto",
    titulo: "Testimonial cliente del mes",
    copy: "María nos cuenta por qué eligió ASAP. Historias reales, conexiones auténticas.",
    imagenUrl_mock: "https://picsum.photos/seed/asap3/400/300",
    shortGuideline: "Formato cuadrado, quote overlay legible.",
    estado: "feedback_requerido",
    feedback: "El copy es muy largo para Instagram. Acortar a 120 caracteres.",
    createdAt: "2026-07-02T11:00:00",
  },
];
