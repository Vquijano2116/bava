import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Twitter, Facebook } from "lucide-react";
import { BavaLogo } from "./BavaLogo";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-surface/40 mt-24">
      <div className="container mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1 space-y-4">
          <BavaLogo />
          <p className="text-sm text-muted-foreground max-w-xs">
            Academia de música virtual. Aprende a tu ritmo, donde sea, con maestros de verdad.
          </p>
          <div className="flex gap-3 pt-2">
            {[Instagram, Youtube, Twitter, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-surface-elevated border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/50 transition-all"
                aria-label="Red social"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-base mb-4 text-foreground">Aprende</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/explorar" className="hover:text-gold transition-colors">Instrumentos</Link></li>
            <li><Link to="/explorar" className="hover:text-gold transition-colors">Niveles</Link></li>
            <li><Link to="/explorar" className="hover:text-gold transition-colors">Lecciones gratis</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base mb-4 text-foreground">Compañía</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-gold transition-colors">Sobre BAVA</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Maestros</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base mb-4 text-foreground">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-gold transition-colors">Términos</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Privacidad</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Cookies</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="container mx-auto px-6 py-6 text-xs text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} BAVA Academia Musical. Todos los derechos reservados.</p>
          <p className="text-gold/70">Hecho con pasión por la música 🎵</p>
        </div>
      </div>
    </footer>
  );
}
