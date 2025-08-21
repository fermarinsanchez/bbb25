/**
 * Utilidades para debuggear el estado de cookies en localStorage
 */

export interface CookieDebugInfo {
    hasConsent: boolean;
    consentData: string | null;
    preferencesData: string | null;
    parsedConsent: any;
    parsedPreferences: any;
    localStorageAvailable: boolean;
    timestamp: string;
}

/**
 * Obtiene información completa del estado de cookies en localStorage
 */
export const getCookieDebugInfo = (): CookieDebugInfo => {
    const timestamp = new Date().toISOString();

    try {
        const consentData = localStorage.getItem('cookie-consent');
        const preferencesData = localStorage.getItem('cookie-preferences');

        let parsedConsent = null;
        let parsedPreferences = null;

        try {
            if (consentData) parsedConsent = JSON.parse(consentData);
        } catch (e) {
            console.warn('Error parsing cookie-consent:', e);
        }

        try {
            if (preferencesData) parsedPreferences = JSON.parse(preferencesData);
        } catch (e) {
            console.warn('Error parsing cookie-preferences:', e);
        }

        return {
            hasConsent: !!consentData,
            consentData,
            preferencesData,
            parsedConsent,
            parsedPreferences,
            localStorageAvailable: true,
            timestamp
        };
    } catch (error) {
        return {
            hasConsent: false,
            consentData: null,
            preferencesData: null,
            parsedConsent: null,
            parsedPreferences: null,
            localStorageAvailable: false,
            timestamp
        };
    }
};

/**
 * Muestra información de debug en la consola
 */
export const logCookieDebugInfo = () => {
    const debugInfo = getCookieDebugInfo();

    console.group('🍪 Cookie Debug Info');
    console.log('📅 Timestamp:', debugInfo.timestamp);
    console.log('💾 localStorage Available:', debugInfo.localStorageAvailable);
    console.log('✅ Has Consent:', debugInfo.hasConsent);
    console.log('📋 Consent Data:', debugInfo.consentData);
    console.log('⚙️ Preferences Data:', debugInfo.preferencesData);
    console.log('🔍 Parsed Consent:', debugInfo.parsedConsent);
    console.log('🔍 Parsed Preferences:', debugInfo.parsedPreferences);
    console.groupEnd();

    return debugInfo;
};

/**
 * Limpia todos los datos de cookies del localStorage
 */
export const clearAllCookieData = () => {
    try {
        localStorage.removeItem('cookie-consent');
        localStorage.removeItem('cookie-preferences');
        console.log('🧹 All cookie data cleared from localStorage');
        return true;
    } catch (error) {
        console.error('❌ Error clearing cookie data:', error);
        return false;
    }
};

/**
 * Simula diferentes estados de consentimiento para testing
 */
export const simulateCookieConsent = (scenario: 'accept-all' | 'accept-selected' | 'reject' | 'partial') => {
    const scenarios = {
        'accept-all': {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true
        },
        'accept-selected': {
            necessary: true,
            analytics: true,
            marketing: false,
            preferences: true
        },
        'reject': {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false
        },
        'partial': {
            necessary: true,
            analytics: true,
            marketing: false,
            preferences: false
        }
    };

    const preferences = scenarios[scenario];

    try {
        localStorage.setItem('cookie-consent', JSON.stringify(preferences));
        localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
        console.log(`🎭 Simulated ${scenario} consent:`, preferences);
        return true;
    } catch (error) {
        console.error('❌ Error simulating consent:', error);
        return false;
    }
};

/**
 * Verifica la integridad de los datos de cookies
 */
export const validateCookieData = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    try {
        const consentData = localStorage.getItem('cookie-consent');
        const preferencesData = localStorage.getItem('cookie-preferences');

        if (!consentData) {
            errors.push('No cookie-consent found in localStorage');
        }

        if (!preferencesData) {
            errors.push('No cookie-preferences found in localStorage');
        }

        if (consentData && preferencesData) {
            try {
                const consent = JSON.parse(consentData);
                const preferences = JSON.parse(preferencesData);

                // Verificar que ambos objetos sean iguales
                if (JSON.stringify(consent) !== JSON.stringify(preferences)) {
                    errors.push('cookie-consent and cookie-preferences are different');
                }

                // Verificar estructura requerida
                const requiredKeys = ['necessary', 'analytics', 'marketing', 'preferences'];
                requiredKeys.forEach(key => {
                    if (!(key in consent)) {
                        errors.push(`Missing required key: ${key}`);
                    }
                });

                // Verificar que necessary sea siempre true
                if (consent.necessary !== true) {
                    errors.push('necessary must always be true');
                }

            } catch (parseError) {
                errors.push(`JSON parse error: ${parseError}`);
            }
        }

    } catch (error) {
        errors.push(`localStorage error: ${error}`);
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}; 