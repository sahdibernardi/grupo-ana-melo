"use client"

import { useState, useEffect, type MouseEvent } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import Image from "next/image"

type NavLink = {
  name: string
  href: string
  type: "anchor" | "route"
}

const navLinks: NavLink[] = [
  { name: "Início", href: "#home", type: "anchor" },
  { name: "Sobre", href: "#sobre", type: "anchor" },
  { name: "Como Ajudar", href: "#ajudar", type: "anchor" },
  { name: "Acompanhe", href: "#acompanhe", type: "anchor" },
  {
    name: "Cadastro de beneficiárias",
    href: "/cadastro-beneficiaria",
    type: "route",
  },
]

type NavbarProps = {
  variant?: "transparent" | "solid"
}

export default function Navbar({ variant = "transparent" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(variant === "solid")
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    if (variant === "solid") {
      setScrolled(true)
      return
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [variant])

  const scrollToSection = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const resolveAnchorHref = (href: string) => (isHome ? href : `/${href}`)

  const handleAnchorClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!isHome) return

    event.preventDefault()
    scrollToSection(href)
  }

  const headerClassName =
    variant === "solid" || scrolled
      ? "bg-white shadow-md py-2"
      : "bg-transparent py-4"

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClassName}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold text-[#2A9D8F]"
              onClick={(e) => {
                if (!isHome) return
                e.preventDefault()
                scrollToSection("#home")
              }}
            >
              <Image alt="logo ana melo" src="/logoAnaMelo.png" width={100} height={100} />
            </Link>
          </div>

          <nav className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
            {navLinks.map((link) =>
              link.type === "route" ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-gray-600 font-bold hover:text-[#2A9D8F] transition-colors ${
                    pathname === link.href ? "text-[#2A9D8F]" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  key={link.name}
                  href={resolveAnchorHref(link.href)}
                  className="text-gray-600 font-bold hover:text-[#2A9D8F] transition-colors"
                  onClick={(e) => handleAnchorClick(e, link.href)}
                >
                  {link.name}
                </Link>
              ),
            )}
            <Link
              href={isHome ? "#ajudar" : "/#ajudar"}
              className="inline-flex items-center px-6 py-3 text-md text-white bg-[#2A9D8F] rounded-lg hover:bg-[#238277] transition-colors whitespace-nowrap"
              onClick={(e) => handleAnchorClick(e, "#ajudar")}
            >
              Faça parte da corrente do bem
            </Link>
          </nav>

          <div className="lg:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">{isOpen ? "Fechar menu" : "Abrir menu"}</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
            {navLinks.map((link) =>
              link.type === "route" ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-50 ${
                    pathname === link.href
                      ? "text-[#2A9D8F] bg-gray-50"
                      : "text-gray-600 hover:text-[#2A9D8F]"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  key={link.name}
                  href={resolveAnchorHref(link.href)}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#2A9D8F] hover:bg-gray-50 rounded-md"
                  onClick={(e) => {
                    handleAnchorClick(e, link.href)
                    setIsOpen(false)
                  }}
                >
                  {link.name}
                </Link>
              ),
            )}
            <Link
              href={isHome ? "#ajudar" : "/#ajudar"}
              className="block px-3 py-2 text-base font-medium text-white bg-[#2A9D8F] rounded-md hover:bg-[#238277]"
              onClick={(e) => {
                handleAnchorClick(e, "#ajudar")
                setIsOpen(false)
              }}
            >
              Faça parte da corrente do bem
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
