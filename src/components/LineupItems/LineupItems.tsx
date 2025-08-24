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
    const bandsOfTheDay = data.filter(band => band.day === day)

    // Función para generar la URL de la banda
    const getBandUrl = (bandName: string) => {
        return buildSiteUrl(`/band/${bandName.toLowerCase().replace(/\s+/g, '-')}`)
    }

    return (<ul>
        {bandsOfTheDay && bandsOfTheDay.map((band) => {
            return (
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
                            </div>
                        </div>
                    </a>
                </li>
            )
        })}
    </ul>)
}

export { LineupItems }