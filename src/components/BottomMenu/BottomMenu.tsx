import React, { useMemo } from 'react';
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
    // Memoizar los enlaces para evitar re-renders innecesarios
    const menuItems = useMemo(() => [
        {
            href: buildUrl("/"),
            icon: isActiveRoute(currentPath, "/") ? inicioIcon.src : inicioNotIcon.src,
            alt: 'Inicio',
            isActive: isActiveRoute(currentPath, "/")
        },
        {
            href: buildUrl("/lineup"),
            icon: isActiveRoute(currentPath, "/lineup") ? lineupIcon.src : lineupNotIcon.src,
            alt: 'Lineup',
            isActive: isActiveRoute(currentPath, "/lineup")
        },
        {
            href: buildUrl("/tickets"),
            icon: isActiveRoute(currentPath, "/tickets") ? ticketsIcon.src : ticketsNotIcon.src,
            alt: 'Tickets',
            isActive: isActiveRoute(currentPath, "/tickets")
        },
        {
            href: buildUrl("/social"),
            icon: isActiveRoute(currentPath, "/social") ? socialIcon.src : socialNotIcon.src,
            alt: 'Social',
            isActive: isActiveRoute(currentPath, "/social")
        }
    ], [currentPath]);

    return (
        <nav className={styles.bottomMenu}>
            {menuItems.map((item, index) => (
                <a key={index} href={item.href} className={styles.menuItem}>
                    <img
                        src={item.icon}
                        alt={item.alt}
                        className={styles.menuIcon}
                    />
                </a>
            ))}
        </nav>
    );
});

BottomMenu.displayName = 'BottomMenu';

export { BottomMenu }; 