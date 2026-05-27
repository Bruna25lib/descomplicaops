
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "O que é automação de processos?",
    answer:
      "Automação de processos é quando você substitui tarefas repetitivas — que alguém faz manualmente todo dia — por sistemas que fazem isso de forma automática, sem erro e sem precisar de ninguém. Pensa em e-mails que disparam sozinhos, dados que se movem entre ferramentas sem copiar e colar, ou leads que são qualificados antes de chegar ao vendedor."
  },
  {
    question: "Como a IA pode ajudar minha empresa?",
    answer:
      "A IA deixou de ser coisa do futuro — ela já está resolvendo problemas reais nas operações de empresas como a sua. Na prática: qualificando leads automaticamente, respondendo clientes fora do horário comercial, resumindo reuniões, gerando relatórios e muito mais. A gente identifica onde ela faz mais sentido no seu contexto e implementa de forma que o seu time consegue usar no dia a dia."
  },
  {
    question: "Quanto tempo leva para implementar as soluções?",
    answer:
      "Depende da complexidade, mas a maioria das automações do plano Start entra em funcionamento em 2 a 3 semanas. Projetos mais complexos do Growth ou Enterprise têm cronograma definido no diagnóstico inicial — e você acompanha cada etapa."
  },
  {
    question: "É necessário conhecimento técnico para usar as soluções?",
    answer:
      "Não. Tudo que entregamos é pensado para que o seu time use sem precisar entender de código ou tecnologia. Nós cuidamos da parte técnica — você só precisa usar o resultado."
  },
  {
    question: "Como funciona o diagnóstico gratuito?",
    answer:
      "É uma sessão de até 1 hora com um especialista da Descomplica Ops. A gente mapeia como sua operação funciona hoje, identifica os principais gargalos e mostra quais automações fariam mais diferença no seu caso — sem compromisso. No final, você sai com clareza sobre o próximo passo, independentemente de contratar ou não."
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Perguntas que todo mundo faz antes de começar
            </span>
          </h2>
          
          <Accordion type="single" collapsible className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                <AccordionTrigger className="px-8 py-6 hover:bg-white/5 text-left text-white font-semibold text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 pt-0">
                  <p className="text-gray-300 text-lg leading-relaxed">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
