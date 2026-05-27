import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, CheckCircle2, Loader2, MessageSquare } from "lucide-react";

const COMPANY_SIZES = [
  "1 – 10 funcionários",
  "11 – 50 funcionários",
  "51 – 200 funcionários",
  "201 – 500 funcionários",
  "501 – 1.000 funcionários",
  "Mais de 1.000 funcionários",
] as const;

const CHALLENGE_OPTIONS = [
  "Processos manuais e retrabalho",
  "Falta de padronização entre áreas",
  "Dificuldade em integrar sistemas (ERP, CRM, planilhas)",
  "Atendimento ao cliente sobrecarregado",
  "Time gasta tempo demais em tarefas repetitivas",
  "Falta de indicadores claros para tomar decisão",
  "Crescimento travado pela operação",
] as const;

const leadSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(8, "Telefone inválido").max(30),
  company: z.string().trim().min(2, "Informe sua empresa").max(150),
  role: z.string().trim().min(2, "Informe seu cargo").max(100),
  companySize: z
    .string()
    .min(1, "Selecione o tamanho da empresa")
    .refine((v) => (COMPANY_SIZES as readonly string[]).includes(v), {
      message: "Selecione o tamanho da empresa",
    }),
  challenges: z
    .array(z.string())
    .min(1, "Selecione pelo menos um desafio"),
  challengeDetail: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais (mínimo 10 caracteres)")
    .max(1000),
});

type FormState = z.infer<typeof leadSchema>;

type FormDraft = {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  companySize: string;
  challenges: string[];
  challengeDetail: string;
};

const initialState: FormDraft = {
  name: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  companySize: "",
  challenges: [],
  challengeDetail: "",
};

const Diagnostico = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormDraft>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (key: keyof FormDraft) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key as keyof FormState])
      setErrors((prev) => ({ ...prev, [key as keyof FormState]: undefined }));
  };

  const toggleChallenge = (value: string) => {
    setForm((f) => {
      const exists = f.challenges.includes(value);
      return {
        ...f,
        challenges: exists
          ? f.challenges.filter((c) => c !== value)
          : [...f.challenges, value],
      };
    });
    if (errors.challenges) setErrors((p) => ({ ...p, challenges: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = leadSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrs: Partial<Record<keyof FormState, string>> = {};
      parsed.error.issues.forEach((iss) => {
        const k = iss.path[0] as keyof FormState;
        if (!fieldErrs[k]) fieldErrs[k] = iss.message;
      });
      setErrors(fieldErrs);
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-lead", {
        body: parsed.data,
      });
      if (error || (data as any)?.error) {
        throw new Error((data as any)?.error || error?.message || "Erro ao enviar");
      }
      setSuccess(true);
      toast({
        title: "Recebemos seu contato!",
        description: "Em breve a Bruna entrará em contato com você.",
      });
    } catch (err) {
      toast({
        title: "Não foi possível enviar",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center px-4 py-20">
        <Card className="max-w-lg w-full bg-white/5 backdrop-blur-lg border-white/20">
          <CardContent className="p-8 md:p-10 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="h-16 w-16 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Tudo certo!
            </h1>
            <p className="text-slate-200 mb-2 leading-relaxed">
              Recebemos as informações sobre o seu negócio.
            </p>
            <p className="text-slate-300 mb-8 leading-relaxed">
              A Bruna vai analisar seu cenário e entrar em contato em breve com um diagnóstico
              personalizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() =>
                  window.open(
                    "https://wa.me/5548992052888?text=Ol%C3%A1%21%20Acabei%20de%20preencher%20o%20formul%C3%A1rio%20de%20diagn%C3%B3stico%20no%20site.",
                    "_blank",
                  )
                }
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Falar agora no WhatsApp
              </Button>
              <Button onClick={() => navigate("/")} className="border border-white/30 text-white bg-primary">
                Voltar ao site
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-12 md:py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center text-slate-300 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </button>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Solicite seu diagnóstico gratuito
            </span>
          </h1>
          <p className="text-slate-300 leading-relaxed">
            Conte um pouco sobre o seu negócio. A Bruna vai analisar e voltar com um diagnóstico
            personalizado, sem compromisso.
          </p>
        </div>

        <Card className="bg-white/5 backdrop-blur-lg border-white/20">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name" className="text-slate-200">Nome completo *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={handleChange("name")}
                    className="mt-1.5 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    placeholder="Seu nome"
                    maxLength={100}
                  />
                  {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="text-slate-200">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    className="mt-1.5 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    placeholder="voce@empresa.com"
                    maxLength={255}
                  />
                  {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="phone" className="text-slate-200">WhatsApp / Telefone *</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    className="mt-1.5 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    placeholder="(48) 99999-9999"
                    maxLength={30}
                  />
                  {errors.phone && <p className="text-sm text-red-400 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <Label htmlFor="company" className="text-slate-200">Empresa *</Label>
                  <Input
                    id="company"
                    value={form.company}
                    onChange={handleChange("company")}
                    className="mt-1.5 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    placeholder="Nome da sua empresa"
                    maxLength={150}
                  />
                  {errors.company && <p className="text-sm text-red-400 mt-1">{errors.company}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="role" className="text-slate-200">Seu cargo *</Label>
                  <Input
                    id="role"
                    value={form.role}
                    onChange={handleChange("role")}
                    className="mt-1.5 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    placeholder="Ex.: CEO, Gerente de Operações"
                    maxLength={100}
                  />
                  {errors.role && <p className="text-sm text-red-400 mt-1">{errors.role}</p>}
                </div>
                <div>
                  <Label htmlFor="companySize" className="text-slate-200">
                    Tamanho da empresa *
                  </Label>
                  <Select
                    value={form.companySize}
                    onValueChange={(v) => {
                      setForm((f) => ({ ...f, companySize: v }));
                      if (errors.companySize)
                        setErrors((p) => ({ ...p, companySize: undefined }));
                    }}
                  >
                    <SelectTrigger
                      id="companySize"
                      className="mt-1.5 bg-white/10 border-white/20 text-white"
                    >
                      <SelectValue placeholder="Selecione o número de funcionários" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMPANY_SIZES.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.companySize && (
                    <p className="text-sm text-red-400 mt-1">{errors.companySize}</p>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-slate-200">
                  Quais são os principais desafios operacionais hoje? *
                </Label>
                <p className="text-xs text-slate-400 mt-1 mb-3">
                  Selecione todos que se aplicam.
                </p>
                <div className="space-y-2.5">
                  {CHALLENGE_OPTIONS.map((option) => {
                    const checked = form.challenges.includes(option);
                    return (
                      <label
                        key={option}
                        htmlFor={`challenge-${option}`}
                        className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors"
                      >
                        <Checkbox
                          id={`challenge-${option}`}
                          checked={checked}
                          onCheckedChange={() => toggleChallenge(option)}
                          className="mt-0.5 border-white/40 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                        />
                        <span className="text-sm text-slate-200 leading-snug">{option}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.challenges && (
                  <p className="text-sm text-red-400 mt-2">{errors.challenges}</p>
                )}
              </div>

              <div>
                <Label htmlFor="challengeDetail" className="text-slate-200">
                  Conte um pouco mais sobre o seu cenário *
                </Label>
                <Textarea
                  id="challengeDetail"
                  value={form.challengeDetail}
                  onChange={handleChange("challengeDetail")}
                  className="mt-1.5 bg-white/10 border-white/20 text-white placeholder:text-slate-400 min-h-[120px]"
                  placeholder="Ex.: O time comercial perde tempo passando dados do WhatsApp para a planilha e a gente não tem visibilidade do funil..."
                  maxLength={1000}
                />
                {errors.challengeDetail && (
                  <p className="text-sm text-red-400 mt-1">{errors.challengeDetail}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-6 text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar e receber meu diagnóstico"
                )}
              </Button>

              <p className="text-xs text-slate-400 text-center">
                Seus dados são tratados com confidencialidade e usados apenas para entrarmos em
                contato.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Diagnostico;