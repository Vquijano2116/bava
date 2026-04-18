import { Link } from "@tanstack/react-router";
import type { Instrument, LevelId } from "@/data/bava";

export function InstrumentCard({
  instrument,
  level,
}: {
  instrument: Instrument;
  level?: LevelId;
}) {
  const Icon = instrument.icon;
  return (
    <Link
      to="/instrumento/$id"
      params={{ id: instrument.id }}
      className={`group relative overflow-hidden rounded-2xl bg-surface border border-border/60 p-6 transition-all duration-500 hover:border-gold/60 hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_var(--gold)]`}
    >
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${instrument.color}`}
      />
      <div className="relative">
        <div className="w-14 h-14 rounded-xl bg-surface-elevated flex items-center justify-center mb-5 ring-1 ring-border group-hover:ring-gold/50 group-hover:bg-gold/10 transition-all">
          <Icon className="text-gold group-hover:text-gold-soft transition-colors" size={28} />
        </div>
        <h3 className="font-display text-xl font-semibold mb-1.5">{instrument.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{instrument.description}</p>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">5 niveles disponibles</span>
          {level ? (
            <span className="px-2 py-0.5 rounded-full bg-gold/15 text-gold font-medium">
              Nivel {level}
            </span>
          ) : (
            <span className="text-gold group-hover:translate-x-1 transition-transform">→</span>
          )}
        </div>
      </div>
    </Link>
  );
}
