// Configuración del sitio
export const SITE_CONFIG = {
    // Base path para GitHub Pages
    GITHUB_PAGES_BASE: '/bbb25',

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

// Función para construir URLs con el base path correcto
export function buildSiteUrl(path: string): string {
    // En desarrollo, usar rutas relativas
    // En producción (GitHub Pages), usar el base path
    const isProduction = import.meta.env.PROD;
    const base = isProduction ? SITE_CONFIG.GITHUB_PAGES_BASE : '';

    if (path === '/') {
        return base ? `${base}/` : '/';
    }

    return base ? `${base}${path}` : path;
} 