import { mockCompetencias } from "@/lib/mocks/cmm.mock";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tendenciaLabel = {
  subiendo: { label: "Subiendo", variant: "default" as const },
  estable: { label: "Estable", variant: "secondary" as const },
  bajando: { label: "Bajando", variant: "destructive" as const },
};

export function Rendimiento() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Rendimiento</CardTitle>
        <CardDescription>Métricas de competencia</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockCompetencias.map((comp) => (
          <div
            key={comp.id}
            className="rounded-md border p-3 space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium">{comp.nombre}</p>
              <Badge variant="outline" className="capitalize">
                {comp.plataforma}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <span>
                Seguidores:{" "}
                <strong className="text-foreground">
                  {comp.metricas.seguidores.toLocaleString("es-MX")}
                </strong>
              </span>
              <span>
                Engagement:{" "}
                <strong className="text-foreground">
                  {comp.metricas.engagementRate}%
                </strong>
              </span>
              <span>
                Posts:{" "}
                <strong className="text-foreground">
                  {comp.metricas.postsRecientes}
                </strong>
              </span>
              <Badge variant={tendenciaLabel[comp.metricas.tendencia].variant}>
                {tendenciaLabel[comp.metricas.tendencia].label}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
