# 🏗️ ARQUITECTURA TÉCNICA — IMPECABLE
*Última actualización: 22 Abril 2026*

## Stack Tecnológico

| Capa | Tecnología | Por qué |
|---|---|---|
| Frontend | Next.js 16 + React | Framework estándar del sector, App Router |
| Estilos | Tailwind CSS | Utilidades, rápido, consistente |
| Iconos | Lucide React (strokeWidth 2, color #C9A84C) | Minimalista, elegante |
| Backend/DB | Supabase (próximo Sprint 3) | Auth + DB + Storage + RLS |
| Hosting | Vercel | CI/CD automático desde GitHub |
| Email | Resend (próximo Sprint 6) | Gratuito hasta 3000/mes |
| Pagos | Stripe (Fase 8) | Estándar mundial |

---

## Estructura de Carpetas

```
la-impecable/
├── docs/
│   ├── PRODUCT_BACKLOG.md
│   ├── SPRINTS.md
│   └── ARQUITECTURA.md
├── public/
│   ├── favicon.ico
│   └── og-image.jpg (pendiente)
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.js          ← SEO global, fuentes, navbar
│   │   ├── page.js            ← Landing (/)
│   │   ├── servicios/
│   │   │   └── page.js        ← Catálogo (/servicios)
│   │   ├── contacto/
│   │   │   └── page.js        ← Contacto (/contacto)
│   │   ├── sobre-nosotros/
│   │   │   └── page.js        ← Sobre nosotros (/sobre-nosotros)
│   │   └── interno/
│   │       └── page.js        ← Checklist interno (/interno)
│   ├── components/
│   │   ├── Navbar.jsx         ← Menú fijo con hamburguesa
│   │   ├── ServiceCard.jsx    ← Tarjeta de servicio
│   │   ├── ChecklistSection.jsx ← Sección del checklist
│   │   └── AnimatedCounter.jsx  ← Contador animado
│   └── data/
│       ├── services.js        ← Datos de servicios y precios
│       └── checklist.js       ← Tareas del checklist con tiempos
├── package.json
└── next.config.mjs
```

---

## Rutas Actuales

| Ruta | Página | Acceso |
|---|---|---|
| / | Landing pública | Público |
| /servicios | Catálogo de servicios | Público |
| /contacto | Datos de contacto y mapa | Público |
| /sobre-nosotros | Filosofía y garantía | Público |
| /interno | Checklist de trabajo | Interno (sin auth aún) |

## Rutas Futuras (Fase 2+)

| Ruta | Página | Acceso |
|---|---|---|
| /login | Login unificado | Público |
| /admin | Panel administrador | Admin |
| /admin/clientes | Gestión clientes | Admin |
| /admin/equipo | Gestión empleados | Admin |
| /admin/reservas | Gestión reservas | Admin |
| /admin/facturas | Facturación | Admin |
| /equipo | Portal empleado | Empleado |
| /equipo/hoy | Servicios del día | Empleado |
| /equipo/checklist/[id] | Checklist en curso | Empleado |
| /cliente | Portal cliente | Cliente |
| /cliente/historial | Historial servicios | Cliente |
| /cliente/facturas | Facturas PDF | Cliente |
| /reservar | Formulario reserva | Público |

---

## Identidad de Marca

```
Nombre:      IMPECABLE (mayúsculas en títulos principales)
Tagline:     Cuidado Profesional del Vehículo
Ubicación:   Sanlúcar de Barrameda, Cádiz
Dirección:   C. Palmilla, 28, 11540 Sanlúcar de Barrameda
Horario:     Lunes a viernes 9:30 - 13:30h
Teléfono:    +34 607 445 305
WhatsApp:    +34 607 445 305
Email:       info@laimpecable.es
Web:         laimpecable.es
```

### Paleta de colores
```
Fondo:          #0A0E14
Fondo tarjeta:  #111820
Dorado:         #C9A84C
Dorado oscuro:  #A68A3A
Dorado glow:    rgba(201,168,76,0.15)
Texto:          #E8E6E1
Texto muted:    #8A9AAC
Texto dark:     #5A6A7C
Borde:          #1E2A38
Verde éxito:    #4ADE80
Rojo error:     #EF4444
```

### Tipografías
```
Títulos:  Playfair Display (serif) - 400, 700, 900
Cuerpo:   DM Sans (sans-serif) - 300, 400, 500, 600, 700
```

### Iconos
```
Librería:    Lucide React
strokeWidth: 2
Color:       #C9A84C (dorado)
Tamaño:      36px con fondo rgba(201,168,76,0.1) y padding 10px
```

---

## Servicios y Precios

| Servicio | Precio | Tiempo | ID |
|---|---|---|---|
| Lavado Completo | 60€ | ~2h | lavado |
| Tapicería Profunda | 60€ | ~1h + secado | tapiceria |
| Lavado + Tapicería | 110€ | ~3h + secado | combinado |
| Premium con Encerado | 120€ | ~3h | premium |
| Pulido de Faros | 50€ | ~45min | faros |
| Tratamiento Ozono | 30€ | ~30min | ozono |

**IVA:** base = precio ÷ 1.21 (NUNCA precio × 0.21)

---

## Modelo de Base de Datos (Supabase — Sprint 3)

```
businesses    → negocio (multi-tenant desde el inicio)
users         → todos los usuarios con role enum
services      → catálogo de servicios por negocio
checklists    → checklists en JSON flexible
bookings      → reservas con estados
service_logs  → historial de servicios realizados
invoices      → facturas con IVA
work_hours    → fichaje de empleados
```

**Row Level Security (RLS):** activado en todas las tablas.
Cada usuario solo ve los datos de su negocio y su rol.

---

## Reglas del Proyecto

1. Nunca inventar datos o tiempos — solo usar los validados por Diego
2. IVA: base = precio ÷ 1.21 (verificar siempre)
3. Multi-tenant desde el día 1: todas las tablas con `business_id`
4. Sin WhatsApp API: reservas propias + email con Resend
5. Commits con Conventional Commits: feat/fix/style/docs/refactor
6. Siempre probar en localhost antes de hacer push
7. Diego debe entender el código — si no lo entiende, no está hecho
