import Link from "next/link"
import { Scissors, Instagram, Facebook, ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import Image from "next/image"
import ImageGallery from "@/components/ImageGalery"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section id="home" className="h-screen pt-24 pb-16 px-4 md:px-8 lg:px-16 bg-[url('/tricotBebe.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-white/80"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl lg:text-8xl font-bold text-gray-800 mb-10">Grupo Ana Melo</h1>
          <p className="text-xl md:text-2xl text-[#6c6463] mb-12 italic lg:text-3xl">Amor que se tece ponto a ponto</p>
          <Link
            href="#ajudar"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-[#F4A896] rounded-lg hover:bg-[#2A9D8F] transition-colors"
          >
            Faça parte da corrente do bem
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <section id="sobre" className="py-16 px-4 md:px-8 lg:px-16 min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Quem somos nós</h2>
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              Desde 1996, somos um grupo de senhoras apaixonadas por crochê, tricô e costura. Nos reunimos semanalmente para confeccionar, com muito carinho, enxovais completos para recém-nascidos em situação de vulnerabilidade. E geralmente tomamos um café quentinho enquanto fazemos isso!
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Cada manta, casaquinho, fralda ou touquinha é feita à mão com dedicação, fé e amor e orações. O que nos move, há quase três décadas, é a vontade de acolher quem está chegando ao mundo — e que muitas vezes chega com quase nada além do amor materno.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Inspiradas por esse amor, doamos gratuitamente os enxovais completos confeccionados às maternidades, postos de saúde e famílias carentes. É o nosso
              jeito de cuidar e aquecer os pequenos corações.
            </p>
          </div>
        </div>
        <ImageGallery />
      </section>

      <section id="ajudar" className="py-16 px-4 md:px-8 lg:px-16 bg-[#F4A896]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center">
            <Scissors className="mr-2 h-6 w-6" /> Como você pode ajudar
          </h2>
          <div className="prose prose-lg mx-auto mb-8">
            <p className="text-lg text-gray-700 text-center mb-8">
              Apesar de cada membro do grupo investir um valor mensal para a compra de materiais, a sua contribuição potencializa a nossa ação.
            </p>
            <p className="text-lg text-gray-700 text-center mb-8">
              Precisamos de insumos para a compra de materiais como lã, tecidos, linhas e aviamentos. Com a sua ajuda, conseguimos transformar afeto e dedicação em aconchego para os bebês que mais precisam.
            </p>
            <p className="text-lg text-gray-700 text-center mb-8">
              Você pode fazer uma contribuição na chave PIX abaixo.
            </p>
          </div>

          <div id="doar" className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Chave PIX:</h3>
            <p className="text-lg text-center mb-2 text-gray-700">📩 grupoanamelo@pix.com.br</p>
            <div className="flex justify-center mt-4">
              <Image alt='pix' src='/pix.png' width={200} height={200}/>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-20">
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-gray-700 text-center mb-4">
              Todas as doações são usadas <b>exclusivamente</b> para a compra de materiais.
            </p>
            <p className="text-lg text-gray-700 text-center">
              Prestamos contas nas nossas redes sociais e agradecemos cada contribuição com o coração cheio.
            </p>
          </div>
        </div>
      </section>


      <section
        id="transparencia"
        className="relative flex flex-col justify-center items-center py-16 px-4 md:px-8 lg:px-16 bg-[url('/cobertores.jpg')] bg-cover bg-center min-h-[600px]"
      >
        <div className="absolute inset-0 bg-white/60"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Acompanhe nosso trabalho
          </h2>
          <div className="prose prose-lg mx-auto mb-8">
            <p className="text-lg text-gray-700">
              Veja fotos dos enxovais, relatos das entregas e o dia a dia do grupo em nossas redes sociais:
            </p>
          </div>
          <div className="flex justify-center space-x-6">
            <Link href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
              <Instagram className="h-8 w-8" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Facebook className="h-8 w-8" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 md:px-8 lg:px-16 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center flex justify-around items-center">
          <p className="text-gray-600 italic">
            &copy; 2025 Grupo Ana Melo. Todos os direitos reservados.
          </p>
          <p className="text-gray-600 italic">
           Site desenvolvido por @codewithsah
          </p>
        </div>
      </footer>
    </main>
  )
}
