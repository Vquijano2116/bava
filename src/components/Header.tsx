import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { toast } from "sonner";
import { BavaLogo } from "./BavaLogo";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/explorar", label: "Explorar" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setMenuOpen(false);
    toast.success("Sesión cerrada");
    navigate({ to: "/" });
  };

  const initials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <BavaLogo animated />

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-gold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-surface-elevated transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center font-bold text-xs text-primary-foreground">
                  {initials}
                </div>
                <span className="text-sm font-medium max-w-[140px] truncate">
                  {profile?.full_name ?? user.email}
                </span>
              </button>
              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-surface-elevated ring-1 ring-border shadow-elegant z-50 overflow-hidden animate-[fade-in_0.15s_ease-out]">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium truncate">
                        {profile?.full_name ?? "Usuario"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-surface transition-colors"
                    >
                      <UserIcon size={14} /> Mi dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors text-left"
                    >
                      <LogOut size={14} /> Cerrar sesión
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Ingresar
              </Link>
              <Link
                to="/registro"
                className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-gold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Empieza gratis
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-foreground"
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <button
                onClick={handleSignOut}
                className="text-sm font-medium text-destructive text-left inline-flex items-center gap-2"
              >
                <LogOut size={14} /> Cerrar sesión
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="text-sm font-medium">
                  Ingresar
                </Link>
                <Link
                  to="/registro"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-gold text-primary-foreground text-center"
                >
                  Empieza gratis
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
