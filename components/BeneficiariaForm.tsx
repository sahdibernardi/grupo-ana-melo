"use client"

import { useState, type FormEvent } from "react"
import { CheckCircle2, Heart, Loader2, MapPin, Send } from "lucide-react"
import type {
  BeneficiariaFormData,
  BeneficiariaFormErrors,
} from "@/lib/cadastro-beneficiaria"

const initialForm: BeneficiariaFormData = {
  nomeCompleto: "",
  cidade: "",
  telefone: "",
  mensagem: "",
}

type SubmitStatus = "idle" | "loading" | "success" | "error"

const inputClassName =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm transition-colors placeholder:text-gray-400 focus:border-[#2A9D8F] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/30"

export default function BeneficiariaForm() {
  const [form, setForm] = useState<BeneficiariaFormData>(initialForm)
  const [errors, setErrors] = useState<BeneficiariaFormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>("idle")
  const [submitError, setSubmitError] = useState<string | null>(null)

  const updateField = (field: keyof BeneficiariaFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current }
        delete next[field]
        return next
      })
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("loading")
    setSubmitError(null)
    setErrors({})

    try {
      const response = await fetch("/api/cadastro-beneficiaria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const payload = (await response.json()) as {
        errors?: BeneficiariaFormErrors
        error?: string
      }

      if (response.status === 422 && payload.errors) {
        setErrors(payload.errors)
        setStatus("idle")
        return
      }

      if (!response.ok) {
        setSubmitError(
          payload.error ?? "Não foi possível enviar o cadastro. Tente novamente.",
        )
        setStatus("error")
        return
      }

      setForm(initialForm)
      setStatus("success")
    } catch {
      setSubmitError("Erro de conexão. Verifique sua internet e tente novamente.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="max-w-xl mx-auto rounded-lg bg-white border border-[#2A9D8F]/20 p-8 md:p-10 text-center shadow-sm"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#2A9D8F]/10">
          <CheckCircle2 className="h-9 w-9 text-[#2A9D8F]" aria-hidden />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Cadastro enviado com sucesso
        </h2>
        <p className="text-lg text-gray-700">
          Recebemos suas informações com carinho. Entraremos em contato pelo telefone
          informado assim que possível.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex items-center text-[#2A9D8F] font-semibold hover:text-[#238277] transition-colors"
        >
          <Heart className="mr-2 h-4 w-4" aria-hidden />
          Enviar outro cadastro
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6" noValidate>
      <div>
        <label htmlFor="nomeCompleto" className="block text-base font-semibold text-gray-800 mb-2">
          Nome completo
        </label>
        <input
          id="nomeCompleto"
          name="nomeCompleto"
          type="text"
          autoComplete="name"
          placeholder="Seu nome e sobrenome"
          value={form.nomeCompleto}
          onChange={(e) => updateField("nomeCompleto", e.target.value)}
          aria-invalid={Boolean(errors.nomeCompleto)}
          aria-describedby={errors.nomeCompleto ? "nomeCompleto-error" : undefined}
          className={inputClassName}
        />
        {errors.nomeCompleto && (
          <p id="nomeCompleto-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.nomeCompleto}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cidade" className="block text-base font-semibold text-gray-800 mb-2">
          Cidade
        </label>
        <input
          id="cidade"
          name="cidade"
          type="text"
          autoComplete="address-level2"
          placeholder="Ex.: Florianópolis"
          value={form.cidade}
          onChange={(e) => updateField("cidade", e.target.value)}
          aria-invalid={Boolean(errors.cidade)}
          aria-describedby="cidade-aviso cidade-error"
          className={inputClassName}
        />
        <div
          id="cidade-aviso"
          className="mt-3 flex items-start gap-2 rounded-md bg-white/80 border border-gray-200/80 px-3 py-2.5"
        >
          <MapPin className="h-4 w-4 shrink-0 text-[#2A9D8F] mt-0.5" aria-hidden />
          <p className="text-sm text-gray-600">
            Atendemos apenas mães residentes em{" "}
            <span className="font-medium text-[#2A9D8F]">Santa Catarina</span>.
          </p>
        </div>
        {errors.cidade && (
          <p id="cidade-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.cidade}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="telefone" className="block text-base font-semibold text-gray-800 mb-2">
          Telefone para contato
        </label>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="(00) 00000-0000"
          value={form.telefone}
          onChange={(e) => updateField("telefone", e.target.value)}
          aria-invalid={Boolean(errors.telefone)}
          aria-describedby={errors.telefone ? "telefone-error" : undefined}
          className={inputClassName}
        />
        {errors.telefone && (
          <p id="telefone-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.telefone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="mensagem" className="block text-base font-semibold text-gray-800 mb-2">
          Nos conte mais sobre você e como podemos te ajudar
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={6}
          placeholder="Compartilhe sua história, a idade do bebê, o que você mais precisa..."
          value={form.mensagem}
          onChange={(e) => updateField("mensagem", e.target.value)}
          aria-invalid={Boolean(errors.mensagem)}
          aria-describedby={errors.mensagem ? "mensagem-error" : undefined}
          className={`${inputClassName} resize-y min-h-[140px]`}
        />
        {errors.mensagem && (
          <p id="mensagem-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.mensagem}
          </p>
        )}
      </div>

      <p className="text-sm text-gray-600 text-center italic">
        Seus dados serão usados apenas para avaliar o pedido e entrar em contato com você.
      </p>

      {submitError && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 text-center"
          role="alert"
        >
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center rounded-lg bg-[#2A9D8F] px-6 py-4 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-[#238277] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden />
            Enviando...
          </>
        ) : (
          <>
            Enviar cadastro
            <Send className="ml-2 h-5 w-5" aria-hidden />
          </>
        )}
      </button>
    </form>
  )
}
