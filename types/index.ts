export type Plataforma = "instagram" | "tiktok" | "facebook";

export type TendenciaDireccion = "subiendo" | "estable" | "bajando";

export interface DatosRendimiento {
  seguidores: number;
  engagementRate: number;
  postsRecientes: number;
  tendencia: TendenciaDireccion;
}

export interface Competencia {
  id: string;
  nombre: string;
  plataforma: Plataforma;
  metricas: DatosRendimiento;
}

export interface TendenciaItem {
  id: string;
  titulo: string;
  competidor: string;
  cambio: number;
  fecha: string;
}

export type Sentiment = "positivo" | "neutral" | "negativo";

export interface Comentario {
  id: string;
  autor: string;
  texto: string;
  plataforma: string;
  sentiment: Sentiment;
  fecha: string;
  respondido: boolean;
}

export type TipoContenido = "foto" | "video";

export type EstadoContenido =
  | "pendiente"
  | "aprobado"
  | "rechazado"
  | "feedback_requerido";

export interface SugerenciaContenido {
  id: string;
  tipo: TipoContenido;
  titulo: string;
  copy: string;
  imagenUrl_mock: string;
  shortGuideline: string;
  estado: EstadoContenido;
  feedback?: string;
  createdAt: string;
}

export interface AssetEnTrabajo {
  id: string;
  titulo: string;
  tipo: TipoContenido;
  progreso: number;
}
