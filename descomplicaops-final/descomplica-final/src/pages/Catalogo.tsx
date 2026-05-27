import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Tool = { name: string; color: string };
type Step = { t: string; d: string };
type Automation = {
  id: string;
  cat: "comercial" | "operacional" | "financeiro" | "marketing" | "rh" | "cs" | "dados";
  level: "simple" | "complex";
  ico: string;
  title: string;
  desc: string;
  timeSaved: string;
  deadline: string;
  plan: string;
  complexity: number;
  steps: Step[];
  tools: Tool[];
};

const automations: Automation[] = [
  // ── COMERCIAL ──
  { id: "c1", cat: "comercial", level: "simple", ico: "📩", title: "Captura e Qualificação de Leads", desc: "Lead preenche formulário → Make processa → IA pontua → WhatsApp enviado em <60s. Nunca mais perca um lead por demora.", timeSaved: "3h/dia", deadline: "7 dias", plan: "Start", complexity: 2,
    steps: [{ t: "Lead entra pelo formulário ou landing page", d: "Google Forms, Typeform ou formulário do site geram um webhook automático" }, { t: "Make recebe e processa os dados", d: "Valida campos, normaliza o formato e aciona os próximos passos" }, { t: "Score calculado automaticamente", d: "Planilha Google aplica critérios: cargo, empresa, orçamento, urgência. Score 0–100." }, { t: "WhatsApp personalizado enviado", d: "Mensagem com nome e contexto do lead enviada em menos de 60 segundos" }, { t: "CRM atualizado", d: "Lead criado no HubSpot/Sheets com score, status e próxima ação definida" }],
    tools: [{ name: "Google Forms", color: "#4285F4" }, { name: "Make", color: "#a855f7" }, { name: "WhatsApp API", color: "#25D366" }, { name: "Google Sheets", color: "#34A853" }] },
  { id: "c2", cat: "comercial", level: "simple", ico: "📅", title: "Agendamento Automático de Reuniões", desc: "Fim do vai e vem por e-mail. Link de agendamento integrado à agenda, confirmação automática, lembrete 24h antes e follow-up depois.", timeSaved: "45min/dia", deadline: "5 dias", plan: "Start", complexity: 1,
    steps: [{ t: "Link de agendamento enviado ao lead", d: "Cal.com ou Calendly integrado com Google Calendar do consultor" }, { t: "Lead escolhe horário disponível", d: "Sem conflitos, sem dupla marcação — agenda sincronizada em tempo real" }, { t: "Confirmação automática enviada", d: "E-mail + WhatsApp com dados da reunião e link de videoconferência" }, { t: "Lembrete 24h e 1h antes", d: "Automático para ambos: consultor e lead. No-show cai em até 68%." }, { t: "Follow-up automático pós-reunião", d: "E-mail com resumo, próximos passos e proposta (se aplicável) enviados automaticamente" }],
    tools: [{ name: "Google Calendar", color: "#4285F4" }, { name: "Make", color: "#a855f7" }, { name: "Gmail", color: "#EA4335" }, { name: "WhatsApp", color: "#25D366" }] },
  { id: "c3", cat: "comercial", level: "simple", ico: "📄", title: "Follow-up Automático de Propostas", desc: "Proposta enviada e não respondeu? Sequência automática de lembretes no momento certo — sem parecer insistente.", timeSaved: "1h/dia", deadline: "5 dias", plan: "Start", complexity: 2,
    steps: [{ t: "Proposta enviada → timer iniciado", d: "Make monitora se o lead abriu o email (via tracking pixel)" }, { t: "Após 48h sem resposta: 1º lembrete", d: "Email personalizado perguntando se há dúvidas sobre a proposta" }, { t: "Após 5 dias: 2º contato via WhatsApp", d: "Mensagem amigável com resumo do valor entregue" }, { t: "Após 10 dias: oferta alternativa", d: "Plano de entrada ou consultoria pontual como caminho de baixo custo" }, { t: "Alerta para o consultor", d: "Se nenhuma resposta após 14 dias, tarefa criada no ClickUp para ligação" }],
    tools: [{ name: "Make", color: "#a855f7" }, { name: "Gmail", color: "#EA4335" }, { name: "WhatsApp", color: "#25D366" }, { name: "ClickUp", color: "#7B68EE" }] },
  { id: "c4", cat: "comercial", level: "complex", ico: "🤖", title: "Pipeline Comercial Completo com IA", desc: "Do primeiro contato ao contrato assinado — sem toque humano nas etapas operacionais. N8N orquestra tudo com IA qualificando, proposta gerada e onboarding automático.", timeSaved: "20h/semana", deadline: "25 dias", plan: "Enterprise", complexity: 5,
    steps: [{ t: "Captura multicanal centralizada", d: "Site, WhatsApp, Instagram, email e LinkedIn — tudo no mesmo fluxo N8N" }, { t: "GPT-4o analisa e qualifica", d: "Classifica intenção, sugere plano ideal, escreve primeiro contato personalizado" }, { t: "CRM populado e roteado", d: "HubSpot criado automaticamente com score, tag e consultora responsável" }, { t: "Proposta gerada pela IA", d: "GPT-4o redige proposta em template SharePoint baseada no diagnóstico do lead" }, { t: "Assinatura digital e pagamento", d: "DocuSign + link de pagamento. Confirmação ativa o onboarding automaticamente" }],
    tools: [{ name: "N8N", color: "#ef6c00" }, { name: "OpenAI", color: "#10a37f" }, { name: "HubSpot", color: "#ff7a59" }, { name: "SharePoint", color: "#0078d4" }, { name: "DocuSign", color: "#1a5c9a" }] },
  { id: "c5", cat: "comercial", level: "complex", ico: "🧠", title: "Agente de Pré-atendimento com IA", desc: "Atendente virtual que conhece seu negócio — responde dúvidas, qualifica leads, agenda reuniões e transfere para humano só quando necessário. Funciona 24/7.", timeSaved: "4h/dia", deadline: "20 dias", plan: "Growth", complexity: 4,
    steps: [{ t: "Lead inicia conversa no WhatsApp ou site", d: "Agente de IA responde em menos de 5 segundos em linguagem natural" }, { t: "IA faz perguntas estratégicas", d: "Mapeia necessidade, porte da empresa, urgência e orçamento disponível" }, { t: "Score calculado em tempo real", d: "Se lead quente: agenda reunião automaticamente e notifica consultor" }, { t: "Lead frio: nurture personalizado", d: "IA envia conteúdo relevante ao longo dos dias seguintes" }, { t: "Transferência inteligente", d: "Quando lead pede falar com humano, IA passa contexto completo para o consultor" }],
    tools: [{ name: "OpenAI GPT-4o", color: "#10a37f" }, { name: "N8N", color: "#ef6c00" }, { name: "WhatsApp API", color: "#25D366" }, { name: "Make", color: "#a855f7" }] },
  // ── OPERACIONAL ──
  { id: "o1", cat: "operacional", level: "simple", ico: "✅", title: "Onboarding de Novo Cliente", desc: "Cliente assinou? Em menos de 5 minutos: pasta criada no ClickUp, credenciais enviadas, reunião de kickoff agendada e boas-vindas no WhatsApp.", timeSaved: "2h por cliente", deadline: "7 dias", plan: "Start", complexity: 2,
    steps: [{ t: "Contrato assinado → gatilho ativado", d: "Pagamento confirmado ou DocuSign detectado pelo Make" }, { t: "Pasta e tarefas criadas no ClickUp", d: "Template de projeto aplicado com todas as tarefas padrão do onboarding" }, { t: "Credenciais e acessos gerados", d: "Convites enviados para ferramentas relevantes automaticamente" }, { t: "E-mail e WhatsApp de boas-vindas", d: "Mensagem personalizada com nome, próximos passos e contato da responsável" }, { t: "Kickoff agendado automaticamente", d: "Slot na agenda da consultora + link de videoconferência enviado ao cliente" }],
    tools: [{ name: "Make", color: "#a855f7" }, { name: "ClickUp", color: "#7B68EE" }, { name: "Gmail", color: "#EA4335" }, { name: "Google Calendar", color: "#4285F4" }, { name: "WhatsApp", color: "#25D366" }] },
  { id: "o2", cat: "operacional", level: "simple", ico: "🎙️", title: "Transcrição e Resumo de Reuniões", desc: "Sua reunião gravada vira um documento estruturado automaticamente: resumo, decisões e próximas ações distribuídos para todos em menos de 2 minutos.", timeSaved: "40min/reunião", deadline: "5 dias", plan: "Start", complexity: 1,
    steps: [{ t: "Reunião gravada (Zoom, Meet, Teams)", d: "Arquivo de vídeo/áudio enviado para o fluxo automaticamente" }, { t: "Whisper transcreve o áudio", d: "Transcrição fiel em português com identificação de falantes" }, { t: "GPT-4o estrutura o resumo", d: "Extrai: decisões tomadas, action items, responsáveis e prazos" }, { t: "Documento gerado no Notion ou Drive", d: "Formatado com seções claras e linkado ao projeto no ClickUp" }, { t: "Resumo enviado aos participantes", d: "E-mail automático com resumo e tarefas criadas para cada responsável" }],
    tools: [{ name: "OpenAI Whisper", color: "#10a37f" }, { name: "GPT-4o", color: "#10a37f" }, { name: "Make", color: "#a855f7" }, { name: "ClickUp", color: "#7B68EE" }, { name: "Notion", color: "#000" }] },
  { id: "o3", cat: "operacional", level: "simple", ico: "📋", title: "Gestão de Tarefas com Automação", desc: "Nada cai no esquecimento. Tarefas criadas automaticamente por eventos, prazos cobrados sem intervenção e relatório de progresso gerado sozinho.", timeSaved: "1.5h/dia", deadline: "7 dias", plan: "Start", complexity: 2,
    steps: [{ t: "Evento disparador mapeado", d: "Ex: cliente novo → task criada. Proposta enviada → task de follow-up agendada" }, { t: "Tarefas criadas com prazo e responsável", d: "Template aplicado automaticamente com todos os campos preenchidos" }, { t: "Lembretes automáticos", d: "Notificação no Teams/WhatsApp 24h antes do prazo" }, { t: "Escalada se não concluída", d: "Tarefa atrasada → alerta para o gestor automaticamente" }, { t: "Relatório semanal de progresso", d: "Status consolidado enviado toda segunda-feira de manhã" }],
    tools: [{ name: "ClickUp", color: "#7B68EE" }, { name: "Make", color: "#a855f7" }, { name: "Microsoft Teams", color: "#0078d4" }, { name: "WhatsApp", color: "#25D366" }] },
  { id: "o4", cat: "operacional", level: "complex", ico: "🔗", title: "Integração de Sistemas (Hub Central)", desc: "Seus sistemas não conversam? Conectamos CRM, ERP, planilhas e WhatsApp num único fluxo. Dados fluem automaticamente — sem copiar e colar.", timeSaved: "2h/dia", deadline: "20 dias", plan: "Enterprise", complexity: 5,
    steps: [{ t: "Mapeamento de todos os sistemas", d: "Levantamento completo das ferramentas, fluxos de dados e pontos de falha" }, { t: "Integração via API ou webhook", d: "N8N conecta os sistemas com tratamento de erros e retry automático" }, { t: "Sincronização bidirecional", d: "Dados atualizados em tempo real em todas as plataformas simultaneamente" }, { t: "Log e monitoramento", d: "Dashboard de saúde das integrações com alertas para falhas" }, { t: "Documentação e treinamento", d: "Manual do fluxo e treinamento do time para manutenção" }],
    tools: [{ name: "N8N", color: "#ef6c00" }, { name: "Oracle ERP", color: "#c0392b" }, { name: "HubSpot", color: "#ff7a59" }, { name: "Google Sheets", color: "#34A853" }, { name: "WhatsApp API", color: "#25D366" }] },
  // ── FINANCEIRO ──
  { id: "f1", cat: "financeiro", level: "simple", ico: "💳", title: "Régua de Cobrança Automática", desc: "Boleto vence em 3 dias? Cliente recebe lembrete. Venceu? Segundo aviso. Em aberto por 5 dias? Escalada automática. Tudo sem você intervir.", timeSaved: "2h/dia", deadline: "7 dias", plan: "Start", complexity: 2,
    steps: [{ t: "Vencimento mapeado no sistema", d: "Integração com ERP, Omie, Conta Azul ou planilha de contas a receber" }, { t: "Lembrete D-3 enviado", d: "WhatsApp e email amigáveis com link do boleto ou Pix" }, { t: "Alerta no dia do vencimento", d: "Segundo contato com link de pagamento e sugestão de renegociação" }, { t: "Cobrança D+3", d: "Mensagem mais firme com prazo de regularização e consequências" }, { t: "Escalada D+7", d: "Tarefa criada para o financeiro + alerta para o gestor de conta" }],
    tools: [{ name: "Make", color: "#a855f7" }, { name: "WhatsApp", color: "#25D366" }, { name: "Gmail", color: "#EA4335" }, { name: "Omie/Conta Azul", color: "#2563eb" }] },
  { id: "f2", cat: "financeiro", level: "simple", ico: "🧾", title: "Emissão Automática de Nota Fiscal", desc: "Pagamento confirmado → nota fiscal emitida automaticamente. Sem entrada manual de dados, sem atraso e sem erro.", timeSaved: "30min/NF", deadline: "10 dias", plan: "Growth", complexity: 3,
    steps: [{ t: "Pagamento detectado", d: "Webhook do gateway de pagamento (Stripe, Pagar.me, Mercado Pago) ativa o fluxo" }, { t: "Dados extraídos e validados", d: "N8N puxa dados do cliente, valor, serviço e competência fiscal" }, { t: "NF emitida na prefeitura", d: "Integração direta com sistema de NFe/NFSe do município" }, { t: "PDF enviado ao cliente", d: "Email automático com nota fiscal e agradecimento" }, { t: "Registro contábil atualizado", d: "Lançamento criado no ERP para conciliação bancária" }],
    tools: [{ name: "N8N", color: "#ef6c00" }, { name: "Make", color: "#a855f7" }, { name: "NFe/NFSe API", color: "#16a34a" }, { name: "Gmail", color: "#EA4335" }] },
  { id: "f3", cat: "financeiro", level: "complex", ico: "💰", title: "Gestão Financeira Automatizada", desc: "DRE, contas a pagar e receber, conciliação bancária e relatório de caixa — tudo atualizado automaticamente e disponível em dashboard em tempo real.", timeSaved: "6h/semana", deadline: "25 dias", plan: "Enterprise", complexity: 5,
    steps: [{ t: "Integração bancária (Open Finance)", d: "Extrato bancário puxado automaticamente via API ou OFX diário" }, { t: "Categorização por IA", d: "GPT-4o classifica cada lançamento no plano de contas correto" }, { t: "Conciliação automática", d: "Compara extrato bancário com lançamentos do ERP — aponta diferenças" }, { t: "DRE atualizado em tempo real", d: "Looker Studio ou Power BI mostra resultado do mês a qualquer momento" }, { t: "Alertas de fluxo de caixa", d: "Notificação quando o saldo projetado fica abaixo do limite configurado" }],
    tools: [{ name: "N8N", color: "#ef6c00" }, { name: "OpenAI", color: "#10a37f" }, { name: "Oracle ERP", color: "#c0392b" }, { name: "Power BI", color: "#f2c811" }, { name: "Open Finance API", color: "#2563eb" }] },
  // ── MARKETING ──
  { id: "m1", cat: "marketing", level: "simple", ico: "📧", title: "Sequência de Email Marketing Automática", desc: "Lead novo entra na lista → recebe sequência personalizada ao longo de 14 dias com conteúdo relevante ao seu perfil. Alta conversão sem esforço manual.", timeSaved: "3h/semana", deadline: "7 dias", plan: "Start", complexity: 2,
    steps: [{ t: "Lead capturado e tagueado", d: "Formulário ou CRM classifica o lead por segmento, interesse e estágio" }, { t: "Sequência personalizada ativada", d: "Make ou N8N seleciona a jornada certa para aquele perfil" }, { t: "Emails entregues nos dias certos", d: "Cadência configurada: D1, D3, D7, D10, D14 com conteúdo progressivo" }, { t: "Comportamento rastreado", d: "Abertura, clique e resposta disparam ações diferentes no fluxo" }, { t: "Converteu? Muda de estágio", d: "Lead que clicou em \"falar com consultor\" vai direto para o pipeline comercial" }],
    tools: [{ name: "Make", color: "#a855f7" }, { name: "Gmail / Brevo", color: "#EA4335" }, { name: "HubSpot", color: "#ff7a59" }, { name: "Google Sheets", color: "#34A853" }] },
  { id: "m2", cat: "marketing", level: "simple", ico: "📱", title: "Postagem Automática nas Redes Sociais", desc: "Conteúdo aprovado uma vez, publicado automaticamente nas redes certas, no horário de maior engajamento — sem você precisar lembrar.", timeSaved: "1h/dia", deadline: "5 dias", plan: "Start", complexity: 1,
    steps: [{ t: "Conteúdo criado e aprovado", d: "Equipe aprova o post em uma planilha ou Notion compartilhado" }, { t: "Make agenda a publicação", d: "Data, hora e redes sociais configuradas por post" }, { t: "Publicação automática", d: "Instagram, LinkedIn, Facebook — publicado no horário ideal" }, { t: "Métricas coletadas", d: "Engajamento, alcance e cliques consolidados em relatório" }, { t: "Reagendamento de melhores posts", d: "Posts com alto desempenho reprogramados automaticamente após 30 dias" }],
    tools: [{ name: "Make", color: "#a855f7" }, { name: "Buffer", color: "#168de2" }, { name: "Google Sheets", color: "#34A853" }, { name: "Notion", color: "#000" }] },
  { id: "m3", cat: "marketing", level: "complex", ico: "🎯", title: "Campanha de Reativação de Clientes", desc: "Detecta clientes que sumiram, entende o motivo por IA, e executa jornada personalizada para reconquistar — tudo automaticamente.", timeSaved: "8h/semana", deadline: "18 dias", plan: "Growth", complexity: 4,
    steps: [{ t: "Identificação de clientes inativos", d: "CRM aponta clientes sem compra ou contato há mais de 60 dias" }, { t: "IA analisa o histórico", d: "GPT-4o avalia interações passadas e sugere abordagem personalizada" }, { t: "Jornada de reativação iniciada", d: "Sequência multicanal: email → WhatsApp → oferta exclusiva → ligação" }, { t: "Oferta personalizada gerada", d: "IA cria proposta baseada no que o cliente comprou anteriormente" }, { t: "Resultado monitorado", d: "Dashboard mostra taxa de reativação, canal de maior sucesso e ROI da campanha" }],
    tools: [{ name: "N8N", color: "#ef6c00" }, { name: "OpenAI", color: "#10a37f" }, { name: "HubSpot", color: "#ff7a59" }, { name: "WhatsApp API", color: "#25D366" }, { name: "Gmail", color: "#EA4335" }] },
  // ── RH ──
  { id: "r1", cat: "rh", level: "simple", ico: "🤝", title: "Onboarding de Novos Colaboradores", desc: "Colaborador contratado → acesso a todos os sistemas criado, documentos enviados para assinar, apresentações agendadas e buddy designado. Tudo automático.", timeSaved: "4h por contratação", deadline: "10 dias", plan: "Growth", complexity: 3,
    steps: [{ t: "Contratação confirmada no sistema", d: "ATS ou planilha de RH aciona o fluxo quando status muda para \"Contratado\"" }, { t: "Contas e acessos criados", d: "Google Workspace, Slack, ClickUp, sistemas internos — tudo de uma vez" }, { t: "Kit de boas-vindas enviado", d: "Email com guia da empresa, links úteis e agenda da primeira semana" }, { t: "Documentos para assinar", d: "Contrato de trabalho, NDA e políticas enviados via DocuSign" }, { t: "Agenda da integração criada", d: "Reuniões com gestor, RH e equipe agendadas automaticamente no Calendar" }],
    tools: [{ name: "Make", color: "#a855f7" }, { name: "Google Workspace", color: "#4285F4" }, { name: "DocuSign", color: "#1a5c9a" }, { name: "ClickUp", color: "#7B68EE" }, { name: "Gmail", color: "#EA4335" }] },
  { id: "r2", cat: "rh", level: "simple", ico: "📊", title: "Coleta de Feedback de Colaboradores", desc: "Pesquisa de clima enviada automaticamente no ciclo certo, respostas consolidadas em dashboard e alertas para gestores quando o score cai.", timeSaved: "3h/mês", deadline: "7 dias", plan: "Start", complexity: 2,
    steps: [{ t: "Pesquisa disparada no ciclo configurado", d: "Mensal, trimestral ou por evento (3 meses de empresa, após promoção etc.)" }, { t: "Formulário personalizado por cargo", d: "Perguntas adaptadas para lideranças, operacional e novos colaboradores" }, { t: "Lembretes automáticos", d: "Quem não respondeu em 48h recebe lembrete amigável via WhatsApp" }, { t: "Respostas consolidadas em dashboard", d: "Power BI ou Looker mostra NPS interno, pontos críticos e evolução" }, { t: "Alerta para RH e gestores", d: "Score abaixo de 7 gera alerta imediato para ação preventiva" }],
    tools: [{ name: "Typeform", color: "#262627" }, { name: "Make", color: "#a855f7" }, { name: "Power BI", color: "#f2c811" }, { name: "WhatsApp", color: "#25D366" }] },
  { id: "r3", cat: "rh", level: "complex", ico: "🎯", title: "Processo Seletivo Automatizado", desc: "Vaga publicada → currículos triados por IA → entrevistas agendadas automaticamente → status atualizado e comunicação com candidatos sem intervenção manual.", timeSaved: "10h por vaga", deadline: "20 dias", plan: "Enterprise", complexity: 5,
    steps: [{ t: "Vaga publicada e divulgada", d: "Automação publica simultaneamente em LinkedIn, Indeed e site da empresa" }, { t: "Currículos chegam e são triados", d: "GPT-4o analisa cada currículo contra os requisitos da vaga e pontua" }, { t: "Top candidatos notificados", d: "Convite automático para entrevista enviado por email e WhatsApp" }, { t: "Entrevistas agendadas sem conflito", d: "Calendly integrado com agenda de todos os entrevistadores" }, { t: "Feedback e status automatizados", d: "Candidatos aprovados e reprovados recebem comunicação personalizada por IA" }],
    tools: [{ name: "N8N", color: "#ef6c00" }, { name: "OpenAI", color: "#10a37f" }, { name: "LinkedIn API", color: "#0a66c2" }, { name: "Google Calendar", color: "#4285F4" }, { name: "Gmail", color: "#EA4335" }] },
  // ── CS ──
  { id: "cs1", cat: "cs", level: "simple", ico: "⭐", title: "Pesquisa de NPS Automatizada", desc: "NPS disparado no momento certo da jornada, respostas processadas por IA e alertas imediatos para scores baixos antes do cliente sair.", timeSaved: "2h/semana", deadline: "5 dias", plan: "Start", complexity: 1,
    steps: [{ t: "Gatilho de envio configurado", d: "30 dias após onboarding, após entrega, renovação ou suporte resolvido" }, { t: "Pesquisa enviada por WhatsApp", d: "Taxa de resposta 3x maior que email. Máximo 2 perguntas." }, { t: "IA analisa comentários", d: "GPT-4o categoriza feedback: produto, atendimento, preço, expectativa" }, { t: "Score abaixo de 7 → alerta imediato", d: "Gestor de conta notificado em tempo real para salvar o relacionamento" }, { t: "Dashboard de NPS atualizado", d: "Evolução por mês, por plano e por consultor consolidada automaticamente" }],
    tools: [{ name: "Make", color: "#a855f7" }, { name: "WhatsApp", color: "#25D366" }, { name: "OpenAI", color: "#10a37f" }, { name: "Looker Studio", color: "#4285F4" }] },
  { id: "cs2", cat: "cs", level: "simple", ico: "🔔", title: "Alertas de Saúde do Cliente", desc: "IA monitora sinais de churn — cliente sumiu, uso caiu, ticket aberto sem resolução. Alerta proativo antes do cliente pedir cancelamento.", timeSaved: "3h/semana", deadline: "10 dias", plan: "Growth", complexity: 3,
    steps: [{ t: "Indicadores de saúde monitorados", d: "Login, uso das ferramentas, tickets, NPS, resposta a emails — tudo monitorado" }, { t: "Score de saúde calculado diariamente", d: "N8N consolida todos os sinais num score 0–100 por cliente" }, { t: "Alertas por nível de risco", d: "Verde: OK / Amarelo: atenção / Vermelho: risco de churn → ação imediata" }, { t: "Playbook de resgate automático", d: "Email personalizado, oferta de check-in ou reunião agendada conforme o nível" }, { t: "Relatório semanal para o time", d: "CS recebe lista priorizada de clientes que precisam de atenção esta semana" }],
    tools: [{ name: "N8N", color: "#ef6c00" }, { name: "Make", color: "#a855f7" }, { name: "HubSpot", color: "#ff7a59" }, { name: "WhatsApp", color: "#25D366" }] },
  { id: "cs3", cat: "cs", level: "complex", ico: "🚀", title: "Jornada de Sucesso do Cliente Completa", desc: "Do onboarding ao upsell — cada etapa da jornada do cliente automatizada com comunicações personalizadas, marcos celebrados e expansão de receita identificada pela IA.", timeSaved: "10h/semana", deadline: "30 dias", plan: "Enterprise", complexity: 5,
    steps: [{ t: "Onboarding estruturado e automático", d: "Sequência de boas-vindas, treinamentos e check-ins nos primeiros 30 dias" }, { t: "Marcos comemorados automaticamente", d: "1 mês, 1 ano, primeira automação entregue — mensagens personalizadas enviadas" }, { t: "Upsell identificado pela IA", d: "GPT-4o analisa uso e sugere upgrades quando o cliente está pronto" }, { t: "Renovação proativa", d: "90 dias antes do vencimento: jornada de renovação iniciada automaticamente" }, { t: "Expansão de receita monitorada", d: "Dashboard de NRR, MRR por cliente e oportunidades de expansão em tempo real" }],
    tools: [{ name: "N8N", color: "#ef6c00" }, { name: "OpenAI", color: "#10a37f" }, { name: "HubSpot", color: "#ff7a59" }, { name: "WhatsApp", color: "#25D366" }, { name: "Power BI", color: "#f2c811" }] },
  // ── DADOS ──
  { id: "d1", cat: "dados", level: "simple", ico: "📈", title: "Relatório Semanal Automático", desc: "Toda segunda de manhã, sua equipe recebe um relatório consolidado com as principais métricas da semana — sem precisar puxar planilha ou fazer análise manual.", timeSaved: "2h/semana", deadline: "7 dias", plan: "Start", complexity: 2,
    steps: [{ t: "Fontes de dados conectadas", d: "CRM, planilha, sistema de cobranças, redes sociais — todas integradas" }, { t: "N8N puxa e consolida os dados", d: "Agendado para rodar toda segunda-feira às 7h da manhã" }, { t: "IA analisa e destaca pontos-chave", d: "GPT-4o identifica variações relevantes e escreve o resumo executivo" }, { t: "Relatório formatado automaticamente", d: "PDF ou Google Doc gerado com layout profissional e gráficos" }, { t: "Enviado para o time", d: "Email para todos os responsáveis + post no canal do Teams/Slack" }],
    tools: [{ name: "N8N", color: "#ef6c00" }, { name: "OpenAI", color: "#10a37f" }, { name: "Google Sheets", color: "#34A853" }, { name: "Gmail", color: "#EA4335" }, { name: "Microsoft Teams", color: "#0078d4" }] },
  { id: "d2", cat: "dados", level: "complex", ico: "📊", title: "Dashboard de BI em Tempo Real", desc: "Painel executivo consolidando todas as métricas do negócio — comercial, financeiro, operacional e CS — atualizado a cada hora sem analista envolvido.", timeSaved: "6h/semana", deadline: "20 dias", plan: "Enterprise", complexity: 5,
    steps: [{ t: "Mapeamento dos KPIs do negócio", d: "Workshop para definir quais métricas realmente importam para cada área" }, { t: "Integração de todas as fontes", d: "CRM, ERP, banco, redes sociais, NPS — tudo conectado ao data warehouse" }, { t: "Pipelines de dados automatizados", d: "N8N processa e normaliza os dados a cada hora automaticamente" }, { t: "Dashboard construído no Power BI", d: "Visões por área, drill-down por período e comparativo metas vs. realizado" }, { t: "Alertas automáticos de anomalias", d: "Qualquer KPI fora do padrão gera alerta no Teams antes de virar problema" }],
    tools: [{ name: "N8N", color: "#ef6c00" }, { name: "Power BI", color: "#f2c811" }, { name: "Looker Studio", color: "#4285F4" }, { name: "BigQuery", color: "#4285F4" }, { name: "Oracle", color: "#c0392b" }] },
  { id: "d3", cat: "dados", level: "simple", ico: "🔍", title: "Monitoramento de Menções da Marca", desc: "Sua marca mencionada na internet? Você sabe em tempo real. Menção negativa → alerta imediato. Positiva → repost automático.", timeSaved: "1h/dia", deadline: "5 dias", plan: "Start", complexity: 2,
    steps: [{ t: "Palavras-chave configuradas", d: "Nome da empresa, produto, concorrentes e termos do setor monitorados" }, { t: "Busca automática a cada hora", d: "N8N varre Google Alerts, redes sociais e portais de notícia" }, { t: "IA classifica o sentimento", d: "GPT-4o avalia se a menção é positiva, negativa ou neutra" }, { t: "Alerta para menções negativas", d: "WhatsApp imediato para o gestor de marketing com link e contexto" }, { t: "Menção positiva → repost sugerido", d: "Notificação com o conteúdo e botão de aprovar o repost" }],
    tools: [{ name: "N8N", color: "#ef6c00" }, { name: "OpenAI", color: "#10a37f" }, { name: "WhatsApp", color: "#25D366" }, { name: "Google Alerts", color: "#4285F4" }] },
];

const catColors: Record<string, string> = {
  comercial: "#3b82f6", operacional: "#22d3ee", financeiro: "#22c55e",
  marketing: "#ec4899", rh: "#f97316", cs: "#eab308", dados: "#a855f7",
};
const catLabels: Record<string, string> = {
  comercial: "💼 Comercial", operacional: "⚙️ Operacional", financeiro: "💰 Financeiro",
  marketing: "📣 Marketing", rh: "👥 RH", cs: "🤝 Succ. Cliente", dados: "📊 Dados",
};

const WHATSAPP_LINK = "https://wa.me/5548992052888?text=Ol%C3%A1!%20Vim%20do%20cat%C3%A1logo%20de%20automa%C3%A7%C3%B5es%20e%20quero%20uma%20proposta.";

type Toast = { id: number; ico: string; title: string; sub: string; tone: "green" | "blue" };

const Catalogo = () => {
  const [level, setLevel] = useState<"all" | "simple" | "complex">("all");
  const [cat, setCat] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [wishlist, setWishlist] = useState<Automation[]>([]);
  const [modalId, setModalId] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return automations.filter((a) => {
      const ml = level === "all" || a.level === level;
      const mc = cat === "all" || a.cat === cat;
      const mq = !q || a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q) || a.tools.some((t) => t.name.toLowerCase().includes(q));
      return ml && mc && mq;
    });
  }, [level, cat, query]);

  const showToast = (ico: string, title: string, sub: string, tone: "green" | "blue") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, ico, title, sub, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  };

  const toggleWish = (a: Automation) => {
    setWishlist((w) => {
      const exists = w.some((x) => x.id === a.id);
      if (exists) {
        showToast("🗂", "Removido do pacote", a.title, "blue");
        return w.filter((x) => x.id !== a.id);
      }
      showToast("✅", "Adicionado ao pacote!", a.title, "green");
      return [...w, a];
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModalId(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const totalH = useMemo(() => wishlist.reduce((acc, a) => {
    const n = parseFloat(a.timeSaved.replace(/[^0-9.]/g, ""));
    const unit = a.timeSaved.includes("dia") ? n * 4 : a.timeSaved.includes("semana") ? n * 4 : n;
    return acc + (isNaN(unit) ? 0 : unit);
  }, 0), [wishlist]);

  const suggestedPlan = wishlist.some((a) => a.plan === "Enterprise") ? "Enterprise"
    : wishlist.some((a) => a.plan === "Growth") ? "Growth" : "Start";

  const modal = modalId ? automations.find((a) => a.id === modalId) : null;
  const modalInWish = modal ? wishlist.some((w) => w.id === modal.id) : false;

  return (
    <div className="catalog-page">
      <style>{catalogCss}</style>
      <Navbar />

      <div className="bg-layer"><div className="g1" /><div className="g2" /></div>

      <div className="hero">
        <div className="hero-eyebrow">⚡ Catálogo de Automações</div>
        <h1>O que a gente pode <em>automatizar</em><br />na sua operação</h1>
        <p>Explore mais de 30 automações prontas pra sua empresa — do simples ao avançado. Selecione as que fazem sentido e solicite uma proposta.</p>
        <div className="hero-stats">
          <div className="hstat"><div className="hstat-val">32</div><div className="hstat-label">automações disponíveis</div></div>
          <div className="hstat-div" />
          <div className="hstat"><div className="hstat-val">7</div><div className="hstat-label">áreas cobertas</div></div>
          <div className="hstat-div" />
          <div className="hstat"><div className="hstat-val">−200h</div><div className="hstat-label">economizadas/mês (estimado)</div></div>
        </div>
        <div className="hero-cta-wrap">
          <button className="wishlist-btn" onClick={() => setPanelOpen(true)}>
            🗂 Meu Pacote
            {wishlist.length > 0 && <span className="wishlist-count show">{wishlist.length}</span>}
          </button>
        </div>
      </div>

      <div className="controls">
        <div className="search-row">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar automação... (ex: WhatsApp, lead, relatório)" />
          </div>
          <div className="level-toggle">
            <button className={`lvl-btn ${level === "all" ? "active-all" : ""}`} onClick={() => setLevel("all")}>Todos</button>
            <button className={`lvl-btn ${level === "simple" ? "active-simple" : ""}`} onClick={() => setLevel("simple")}>🟢 Simples</button>
            <button className={`lvl-btn ${level === "complex" ? "active-complex" : ""}`} onClick={() => setLevel("complex")}>🔴 Complexa</button>
          </div>
        </div>
        <div className="cat-row">
          <button className={`cat-btn ${cat === "all" ? "active" : ""}`} onClick={() => setCat("all")}>🌐 Todas</button>
          {Object.entries(catLabels).map(([key, label]) => (
            <button key={key} className={`cat-btn ${cat === key ? "active" : ""}`} onClick={() => setCat(key)}>{label}</button>
          ))}
        </div>
        <div className="results-info"><strong>{filtered.length}</strong> automações encontradas &nbsp;·&nbsp; Clique em qualquer card pra ver detalhes &nbsp;·&nbsp; <span style={{ color: "var(--cat-blue)" }}>+ pra adicionar ao seu pacote</span></div>
      </div>

      <div className="catalog-wrap">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="e-ico">🔍</div>
            <strong>Nenhuma automação encontrada</strong>
            <p>Tente outro termo ou categoria.</p>
          </div>
        ) : (
          <div className="cards-grid">
            {filtered.map((a) => {
              const inWish = wishlist.some((w) => w.id === a.id);
              return (
                <div key={a.id} className={`acard cat-${a.cat} ${inWish ? "selected" : ""}`}>
                  <div className="acard-top" onClick={() => setModalId(a.id)}>
                    <div className="acard-header">
                      <div className="acard-ico">{a.ico}</div>
                      <div className="acard-badges">
                        <span className={`level-badge ${a.level}`}>{a.level === "simple" ? "Simples" : "Complexa"}</span>
                        <div className="complexity-dots">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className={`cdot ${i < a.complexity ? "fill" : "empty"}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="acard-title">{a.title}</div>
                    <div className="acard-desc">{a.desc}</div>
                  </div>
                  <div className="acard-tools">
                    {a.tools.slice(0, 3).map((t) => <span key={t.name} className="tool-pill">{t.name}</span>)}
                    {a.tools.length > 3 && <span className="tool-pill">+{a.tools.length - 3}</span>}
                  </div>
                  <div className="acard-footer">
                    <div className="time-saved">⏱ {a.timeSaved}</div>
                    <button className="add-btn" onClick={(e) => { e.stopPropagation(); toggleWish(a); }} title={inWish ? "Remover" : "Adicionar ao pacote"}>{inWish ? "✓" : "+"}</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL */}
      <div className={`overlay ${modal ? "open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setModalId(null); }}>
        {modal && (
          <div className="modal">
            <div className="modal-accent" style={{ background: `linear-gradient(90deg, ${catColors[modal.cat]}, ${modal.level === "complex" ? "#a855f7" : "#22c55e"})` }} />
            <button className="modal-close" onClick={() => setModalId(null)}>✕</button>
            <div className="modal-body">
              <div className="modal-cat" style={{ color: catColors[modal.cat] }}>{catLabels[modal.cat]}</div>
              <div className="modal-title">{modal.title}</div>
              <div className="modal-desc">{modal.desc}</div>
              <div className="modal-grid">
                <div className="mbox"><div className="mbox-label">Nível</div><div className="mbox-val">{modal.level === "simple" ? <span style={{ color: "var(--cat-green)" }}>🟢 Simples</span> : <span style={{ color: "var(--cat-purple)" }}>🔴 Complexa</span>}</div></div>
                <div className="mbox"><div className="mbox-label">Tempo Economizado</div><div className="mbox-val" style={{ color: "var(--cat-green)" }}>{modal.timeSaved}</div></div>
                <div className="mbox"><div className="mbox-label">Prazo de entrega</div><div className="mbox-val">{modal.deadline}</div></div>
                <div className="mbox"><div className="mbox-label">Plano mínimo</div><div className="mbox-val">{modal.plan}</div></div>
              </div>
              <div className="msec-title">Como funciona — Passo a Passo</div>
              <div className="msteps">
                {modal.steps.map((s, i) => (
                  <div key={i} className="mstep">
                    <div className="mstep-num">{i + 1}</div>
                    <div className="mstep-body">
                      <div className="mstep-title">{s.t}</div>
                      <div className="mstep-desc">{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="msec-title" style={{ marginTop: 16 }}>Ferramentas utilizadas</div>
              <div className="mtools-wrap">
                {modal.tools.map((t) => (
                  <div key={t.name} className="mtool"><div className="mtool-dot" style={{ background: t.color }} />{t.name}</div>
                ))}
              </div>
              <div className="modal-cta-row">
                <button className="btn-add-wish" onClick={() => { toggleWish(modal); }} style={{ opacity: modalInWish ? 0.7 : 1 }}>
                  {modalInWish ? "✓ No seu pacote" : "+ Adicionar ao Meu Pacote"}
                </button>
                <a className="btn-consult" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">Falar com Consultor</a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* WISHLIST PANEL */}
      <div className={`wishlist-panel ${panelOpen ? "open" : ""}`}>
        <div className="wp-header">
          <div className="wp-title">🗂 Meu Pacote de Automações</div>
          <button className="wp-close" onClick={() => setPanelOpen(false)}>✕</button>
        </div>
        <div className="wp-list">
          {wishlist.length === 0 ? (
            <div className="wp-empty">Nenhuma automação selecionada ainda.<br /><br />Clique em <strong>+</strong> nos cards pra montar seu pacote.</div>
          ) : (
            wishlist.map((a) => (
              <div key={a.id} className="wp-item">
                <div className="wp-item-ico">{a.ico}</div>
                <div className="wp-item-body">
                  <div className="wp-item-title">{a.title}</div>
                  <div className="wp-item-meta">{a.level === "simple" ? "🟢 Simples" : "🔴 Complexa"} · ⏱ {a.timeSaved} · {a.plan}</div>
                </div>
                <button className="wp-item-remove" onClick={() => toggleWish(a)}>✕</button>
              </div>
            ))
          )}
        </div>
        {wishlist.length > 0 && (
          <div className="wp-footer">
            <div className="wp-summary">
              <div className="wp-sum-row"><span>Automações selecionadas</span><span>{wishlist.length}</span></div>
              <div className="wp-sum-row"><span>Tempo economizado/mês</span><span style={{ color: "var(--cat-green)" }}>~{Math.round(totalH)}h/mês</span></div>
              <div className="wp-sum-row"><span>Plano sugerido</span><span style={{ color: "var(--cat-blue)" }}>{suggestedPlan}</span></div>
            </div>
            <a className="wp-cta" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">🚀 Solicitar Proposta Personalizada</a>
            <button className="wp-cta2" onClick={() => setWishlist([])}>Limpar seleção</button>
          </div>
        )}
      </div>

      {/* TOASTS */}
      <div className="toasts">
        {toasts.map((t) => (
          <div key={t.id} className={`toast show ${t.tone}`}>
            <div style={{ fontSize: 18 }}>{t.ico}</div>
            <div>
              <div className="toast-t">{t.title}</div>
              <div className="toast-s">{t.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

const catalogCss = `
.catalog-page{
  --cat-bg:#080e1a;--cat-surface:#0f1729;--cat-surface2:#141e30;--cat-surface3:#1a2540;
  --cat-border:rgba(255,255,255,.06);--cat-border2:rgba(255,255,255,.1);--cat-border3:rgba(255,255,255,.16);
  --cat-text:#f1f5f9;--cat-muted:#64748b;--cat-muted2:#94a3b8;
  --cat-blue:#3b82f6;--cat-indigo:#6366f1;--cat-purple:#a855f7;--cat-cyan:#22d3ee;
  --cat-green:#22c55e;--cat-yellow:#eab308;--cat-orange:#f97316;--cat-red:#ef4444;--cat-pink:#ec4899;
  --cat-r:12px;
  background:var(--cat-bg);color:var(--cat-text);min-height:100vh;position:relative;overflow-x:hidden;
}
.catalog-page .bg-layer{position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.catalog-page .bg-layer .g1{position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(59,130,246,.08) 0%,transparent 65%);top:-200px;left:-150px}
.catalog-page .bg-layer .g2{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(168,85,247,.07) 0%,transparent 65%);top:300px;right:-100px}

.catalog-page .hero{position:relative;z-index:1;text-align:center;padding:52px 24px 32px}
.catalog-page .hero-eyebrow{display:inline-flex;align-items:center;gap:7px;background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.2);color:#93c5fd;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:5px 14px;border-radius:999px;margin-bottom:18px}
.catalog-page .hero h1{font-size:clamp(28px,4.5vw,48px);font-weight:900;letter-spacing:-.025em;line-height:1.1;margin-bottom:14px;color:var(--cat-text)}
.catalog-page .hero h1 em{font-style:normal;background:linear-gradient(90deg,var(--cat-blue),var(--cat-purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.catalog-page .hero p{color:var(--cat-muted2);font-size:16px;max-width:580px;margin:0 auto 28px;line-height:1.65}
.catalog-page .hero-stats{display:flex;align-items:center;justify-content:center;gap:32px;flex-wrap:wrap;margin-bottom:24px}
.catalog-page .hstat{text-align:center}
.catalog-page .hstat-val{font-size:28px;font-weight:900;background:linear-gradient(90deg,var(--cat-blue),var(--cat-cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.catalog-page .hstat-label{font-size:12px;color:var(--cat-muted);margin-top:2px}
.catalog-page .hstat-div{width:1px;height:36px;background:var(--cat-border2)}
.catalog-page .hero-cta-wrap{display:flex;justify-content:center}

.catalog-page .wishlist-btn{display:inline-flex;align-items:center;gap:7px;background:var(--cat-surface2);border:1px solid var(--cat-border2);color:var(--cat-muted2);font-size:13px;font-weight:600;padding:9px 16px;border-radius:8px;cursor:pointer;transition:all .2s;position:relative}
.catalog-page .wishlist-btn:hover{border-color:var(--cat-border3);color:var(--cat-text)}
.catalog-page .wishlist-count{position:absolute;top:-6px;right:-6px;width:18px;height:18px;background:var(--cat-blue);color:#fff;font-size:10px;font-weight:800;border-radius:50%;display:flex;align-items:center;justify-content:center}

.catalog-page .controls{position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:0 24px 24px;display:flex;flex-direction:column;gap:14px}
.catalog-page .search-row{display:flex;gap:10px;flex-wrap:wrap}
.catalog-page .search-box{flex:1;min-width:220px;display:flex;align-items:center;gap:8px;background:var(--cat-surface);border:1px solid var(--cat-border2);border-radius:10px;padding:10px 14px}
.catalog-page .search-box input{flex:1;background:none;border:none;outline:none;color:var(--cat-text);font-size:14px;font-family:inherit}
.catalog-page .search-box input::placeholder{color:var(--cat-muted)}
.catalog-page .search-icon{color:var(--cat-muted);font-size:15px;flex-shrink:0}
.catalog-page .level-toggle{display:flex;background:var(--cat-surface);border:1px solid var(--cat-border2);border-radius:10px;padding:4px;gap:4px}
.catalog-page .lvl-btn{padding:7px 18px;border-radius:7px;font-size:13px;font-weight:600;cursor:pointer;border:none;background:transparent;color:var(--cat-muted2);font-family:inherit;transition:all .2s;white-space:nowrap}
.catalog-page .lvl-btn.active-all{background:linear-gradient(90deg,var(--cat-blue),var(--cat-indigo));color:#fff}
.catalog-page .lvl-btn.active-simple{background:rgba(34,197,94,.15);color:var(--cat-green);border:1px solid rgba(34,197,94,.25)}
.catalog-page .lvl-btn.active-complex{background:rgba(168,85,247,.15);color:var(--cat-purple);border:1px solid rgba(168,85,247,.25)}
.catalog-page .cat-row{display:flex;gap:8px;flex-wrap:wrap}
.catalog-page .cat-btn{display:flex;align-items:center;gap:6px;background:var(--cat-surface);border:1px solid var(--cat-border);color:var(--cat-muted2);font-size:12px;font-weight:600;padding:7px 14px;border-radius:8px;cursor:pointer;transition:all .2s;white-space:nowrap}
.catalog-page .cat-btn:hover{border-color:var(--cat-border2);color:var(--cat-text)}
.catalog-page .cat-btn.active{color:var(--cat-text);border-color:var(--cat-border3)}
.catalog-page .results-info{font-size:12px;color:var(--cat-muted);display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.catalog-page .results-info strong{color:var(--cat-text)}

.catalog-page .catalog-wrap{position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:0 24px 80px}
.catalog-page .cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px}

.catalog-page .acard{background:var(--cat-surface);border:1px solid var(--cat-border);border-radius:var(--cat-r);overflow:hidden;cursor:pointer;transition:all .22s;position:relative;display:flex;flex-direction:column}
.catalog-page .acard:hover{border-color:var(--cat-border2);transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.3)}
.catalog-page .acard.selected{border-color:var(--cat-blue);box-shadow:0 0 0 1px var(--cat-blue),0 8px 32px rgba(59,130,246,.15)}
.catalog-page .acard-top{padding:16px 16px 12px;flex:1}
.catalog-page .acard-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px}
.catalog-page .acard-ico{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:19px;flex-shrink:0}
.catalog-page .acard-badges{display:flex;flex-direction:column;align-items:flex-end;gap:4px}
.catalog-page .level-badge{font-size:9px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:3px 8px;border-radius:4px}
.catalog-page .level-badge.simple{background:rgba(34,197,94,.12);color:var(--cat-green)}
.catalog-page .level-badge.complex{background:rgba(168,85,247,.12);color:var(--cat-purple)}
.catalog-page .complexity-dots{display:flex;gap:3px}
.catalog-page .cdot{width:6px;height:6px;border-radius:50%}
.catalog-page .cdot.fill{background:var(--cat-blue)}
.catalog-page .cdot.empty{background:var(--cat-surface3)}
.catalog-page .acard-title{font-size:14px;font-weight:700;margin-bottom:6px;line-height:1.3;color:var(--cat-text)}
.catalog-page .acard-desc{font-size:12px;color:var(--cat-muted2);line-height:1.55}
.catalog-page .acard-tools{display:flex;flex-wrap:wrap;gap:5px;padding:0 16px 10px}
.catalog-page .tool-pill{font-size:9px;font-weight:700;padding:2px 7px;border-radius:4px;background:var(--cat-surface2);border:1px solid var(--cat-border);color:var(--cat-muted2)}
.catalog-page .acard-footer{padding:10px 16px;border-top:1px solid var(--cat-border);display:flex;align-items:center;justify-content:space-between}
.catalog-page .time-saved{font-size:11px;font-weight:700;color:var(--cat-green);display:flex;align-items:center;gap:4px}
.catalog-page .add-btn{width:24px;height:24px;border-radius:6px;background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.2);color:var(--cat-blue);font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0;cursor:pointer}
.catalog-page .acard:hover .add-btn{background:rgba(59,130,246,.2)}
.catalog-page .acard.selected .add-btn{background:var(--cat-blue);color:#fff;border-color:var(--cat-blue)}

.catalog-page .cat-comercial .acard-ico{background:rgba(59,130,246,.15)}
.catalog-page .cat-operacional .acard-ico{background:rgba(34,211,238,.12)}
.catalog-page .cat-financeiro .acard-ico{background:rgba(34,197,94,.12)}
.catalog-page .cat-marketing .acard-ico{background:rgba(236,72,153,.1)}
.catalog-page .cat-rh .acard-ico{background:rgba(249,115,22,.1)}
.catalog-page .cat-cs .acard-ico{background:rgba(234,179,8,.1)}
.catalog-page .cat-dados .acard-ico{background:rgba(168,85,247,.12)}

.catalog-page .overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(8px);z-index:500;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;pointer-events:none;transition:opacity .25s}
.catalog-page .overlay.open{opacity:1;pointer-events:all}
.catalog-page .modal{background:#0f1729;border:1px solid var(--cat-border2);border-radius:18px;width:100%;max-width:620px;max-height:88vh;overflow-y:auto;transform:translateY(24px) scale(.97);transition:transform .25s;position:relative}
.catalog-page .overlay.open .modal{transform:none}
.catalog-page .modal-close{position:absolute;top:14px;right:14px;width:30px;height:30px;background:var(--cat-surface2);border:1px solid var(--cat-border);border-radius:7px;color:var(--cat-muted2);font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;transition:all .2s}
.catalog-page .modal-close:hover{background:var(--cat-surface3);color:var(--cat-text)}
.catalog-page .modal-accent{height:3px;border-radius:18px 18px 0 0}
.catalog-page .modal-body{padding:24px}
.catalog-page .modal-cat{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px}
.catalog-page .modal-title{font-size:22px;font-weight:800;margin-bottom:6px;line-height:1.2;color:var(--cat-text)}
.catalog-page .modal-desc{font-size:14px;color:var(--cat-muted2);line-height:1.6;margin-bottom:20px}
.catalog-page .modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px}
.catalog-page .mbox{background:var(--cat-surface2);border:1px solid var(--cat-border);border-radius:10px;padding:12px}
.catalog-page .mbox-label{font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--cat-muted);margin-bottom:4px}
.catalog-page .mbox-val{font-size:14px;font-weight:700;color:var(--cat-text)}
.catalog-page .msec-title{font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--cat-muted);margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid var(--cat-border)}
.catalog-page .msteps{display:flex;flex-direction:column;gap:0;margin-bottom:18px}
.catalog-page .mstep{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-bottom:1px solid var(--cat-border)}
.catalog-page .mstep:last-child{border-bottom:none}
.catalog-page .mstep-num{width:22px;height:22px;border-radius:6px;background:rgba(59,130,246,.12);border:1px solid rgba(59,130,246,.2);color:#93c5fd;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
.catalog-page .mstep-title{font-size:13px;font-weight:600;margin-bottom:2px;color:var(--cat-text)}
.catalog-page .mstep-desc{font-size:11px;color:var(--cat-muted2);line-height:1.4}
.catalog-page .mtools-wrap{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px}
.catalog-page .mtool{display:flex;align-items:center;gap:5px;background:var(--cat-surface2);border:1px solid var(--cat-border2);padding:5px 10px;border-radius:7px;font-size:12px;font-weight:600;color:var(--cat-muted2)}
.catalog-page .mtool-dot{width:7px;height:7px;border-radius:50%}
.catalog-page .modal-cta-row{display:flex;gap:8px}
.catalog-page .btn-add-wish{flex:1;background:linear-gradient(90deg,var(--cat-blue),var(--cat-purple));color:#fff;font-size:14px;font-weight:700;padding:12px;border-radius:9px;border:none;cursor:pointer;font-family:inherit;transition:opacity .2s}
.catalog-page .btn-add-wish:hover{opacity:.85}
.catalog-page .btn-consult{flex:1;background:var(--cat-surface2);border:1px solid var(--cat-border2);color:var(--cat-muted2);font-size:14px;font-weight:600;padding:12px;border-radius:9px;cursor:pointer;font-family:inherit;transition:all .2s;text-align:center;text-decoration:none;display:inline-flex;align-items:center;justify-content:center}
.catalog-page .btn-consult:hover{border-color:var(--cat-border3);color:var(--cat-text)}

.catalog-page .wishlist-panel{position:fixed;top:0;right:0;bottom:0;width:360px;background:#0d1525;border-left:1px solid var(--cat-border2);z-index:300;transform:translateX(100%);transition:transform .3s ease;display:flex;flex-direction:column}
.catalog-page .wishlist-panel.open{transform:none}
.catalog-page .wp-header{padding:16px 20px;border-bottom:1px solid var(--cat-border);display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.catalog-page .wp-title{font-size:15px;font-weight:700;color:var(--cat-text)}
.catalog-page .wp-close{width:28px;height:28px;background:var(--cat-surface2);border:1px solid var(--cat-border);border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--cat-muted2);font-size:13px;transition:all .2s}
.catalog-page .wp-close:hover{color:var(--cat-text)}
.catalog-page .wp-list{flex:1;overflow-y:auto;padding:12px}
.catalog-page .wp-empty{text-align:center;padding:40px 20px;color:var(--cat-muted);font-size:13px}
.catalog-page .wp-item{background:var(--cat-surface);border:1px solid var(--cat-border);border-radius:9px;padding:12px;margin-bottom:8px;display:flex;align-items:flex-start;gap:10px}
.catalog-page .wp-item-ico{font-size:18px;flex-shrink:0}
.catalog-page .wp-item-body{flex:1;min-width:0}
.catalog-page .wp-item-title{font-size:12px;font-weight:700;margin-bottom:3px;color:var(--cat-text)}
.catalog-page .wp-item-meta{font-size:10px;color:var(--cat-muted2)}
.catalog-page .wp-item-remove{background:transparent;border:none;color:var(--cat-muted);cursor:pointer;font-size:12px;flex-shrink:0;padding:2px 4px;transition:color .2s}
.catalog-page .wp-item-remove:hover{color:var(--cat-red)}
.catalog-page .wp-footer{padding:16px 20px;border-top:1px solid var(--cat-border);flex-shrink:0}
.catalog-page .wp-summary{margin-bottom:12px}
.catalog-page .wp-sum-row{display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;color:var(--cat-text)}
.catalog-page .wp-sum-row span:first-child{color:var(--cat-muted2)}
.catalog-page .wp-sum-row span:last-child{font-weight:700}
.catalog-page .wp-cta{display:block;width:100%;background:linear-gradient(90deg,var(--cat-blue),var(--cat-purple));color:#fff;font-size:14px;font-weight:700;padding:13px;border-radius:9px;border:none;cursor:pointer;font-family:inherit;transition:opacity .2s;margin-bottom:8px;text-align:center;text-decoration:none}
.catalog-page .wp-cta:hover{opacity:.85}
.catalog-page .wp-cta2{width:100%;background:transparent;border:1px solid var(--cat-border2);color:var(--cat-muted2);font-size:13px;font-weight:600;padding:10px;border-radius:9px;cursor:pointer;font-family:inherit;transition:all .2s}
.catalog-page .wp-cta2:hover{border-color:var(--cat-border3);color:var(--cat-text)}

.catalog-page .toasts{position:fixed;top:80px;right:16px;z-index:999;display:flex;flex-direction:column;gap:8px;pointer-events:none}
.catalog-page .toast{background:var(--cat-surface);border:1px solid var(--cat-border2);border-radius:10px;padding:10px 14px;display:flex;align-items:center;gap:9px;min-width:240px;box-shadow:0 8px 32px rgba(0,0,0,.4);transform:translateX(280px);transition:transform .3s ease}
.catalog-page .toast.show{transform:none}
.catalog-page .toast.green{border-left:3px solid var(--cat-green)}
.catalog-page .toast.blue{border-left:3px solid var(--cat-blue)}
.catalog-page .toast-t{font-size:12px;font-weight:700;color:var(--cat-text)}
.catalog-page .toast-s{font-size:11px;color:var(--cat-muted2)}

.catalog-page .empty-state{text-align:center;padding:60px 24px;color:var(--cat-muted);font-size:14px}
.catalog-page .empty-state .e-ico{font-size:40px;margin-bottom:12px}
.catalog-page .empty-state p{margin-top:6px;font-size:13px}

@media(max-width:640px){
  .catalog-page .hero{padding:36px 16px 28px}
  .catalog-page .controls,.catalog-page .catalog-wrap{padding:0 16px 60px}
  .catalog-page .modal-grid{grid-template-columns:1fr}
  .catalog-page .wishlist-panel{width:100%}
  .catalog-page .hstat-div{display:none}
}
`;

export default Catalogo;