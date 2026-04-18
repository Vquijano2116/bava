import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { BavaLogo } from "@/components/BavaLogo";
import { MusicParticles } from "@/components/MusicParticles";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión — BAVA" },
      { name: "description", content: "Ingresa a tu cuenta de BAVA y continúa tu camino musical." },
    ],
  }),
  component: Login,
});

const loginSchema = z.object({
  email: z.string().trim().email("Correo inválido").max(255),
  password: z.string().min(6, "Mínimo 6 caracteres").max(100),
});

function Login() {
  const navigate = useNavigate();
  const { signIn, user, loading: authLoading } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Si ya está logueado, redirige al dashboard
  useEffect(() => {
    if (!authLoading && user) {
      navigate({ to: "/dashboard" });
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as "email" | "password";
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    const { error } = await signIn(parsed.data.email, parsed.data.password);
    setSubmitting(false);

    if (error) {
      const friendly = error.toLowerCase().includes("invalid")
        ? "Correo o contraseña incorrectos."
        : error;
      toast.error(friendly);
      return;
    }

    toast.success("¡Bienvenido de vuelta! 🎵");
    navigate({ to: "/dashboard" });
  };

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
          onSubmit={handleSubmit}
          className="p-8 rounded-3xl bg-surface/80 backdrop-blur ring-1 ring-border space-y-4"
          noValidate
        >
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                autoComplete="email"
                maxLength={255}
                className={`w-full pl-10 pr-3 py-3 rounded-xl bg-input ring-1 outline-none text-sm ${
                  errors.email ? "ring-destructive" : "ring-border focus:ring-gold/60"
                }`}
              />
            </div>
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                maxLength={100}
                className={`w-full pl-10 pr-10 py-3 rounded-xl bg-input ring-1 outline-none text-sm ${
                  errors.password ? "ring-destructive" : "ring-border focus:ring-gold/60"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-gradient-gold text-primary-foreground font-semibold hover:scale-[1.01] transition-transform shadow-glow disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? "Ingresando..." : "Ingresar"}
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
