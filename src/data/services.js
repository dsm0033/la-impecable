// ============================================
// 📋 DATOS DE SERVICIOS - LA IMPECABLE
// ============================================
// Para cambiar un precio, tiempo o descripción,
// solo edita este archivo. Toda la web se actualiza.
// ============================================

const SERVICES = [
  {
    id: "lavado",
    name: "Lavado Completo",
    price: 60,
    time: "~2h",
    desc: "Interior profundo + exterior impecable. Aspirado completo, limpieza de salpicadero, paneles, cristales, carrocería y llantas.",
    icon: "🚿",
    highlight: false,
  },
  {
    id: "tapiceria",
    name: "Tapicería Profunda",
    price: 60,
    time: "~1h + secado",
    desc: "Limpieza profesional con máquina de inyección-extracción. Ideal para manchas, olores y suciedad incrustada en asientos y alfombrillas.",
    icon: "🛋️",
    highlight: false,
  },
  {
    id: "combinado",
    name: "Lavado + Tapicería",
    price: 110,
    time: "~3h + secado",
    desc: "El tratamiento más completo: lavado integral más limpieza profunda de tapicería. Tu coche como recién salido del concesionario.",
    icon: "✨",
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium con Encerado",
    price: 120,
    time: "~3h",
    desc: "Lavado completo más encerado protector de carrocería. Brillo duradero y protección contra los elementos.",
    icon: "💎",
    highlight: false,
  },
  {
    id: "faros",
    name: "Pulido de Faros",
    price: 50,
    time: "~45min",
    desc: "Recupera la transparencia original de tus faros. Mejora la visibilidad y el aspecto de tu vehículo.",
    icon: "💡",
    highlight: false,
  },
  {
    id: "ozono",
    name: "Tratamiento Ozono",
    price: 30,
    time: "~30min",
    desc: "Eliminación de olores, bacterias y alérgenos. Ideal tras transporte de mascotas, tabaco o humedad.",
    icon: "🌬️",
    highlight: false,
  },
];

export default SERVICES;
