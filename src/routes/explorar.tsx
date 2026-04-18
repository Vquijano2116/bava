import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { InstrumentCard } from "@/components/InstrumentCard";
import { instruments, type Category } from "@/data/bava";

const categories: ("Todos" | Category)[] = ["Todos", "Cuerdas", "Viento", "Percusión", "Teclado", "Voz"];

export const Route = createFileRoute("/explorar")({
  head: () => ({
    meta: [
      { title: "Explorar instrumentos — BAVA" },
      { name: "description", content: "Descubre todos los instrumentos disponibles en BAVA: guitarra, piano, batería, violín, bajo, ukulele, flauta y canto." },
      { property: "og:title", content: "Explorar instrumentos — BAVA" },
      { property: "og:description", content: "8 instrumentos, 5 niveles cada uno. Prueba lecciones gratis sin registrarte." },
    ],
  }),
  component: Explorar,
});

function Explorar() {
  const [filter, setFilter] = useState<"Todos" | Category>("Todos");
  const filtered = filter === "Todos" ? instruments : instruments.filter((i) => i.category === filter);

  return (
    <PageShell>
      <div className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-2xl mb-10">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
            Explorar
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
            Encuentra tu <span className="text-gradient-gold italic">sonido</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Explora nuestro catálogo completo de instrumentos. Todos con 5 niveles progresivos y lecciones gratuitas de muestra.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-gradient-gold text-primary-foreground"
                  : "bg-surface ring-1 ring-border text-muted-foreground hover:text-foreground hover:ring-gold/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((ins) => (
            <InstrumentCard key={ins.id} instrument={ins} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">
            No hay instrumentos en esta categoría aún.
          </p>
        )}
      </div>
    </PageShell>
  );
}
