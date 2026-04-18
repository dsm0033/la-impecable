// ============================================
// 📋 DATOS DEL CHECKLIST - LAVADO COMPLETO
// ============================================
// Tiempos reales validados en la práctica.
// Para añadir/quitar tareas, edita este archivo.
// ============================================

const CHECKLIST_LAVADO = [
  {
    section: "1 · RECEPCIÓN",
    emoji: "📋",
    tasks: [
      { text: "Saludar al cliente y anotar datos del vehículo", time: "1-2 min" },
      { text: "Inspección visual exterior: daños o arañazos previos", time: "2 min" },
      { text: "Fotografiar zonas con daños pre-existentes", time: "1 min" },
      { text: "Confirmar servicio elegido y extras si los hay", time: "1 min" },
      { text: "Retirar objetos personales del cliente del interior", time: "1 min" },
    ],
  },
  {
    section: "2 · INTERIOR – ASPIRADO Y LIMPIEZA",
    emoji: "🧹",
    sectionTime: "70 min",
    tasks: [
      { text: "Retirar alfombrillas y sacudir fuera del local", time: "3 min" },
      { text: "Aspirar suelo completo (incluyendo bajo asientos)", time: "10 min" },
      { text: "Aspirar asientos (costuras y pliegues)", time: "10 min" },
      { text: "Limpiar con paño húmedo zona bajo/alrededor asientos (raíles, soportes, laterales)", time: "8 min" },
      { text: "Limpiar salpicadero con producto y paño microfibra", time: "12 min" },
      { text: "Limpiar consola central, palanca y mandos", time: "6 min" },
      { text: "Limpiar puertas por dentro (paneles y manivelas)", time: "12 min" },
      { text: "Limpiar techo interior si está sucio", time: "4 min" },
      { text: "Aplicar abrillantador de plásticos en salpicadero y puertas", time: "3 min" },
      { text: "Colocar alfombrillas limpias en su posición correcta", time: "1 min" },
      { text: "Revisar que no queden restos de producto en superficies", time: "1 min" },
    ],
  },
  {
    section: "3 · MALETERO",
    emoji: "🧳",
    tasks: [
      { text: "Aspirar maletero completo", time: "3 min" },
      { text: "Limpiar paredes y tapa interior con paño húmedo", time: "2 min" },
      { text: "Revisar que no queden objetos del cliente", time: "1 min" },
    ],
  },
  {
    section: "4 · EXTERIOR – LLANTAS Y CARROCERÍA",
    emoji: "🚗",
    sectionTime: "20 min",
    tasks: [
      { text: "Aclarado inicial con agua a presión (eliminar suciedad gruesa)", time: "3 min" },
      { text: "Aplicar champú en carrocería (de arriba a abajo)", time: "3 min" },
      { text: "Lavar llantas y neumáticos con cepillo y producto específico", time: "7 min" },
      { text: "Limpiar marcos de puertas y juntas", time: "2 min" },
      { text: "Aclarado completo con agua a presión (sin restos de jabón)", time: "3 min" },
      { text: "Secado de carrocería con microfibra (sin rayaduras)", time: "2 min" },
    ],
  },
  {
    section: "5 · CRISTALES",
    emoji: "🪟",
    sectionTime: "10 min",
    tasks: [
      { text: "Limpiar TODOS los cristales con limpiacristales + microfibra (parabrisas, lunas laterales, luna trasera y retrovisores)", time: "10 min" },
    ],
  },
  {
    section: "6 · REVISIÓN FINAL Y ENTREGA",
    emoji: "✅",
    tasks: [
      { text: "Inspección visual completa: exterior + interior", time: "3 min" },
      { text: "Colocar ambientador o fragancia (si el cliente lo desea)", time: "1 min" },
      { text: "Limpiar zona de trabajo para el siguiente servicio", time: "2 min" },
      { text: "Informar al cliente del trabajo realizado", time: "2 min" },
      { text: "Cobrar el servicio y emitir recibo si se solicita", time: "1 min" },
    ],
  },
];

export default CHECKLIST_LAVADO;
