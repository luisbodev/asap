"use client";

import { useState } from "react";
import { mockSugerenciasRecientes } from "@/lib/mocks/cc.mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";

export function SugerenciasContenido() {
  const [tema, setTema] = useState("");
  const [loading, setLoading] = useState(false);

  function handleGenerar() {
    if (!tema.trim()) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Sugerencias de Contenido</CardTitle>
        <CardDescription>
          Genera ideas con IA (simulado en Fase 1)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Tema del contenido..."
            value={tema}
            onChange={(e) => setTema(e.target.value)}
          />
          <Button
            onClick={handleGenerar}
            disabled={!tema.trim() || loading}
            className="shrink-0"
          >
            <Sparkles className="size-4" />
            Generar
          </Button>
        </div>

        {loading && (
          <div className="space-y-2 rounded-md border p-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="aspect-video w-full rounded-md" />
          </div>
        )}

        <ul className="space-y-3">
          {mockSugerenciasRecientes.map((sug) => (
            <li
              key={sug.id}
              className="rounded-md border p-3 space-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium">{sug.titulo}</p>
                <Badge variant="outline" className="capitalize">
                  {sug.tipo}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {sug.copy}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
