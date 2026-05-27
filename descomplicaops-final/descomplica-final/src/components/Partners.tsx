import githubLogo from "@/assets/partners/github.jpg";
import googleLogo from "@/assets/partners/google.webp";
import oracleLogo from "@/assets/partners/oracle.png";
import makeLogo from "@/assets/partners/make.png";
import microsoftLogo from "@/assets/partners/microsoft.jpg";
import n8nLogo from "@/assets/partners/n8n.png";
import claudeLogo from "@/assets/partners/claude.png";
import openaiLogo from "@/assets/partners/openai.png";
import geminiLogo from "@/assets/partners/gemini.png";

const partners = [
  { name: "Google", logo: googleLogo },
  { name: "Microsoft", logo: microsoftLogo },
  { name: "Oracle", logo: oracleLogo },
  { name: "GitHub", logo: githubLogo },
  { name: "n8n", logo: n8nLogo },
  { name: "Make", logo: makeLogo },
  { name: "OpenAI", logo: openaiLogo },
  { name: "Claude", logo: claudeLogo },
  { name: "Gemini", logo: geminiLogo },
];

const Partners = () => {
  const allPartners = [...partners, ...partners];

  return (
    <section
      id="parceiros"
      className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-20 md:py-28 overflow-hidden"
    >
      {/* Decorative blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 border border-cyan-400/30 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-medium text-cyan-300">
              Ecossistema de tecnologia
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight tracking-tight">
            <span className="text-slate-200">Nossos </span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              parceiros estratégicos
            </span>
          </h2>

          <p className="text-base md:text-lg text-slate-400 leading-relaxed">
            Trabalhamos com as plataformas que sustentam as operações mais eficientes do mundo.
            Você usa o melhor de cada uma, integrado do jeito certo.
          </p>
        </div>

        {/* Marquee vitrine */}
        <div className="relative">
          {/* Fade left */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          {/* Fade right */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />

          <div className="overflow-hidden">
            <div className="flex animate-marquee">
              {allPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="group flex-shrink-0 w-48 md:w-56 mx-3 md:mx-4"
                >
                  <div className="relative aspect-[16/10] rounded-2xl bg-white border border-white/10 px-6 flex items-center justify-center transition-all duration-300 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/20">
                    <img
                      src={partner.logo}
                      alt={`Logo ${partner.name}`}
                      loading="lazy"
                      className="max-h-12 md:max-h-14 w-auto object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer line */}
        <p className="text-center text-sm text-slate-400 mt-12 px-4">
          Integramos qualquer ferramenta com API. Não encontrou a sua?{" "}
          <a href="#lead-capture" className="text-cyan-300 hover:text-cyan-200 font-semibold underline underline-offset-4">
            Conta pra gente
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default Partners;