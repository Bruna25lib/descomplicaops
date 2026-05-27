import { ArrowLeft, Calendar as CalendarIcon, Clock, Video, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BOOKING_URL = "https://calendar.app.google/935AbSCMcUWUZQ7S7";

const Agendar = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Decorative blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 py-10 md:py-16 relative z-10">
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Voltar para o início</span>
        </button>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 max-w-7xl mx-auto">
          {/* Left: context */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 border border-cyan-400/30 backdrop-blur-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-medium text-cyan-300">
                  Consultoria estratégica · 1:1
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
                <span className="text-slate-200">Reserve sua </span>
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  sessão estratégica
                </span>
              </h1>
              <p className="text-base md:text-lg text-slate-400 leading-relaxed">
                Uma conversa direta para mapear onde sua operação está perdendo
                tempo e quais automações trariam o maior impacto nos próximos 30 dias.
              </p>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: Clock, label: "30–45 min" },
                { icon: Video, label: "Google Meet" },
                { icon: CalendarIcon, label: "Confirmação automática" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/50 border border-white/10 backdrop-blur-sm"
                >
                  <item.icon className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span className="text-sm text-slate-300">{item.label}</span>
                </div>
              ))}
            </div>

            {/* What to expect */}
            <div className="rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-sm p-6">
              <h2 className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-4">
                O que vamos fazer juntos
              </h2>
              <ul className="space-y-3">
                {[
                  "Diagnóstico rápido dos gargalos da sua operação",
                  "Identificação das 3 automações de maior ROI no seu contexto",
                  "Roteiro claro de próximos passos — com ou sem a gente",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fallback CTA */}
            <div className="text-sm text-slate-500">
              Não consegue ver o calendário?{" "}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
              >
                Abrir agendamento em nova aba →
              </a>
            </div>
          </div>

          {/* Right: embed */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white shadow-2xl shadow-blue-500/10">
              <iframe
                src={BOOKING_URL}
                title="Agendar consultoria com a Descomplica Ops"
                className="w-full h-[720px] md:h-[780px]"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>

            <div className="mt-4 flex items-center justify-center">
              <Button
                asChild
                variant="outline"
                className="bg-slate-900/60 border-white/10 text-white hover:bg-slate-800/80 hover:text-white"
              >
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Abrir no Google Calendar
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agendar;