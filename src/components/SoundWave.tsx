export function SoundWave({ bars = 40, className = "" }: { bars?: number; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-1 h-20 ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => {
        const delay = (i * 0.05).toFixed(2);
        const baseHeight = 20 + Math.sin(i * 0.5) * 30 + Math.random() * 30;
        return (
          <span
            key={i}
            className="w-[3px] rounded-full bg-gradient-to-t from-ember via-gold to-gold-soft"
            style={{
              height: `${baseHeight}%`,
              animation: `wave 1.6s ease-in-out ${delay}s infinite`,
              opacity: 0.4 + (i % 5) * 0.12,
            }}
          />
        );
      })}
    </div>
  );
}
