# 📋 PRODUCT BACKLOG — IMPECABLE
*Última actualización: 22 Abril 2026*

## Estado del Proyecto
- **Web en vivo:** laimpecable.es
- **Repositorio:** github.com/dsm0033/la-impecable
- **Stack:** Next.js 16 + Tailwind CSS + Vercel + Supabase (próximo)

---

## FASE 1 — Web Pública

| ID | Tarea | Estado |
|---|---|---|
| F1-01 | Proyecto Next.js creado | ✅ |
| F1-02 | Estructura de carpetas | ✅ |
| F1-03 | Landing page (hero, stats, proceso, CTA) | ✅ |
| F1-04 | Checklist interno (/interno) | ✅ |
| F1-05 | Navegación entre páginas | ✅ |
| F1-06 | GitHub conectado | ✅ |
| F1-07 | Deploy en Vercel | ✅ |
| F1-08 | Dominio laimpecable.es + www | ✅ |
| F1-09 | Responsive móvil | ✅ |
| F1-10 | Favicon con logo real | 📋 Pendiente (esperando archivos kit marca) |
| F1-11 | SEO completo (Open Graph, canonical, robots) | ✅ |
| F1-12 | Identidad de marca (IMPECABLE · Cuidado Profesional) | ✅ |
| F1-13 | Página /servicios con iconos Lucide y FAQ | ✅ |
| F1-14 | Navbar fijo con hamburguesa móvil | ✅ |
| F1-15 | Página /contacto con mapa y horario | ✅ |
| F1-16 | Página /sobre-nosotros con garantía | ✅ |
| F1-17 | Email info@laimpecable.es operativo en Gmail | ✅ |
| F1-18 | Og-image 1200x630px | 📋 Pendiente (esperando archivos kit marca) |

---

## FASE 2 — Base de Datos y Autenticación

| ID | Tarea | Prioridad | Estado |
|---|---|---|---|
| F2-01 | Crear proyecto Supabase | 🔴 | 📋 |
| F2-02 | Tabla `businesses` (multi-tenant desde el inicio) | 🔴 | 📋 |
| F2-03 | Tabla `users` con roles (admin, employee, client) | 🔴 | 📋 |
| F2-04 | Tabla `services` (migrar datos de services.js) | 🔴 | 📋 |
| F2-05 | Tabla `checklists` con secciones en JSON | 🟡 | 📋 |
| F2-06 | Conectar Supabase con Next.js | 🔴 | 📋 |
| F2-07 | Sistema de login (email + contraseña) | 🔴 | 📋 |
| F2-08 | Proteger rutas por rol (middleware Next.js) | 🔴 | 📋 |
| F2-09 | Página de login unificada | 🔴 | 📋 |
| F2-10 | Seed de datos iniciales | 🟡 | 📋 |

---

## FASE 3 — Panel de Administración (Diego)

| ID | Tarea | Prioridad | Estado |
|---|---|---|---|
| F3-01 | Layout del panel admin (sidebar + header) | 🔴 | 📋 |
| F3-02 | Dashboard con estadísticas | 🔴 | 📋 |
| F3-03 | CRUD de clientes | 🔴 | 📋 |
| F3-04 | CRUD de empleados | 🔴 | 📋 |
| F3-05 | CRUD de servicios | 🟡 | 📋 |
| F3-06 | Historial de servicios | 🟡 | 📋 |
| F3-07 | Asignar servicio a empleado | 🟡 | 📋 |
| F3-08 | Gestión de checklists | 🟢 | 📋 |

---

## FASE 4 — Portal del Empleado

| ID | Tarea | Prioridad | Estado |
|---|---|---|---|
| F4-01 | Vista "Mis servicios de hoy" | 🔴 | 📋 |
| F4-02 | Checklist interactivo vinculado a BD | 🔴 | 📋 |
| F4-03 | Marcar servicio como completado | 🔴 | 📋 |
| F4-04 | Fichaje entrada/salida | 🔴 | 📋 |
| F4-05 | Registro de pausas | 🟡 | 📋 |
| F4-06 | Vista "Mi historial" | 🟡 | 📋 |
| F4-07 | Vista "Mis horas" | 🟡 | 📋 |
| F4-08 | Cálculo automático horas extra | 🟢 | 📋 |
| F4-09 | Notificación al empleado cuando se le asigna un servicio | 🟡 | 📋 |

---

## FASE 5 — Portal del Cliente

| ID | Tarea | Prioridad | Estado |
|---|---|---|---|
| F5-01 | Registro de cliente | 🔴 | 📋 |
| F5-02 | Perfil del cliente (datos + vehículos) | 🔴 | 📋 |
| F5-03 | Vista "Mi historial" | 🔴 | 📋 |
| F5-04 | Descargar facturas en PDF | 🟡 | 📋 |
| F5-05 | Vista "Mis citas" | 🟡 | 📋 |
| F5-06 | Reservar cita con datos pre-rellenados | 🟡 | 📋 |
| F5-07 | Cancelar/reprogramar cita | 🟢 | 📋 |
| F5-08 | Notificaciones por email | 🟢 | 📋 |

---

## FASE 6 — Sistema de Reservas

| ID | Tarea | Prioridad | Estado | Notas |
|---|---|---|---|---|
| F6-01 | Tabla `bookings` en Supabase | 🔴 | 📋 | |
| F6-02 | Calendario de disponibilidad | 🔴 | 📋 | |
| F6-03 | Formulario público de reserva | 🔴 | 📋 | |
| F6-04 | Confirmación por email (Resend) | 🟡 | 📋 | Sin WhatsApp API |
| F6-05 | WhatsApp como opción manual | 🟢 | 📋 | Nunca como pieza central |
| F6-06 | Panel admin: gestionar reservas | 🔴 | 📋 | |
| F6-07 | Bloqueo de horarios ocupados | 🟡 | 📋 | |
| F6-08 | Recordatorio automático 24h antes | 🟢 | 📋 | |
| F6-09 | Configuración horarios y días laborables | 🟡 | 📋 | |

---

## FASE 7 — Facturación

| ID | Tarea | Prioridad | Estado | Notas |
|---|---|---|---|---|
| F7-01 | Tabla `invoices` en Supabase | 🔴 | 📋 | |
| F7-02 | Generación automática de factura | 🔴 | 📋 | IVA: base = precio ÷ 1.21 |
| F7-03 | Plantilla PDF de factura | 🔴 | 📋 | |
| F7-04 | Almacenamiento en Supabase Storage | 🟡 | 📋 | |
| F7-05 | Numeración secuencial (IMP-2026-0001) | 🟡 | 📋 | |
| F7-06 | Envío de factura por email | 🟢 | 📋 | |
| F7-07 | Resumen fiscal mensual/trimestral | 🟢 | 📋 | |

---

## FASE 8 — Módulos de Inteligencia Artificial

Implementación con Claude API (Anthropic). Coste estimado: <1€/mes para el volumen actual de La Impecable.

| ID | Módulo | Prioridad | Estado | Notas |
|---|---|---|---|---|
| F8-01 | Diagnóstico visual del vehículo | 🟡 | 📋 | Cliente sube fotos → Claude Vision → recomendación de servicio + precio |
| F8-02 | Análisis de reseñas | 🟡 | 📋 | Reseña nueva → Claude API → clasificación sentimiento + tema → dashboard |
| F8-03 | Predicción de demanda | 🟢 | 📋 | Historial Supabase + API meteorológica Open-Meteo → alerta semanal en panel admin |
| F8-04 | Precios dinámicos | 🟢 | 📋 | Tabla `pricing_rules` en Supabase con reglas configurables por Diego desde panel admin |

---

## FASE 9 — Plataforma SaaS

| ID | Tarea | Prioridad | Estado |
|---|---|---|---|
| F9-01 | Multi-tenant completo | 🔴 | 📋 |
| F9-02 | Subdominios por negocio | 🔴 | 📋 |
| F9-03 | Onboarding de nuevo negocio | 🔴 | 📋 |
| F9-04 | Personalización de marca por negocio | 🟡 | 📋 |
| F9-05 | Plantillas por sector | 🟡 | 📋 |
| F9-06 | Sistema de suscripción (Stripe) | 🔴 | 📋 |
| F9-07 | Landing comercial de la plataforma | 🟡 | 📋 |
| F9-08 | Panel de super-admin | 🟡 | 📋 |

---

## Prioridades
- 🔴 Crítica — bloquea otras tareas
- 🟡 Alta — importante pero no bloquea
- 🟢 Media — mejora sin urgencia

## Estados
- ✅ Completado
- 🔄 En progreso
- 📋 Pendiente
