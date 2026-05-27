
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Calendar, Sparkles, Zap, ArrowRight, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

const consulting = {
  title: "Consultoria Pontual",
  badge: "SEM COMPROMISSO",
  price: "R$ 397",
  unit: "/ sessão",
  description:
    "Em 1h com um especialista, você sai com um diagnóstico claro, prioridades definidas e um plano de ação — sem assinar nada.",
  features: [
    "Diagnóstico personalizado do seu processo",
    "Direcionamento técnico e estratégico",
    "Sugestões de ferramentas e fluxos",
    "Plano de ação concreto para sair do zero",
  ],
  cta: "Reservar minha sessão",
};

const plans = [
  {
    title: "START",
    tagline: "Seu primeiro passo para operar no piloto automático",
    price: "R$ 1.500",
    unit: "/mês · sem fidelidade",
    roi: "Economize até 15h/mês em tarefas repetitivas",
    description:
      "Ideal para negócios que querem sentir o resultado da automação sem grandes investimentos. Implementação em até 30 dias.",
    featuresLabel: "O QUE VOCÊ VAI GANHAR",
    features: [
      "Até 2 automações implementadas e funcionando",
      "Comunicação com clientes no piloto automático (e-mails com templates)",
      "Agendamentos organizados via Google Calendar — sem erros manuais",
      "Projetos e tarefas estruturados no ClickUp",
      "Suporte técnico contínuo e ajustes operacionais",
    ],
    note: "Transparência total: você paga apenas pelas ferramentas que usar, sem markup nosso.",
    cta: "Quero começar",
  },
  {
    title: "GROWTH",
    tagline: "Automatize vendas, clientes e operação — tudo integrado",
    price: "R$ 2.500",
    unit: "/mês · sem fidelidade",
    roi: "Economize até 40h/mês + IA trabalhando por você",
    description:
      "Para negócios que já crescem e precisam que a operação acompanhe o ritmo — sem contratar mais pessoas para isso.",
    featuresLabel: "TUDO DO START, MAIS:",
    features: [
      "Tudo do plano Start",
      "Funil de vendas automatizado do começo ao fim",
      "Onboarding de novos clientes sem esforço manual",
      "Agente de IA conversacional sob medida para o seu negócio",
      "Pesquisa de satisfação coletada e organizada automaticamente",
      "Mensagens disparadas por evento (lead chegou? cliente pagou? IA age.)",
      "Integração com CRM ou Google Sheets",
    ],
    note: "Transparência total: você paga apenas pelas ferramentas que usar, sem markup nosso.",
    cta: "Quero crescer com IA",
    popular: true,
  },
  {
    title: "ENTERPRISE",
    tagline: "Operação completa inteligente, com IA integrada ao core do negócio",
    price: "R$ 6.000",
    unit: "/mês · contrato personalizado",
    roi: "Até 2 agentes de IA + monitoramento contínuo",
    description:
      "Para empresas que querem operar com inteligência real — processos comerciais e administrativos automatizados, com estratégia e melhoria contínua.",
    featuresLabel: "TUDO DO GROWTH, MAIS:",
    features: [
      "Tudo dos planos Start e Growth",
      "Automação completa de processos operacionais e comerciais",
      "Até 2 agentes de IA integrados ao fluxo da empresa",
      "Mapeamento estratégico completo da jornada do cliente e da operação",
      "Integrações personalizadas com sistemas externos (ERP, CRM, APIs)",
      "Monitoramento contínuo com otimizações mensais",
    ],
    note: "Transparência total: você paga apenas pelas ferramentas e APIs que usar, sem markup nosso.",
    cta: "Agendar reunião estratégica",
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const openWhatsApp = (planTitle: string) => {
    const message = `Ol%C3%A1%21%20Estou%20interessado%20no%20plano%20${encodeURIComponent(
      planTitle,
    )}%20e%20gostaria%20de%20falar%20com%20um%20consultor.`;
    window.open(`https://wa.me/5548992052888?text=${message}`, "_blank");
  };

  return (
    <section
      id="pricing"
      className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-6">
            Planos e Preços
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Automatize o que te trava.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Escale o que te faz crescer.
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Processos que hoje consomem horas da sua equipe podem rodar sozinhos.
            Escolha o plano certo e comece a sentir a diferença em até 30 dias.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-8 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Sem contrato de fidelidade
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Implementação em até 30 dias
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Suporte técnico incluso
            </div>
          </div>
        </div>

        {/* Consulting — entry point */}
        <div className="max-w-5xl mx-auto mb-16">
          <p className="text-center text-sm text-slate-400 mb-4 tracking-wide">
            👋 NÃO SABE POR ONDE COMEÇAR? COMECE AQUI.
          </p>
          <Card className="bg-gradient-to-br from-purple-900/40 to-slate-900/60 border border-purple-500/30 backdrop-blur-lg shadow-2xl shadow-purple-500/10">
            <CardContent className="p-8 md:p-10 grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <span className="inline-block px-3 py-1 rounded-md bg-purple-500/20 border border-purple-400/30 text-purple-200 text-[11px] font-bold tracking-wider mb-4">
                  {consulting.badge}
                </span>
                <h3 className="text-2xl font-bold mb-3">{consulting.title}</h3>
                <p className="mb-3">
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                    {consulting.price}
                  </span>
                  <span className="text-slate-400 ml-2">{consulting.unit}</span>
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {consulting.description}
                </p>
              </div>
              <ul className="md:col-span-1 space-y-3">
                {consulting.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-200">
                    <Sparkles className="h-4 w-4 text-purple-300 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="md:col-span-1 flex md:justify-end">
                <Button
                  onClick={() => navigate("/agendar")}
                  className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold px-6 py-6 rounded-lg shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105"
                >
                  <Calendar className="mr-2 h-4 w-4" /> {consulting.cta}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscription plans */}
        <p className="text-center text-xs text-slate-400 mb-8 tracking-widest uppercase">
          ou assine um plano e tenha resultado contínuo
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative flex flex-col bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur-lg border transition-all duration-300 hover:scale-[1.02] ${
                plan.popular
                  ? "border-cyan-400/60 shadow-2xl shadow-cyan-500/20 md:-translate-y-3"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold shadow-lg">
                    <Zap className="h-3 w-3" /> MAIS POPULAR
                  </span>
                </div>
              )}

              <CardHeader className="pb-4">
                <p className="text-xs font-bold tracking-widest text-slate-400 mb-2">
                  {plan.title}
                </p>
                <h3 className="text-lg font-semibold text-white mb-5 min-h-[3.5rem]">
                  {plan.tagline}
                </h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4">{plan.unit}</p>

                <div className="rounded-lg bg-emerald-500/10 border border-emerald-400/20 px-3 py-2 text-xs font-medium text-emerald-300 flex items-start gap-2">
                  <span className="mt-0.5">⏱</span>
                  <span>{plan.roi}</span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mt-4">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="flex-grow">
                <p className="text-[11px] font-bold tracking-widest text-slate-400 mb-4">
                  {plan.featuresLabel}
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-200">
                      <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-lg bg-slate-800/40 border border-slate-700/40 p-3 flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-300 mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-400 leading-relaxed">{plan.note}</p>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => openWhatsApp(plan.title)}
                  className={`w-full font-semibold rounded-lg py-6 transition-all duration-300 hover:scale-105 ${
                    plan.popular
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30"
                      : "bg-transparent border border-white/20 text-white hover:bg-white/5"
                  }`}
                >
                  {plan.cta} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Footer help */}
        <p className="text-center text-sm text-slate-400 mt-12 max-w-2xl mx-auto leading-relaxed">
          Dúvidas sobre qual plano faz mais sentido para o seu momento?{" "}
          <button
            onClick={() => openWhatsApp("dúvida sobre planos")}
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
          >
            Fale com a nossa equipe
          </button>{" "}
          — em 15 minutos a gente te dá uma direção honesta, sem pressão de venda.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
