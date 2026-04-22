# 🏃 SPRINTS — IMPECABLE
*Última actualización: 22 Abril 2026*

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
**Estado:** COMPLETADO (pendiente favicon y og-image)

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
| Favicon con logo real | 📋 Pendiente kit marca |
| Og-image 1200x630px | 📋 Pendiente kit marca |

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

## 📋 SPRINT 4 — "Panel Admin"
**Fechas:** Semanas 7-8
**Objetivo:** Panel de administración básico para Diego

---

## 📋 SPRINT 5 — "Portal Empleado"
**Fechas:** Semanas 9-10
**Objetivo:** Portal del empleado con checklist y fichaje

---

## 📋 SPRINT 6 — "Portal Cliente"
**Fechas:** Semanas 11-12
**Objetivo:** Portal del cliente con historial y facturas

---

## 📋 SPRINT 7 — "Reservas"
**Fechas:** Semanas 13-14
**Objetivo:** Sistema de reservas con calendario y notificaciones por email

---

## 📋 SPRINT 8 — "Facturación"
**Fechas:** Semanas 15-16
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
