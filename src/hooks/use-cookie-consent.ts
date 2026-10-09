import { useState, useEffect, useCallback } from 'react';

export interface CookiePreferences {
    necessary?: boolean;
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
}

interface CookieConsentHook {
    isReady: boolean;
    hasConsent: boolean;
    preferences: CookiePreferences;
    savePreferences: (prefs: CookiePreferences) => void;
    updatePreferences: (updates: Partial<CookiePreferences>) => void;
    resetConsent: () => void;
    applyPreferences: (prefs: CookiePreferences) => void;
}

const STORAGE_PREFERENCES = 'cookie-preferences';
const STORAGE_CONSENT = 'cookie-consent';

function readStoredPreferences(): CookiePreferences | null {
    if (typeof window === 'undefined') return null;

    const raw =
        localStorage.getItem(STORAGE_PREFERENCES) ||
        localStorage.getItem(STORAGE_CONSENT);

    if (!raw) return null;

    try {
        return JSON.parse(raw) as CookiePreferences;
    } catch {
        localStorage.removeItem(STORAGE_PREFERENCES);
        localStorage.removeItem(STORAGE_CONSENT);
        return null;
    }
}

export const useCookieConsent = (): CookieConsentHook => {
    const [isReady, setIsReady] = useState(false);
    const [hasConsent, setHasConsent] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        analytics: false,
        marketing: false,
        preferences: false,
    });

    useEffect(() => {
        const stored = readStoredPreferences();

        if (stored) {
            setPreferences(stored);
            setHasConsent(true);
        } else {
            setHasConsent(false);
        }

        setIsReady(true);
    }, []);

    const applyPreferences = useCallback((prefs: CookiePreferences) => {
        if (prefs.analytics) {
            // Habilitar analytics
        } else {
            // Deshabilitar analytics
        }

        if (prefs.marketing) {
            // Habilitar marketing
        } else {
            // Deshabilitar marketing
        }

        if (prefs.preferences) {
            // Habilitar preferencias
        } else {
            // Deshabilitar preferencias
        }
    }, []);

    const savePreferences = useCallback(
        (newPreferences: CookiePreferences) => {
            const normalized: CookiePreferences = {
                necessary: true,
                analytics: !!newPreferences.analytics,
                marketing: !!newPreferences.marketing,
                preferences: !!newPreferences.preferences,
            };

            setPreferences(normalized);
            setHasConsent(true);

            localStorage.setItem(STORAGE_PREFERENCES, JSON.stringify(normalized));
            localStorage.setItem(STORAGE_CONSENT, JSON.stringify(normalized));

            applyPreferences(normalized);
        },
        [applyPreferences],
    );

    const updatePreferences = useCallback(
        (updates: Partial<CookiePreferences>) => {
            const updatedPreferences = { ...preferences, ...updates, necessary: true };
            setPreferences(updatedPreferences);
            setHasConsent(true);

            localStorage.setItem(
                STORAGE_PREFERENCES,
                JSON.stringify(updatedPreferences),
            );
            localStorage.setItem(STORAGE_CONSENT, JSON.stringify(updatedPreferences));

            applyPreferences(updatedPreferences);
        },
        [preferences, applyPreferences],
    );

    const resetConsent = useCallback(() => {
        setHasConsent(false);
        setPreferences({
            analytics: false,
            marketing: false,
            preferences: false,
        });

        localStorage.removeItem(STORAGE_PREFERENCES);
        localStorage.removeItem(STORAGE_CONSENT);

        applyPreferences({
            analytics: false,
            marketing: false,
            preferences: false,
        });
    }, [applyPreferences]);

    return {
        isReady,
        hasConsent,
        preferences,
        savePreferences,
        updatePreferences,
        resetConsent,
        applyPreferences,
    };
};
