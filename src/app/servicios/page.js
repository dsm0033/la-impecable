import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import SERVICES from "@/data/services";
import { Droplets, Armchair, Sparkles, Gem, Lightbulb, Wind } from "lucide-react";

const ICONS = { Droplets, Armchair, Sparkles, Gem, Lightbulb, Wind };

export const metadata = {
  title: "Servicios",
  description:
    "Todos los servicios de Impecable: lavado completo, tapicería, encerado, pulido de faros y tratamiento de ozono. Precios claros y cita por WhatsApp.",
  alternates: {
    canonical: "https://laimpecable.es/servicios",
  },
};

function ServiceIcon({ name }) {
  const Icon = ICONS[name];
  return Icon ? <Icon size={28} color="#C9A84C" strokeWidth={1.5} /> : null;
}

const WA_NUMBER = "34607445305";

function waLink(serviceName) {
  const text = encodeURIComponent(
    `Hola, quiero reservar el servicio de ${serviceName}.`
  );
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-[#0A0E14]">

      {/* Cabecera */}
      <div className="relative pt-20 pb-16 text-center px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-[3px] uppercase text-[#C9A84C] mb-8 hover:text-[#A68A3A] transition-colors"
          >
            ← Volver
          </Link>
          <h1
            className="font-serif font-black text-[#E8E6E1] leading-none mb-4"
            style={{ fontSize: "clamp(36px, 7vw, 64px)" }}
          >
            IMPECABLE
          </h1>
          <div className="w-[60px] h-[2px] bg-[#C9A84C] mx-auto my-5" />
          <p
            className="font-sans font-light text-[#8A9AAC] max-w-[500px] mx-auto"
            style={{ fontSize: "clamp(15px, 2vw, 18px)" }}
          >
            Todos nuestros tratamientos, con precio y tiempo estimado.
            <br />
            Reserva directamente por WhatsApp.
          </p>
        </div>
      </div>

      {/* Listado de servicios */}
      <div className="max-w-[820px] mx-auto px-6 pb-24 space-y-5">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className={`
              rounded-2xl border p-7
              ${service.highlight
                ? "bg-gradient-to-br from-[#111820] to-[rgba(201,168,76,0.12)] border-[#C9A84C]"
                : "bg-[#111820] border-[#1E2A38]"
              }
            `}
          >
            {service.highlight && (
              <span className="inline-block bg-[#C9A84C] text-[#0A0E14] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-sans mb-4">
                Más popular
              </span>
            )}

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <ServiceIcon name={service.icon} />
                  <h2 className="font-serif text-[22px] font-bold text-[#E8E6E1]">
                    {service.name}
                  </h2>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-serif text-[36px] font-black text-[#C9A84C]">
                    {service.price}€
                  </span>
                  <span className="font-sans text-sm text-[#8A9AAC]">
                    · {service.time}
                  </span>
                </div>

                <p className="font-sans text-sm leading-relaxed text-[#8A9AAC] max-w-[480px]">
                  {service.desc}
                </p>
              </div>

              {/* Botón reserva */}
              <div className="sm:pt-1 sm:shrink-0">
                <a
                  href={waLink(service.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-sm font-semibold px-6 py-3 bg-[#C9A84C] text-[#0A0E14] rounded-full tracking-wide hover:bg-[#A68A3A] transition-colors whitespace-nowrap"
                >
                  Reservar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <div
        className="text-center px-6 py-16 border-t border-[#1E2A38]"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.15))" }}
      >
        <h2
          className="font-serif font-black text-[#E8E6E1] mb-4"
          style={{ fontSize: "clamp(24px, 5vw, 36px)" }}
        >
          ¿Tienes alguna duda?
        </h2>
        <p className="font-sans text-[15px] text-[#8A9AAC] mb-8">
          Escríbenos sin compromiso y te respondemos en menos de 24 horas.
        </p>
        <a
          href="https://wa.me/34607445305?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20vuestros%20servicios."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-[15px] font-semibold px-10 py-4 bg-[#C9A84C] text-[#0A0E14] rounded-full tracking-wide hover:bg-[#A68A3A] transition-colors"
        >
          Escribir por WhatsApp
        </a>
      </div>

      {/* Footer */}
      <footer className="text-center px-6 py-8 border-t border-[#1E2A38]">
        <p className="font-sans text-xs text-[#5A6A7C]">
          © 2026 Impecable · Cuidado Profesional del Vehículo · Sanlúcar de Barrameda, Cádiz
        </p>
      </footer>
    </div>
  );
}
