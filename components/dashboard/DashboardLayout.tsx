import { MonitoreoTendencias } from "@/components/cmm/MonitoreoTendencias";
import { Rendimiento } from "@/components/cmm/Rendimiento";
import { ComentariosRecientes } from "@/components/cmm/ComentariosRecientes";
import { ContentApprovalFeed } from "@/components/approval/ContentApprovalFeed";
import { SugerenciasContenido } from "@/components/cc/SugerenciasContenido";
import { AssetList } from "@/components/cc/AssetList";
import { Separator } from "@/components/ui/separator";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 lg:px-6">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">ASAP</h1>
            <p className="text-sm text-muted-foreground">
              Plataforma demo — CMM + Content Creator
            </p>
          </div>
          <span className="rounded-md bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            Modo demo
          </span>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12 lg:px-6">
        <section className="flex flex-col gap-4 lg:col-span-3">
          <div>
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              CMM
            </h2>
            <p className="text-xs text-muted-foreground">
              Monitoreo, rendimiento y comentarios
            </p>
          </div>
          <MonitoreoTendencias />
          <Rendimiento />
          <ComentariosRecientes />
        </section>

        <section className="flex flex-col gap-4 lg:col-span-6">
          <div>
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Aprobación de contenido
            </h2>
            <p className="text-xs text-muted-foreground">
              Revisa y aprueba el contenido generado por CC
            </p>
          </div>
          <ContentApprovalFeed />
        </section>

        <section className="flex flex-col gap-4 lg:col-span-3">
          <div>
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Content Creator
            </h2>
            <p className="text-xs text-muted-foreground">
              Sugerencias y activos en trabajo
            </p>
          </div>
          <SugerenciasContenido />
          <Separator />
          <AssetList />
        </section>
      </main>
    </div>
  );
}
