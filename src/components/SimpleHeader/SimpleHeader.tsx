import React from 'react'
import styles from './SimpleHeader.module.css'
import sqares from '../../assets/fondo_rosa.png'


type SimpleHeaderProps = {
    titleSvg?: string
    alt?: string
}

const SimpleHeader = ({ titleSvg, alt = '' }: SimpleHeaderProps) => {
    return <section className={styles.container}>
        <img src={sqares.src} className={styles.backgroundImage} alt="Background squares" />
        <div className={styles.titleComposition}>

            <div className={styles.title}> <img src={titleSvg} alt={alt} /></div>
        </div>
    </section>
}

export { SimpleHeader }