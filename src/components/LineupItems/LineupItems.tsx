import React from 'react'
import styles from './LineupItems.module.css'
import { buildSiteUrl } from '../../config/site'

type DataBand = {
    name: string
    style: string
    link: string
    hour: string
    order: number
    image: string
    day: string
}

type LineupItemProps = {
    data: DataBand[]
    day: 'Friday' | 'Saturday'
}

const LineupItems = ({ data, day }: LineupItemProps) => {
    const allItemsOfTheDay = data.filter(item => item.day === day)
    const djsOfTheDay = allItemsOfTheDay.filter(item => item.name === "Head and Banger" || item.name === "Alfonso Monasterio")
    const bandsOfTheDay = allItemsOfTheDay.filter(item => item.name !== "Head and Banger" && item.name !== "Alfonso Monasterio")

    // Función para generar la URL de la banda/DJ
    const getBandUrl = (bandName: string) => {
        return buildSiteUrl(`/band/${bandName.toLowerCase().replace(/\s+/g, '-')}`)
    }

    return (
        <div>
            {/* Sección DJ */}
            {djsOfTheDay.length > 0 && (
                <div className={styles.djSection}>
                    <h3 className={styles.sectionTitle}>DJ</h3>
                    <ul>
                        {djsOfTheDay.map((dj) => (
                            <li key={dj.name}>
                                <a href={getBandUrl(dj.name)} className={styles.bandLink}>
                                    <div className={styles.rootContainer}>
                                        <div className={styles.imageContainer}>
                                            <img
                                                src={dj.image}
                                                alt={dj.name}
                                                className={styles.bandImage}
                                            />
                                        </div>
                                        <div className={styles.textContainer}>
                                            <h3 className={styles.bandName}>{dj.name}</h3>
                                            <p className={styles.bandHour}>{dj.hour} - {dj.style}</p>
                                            <p className={styles.bandHour} style={{ textDecoration: 'underline' }}>Descubre más sobre {dj.name}  &gt;</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Sección Bandas */}
            {bandsOfTheDay.length > 0 && (
                <div className={styles.bandsSection}>
                    <h3 className={styles.sectionTitle}>Bandas</h3>
                    <ul>
                        {bandsOfTheDay.map((band) => (
                            <li key={band.name}>
                                <a href={getBandUrl(band.name)} className={styles.bandLink}>
                                    <div className={styles.rootContainer}>
                                        <div className={styles.imageContainer}>
                                            <img
                                                src={band.image}
                                                alt={band.name}
                                                className={styles.bandImage}
                                            />
                                        </div>
                                        <div className={styles.textContainer}>
                                            <h3 className={styles.bandName}>{band.name}</h3>
                                            <p className={styles.bandHour}>{band.hour} - {band.style}</p>
                                            <p className={styles.bandHour} style={{ textDecoration: 'underline' }}>Descubre más sobre {band.name}  &gt;</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export { LineupItems }