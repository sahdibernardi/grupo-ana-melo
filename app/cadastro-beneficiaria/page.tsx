import type { Metadata } from "next"
import { Heart, MapPin } from "lucide-react"
import Navbar from "@/components/Navbar"
import BeneficiariaForm from "@/components/BeneficiariaForm"
import SiteFooter from "@/components/SiteFooter"

export const metadata: Metadata = {
  title: "Cadastro de beneficiárias | Grupo Ana Melo",
  description:
    "Mães em situação de vulnerabilidade social em Santa Catarina podem solicitar apoio do Grupo Ana Melo.",
}

export default function CadastroBeneficiariaPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar variant="solid" />

      <section className="relative flex min-h-[50vh] flex-col items-center justify-center px-4 pt-28 pb-16 md:px-8 md:pt-32 lg:px-16 bg-[url('/tricotBebe.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-white/80" aria-hidden />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Cadastro para beneficiárias
          </h1>
          <p className="text-xl md:text-2xl text-[#6c6463] italic">
            Um enxoval feito com carinho para quem mais precisa
          </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
            <Heart className="h-7 w-7 text-[#F4A896]" aria-hidden />
            Como funciona
          </h2>
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-gray-700 mb-6 text-center">
              Este cadastro é destinado a mães em situação de vulnerabilidade social que
              precisam de apoio com enxoval para o bebê — mantas, roupinhas, fraldas e
              tudo que confeccionamos com dedicação desde 1996.
            </p>
            <p className="text-lg text-gray-700 text-center">
              Preencha o formulário abaixo com carinho. Nossa equipe analisa cada pedido e
              entra em contato pelo telefone informado.
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <div className="inline-flex items-start gap-3 rounded-lg border border-[#2A9D8F]/20 bg-[#2A9D8F]/5 px-5 py-4 max-w-2xl">
              <MapPin className="h-5 w-5 shrink-0 text-[#2A9D8F] mt-0.5" aria-hidden />
              <p className="text-base text-gray-700 text-left">
                <span className="font-semibold text-gray-800">Importante:</span> no momento,
                atendemos apenas mães residentes em{" "}
                <span className="font-semibold text-[#2A9D8F]">Santa Catarina</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#F4A896]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Preencha seu cadastro
          </h2>
          <p className="text-lg text-gray-700 text-center mb-10">
            Os campos abaixo nos ajudam a conhecer você e entender como podemos ajudar.
          </p>

          <div className="bg-gray-50 p-6 md:p-10 rounded-lg shadow-sm">
            <BeneficiariaForm />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
