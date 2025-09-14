/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Declaraciones globales para Google Tag Manager y Analytics
declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

export { };