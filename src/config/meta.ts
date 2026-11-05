// Configuración de meta tags para cada página
export const META_CONFIG = {
    home: {
        title: 'Balambam Boo Fest 2026 — Edición Halloween',
        description: 'Sábado 21 de noviembre de 2026 en Terraza Summerland (Toledo). Un día de rock, brujas y vinilos. Entrada anticipada 10€ · Menores de 16 gratis.',
        image: '/cartel-bbf26.jpg'
    },
    lineup: {
        title: 'Lineup Balambam Boo Fest 2026',
        description: 'Bule, Mallo, Children in Heat, VHS y DJs Head and Banger & Alfonso Monasterio.',
        image: '/cartel-bbf26.jpg'
    },
    tickets: {
        title: 'Entradas Balambam Boo Fest 2026',
        description: '10€ anticipada · 12€ en taquilla. Menores de 16 años gratis. Sábado 21 de noviembre en Terraza Summerland (Toledo).',
        image: '/cartel-bbf26.jpg'
    },
    social: {
        title: 'Info Balambam Boo Fest 2026',
        description: 'Toda la información de la edición Halloween: horarios, ubicación y redes del Balambam Boo Fest 2026.',
        image: '/cartel-bbf26.jpg'
    },
    cookies: {
        title: 'Configuración de Cookies - Balambam Boo Fest 2026',
        description: 'Gestiona tus preferencias de cookies en el Balambam Boo Fest 2026.',
        image: '/cartel-bbf26.jpg'
    },
    politicaCookies: {
        title: 'Política de Cookies - Balambam Boo Fest 2026',
        description: 'Política de cookies del Balambam Boo Fest 2026.',
        image: '/cartel-bbf26.jpg'
    },
    politicaPrivacidad: {
        title: 'Política de Privacidad - Balambam Boo Fest 2026',
        description: 'Política de privacidad del Balambam Boo Fest 2026.',
        image: '/cartel-bbf26.jpg'
    }
} as const;

export function getMetaConfig(page: keyof typeof META_CONFIG) {
    return META_CONFIG[page];
}
