import React, { useState, useEffect } from 'react';
import { useCookieConsent } from '../../hooks/use-cookie-consent';
import CookieConsent from './CookieConsent';

const CookieConsentWrapper: React.FC = () => {
    const { hasConsent, savePreferences, resetConsent } = useCookieConsent();
    const [isClient, setIsClient] = useState(false);

    // Manejar hidratación de Astro
    useEffect(() => {
        setIsClient(true);
    }, [hasConsent]);

    const handleAccept = (preferences: any) => {
        savePreferences(preferences);
    };

    const handleReject = () => {
        resetConsent();
    };

    // No renderizar nada hasta que esté hidratado
    if (!isClient) {
        return null;
    }

    // Solo mostrar el banner si no hay consentimiento previo
    if (hasConsent) {
        return null;
    }

    return (
        <CookieConsent
            onAccept={handleAccept}
            onReject={handleReject}
        />
    );
};

export default CookieConsentWrapper; 