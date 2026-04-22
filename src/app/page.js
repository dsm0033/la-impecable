// ============================================
// 🌐 PÁGINA PRINCIPAL - LANDING PÚBLICA
// ============================================
// Esta es la página que ve el cliente cuando entra
// en laimpecable.es (o la-impecable.vercel.app).
//
// Estructura:
// 1. Hero (título grande + botones)
// 2. Barra de estadísticas
// 3. Servicios (tarjetas con precios)
// 4. Proceso (cómo trabajamos)
// 5. CTA (llamada a la acción + WhatsApp)
// 6. Footer
// ============================================

"use client";

import Link from "next/link";
import SERVICES from "@/data/services";
import ServiceCard from "@/components/ServiceCard";
import AnimatedCounter from "@/components/AnimatedCounter";

// Datos del proceso de trabajo (las 6 fases)
const PROCESO = [
  { step: "01", title: "Recepción", desc: "Inspeccionamos y documentamos el estado de tu vehículo antes de empezar." },
  { step: "02", title: "Interior", desc: "Aspirado profundo, limpieza de salpicadero, paneles, consola y techo. 70 minutos de trabajo minucioso." },
  { step: "03", title: "Maletero", desc: "Aspirado y limpieza completa del maletero." },
  { step: "04", title: "Exterior", desc: "Lavado de carrocería y llantas con productos profesionales. Secado con microfibra." },
  { step: "05", title: "Cristales", desc: "Limpieza interior y exterior de todos los cristales y retrovisores." },
  { step: "06", title: "Entrega", desc: "Revisión final, ambientador y entrega con el trabajo explicado." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0E14]">

      {/* ════════════════════════════════════════════
          HERO - La primera impresión
          ════════════════════════════════════════════ */}
      <div className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">

        {/* Fondo con gradiente sutil */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.15) 0%, transparent 60%),
                         radial-gradient(ellipse at 70% 80%, rgba(10,14,20,0.8) 0%, transparent 60%)`,
          }}
        />

        {/* Línea decorativa superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[120px]"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.27), transparent)" }}
        />

        {/* Contenido del hero */}
        <div className="relative z-10 max-w-[800px]">
          {/* Ubicación */}
          <div className="fade-in font-sans text-xs font-semibold tracking-[4px] uppercase text-[#C9A84C] mb-6">
            Sanlúcar de Barrameda
          </div>

          {/* Título principal */}
          <h1 className="fade-in font-serif font-black text-[#E8E6E1] leading-none mb-2"
            style={{ fontSize: "clamp(42px, 8vw, 80px)", animationDelay: "0.15s" }}
          >
            IMPECABLE
          </h1>

          {/* Línea dorada */}
          <div className="fade-in w-[60px] h-[2px] bg-[#C9A84C] mx-auto my-5"
            style={{ animationDelay: "0.25s" }}
          />

          {/* Subtítulo */}
          <p className="fade-in font-sans font-light text-[#8A9AAC] leading-relaxed max-w-[540px] mx-auto mb-10"
            style={{ fontSize: "clamp(16px, 2.5vw, 20px)", animationDelay: "0.35s" }}
          >
            Cuidado Profesional del Vehículo · Sanlúcar de Barrameda
            <br />
            Cada detalle tratado con{" "}
            <span className="text-[#C9A84C] font-medium">precisión y rigor</span>.
          </p>

          {/* Botones de acción */}
          <div className="fade-in flex gap-4 justify-center flex-wrap"
            style={{ animationDelay: "0.5s" }}
          >
            <Link href="/servicios"
              className="font-sans text-sm font-semibold px-8 py-3.5 bg-[#C9A84C] text-[#0A0E14] rounded-full tracking-wide hover:bg-[#A68A3A] transition-colors"
            >
              Servicios
            </Link>
            {/* ⚠️ DIEGO: Cambia el número de teléfono aquí */}
            <a href="tel:+34607445305"
              className="font-sans text-sm font-semibold px-8 py-3.5 bg-[#C9A84C] text-[#0A0E14] rounded-full tracking-wide hover:bg-[#A68A3A] transition-colors"
            >
              Llamar ahora
            </a>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-slow">
          <span className="font-sans text-[10px] tracking-[2px] text-[#5A6A7C] uppercase">
            Scroll
          </span>
          <div className="w-px h-[30px]"
            style={{ background: "linear-gradient(to bottom, #5A6A7C, transparent)" }}
          />
        </div>
      </div>

      {/* ════════════════════════════════════════════
          BARRA DE ESTADÍSTICAS
          ════════════════════════════════════════════ */}
      <div className="flex justify-center gap-[clamp(24px,5vw,80px)] px-6 py-12 border-t border-b border-[#1E2A38] flex-wrap">
        {[
          { value: 121, label: "minutos de dedicación", suffix: "" },
          { value: 6, label: "fases de trabajo", suffix: "" },
          { value: 30, label: "puntos de control", suffix: "+" },
        ].map((stat, i) => (
          <div key={i} className="text-center min-w-[120px]">
            <div className="font-serif text-[40px] font-black text-[#C9A84C]">
              <AnimatedCounter target={stat.value} />
              {stat.suffix}
            </div>
            <div className="font-sans text-[13px] text-[#8A9AAC] mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ════════════════════════════════════════════
          SERVICIOS
          ════════════════════════════════════════════ */}
      <div id="servicios" className="max-w-[1100px] mx-auto px-6 py-20">
        {/* Encabezado de sección */}
        <div className="text-center mb-14">
          <span className="font-sans text-[11px] font-semibold tracking-[3px] uppercase text-[#C9A84C]">
            Servicios
          </span>
          <h2 className="font-serif font-black text-[#E8E6E1] mt-3"
            style={{ fontSize: "clamp(28px, 5vw, 42px)" }}
          >
            Elige tu tratamiento
          </h2>
        </div>

        {/* Grid de tarjetas de servicios */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          PROCESO - CÓMO TRABAJAMOS
          ════════════════════════════════════════════ */}
      <div className="max-w-[800px] mx-auto px-6 pt-10 pb-20">
        <div className="text-center mb-12">
          <span className="font-sans text-[11px] font-semibold tracking-[3px] uppercase text-[#C9A84C]">
            Proceso
          </span>
          <h2 className="font-serif font-black text-[#E8E6E1] mt-3"
            style={{ fontSize: "clamp(24px, 4vw, 36px)" }}
          >
            Cómo trabajamos
          </h2>
        </div>

        {PROCESO.map((item, i) => (
          <div
            key={i}
            className={`flex gap-6 items-start py-6 ${
              i < PROCESO.length - 1 ? "border-b border-[#1E2A38]" : ""
            }`}
          >
            {/* Número del paso */}
            <span className="font-serif text-[32px] font-black text-[rgba(201,168,76,0.2)] min-w-[52px]">
              {item.step}
            </span>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#E8E6E1] mb-1.5">
                {item.title}
              </h4>
              <p className="font-sans text-sm text-[#8A9AAC] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ════════════════════════════════════════════
          CTA - LLAMADA A LA ACCIÓN
          ════════════════════════════════════════════ */}
      <div className="text-center px-6 py-16 border-t border-[#1E2A38]"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.15))" }}
      >
        <h2 className="font-serif font-black text-[#E8E6E1] mb-4"
          style={{ fontSize: "clamp(24px, 5vw, 36px)" }}
        >
          ¿Listo para dejarlo impecable?
        </h2>
        <p className="font-sans text-[15px] text-[#8A9AAC] mb-8">
          Sanlúcar de Barrameda · Cita previa
        </p>
        {/* ⚠️ DIEGO: Cambia el número de WhatsApp aquí */}
        <a
          href="https://wa.me/34607445305"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-[15px] font-semibold px-10 py-4 bg-[#C9A84C] text-[#0A0E14] rounded-full tracking-wide hover:bg-[#A68A3A] transition-colors"
        >
          Reservar por WhatsApp
        </a>
      </div>

      {/* ════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════ */}
      <footer className="text-center px-6 py-8 border-t border-[#1E2A38]">
        <p className="font-sans text-xs text-[#5A6A7C]">
          © 2026 Impecable · Cuidado Profesional del Vehículo · Sanlúcar de Barrameda, Cádiz
        </p>
      </footer>
    </div>
  );
}
