import type { LevelId } from "@/data/bava";

const colors: Record<LevelId, string> = {
  1: "bg-[var(--level-1)]/15 text-[var(--level-1)] ring-[var(--level-1)]/30",
  2: "bg-[var(--level-2)]/15 text-[var(--level-2)] ring-[var(--level-2)]/30",
  3: "bg-[var(--level-3)]/15 text-[var(--level-3)] ring-[var(--level-3)]/30",
  4: "bg-[var(--level-4)]/15 text-[var(--level-4)] ring-[var(--level-4)]/30",
  5: "bg-[var(--level-5)]/15 text-[var(--level-5)] ring-[var(--level-5)]/30",
};

const dots: Record<LevelId, string> = {
  1: "🟢",
  2: "🔵",
  3: "🟡",
  4: "🟠",
  5: "🔴",
};

export function LevelBadge({ level, label }: { level: LevelId; label?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ring-1 ${colors[level]}`}
    >
      <span>{dots[level]}</span>
      {label ?? `Nivel ${level}`}
    </span>
  );
}

export function ProgressBar({ value, level }: { value: number; level?: LevelId }) {
  const color = level
    ? `var(--level-${level})`
    : "var(--gold)";
  return (
    <div className="h-2 w-full rounded-full bg-surface-elevated overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: `linear-gradient(90deg, ${color}, var(--gold))`,
          boxShadow: `0 0 12px ${color}`,
        }}
      />
    </div>
  );
}
