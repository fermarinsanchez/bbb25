import React from 'react';
import styles from './CookieConsent.module.css';
import type { CookiePreferences } from '../../hooks/use-cookie-consent';

interface CookieConsentProps {
    onAccept: (preferences: CookiePreferences) => void;
    onReject: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onReject }) => {
    const handleAccept = () => {
        onAccept({
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true,
        });
    };

    const handleDecline = () => {
        onReject();
    };

    const handleConfigure = () => {
        window.location.href = '/cookies';
    };

    return (
        <div className={styles.cookieBanner} role='dialog' aria-labelledby='cookie-banner-title' aria-live='polite'>
            <div className={styles.bannerContent}>
                <div className={styles.mainSection}>
                    <div className={styles.iconContainer}>
                        <svg className={styles.cookieIcon} viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
                            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
                        </svg>
                    </div>

                    <div className={styles.textContent}>
                        <h3 id='cookie-banner-title' className={styles.title}>
                            Configuración de Cookies
                        </h3>
                        <p className={styles.description}>
                            Las cookies son importantes para ti, influyen en tu experiencia de
                            navegación. Usamos cookies analíticas, de personalización y
                            publicitarias (propias y de terceros) para hacer perfiles basados en
                            hábitos de navegación y mostrarte contenido personalizado. Para más
                            información, consulta nuestra{' '}
                            <a href='/politica-cookies' className={styles.legalLink}>
                                política de cookies
                            </a>
                            .
                        </p>
                    </div>
                </div>

                <div className={styles.actionsSection}>
                    <button
                        type='button'
                        className={`${styles.button} ${styles.buttonAccept}`}
                        onClick={handleAccept}
                    >
                        Aceptar
                    </button>
                    <button
                        type='button'
                        className={`${styles.button} ${styles.buttonReject}`}
                        onClick={handleDecline}
                    >
                        Declinar
                    </button>
                    <button
                        type='button'
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
