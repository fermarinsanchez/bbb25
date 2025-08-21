import React from 'react';
import styles from './FeatureIcons.module.css';
import conciertosImg from '../../assets/items/item-conciertos.png';
import actividadesImg from '../../assets/items/item-actividades.png';
import marketsImg from '../../assets/items/item-markets.png';

const FeatureIcons = () => {
    return (
        <div className={styles.featureIcons}>
            <div className={styles.iconContainer}>
                <img src={conciertosImg.src} alt="Conciertos" className={styles.featureImage} />
                <h3 className={styles.iconText}>Conciertos</h3>
                <p className={styles.description}>
                    Disfruta de los mejores conciertos en vivo con un sonido molón y diversión a raudales!
                </p>
            </div>

            <div className={styles.iconContainer}>
                <img src={actividadesImg.src} alt="Actividades" className={styles.featureImage} />
                <h3 className={styles.iconText}>Actividades</h3>
                <p className={styles.description}>
                    Participa en talleres creativos, exposiciones y experiencias interactivas para todos
                </p>
            </div>

            <div className={styles.iconContainer}>
                <img src={marketsImg.src} alt="Markets" className={styles.featureImage} />
                <h3 className={styles.iconText}>Markets</h3>
                <p className={styles.description}>
                    Descubre artesanías únicas, libros, discos, ropa y productos artísticos de creadores locales
                </p>
            </div>
        </div>
    );
};

export default FeatureIcons; 