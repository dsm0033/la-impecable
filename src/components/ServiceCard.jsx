"use client";

import { useState } from "react";
import {
  Droplets, Armchair, Sparkles, Gem, Lightbulb, Wind,
  Wrench, Car, Shield, Star, Brush, Zap, Settings
} from "lucide-react";

const ICONS = {
  Droplets, Armchair, Sparkles, Gem, Lightbulb, Wind,
  Wrench, Car, Shield, Star, Brush, Zap, Settings,
};

function formatDuration(minutes) {
  if (!minutes) return null;
  if (minutes < 60) return `~${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `~${h}h ${m}min` : `~${h}h`;
}

export default function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = ICONS[service.icon] ?? Wrench;
  const duration = formatDuration(service.duration_minutes);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative overflow-hidden rounded-2xl p-7
        border transition-all duration-500 ease-out cursor-default
        ${!service.active
          ? "bg-[#0D1117] border-[#1E2A38] opacity-70"
          : service.highlight
          ? "bg-gradient-to-br from-[#111820] to-[rgba(201,168,76,0.15)] border-[#C9A84C]"
          : "bg-[#111820] border-[#1E2A38]"
        }
        ${hovered && service.active
          ? "-translate-y-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(201,168,76,0.15)]"
          : "shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
        }
      `}
    >
      {!service.active && (
        <div className="absolute top-3 right-4 bg-[#1E2A38] text-[#5A6A7C] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-sans">
          Próximamente
        </div>
      )}
      {service.active && service.highlight && (
        <div className="absolute top-3 right-4 bg-[#C9A84C] text-[#0A0E14] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-sans">
          Más popular
        </div>
      )}

      <div className="mb-4 inline-flex items-center justify-center p-[10px] rounded-[10px] bg-[rgba(201,168,76,0.1)]">
        <Icon size={36} color="#C9A84C" strokeWidth={2} />
      </div>

      <h3 className="font-serif text-[22px] font-bold text-[#E8E6E1] mb-2">
        {service.name}
      </h3>

      {service.active && (
        <div className="flex items-baseline gap-2 mb-4">
          {service.price != null && (
            <span className="font-serif text-[32px] font-black text-[#C9A84C]">
              {service.price}€
            </span>
          )}
          {duration && (
            <span className="font-sans text-[13px] text-[#8A9AAC]">
              · {duration}
            </span>
          )}
        </div>
      )}

      <p className="font-sans text-sm leading-relaxed text-[#8A9AAC]">
        {service.description}
      </p>
    </div>
  );
}
