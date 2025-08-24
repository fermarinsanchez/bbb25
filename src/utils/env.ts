// Detectar si estamos en producción o desarrollo local
export const isProduction = import.meta.env.PROD;

// Dominio del sitio en producción
export const SITE_DOMAIN = 'https://balambamboofest.com';

// Función para construir URLs que funciona tanto en desarrollo como en producción
export const getBaseUrl = (): string => {
    return isProduction ? SITE_DOMAIN : '';
};

// Función para construir URLs completas
export const buildUrl = (path: string): string => {
    const base = getBaseUrl();

    if (path === '/') {
        return base ? `${base}/` : '/';
    }

    return base ? `${base}${path}` : path;
};

// Función para detectar si una ruta está activa
export const isActiveRoute = (currentPath: string, targetPath: string): boolean => {
    // Normalizar las rutas para evitar problemas con trailing slashes
    const normalizedCurrentPath = currentPath.replace(/\/$/, '') || '/';
    const normalizedTargetPath = targetPath.replace(/\/$/, '') || '/';

    // Para la ruta de inicio
    if (normalizedTargetPath === '/') {
        return normalizedCurrentPath === '/' ||
            normalizedCurrentPath === '/index';
    }

    // Para la ruta de lineup (incluye bandas individuales)
    if (normalizedTargetPath === '/lineup') {
        return normalizedCurrentPath === '/lineup' ||
            normalizedCurrentPath.startsWith('/band/');
    }

    // Para otras rutas
    return normalizedCurrentPath === normalizedTargetPath;
};

// Función de debug para ayudar con el troubleshooting
export const debugRoute = (currentPath: string, targetPath: string): string => {
    const base = getBaseUrl();
    const isActive = isActiveRoute(currentPath, targetPath);

    return `Debug: currentPath="${currentPath}", targetPath="${targetPath}", base="${base}", isActive=${isActive}`;
}; 