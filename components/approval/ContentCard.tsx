"use client";

import { useState } from "react";
import type { EstadoContenido, SugerenciaContenido } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";

const estadoConfig: Record<
  EstadoContenido,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  pendiente: { label: "Pendiente", variant: "secondary" },
  aprobado: { label: "Aprobado", variant: "default" },
  rechazado: { label: "Rechazado", variant: "destructive" },
  feedback_requerido: { label: "Revisión CC", variant: "outline" },
};

interface ContentCardProps {
  contenido: SugerenciaContenido;
}

export function ContentCard({ contenido: initial }: ContentCardProps) {
  const [contenido, setContenido] = useState(initial);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isActionable =
    contenido.estado === "pendiente" || contenido.estado === "feedback_requerido";

  function handleAprobar() {
    setContenido((prev) => ({ ...prev, estado: "aprobado" }));
    setShowFeedback(false);
    setError(null);
  }

  function handleRechazarClick() {
    setShowFeedback(true);
    setError(null);
  }

  function handleConfirmarRechazo() {
    if (!feedback.trim()) {
      setError("El feedback es obligatorio al rechazar contenido.");
      return;
    }
    setContenido((prev) => ({
      ...prev,
      estado: "feedback_requerido",
      feedback: feedback.trim(),
    }));
    setShowFeedback(false);
    setError(null);
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">{contenido.titulo}</CardTitle>
            <CardDescription className="capitalize">
              {contenido.tipo} ·{" "}
              {new Date(contenido.createdAt).toLocaleDateString("es-MX")}
            </CardDescription>
          </div>
          <Badge variant={estadoConfig[contenido.estado].variant}>
            {estadoConfig[contenido.estado].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
          <Image
            src={contenido.imagenUrl_mock}
            alt={contenido.titulo}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <p className="text-sm">{contenido.copy}</p>
        <p className="text-xs text-muted-foreground">
          {contenido.shortGuideline}
        </p>
        {contenido.feedback && (
          <Alert>
            <AlertDescription>
              <span className="font-medium">Feedback CMM:</span>{" "}
              {contenido.feedback}
            </AlertDescription>
          </Alert>
        )}
        {showFeedback && (
          <div className="space-y-2">
            <Textarea
              placeholder="Describe qué debe cambiar CC..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
            />
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
      {isActionable && (
        <CardFooter className="gap-2">
          {!showFeedback ? (
            <>
              <Button onClick={handleAprobar}>Aprobar</Button>
              <Button variant="outline" onClick={handleRechazarClick}>
                Rechazar
              </Button>
            </>
          ) : (
            <>
              <Button variant="destructive" onClick={handleConfirmarRechazo}>
                Confirmar rechazo
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setShowFeedback(false);
                  setFeedback("");
                  setError(null);
                }}
              >
                Cancelar
              </Button>
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
