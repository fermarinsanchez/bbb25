import React, { useEffect, useState } from 'react';
import inicioIcon from "../../assets/menu_items/inicio.svg";
import inicioNotIcon from "../../assets/menu_items/inicio-not.svg";
import lineupIcon from "../../assets/menu_items/grupos.svg";
import lineupNotIcon from "../../assets/menu_items/grupos-not.svg";
import ticketsIcon from "../../assets/menu_items/tickets.svg";
import ticketsNotIcon from "../../assets/menu_items/tickets-not.svg";
import socialIcon from "../../assets/menu_items/info.svg";
import socialNotIcon from "../../assets/menu_items/info-not.svg";
import BIcon from "../../assets/bicon.svg";
import styles from "./TopHeader.module.css";

interface TopHeaderProps {
    currentPath?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ currentPath = "/" }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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

    // Función para determinar si estamos en la ruta activa
    const isActive = (path: string) => {
        if (path === "/") {
            return currentPath === "/" || currentPath === "/index";
        }
        if (path === "/lineup") {
            // Considerar las páginas de bandas como parte de lineup
            return currentPath === path || currentPath.startsWith("/band/");
        }
        return currentPath === path;
    };

    return (
        <nav className={`${styles.topMenu} ${isVisible ? styles.visible : styles.hidden}`}>
            <div className={styles.topMenuContainer}>
                <div className={styles.topMenuContent}>
                    <a href='/' className={styles.menuItem}>
                        <img
                            src={isActive("/") ? inicioIcon.src : inicioNotIcon.src}
                            alt='Inicio'
                            className={styles.menuIcon}
                        />
                    </a>

                    <a href='/lineup' className={styles.menuItem}>
                        <img
                            src={isActive("/lineup") ? lineupIcon.src : lineupNotIcon.src}
                            alt='Lineup'
                            className={styles.menuIcon}
                        />
                    </a>

                    <a href='/tickets' className={styles.menuItem}>
                        <img
                            src={isActive("/tickets") ? ticketsIcon.src : ticketsNotIcon.src}
                            alt='Tickets'
                            className={styles.menuIcon}
                        />
                    </a>

                    <a href='/social' className={styles.menuItem}>
                        <img
                            src={isActive("/social") ? socialIcon.src : socialNotIcon.src}
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
};

export default TopHeader; 