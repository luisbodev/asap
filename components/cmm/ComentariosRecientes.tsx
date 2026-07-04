"use client";

import { useState } from "react";
import { mockComentarios } from "@/lib/mocks/cmm.mock";
import type { Comentario, Sentiment } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageSquareReply } from "lucide-react";

const sentimentConfig: Record<
  Sentiment,
  { label: string; variant: "default" | "secondary" | "destructive" }
> = {
  positivo: { label: "Positivo", variant: "default" },
  neutral: { label: "Neutral", variant: "secondary" },
  negativo: { label: "Negativo", variant: "destructive" },
};

const respuestasSugeridas: Record<Sentiment, string> = {
  positivo:
    "¡Gracias por tu mensaje! Nos alegra que te haya gustado. Pronto tendremos novedades.",
  neutral:
    "¡Hola! La nueva colección se anunciará pronto en nuestras redes. ¡Síguenos para no perdértela!",
  negativo:
    "Lamentamos la experiencia. Escríbenos por DM con tu número de pedido y te ayudamos de inmediato.",
};

function formatFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ComentariosRecientes() {
  const [comentarios, setComentarios] = useState(mockComentarios);
  const [selected, setSelected] = useState<Comentario | null>(null);
  const [respuesta, setRespuesta] = useState("");

  function abrirDialog(comentario: Comentario) {
    setSelected(comentario);
    setRespuesta(respuestasSugeridas[comentario.sentiment]);
  }

  function cerrarDialog() {
    setSelected(null);
    setRespuesta("");
  }

  function enviarRespuesta() {
    if (!selected) return;
    setComentarios((prev) =>
      prev.map((c) =>
        c.id === selected.id ? { ...c, respondido: true } : c
      )
    );
    cerrarDialog();
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Comentarios Recientes</CardTitle>
          <CardDescription>
            Hover o tap para ver acciones (demo)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[240px] pr-3">
            <ul className="space-y-2">
              {comentarios.map((comentario) => (
                <li
                  key={comentario.id}
                  className="group rounded-md border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          @{comentario.autor}
                        </span>
                        <Badge
                          variant={
                            sentimentConfig[comentario.sentiment].variant
                          }
                          className="text-[10px]"
                        >
                          {sentimentConfig[comentario.sentiment].label}
                        </Badge>
                        {comentario.respondido && (
                          <Badge variant="outline" className="text-[10px]">
                            Respondido
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {comentario.texto}
                      </p>
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        {comentario.plataforma} · {formatFecha(comentario.fecha)}
                      </p>
                    </div>
                    {!comentario.respondido && (
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => abrirDialog(comentario)}
                              className="opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                            />
                          }
                        >
                          <MessageSquareReply className="size-4" />
                        </TooltipTrigger>
                        <TooltipContent>Responder</TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && cerrarDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Responder comentario</DialogTitle>
            <DialogDescription>
              Respuesta sugerida por IA (simulada). Edita antes de enviar.
            </DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-3">
              <p className="rounded-md bg-muted p-3 text-sm">
                {selected.texto}
              </p>
              <Textarea
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
                rows={4}
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={cerrarDialog}>
              Cancelar
            </Button>
            <Button onClick={enviarRespuesta} disabled={!respuesta.trim()}>
              Enviar respuesta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
