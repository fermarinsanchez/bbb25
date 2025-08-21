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
    const [showDetails, setShowDetails] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        necessary: true, // Siempre true, no se puede desactivar
        analytics: false,
        marketing: false,
        preferences: false,
    });

    useEffect(() => {
        // Verificar si ya se ha dado consentimiento
        const hasConsent = localStorage.getItem('cookie-consent');
        if (!hasConsent) {
            setShowBanner(true);
        }
    }, []);

    const handleAcceptAll = () => {
        const allAccepted: CookiePreferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true,
        };
        onAccept(allAccepted);
        setShowBanner(false);
    };

    const handleAcceptSelected = () => {
        onAccept(preferences);
        setShowBanner(false);
    };

    const handleReject = () => {
        const onlyNecessary: CookiePreferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false,
        };
        onAccept(onlyNecessary);
        setShowBanner(false);
    };

    const handlePreferenceChange = (category: keyof CookiePreferences) => {
        if (category === 'necessary') return; // No se puede cambiar
        setPreferences(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
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
                            Utilizamos cookies propias y de terceros para mejorar nuestros servicios,
                            analizar el tráfico y personalizar el contenido. Puedes configurar tus
                            preferencias o aceptar todas las cookies.
                        </p>
                    </div>
                </div>

                <div className={styles.actionsSection}>
                    <button
                        className={`${styles.button} ${styles.buttonSecondary}`}
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        {showDetails ? 'Ocultar detalles' : 'Ver detalles'}
                    </button>

                    <div className={styles.mainActions}>
                        <button
                            className={`${styles.button} ${styles.buttonReject}`}
                            onClick={handleReject}
                        >
                            Rechazar
                        </button>
                        <button
                            className={`${styles.button} ${styles.buttonAccept}`}
                            onClick={handleAcceptSelected}
                        >
                            Aceptar seleccionadas
                        </button>
                        <button
                            className={`${styles.button} ${styles.buttonAcceptAll}`}
                            onClick={handleAcceptAll}
                        >
                            Aceptar todas
                        </button>
                    </div>


                </div>
            </div>

            {showDetails && (
                <div className={styles.detailsSection}>
                    <div className={styles.cookieCategories}>
                        <div className={styles.category}>
                            <div className={styles.categoryHeader}>
                                <label className={styles.categoryLabel}>
                                    <input
                                        type="checkbox"
                                        checked={preferences.necessary}
                                        disabled
                                        className={styles.checkbox}
                                    />
                                    <span className={styles.checkboxLabel}>Cookies Necesarias</span>
                                </label>
                                <span className={styles.categoryStatus}>Siempre activas</span>
                            </div>
                            <p className={styles.categoryDescription}>
                                Estas cookies son esenciales para el funcionamiento del sitio web y no se pueden desactivar.
                                Incluyen funcionalidades básicas como navegación y acceso a áreas seguras.
                            </p>
                        </div>

                        <div className={styles.category}>
                            <div className={styles.categoryHeader}>
                                <label className={styles.categoryLabel}>
                                    <input
                                        type="checkbox"
                                        checked={preferences.analytics}
                                        onChange={() => handlePreferenceChange('analytics')}
                                        className={styles.checkbox}
                                    />
                                    <span className={styles.checkboxLabel}>Cookies de Análisis</span>
                                </label>
                                <span className={styles.categoryStatus}>
                                    {preferences.analytics ? 'Activadas' : 'Desactivadas'}
                                </span>
                            </div>
                            <p className={styles.categoryDescription}>
                                Nos ayudan a entender cómo interactúan los visitantes con el sitio web,
                                recopilando información de forma anónima para mejorar la experiencia del usuario.
                            </p>
                        </div>

                        <div className={styles.category}>
                            <div className={styles.categoryHeader}>
                                <label className={styles.categoryLabel}>
                                    <input
                                        type="checkbox"
                                        checked={preferences.marketing}
                                        onChange={() => handlePreferenceChange('marketing')}
                                        className={styles.checkbox}
                                    />
                                    <span className={styles.checkboxLabel}>Cookies de Marketing</span>
                                </label>
                                <span className={styles.categoryStatus}>
                                    {preferences.marketing ? 'Activadas' : 'Desactivadas'}
                                </span>
                            </div>
                            <p className={styles.categoryDescription}>
                                Se utilizan para rastrear visitantes en sitios web con el fin de mostrar
                                anuncios relevantes y atractivos para el usuario individual.
                            </p>
                        </div>

                        <div className={styles.category}>
                            <div className={styles.categoryHeader}>
                                <label className={styles.categoryLabel}>
                                    <input
                                        type="checkbox"
                                        checked={preferences.preferences}
                                        onChange={() => handlePreferenceChange('preferences')}
                                        className={styles.checkbox}
                                    />
                                    <span className={styles.checkboxLabel}>Cookies de Preferencias</span>
                                </label>
                                <span className={styles.categoryStatus}>
                                    {preferences.preferences ? 'Activadas' : 'Desactivadas'}
                                </span>
                            </div>
                            <p className={styles.categoryDescription}>
                                Permiten que el sitio web recuerde información que cambia la forma en que
                                se comporta o se ve, como tu idioma preferido o la región en la que te encuentras.
                            </p>
                        </div>
                    </div>

                    <div className={styles.legalInfo}>
                        <p className={styles.legalText}>
                            Al hacer clic en "Aceptar", consientes el uso de cookies según tus preferencias.
                            Puedes cambiar tu configuración en cualquier momento. Para más información,
                            consulta nuestra <a href="/politica-cookies" className={styles.legalLink}>Política de Cookies</a>.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CookieConsent; 