import React, { useState, useEffect } from 'react';
import { useCookieConsent } from '../../hooks/use-cookie-consent';
import CookieConsent from './CookieConsent';

const CookieConsentWrapper: React.FC = () => {
    const { hasConsent, savePreferences, resetConsent } = useCookieConsent();
    const [isClient, setIsClient] = useState(false);

    // Manejar hidratación de Astro
    useEffect(() => {
        setIsClient(true);

        // Debug: verificar estado inicial
        console.log('🌐 CookieConsentWrapper mounted');
        console.log('📱 localStorage cookie-consent:', localStorage.getItem('cookie-consent'));
        console.log('📱 localStorage cookie-preferences:', localStorage.getItem('cookie-preferences'));
        console.log('🔑 hasConsent from hook:', hasConsent);
    }, [hasConsent]);

    const handleAccept = (preferences: any) => {
        console.log('✅ handleAccept called with:', preferences);
        savePreferences(preferences);
    };

    const handleReject = () => {
        console.log('❌ handleReject called');
        resetConsent();
    };

    // No renderizar nada hasta que esté hidratado
    if (!isClient) {
        return null;
    }

    // Debug: mostrar estado actual
    console.log('🎭 Rendering CookieConsentWrapper, hasConsent:', hasConsent);

    // Solo mostrar el banner si no hay consentimiento previo
    if (hasConsent) {
        console.log('🚫 Banner hidden - user has consent');
        return null;
    }

    console.log('✅ Banner shown - no consent found');
    return (
        <CookieConsent
            onAccept={handleAccept}
            onReject={handleReject}
        />
    );
};

export default CookieConsentWrapper; 