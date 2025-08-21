import React, { useState, useEffect } from 'react';
import { useCookieConsent } from '../../hooks/use-cookie-consent';
import { clearAllCookieData, simulateCookieConsent, logCookieDebugInfo } from '../../utils/cookie-debug';

const CookieDebugPanel: React.FC = () => {
    const { hasConsent, preferences, resetConsent } = useCookieConsent();
    const [isVisible, setIsVisible] = useState(false);

    // Exponer funciones de control globalmente para acceso desde consola
    useEffect(() => {
        // Función para mostrar/ocultar el panel
        (window as any).toggleCookieDebug = () => {
            setIsVisible((prev: boolean) => !prev);
            console.log('🍪 Cookie Debug Panel:', isVisible ? 'hidden' : 'visible');
        };

        // Función para mostrar el panel
        (window as any).showCookieDebug = () => {
            setIsVisible(true);
            console.log('🍪 Cookie Debug Panel: visible');
        };

        // Función para ocultar el panel
        (window as any).hideCookieDebug = () => {
            setIsVisible(false);
            console.log('🍪 Cookie Debug Panel: hidden');
        };

        // Función para ver estado de cookies desde consola
        (window as any).getCookieState = () => {
            const state = {
                hasConsent,
                preferences,
                localStorage: {
                    'cookie-consent': localStorage.getItem('cookie-consent'),
                    'cookie-preferences': localStorage.getItem('cookie-preferences')
                }
            };
            console.log('🍪 Cookie State:', state);
            return state;
        };

        console.log('🍪 Cookie Debug Panel functions available on window:');
        console.log('  - window.toggleCookieDebug()');
        console.log('  - window.showCookieDebug()');
        console.log('  - window.hideCookieDebug()');
        console.log('  - window.getCookieState()');

        // Cleanup al desmontar
        return () => {
            delete (window as any).toggleCookieDebug;
            delete (window as any).showCookieDebug;
            delete (window as any).hideCookieDebug;
            delete (window as any).getCookieState;
        };
    }, [hasConsent, preferences]);

    const forceShowBanner = () => {
        clearAllCookieData();
        window.location.reload();
    };

    const testScenarios = () => {
        console.group('🧪 Testing Cookie Scenarios');

        // Simular diferentes estados
        simulateCookieConsent('accept-all');
        console.log('✅ Simulated accept-all');

        setTimeout(() => {
            simulateCookieConsent('reject');
            console.log('❌ Simulated reject');
        }, 1000);

        setTimeout(() => {
            simulateCookieConsent('partial');
            console.log('⚖️ Simulated partial');
        }, 2000);

        setTimeout(() => {
            clearAllCookieData();
            console.log('🧹 Cleared all data');
        }, 3000);

        console.groupEnd();
    };

    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    // Solo mostrar si está visible
    if (!isVisible) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            background: '#2c3e50',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            zIndex: 9999,
            maxWidth: '300px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#3498db' }}>🍪 Cookie Debug Panel</h4>

            <div style={{ marginBottom: '0.5rem' }}>
                <strong>Estado:</strong> {hasConsent ? '✅ Con consentimiento' : '❌ Sin consentimiento'}
            </div>

            {preferences && (
                <div style={{ marginBottom: '0.5rem', fontSize: '0.7rem' }}>
                    <strong>Preferencias:</strong>
                    <pre style={{ margin: '0.25rem 0', fontSize: '0.6rem', background: '#34495e', padding: '0.25rem', borderRadius: '4px' }}>
                        {JSON.stringify(preferences, null, 2)}
                    </pre>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <button
                    onClick={logCookieDebugInfo}
                    style={{
                        background: '#3498db',
                        color: 'white',
                        border: 'none',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        cursor: 'pointer'
                    }}
                >
                    📊 Log Debug Info
                </button>

                <button
                    onClick={forceShowBanner}
                    style={{
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        cursor: 'pointer'
                    }}
                >
                    🔄 Force Show Banner
                </button>

                <button
                    onClick={testScenarios}
                    style={{
                        background: '#f39c12',
                        color: 'white',
                        border: 'none',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        cursor: 'pointer'
                    }}
                >
                    🧪 Test Scenarios
                </button>

                <button
                    onClick={resetConsent}
                    style={{
                        background: '#9b59b6',
                        color: 'white',
                        border: 'none',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        cursor: 'pointer'
                    }}
                >
                    🧹 Reset Consent
                </button>
            </div>

            <div style={{ marginTop: '0.5rem', fontSize: '0.6rem', opacity: 0.7 }}>
                Solo visible en desarrollo
            </div>
        </div>
    );
};

export default CookieDebugPanel; 