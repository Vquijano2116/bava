import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, User, Sparkles } from "lucide-react";
import { BavaLogo } from "@/components/BavaLogo";
import { MusicParticles } from "@/components/MusicParticles";
import { Field, GoogleIcon } from "./login";
import { instruments } from "@/data/bava";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [
      { title: "Crear cuenta — BAVA" },
      { name: "description", content: "Crea tu cuenta gratis en BAVA y comienza tu camino musical hoy." },
      { property: "og:title", content: "Únete gratis a BAVA" },
      { property: "og:description", content: "Aprende música con BAVA. Crea tu cuenta en 30 segundos." },
    ],
  }),
  component: Registro,
});

function Registro() {
  const [selectedInstrument, setSelectedInstrument] = useState("guitarra");

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface/40 to-background" />
      <MusicParticles count={14} />

      <div className="relative w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-block mb-6">
            <BavaLogo animated />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 ring-1 ring-gold/30 text-xs text-gold font-semibold mb-3">
            <Sparkles size={12} /> 100% gratis para empezar
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">Crea tu cuenta</h1>
          <p className="text-muted-foreground text-sm">
            Tu primera lección está a 30 segundos.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="p-8 rounded-3xl bg-surface/80 backdrop-blur ring-1 ring-border space-y-4"
        >
          <button
            type="button"
            className="w-full py-3 rounded-xl bg-surface-elevated ring-1 ring-border hover:ring-gold/40 flex items-center justify-center gap-3 text-sm font-medium transition-all"
          >
            <GoogleIcon />
            Continuar con Google
          </button>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" />
            <span>o regístrate con tu correo</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Field icon={User} type="text" placeholder="Tu nombre completo" label="Nombre" />
          <Field icon={Mail} type="email" placeholder="tu@correo.com" label="Correo electrónico" />
          <Field icon={Lock} type="password" placeholder="Mínimo 8 caracteres" label="Contraseña" />

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              ¿Qué instrumento quieres aprender primero?
            </label>
            <div className="grid grid-cols-4 gap-2">
              {instruments.slice(0, 8).map((ins) => {
                const Icon = ins.icon;
                const active = selectedInstrument === ins.id;
                return (
                  <button
                    key={ins.id}
                    type="button"
                    onClick={() => setSelectedInstrument(ins.id)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl ring-1 transition-all ${
                      active
                        ? "bg-gold/15 ring-gold text-gold"
                        : "bg-surface-elevated ring-border text-muted-foreground hover:ring-gold/30"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-[10px] font-medium">{ins.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-gold text-primary-foreground font-semibold hover:scale-[1.01] transition-transform shadow-glow"
          >
            Crear cuenta gratis
          </button>

          <p className="text-[11px] text-center text-muted-foreground pt-1">
            Al registrarte aceptas nuestros{" "}
            <a href="#" className="text-gold hover:underline">Términos</a> y{" "}
            <a href="#" className="text-gold hover:underline">Privacidad</a>.
          </p>

          <p className="text-xs text-center text-muted-foreground border-t border-border pt-4">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-gold hover:underline font-semibold">
              Inicia sesión
            </Link>
          </p>
        </form>

        <p className="text-center mt-6 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">← Volver al inicio</Link>
        </p>
      </div>
    </div>
  );
}
