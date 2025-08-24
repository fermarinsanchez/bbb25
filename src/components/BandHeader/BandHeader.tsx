import React, { useState, useEffect } from 'react'
import styles from './BandHeader.module.css'
import PurpleHeader from '../../assets/purple-header-bg.svg'
import BackIcon from '../../assets/backIcon.svg'
import SqareBackground from '../../assets/fondo_rosa.png'
import { buildSiteUrl } from '../../config/site'

type BandHeaderProps = {
    titleSvg: string
    image: string
    name: string
}

const BandHeader = ({ titleSvg, image, name }: BandHeaderProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [titleLoaded, setTitleLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setTitleLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className={styles.root}>
            <a href={buildSiteUrl("/lineup")} className={styles.backButton} >
                <img src={BackIcon.src} alt='back icon' />
            </a>
            <div className={styles.backgroundContainer}>
                <div className={styles.squareBackgroundWrapper}>
                    <img src={SqareBackground.src} />
                </div>
                <div className={styles.purpleHeader} />
            </div>
            <div className={styles.bandImageContainer}>
                <img
                    className={`${styles.bandImage} ${imageLoaded ? styles.loaded : ''}`}
                    src={image}
                    alt={`${name} image`}
                    onLoad={() => setImageLoaded(true)}
                />
                <div className={styles.bandTitle}>
                    <img
                        className={`${titleLoaded ? styles.loaded : ''}`}
                        src={titleSvg}
                        alt={`${name} lettering`}
                    />
                </div>
            </div>
        </section>
    )
}

export { BandHeader }