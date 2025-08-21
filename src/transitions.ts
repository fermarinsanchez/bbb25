import { fade, slide } from 'astro:transitions';

export default {
    // Transición por defecto para todas las páginas
    default: fade({ duration: '0.3s' }),

    // Transiciones específicas para diferentes rutas
    '/': fade({ duration: '0.3s' }),
    '/lineup': fade({ duration: '0.3s' }),
    '/tickets': fade({ duration: '0.3s' }),
    '/band/*': fade({ duration: '0.3s' }),
    '/social': fade({ duration: '0.3s' }),

    // Transiciones personalizadas para elementos específicos
    'band-card': {
        transition: fade({ duration: '0.3s' })
    },

    'lineup-item': {
        transition: fade({ duration: '0.2s' })
    },

    'menu-item': {
        transition: fade({ duration: '0.2s' })
    }
}; 