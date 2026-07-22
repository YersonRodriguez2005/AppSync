# Documentación de Especificaciones Técnicas y Funcionales (Specs)
**Proyecto:** AppSync — Personal App Store
**Versión:** 1.0.0
**Autor / Dueño:** Yerson Fabian Garzon Rodriguez
**Metodología:** Desarrollo Estructurado / Arquitectura Híbrida

---

## 1. Visión General del Proyecto

**AppSync** es una plataforma web moderna y profesional diseñada para funcionar como una tienda de aplicaciones (App Store) personal y centralizada. El propietario actuará como el único distribuidor y creador de las aplicaciones publicadas, permitiendo al público general explorar, consultar especificaciones técnicas y descargar directamente el software en un entorno seguro y altamente estético.

### 1.1 Objetivos Principales
* **Exhibición y Distribución:** Proveer una interfaz optimizada para mostrar el catálogo de aplicaciones propias con detalles profundos (peso, versión, plataforma, capturas, descripción).
* **Confianza y Confort Visual:** Utilizar diseño contemporáneo que reduzca la fatiga visual y transmita máxima seguridad y profesionalismo al usuario general.
* **Interactividad y Comunidad:** Permitir el feedback de los usuarios a través de un sistema de comentarios dinámico por aplicación.
* **Captación de Clientes (Lead Generation):** Ofrecer una vía directa de cotización para usuarios o empresas que deseen encargar el desarrollo de una aplicación personalizada.
* **Protección Legal:** Asegurar que cada descarga esté condicionada al consentimiento explícito de Términos y Condiciones de uso y exención de responsabilidad.

---

## 2. Sistema de Diseño: Glassmorphism + Soft UI (Modern Clay Fusion)

La interfaz de **AppSync** se construirá bajo la fusión de dos corrientes de diseño modernas: **Glassmorphism** y **Soft UI (Neumorfismo Suave)**.

### 2.1 Principios Visuales
1. **Fondo Soft UI y Colores Pastel:**
   * **Paleta de Colores:** Uso de tonos pastel desaturados (ej. gris azulado muy claro `#F0F4F8`, lavanda suave, menta y blanco cálido) con espaciados amplios (`padding` y `margin` generosos) para una lectura relajada.
   * **Sombras Sutiles (Soft UI):** Elevación natural utilizando sombras duales (una sombra oscura dispersa y una iluminación blanca opuesta) sobre esquinas ultra redondeadas (`border-radius: 24px` a `32px`). Esto genera una sensación táctil de "flotación suave" y amigabilidad.
2. **Capas y Tarjetas en Glassmorphism:**
   * **Efecto de Vidrio Esmerilado:** Contenedores con fondo semitransparente (`background: rgba(255, 255, 255, 0.45)`), desenfoque de fondo (`backdrop-blur-lg` / `blur(16px)`) y bordes claros translúcidos (`border: 1px solid rgba(255, 255, 255, 0.6)`).
   * **Jerarquía de Profundidad:** El contenido principal flotas sobre el fondo pastel, estableciendo una jerarquía clara sin recurrir a contrastes agresivos o colores saturados que cansen la vista.

---

## 3. Arquitectura Híbrida del Sistema

Para garantizar la máxima velocidad de carga, SEO óptimo, simplicidad de mantenimiento y bajo costo operativo, **AppSync** utiliza una **Arquitectura Híbrida**: divide la carga de datos estáticos de lectura intensiva y las operaciones dinámicas de escritura.

```
+-----------------------------------------------------------------------------------+
|                                 FRONTEND (React)                                  |
|  +-----------------------------------------------------------------------------+  |
|  |             Catálogo de Apps (Lectura Instantánea - < 100ms)                |  |
|  |  [ Static Array: src/data/appsData.js ] ---> Tarjetas Glassmorphism & Vistas|  |
|  +-----------------------------------------------------------------------------+  |
|         | (Solicitud de Comentarios)          | (Envío Formulario App Custom)     |
+---------|-------------------------------------|-----------------------------------+
          v                                     v
+-----------------------------------+   +-------------------------------------------+
|          BACKEND API              |   |          SERVICIO DE EMAIL                |
|     (Node.js + Express)           |   |       (Resend / Nodemailer API)           |
|                                   |   |                                           |
|  +-----------------------------+  |   |  +-------------------------------------+  |
|  | Base de Datos PostgreSQL    |  |   |  | Envío de correo en tiempo real a la |  |
|  | Tabla: `comments`           |  |   |  | bandeja personal del creador.       |  |
|  | (id, app_id, user, text, t) |  |   |  +-------------------------------------+  |
|  +-----------------------------+  |   +-------------------------------------------+
+-----------------------------------+
```

### 3.1 Catálogo Estático (Frontend)
* **Fuente de Datos:** Arreglo local exportado desde `src/data/appsData.js`.
* **Ventajas:** Carga instantánea (cero latencia de base de datos), inmutabilidad controlada por control de versiones (Git), sin puntos de fallo del servidor al navegar por el catálogo.

### 3.2 Backend Dinámico (Node.js + Express + PostgreSQL)
* **Gestión de Comentarios:** Las aplicaciones no almacenan sus comentarios en el archivo estático. El frontend realiza peticiones HTTP (`GET /api/comments/:appId` y `POST /api/comments`) hacia una API REST en Express respaldada por una base de datos PostgreSQL.
* **Relación de Datos:** La columna `app_id` en la tabla de comentarios actúa como llave foránea lógica que referencia el `id` estático del arreglo de aplicaciones.

### 3.3 Módulo de Notificaciones por Correo (Apps Personalizadas)
* **Flujo:** Cuando un usuario desea encargar el desarrollo de una app a medida, completa un formulario en la sección específica de la página.
* **Procesamiento:** La API Node/Express intercepta la petición y utiliza un servicio transaccional (Resend o Nodemailer con Gmail/SMTP) para enviar la propuesta directamente al correo personal del dueño, sin saturar la base de datos con cotizaciones temporales.

---

## 4. Especificación de Estructura de Datos (`appsData.js`)

El esquema del catálogo debe seguir una estructura estandarizada y estricta en formato JSON/JavaScript Object:

```javascript
// Estructura modelo para src/data/appsData.js
export const APPS_CATALOG = [
  {
    id: "fintrack-pro",                  // Identificador único y slug de URL (enlaza con BD para comentarios)
    title: "FinTrack Pro",               // Nombre de la aplicación
    tagline: "Inteligencia financiera y ahorro de bolsillo", // Frase de gancho comercial
    category: "Finanzas & Productividad",// Categoría principal de filtrado
    version: "2.4.0",                    // Versión actual de despliegue
    size: "28.4 MB",                     // Peso del archivo de instalación
    platform: "Android / Windows",       // Sistemas operativos compatibles
    releaseDate: "2026-05-10",           // Fecha de última actualización
    description: `FinTrack Pro es una solución integral para el monitoreo de gastos...`, // Descripción detallada
    iconUrl: "/assets/icons/fintrack.png", // Icono en alta resolución (Glass card thumbnail)
    screenshots: [                       // Galería de imágenes y demostraciones visuales
      "/assets/screenshots/fintrack-1.png",
      "/assets/screenshots/fintrack-2.png",
      "/assets/screenshots/fintrack-3.png"
    ],
    downloadUrl: "/downloads/fintrack-pro-v2.4.0.apk", // Enlace al binario / instalador
    legalTerms: `TÉRMINOS Y CONDICIONES DE USO DE FINTRACK PRO...
    1. Exención de Responsabilidad Financiera: El software proporciona cálculos de referencia...
    2. Privacidad de Datos: Toda la información financiera se almacena localmente...` // Texto legal para el Modal
  }
];
```

---

## 5. Especificaciones de Vistas y Flujos de Usuario (UX)

### 5.1 Vista Principal: Tienda (Home / Storefront)
* **Header / Hero Section:** Título de bienvenida de **AppSync**, barra de búsqueda con efecto vidrio y filtros de categoría flotantes (Soft UI pills).
* **Grilla de Aplicaciones:** Disposición en tarjetas Responsive (3 columnas en escritorio, 1-2 en móvil). Cada tarjeta muestra el icono, título, categoría, peso y un botón de acción rápida *"Ver Detalles"*.

### 5.2 Vista de Detalle de Aplicación
* **Header Técnico:** Muestra el ícono, título, versión, peso y sistema operativo en un contenedor Glassmorphism destacado.
* **Galería Horizontal:** Carrusel con transiciones fluidas para explorar las capturas de pantalla de la app.
* **Descripción y Especificaciones:** Bloques de texto con tipografía limpia y espaciada.
* **Sección de Comentarios (Dinámica):**
  * Carga asíncrona desde PostgreSQL.
  * Formulario minimalista para añadir un comentario (Nombre/Nickname y Mensaje).
* **Sección "Más Apps de AppSync":**
  * Carrusel inferior que renderiza otras aplicaciones del arreglo `APPS_CATALOG` (filtrando y excluyendo el `id` de la app actual).

### 5.3 Flujo de Descarga y Protección Legal (Modal de T&C)
1. El usuario hace clic en el botón principal **"Descargar App"** en la página de detalle.
2. **Intercepción:** Se bloquea la descarga inmediata y se despliega un Modal Glassmorphism sobre un fondo oscurecido y desenfocado (`backdrop-blur-sm`).
3. **Contenido del Modal:**
   * Título: *"Términos, Condiciones y Exención de Responsabilidad"*.
   * Caja de texto scrollable conteniendo el valor del campo `legalTerms` de la app.
   * Checkbox de aceptación obligatoria: *☑ "He leído, comprendo y acepto los términos de uso, licencias y exención de responsabilidad para instalar este software"*.
4. **Acción Final:** El botón **"Confirmar y Descargar"** permanece deshabilitado (`disabled`) con estilo opaco hasta que el usuario activa el checkbox. Al confirmar, se inicia la descarga del archivo y el modal se cierra con una animación suave.

### 5.4 Portal de Creación de Apps Personalizadas
* **Ubicación:** Banner destacado en el Home y enlace en la navegación superior/inferior (*"¿Tienes una idea? Crea tu App Personalizada"*).
* **Formulario Soft UI:**
  * Campos: *Nombre completo, Correo electrónico, Tipo de App (Móvil, Web, Escritorio), Presupuesto estimado, Descripción detallada de la idea o requerimiento*.
* **Comportamiento:** Al enviar, el frontend muestra un estado de carga y posteriormente una tarjeta de éxito (*"Tu propuesta ha sido enviada al creador. Te contactaremos pronto"*), disparando la orden al backend para el envío del correo de notificación.

---

## 6. Roadmap y Módulos de Bootcamp para Construcción Paso a Paso

Para desarrollar **AppSync** desde cero hasta un nivel profesional de producción, seguiremos una metodología modular:

* **Módulo 1: Fundamentos Visuales y Sistema de Diseño (Tailwind CSS)**
  * Configuración del proyecto (Vite + React o Next.js).
  * Creación de clases utilitarias personalizadas para Glassmorphism (`.glass-card`, `.glass-modal`) y Soft UI (`.soft-button`, `.soft-input`).
  * Diseño del layout principal (Navbar y Footer).

* **Módulo 2: Modelado de Datos y Vista de Catálogo (Frontend Core)**
  * Creación y estructuración del archivo estático `src/data/appsData.js`.
  * Desarrollo del componente de tarjeta de aplicación y la grilla con filtrado por categorías en el Home.
  * Implementación del enrutamiento dinámico (`/app/:id`) para la página de detalle.

* **Módulo 3: Experiencia Legal y Componentes Avanzados (UX & Legal)**
  * Construcción del carrusel de capturas de pantalla y la sección *"Más apps publicadas por mí"*.
  * Creación del **Modal de Términos y Condiciones** con validación de estado (`useState`) para habilitar la descarga segura.

* **Módulo 4: Backend API, Base de Datos y Comunicación Correo (Fullstack Integration)**
  * Configuración del servidor Node.js + Express y conexión a PostgreSQL.
  * Diseño y migración de la tabla de comentarios; endpoints CRUD de comentarios (`GET` / `POST`).
  * Implementación del controlador de correo web usando Resend / Nodemailer para el formulario de *"Crear App Personalizada"*.
  * Conexión final Frontend-Backend y pruebas de integración.
