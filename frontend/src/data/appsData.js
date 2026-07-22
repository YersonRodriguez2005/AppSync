// src/data/appsData.js

export const APPS_CATALOG = [
  {
    id: "CampuSync",
    title: "CampuSync",
    tagline: "Aplicación móvil nativa y PWA para gestión académica. Incluye temporizador Pomodoro, notificaciones push (FCM y Web Push), gráficos de rendimiento y conexión a base de datos en la nube.",
    category: "Educación",
    version: "2.0.0",
    size: "21.7 MB",
    platform: "Android",
    iconUrl: "/assets/CampuSync-icon.png",
    legalTerms: `### 1. Aceptación y Licencia de Uso
Al descargar y utilizar **CampuSync**, aceptas los presentes Términos y Condiciones definidos por el ecosistema **AppSync**. Se otorga una licencia personal, intransferible y no exclusiva para el uso del software con fines de gestión y optimización académica.

### 2. Privacidad y Gestión de Datos Académicos
* **Almacenamiento en la Nube:** Los datos relativos a asignaturas, calificaciones, horarios y métodos de estudio se sincronizan con servidores seguros en la nube para garantizar su disponibilidad y persistencia.
* **Confidencialidad:** CampuSync no comparte, vende ni comercializa tu rendimiento académico ni información personal con terceros, instituciones educativas o entidades externas.

### 3. Notificaciones y Servicios Push
* El uso de recordatorios y alertas automáticas requiere la habilitación de servicios de mensajería (Firebase Cloud Messaging y Web Push). Puedes desactivar estos permisos en cualquier momento desde la configuración de tu dispositivo Android o navegador PWA.
* El temporizador Pomodoro y las alertas de evaluación funcionan como herramientas de apoyo; AppSync no se hace responsable por olvidos, pérdidas de entregas o fallos de conectividad derivados de la configuración del dispositivo del usuario.

### 4. Propiedad Intelectual
El código fuente, arquitectura, diseño de interfaz y activos visuales de CampuSync están protegidos por las leyes de propiedad intelectual. Queda terminantemente prohibida la ingeniería inversa, modificación o redistribución no autorizada del archivo APK.`,
    screenshots: [
      "/assets/campusync/dashboard.png",
      "/assets/campusync/calendar.png",
      "/assets/campusync/terms.png",
      "/assets/campusync/subjects.png",
      "/assets/campusync/evaluations.png",
      "/assets/campusync/study-methods.png",
      "/assets/campusync/login.png",
      "/assets/campusync/register.png",
      "/assets/campusync/reset-password.png",      
    ],
    downloadUrl: "https://pub-9ed7e687c3b94404acd5252833042478.r2.dev/CampuSync.apk",
  },
  {
    id: "BarberSync",
    title: "BarberSync",
    tagline: "Plataforma de gestión integral y agendamiento de citas para barberías y estilistas. Control de turnos en tiempo real, historial de clientes, administración de servicios y recordatorios automáticos.",
    category: "Negocios",
    version: "1.1.0",
    size: "6.14 MB",
    platform: "Android",
    iconUrl: "/assets/BarberSync-icon.png",
    legalTerms: `### 1. Relación Comercial y Licenciamiento (B2B/B2C)
**BarberSync** es una plataforma tecnológica diseñada para la administración comercial, control de turnos y agendamiento de citas para barberías y profesionales independientes. La instalación del software implica la sujeción a los estándares regulatorios de **AppSync**.

### 2. Tratamiento de Datos de Terceros (Clientes)
* **Responsabilidad del Profesional:** Como administrador o negocio, eres el responsable legal directo del tratamiento, resguardo y consentimiento en la recolección de los datos personales (nombres, teléfonos, historial de servicios) de tus clientes, conforme a las leyes locales de protección de datos (ej. Habeas Data / GDPR).
* **Rol de AppSync:** La plataforma actúa exclusivamente como procesador técnico y proveedor de infraestructura tecnológica, garantizando el cifrado en la transmisión y resguardo de la información del negocio en la nube.

### 3. Agendamiento, Turnos y Recordatorios
* El sistema de turnos en tiempo real y recordatorios automáticos depende de la disponibilidad del servidor y de los servicios de telecomunicaciones de terceros.
* AppSync no asume responsabilidad civil ni económica por cancelaciones de citas, inasistencias de clientes, fallas de sincronización o disputas financieras derivadas de la gestión de la agenda.

### 4. Restricciones de Uso
La licencia se otorga para la gestión interna del establecimiento o servicio profesional. Queda estrictamente prohibido el sublicenciamiento, reventa o alteración del código ejecutable del software.`,
    screenshots: [
      "/assets/barbersync/dashboard-cliente.png",
      "/assets/barbersync/agendar-cita.png",
      "/assets/barbersync/dashboard-peluquero.png",
      "/assets/barbersync/dashboard-peluquero-citas.png",
      "/assets/barbersync/configuracion-historial.png",
    ],
    downloadUrl: "https://pub-9ed7e687c3b94404acd5252833042478.r2.dev/BarberSync.apk",
  },
  {
    id: "HabitSync",
    title: "HabitSync",
    tagline: "Aplicación avanzada para la construcción de hábitos y seguimiento de rutinas diarias. Incorpora temporizador Pomodoro integrado, registro progresivo de logros, estadísticas visuales y alertas personalizadas.",
    category: "Productividad",
    version: "1.0.0",
    size: "15.4 MB",
    platform: "Android",
    iconUrl: "/assets/HabitSync-icon.png",
    legalTerms: `### 1. Licencia de Uso Personal
**HabitSync** es una herramienta digital de uso individual concebida para el seguimiento de rutinas, autogestión del tiempo y construcción progresiva de hábitos. Al utilizar este software del catálogo **AppSync**, aceptas los presentes términos de servicio.

### 2. Privacidad y Almacenamiento de Métricas
* **Datos de Productividad:** Toda la información referente a tus sesiones en el temporizador Pomodoro, registro de logros, rachas diarias y estadísticas visuales es procesada bajo principios de mínima recolección y máxima privacidad.
* **Propiedad de los Datos:** El historial de rutinas y métricas personales te pertenece en su totalidad. AppSync no extrae, analiza ni utiliza tu comportamiento o patrones de tiempo para la elaboración de perfiles publicitarios ni monitoreo invasivo.

### 3. Rendimiento en Segundo Plano y Alertas
* El funcionamiento preciso de las alertas personalizadas y del temporizador Pomodoro requiere que el usuario otorgue los permisos de ejecución en segundo plano y excluya la aplicación de las restricciones extremas de optimización de batería en el sistema operativo Android.
* El software se proporciona "tal cual" (as is), como un soporte técnico para la productividad, sin garantías implícitas o explícitas sobre resultados médicos, psicológicos, académicos o de rendimiento laboral.

### 4. Integridad del Software
Los activos gráficos (incluyendo el sistema de medallas y logros), código estructural y diseño visual son propiedad exclusiva de AppSync. Cualquier intento de descompilación, modificación del APK o distribución pirata conllevará la terminación inmediata de la licencia de uso.`,
    screenshots: [
      "/assets/habitsync/dashboard.png",
      "/assets/habitsync/modal-crear-tarea.png",
      "/assets/habitsync/pomodoro.png",
      "/assets/habitsync/logros.png",
      "/assets/habitsync/inicio-de-sesion.png",
      "/assets/habitsync/registro.png",
    ],
    downloadUrl: "https://pub-9ed7e687c3b94404acd5252833042478.r2.dev/HabitSync.apk",
  }
];

export const CATEGORIES = [
  "Todas",
  "Finanzas",
  "Diseño & AI",
  "Desarrollo",
  "Productividad",
];