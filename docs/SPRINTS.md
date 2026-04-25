# 🏃 SPRINTS — IMPECABLE
*Última actualización: 24 Abril 2026*

## Metodología
- Sprints de 2 semanas
- Equipo: Diego (Product Owner + Developer) + Claude (Tech Lead + Mentor)
- Tablero: GitHub Projects
- Definition of Done: funciona + probado + commit + push + Diego lo entiende

---

## ✅ SPRINT 1 — "Cimientos"
**Fechas:** Semanas 1-2 (inicio: 2026-04-01 aprox.)
**Objetivo:** Entorno listo + proyecto Next.js en Vercel
**Estado:** COMPLETADO

| Tarea | Estado |
|---|---|
| Instalar Node.js, VS Code, Git | ✅ |
| GitHub + Vercel + SSH configurados | ✅ |
| Proyecto Next.js creado | ✅ |
| Landing migrada al proyecto | ✅ |
| Checklist interno migrado | ✅ |
| Primer push a GitHub | ✅ |
| Deploy en Vercel | ✅ |

---

## ✅ SPRINT 2 — "Identidad y Presencia"
**Fechas:** Semanas 3-4 (inicio: 2026-04-08 aprox. — finalizado: 2026-04-22)
**Objetivo:** Dominio propio + identidad de marca + páginas completas
**Estado:** COMPLETADO

| Tarea | Estado |
|---|---|
| Dominio laimpecable.es conectado a Vercel | ✅ |
| www.laimpecable.es redirigiendo (308) | ✅ |
| SEO completo (Open Graph, Twitter Card, canonical) | ✅ |
| Identidad de marca: IMPECABLE · Cuidado Profesional del Vehículo | ✅ |
| Página /servicios con iconos Lucide y FAQ | ✅ |
| Navbar fijo con hamburguesa móvil | ✅ |
| Página /contacto con mapa y horario | ✅ |
| Página /sobre-nosotros con garantía | ✅ |
| Email info@laimpecable.es operativo en Gmail | ✅ |
| Favicon con logo real (icon.png + favicon.ico) | ✅ |
| Og-image 1200x630px (public/og-image.png) | ✅ |

---

## ✅ SPRINT 3 — "Base de Datos"
**Fechas:** Semanas 5-6 (inicio: 2026-04-22 — finalizado: 2026-04-22)
**Objetivo:** Supabase conectado + login + roles
**Estado:** COMPLETADO

| Tarea | Estado |
|---|---|
| Crear proyecto Supabase | ✅ |
| Diseñar y crear tablas (businesses, users, services, checklists) | ✅ |
| Conectar Supabase con Next.js | ✅ |
| Sistema de login unificado | ✅ |
| Proxy de protección de rutas por rol | ✅ |
| Seed de datos iniciales | ✅ |

---

## 🔄 SPRINT 4 — "Panel Admin"
**Fechas:** Semanas 7-8 (inicio: 2026-04-23)
**Objetivo:** Panel de administración básico para Diego
**Estado:** COMPLETADO

| Tarea | Estado |
|---|---|
| Layout sidebar + header responsive | ✅ |
| Dashboard con estadísticas y tarjetas clicables | ✅ |
| CRUD de clientes | ✅ |
| CRUD de empleados | ✅ |
| CRUD de servicios (toggle hecho, falta crear/editar/borrar) | ✅ |
| Historial de servicios + asignar empleado | ✅ |
| Gestión de checklists | ✅ |

---

## ✅ SPRINT 5 — "Portal Empleado"
**Fechas:** Semanas 9-10 (inicio: 2026-04-23 — finalizado: 2026-04-24)
**Objetivo:** Portal del empleado con checklist interactivo vinculado al historial
**Estado:** COMPLETADO

| Tarea | Estado |
|---|---|
| Login de empleado (ya funciona, ruta /empleado protegida) | ✅ |
| Ver trabajos asignados del día | ✅ |
| Abrir trabajo y ver checklist vinculado | ✅ |
| Marcar ítems del checklist en tiempo real | ✅ |
| Cronómetro automático (inicia al primer check, pausa/reanuda) | ✅ |
| Completar trabajo → actualizar estado en historial | ✅ |
| Guardar hora de inicio y finalización por trabajo | ✅ |
| Historial de trabajos completados en portal empleado | ✅ |
| Admin: estado cobrado / vehículo recogido por servicio | ✅ |
| Admin: enlace directo a vista empleado desde sidebar | ✅ |

---

## ✅ SPRINT 6 — "Reservas y Pago"
**Fechas:** Semanas 11-12 (inicio: 2026-04-24 — finalizado: 2026-04-25)
**Objetivo:** Sistema de reservas público con pago online via Stripe
**Nota:** Portal Cliente (historial, facturas) pasa a Sprint 8. OAuth de Google pasa a Sprint 8.

| Tarea | Estado |
|---|---|
| Tabla `bookings` en Supabase | ✅ |
| Página pública `/reservar` — servicio, fecha, hora, nombre, matrícula | ✅ |
| Stripe Checkout — pago seguro hospedado por Stripe | ✅ |
| Página de confirmación tras el pago | ✅ |
| Webhook de Stripe — confirma reserva en BD al pagar | ✅ |
| Panel admin: vista de reservas con estado de pago | ✅ |
| Deploy en producción — Vercel + Stripe webhook | ✅ |
| Emails automáticos con Resend — admin y cliente al confirmar pago | ✅ |

---

## 📋 SPRINT 7 — "Portal Empleado Avanzado"
**Fechas:** Semanas 13-14
**Objetivo:** Área personal del empleado: horas, vacaciones y documentos

| Tarea | Estado |
|---|---|
| Historial ampliado: mes en curso y mes anterior con resumen de trabajos | 📋 |
| Vista "Mis horas" — resumen de horas trabajadas por semana/mes | 📋 |
| Cálculo automático de horas extra | 📋 |
| Solicitud de vacaciones desde el portal | 📋 |
| Admin: gestionar solicitudes de vacaciones | 📋 |
| Acceso a nóminas (subida de PDF por el admin) | 📋 |

---

## 📋 SPRINT 8 — "Portal Cliente"
**Fechas:** Semanas 15-16
**Objetivo:** Portal del cliente con historial de servicios y facturas en PDF

| Tarea | Estado |
|---|---|
| Perfil del cliente (datos + vehículos) | 📋 |
| Vista "Mi historial" | 📋 |
| Descargar facturas en PDF | 📋 |

---

## 📋 SPRINT 9 — "Facturación"
**Fechas:** Semanas 17-18
**Objetivo:** Generación automática de facturas con IVA correcto

---

## 📋 SPRINT 9-12 — "SaaS"
**Fechas:** Semanas 17-24
**Objetivo:** Plataforma exportable a otros negocios

---

## Decisiones Técnicas Importantes

1. **Multi-tenant desde el día 1** — todas las tablas llevan `business_id`
2. **Login unificado con roles** — un solo sistema, el rol determina el portal
3. **Checklists como JSON** — flexibles para cualquier sector
4. **Sin WhatsApp API** — reservas propias en Supabase + emails con Resend
5. **IVA: base = precio ÷ 1.21** — verificado, nunca precio × 0.21
