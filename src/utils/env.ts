// Detectar si estamos en producción (GitHub Pages) o desarrollo local
export const isProduction = import.meta.env.PROD;

// Base path para GitHub Pages
export const GITHUB_PAGES_BASE = '/bbb25';

// Función para construir URLs que funciona tanto en desarrollo como en producción
export const getBaseUrl = (): string => {
    return isProduction ? GITHUB_PAGES_BASE : '';
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

    const base = getBaseUrl();
    const normalizedBase = base.replace(/\/$/, '') || '';

    // Para la ruta de inicio
    if (normalizedTargetPath === '/') {
        return normalizedCurrentPath === '/' ||
            normalizedCurrentPath === '/index' ||
            normalizedCurrentPath === normalizedBase ||
            normalizedCurrentPath === `${normalizedBase}/index`;
    }

    // Para la ruta de lineup (incluye bandas individuales)
    if (normalizedTargetPath === '/lineup') {
        return normalizedCurrentPath === '/lineup' ||
            normalizedCurrentPath.startsWith('/band/') ||
            normalizedCurrentPath === `${normalizedBase}/lineup` ||
            normalizedCurrentPath.startsWith(`${normalizedBase}/band/`);
    }

    // Para otras rutas
    return normalizedCurrentPath === normalizedTargetPath ||
        normalizedCurrentPath === `${normalizedBase}${normalizedTargetPath}`;
};

// Función de debug para ayudar con el troubleshooting
export const debugRoute = (currentPath: string, targetPath: string): string => {
    const base = getBaseUrl();
    const isActive = isActiveRoute(currentPath, targetPath);

    return `Debug: currentPath="${currentPath}", targetPath="${targetPath}", base="${base}", isActive=${isActive}`;
}; 