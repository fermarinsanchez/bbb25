import { useState, useEffect, useCallback } from 'react';

interface CookiePreferences {
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
}

interface CookieConsentHook {
    hasConsent: boolean;
    preferences: CookiePreferences;
    savePreferences: (prefs: CookiePreferences) => void;
    updatePreferences: (updates: Partial<CookiePreferences>) => void;
    resetConsent: () => void;
    applyPreferences: (prefs: CookiePreferences) => void;
}

export const useCookieConsent = (): CookieConsentHook => {
    const [hasConsent, setHasConsent] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        analytics: false,
        marketing: false,
        preferences: false
    });

    useEffect(() => {
        // Buscar preferencias guardadas en localStorage
        const savedPreferences = localStorage.getItem('cookie-preferences');

        if (savedPreferences) {
            try {
                const parsedPreferences = JSON.parse(savedPreferences) as CookiePreferences;
                setPreferences(parsedPreferences);
                setHasConsent(true);
            } catch (error) {
                // Si hay error al parsear, limpiar localStorage
                localStorage.removeItem('cookie-preferences');
                setHasConsent(false);
            }
        } else {
            setHasConsent(false);
        }
    }, []);

    const savePreferences = useCallback((newPreferences: CookiePreferences) => {
        setPreferences(newPreferences);
        setHasConsent(true);

        // Guardar en localStorage
        localStorage.setItem('cookie-preferences', JSON.stringify(newPreferences));

        // Aplicar las preferencias inmediatamente
        applyPreferences(newPreferences);
    }, []);

    const updatePreferences = useCallback((updates: Partial<CookiePreferences>) => {
        const updatedPreferences = { ...preferences, ...updates };
        setPreferences(updatedPreferences);

        // Guardar en localStorage
        localStorage.setItem('cookie-preferences', JSON.stringify(updatedPreferences));

        // Aplicar las preferencias actualizadas
        applyPreferences(updatedPreferences);
    }, [preferences]);

    const resetConsent = useCallback(() => {
        setHasConsent(false);
        setPreferences({
            analytics: false,
            marketing: false,
            preferences: false
        });

        // Limpiar localStorage
        localStorage.removeItem('cookie-preferences');

        // Deshabilitar todas las cookies
        applyPreferences({
            analytics: false,
            marketing: false,
            preferences: false
        });
    }, []);

    const applyPreferences = useCallback((prefs: CookiePreferences) => {
        // Aplicar preferencias de analytics
        if (prefs.analytics) {
            // Habilitar Google Analytics, etc.
        } else {
            // Deshabilitar Google Analytics, etc.
        }

        // Aplicar preferencias de marketing
        if (prefs.marketing) {
            // Habilitar cookies de marketing
        } else {
            // Deshabilitar cookies de marketing
        }

        // Aplicar preferencias de funcionalidad
        if (prefs.preferences) {
            // Habilitar cookies de preferencias
        } else {
            // Deshabilitar cookies de preferencias
        }
    }, []);

    return {
        hasConsent,
        preferences,
        savePreferences,
        updatePreferences,
        resetConsent,
        applyPreferences
    };
}; 