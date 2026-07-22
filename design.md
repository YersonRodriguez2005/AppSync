# Documentación de Diseño, UI/UX y Arquitectura de Datos (`design.md`)
**Proyecto:** AppSync — Personal App Store
**Versión:** 1.0.0
**Autor / Dueño:** Yerson Fabian Garzon Rodriguez
**Metodología:** Design Tokens & Relational Data Modeling

---

## 1. Filosofía de Diseño y Sistema Dual de Temas (Theme System)

El sistema visual de **AppSync** se basa en **Design Tokens** (variables de diseño reutilizables) adaptados para soportar de manera fluida la transición entre Tema Claro (`Light Mode`) y Tema Oscuro (`Dark Mode`), manteniendo la estética fusionada de **Glassmorphism** y **Soft UI (Modern Clay Fusion)**.

### 1.1 Paleta de Colores y Design Tokens

#### ☀️ Tema Claro (Light Mode - "Menta & Pastel Slate")
Diseñado para máxima legibilidad diurna, transmitiendo limpieza, apertura y confianza general al público.
* **Background Principal (`bg-primary`):** `#F0F4F8` (Slate Blue muy suave)
* **Superficies Soft UI (`surface-soft`):** `#E2E8F0` con elevación táctil.
* **Superficies Glassmorphism (`surface-glass`):** `rgba(255, 255, 255, 0.55)` con `backdrop-blur-md`.
* **Borde Glass (`border-glass`):** `rgba(255, 255, 255, 0.8)`
* **Texto Primario (`text-main`):** `#0F172A` (Slate 900 - Contraste óptimo sin ser negro puro)
* **Texto Secundario (`text-muted`):** `#64748B` (Slate 500)
* **Acento Principal (`brand-accent`):** `#3B82F6` (Blue 500 - Acción, confianza y enlaces)
* **Acento Secundario (`brand-success`):** `#10B981` (Emerald 500 - Botones de descarga y confirmación)

#### 🌙 Tema Oscuro (Dark Mode - "Deep Space Glass")
Diseñado para entornos de baja iluminación, reduciendo la fatiga visual mediante contrastes suaves y profundidades de sombra absorbentes.
* **Background Principal (`bg-primary`):** `#0B1120` (Slate 950 profundo)
* **Superficies Soft UI (`surface-soft`):** `#1E293B` (Slate 800)
* **Superficies Glassmorphism (`surface-glass`):** `rgba(15, 23, 42, 0.65)` con `backdrop-blur-lg`.
* **Borde Glass (`border-glass`):** `rgba(255, 255, 255, 0.12)`
* **Texto Primario (`text-main`):** `#F8FAFC` (Slate 50)
* **Texto Secundario (`text-muted`):** `#94A3B8` (Slate 400)
* **Acento Principal (`brand-accent`):** `#60A5FA` (Blue 400 - Más brillante para resaltar en fondo oscuro)
* **Acento Secundario (`brand-success`):** `#34D399` (Emerald 400)

### 1.2 Sombras y Efectos Estructurales (Tailwind Custom Extensions)
```css
/* Configuración conceptual en tailwind.config.js */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'soft-light': '-8px -8px 16px #FFFFFF, 8px 8px 16px #D1D9E6',
        'soft-light-inset': 'inset -4px -4px 8px #FFFFFF, inset 4px 4px 8px #D1D9E6',
        'soft-dark': '-6px -6px 12px rgba(255, 255, 255, 0.04), 6px 6px 16px rgba(0, 0, 0, 0.6)',
        'soft-dark-inset': 'inset -3px -3px 6px rgba(255, 255, 255, 0.05), inset 3px 3px 6px rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '16px',
      }
    }
  }
}
```

### 1.3 Tipografía y Jerarquía Visual
* **Familia Primaria (UI & Body):** `Inter`, `Plus Jakarta Sans` o `system-ui`. Priorizan la legibilidad geométrica en interfaces de usuario modernas.
* **Familia Secundaria (Código o Specs Técnicas):** `Fira Code` o `JetBrains Mono` para mostrar pesos de archivos, números de versión y consolas.
* **Escala de Fuentes:**
  * **Hero Title:** `text-4xl` a `text-5xl` (`font-extrabold`, `tracking-tight`)
  * **Section Headers:** `text-2xl` (`font-bold`)
  * **Card Titles (Apps):** `text-lg` (`font-semibold`)
  * **Body Text:** `text-base` (`font-normal`, `leading-relaxed`)
  * **Technical Specs / Captions:** `text-xs` a `text-sm` (`font-medium`, `text-muted`)

---

## 2. Stack Tecnológico & Librerías Clave

### 2.1 Frontend (Interfaz del Usuario)
* **Librería Core:** React 18+ (o Next.js App Router para SSR y SEO nativo optimizado).
* **Estilos:** Tailwind CSS v3.4+ (utilizando la directiva `darkMode: 'class'` para control total del toggle claro/oscuro desde la UI).
* **Iconografía:** `lucide-react` (iconos vectoriales limpios con trazo uniforme que encajan a la perfección con Soft UI y Glassmorphism).
* **Gestión de Estado Ligero:** React Context API + `localStorage` (para persistir la preferencia de tema del usuario y el estado de aceptación de T&C por sesión).
* **Animaciones:** `framer-motion` (para transiciones suaves al abrir el Modal legal, animar el cambio de tema y la flotación interactiva de las tarjetas).

### 2.2 Backend & API (Servidor)
* **Entorno:** Node.js + Express.js (o Next.js API Routes en arquitectura monolítica moderna).
* **Validación de Datos:** `Zod` (para validar de forma estricta el formato de correos, longitud de comentarios y tipos de datos en el backend).
* **Servicio de Emailing:** `Resend` API o `Nodemailer` con transporte SMTP seguro (para disparar los correos de cotización de apps personalizadas directamente al Gmail del creador).
* **CORS & Seguridad:** `cors`, `helmet`, y `express-rate-limit` (para evitar spam masivo en comentarios y abusos del endpoint de contacto).

### 2.3 Base de Datos
* **Motor Relacional:** PostgreSQL 15+.
* **ORM / Query Builder:** `Prisma ORM` o `Drizzle ORM` (aportan seguridad de tipado TypeScript e historial de migraciones declarativas).

---

## 3. Diccionario de Datos (PostgreSQL Database Schema)

Aunque el catálogo principal reside en memoria estática de alta velocidad (`appsData.js`), el backend gestiona la persistencia de la comunidad (comentarios) y, como **buena práctica de ingeniería senior**, guarda un registro de respaldo de los leads (encargos de apps) por si el servicio de correo web llega a fallar en algún momento.

### 3.1 Tabla: `app_comments`
Almacena el feedback, calificación y opiniones de los usuarios para cada aplicación del catálogo.

| Columna | Tipo de Dato (PgSQL) | Restricciones | Descripción |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | Identificador único e irrepetible del comentario. |
| `app_id` | `VARCHAR(100)` | `NOT NULL`, `INDEX` | Slug/ID que coincide exactamente con el atributo `id` del arreglo estático `appsData.js`. |
| `author_name` | `VARCHAR(80)` | `NOT NULL` | Nombre o seudónimo del usuario que comenta. |
| `content` | `TEXT` | `NOT NULL` | Cuerpo del comentario u opinión del usuario. |
| `rating` | `SMALLINT` | `NOT NULL`, `DEFAULT 5`, `CHECK (rating >= 1 AND rating <= 5)` | Calificación en escala de 1 a 5 estrellas. |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | `NOT NULL`, `DEFAULT NOW()` | Fecha y hora exacta en que se publicó el comentario. |
| `is_approved` | `BOOLEAN` | `NOT NULL`, `DEFAULT TRUE` | Bandera para moderación de contenido (ocultar spam o lenguaje inapropiado). |

### 3.2 Tabla: `custom_app_leads` (Respaldo de Cotizaciones)
Almacena los intentos de encargo de aplicaciones antes y durante el envío del correo electrónico al dueño de AppSync.

| Columna | Tipo de Dato (PgSQL) | Restricciones | Descripción |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | Identificador único del lead / cotización. |
| `client_name` | `VARCHAR(100)` | `NOT NULL` | Nombre completo del potencial cliente o empresa. |
| `client_email`| `VARCHAR(150)` | `NOT NULL` | Correo electrónico de contacto del solicitante. |
| `target_platform`| `VARCHAR(50)` | `NOT NULL` | Tipo de plataforma deseada (Ej: "Móvil iOS/Android", "Web App", "Escritorio"). |
| `budget_range`| `VARCHAR(50)` | `NOT NULL` | Rango presupuestal seleccionado en el formulario de contacto. |
| `project_details`| `TEXT` | `NOT NULL` | Descripción técnica y funcional de la idea del software. |
| `email_sent` | `BOOLEAN` | `NOT NULL`, `DEFAULT FALSE` | `true` si la API de correo disparó la notificación exitosamente al creador. |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | `NOT NULL`, `DEFAULT NOW()` | Fecha y hora del registro del lead en el sistema. |

---

## 4. Orden Secuencial de Construcción de Interfaces (UI Roadmap)

Para mantener un flujo de desarrollo ágil y sin bloqueos (metodología *Bottom-Up / Component-Driven*), construiremos las interfaces exactamente en el siguiente orden:

### Fase 1: Los Cimientos Visuales (Atomic Components & Layout)
1. **Configuración de Tema (`ThemeToggle.jsx` & `ThemeProvider`):** Implementar el interruptor flotante (Sol/Luna) que intercala la clase `.dark` en la etiqueta raíz `<html>` y gestiona la persistencia local.
2. **Componentes Atómicos Soft UI:**
   * `<SoftButton />` (Botones con efecto de elevación y presionado Neumórfico).
   * `<SoftInput />`, `<SoftTextarea />` y `<SoftSelect />` (Cajas de formulario hundidas con sombra interna `inset`).
3. **Contenedores Glassmorphism:**
   * `<GlassCard />` (Contenedor base con desenfoque, borde translúcido y fondo dinámico por tema).
   * `<Badge />` (Píldoras semitransparentes para categorías, plataformas y etiquetas técnicas).
4. **Layout Base:** `<Navbar />` (con logo AppSync, buscador en tiempo real y selector de tema) y `<Footer />`.

### Fase 2: Vista Principal y Catálogo (Storefront Experience)
5. **Hero Section:** Banner superior con el eslogan principal, métricas del ecosistema (Ej: "10+ Apps Publicadas", "100% Código Seguro") y botón de salto al catálogo.
6. **Barra de Filtrado por Categorías:** Píldoras horizontales interactivas que filtran dinámicamente el estado en React.
7. **Grilla de Aplicaciones (`<AppGrid />` & `<AppCard />`):** Renderizado dinámico leyendo el arreglo exportado en `appsData.js`. Animación de elevación con `framer-motion` al posicionar el cursor.

### Fase 3: Detalle de la Aplicación y Conversión
8. **Vista Detalle (`/app/:id`):**
   * Panel de Especificaciones Técnicas (Peso en MB, Versión actual, OS compatibles, Fecha de lanzamiento).
   * Carrusel de Screenshots (con scroll horizontal fluido, soporte táctil o visor modal a pantalla completa).
   * Descripción completa formateada en tipografía limpia y párrafos espaciados.
9. **Modal de Términos y Condiciones (`<LegalModal />`):**
   * Componente flotante en Glassmorphism absoluto con z-index superior (`z-50`) sobre fondo oscurecido (`backdrop-blur-sm`).
   * Sistema de validación de checkbox obligatorio que desbloquea el botón de descarga real del archivo `.apk` o instalador.
10. **Sección "Más Apps de AppSync":** Renderizado del componente `<AppGrid />` reutilizado en la zona inferior, pasando una prop para excluir el ID actual y limitar la visualización a 3 o 4 tarjetas recomendadas.

### Fase 4: Interactividad Backend y Comunidad
11. **Sección de Comentarios (`<CommentsSection />`):**
    * Componente que realiza un `fetch` (`GET /api/comments/:appId`) al backend de Express al montarse en pantalla.
    * Formulario minimalista con selector de estrellas y envío de nuevo feedback (`POST /api/comments`).
12. **Portal de Encargos ("Crea tu App Personalizada"):**
    * Formulario completo en Soft UI en una sección destacada del Home o página de contacto.
    * Estado de carga (Spinner) y tarjeta de agradecimiento animada en Glassmorphism tras el éxito del envío del email.

---

## 5. Buenas Prácticas de Ingeniería Frontend para AppSync

* **Evitar "Prop Drilling":** Utilizar React Context para compartir el estado de búsqueda global y el tema (claro/oscuro) sin pasar propiedades manualmente por múltiples niveles de componentes.
* **Optimización de Imágenes:** Todas las capturas de pantalla de las aplicaciones en el archivo estático deben exportarse en formatos web modernos (`.webp` o `.avif`) y con dimensiones estandarizadas para evitar el molesto "Layout Shift" (salto de pantalla al cargar).
* **Manejo de Errores Asíncronos:** En las secciones de comentarios y en el formulario de cotización de apps personalizadas, implementar siempre los 3 estados visuales de la interfaz: *Loading* (cargando), *Success* (éxito) y *Error* (fallo de red o validación), acompañados de notificaciones ligeras tipo "Toast".