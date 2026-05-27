
import { Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gradient-to-b from-slate-900 to-black text-gray-200 py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Descomplica Ops
              </h3>
              <p className="text-gray-300 max-w-md text-lg leading-relaxed">
                Simplificando processos, potencializando resultados.
              </p>
            </div>
            
            <div>
              <h4 className="text-2xl font-bold mb-3 text-white">Pronto para descomplicar sua operação?</h4>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Fale com um especialista ou solicite seu diagnóstico gratuito.
              </p>
              <div className="flex items-center mb-6">
                <Mail size={20} className="mr-3 text-cyan-400" />
                <a href="mailto:bruna@descomplicaops.com" className="text-cyan-400 hover:text-cyan-300 transition-colors text-lg">
                  bruna@descomplicaops.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="mr-3 text-cyan-400" />
                <a href="tel:+5511989320886" className="text-cyan-400 hover:text-cyan-300 transition-colors text-lg">
                  +55 11 989320886
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 Descomplica Ops. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
