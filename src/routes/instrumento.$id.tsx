import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import {
  Lock,
  CheckCircle2,
  PlayCircle,
  Video,
  Dumbbell,
  BookOpen,
  GraduationCap,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { LevelBadge, ProgressBar } from "@/components/LevelBadge";
import {
  findInstrument,
  findProgress,
  getInstrumentLessons,
  levels,
  type LevelId,
  type LessonType,
} from "@/data/bava";

export const Route = createFileRoute("/instrumento/$id")({
  head: ({ params }) => {
    const ins = findInstrument(params.id);
    const name = ins?.name ?? "Instrumento";
    return {
      meta: [
        { title: `${name} — BAVA` },
        { name: "description", content: `Aprende ${name.toLowerCase()} con BAVA: 5 niveles, lecciones interactivas y evaluaciones.` },
        { property: "og:title", content: `${name} en BAVA` },
        { property: "og:description", content: `Domina el ${name.toLowerCase()} a tu ritmo con maestros profesionales.` },
      ],
    };
  },
  notFoundComponent: () => (
    <PageShell>
      <div className="container mx-auto px-6 py-32 text-center">
        <h1 className="font-display text-4xl mb-4">Instrumento no encontrado</h1>
        <Link to="/explorar" className="text-gold hover:underline">
          Ver todos los instrumentos
        </Link>
      </div>
    </PageShell>
  ),
  component: InstrumentDetail,
});

const typeIcons: Record<LessonType, typeof Video> = {
  video: Video,
  practica: Dumbbell,
  teoria: BookOpen,
  evaluacion: GraduationCap,
};

const typeLabels: Record<LessonType, string> = {
  video: "Video",
  practica: "Práctica",
  teoria: "Teoría",
  evaluacion: "Evaluación",
};

function InstrumentDetail() {
  const { id } = useParams({ from: "/instrumento/$id" });
  const instrument = findInstrument(id);
  const progress = findProgress(id);
  const [openLevel, setOpenLevel] = useState<LevelId>(progress?.currentLevel ?? 1);

  if (!instrument) {
    return (
      <PageShell>
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="font-display text-4xl mb-4">Instrumento no encontrado</h1>
          <Link to="/explorar" className="text-gold hover:underline">
            Ver todos los instrumentos
          </Link>
        </div>
      </PageShell>
    );
  }

  const Icon = instrument.icon;
  const unlockedLevels = progress?.unlockedLevels ?? [1];

  return (
    <PageShell>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className={`absolute inset-0 bg-gradient-to-br ${instrument.color} opacity-30`} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="relative container mx-auto px-6 py-12 md:py-16">
          <Link
            to="/explorar"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold mb-8"
          >
            <ArrowLeft size={16} /> Volver a explorar
          </Link>

          <div className="flex flex-col md:flex-row md:items-end gap-8">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-gold/10 ring-1 ring-gold/40 flex items-center justify-center backdrop-blur">
              <Icon className="text-gold" size={64} />
            </div>
            <div className="flex-1">
              <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-2">
                {instrument.category}
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-3">
                {instrument.name}
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mb-4">
                {instrument.description} Sigue el camino de 5 niveles y conviértete en maestro.
              </p>
              {progress && (
                <div className="flex items-center gap-3 flex-wrap">
                  <LevelBadge level={progress.currentLevel} label={`Nivel actual: ${progress.currentLevel}`} />
                  <span className="text-sm text-muted-foreground">
                    {progress.lessonsCompleted}/{progress.lessonsTotal} lecciones del nivel
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mapa de niveles */}
      <section className="container mx-auto px-6 py-12 md:py-16">
        <h2 className="font-display text-3xl font-bold mb-2">Camino de aprendizaje</h2>
        <p className="text-muted-foreground mb-10">
          Tu progresión de 5 niveles. Desbloquea cada uno completando el anterior.
        </p>

        <div className="relative">
          {/* Línea conectora */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/40 via-ember/40 to-gold/10" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2 mb-12">
            {levels.map((lvl) => {
              const unlocked = unlockedLevels.includes(lvl.id);
              const isCurrent = progress?.currentLevel === lvl.id;
              const isOpen = openLevel === lvl.id;
              const completed = unlocked && progress && progress.currentLevel > lvl.id;

              return (
                <button
                  key={lvl.id}
                  onClick={() => unlocked && setOpenLevel(lvl.id)}
                  disabled={!unlocked}
                  className={`relative p-5 rounded-2xl text-left transition-all ${
                    isOpen
                      ? "bg-surface-elevated ring-2 ring-gold shadow-glow"
                      : unlocked
                        ? "bg-surface border border-border/60 hover:border-gold/40"
                        : "bg-surface/40 border border-border/30 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-lg"
                      style={{
                        background: unlocked ? `var(--level-${lvl.id})` : "var(--surface-elevated)",
                        color: unlocked ? "var(--background)" : "var(--muted-foreground)",
                      }}
                    >
                      {completed ? <CheckCircle2 size={22} /> : lvl.id}
                    </div>
                    {!unlocked && <Lock size={16} className="text-muted-foreground" />}
                    {isCurrent && (
                      <span className="text-[10px] uppercase font-bold text-gold tracking-wider">
                        Actual
                      </span>
                    )}
                  </div>
                  <div className="font-display font-semibold text-sm">{lvl.name}</div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{lvl.subtitle}</p>
                  {isCurrent && progress && (
                    <div className="mt-3">
                      <ProgressBar value={progress.levelProgress} level={lvl.id} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lecciones del nivel abierto */}
        <LessonsList instrumentId={id} level={openLevel} />
      </section>
    </PageShell>
  );
}

function LessonsList({ instrumentId, level }: { instrumentId: string; level: LevelId }) {
  const progress = findProgress(instrumentId);
  const lessons = getInstrumentLessons(instrumentId, level, progress);
  const lvl = levels.find((l) => l.id === level)!;
  const unlocked = (progress?.unlockedLevels ?? [1]).includes(level);

  return (
    <div className="bg-surface rounded-3xl border border-border/60 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <LevelBadge level={level} />
            <h3 className="font-display text-2xl font-semibold">{lvl.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{lvl.subtitle}</p>
        </div>
        {unlocked && level === progress?.currentLevel && (
          <Link
            to="/evaluacion/$id"
            params={{ id: `${instrumentId}-${level}` }}
            className="text-xs px-4 py-2 rounded-full bg-surface-elevated ring-1 ring-gold/40 text-gold hover:bg-gold/10 font-semibold"
          >
            Ir a la evaluación →
          </Link>
        )}
      </div>

      {!unlocked ? (
        <div className="py-16 text-center">
          <Lock className="mx-auto text-muted-foreground mb-4" size={40} />
          <p className="text-muted-foreground">
            Completa el nivel anterior para desbloquear estas lecciones.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {lessons.map((lesson, i) => {
            const TypeIcon = typeIcons[lesson.type];
            const blocked = lesson.status === "bloqueada";
            const completed = lesson.status === "completada";
            const inProgress = lesson.status === "en_progreso";

            return (
              <li key={lesson.id}>
                <Link
                  to={blocked ? "/instrumento/$id" : "/leccion/$id"}
                  params={blocked ? { id: instrumentId } : { id: lesson.id }}
                  disabled={blocked}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    blocked
                      ? "bg-surface/40 opacity-50 cursor-not-allowed"
                      : inProgress
                        ? "bg-gradient-to-r from-gold/10 to-transparent ring-1 ring-gold/40 hover:ring-gold"
                        : "bg-surface-elevated hover:bg-surface-elevated/70 ring-1 ring-border"
                  }`}
                >
                  <div className="w-8 text-center text-sm text-muted-foreground font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      completed
                        ? "bg-gold/20 text-gold"
                        : inProgress
                          ? "bg-gradient-gold text-primary-foreground"
                          : blocked
                            ? "bg-surface text-muted-foreground"
                            : "bg-surface text-foreground/70"
                    }`}
                  >
                    {completed ? (
                      <CheckCircle2 size={18} />
                    ) : blocked ? (
                      <Lock size={16} />
                    ) : inProgress ? (
                      <PlayCircle size={20} />
                    ) : (
                      <TypeIcon size={18} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{lesson.title}</div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                      <span className="flex items-center gap-1">
                        <TypeIcon size={12} />
                        {typeLabels[lesson.type]}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {lesson.duration}
                      </span>
                    </div>
                  </div>
                  {inProgress && (
                    <span className="text-xs px-3 py-1 rounded-full bg-gradient-gold text-primary-foreground font-semibold">
                      Continuar
                    </span>
                  )}
                  {completed && (
                    <span className="text-xs text-gold font-semibold">Completada</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
