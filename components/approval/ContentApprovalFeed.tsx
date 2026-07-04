import { mockContenidosPendientes } from "@/lib/mocks/approval.mock";
import { ContentCard } from "@/components/approval/ContentCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ContentApprovalFeed() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Contenido pendiente de revisión</CardTitle>
        <CardDescription>
          {mockContenidosPendientes.length} piezas en cola
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea className="h-[600px] pr-3">
          <div className="space-y-4">
            {mockContenidosPendientes.map((contenido) => (
              <ContentCard key={contenido.id} contenido={contenido} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
