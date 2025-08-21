import { useState, useEffect } from 'react';

export interface CookiePreferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
}

export const useCookieConsent = () => {
    const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
    const [hasConsent, setHasConsent] = useState<boolean>(false);

    useEffect(() => {
        // Cargar preferencias desde localStorage al inicializar
        console.log('🔍 useCookieConsent useEffect triggered');

        try {
            const savedPreferences = localStorage.getItem('cookie-preferences');

            console.log('📱 Found in localStorage:', { savedPreferences });

            if (savedPreferences) {
                try {
                    const parsedPreferences = JSON.parse(savedPreferences);
                    console.log('✅ Parsed preferences:', parsedPreferences);
                    setPreferences(parsedPreferences);
                    setHasConsent(true);
                } catch (error) {
                    console.error('❌ Error parsing saved cookie preferences:', error);
                    // Si hay error, resetear y mostrar banner
                    localStorage.removeItem('cookie-preferences');
                    setHasConsent(false);
                }
            } else {
                console.log('🚫 No saved preferences found, setting hasConsent to false');
                setHasConsent(false);
            }
        } catch (error) {
            console.error('❌ Error accessing localStorage:', error);
            setHasConsent(false);
        }
    }, []);

    const savePreferences = (newPreferences: CookiePreferences) => {
        try {
            // Guardar en localStorage
            localStorage.setItem('cookie-preferences', JSON.stringify(newPreferences));

            // Actualizar estado local
            setPreferences(newPreferences);
            setHasConsent(true);

            // Log para debugging
            console.log('✅ Cookie preferences saved to localStorage:', newPreferences);
            console.log('📱 localStorage cookie-preferences:', localStorage.getItem('cookie-preferences'));

            // Aplicar preferencias de cookies
            applyCookiePreferences(newPreferences);

            return true;
        } catch (error) {
            console.error('❌ Error saving cookie preferences:', error);
            return false;
        }
    };

    const updatePreferences = (newPreferences: Partial<CookiePreferences>) => {
        if (preferences) {
            const updatedPreferences = { ...preferences, ...newPreferences };
            console.log('🔄 Updating cookie preferences:', updatedPreferences);
            savePreferences(updatedPreferences);
        } else {
            console.warn('⚠️ Cannot update preferences: no existing preferences found');
        }
    };

    const resetConsent = () => {
        try {
            // Limpiar localStorage
            localStorage.removeItem('cookie-preferences');

            // Actualizar estado local
            setPreferences(null);
            setHasConsent(false);

            // Log para debugging
            console.log('🔄 Cookie consent reset - localStorage cleared');
            console.log('📱 localStorage cookie-preferences:', localStorage.getItem('cookie-preferences'));

            // Desactivar todas las cookies no esenciales
            const onlyNecessary: CookiePreferences = {
                necessary: true,
                analytics: false,
                marketing: false,
                preferences: false,
            };
            applyCookiePreferences(onlyNecessary);

            return true;
        } catch (error) {
            console.error('❌ Error resetting cookie consent:', error);
            return false;
        }
    };

    const applyCookiePreferences = (prefs: CookiePreferences) => {
        console.log('🔧 Applying cookie preferences:', prefs);

        // Cookies de Analytics (ej: Google Analytics)
        if (prefs.analytics) {
            console.log('✅ Analytics cookies enabled');
            // Activar Google Analytics
            // window.gtag('consent', 'update', { 'analytics_storage': 'granted' });
        } else {
            console.log('❌ Analytics cookies disabled');
            // Desactivar Google Analytics
            // window.gtag('consent', 'update', { 'analytics_storage': 'denied' });
        }

        // Cookies de Marketing (ej: Facebook Pixel, Google Ads)
        if (prefs.marketing) {
            console.log('✅ Marketing cookies enabled');
            // Activar cookies de marketing
            // Implementar activación de pixel de Facebook, Google Ads, etc.
        } else {
            console.log('❌ Marketing cookies disabled');
            // Desactivar cookies de marketing
            // Implementar desactivación de pixel de Facebook, Google Ads, etc.
        }

        // Cookies de Preferencias
        if (prefs.preferences) {
            console.log('✅ Preference cookies enabled');
            // Activar cookies de preferencias
            // Implementar activación de cookies de preferencias
        } else {
            console.log('❌ Preference cookies disabled');
            // Implementar desactivación de cookies de preferencias
        }

        console.log('🎯 Cookie preferences applied successfully');
    };

    const getCookieValue = (name: string): string | null => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return null;
    };

    const setCookie = (name: string, value: string, days: number = 365) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    };

    const deleteCookie = (name: string) => {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    };

    return {
        preferences,
        hasConsent,
        savePreferences,
        updatePreferences,
        resetConsent,
        getCookieValue,
        setCookie,
        deleteCookie,
        applyCookiePreferences,
    };
}; 