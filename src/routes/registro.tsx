import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, Lock, User, Sparkles, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { BavaLogo } from "@/components/BavaLogo";
import { MusicParticles } from "@/components/MusicParticles";
import { useAuth } from "@/hooks/useAuth";
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

const signupSchema = z.object({
  full_name: z.string().trim().min(2, "Mínimo 2 caracteres").max(80, "Máximo 80 caracteres"),
  email: z.string().trim().email("Correo inválido").max(255),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(100, "Máximo 100 caracteres"),
});

function Registro() {
  const navigate = useNavigate();
  const { signUp, user, loading: authLoading } = useAuth();
  const [selectedInstrument, setSelectedInstrument] = useState("guitarra");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!authLoading && user) {
      navigate({ to: "/dashboard" });
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = signupSchema.safeParse({ full_name: fullName, email, password });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    const { error } = await signUp(parsed.data.email, parsed.data.password, {
      full_name: parsed.data.full_name,
      initial_instrument: selectedInstrument,
    });
    setSubmitting(false);

    if (error) {
      const lower = error.toLowerCase();
      let friendly = error;
      if (lower.includes("already") || lower.includes("registered")) {
        friendly = "Este correo ya está registrado. Inicia sesión.";
      } else if (lower.includes("password") && lower.includes("pwned")) {
        friendly = "Esta contraseña aparece en filtraciones conocidas. Usa otra más segura.";
      } else if (lower.includes("weak")) {
        friendly = "Contraseña muy débil. Usa al menos 8 caracteres con letras y números.";
      }
      toast.error(friendly);
      return;
    }

    toast.success("¡Cuenta creada! Bienvenido a BAVA 🎵");
    navigate({ to: "/dashboard" });
  };

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
          onSubmit={handleSubmit}
          className="p-8 rounded-3xl bg-surface/80 backdrop-blur ring-1 ring-border space-y-4"
          noValidate
        >
          <FormField
            label="Nombre"
            icon={User}
            type="text"
            value={fullName}
            onChange={setFullName}
            placeholder="Tu nombre completo"
            autoComplete="name"
            maxLength={80}
            error={errors.full_name}
          />
          <FormField
            label="Correo electrónico"
            icon={Mail}
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="tu@correo.com"
            autoComplete="email"
            maxLength={255}
            error={errors.email}
          />
          <FormField
            label="Contraseña"
            icon={Lock}
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Mínimo 8 caracteres"
            autoComplete="new-password"
            maxLength={100}
            error={errors.password}
          />

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              ¿Qué instrumento quieres aprender primero?
            </label>
            <div className="grid grid-cols-4 gap-2">
              {instruments.map((ins) => {
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
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-gradient-gold text-primary-foreground font-semibold hover:scale-[1.01] transition-transform shadow-glow disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? "Creando cuenta..." : "Crear cuenta gratis"}
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

function FormField({
  label,
  icon: Icon,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  maxLength,
  error,
}: {
  label: string;
  icon: typeof Mail;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoComplete?: string;
  maxLength?: number;
  error?: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          maxLength={maxLength}
          className={`w-full pl-10 pr-3 py-3 rounded-xl bg-input ring-1 outline-none text-sm ${
            error ? "ring-destructive" : "ring-border focus:ring-gold/60"
          }`}
        />
      </div>
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
