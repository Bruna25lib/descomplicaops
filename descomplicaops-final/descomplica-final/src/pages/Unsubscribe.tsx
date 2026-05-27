import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type State =
  | { status: "loading" }
  | { status: "valid" }
  | { status: "already" }
  | { status: "invalid" }
  | { status: "submitting" }
  | { status: "done" }
  | { status: "error"; message: string };

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    if (!token) {
      setState({ status: "invalid" });
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } },
        );
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (res.ok && data?.valid) setState({ status: "valid" });
        else if (data?.reason === "already_unsubscribed")
          setState({ status: "already" });
        else setState({ status: "invalid" });
      } catch {
        if (!cancelled) setState({ status: "invalid" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState({ status: "submitting" });
    try {
      const { data, error } = await supabase.functions.invoke(
        "handle-email-unsubscribe",
        { body: { token } },
      );
      if (error) throw new Error(error.message);
      if ((data as any)?.success || (data as any)?.reason === "already_unsubscribed") {
        setState({ status: "done" });
      } else {
        setState({
          status: "error",
          message: (data as any)?.error ?? "Não foi possível processar agora.",
        });
      }
    } catch (e) {
      setState({
        status: "error",
        message: (e as Error).message ?? "Erro inesperado",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center px-4 py-20">
      <Card className="max-w-md w-full bg-white/5 backdrop-blur-lg border-white/20">
        <CardContent className="p-8 text-center">
          {state.status === "loading" && (
            <>
              <Loader2 className="h-10 w-10 mx-auto mb-4 animate-spin text-cyan-400" />
              <p className="text-slate-200">Verificando seu link…</p>
            </>
          )}

          {state.status === "valid" && (
            <>
              <h1 className="text-2xl font-bold mb-3">Cancelar assinatura</h1>
              <p className="text-slate-300 mb-6">
                Tem certeza de que quer parar de receber e-mails da Descomplica Ops?
              </p>
              <Button
                onClick={confirm}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 w-full"
              >
                Confirmar cancelamento
              </Button>
            </>
          )}

          {state.status === "submitting" && (
            <>
              <Loader2 className="h-10 w-10 mx-auto mb-4 animate-spin text-cyan-400" />
              <p className="text-slate-200">Processando…</p>
            </>
          )}

          {state.status === "done" && (
            <>
              <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-cyan-400" />
              <h1 className="text-2xl font-bold mb-2">Tudo certo</h1>
              <p className="text-slate-300">
                Você não vai mais receber nossos e-mails.
              </p>
            </>
          )}

          {state.status === "already" && (
            <>
              <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-cyan-400" />
              <h1 className="text-2xl font-bold mb-2">Já cancelado</h1>
              <p className="text-slate-300">
                Esse e-mail já estava descadastrado.
              </p>
            </>
          )}

          {state.status === "invalid" && (
            <>
              <XCircle className="h-12 w-12 mx-auto mb-4 text-red-400" />
              <h1 className="text-2xl font-bold mb-2">Link inválido</h1>
              <p className="text-slate-300">
                Esse link de cancelamento expirou ou não é válido.
              </p>
            </>
          )}

          {state.status === "error" && (
            <>
              <XCircle className="h-12 w-12 mx-auto mb-4 text-red-400" />
              <h1 className="text-2xl font-bold mb-2">Algo deu errado</h1>
              <p className="text-slate-300">{state.message}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Unsubscribe;