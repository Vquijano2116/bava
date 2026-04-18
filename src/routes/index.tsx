import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles, Play, Award, Users, Zap } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SoundWave } from "@/components/SoundWave";
import { MusicParticles } from "@/components/MusicParticles";
import { InstrumentCard } from "@/components/InstrumentCard";
import { instruments, plans, testimonials } from "@/data/bava";
import heroImage from "@/assets/hero-bava.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BAVA — Tu camino musical comienza aquí" },
      {
        name: "description",
        content:
          "Academia de música virtual con lecciones de guitarra, piano, batería, violín y más. Aprende con maestros de verdad, a tu ritmo.",
      },
      { property: "og:title", content: "BAVA — Academia de música virtual" },
      {
        property: "og:description",
        content: "Aprende guitarra, piano, batería y más con BAVA. 5 niveles, lecciones interactivas, evaluaciones y badges.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <Hero />
      <WhatIsBava />
      <InstrumentsSection />
      <FeaturesStrip />
      <Testimonials />
      <Pricing />
      <FinalCTA />
    </PageShell>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt=""
          width={1920}
          height={1080}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 bg-grain" />
      </div>
      <MusicParticles count={22} />

      <div className="relative container mx-auto px-6 pt-20 pb-28 md:pt-32 md:pb-40 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/60 backdrop-blur ring-1 ring-gold/30 text-xs font-medium text-gold mb-8 animate-[fade-up_0.8s_ease-out]">
          <Sparkles size={14} />
          <span>Nueva temporada · 8 instrumentos disponibles</span>
        </div>

        <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.95] mb-6 animate-[fade-up_0.9s_ease-out_0.1s_both]">
          <span className="shimmer-text">BAVA</span>
        </h1>

        <p className="font-display italic text-2xl md:text-3xl text-foreground/90 max-w-2xl mx-auto mb-4 animate-[fade-up_1s_ease-out_0.2s_both]">
          Tu camino musical comienza aquí.
        </p>
        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 animate-[fade-up_1s_ease-out_0.3s_both]">
          Aprende guitarra, piano, batería y más con maestros de verdad. Lecciones a tu ritmo, evaluaciones y badges en cada nivel.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-[fade-up_1s_ease-out_0.4s_both]">
          <Link
            to="/registro"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-gold text-primary-foreground font-semibold text-base hover:scale-105 transition-transform shadow-glow"
          >
            <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
            Empieza gratis
          </Link>
          <Link
            to="/explorar"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-surface/60 backdrop-blur ring-1 ring-border hover:ring-gold/50 text-foreground font-semibold text-base transition-all"
          >
            <Play size={16} />
            Ver lecciones gratis
          </Link>
        </div>

        <div className="max-w-2xl mx-auto animate-[fade-up_1.1s_ease-out_0.5s_both]">
          <SoundWave bars={56} />
        </div>
      </div>
    </section>
  );
}

function WhatIsBava() {
  const items = [
    {
      icon: Award,
      title: "5 niveles progresivos",
      text: "Desde principiante hasta maestro. Desbloquea cada nivel completando lecciones y evaluaciones.",
    },
    {
      icon: Users,
      title: "Maestros reales",
      text: "Lecciones grabadas por músicos profesionales con años de experiencia en escenario y enseñanza.",
    },
    {
      icon: Zap,
      title: "Aprende a tu ritmo",
      text: "Practica cuando quieras, donde quieras. Tu progreso se guarda en cada sesión.",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-24 md:py-32">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
          ¿Qué es BAVA?
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-5">
          Una academia musical <span className="text-gradient-gold italic">sin paredes</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          BAVA es la forma moderna de aprender música. Combinamos la calidad de un conservatorio con la libertad de aprender desde tu casa.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div
            key={item.title}
            className="group relative p-8 rounded-2xl bg-surface border border-border/60 hover:border-gold/50 transition-all"
            style={{ animation: `fade-up 0.7s ease-out ${i * 0.1}s both` }}
          >
            <div className="w-12 h-12 rounded-xl bg-gold/10 ring-1 ring-gold/30 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
              <item.icon className="text-gold" size={22} />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function InstrumentsSection() {
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
            Instrumentos
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold max-w-xl">
            Elige tu <span className="text-gradient-gold italic">instrumento</span>
          </h2>
        </div>
        <Link
          to="/explorar"
          className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-soft font-semibold"
        >
          Ver todos →
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {instruments.map((ins) => (
          <InstrumentCard key={ins.id} instrument={ins} />
        ))}
      </div>
    </section>
  );
}

function FeaturesStrip() {
  const stats = [
    { value: "8", label: "Instrumentos" },
    { value: "5", label: "Niveles por instrumento" },
    { value: "200+", label: "Lecciones" },
    { value: "12k", label: "Estudiantes activos" },
  ];
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-surface to-surface-elevated border border-gold/20 shadow-elegant">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-4xl md:text-5xl font-bold text-gradient-gold mb-1">
              {s.value}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="max-w-2xl mx-auto text-center mb-14">
        <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
          Estudiantes
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold">
          Historias que <span className="text-gradient-gold italic">resuenan</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="p-7 rounded-2xl bg-surface border border-border/60 hover:border-gold/40 transition-all"
          >
            <div className="flex gap-1 mb-4 text-gold text-lg">★★★★★</div>
            <blockquote className="text-foreground/90 leading-relaxed mb-6 font-display italic">
              “{t.text}”
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-gold flex items-center justify-center font-display font-bold text-primary-foreground">
                {t.avatar}
              </div>
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="container mx-auto px-6 py-24" id="precios">
      <div className="max-w-2xl mx-auto text-center mb-14">
        <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
          Planes
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Aprende al <span className="text-gradient-gold italic">precio que prefieras</span>
        </h2>
        <p className="text-muted-foreground">
          Empieza gratis. Sube de plan cuando estés listo para más.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-3xl p-8 transition-all ${
              plan.highlight
                ? "bg-gradient-to-br from-surface-elevated to-surface border-2 border-gold/60 shadow-glow scale-[1.02]"
                : "bg-surface border border-border/60 hover:border-gold/30"
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-gold text-primary-foreground text-xs font-bold uppercase tracking-wider">
                Más popular
              </div>
            )}
            <h3 className="font-display text-2xl font-semibold mb-1">{plan.name}</h3>
            <p className="text-sm text-muted-foreground mb-5">{plan.description}</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-display text-5xl font-bold text-gradient-gold">
                {plan.price}
              </span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/registro"
              className={`block w-full text-center py-3 rounded-full font-semibold text-sm transition-all ${
                plan.highlight
                  ? "bg-gradient-gold text-primary-foreground hover:scale-[1.02]"
                  : "bg-surface-elevated ring-1 ring-border hover:ring-gold/50 text-foreground"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="container mx-auto px-6 pb-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-elevated via-surface to-background p-12 md:p-20 text-center border border-gold/30">
        <MusicParticles count={12} />
        <div className="relative">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-5">
            Tu primera nota está a un <span className="text-gradient-gold italic">clic</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Únete a miles de estudiantes que ya transforman su vida con la música.
          </p>
          <Link
            to="/registro"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-primary-foreground font-semibold hover:scale-105 transition-transform shadow-glow"
          >
            <Sparkles size={18} />
            Empieza gratis ahora
          </Link>
        </div>
      </div>
    </section>
  );
}
