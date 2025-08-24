// Utilidades para debugging de cookies en desarrollo
// Solo se incluye en builds de desarrollo

interface CookieDebugInfo {
    timestamp: string;
    localStorageAvailable: boolean;
    hasConsent: boolean;
    consentData: string | null;
    preferencesData: string | null;
    parsedConsent: any;
    parsedPreferences: any;
}

export const getCookieDebugInfo = (): CookieDebugInfo => {
    const timestamp = new Date().toISOString();
    const localStorageAvailable = typeof window !== 'undefined' && 'localStorage' in window;

    let consentData: string | null = null;
    let preferencesData: string | null = null;
    let parsedConsent: any = null;
    let parsedPreferences: any = null;

    if (localStorageAvailable) {
        try {
            consentData = localStorage.getItem('cookie-consent');
            preferencesData = localStorage.getItem('cookie-preferences');

            if (consentData) {
                try {
                    parsedConsent = JSON.parse(consentData);
                } catch (e) {
                    parsedConsent = { error: 'Failed to parse consent data' };
                }
            }

            if (preferencesData) {
                try {
                    parsedPreferences = JSON.parse(preferencesData);
                } catch (e) {
                    parsedPreferences = { error: 'Failed to parse preferences data' };
                }
            }
        } catch (e) {
            // Error accessing localStorage
        }
    }

    const hasConsent = !!(parsedPreferences && typeof parsedPreferences === 'object');

    return {
        timestamp,
        localStorageAvailable,
        hasConsent,
        consentData,
        preferencesData,
        parsedConsent,
        parsedPreferences
    };
};

export const clearAllCookieData = (): void => {
    if (typeof window !== 'undefined' && 'localStorage' in window) {
        localStorage.removeItem('cookie-consent');
        localStorage.removeItem('cookie-preferences');
    }
};

export const simulateCookieConsent = (scenario: 'accept-all' | 'reject' | 'partial'): void => {
    if (typeof window === 'undefined' || !('localStorage' in window)) {
        return;
    }

    let preferences: any;

    switch (scenario) {
        case 'accept-all':
            preferences = {
                analytics: true,
                marketing: true,
                preferences: true
            };
            break;
        case 'reject':
            preferences = {
                analytics: false,
                marketing: false,
                preferences: false
            };
            break;
        case 'partial':
            preferences = {
                analytics: true,
                marketing: false,
                preferences: true
            };
            break;
        default:
            return;
    }

    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
};

// Solo exportar en desarrollo y en el cliente
if (import.meta.env.DEV && typeof window !== 'undefined') {
    (window as any).getCookieDebugInfo = getCookieDebugInfo;
    (window as any).clearAllCookieData = clearAllCookieData;
    (window as any).simulateCookieConsent = simulateCookieConsent;
} 