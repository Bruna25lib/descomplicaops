
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const scrollToPricing = () => {
    const el = document.getElementById("pricing");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="lead-capture"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-24 md:py-32 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/60 border border-cyan-400/30 backdrop-blur-sm mb-10">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-sm font-medium text-cyan-300">
              IA + Automação para negócios em crescimento
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.05] tracking-tight">
            <span className="text-slate-300">Seu time merece parar</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              de apagar incêndio.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto">
            Automatizamos sua operação com IA e integrações sob medida —
            <br className="hidden md:block" />
            para que cada hora da sua equipe vá para o que{" "}
            <span className="text-white font-semibold">realmente faz o negócio crescer</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              onClick={() => navigate("/agendar")}
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 text-white px-8 py-7 text-base font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center"
            >
              <Calendar className="mr-2 h-5 w-5" /> Reservar uma consultoria
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={scrollToPricing}
              variant="outline"
              className="bg-slate-900/60 border border-white/10 backdrop-blur-sm text-white hover:bg-slate-800/80 hover:text-white px-8 py-7 text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105 inline-flex items-center"
            >
              Ver como funciona <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 max-w-5xl mx-auto pt-8 border-t border-white/5">
            {[
              { value: "+40", label: "automações entregues" },
              { value: "-30h", label: "economizadas por cliente/mês" },
              { value: "30 dias", label: "para sentir o resultado" },
              { value: "100%", label: "sem contrato de fidelidade" },
            ].map((stat, i) => (
              <div key={i} className="flex items-baseline justify-center gap-2 text-center">
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm text-slate-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
