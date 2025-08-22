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
    const base = getBaseUrl();

    if (targetPath === '/') {
        return currentPath === '/' ||
            currentPath === '/index' ||
            currentPath === `${base}/` ||
            currentPath === `${base}/index`;
    }

    if (targetPath === '/lineup') {
        return currentPath === targetPath ||
            currentPath.startsWith('/band/') ||
            currentPath === `${base}/lineup` ||
            currentPath.startsWith(`${base}/band/`);
    }

    return currentPath === targetPath ||
        currentPath === `${base}${targetPath}`;
}; 