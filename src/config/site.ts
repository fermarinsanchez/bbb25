// Configuración del sitio
export const SITE_CONFIG = {
    // Nombre del sitio
    name: 'Balambam Boo Fest 2025',
    description: 'Festival de música independiente',

    // URLs del sitio
    urls: {
        home: '/',
        lineup: '/lineup',
        tickets: '/tickets',
        social: '/social',
        cookies: '/cookies',
        politicaCookies: '/politica-cookies',
        politicaPrivacidad: '/politica-privacidad'
    }
} as const;

// Función para construir URLs con el dominio correcto
export function buildSiteUrl(path: string): string {
    // En desarrollo, usar rutas relativas
    // En producción, usar el dominio completo
    const isProduction = import.meta.env.PROD;
    const base = isProduction ? 'https://balambamboofest.com' : '';

    if (path === '/') {
        return base ? `${base}/` : '/';
    }

    return base ? `${base}${path}` : path;
} 