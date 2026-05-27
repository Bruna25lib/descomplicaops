
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHome = typeof window !== "undefined" && window.location.pathname === "/";
  const h = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <nav className="bg-slate-900/95 backdrop-blur-lg sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/ce327176-5560-4fa4-a294-67dca445ae61.png" 
              alt="Descomplica Ops Logo" 
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold text-white">
              Descomplica Ops
            </span>
          </a>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="text-white hover:bg-white/10"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href={h("#services")}>Serviços</NavLink>
            <NavLink href="/catalogo">Catálogo</NavLink>
            <NavLink href={h("#pricing")}>Como Funciona</NavLink>
            <NavLink href={h("#about")}>Sobre</NavLink>
            <NavLink href={h("#faq")}>FAQ</NavLink>
            <NavLink href={h("#contact")}>Contato</NavLink>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <a href={h("#pricing")}>Solicite um Diagnóstico</a>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 py-4 px-2 bg-slate-800/50 backdrop-blur-lg border border-white/10 rounded-lg">
            <NavLink href={h("#services")} onClick={() => setIsMenuOpen(false)}>Serviços</NavLink>
            <NavLink href="/catalogo" onClick={() => setIsMenuOpen(false)}>Catálogo</NavLink>
            <NavLink href={h("#pricing")} onClick={() => setIsMenuOpen(false)}>Como Funciona</NavLink>
            <NavLink href={h("#about")} onClick={() => setIsMenuOpen(false)}>Sobre</NavLink>
            <NavLink href={h("#faq")} onClick={() => setIsMenuOpen(false)}>FAQ</NavLink>
            <NavLink href={h("#contact")} onClick={() => setIsMenuOpen(false)}>Contato</NavLink>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <a href={h("#pricing")}>Solicite um Diagnóstico</a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ href, onClick, children }: { href: string; onClick?: () => void; children: React.ReactNode }) => (
  <a
    href={href}
    className="block md:inline text-gray-300 hover:text-cyan-400 transition-colors font-medium"
    onClick={onClick}
  >
    {children}
  </a>
);

export default Navbar;
