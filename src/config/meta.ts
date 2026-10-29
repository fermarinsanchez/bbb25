// Configuración de meta tags para cada página
export const META_CONFIG = {
    home: {
        title: 'Balambam Boo Fest — Aplazado',
        description: 'El Balambam Boo Fest del 31 de octubre queda aplazado. Anunciaremos la nueva fecha en cuanto la tengamos cerrada. Las entradas anticipadas seguirán siendo válidas.',
        image: '/cartel-bbf-aplazado.png'
    },
    lineup: {
        title: 'Lineup Balambam Boo Fest 2026',
        description: 'Museo de Cera, Plastic Meat, Femur, Children in Heat, Bule y DJs Head and Banger & Alfonso Monasterio.',
        image: '/cartel-bbf-aplazado.png'
    },
    tickets: {
        title: 'Entradas Balambam Boo Fest 2026',
        description: 'Festival aplazado. Las entradas anticipadas seguirán siendo válidas para la nueva fecha.',
        image: '/cartel-bbf-aplazado.png'
    },
    social: {
        title: 'Info Balambam Boo Fest 2026',
        description: 'El Balambam Boo Fest queda aplazado. Sigue nuestras redes para conocer la nueva fecha.',
        image: '/cartel-bbf-aplazado.png'
    },
    cookies: {
        title: 'Configuración de Cookies - Balambam Boo Fest 2026',
        description: 'Gestiona tus preferencias de cookies en el Balambam Boo Fest 2026.',
        image: '/cartel-bbf-aplazado.png'
    },
    politicaCookies: {
        title: 'Política de Cookies - Balambam Boo Fest 2026',
        description: 'Política de cookies del Balambam Boo Fest 2026.',
        image: '/cartel-bbf-aplazado.png'
    },
    politicaPrivacidad: {
        title: 'Política de Privacidad - Balambam Boo Fest 2026',
        description: 'Política de privacidad del Balambam Boo Fest 2026.',
        image: '/cartel-bbf-aplazado.png'
    }
} as const;

export function getMetaConfig(page: keyof typeof META_CONFIG) {
    return META_CONFIG[page];
}
