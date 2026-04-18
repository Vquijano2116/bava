import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BavaLogo } from "./BavaLogo";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/explorar", label: "Explorar" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

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
          </nav>
        </div>
      )}
    </header>
  );
}
