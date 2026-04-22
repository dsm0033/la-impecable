// ============================================
// 💳 COMPONENTE: ServiceCard
// ============================================
// Muestra una tarjeta con la info de un servicio:
// nombre, precio, tiempo, descripción e icono.
// Tiene efecto de elevación al pasar el ratón.
//
// Uso: <ServiceCard service={servicioObj} index={0} />
// ============================================

"use client";

import { useState } from "react";
import { Droplets, Armchair, Sparkles, Gem, Lightbulb, Wind } from "lucide-react";

const ICONS = { Droplets, Armchair, Sparkles, Gem, Lightbulb, Wind };

export default function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = ICONS[service.icon];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative overflow-hidden rounded-2xl p-7
        border transition-all duration-500 ease-out cursor-default
        ${service.highlight
          ? "bg-gradient-to-br from-[#111820] to-[rgba(201,168,76,0.15)] border-[#C9A84C]"
          : "bg-[#111820] border-[#1E2A38]"
        }
        ${hovered
          ? "-translate-y-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(201,168,76,0.15)]"
          : "shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
        }
      `}
    >
      {/* Etiqueta "Más popular" para el servicio destacado */}
      {service.highlight && (
        <div className="absolute top-3 right-4 bg-[#C9A84C] text-[#0A0E14] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-sans">
          Más popular
        </div>
      )}

      {/* Icono */}
      <div className="mb-4 inline-flex items-center justify-center p-[10px] rounded-[10px] bg-[rgba(201,168,76,0.1)]">
        {Icon && <Icon size={36} color="#C9A84C" strokeWidth={2} />}
      </div>

      {/* Nombre del servicio */}
      <h3 className="font-serif text-[22px] font-bold text-[#E8E6E1] mb-2">
        {service.name}
      </h3>

      {/* Precio y tiempo */}
      <div className="flex items-baseline gap-2 mb-4">
        <span className="font-serif text-[32px] font-black text-[#C9A84C]">
          {service.price}€
        </span>
        <span className="font-sans text-[13px] text-[#8A9AAC]">
          · {service.time}
        </span>
      </div>

      {/* Descripción */}
      <p className="font-sans text-sm leading-relaxed text-[#8A9AAC]">
        {service.desc}
      </p>
    </div>
  );
}
