import React, { useState } from 'react';
import { useCookieConsent } from '../../hooks/use-cookie-consent';
export interface CookiePreferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
}
import styles from './CookieSettings.module.css';
import { Typography } from '../Typography';
import { buildSiteUrl } from '../../config/site';

const CookieSettings: React.FC = () => {
    const { preferences, savePreferences, resetConsent } = useCookieConsent();
    const [localPreferences, setLocalPreferences] = useState<CookiePreferences>({
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false,
    });

    // Sincronizar localPreferences cuando cambien las preferences del hook
    React.useEffect(() => {
        if (preferences) {
            setLocalPreferences(prev => ({
                ...prev,
                analytics: preferences.analytics,
                marketing: preferences.marketing,
                preferences: preferences.preferences
            }));
        }
    }, [preferences]);
    const [showSuccess, setShowSuccess] = useState(false);

    const handlePreferenceChange = (category: keyof CookiePreferences) => {
        if (category === 'necessary') return; // No se puede cambiar
        setLocalPreferences(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const handleSave = () => {
        console.log('💾 Saving preferences:', localPreferences);
        savePreferences({
            analytics: localPreferences.analytics,
            marketing: localPreferences.marketing,
            preferences: localPreferences.preferences
        });
        // Sincronizar el estado local con las preferencias guardadas
        setLocalPreferences(localPreferences);
        setShowSuccess(true);

        // Mostrar mensaje de éxito y luego redireccionar a la home
        setTimeout(() => {
            setShowSuccess(false);
            // Redireccionar a la home después de guardar
            window.location.href = buildSiteUrl('/');
        }, 1500);

        // Verificar que se guardó correctamente
        setTimeout(() => {
            const saved = localStorage.getItem('cookie-preferences');
            console.log('🔍 Verification - Saved preferences:', saved);
        }, 100);
    };

    const handleReset = () => {
        console.log('🔄 Resetting cookie preferences');
        resetConsent();
        // Actualizar el estado local inmediatamente
        const defaultPreferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false,
        };
        setLocalPreferences(defaultPreferences);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);

        // Verificar que se reseteó correctamente
        setTimeout(() => {
            const saved = localStorage.getItem('cookie-preferences');
            console.log('🔍 Reset verification - localStorage:', saved);
        }, 100);
    };

    // Mostrar estado de carga solo durante la hidratación inicial del servidor
    if (typeof window === 'undefined') {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <Typography variant="headline-2">Configuración de Cookies</Typography>
                    <Typography variant="body">Cargando configuración...</Typography>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <Typography variant="headline-2">Configuración de Cookies</Typography>
                    <Typography variant="body">
                        {preferences
                            ? "Gestiona tus preferencias de cookies. Puedes cambiar esta configuración en cualquier momento."
                            : "Configura tus preferencias de cookies para personalizar tu experiencia."
                        }
                    </Typography>
                </div>

                {showSuccess && (
                    <div className={styles.successMessage}>
                        ✅ Configuración guardada correctamente
                    </div>
                )}



                <div className={styles.cookieCategories}>
                    <div className={styles.category}>
                        <div className={styles.categoryHeader}>
                            <label className={styles.categoryLabel}>
                                <input
                                    type="checkbox"
                                    checked={localPreferences.necessary}
                                    disabled
                                    className={styles.checkbox}
                                />
                                <span className={styles.checkboxLabel}>Cookies Necesarias</span>
                            </label>
                            <span className={styles.categoryStatus}>Siempre activas</span>
                        </div>
                        <Typography variant="body" className={styles.categoryDescription}>
                            Estas cookies son esenciales para el funcionamiento del sitio web y no se pueden desactivar.
                            Incluyen funcionalidades básicas como navegación y acceso a áreas seguras.
                        </Typography>
                    </div>

                    <div className={styles.category}>
                        <div className={styles.categoryHeader}>
                            <label className={styles.categoryLabel}>
                                <input
                                    type="checkbox"
                                    checked={localPreferences.analytics}
                                    onChange={() => handlePreferenceChange('analytics')}
                                    className={styles.checkbox}
                                />
                                <span className={styles.checkboxLabel}>Cookies de Análisis</span>
                            </label>
                            <span className={styles.categoryStatus}>
                                {localPreferences.analytics ? 'Activadas' : 'Desactivadas'}
                            </span>
                        </div>
                        <Typography variant="body" className={styles.categoryDescription}>
                            Nos ayudan a entender cómo interactúan los visitantes con el sitio web,
                            recopilando información de forma anónima para mejorar la experiencia del usuario.
                        </Typography>
                    </div>

                    <div className={styles.category}>
                        <div className={styles.categoryHeader}>
                            <label className={styles.categoryLabel}>
                                <input
                                    type="checkbox"
                                    checked={localPreferences.marketing}
                                    onChange={() => handlePreferenceChange('marketing')}
                                    className={styles.checkbox}
                                />
                                <span className={styles.checkboxLabel}>Cookies de Marketing</span>
                            </label>
                            <span className={styles.categoryStatus}>
                                {localPreferences.marketing ? 'Activadas' : 'Desactivadas'}
                            </span>
                        </div>
                        <Typography variant="body" className={styles.categoryDescription}>
                            Se utilizan para rastrear visitantes en sitios web con el fin de mostrar
                            anuncios relevantes y atractivos para el usuario individual.
                        </Typography>
                    </div>

                    <div className={styles.category}>
                        <div className={styles.categoryHeader}>
                            <label className={styles.categoryLabel}>
                                <input
                                    type="checkbox"
                                    checked={localPreferences.preferences}
                                    onChange={() => handlePreferenceChange('preferences')}
                                    className={styles.checkbox}
                                />
                                <span className={styles.checkboxLabel}>Cookies de Preferencias</span>
                            </label>
                            <span className={styles.categoryStatus}>
                                {localPreferences.preferences ? 'Activadas' : 'Desactivadas'}
                            </span>
                        </div>
                        <Typography variant="body" className={styles.categoryDescription}>
                            Permiten que el sitio web recuerde información que cambia la forma en que
                            se comporta o se ve, como tu idioma preferido o la región en la que te encuentras.
                        </Typography>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button
                        className={`${styles.button} ${styles.buttonReset}`}
                        onClick={handleReset}
                    >
                        Restablecer configuración
                    </button>
                    <button
                        className={`${styles.button} ${styles.buttonSave}`}
                        onClick={handleSave}
                    >
                        Guardar configuración
                    </button>
                </div>

                <div className={styles.legalInfo}>
                    <Typography variant="body">
                        Para más información sobre cómo utilizamos las cookies, consulta nuestra{' '}
                        <a href="/politica-cookies" className={styles.legalLink}>
                            Política de Cookies
                        </a>
                        .
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default CookieSettings; 