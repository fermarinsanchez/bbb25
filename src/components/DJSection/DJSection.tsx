import React from 'react'
import styles from './DJSection.module.css'
import { Typography } from '../Typography'
import Button from '../Button'
import { buildSiteUrl } from '../../config/site'

type DJ = {
    name: string
    style: string
    image: string
    description: string[]
    day: string
}

type DJSectionProps = {
    djs: DJ[]
}

const DJSection = ({ djs }: DJSectionProps) => {
    const getDJUrl = (djName: string) => {
        return buildSiteUrl(`/band/${djName.toLowerCase().replace(/\s+/g, '-')}`)
    }

    return (
        <div className={styles.djSection}>
            <Typography variant='headline-3' className={styles.sectionTitle}>
                Los DJs que van a poner la banda sonora del festival
            </Typography>
            <Typography variant='body' className={styles.sectionSubtitle}>
                Nuestros pinchadiscos favoritos estarán poniendo la mejor música durante todo el festival
            </Typography>

            <div className={styles.djsContainer}>
                {djs.map((dj) => (
                    <div key={dj.name} className={styles.djItem}>
                        <div className={styles.djImageContainer}>
                            <img
                                src={dj.image}
                                alt={dj.name}
                                className={styles.djImage}
                            />
                        </div>
                        <div className={styles.djInfo}>
                            <Typography variant='headline-4' className={styles.djName}>
                                {dj.name}
                            </Typography>
                            <Typography variant='body' className={styles.djStyle}>
                                {dj.style}
                            </Typography>
                            <Typography variant='body' className={styles.djDay}>
                                {dj.day === "Friday" ? "Viernes 26" : "Sábado 27"}
                            </Typography>
                            <Typography variant='body' className={styles.djDescription}>
                                {dj.description[0].substring(0, 120)}...
                            </Typography>
                        </div>
                        <div className={styles.djButtonContainer}>
                            <a
                                href={getDJUrl(dj.name)}
                                className={styles.djButton}
                            >
                                <Typography variant='body-strong'>
                                    Conocer más
                                </Typography>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { DJSection } 