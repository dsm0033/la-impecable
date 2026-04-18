// ============================================
// 📋 PÁGINA INTERNA - CHECKLIST
// ============================================
// Accesible en: laimpecable.es/interno
//
// Esta página es de uso interno (tú y tu equipo).
// Incluye:
// - Datos del vehículo
// - Cronómetro
// - Barra de progreso
// - Checklist completo con todas las tareas
// ============================================

"use client";

import { useState, useEffect } from "react";
import CHECKLIST_LAVADO from "@/data/checklist";
import ChecklistSection from "@/components/ChecklistSection";

export default function InternoPage() {
  // ── Estado ──
  const [checkedTasks, setCheckedTasks] = useState({});
  const [vehicleInfo, setVehicleInfo] = useState({
    matricula: "",
    operario: "",
    extras: "",
  });
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  // ── Cronómetro ──
  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime]);

  // ── Funciones ──
  const toggleTask = (key) => {
    setCheckedTasks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalTasks = CHECKLIST_LAVADO.reduce((acc, s) => acc + s.tasks.length, 0);
  const completedTasks = Object.values(checkedTasks).filter(Boolean).length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + "h " : ""}${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`;
  };

  const resetChecklist = () => {
    setCheckedTasks({});
    setVehicleInfo({ matricula: "", operario: "", extras: "" });
    setStartTime(null);
    setElapsed(0);
  };

  // ── Estilos de input reutilizables ──
  const inputStyle =
    "w-full font-sans text-sm px-3 py-2.5 bg-[#0A0E14] border border-[#1E2A38] rounded-lg text-[#E8E6E1] outline-none focus:border-[#C9A84C] transition-colors placeholder:text-[#5A6A7C]";

  return (
    <div className="min-h-screen bg-[#0A0E14] px-4 py-6 max-w-[700px] mx-auto">

      {/* ── Cabecera ── */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-serif text-[22px] font-black text-[#E8E6E1]">
            Checklist Interno
          </h2>
          <p className="font-sans text-xs text-[#8A9AAC] mt-0.5">
            Lavado Completo · 121 min
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="/"
            className="font-sans text-xs font-semibold px-4 py-2 bg-transparent text-[#C9A84C] border border-[rgba(201,168,76,0.27)] rounded-lg hover:bg-[rgba(201,168,76,0.1)] transition-colors"
          >
            🌐 Web
          </a>
          <button
            onClick={resetChecklist}
            className="font-sans text-xs font-semibold px-4 py-2 bg-transparent text-[#EF4444] border border-[rgba(239,68,68,0.27)] rounded-lg hover:bg-[rgba(239,68,68,0.1)] transition-colors"
          >
            Reiniciar
          </button>
        </div>
      </div>

      {/* ── Datos del vehículo ── */}
      <div className="bg-[#111820] border border-[#1E2A38] rounded-xl p-5 mb-5 grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="font-sans text-[11px] font-semibold text-[#8A9AAC] tracking-wider uppercase block mb-1">
            Matrícula / Vehículo
          </label>
          <input
            type="text"
            value={vehicleInfo.matricula}
            onChange={(e) => setVehicleInfo({ ...vehicleInfo, matricula: e.target.value })}
            placeholder="Ej: 1234 ABC / Seat León"
            className={inputStyle}
          />
        </div>
        <div>
          <label className="font-sans text-[11px] font-semibold text-[#8A9AAC] tracking-wider uppercase block mb-1">
            Operario/a
          </label>
          <input
            type="text"
            value={vehicleInfo.operario}
            onChange={(e) => setVehicleInfo({ ...vehicleInfo, operario: e.target.value })}
            placeholder="Nombre"
            className={inputStyle}
          />
        </div>
        <div>
          <label className="font-sans text-[11px] font-semibold text-[#8A9AAC] tracking-wider uppercase block mb-1">
            Extras
          </label>
          <input
            type="text"
            value={vehicleInfo.extras}
            onChange={(e) => setVehicleInfo({ ...vehicleInfo, extras: e.target.value })}
            placeholder="Mascotas, barro, etc."
            className={inputStyle}
          />
        </div>
      </div>

      {/* ── Cronómetro + Progreso ── */}
      <div className="flex gap-3 mb-5 flex-wrap">
        {/* Cronómetro */}
        <div className="flex-1 min-w-[200px] bg-[#111820] border border-[#1E2A38] rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="font-sans text-[10px] font-semibold text-[#8A9AAC] tracking-wider uppercase mb-1">
              Cronómetro
            </div>
            <div className={`font-serif text-2xl font-black ${startTime ? "text-[#C9A84C]" : "text-[#5A6A7C]"}`}>
              {formatTime(elapsed)}
            </div>
          </div>
          <button
            onClick={() => {
              if (startTime) {
                setStartTime(null);
              } else {
                setStartTime(Date.now() - elapsed * 1000);
              }
            }}
            className={`font-sans text-xs font-bold px-4 py-2 rounded-lg border transition-colors ${
              startTime
                ? "bg-[rgba(239,68,68,0.13)] text-[#EF4444] border-[rgba(239,68,68,0.27)]"
                : "bg-[rgba(201,168,76,0.15)] text-[#C9A84C] border-[rgba(201,168,76,0.27)]"
            }`}
          >
            {startTime ? "Pausar" : elapsed > 0 ? "Reanudar" : "Iniciar"}
          </button>
        </div>

        {/* Progreso */}
        <div className="flex-1 min-w-[200px] bg-[#111820] border border-[#1E2A38] rounded-xl p-4">
          <div className="font-sans text-[10px] font-semibold text-[#8A9AAC] tracking-wider uppercase mb-1">
            Progreso
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className={`font-serif text-2xl font-black ${progress === 100 ? "text-[#4ADE80]" : "text-[#C9A84C]"}`}>
              {Math.round(progress)}%
            </span>
            <span className="font-sans text-xs text-[#8A9AAC]">
              {completedTasks}/{totalTasks} tareas
            </span>
          </div>
          <div className="h-1.5 bg-[#1E2A38] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-400"
              style={{
                width: `${progress}%`,
                background: progress === 100
                  ? "#4ADE80"
                  : "linear-gradient(90deg, #A68A3A, #C9A84C)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Aviso de seguridad ── */}
      <div className="bg-[rgba(239,68,68,0.07)] border border-[rgba(239,68,68,0.2)] rounded-xl px-4 py-3 mb-5 flex items-center gap-2.5">
        <span className="text-base">⚠️</span>
        <span className="font-sans text-xs text-[#EF4444] leading-relaxed">
          Si detectas daño no registrado al inicio, detén el servicio y avisa al cliente inmediatamente.
        </span>
      </div>

      {/* ── Secciones del checklist ── */}
      {CHECKLIST_LAVADO.map((section, i) => (
        <ChecklistSection
          key={i}
          section={section}
          sectionIndex={i}
          checkedTasks={checkedTasks}
          onToggle={toggleTask}
        />
      ))}

      {/* ── Servicio completado ── */}
      {progress === 100 && (
        <div className="bg-[rgba(74,222,128,0.1)] border border-[rgba(74,222,128,0.27)] rounded-xl p-6 text-center mt-4">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="font-serif text-xl font-black text-[#4ADE80] mb-1">
            ¡Servicio completado!
          </h3>
          <p className="font-sans text-sm text-[#8A9AAC]">
            Tiempo total: {formatTime(elapsed)}
          </p>
        </div>
      )}

      <div className="h-10" />
    </div>
  );
}
