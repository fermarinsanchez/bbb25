// Configuración de meta tags para cada página
export const META_CONFIG = {
    home: {
        title: 'BBooFest 2025 - Festival de Música Independiente',
        description: '¡Vuelve el mejor festival para todas las edades del Universo! 26-27 de Octubre en Summer Land (Toledo). Conciertos, actividades y mucha diversión.',
        image: '/cartel-cuadrado-ok.jpg'
    },
    lineup: {
        title: 'Lineup BBooFest 2025 - Grupos y Bandas',
        description: 'Descubre el increíble lineup del BBooFest 2025. Las mejores bandas de música independiente en un festival inolvidable.',
        image: '/cartel-cuadrado-ok.jpg'
    },
    tickets: {
        title: 'Tickets BBooFest 2025 - Comprar Entradas',
        description: 'Consigue tus entradas para el BBooFest 2025. Festival de música independiente el 26-27 de Octubre en Summer Land (Toledo).',
        image: '/cartel-cuadrado-ok.jpg'
    },
    social: {
        title: 'Info BBooFest 2025 - Información del Festival',
        description: 'Toda la información del BBooFest 2025. Horarios, ubicación, actividades y mucho más sobre el mejor festival de música independiente.',
        image: '/cartel-cuadrado-ok.jpg'
    },
    cookies: {
        title: 'Configuración de Cookies - BBooFest 2025',
        description: 'Gestiona tus preferencias de cookies en el BBooFest 2025. Configura la privacidad de tu navegación.',
        image: '/cartel-cuadrado-ok.jpg'
    },
    politicaCookies: {
        title: 'Política de Cookies - BBooFest 2025',
        description: 'Política de cookies del BBooFest 2025. Información sobre el uso de cookies y tecnologías similares en nuestro sitio web.',
        image: '/cartel-cuadrado-ok.jpg'
    },
    politicaPrivacidad: {
        title: 'Política de Privacidad - BBooFest 2025',
        description: 'Política de privacidad del BBooFest 2025. Cómo protegemos y tratamos tus datos personales.',
        image: '/cartel-cuadrado-ok.jpg'
    }
} as const;

// Función para obtener la configuración de meta tags de una página
export function getMetaConfig(page: keyof typeof META_CONFIG) {
    return META_CONFIG[page];
} 