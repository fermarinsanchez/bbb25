# Balambam Boo Fest 2025 - Sitio Web

Sitio web oficial del festival Balambam Boo Fest 2025, construido con Astro y React.

## 🌐 Dominio

El sitio está configurado para funcionar con el dominio personalizado: **balambamboofest.com**

## 🚀 Tecnologías

- **Astro** - Framework de construcción de sitios estáticos
- **React** - Biblioteca de UI para componentes interactivos
- **TypeScript** - Tipado estático para JavaScript
- **CSS Modules** - Estilos modulares y encapsulados

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React reutilizables
├── pages/              # Páginas del sitio (routing automático)
├── layouts/            # Layouts de página
├── assets/             # Imágenes, iconos y recursos estáticos
├── data/               # Datos del festival (lineup, FAQs)
├── config/             # Configuración del sitio
├── hooks/              # Hooks personalizados de React
├── styles/             # Estilos globales
└── utils/              # Utilidades y helpers
```

## 🎵 Funcionalidades

- **Página de inicio** con información del festival
- **Lineup** con todas las bandas participantes
- **Páginas individuales** para cada banda
- **Sistema de tickets** con diferentes opciones
- **Información del festival** (ubicación, transporte, etc.)
- **Políticas de privacidad y cookies**
- **Diseño responsive** para todos los dispositivos

## 🛠️ Desarrollo

### Instalación

```bash
npm install
```

### Desarrollo local

```bash
npm run dev
```

### Build de producción

```bash
npm run build
```

### Preview del build

```bash
npm run preview
```

## 🌍 Configuración de Rutas

El sitio está configurado para funcionar con rutas absolutas en producción:

- **Desarrollo**: Rutas relativas (ej: `/lineup`)
- **Producción**: URLs completas (ej: `https://balambamboofest.com/lineup`)

### Configuración de Dominio

- **Astro config**: `site: 'https://balambamboofest.com'`
- **Sin base path**: Las rutas funcionan directamente desde el dominio raíz
- **Función `buildSiteUrl`**: Construye URLs correctas según el entorno

## 📱 Componentes Principales

- **TopHeader** - Navegación superior con menú
- **BottomMenu** - Menú de navegación inferior
- **BandHeader** - Cabecera de páginas de bandas
- **LineupItems** - Lista de bandas del festival
- **TicketCard** - Tarjetas de compra de entradas
- **CookieConsent** - Gestión de consentimiento de cookies

## 🎨 Estilos

- **Sistema de diseño** consistente con la identidad del festival
- **Paleta de colores** personalizada
- **Tipografía** optimizada para legibilidad
- **Componentes** con estados hover y transiciones suaves

## 📊 Datos del Festival

Los datos del festival se almacenan en archivos JSON:

- **`lineupData.json`** - Información de todas las bandas
- **`faqs.json`** - Preguntas frecuentes

## 🔧 Configuración de Cookies

El sitio incluye un sistema completo de gestión de cookies con:

- **Consentimiento** configurable por categorías
- **Política de cookies** detallada
- **Configuración** personalizable por el usuario

## 🚀 Despliegue

El sitio está configurado para desplegarse en GitHub Pages con dominio personalizado:

1. **Build** del proyecto: `npm run build`
2. **Despliegue** automático en GitHub Pages
3. **Dominio personalizado**: `balambamboofest.com`

## 📝 Licencia

Este proyecto es privado y pertenece al festival Balambam Boo Fest 2025.

---

**Desarrollado con ❤️ para el mejor festival del universo**
