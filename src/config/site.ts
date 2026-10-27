// Configuración del sitio
export const SITE_CONFIG = {
    name: 'Balambam Boo Fest 2026',
    description: 'Edición Halloween — 31 de octubre en Terraza Summerland (Toledo)',

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

export function buildSiteUrl(path: string): string {
    const isProduction = import.meta.env.PROD;
    const base = isProduction ? 'https://balambamboofest.com' : '';

    if (path === '/') {
        return base ? `${base}/` : '/';
    }

    return base ? `${base}${path}` : path;
}
