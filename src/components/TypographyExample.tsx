import React from 'react';
import { Typography } from './Typography';
import styles from './TypographyExample.module.css';

export function TypographyExample() {
    return (
        <div className={styles.container}>
            <Typography variant="headline-1">
                Título Principal (H1)
            </Typography>

            <Typography variant="headline-2">
                Subtítulo Importante (H2)
            </Typography>

            <Typography variant="headline-3">
                Título de Sección (H3)
            </Typography>

            <Typography variant="headline-4">
                Título Menor (H4)
            </Typography>

            <Typography variant="headline-5">
                Título Pequeño (H5)
            </Typography>

            <Typography variant="body">
                Este es un ejemplo de texto de cuerpo usando la variante "body".
                Es regular (400) y tiene un tamaño de 16px. Perfecto para párrafos
                y contenido principal de la página.
            </Typography>

            <Typography variant="body" className={styles.textGray}>
                También puedes agregar clases adicionales para personalizar el estilo,
                como este texto en gris.
            </Typography>

            <Typography variant="headline-3" as="span" className={styles.textBlue}>
                También puedes cambiar el elemento HTML usando la prop "as"
            </Typography>
        </div>
    );
} 