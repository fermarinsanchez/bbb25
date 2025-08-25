// Configuración de meta tags para cada página
export const META_CONFIG = {
    home: {
        title: 'Balambam Boo Fest 2025 - El mejor festival para todas las edades',
        description: '¡Vuelve el mejor festival tras 10 años de trayectoria! 26-27 de Octubre en Summerland (Toledo). Conciertos, actividades, narkets y muchas locuras más.',
        image: 'https://res.cloudinary.com/dci5hxl4x/image/upload/v1756108115/bboofest_25_3_wri4dw.png'
    },
    lineup: {
        title: 'Lineup Balambam Boo Fest 2025 - Grupos y Bandas',
        description: 'Descubre el increíble lineup del Balambam Boo Fest 2025. Las mejores bandas de música independiente en un festival inolvidable.',
        image: 'https://res.cloudinary.com/dci5hxl4x/image/upload/v1756108115/bboofest_25_3_wri4dw.png'
    },
    tickets: {
        title: 'Tickets Balambam Boo Fest 2025 - Comprar Entradas',
        description: 'Consigue tus entradas para el Balambam Boo Fest 2025. Festival de música independiente el 26-27 de Octubre en Summerland (Toledo).',
        image: 'https://res.cloudinary.com/dci5hxl4x/image/upload/v1756108115/bboofest_25_3_wri4dw.png'
    },
    social: {
        title: 'Info Balambam Boo Fest 2025 - Información del Festival',
        description: 'Toda la información del Balambam Boo Fest 2025. Horarios, ubicación, actividades y mucho más sobre el mejor festival de música independiente.',
        image: 'https://res.cloudinary.com/dci5hxl4x/image/upload/v1756108115/bboofest_25_3_wri4dw.png'
    },
    cookies: {
        title: 'Configuración de Cookies - Balambam Boo Fest 2025',
        description: 'Gestiona tus preferencias de cookies en el Balambam Boo Fest 2025. Configura la privacidad de tu navegación.',
        image: 'https://res.cloudinary.com/dci5hxl4x/image/upload/v1756108115/bboofest_25_3_wri4dw.png'
    },
    politicaCookies: {
        title: 'Política de Cookies - Balambam Boo Fest 2025',
        description: 'Política de cookies del Balambam Boo Fest 2025. Información sobre el uso de cookies y tecnologías similares en nuestro sitio web.',
        image: 'https://res.cloudinary.com/dci5hxl4x/image/upload/v1756108115/bboofest_25_3_wri4dw.png'
    },
    politicaPrivacidad: {
        title: 'Política de Privacidad - Balambam Boo Fest 2025',
        description: 'Política de privacidad del Balambam Boo Fest 2025. Cómo protegemos y tratamos tus datos personales.',
        image: 'https://res.cloudinary.com/dci5hxl4x/image/upload/v1756108115/bboofest_25_3_wri4dw.png'
    }
} as const;

// Función para obtener la configuración de meta tags de una página
export function getMetaConfig(page: keyof typeof META_CONFIG) {
    return META_CONFIG[page];
} 