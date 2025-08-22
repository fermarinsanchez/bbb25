import React, { useEffect, useState, useMemo } from 'react';
import inicioIcon from "../../assets/menu_items/inicio.svg";
import inicioNotIcon from "../../assets/menu_items/inicio-not.svg";
import lineupIcon from "../../assets/menu_items/grupos.svg";
import lineupNotIcon from "../../assets/menu_items/grupos-not.svg";
import ticketsIcon from "../../assets/menu_items/tickets.svg";
import ticketsNotIcon from "../../assets/menu_items/tickets-not.svg";
import socialIcon from "../../assets/menu_items/info.svg";
import socialNotIcon from "../../assets/menu_items/info-not.svg";
import BIcon from "../../assets/BIcon.svg";
import styles from "./TopHeader.module.css";
import { buildUrl, isActiveRoute, debugRoute } from "../../utils/env";

interface TopHeaderProps {
    currentPath?: string;
}

const TopHeader: React.FC<TopHeaderProps> = React.memo(({ currentPath = "/" }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Memoizar las URLs base (no cambian nunca)
    const baseUrls = useMemo(() => ({
        home: buildUrl("/"),
        lineup: buildUrl("/lineup"),
        tickets: buildUrl("/tickets"),
        social: buildUrl("/social")
    }), []); // Sin dependencias - se calcula una sola vez

    // Memoizar los iconos (no cambian nunca)
    const icons = useMemo(() => ({
        home: { active: inicioIcon.src, inactive: inicioNotIcon.src },
        lineup: { active: lineupIcon.src, inactive: lineupNotIcon.src },
        tickets: { active: ticketsIcon.src, inactive: ticketsNotIcon.src },
        social: { active: socialIcon.src, inactive: socialNotIcon.src }
    }), []); // Sin dependencias - se calcula una sola vez

    // Debug: mostrar en consola para troubleshooting
    useEffect(() => {
        console.log('TopHeader Debug:', {
            currentPath,
            isHomeActive: isActiveRoute(currentPath, "/"),
            isLineupActive: isActiveRoute(currentPath, "/lineup"),
            isTicketsActive: isActiveRoute(currentPath, "/tickets"),
            isSocialActive: isActiveRoute(currentPath, "/social"),
            debugHome: debugRoute(currentPath, "/"),
            debugLineup: debugRoute(currentPath, "/lineup")
        });
    }, [currentPath]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Si estamos en el top (scrollY === 0), siempre mostrar
            if (currentScrollY === 0) {
                setIsVisible(true);
                setLastScrollY(currentScrollY);
                return;
            }

            // Determinar la dirección del scroll
            const isScrollingDown = currentScrollY > lastScrollY;
            const isScrollingUp = currentScrollY < lastScrollY;

            // Solo ocultar si estamos haciendo scroll hacia abajo y no estamos en el top
            if (isScrollingDown && currentScrollY > 100) {
                setIsVisible(false);
            }

            // Mostrar si estamos haciendo scroll hacia arriba
            if (isScrollingUp) {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        // Agregar el event listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Cleanup
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`${styles.topMenu} ${isVisible ? styles.visible : styles.hidden}`}>
            <div className={styles.topMenuContainer}>
                <div className={styles.topMenuContent}>
                    <a href={baseUrls.home} className={styles.menuItem}>
                        <img
                            src={isActiveRoute(currentPath, "/") ? icons.home.active : icons.home.inactive}
                            alt='Inicio'
                            className={styles.menuIcon}
                        />
                    </a>

                    <a href={baseUrls.lineup} className={styles.menuItem}>
                        <img
                            src={isActiveRoute(currentPath, "/lineup") ? icons.lineup.active : icons.lineup.inactive}
                            alt='Lineup'
                            className={styles.menuIcon}
                        />
                    </a>

                    <a href={baseUrls.tickets} className={styles.menuItem}>
                        <img
                            src={isActiveRoute(currentPath, "/tickets") ? icons.tickets.active : icons.tickets.inactive}
                            alt='Tickets'
                            className={styles.menuIcon}
                        />
                    </a>

                    <a href={baseUrls.social} className={styles.menuItem}>
                        <img
                            src={isActiveRoute(currentPath, "/social") ? icons.social.active : icons.social.inactive}
                            alt='Social'
                            className={styles.menuIcon}
                        />
                    </a>
                </div>
                <div className={styles.menuIconB}>
                    <img src={BIcon.src} alt='Menu' />
                </div>
            </div>
        </nav>
    );
});

TopHeader.displayName = 'TopHeader';

export { TopHeader }; 