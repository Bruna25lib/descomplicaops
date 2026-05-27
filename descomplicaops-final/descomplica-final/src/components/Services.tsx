import { useState, useMemo } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check, ArrowRight, Calendar } from "lucide-react";

type Category = "operacional" | "comercial" | "ia" | "integracoes";

type Service = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  categories: Category[];
  tagLabel: string;
  tagColor: "blue" | "purple" | "green" | "orange" | "cyan" | "pink";
  iconColor: "blue" | "purple" | "cyan" | "green" | "orange" | "pink";
  challenges: string[]; // mapped quiz answers
  details: {
    benefits: string[];
    example: string;
    roi: { value: string; label: string }[];
  };
};

const services: Service[] = [
  {
    id: "automacao-fluxos",
    emoji: "🔄",
    title: "Automação de Fluxos",
    description: "Eliminamos o trabalho manual repetitivo — conectando etapas, disparando ações e garantindo que nada caia no esquecimento.",
    categories: ["operacional"],
    tagLabel: "Operacional",
    tagColor: "blue",
    iconColor: "blue",
    challenges: ["repetitivas", "esquece"],
    details: {
      benefits: [
        "Conexão entre ferramentas que você já usa",
        "Disparo automático de ações em cadeia",
        "Notificações inteligentes para o time certo",
        "Logs e rastreabilidade de cada execução",
      ],
      example: "Quando um lead preenche o formulário, ele é cadastrado no CRM, recebe e-mail de boas-vindas, é distribuído para o vendedor certo e gera tarefa de follow-up — em segundos.",
      roi: [
        { value: "-15h", label: "por semana em tarefas manuais" },
        { value: "+98%", label: "de consistência no processo" },
      ],
    },
  },
  {
    id: "ia",
    emoji: "🧠",
    title: "Inteligência Artificial",
    description: "Aplicamos IA onde ela gera resultado real: qualificação de leads, respostas automáticas, análise de dados e muito mais.",
    categories: ["ia"],
    tagLabel: "IA",
    tagColor: "purple",
    iconColor: "purple",
    challenges: ["ia"],
    details: {
      benefits: [
        "Análise automática de dados e documentos",
        "Classificação e priorização de leads",
        "Respostas geradas com a voz da sua marca",
        "Insights acionáveis para decisão",
      ],
      example: "IA lê os e-mails recebidos, identifica intenção de compra, classifica urgência e direciona para o vendedor mais adequado — com resumo do contexto.",
      roi: [
        { value: "3x", label: "mais leads qualificados" },
        { value: "-70%", label: "no tempo de triagem" },
      ],
    },
  },
  {
    id: "paineis",
    emoji: "📊",
    title: "Painéis de Análise",
    description: "Transformamos dados dispersos em dashboards que mostram exatamente o que está funcionando — e o que precisa de atenção.",
    categories: ["operacional"],
    tagLabel: "Operacional",
    tagColor: "blue",
    iconColor: "cyan",
    challenges: ["bagunca"],
    details: {
      benefits: [
        "Dashboards atualizados em tempo real",
        "Métricas de vendas, operação e financeiro",
        "Alertas automáticos para desvios",
        "Visão consolidada multi-fontes",
      ],
      example: "Painel único mostra pipeline, taxa de conversão por vendedor, ticket médio e previsão de fechamento — atualizado a cada hora.",
      roi: [
        { value: "100%", label: "visibilidade do negócio" },
        { value: "-5h", label: "por semana montando relatório" },
      ],
    },
  },
  {
    id: "gestao-projetos",
    emoji: "📋",
    title: "Gestão Inteligente de Projetos",
    description: "Estruturamos o fluxo de trabalho do seu time com automações que criam, priorizam e delegam tarefas — sem planilha ou memória.",
    categories: ["operacional"],
    tagLabel: "Operacional",
    tagColor: "blue",
    iconColor: "orange",
    challenges: ["esquece", "bagunca"],
    details: {
      benefits: [
        "Criação automática de tarefas a partir de gatilhos",
        "Distribuição inteligente por carga e expertise",
        "Lembretes e escalonamento automático",
        "Visão de status em tempo real",
      ],
      example: "Quando um cliente assina contrato, o sistema cria automaticamente as tarefas de onboarding, atribui aos responsáveis e acompanha prazos.",
      roi: [
        { value: "-40%", label: "no tempo de execução" },
        { value: "0", label: "tarefas perdidas no esquecimento" },
      ],
    },
  },
  {
    id: "transcricao",
    emoji: "🎙️",
    title: "Transcrição de Reuniões",
    description: "Suas reuniões geram decisões importantes — mas quem documenta? Transcrevemos automaticamente e entregamos o resumo com pontos de ação.",
    categories: ["operacional", "ia"],
    tagLabel: "Operacional",
    tagColor: "blue",
    iconColor: "pink",
    challenges: ["repetitivas", "clientes"],
    details: {
      benefits: [
        "Transcrição com identificação de cada participante",
        "Resumo executivo automático",
        "Lista de pontos de ação com responsáveis",
        "Integração com CRM e gestor de tarefas",
      ],
      example: "Após cada reunião, o time recebe ata, resumo, decisões e tarefas atribuídas — direto no Slack ou e-mail.",
      roi: [
        { value: "-3h", label: "por semana documentando" },
        { value: "100%", label: "das decisões registradas" },
      ],
    },
  },
  {
    id: "pre-atendimento",
    emoji: "💬",
    title: "Pré-atendimento e Qualificação",
    description: "Nenhum lead fica sem resposta. Nossa automação inteligente qualifica, responde dúvidas e encaminha para o consultor certo — 24h por dia.",
    categories: ["comercial", "ia"],
    tagLabel: "Comercial · IA",
    tagColor: "green",
    iconColor: "green",
    challenges: ["clientes", "bagunca", "ia"],
    details: {
      benefits: [
        "Resposta imediata em qualquer canal",
        "Qualificação por critérios do seu funil",
        "Encaminhamento para o consultor certo",
        "Histórico completo no CRM",
      ],
      example: "Lead chega pelo WhatsApp às 23h, é qualificado, agenda demo no calendário do vendedor e recebe lembrete automático.",
      roi: [
        { value: "24/7", label: "atendimento sem operador" },
        { value: "+60%", label: "na taxa de resposta" },
      ],
    },
  },
  {
    id: "agendamentos",
    emoji: "📅",
    title: "Agendamentos",
    description: "Chega de vai e vem por e-mail para marcar reunião. Automatizamos agendamento, lembretes e confirmações do primeiro contato ao follow-up.",
    categories: ["comercial"],
    tagLabel: "Comercial",
    tagColor: "green",
    iconColor: "cyan",
    challenges: ["clientes", "repetitivas"],
    details: {
      benefits: [
        "Link de agendamento personalizado",
        "Sincronização com Google e Outlook",
        "Lembretes automáticos por e-mail e WhatsApp",
        "Reagendamento sem fricção",
      ],
      example: "Cliente acessa o link, escolhe horário disponível, recebe confirmação, lembrete 24h antes e link da reunião — sem você mover um dedo.",
      roi: [
        { value: "-80%", label: "no tempo de agendamento" },
        { value: "-50%", label: "em no-shows" },
      ],
    },
  },
  {
    id: "agentes-ia",
    emoji: "🤖",
    title: "Agentes de IA Conversacional",
    description: "Atendentes virtuais que conversam com seus clientes em linguagem natural — qualificam, respondem dúvidas e resolvem demandas com a cara da sua empresa.",
    categories: ["ia", "comercial"],
    tagLabel: "IA · Comercial",
    tagColor: "purple",
    iconColor: "purple",
    challenges: ["clientes", "ia"],
    details: {
      benefits: [
        "Conversação natural treinada com seu conteúdo",
        "Integração com WhatsApp, site e Instagram",
        "Escalonamento inteligente para humano",
        "Atualização contínua da base de conhecimento",
      ],
      example: "Agente responde dúvidas sobre produto, agenda demonstração, envia proposta e só passa para o vendedor quando há intenção real de compra.",
      roi: [
        { value: "-65%", label: "na carga do time de atendimento" },
        { value: "+45%", label: "em conversão de leads" },
      ],
    },
  },
  {
    id: "integracoes",
    emoji: "🔌",
    title: "Integrações de Sistemas",
    description: "Conectamos as ferramentas que sua empresa já usa — CRM, ERP, planilhas, WhatsApp — para os dados fluírem sem retrabalho.",
    categories: ["integracoes"],
    tagLabel: "Integrações",
    tagColor: "orange",
    iconColor: "orange",
    challenges: ["sistemas", "repetitivas"],
    details: {
      benefits: [
        "API e webhook para qualquer ferramenta",
        "Sincronização bidirecional de dados",
        "Tratamento de erros e retry automático",
        "Documentação completa do fluxo",
      ],
      example: "Venda fechada no CRM gera nota fiscal no ERP, atualiza estoque na planilha e envia confirmação ao cliente via WhatsApp — automaticamente.",
      roi: [
        { value: "0", label: "copia e cola entre sistemas" },
        { value: "-90%", label: "em erros de digitação" },
      ],
    },
  },
  {
    id: "crm",
    emoji: "💼",
    title: "CRM Inteligente",
    description: "Estruturamos e automatizamos seu CRM para que cada lead seja qualificado, distribuído e acompanhado no tempo certo — com IA apoiando seu time comercial.",
    categories: ["comercial", "integracoes"],
    tagLabel: "Comercial · Integrações",
    tagColor: "green",
    iconColor: "green",
    challenges: ["bagunca", "clientes", "sistemas"],
    details: {
      benefits: [
        "Pipeline configurado para sua operação",
        "Distribuição automática de leads",
        "Cadências e follow-ups automatizados",
        "Relatórios de conversão por etapa",
      ],
      example: "Lead entra, IA enriquece dados, distribui para o vendedor por região, dispara cadência de follow-up e alerta o gestor sobre estagnação.",
      roi: [
        { value: "+35%", label: "na taxa de conversão" },
        { value: "-50%", label: "no ciclo de vendas" },
      ],
    },
  },
];

const quizOptions = [
  { id: "repetitivas", label: "⏱ Perco tempo com tarefas repetitivas" },
  { id: "bagunca", label: "📉 Meu processo de vendas é bagunçado" },
  { id: "clientes", label: "💬 Não consigo acompanhar meus clientes" },
  { id: "esquece", label: "😰 Minha equipe esquece tarefas e prazos" },
  { id: "ia", label: "🤖 Quero usar IA mas não sei por onde começar" },
  { id: "sistemas", label: "🔌 Meus sistemas não se conversam" },
];

const filters: { id: "todos" | Category; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "operacional", label: "⚙️ Operacional" },
  { id: "comercial", label: "💼 Comercial" },
  { id: "ia", label: "🤖 Inteligência Artificial" },
  { id: "integracoes", label: "🔌 Integrações" },
];

const iconBg: Record<string, string> = {
  blue: "bg-blue-500/15 text-blue-300",
  purple: "bg-purple-500/15 text-purple-300",
  cyan: "bg-cyan-500/15 text-cyan-300",
  green: "bg-green-500/15 text-green-300",
  orange: "bg-orange-500/15 text-orange-300",
  pink: "bg-pink-500/15 text-pink-300",
};

const tagStyles: Record<string, string> = {
  blue: "bg-blue-500/12 text-blue-300",
  purple: "bg-purple-500/12 text-purple-300",
  green: "bg-green-500/12 text-green-300",
  orange: "bg-orange-500/12 text-orange-300",
  cyan: "bg-cyan-500/12 text-cyan-300",
  pink: "bg-pink-500/12 text-pink-300",
};

const Services = () => {
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [filter, setFilter] = useState<"todos" | Category>("todos");
  const [openService, setOpenService] = useState<Service | null>(null);

  const filtered = useMemo(() => {
    if (filter === "todos") return services;
    return services.filter((s) => s.categories.includes(filter));
  }, [filter]);

  const isHighlighted = (s: Service) => quizAnswer && s.challenges.includes(quizAnswer);
  const anyHighlighted = quizAnswer && filtered.some(isHighlighted);

  return (
    <section id="services" className="py-24 bg-slate-950 text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full mb-4">
            O que a Descomplica Ops faz
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Serviços que eliminam o retrabalho
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
            Do funil de vendas ao financeiro — identificamos onde seu processo trava e entregamos a automação certa para destravar.
          </p>
        </div>

        {/* Quiz */}
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-3xl mx-auto mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />
          <p className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-2">
            🎯 Diagnóstico rápido
          </p>
          <h3 className="text-lg font-bold mb-5">Qual é o seu maior desafio hoje?</h3>
          <div className="flex flex-wrap gap-2.5">
            {quizOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setQuizAnswer(quizAnswer === opt.id ? null : opt.id)}
                className={`text-sm font-medium px-4 py-2.5 rounded-lg border transition-all ${
                  quizAnswer === opt.id
                    ? "bg-blue-500/15 border-blue-500 text-blue-300 font-semibold"
                    : "border-white/10 text-slate-400 hover:border-blue-500 hover:text-slate-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {anyHighlighted && (
            <div className="mt-5 text-sm text-slate-400 px-4 py-3 bg-green-500/7 border border-green-500/20 rounded-lg">
              <strong className="text-green-400">✅ Destacamos</strong> os serviços mais indicados para o seu desafio. Clique em qualquer card para ver detalhes.
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-9">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`text-sm font-medium px-4 py-2 rounded-lg border transition-all ${
                filter === f.id
                  ? "bg-blue-500/15 border-blue-500 text-blue-300 font-semibold"
                  : "bg-slate-900 border-white/7 text-slate-400 hover:border-white/15 hover:text-slate-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500">
              Nenhum serviço encontrado nessa categoria. Tente outro filtro.
            </div>
          ) : (
            filtered.map((s) => {
              const highlighted = isHighlighted(s);
              const dimmed = anyHighlighted && !highlighted;
              return (
                <button
                  key={s.id}
                  onClick={() => setOpenService(s)}
                  className={`text-left bg-slate-900 border rounded-2xl p-6 transition-all relative overflow-hidden hover:-translate-y-1 hover:border-white/15 hover:shadow-2xl hover:shadow-black/40 ${
                    highlighted
                      ? "border-green-500 shadow-[0_0_0_1px_rgba(34,197,94,0.5),0_8px_32px_rgba(34,197,94,0.15)]"
                      : "border-white/7"
                  } ${dimmed ? "opacity-40" : ""}`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-3.5 ${iconBg[s.iconColor]}`}>
                    {s.emoji}
                  </div>
                  <h3 className="text-sm font-bold mb-1.5 leading-tight">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.description}</p>
                  <span className={`inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded mt-3 ${tagStyles[s.tagColor]}`}>
                    {s.tagLabel}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!openService} onOpenChange={(o) => !o && setOpenService(null)}>
        <DialogContent className="max-w-2xl bg-slate-900 border-white/10 text-slate-100 p-0 overflow-hidden max-h-[88vh] overflow-y-auto">
          {openService && (
            <>
              <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
              <div className="p-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 ${iconBg[openService.iconColor]}`}>
                  {openService.emoji}
                </div>
                <h3 className="text-2xl font-extrabold mb-2">{openService.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">{openService.description}</p>

                {/* Benefits */}
                <div className="mb-5">
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-slate-500 mb-3">
                    O que você ganha
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {openService.details.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Example */}
                <div className="bg-blue-500/7 border border-blue-500/15 rounded-xl px-4 py-3.5 mb-5">
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-blue-300 mb-1.5">
                    📌 Exemplo de uso
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">{openService.details.example}</p>
                </div>

                {/* ROI */}
                <div className="grid grid-cols-2 gap-2.5 mb-6">
                  {openService.details.roi.map((r, i) => (
                    <div key={i} className="bg-slate-800 border border-white/7 rounded-xl p-3.5">
                      <div className={`text-2xl font-extrabold mb-0.5 ${i === 0 ? "text-blue-400" : "text-green-400"}`}>
                        {r.value}
                      </div>
                      <div className="text-[11px] text-slate-500">{r.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex gap-2.5 flex-wrap">
                  <a
                    href="/diagnostico"
                    className="flex-1 min-w-[160px] bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-1.5 hover:opacity-85 transition-opacity"
                  >
                    <Calendar className="w-4 h-4" />
                    Quero esse serviço
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => {
                      setOpenService(null);
                      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex-1 min-w-[140px] bg-transparent text-slate-400 text-sm font-medium px-5 py-3 rounded-xl border border-white/15 hover:border-blue-500 hover:text-slate-100 transition-all"
                  >
                    Ver planos e preços
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Services;
