# Componente de Consentimiento de Cookies

Este componente implementa un sistema completo de gestión de cookies que cumple con la normativa española (LSSI-CE y RGPD) y europea.

## Características

### ✅ Cumplimiento Normativo

- **Consentimiento explícito** antes de instalar cookies no esenciales
- **Información clara** sobre tipos de cookies y su propósito
- **Consentimiento granular** por categorías
- **Posibilidad de rechazar** cookies no esenciales
- **Fácil retirada** del consentimiento
- **Almacenamiento seguro** de preferencias

### 🎯 Funcionalidades

- Banner emergente desde la parte inferior
- Configuración detallada por categorías
- Página dedicada para gestión de preferencias
- Hook personalizado para gestión del estado
- Persistencia en localStorage
- Diseño responsive y accesible

## Componentes

### 1. CookieConsent

Banner principal que aparece cuando no hay consentimiento previo.

**Props:**

- `onAccept: (preferences: CookiePreferences) => void`
- `onReject: () => void`

### 2. CookieSettings

Página de configuración para gestionar preferencias existentes.

### 3. CookieConsentWrapper

Wrapper que integra el banner con la lógica de estado.

### 4. useCookieConsent

Hook personalizado para gestionar el estado de cookies.

### 5. CookieDebugPanel

Panel de debug para desarrollo (oculto por defecto, accesible desde consola).

## Categorías de Cookies

### 🚨 Necesarias (Siempre activas)

- Funcionamiento básico del sitio
- Navegación y seguridad
- No se pueden desactivar

### 📊 Análisis

- Google Analytics
- Métricas de uso
- Mejora de experiencia

### 🎯 Marketing

- Facebook Pixel
- Google Ads
- Publicidad personalizada

### ⚙️ Preferencias

- Idioma y región
- Configuraciones de usuario
- Personalización

## Instalación y Uso

### 1. Integrar en el Layout Principal

```astro
---
import Layout from '../layouts/Layout.astro';
import CookieConsentWrapper from '../components/CookieConsent/CookieConsentWrapper';
---

<Layout title="Mi Sitio">
  <main>
    <!-- Contenido principal -->
  </main>

  <CookieConsentWrapper client:load />
</Layout>
```

### 2. Usar el Hook en Componentes

```tsx
import { useCookieConsent } from "../hooks/use-cookie-consent"

const MiComponente = () => {
 const { preferences, hasConsent, updatePreferences } = useCookieConsent()

 // Verificar si se pueden usar cookies de analytics
 if (preferences?.analytics) {
  // Activar Google Analytics
 }

 return <div>...</div>
}
```

### 3. Página de Configuración

```astro
---
import Layout from '../layouts/Layout.astro';
import CookieSettings from '../components/CookieConsent/CookieSettings';
---

<Layout title="Configuración de Cookies">
  <CookieSettings client:load />
</Layout>
```

## Implementación de Cookies de Terceros

### Google Analytics

```tsx
// En el hook useCookieConsent
const applyCookiePreferences = (prefs: CookiePreferences) => {
 if (prefs.analytics) {
  // Activar Google Analytics
  window.gtag("consent", "update", {
   analytics_storage: "granted",
  })
 } else {
  // Desactivar Google Analytics
  window.gtag("consent", "update", {
   analytics_storage: "denied",
  })
 }
}
```

### Facebook Pixel

```tsx
if (prefs.marketing) {
 // Activar Facebook Pixel
 window.fbq("consent", "grant")
} else {
 // Desactivar Facebook Pixel
 window.fbq("consent", "revoke")
}
```

## Cumplimiento Legal

### ✅ Requisitos Cumplidos

1. **Consentimiento Explícito**

   - No se instalan cookies no esenciales sin consentimiento
   - Checkboxes individuales por categoría

2. **Información Clara**

   - Descripción detallada de cada tipo de cookie
   - Propósito y duración de almacenamiento
   - Información sobre terceros

3. **Control del Usuario**

   - Posibilidad de rechazar cookies no esenciales
   - Cambio de preferencias en cualquier momento
   - Retirada del consentimiento

4. **Almacenamiento Seguro**
   - Preferencias guardadas en localStorage
   - No se comparten datos con terceros sin consentimiento

### 📋 Política de Cookies Requerida

Crear una página `/politica-cookies` que incluya:

- Tipos de cookies utilizadas
- Propósito de cada categoría
- Duración de almacenamiento
- Información sobre terceros
- Derechos del usuario
- Contacto para ejercer derechos

## Personalización

### Colores y Estilos

Los colores principales se pueden modificar en los archivos CSS:

```css
:root {
 --primary-color: #73c2af;
 --secondary-color: #5ba8a0;
 --text-color: #2c5f5a;
}
```

### Textos

Todos los textos están en español y se pueden personalizar en los componentes:

```tsx
const texts = {
 title: "Configuración de Cookies",
 description: "Descripción personalizada...",
 // ...
}
```

## Testing

### Verificar Funcionamiento

1. **Primera visita**: Banner debe aparecer
2. **Aceptar cookies**: Banner debe desaparecer
3. **Rechazar cookies**: Solo cookies necesarias activas
4. **Cambiar preferencias**: Página de configuración
5. **Persistencia**: Preferencias se mantienen entre sesiones

### Herramientas de Desarrollo

- **DevTools > Application > Local Storage**: Ver preferencias guardadas
- **DevTools > Application > Cookies**: Ver cookies instaladas
- **Console**: Logs de activación/desactivación

### Panel de Debug (Solo Desarrollo)

El panel de debug está **oculto por defecto** y se puede controlar desde la consola del navegador:

#### Funciones Disponibles en `window`:

```javascript
// Mostrar/ocultar el panel
window.toggleCookieDebug()

// Mostrar el panel
window.showCookieDebug()

// Ocultar el panel
window.hideCookieDebug()

// Ver estado completo de cookies
window.getCookieState()
```

#### Uso desde Consola:

```javascript
// Activar debug
window.showCookieDebug()

// Ver estado de cookies
window.getCookieState()

// Desactivar debug
window.hideCookieDebug()
```

#### Funciones de Testing:

```javascript
// Importar utilidades de debug
import("/src/utils/cookie-debug.js").then((m) => {
 // Limpiar todos los datos
 m.clearAllCookieData()

 // Simular diferentes escenarios
 m.simulateCookieConsent("accept-all")
 m.simulateCookieConsent("reject")
 m.simulateCookieConsent("partial")

 // Ver información de debug
 m.logCookieDebugInfo()
})
```

## Soporte y Mantenimiento

### Actualizaciones Normativas

- Revisar cambios en LSSI-CE y RGPD
- Actualizar categorías de cookies según necesidad
- Mantener textos legales actualizados

### Monitoreo

- Verificar consentimientos por categoría
- Analizar tasas de aceptación/rechazo
- Revisar cumplimiento legal periódicamente

## Recursos Adicionales

- [AEPD - Guía sobre el uso de cookies](https://www.aepd.es/es/prensa-y-comunicacion/blog/guia-uso-cookies)
- [RGPD - Reglamento General de Protección de Datos](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX%3A32016R0679)
- [LSSI-CE - Ley de Servicios de la Sociedad de la Información](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758)

## 🚀 Quick Start - Debug

### Activar Debug desde Consola:

```javascript
// Mostrar panel de debug
window.showCookieDebug()

// Ver estado de cookies
window.getCookieState()

// Ocultar panel
window.hideCookieDebug()
```

### Testing Rápido:

```javascript
// Limpiar datos y forzar banner
import("/src/utils/cookie-debug.js").then((m) => {
 m.clearAllCookieData()
 location.reload()
})
```
