import { mockAssetsEnTrabajo } from "@/lib/mocks/cc.mock";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AssetList() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Activos en trabajo</CardTitle>
        <CardDescription>Progreso de piezas en producción</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockAssetsEnTrabajo.map((asset) => (
          <div key={asset.id} className="space-y-2 rounded-md border p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium">{asset.titulo}</p>
              <Badge variant="outline" className="capitalize">
                {asset.tipo}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progreso</span>
                <span>{asset.progreso}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${asset.progreso}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
