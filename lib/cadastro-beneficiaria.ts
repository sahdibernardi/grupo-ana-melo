export type BeneficiariaFormData = {
  nomeCompleto: string
  cidade: string
  telefone: string
  mensagem: string
}

export type BeneficiariaFormErrors = Partial<
  Record<keyof BeneficiariaFormData, string>
>

const PHONE_MIN_DIGITS = 10
const MESSAGE_MIN_LENGTH = 20

function onlyDigits(value: string) {
  return value.replace(/\D/g, "")
}

export function validateBeneficiariaForm(
  data: BeneficiariaFormData,
): BeneficiariaFormErrors {
  const errors: BeneficiariaFormErrors = {}

  const nomeCompleto = data.nomeCompleto.trim()
  const cidade = data.cidade.trim()
  const telefone = data.telefone.trim()
  const mensagem = data.mensagem.trim()

  if (!nomeCompleto) {
    errors.nomeCompleto = "Informe seu nome completo."
  } else if (nomeCompleto.split(/\s+/).length < 2) {
    errors.nomeCompleto = "Informe nome e sobrenome."
  }

  if (!cidade) {
    errors.cidade = "Informe sua cidade."
  }

  const phoneDigits = onlyDigits(telefone)
  if (!telefone) {
    errors.telefone = "Informe um telefone para contato."
  } else if (phoneDigits.length < PHONE_MIN_DIGITS) {
    errors.telefone = "Informe um telefone válido com DDD."
  }

  if (!mensagem) {
    errors.mensagem = "Conte um pouco sobre você e como podemos ajudar."
  } else if (mensagem.length < MESSAGE_MIN_LENGTH) {
    errors.mensagem = `Escreva pelo menos ${MESSAGE_MIN_LENGTH} caracteres.`
  }

  return errors
}

export function hasValidationErrors(errors: BeneficiariaFormErrors) {
  return Object.keys(errors).length > 0
}

async function postToGoogleScript(url: string, payload: Record<string, string>) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    redirect: "follow",
  })

  const text = await response.text()

  try {
    const data = JSON.parse(text) as { success?: boolean; error?: string }

    if (data.error) {
      throw new Error(
        data.error === "Não autorizado"
          ? "Falha na autenticação com a planilha. Verifique se a senha do Apps Script é a mesma do .env.local."
          : data.error,
      )
    }

    if (data.success) return
  } catch (error) {
    if (error instanceof Error && error.message.includes("autenticação")) {
      throw error
    }
    // Resposta não-JSON: segue para validação abaixo
  }

  if (!response.ok || !text.includes("success")) {
    if (process.env.NODE_ENV === "development") {
      console.error("[cadastro-beneficiaria] Resposta do Google Apps Script:", text.slice(0, 300))
    }
    throw new Error(
      "Não foi possível salvar na planilha. Confira se o Apps Script foi implantado e autorizado.",
    )
  }
}

async function postJson(url: string, payload: Record<string, string>) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    redirect: "follow",
  })

  if (!response.ok) {
    throw new Error("Não foi possível enviar o cadastro. Tente novamente em instantes.")
  }
}

export async function submitBeneficiariaForm(data: BeneficiariaFormData) {
  const sanitized: BeneficiariaFormData = {
    nomeCompleto: data.nomeCompleto.trim(),
    cidade: data.cidade.trim(),
    telefone: data.telefone.trim(),
    mensagem: data.mensagem.trim(),
  }

  const googleScriptUrl = process.env.BENEFICIARIA_GOOGLE_SCRIPT_URL
  const googleScriptSecret = process.env.BENEFICIARIA_GOOGLE_SCRIPT_SECRET
  const formspreeUrl = process.env.BENEFICIARIA_FORMSPREE_URL

  const payload: Record<string, string> = {
    nomeCompleto: sanitized.nomeCompleto,
    cidade: sanitized.cidade,
    telefone: sanitized.telefone,
    mensagem: sanitized.mensagem,
  }

  if (googleScriptSecret) {
    payload.secret = googleScriptSecret
  }

  if (googleScriptUrl) {
    if (!googleScriptSecret) {
      throw new Error(
        "Configuração incompleta: defina BENEFICIARIA_GOOGLE_SCRIPT_SECRET no .env.local",
      )
    }

    await postToGoogleScript(googleScriptUrl, payload)
    return
  }

  if (formspreeUrl) {
    await postJson(formspreeUrl, {
      ...payload,
      _subject: `Novo cadastro de beneficiária — ${sanitized.nomeCompleto}`,
    })
    return
  }

  if (process.env.NODE_ENV === "development") {
    const missing = [
      !googleScriptUrl && "BENEFICIARIA_GOOGLE_SCRIPT_URL",
      !googleScriptSecret && "BENEFICIARIA_GOOGLE_SCRIPT_SECRET",
    ].filter(Boolean)

    console.warn(
      "[cadastro-beneficiaria] Envio SIMULADO (não grava na planilha).",
      missing.length
        ? `Variáveis ausentes: ${missing.join(", ")}. Salve o arquivo .env ou .env.local e reinicie o servidor.`
        : "Reinicie o servidor (npm run dev) após alterar variáveis de ambiente.",
    )
    console.info("[cadastro-beneficiaria] Dados:", sanitized)
    return
  }

  throw new Error(
    "O envio de cadastros ainda não está configurado. Entre em contato com o Grupo Ana Melo.",
  )
}
