import React from "react";
import styles from "./BottomMenu.module.css";
import { isActiveRoute } from "../../utils/env";
import { buildSiteUrl } from "../../config/site";
import inicioIcon from "../../assets/bottom_menu_items/inicio.svg";
import inicioNotIcon from "../../assets/bottom_menu_items/inicio-not.svg";
import lineupIcon from "../../assets/bottom_menu_items/grupos-short.svg";
import lineupNotIcon from "../../assets/bottom_menu_items/grupos-short-not.svg";
import ticketsIcon from "../../assets/bottom_menu_items/tickets.svg";
import ticketsNotIcon from "../../assets/bottom_menu_items/tickets-not.svg";
import socialIcon from "../../assets/bottom_menu_items/info-short.svg";
import socialNotIcon from "../../assets/bottom_menu_items/info-short-not.svg";

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

interface BottomMenuProps {
    currentPath: string;
}

const BottomMenu: React.FC<BottomMenuProps> = React.memo(({ currentPath }) => {
    return (
        <nav className={styles.bottomMenu}>
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
        </nav>
    );
});

BottomMenu.displayName = 'BottomMenu';

export { BottomMenu }; 