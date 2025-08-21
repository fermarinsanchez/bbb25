"use client";

import { useEffect, useState, useCallback } from "react";

// Breakpoints personalizados para tu proyecto
const BREAKPOINTS: { [key: string]: number } = {
    xs: 0,      // Extra small
    sm: 480,    // Small
    md: 768,    // Medium (tu breakpoint actual)
    lg: 1024,   // Large
    xl: 1280,   // Extra large
    "2xl": 1536, // 2X large
};

type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type BreakpointValue = number;

interface BreakpointState {
    current: BreakpointKey;
    width: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isLarge: boolean;
    isExtraLarge: boolean;
}

interface BreakpointQueries {
    isXs: boolean;
    isSm: boolean;
    isMd: boolean;
    isLg: boolean;
    isXl: boolean;
    is2xl: boolean;
    isAbove: (breakpoint: BreakpointKey) => boolean;
    isBelow: (breakpoint: BreakpointKey) => boolean;
    isBetween: (min: BreakpointKey, max: BreakpointKey) => boolean;
}

/**
 * Hook personalizado para breakpoints con funcionalidades avanzadas
 * 
 * @returns Objeto con estado del breakpoint actual y queries útiles
 */
export const useBreakpoints = (): BreakpointState & BreakpointQueries => {
    const [state, setState] = useState<BreakpointState>({
        current: 'xs',
        width: 0,
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        isLarge: false,
        isExtraLarge: false,
    });

    const [queries, setQueries] = useState<BreakpointQueries>({
        isXs: true,
        isSm: false,
        isMd: false,
        isLg: false,
        isXl: false,
        is2xl: false,
        isAbove: () => false,
        isBelow: () => false,
        isBetween: () => false,
    });

    // Función para determinar el breakpoint actual
    const getCurrentBreakpoint = useCallback((width: number): BreakpointKey => {
        if (width >= BREAKPOINTS["2xl"]) return "2xl";
        if (width >= BREAKPOINTS.xl) return "xl";
        if (width >= BREAKPOINTS.lg) return "lg";
        if (width >= BREAKPOINTS.md) return "md";
        if (width >= BREAKPOINTS.sm) return "sm";
        return "xs";
    }, []);

    // Función para actualizar el estado
    const updateBreakpointState = useCallback((width: number) => {
        const current = getCurrentBreakpoint(width);

        const newState: BreakpointState = {
            current,
            width,
            isMobile: width < BREAKPOINTS.md,
            isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
            isDesktop: width >= BREAKPOINTS.md,
            isLarge: width >= BREAKPOINTS.lg,
            isExtraLarge: width >= BREAKPOINTS.xl,
        };

        const newQueries: BreakpointQueries = {
            isXs: current === 'xs',
            isSm: current === 'sm',
            isMd: current === 'md',
            isLg: current === 'lg',
            isXl: current === 'xl',
            is2xl: current === '2xl',
            isAbove: (breakpoint: BreakpointKey) => width >= BREAKPOINTS[breakpoint],
            isBelow: (breakpoint: BreakpointKey) => width < BREAKPOINTS[breakpoint],
            isBetween: (min: BreakpointKey, max: BreakpointKey) =>
                width >= BREAKPOINTS[min] && width < BREAKPOINTS[max],
        };

        setState(newState);
        setQueries(newQueries);
    }, [getCurrentBreakpoint]);

    useEffect(() => {
        // Verificar que estamos en el cliente
        if (typeof window === "undefined") {
            return;
        }

        // Función para manejar el resize
        const handleResize = () => {
            const width = window.innerWidth;
            updateBreakpointState(width);
        };

        // Estado inicial
        handleResize();

        // Event listeners
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleResize);
        };
    }, [updateBreakpointState]);

    return {
        ...state,
        ...queries,
    };
};

// Hook simplificado para compatibilidad con tu código existente
export const useBreakpoint = (size: BreakpointKey): boolean => {
    const { isAbove } = useBreakpoints();
    return isAbove(size);
};

// Hook para breakpoint específico con callback
export const useBreakpointCallback = (
    breakpoint: BreakpointKey,
    callback: (matches: boolean) => void
) => {
    const matches = useBreakpoint(breakpoint);

    useEffect(() => {
        callback(matches);
    }, [matches, callback]);

    return matches;
};

// Hook para breakpoint range
export const useBreakpointRange = (min: BreakpointKey, max: BreakpointKey): boolean => {
    const { isBetween } = useBreakpoints();
    return isBetween(min, max);
};

// Exportar los breakpoints para uso en otros lugares
export { BREAKPOINTS };