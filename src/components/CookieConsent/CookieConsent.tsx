import React, { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

interface CookiePreferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
}

interface CookieConsentProps {
    onAccept: (preferences: CookiePreferences) => void;
    onReject: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onReject }) => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Verificar si ya se ha dado consentimiento
        const hasConsent = localStorage.getItem('cookie-consent');
        if (!hasConsent) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        // Por defecto aceptamos todas las cookies
        const allAccepted: CookiePreferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true,
        };
        onAccept(allAccepted);
        setShowBanner(false);
    };

    const handleDecline = () => {
        // Solo cookies necesarias
        const onlyNecessary: CookiePreferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false,
        };
        onAccept(onlyNecessary);
        setShowBanner(false);
    };

    const handleConfigure = () => {
        // Redirigir a la página de configuración
        window.location.href = '/cookies';
    };

    if (!showBanner) return null;

    return (
        <div className={styles.cookieBanner}>
            <div className={styles.bannerContent}>
                <div className={styles.mainSection}>
                    <div className={styles.iconContainer}>
                        <svg className={styles.cookieIcon} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>

                    <div className={styles.textContent}>
                        <h3 className={styles.title}>Configuración de Cookies</h3>
                        <p className={styles.description}>
                            Las cookies son importantes para ti, influyen en tu experiencia de navegación.
                            Usamos cookies analíticas, de personalización y publicitarias (propias y de terceros)
                            para hacer perfiles basados en hábitos de navegación y mostrarte contenido personalizado.
                            Para más información, consulta nuestra{' '}
                            <a href="/politica-cookies" className={styles.legalLink}>
                                política de cookies
                            </a>.
                        </p>
                    </div>
                </div>

                <div className={styles.actionsSection} style={{ paddingTop: '24px' }}>
                    <button
                        className={`${styles.button} ${styles.buttonAccept}`}
                        onClick={handleAccept}
                    >
                        Aceptar
                    </button>
                    <button
                        className={`${styles.button} ${styles.buttonDecline}`}
                        onClick={handleDecline}
                    >
                        Declinar
                    </button>
                    <button
                        className={`${styles.button} ${styles.buttonConfigure}`}
                        onClick={handleConfigure}
                    >
                        Configurar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent; 