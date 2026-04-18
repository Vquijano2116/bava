import { Link } from "@tanstack/react-router";

export function BavaLogo({ className = "", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 group ${className}`}>
      <div className="relative">
        <div className="flex items-end gap-[3px] h-7">
          {[0.5, 0.9, 0.6, 1].map((h, i) => (
            <span
              key={i}
              className="w-[3px] bg-gradient-gold rounded-full"
              style={{
                height: `${h * 100}%`,
                animation: animated ? `wave 1.4s ease-in-out ${i * 0.15}s infinite` : undefined,
              }}
            />
          ))}
        </div>
      </div>
      <span className="font-display text-2xl font-bold tracking-tight text-gradient-gold">
        BAVA
      </span>
    </Link>
  );
}
