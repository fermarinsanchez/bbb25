import React from "react";
import styles from "./BottomMenu.module.css";
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