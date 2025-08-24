import React, { useState, useEffect } from "react";
import styles from "./TopHeader.module.css";
import { isActiveRoute } from "../../utils/env";
import { buildSiteUrl } from "../../config/site";
import inicioIcon from "../../assets/menu_items/inicio.svg";
import inicioNotIcon from "../../assets/menu_items/inicio-not.svg";
import lineupIcon from "../../assets/menu_items/grupos.svg";
import lineupNotIcon from "../../assets/menu_items/grupos-not.svg";
import ticketsIcon from "../../assets/menu_items/tickets.svg";
import ticketsNotIcon from "../../assets/menu_items/tickets-not.svg";
import socialIcon from "../../assets/menu_items/info.svg";
import socialNotIcon from "../../assets/menu_items/info-not.svg";
import BIcon from "../../assets/BIcon.svg";

const menuItems = [
    {
        name: "Inicio",
        path: "/",
        icon: inicioIcon.src,
        iconNot: inicioNotIcon.src,
        url: buildSiteUrl("/"),
    },
    {
        name: "Lineup",
        path: "/lineup",
        icon: lineupIcon.src,
        iconNot: lineupNotIcon.src,
        url: buildSiteUrl("/lineup"),
    },
    {
        name: "Tickets",
        path: "/tickets",
        icon: ticketsIcon.src,
        iconNot: ticketsNotIcon.src,
        url: buildSiteUrl("/tickets"),
    },
    {
        name: "Info",
        path: "/social",
        icon: socialIcon.src,
        iconNot: socialNotIcon.src,
        url: buildSiteUrl("/social"),
    },
];

interface TopHeaderProps {
    currentPath?: string;
}

const TopHeader: React.FC<TopHeaderProps> = React.memo(({ currentPath = "/" }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Si estamos en el top, siempre mostrar
            if (currentScrollY === 0) {
                setIsVisible(true);
                setLastScrollY(currentScrollY);
                return;
            }

            // Determinar la dirección del scroll
            const isScrollingDown = currentScrollY > lastScrollY;
            const isScrollingUp = currentScrollY < lastScrollY;

            // Si scrolleamos hacia abajo, ocultar
            if (isScrollingDown) {
                setIsVisible(false);
            }

            // Si scrolleamos hacia arriba, mostrar
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
                    {menuItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.url}
                            className={styles.menuItem}
                        >
                            <img
                                src={isActiveRoute(currentPath, item.path) ? item.icon : item.iconNot}
                                alt={item.name}
                                className={styles.menuIcon}
                            />
                        </a>
                    ))}
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