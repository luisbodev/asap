import { mockTendencias } from "@/lib/mocks/cmm.mock";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingDown, TrendingUp } from "lucide-react";

export function MonitoreoTendencias() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Monitoreo de Tendencias</CardTitle>
        <CardDescription>Actividad reciente de competidores</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[220px] pr-3">
          <ul className="space-y-3">
            {mockTendencias.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-2 rounded-md border p-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.titulo}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.competidor}
                  </p>
                </div>
                <Badge
                  variant={item.cambio >= 0 ? "default" : "destructive"}
                  className="shrink-0 gap-1"
                >
                  {item.cambio >= 0 ? (
                    <TrendingUp className="size-3" />
                  ) : (
                    <TrendingDown className="size-3" />
                  )}
                  {item.cambio > 0 ? "+" : ""}
                  {item.cambio}%
                </Badge>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
