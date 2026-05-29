import { NextResponse } from "next/server"
import {
  hasValidationErrors,
  submitBeneficiariaForm,
  validateBeneficiariaForm,
  type BeneficiariaFormData,
} from "@/lib/cadastro-beneficiaria"

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Dados inválidos. Verifique o formulário e tente novamente." },
      { status: 400 },
    )
  }

  const data = body as BeneficiariaFormData
  const errors = validateBeneficiariaForm(data)

  if (hasValidationErrors(errors)) {
    return NextResponse.json({ errors }, { status: 422 })
  }

  try {
    await submitBeneficiariaForm(data)
    return NextResponse.json({ success: true })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Não foi possível enviar o cadastro. Tente novamente."

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
