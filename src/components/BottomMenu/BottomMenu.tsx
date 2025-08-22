import React, { useMemo, useCallback } from 'react';
import inicioIcon from "../../assets/inicio.svg";
import inicioNotIcon from "../../assets/inicio-not.svg";
import lineupIcon from "../../assets/grupos-short.svg";
import lineupNotIcon from "../../assets/grupos-short-not.svg";
import ticketsIcon from "../../assets/tickets.svg";
import ticketsNotIcon from "../../assets/tickets-not.svg";
import socialIcon from "../../assets/info-short.svg";
import socialNotIcon from "../../assets/info-short-not.svg";
import styles from "./BottomMenu.module.css";
import { buildUrl, isActiveRoute } from "../../utils/env";

interface BottomMenuProps {
    currentPath: string;
}

const BottomMenu: React.FC<BottomMenuProps> = React.memo(({ currentPath }) => {
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

    // Solo re-renderizar cuando cambia currentPath, pero sin recalcular URLs e iconos
    return (
        <nav className={styles.bottomMenu}>
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
        </nav>
    );
});

BottomMenu.displayName = 'BottomMenu';

export { BottomMenu }; 