import React, { useState, useEffect } from "react";
import styles from "./TopHeader.module.css";
import { isActiveRoute } from "../../utils/env";
import { buildSiteUrl } from "../../config/site";
import HomeIcon from "../../assets/menu_items/inicio.svg";
import HomeIconNot from "../../assets/menu_items/inicio-not.svg";
import LineupIcon from "../../assets/menu_items/grupos.svg";
import LineupIconNot from "../../assets/menu_items/grupos-not.svg";
import TicketsIcon from "../../assets/menu_items/tickets.svg";
import TicketsIconNot from "../../assets/menu_items/tickets-not.svg";
import SocialIcon from "../../assets/menu_items/info.svg";
import SocialIconNot from "../../assets/menu_items/info-not.svg";
import BIcon from "../../assets/BIcon.svg";

const menuItems = [
    {
        name: "Inicio",
        path: "/",
        icon: HomeIcon.src,
        iconNot: HomeIconNot.src,
        url: buildSiteUrl("/"),
    },
    {
        name: "Lineup",
        path: "/lineup",
        icon: LineupIcon.src,
        iconNot: LineupIconNot.src,
        url: buildSiteUrl("/lineup"),
    },
    {
        name: "Tickets",
        path: "/tickets",
        icon: TicketsIcon.src,
        iconNot: TicketsIconNot.src,
        url: buildSiteUrl("/tickets"),
    },
    {
        name: "Info",
        path: "/social",
        icon: SocialIcon.src,
        iconNot: SocialIconNot.src,
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