
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              SOBRE NÓS
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Na Descomplica Ops, a gente entende que operação travada é crescimento perdido.
          </p>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Somos especialistas em transformar operações comerciais e administrativas com
            Inteligência Artificial, integrações entre sistemas e automações inteligentes —
            para que sua equipe pare de gastar energia com tarefas repetitivas e foque no
            que realmente faz o negócio crescer.
          </p>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Não somos apenas um fornecedor de tecnologia. Somos parceiros na transformação
            da sua operação — do diagnóstico à entrega, e além.
          </p>
          <Button 
            onClick={() => navigate("/diagnostico")}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Solicite seu diagnóstico
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;
