import React from 'react';
import { useCookieConsent } from '../../hooks/use-cookie-consent';
import CookieConsent from './CookieConsent';

const CookieConsentWrapper: React.FC = () => {
    const { isReady, hasConsent, savePreferences } = useCookieConsent();

    if (!isReady || hasConsent) {
        return null;
    }

    return (
        <CookieConsent
            onAccept={savePreferences}
            onReject={() =>
                savePreferences({
                    necessary: true,
                    analytics: false,
                    marketing: false,
                    preferences: false,
                })
            }
        />
    );
};

export default CookieConsentWrapper;
