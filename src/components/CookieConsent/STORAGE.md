# Sistema de Almacenamiento de Cookies

## 📱 localStorage

El sistema de cookies utiliza `localStorage` para persistir las preferencias del usuario entre sesiones.

### Claves Utilizadas

- **`cookie-consent`**: Almacena el consentimiento general del usuario
- **`cookie-preferences`**: Almacena las preferencias específicas por categoría

### Estructura de Datos

```json
{
 "necessary": true,
 "analytics": false,
 "marketing": false,
 "preferences": false
}
```

## 🔄 Flujo de Guardado

### 1. Banner de Cookies

- **Primera visita**: No hay datos → Banner aparece
- **Usuario acepta**: Se guarda en localStorage → Banner desaparece
- **Usuario rechaza**: Se guarda solo cookies necesarias → Banner desaparece

### 2. Cambios de Preferencias

- **Página de configuración**: Usuario modifica preferencias
- **Al guardar**: Se actualiza localStorage inmediatamente
- **Persistencia**: Cambios se mantienen entre sesiones

### 3. Reset de Consentimiento

- **Usuario solicita reset**: Se limpia localStorage
- **Banner reaparece**: En la siguiente visita

## 💾 Funciones de Guardado

### `savePreferences(newPreferences)`

```typescript
// Guarda nuevas preferencias en localStorage
localStorage.setItem("cookie-preferences", JSON.stringify(newPreferences))
localStorage.setItem("cookie-consent", JSON.stringify(newPreferences))
```

### `updatePreferences(partialPreferences)`

```typescript
// Actualiza solo algunas preferencias
const updated = { ...current, ...partial }
savePreferences(updated)
```

### `resetConsent()`

```typescript
// Limpia localStorage
localStorage.removeItem("cookie-preferences")
localStorage.removeItem("cookie-consent")
```

## 🔍 Verificación de Datos

### Validación Automática

- ✅ Estructura correcta de datos
- ✅ Consistencia entre `cookie-consent` y `cookie-preferences`
- ✅ Campo `necessary` siempre en `true`
- ✅ Todos los campos requeridos presentes

### Debug y Testing

#### Panel de Debug (Consola)

```javascript
// Activar panel de debug
window.showCookieDebug()

// Ver estado de cookies
window.getCookieState()

// Ocultar panel
window.hideCookieDebug()
```

#### Utilidades de Debug

```typescript
import { logCookieDebugInfo, validateCookieData } from "../utils/cookie-debug"

// Ver información completa
logCookieDebugInfo()

// Validar integridad
const validation = validateCookieData()
console.log("Validation:", validation)
```

## 🚨 Manejo de Errores

### Errores de localStorage

- **localStorage no disponible**: Fallback a estado en memoria
- **Error de parsing**: Limpia datos corruptos
- **Error de escritura**: Log del error y fallback

### Recuperación Automática

```typescript
try {
 localStorage.setItem("key", "value")
} catch (error) {
 console.error("localStorage error:", error)
 // Fallback a estado en memoria
}
```

## 📊 Logs de Debug

### En Desarrollo

- ✅ Preferencias guardadas
- 🔄 Preferencias actualizadas
- 🧹 Consentimiento reseteado
- 🔧 Preferencias aplicadas

### Ejemplo de Log

```
✅ Cookie preferences saved to localStorage: {necessary: true, analytics: false, ...}
📱 localStorage cookie-consent: {"necessary":true,"analytics":false,...}
🔧 Applying cookie preferences: {necessary: true, analytics: false, ...}
✅ Analytics cookies disabled
❌ Marketing cookies disabled
🎯 Cookie preferences applied successfully
```

## 🧪 Testing

### Simulación de Estados

```typescript
import { simulateCookieConsent } from "../utils/cookie-debug"

// Simular diferentes escenarios
simulateCookieConsent("accept-all") // Aceptar todas
simulateCookieConsent("accept-selected") // Aceptar seleccionadas
simulateCookieConsent("reject") // Rechazar todas
simulateCookieConsent("partial") // Aceptar parcialmente
```

### Limpieza de Datos

```typescript
import { clearAllCookieData } from "../utils/cookie-debug"

// Limpiar todos los datos para testing
clearAllCookieData()
```

## 🔒 Seguridad

### Datos Sensibles

- ❌ **NO** se almacenan datos personales
- ❌ **NO** se almacenan tokens de autenticación
- ✅ Solo preferencias de consentimiento

### Persistencia

- **Duración**: Hasta que el usuario limpie datos del navegador
- **Alcance**: Solo el dominio actual
- **Acceso**: Solo JavaScript del mismo dominio

## 📱 Compatibilidad

### Navegadores Soportados

- ✅ Chrome 4+
- ✅ Firefox 3.5+
- ✅ Safari 4+
- ✅ Edge 12+
- ✅ IE 8+

### Fallback

```typescript
if (typeof localStorage !== "undefined") {
 // Usar localStorage
} else {
 // Fallback a estado en memoria
 console.warn("localStorage not available")
}
```

## 🚀 Optimizaciones

### Lazy Loading

- Utilidades de debug se cargan solo en desarrollo
- Importación dinámica para reducir bundle inicial

### Error Boundaries

- Captura de errores en componentes React
- Fallback graceful en caso de fallos

### Performance

- Debouncing en cambios de preferencias
- Actualización batch de estado
- Memoización de funciones críticas
