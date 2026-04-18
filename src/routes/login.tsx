import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { BavaLogo } from "@/components/BavaLogo";
import { MusicParticles } from "@/components/MusicParticles";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión — BAVA" },
      { name: "description", content: "Ingresa a tu cuenta de BAVA y continúa tu camino musical." },
    ],
  }),
  component: Login,
});

function Login() {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface/40 to-background" />
      <MusicParticles count={14} />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block mb-6">
            <BavaLogo animated />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">Bienvenido de vuelta</h1>
          <p className="text-muted-foreground text-sm">
            Continúa tu camino musical donde lo dejaste.
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
            <span>o con tu correo</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Field icon={Mail} type="email" placeholder="tu@correo.com" label="Correo electrónico" />
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-input ring-1 ring-border focus:ring-gold/60 outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end text-xs">
            <a href="#" className="text-gold hover:underline">¿Olvidaste tu contraseña?</a>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-gold text-primary-foreground font-semibold hover:scale-[1.01] transition-transform shadow-glow"
          >
            Ingresar
          </button>

          <p className="text-xs text-center text-muted-foreground pt-2">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="text-gold hover:underline font-semibold">
              Crea una gratis
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

export function Field({
  icon: Icon,
  type,
  placeholder,
  label,
}: {
  icon: typeof Mail;
  type: string;
  placeholder: string;
  label: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        <input
          type={type}
          placeholder={placeholder}
          className="w-full pl-10 pr-3 py-3 rounded-xl bg-input ring-1 ring-border focus:ring-gold/60 outline-none text-sm"
        />
      </div>
    </div>
  );
}

export function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.32A9 9 0 0 0 9 18z"/>
      <path fill="#FBBC05" d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.04l3.01-2.32z"/>
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96L3.97 7.28C4.68 5.16 6.66 3.58 9 3.58z"/>
    </svg>
  );
}
