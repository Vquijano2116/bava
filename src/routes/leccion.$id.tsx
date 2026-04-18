import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Play, FileText, Sparkles, Award } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/leccion/$id")({
  head: () => ({
    meta: [
      { title: "Lección — BAVA" },
      { name: "description", content: "Practica tu lección de música en BAVA." },
    ],
  }),
  component: LessonView,
});

function LessonView() {
  const { id } = useParams({ from: "/leccion/$id" });
  const [completed, setCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Parse instrument and level from id (e.g. "guitarra-3-9")
  const [instrumentId, levelStr] = id.split("-");
  const level = parseInt(levelStr || "1", 10);

  const handleComplete = () => {
    setCompleted(true);
    setShowCelebration(true);
  };

  return (
    <PageShell>
      <div className="container mx-auto px-6 py-8 md:py-12">
        <Link
          to="/instrumento/$id"
          params={{ id: instrumentId || "guitarra" }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold mb-6"
        >
          <ArrowLeft size={16} /> Volver al instrumento
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Player + acciones */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">
                Lección · Nivel {level}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Acordes con cejilla — Fundamentos
              </h1>
              <p className="text-muted-foreground">
                Aprende la técnica de cejilla para abrir un mundo de nuevos acordes en la guitarra.
              </p>
            </div>

            {/* Video placeholder */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-surface-elevated ring-1 ring-border group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-ember/20 via-transparent to-gold/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <Play className="text-primary-foreground ml-1" size={32} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-foreground/80">
                <span className="px-2 py-1 rounded bg-background/60 backdrop-blur">15:32</span>
                <span className="px-2 py-1 rounded bg-background/60 backdrop-blur">HD</span>
              </div>
            </div>

            {/* Ejercicios */}
            <section className="p-6 rounded-2xl bg-surface border border-border/60">
              <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="text-gold" size={18} />
                Ejercicios prácticos
              </h2>
              <ol className="space-y-3 text-sm">
                {[
                  "Practica la postura correcta del dedo índice en el traste 1.",
                  "Repite el cambio entre Fa y Do mayor durante 5 minutos.",
                  "Toca la progresión Fa → Do → Sol → Fa a 60 BPM.",
                  "Sube gradualmente el tempo hasta 90 BPM sin perder claridad.",
                ].map((ex, i) => (
                  <li key={i} className="flex gap-3 p-3 rounded-lg bg-surface-elevated">
                    <span className="font-display font-bold text-gold w-6 flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-foreground/90">{ex}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Acción */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleComplete}
                disabled={completed}
                className={`flex-1 py-4 rounded-2xl font-semibold transition-all ${
                  completed
                    ? "bg-gold/20 text-gold ring-1 ring-gold/40"
                    : "bg-gradient-gold text-primary-foreground hover:scale-[1.01] shadow-glow"
                }`}
              >
                {completed ? (
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 size={18} /> Lección completada
                  </span>
                ) : (
                  "Marcar como completada"
                )}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <section className="p-6 rounded-2xl bg-surface border border-border/60">
              <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                <FileText className="text-gold" size={16} />
                Notas y materiales
              </h3>
              <div className="space-y-3 text-sm text-foreground/85 leading-relaxed">
                <p>
                  La <strong className="text-gold">cejilla</strong> consiste en presionar varias cuerdas con un solo dedo (generalmente el índice) sobre un traste.
                </p>
                <p>
                  Es la base para tocar acordes movibles como Fa, Si menor o Do# mayor.
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Mantén el pulgar detrás del mástil.</li>
                  <li>Presiona cerca del traste, no encima.</li>
                  <li>Relaja el hombro y la muñeca.</li>
                </ul>
              </div>
              <a
                href="#"
                className="mt-4 block text-center text-xs text-gold font-semibold hover:underline"
              >
                Descargar partitura PDF
              </a>
            </section>

            <section className="p-6 rounded-2xl bg-gradient-to-br from-gold/15 to-ember/10 ring-1 ring-gold/30">
              <Award className="text-gold mb-3" size={24} />
              <h3 className="font-display font-semibold mb-1">Próximo logro</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Completa 4 lecciones más para terminar el Nivel {level} y ganar tu badge.
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gold font-semibold">8/12 lecciones</span>
                <span className="text-muted-foreground">67%</span>
              </div>
            </section>
          </aside>
        </div>
      </div>

      {showCelebration && (
        <CelebrationModal
          level={level}
          instrumentId={instrumentId || "guitarra"}
          onClose={() => setShowCelebration(false)}
        />
      )}
    </PageShell>
  );
}

function CelebrationModal({
  level,
  instrumentId,
  onClose,
}: {
  level: number;
  instrumentId: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-[fade-in_0.3s_ease-out]">
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => {
          const left = Math.random() * 100;
          const delay = Math.random() * 2;
          const duration = 3 + Math.random() * 2;
          const colors = ["var(--gold)", "var(--ember)", "var(--gold-soft)"];
          const color = colors[i % colors.length];
          return (
            <span
              key={i}
              className="absolute top-0 w-2 h-3 rounded-sm"
              style={{
                left: `${left}%`,
                background: color,
                animation: `confetti-fall ${duration}s ease-in ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>

      <div className="relative max-w-md w-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-surface-elevated to-surface ring-2 ring-gold/50 shadow-glow text-center animate-[scale-in_0.4s_cubic-bezier(0.34,1.56,0.64,1)_both]">
        <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-gradient-gold flex items-center justify-center shadow-glow animate-[pulse-glow_2s_ease-in-out_infinite]">
          <Award className="text-primary-foreground" size={48} />
        </div>
        <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">
          ¡Felicitaciones!
        </p>
        <h2 className="font-display text-3xl font-bold mb-3">
          Lección completada
        </h2>
        <p className="text-muted-foreground mb-8">
          Has avanzado en tu camino musical. ¡Sigue así!
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-surface-elevated ring-1 ring-border text-sm font-semibold hover:ring-gold/40"
          >
            Seguir aquí
          </button>
          <Link
            to="/instrumento/$id"
            params={{ id: instrumentId }}
            className="flex-1 py-3 rounded-full bg-gradient-gold text-primary-foreground text-sm font-semibold hover:scale-[1.02] transition-transform"
          >
            Siguiente lección
          </Link>
        </div>
        <p className="text-xs text-muted-foreground mt-5">
          Nivel {level} · {instrumentId}
        </p>
      </div>
    </div>
  );
}
