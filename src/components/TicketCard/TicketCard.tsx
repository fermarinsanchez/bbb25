import React from 'react'
import styles from './TicketCard.module.css'
import { Typography } from '../Typography'
import MonsterTicketFriday from '../../assets/monsters/monster_1_suelto.svg'
import MonsterTicketBoth from '../../assets/monsters/monster-ticket-both.svg'
import GirlHead from '../../assets/monsters/girl-head.svg'
import MonsterGirlAmp from '../../assets/monsters/monster-girl-with-amp.svg'
import MonsterBoyAmp from '../../assets/monsters/monster-boy-with-amp.svg'
import { Button } from 'react-aria-components'
import { useBreakpoints } from '../../hooks/use-breakpoints'


type TicketCardProps = {
    variant: 'friday' | 'saturday' | 'both' | 'child'
}

// Función para trackear clics en botones de compra
const trackTicketClick = (ticketType: string, price: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
            event: 'ticket_click',
            ticket_type: ticketType,
            ticket_price: price,
            page_location: window.location.href,
            page_title: document.title
        });
    }
};

const TicketCard = ({ variant }: TicketCardProps) => {
    const { isAbove } = useBreakpoints()

    const isDesktop = isAbove('md') // 768px y superior


    if (variant === 'friday') {
        return (<div className={styles.root}>
            <div className={styles.textContainerLeft}>
                <Typography variant='headline-4' className={styles.header}>Entrada Viernes 26</Typography>
                {isDesktop && <Typography variant='body' className={styles.header}>Mueve el esqueleto con potentes conciertazos</Typography>}
                <Typography variant='headline-3' className={styles.price}>10€</Typography>
            </div>
            <div className={styles.monsterFriday}>
                <img src={isDesktop ? MonsterBoyAmp.src : MonsterTicketFriday.src} alt='monster ticket friday' />
            </div>
            <Button
                className={styles.ctaFriday}
                onPress={() => trackTicketClick('friday', '10€')}
            >
                <a
                    style={{ textDecoration: 'none', color: 'black' }}
                    href='https://toledoentradas.es/eventos/balambamboo-fest-iernes-26/'
                    target='_blank'
                >
                    Comprar ahora
                </a>
            </Button>
        </div>)
    }
    if (variant === 'saturday') {
        return (<div className={styles.rootSaturday}>
            <div className={styles.textContainerLeft}>
                <Typography variant='headline-4' className={styles.header}>Entrada Sábado 27</Typography>
                {isDesktop && <Typography variant='body' className={styles.header}>Disfruta de una jornada de conciertos, actividades, markets y mucha diversión</Typography>}
                <Typography variant='headline-3' className={styles.price}>20€</Typography>
            </div>
            <div className={styles.monsterSaturday}>
                <img src={isDesktop ? MonsterBoyAmp.src : MonsterTicketFriday.src} alt='monster ticket friday' />
            </div>
            <Button
                className={styles.cta}
                onPress={() => trackTicketClick('saturday', '20€')}
            >
                <a
                    style={{ textDecoration: 'none', color: 'black' }}
                    href='https://toledoentradas.es/eventos/balambamboo-fest-sabado-27/'
                    target='_blank'
                >
                    Comprar ahora
                </a>
            </Button>
        </div>)
    }

    if (variant === 'both') {
        return (<div className={styles.rootBoth}>
            <div className={styles.label}>Oferta recomendada</div>
            <div className={styles.textContainerLeft}>
                <Typography variant='headline-4' className={styles.header}>Bono dos días</Typography>
                {isDesktop && <Typography variant='body' className={styles.header}>¡Dos días, doble fiestón! Nos encantaría verte ambos días</Typography>}
                <Typography variant='headline-3' className={styles.price}>25€</Typography>
            </div>
            <div className={styles.monsterBoth}>
                <img src={isDesktop ? MonsterGirlAmp.src : MonsterTicketBoth.src} alt='monster ticket friday' />
            </div>
            <Button
                className={styles.cta}
                onPress={() => trackTicketClick('both', '25€')}
            >
                <a
                    style={{ textDecoration: 'none', color: 'black' }}
                    href='https://toledoentradas.es/eventos/balambamboo-fest-abono-2-dias/'
                    target='_blank'
                >
                    Comprar ahora
                </a>
            </Button>
        </div>)
    }

    if (variant === 'child') {
        return (<div className={styles.rootChild}>
            <div className={styles.textContainerLeft}>
                <Typography variant='headline-4' className={styles.header}>Entrada menor adicional</Typography>
                {isDesktop && <Typography variant='body' className={styles.explanation}>Para que puedas entrar con más de dos menones.</Typography>}
                <Typography variant='headline-3' className={styles.price}>10€</Typography>
            </div>
            <div className={styles.monsterChild}>
                <img src={isDesktop ? MonsterGirlAmp.src : GirlHead.src} alt='monster ticket child' />
            </div>
            <Button
                className={styles.ctaChild}
                onPress={() => trackTicketClick('child', '10€')}
            >
                <a
                    style={{ textDecoration: 'none', color: 'black' }}
                    href='https://toledoentradas.es/eventos/balambamboo-fest-menor-de-edad/'
                    target='_blank'
                >
                    Comprar ahora
                </a>
            </Button>
        </div>)
    }
}

export { TicketCard }