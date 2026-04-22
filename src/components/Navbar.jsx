"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const WA_LINK =
  "https://wa.me/34607445305?text=Hola%2C%20quiero%20pedir%20cita.";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(10,14,20,0.96)] backdrop-blur-md border-b border-[#1E2A38]"
          : "bg-[rgba(10,14,20,0.85)] backdrop-blur-sm"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="font-serif font-black text-[#C9A84C] text-xl tracking-wide hover:text-[#A68A3A] transition-colors"
        >
          IMPECABLE
        </Link>

        {/* Nav escritorio */}
        <nav className="hidden sm:flex items-center gap-7">
          <Link
            href="/servicios"
            className="font-sans text-sm font-medium text-[#8A9AAC] hover:text-[#C9A84C] transition-colors tracking-wide"
          >
            Servicios
          </Link>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-semibold px-5 py-2 bg-[#C9A84C] text-[#0A0E14] rounded-full tracking-wide hover:bg-[#A68A3A] transition-colors"
          >
            Reservar
          </a>
        </nav>

        {/* Botón hamburguesa (móvil) */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="sm:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span
            className={`block h-[2px] bg-[#C9A84C] transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[7px] w-5" : "w-5"
            }`}
          />
          <span
            className={`block h-[2px] bg-[#C9A84C] transition-all duration-300 w-5 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] bg-[#C9A84C] transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[7px] w-5" : "w-5"
            }`}
          />
        </button>
      </div>

      {/* Menú desplegable (móvil) */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="bg-[rgba(10,14,20,0.98)] border-t border-[#1E2A38] px-6 py-6 flex flex-col gap-5">
          <Link
            href="/servicios"
            onClick={() => setMenuOpen(false)}
            className="font-sans text-sm font-medium text-[#8A9AAC] hover:text-[#C9A84C] transition-colors tracking-wide"
          >
            Servicios
          </Link>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="inline-flex w-fit font-sans text-sm font-semibold px-5 py-2.5 bg-[#C9A84C] text-[#0A0E14] rounded-full tracking-wide hover:bg-[#A68A3A] transition-colors"
          >
            Reservar por WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
