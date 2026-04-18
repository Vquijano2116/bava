import { Music, Music2, Music3, Music4 } from "lucide-react";

const icons = [Music, Music2, Music3, Music4];

export function MusicParticles({ count = 18 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const Icon = icons[i % icons.length];
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const delay = (i * 0.4) % 6;
        const duration = 7 + (i % 5);
        const size = 14 + (i % 4) * 6;
        return (
          <Icon
            key={i}
            className="absolute text-gold/15"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              animation: `float ${duration}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
