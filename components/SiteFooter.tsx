export default function SiteFooter() {
  return (
    <footer className="py-8 px-4 md:px-8 lg:px-16 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center flex flex-col gap-2 sm:flex-row sm:justify-around sm:items-center">
        <p className="text-gray-600 italic">
          &copy; {new Date().getFullYear()} Grupo Ana Melo. Todos os direitos reservados.
        </p>
        <p className="text-gray-600 italic">Site desenvolvido por @codewithsah</p>
      </div>
    </footer>
  )
}
