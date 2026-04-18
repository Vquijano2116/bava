import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Flame, Clock, BookOpen, Trophy, Calendar, ChevronRight, Loader2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { LevelBadge, ProgressBar } from "@/components/LevelBadge";
import { useAuth } from "@/hooks/useAuth";
import {
  user as mockUser,
  userProgress,
  badges,
  weeklyPractice,
  findInstrument,
} from "@/data/bava";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Mi Dashboard — BAVA" },
      { name: "description", content: "Tu progreso musical, lecciones y logros en BAVA." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login" });
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <PageShell>
        <div className="container mx-auto px-6 py-32 flex items-center justify-center">
          <Loader2 className="text-gold animate-spin" size={32} />
        </div>
      </PageShell>
    );
  }

  const displayName = profile?.full_name?.split(" ")[0] ?? user.email?.split("@")[0] ?? "estudiante";

  return (
    <PageShell>
      <div className="container mx-auto px-6 py-12 md:py-16">
        {/* Saludo */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-2">
              Hola de nuevo
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              Bienvenido, <span className="text-gradient-gold italic">{displayName}</span>
            </h1>
            <p className="text-muted-foreground mt-2">¿Listo para tu sesión de hoy?</p>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-br from-ember/20 to-gold/10 ring-1 ring-gold/30">
            <Flame className="text-ember" size={28} />
            <div>
              <div className="font-display text-2xl font-bold text-gradient-gold leading-none">
                {mockUser.streak}
              </div>
              <div className="text-xs text-muted-foreground">días seguidos</div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard icon={Clock} value={`${mockUser.totalHours}h`} label="Horas practicadas" />
          <StatCard icon={BookOpen} value={mockUser.totalLessonsCompleted} label="Lecciones" />
          <StatCard icon={Trophy} value={badges.length} label="Logros" />
          <StatCard icon={Calendar} value={userProgress.length} label="Instrumentos activos" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Mis instrumentos */}
          <div className="lg:col-span-2 space-y-6">
            <section>
              <h2 className="font-display text-2xl font-semibold mb-5">Mis instrumentos</h2>
              <div className="space-y-4">
                {userProgress.map((prog) => {
                  const ins = findInstrument(prog.instrumentId);
                  if (!ins) return null;
                  const Icon = ins.icon;
                  return (
                    <Link
                      key={prog.instrumentId}
                      to="/instrumento/$id"
                      params={{ id: prog.instrumentId }}
                      className="group block p-6 rounded-2xl bg-surface border border-border/60 hover:border-gold/50 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-gold/10 ring-1 ring-gold/30 flex items-center justify-center">
                            <Icon className="text-gold" size={26} />
                          </div>
                          <div>
                            <h3 className="font-display text-xl font-semibold">{ins.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <LevelBadge level={prog.currentLevel} />
                              <span className="text-xs text-muted-foreground">
                                {prog.lessonsCompleted}/{prog.lessonsTotal} lecciones
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all" />
                      </div>
                      <div className="flex items-center gap-3">
                        <ProgressBar value={prog.levelProgress} level={prog.currentLevel} />
                        <span className="text-sm font-semibold text-gold w-12 text-right">
                          {prog.levelProgress}%
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-5">Próximas lecciones</h2>
              <div className="space-y-3">
                {[
                  { title: "Acordes con cejilla", instrument: "Guitarra", time: "15 min" },
                  { title: "Escala de Do mayor", instrument: "Piano", time: "10 min" },
                  { title: "Lectura de ritmos", instrument: "Guitarra", time: "12 min" },
                ].map((l, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-xl bg-surface border border-border/60 hover:border-gold/40 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                        <BookOpen size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{l.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {l.instrument} · {l.time}
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/leccion/$id"
                      params={{ id: "guitarra-3-9" }}
                      className="text-xs px-3 py-1.5 rounded-full bg-gold/15 text-gold font-semibold hover:bg-gold/25 transition-colors"
                    >
                      Continuar
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calendario semanal */}
            <section className="p-6 rounded-2xl bg-surface border border-border/60">
              <h3 className="font-display text-lg font-semibold mb-4">Esta semana</h3>
              <div className="flex items-end justify-between gap-2 h-28 mb-3">
                {weeklyPractice.map((d, i) => {
                  const h = (d.minutes / 60) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex-1 flex items-end">
                        <div
                          className="w-full rounded-t-md bg-gradient-to-t from-ember to-gold"
                          style={{ height: `${h}%`, minHeight: "4px" }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{d.day}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                Total: <span className="text-gold font-semibold">
                  {weeklyPractice.reduce((a, d) => a + d.minutes, 0)} min
                </span>
              </p>
            </section>

            {/* Logros */}
            <section className="p-6 rounded-2xl bg-surface border border-border/60">
              <h3 className="font-display text-lg font-semibold mb-4">Logros</h3>
              <div className="space-y-3">
                {badges.map((b) => (
                  <div key={b.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-ember/20 ring-1 ring-gold/40 flex items-center justify-center text-lg">
                      {b.emoji}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate">{b.name}</div>
                      <div className="text-xs text-muted-foreground">{b.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Flame;
  value: string | number;
  label: string;
}) {
  return (
    <div className="p-5 rounded-2xl bg-surface border border-border/60">
      <Icon className="text-gold mb-3" size={20} />
      <div className="font-display text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
