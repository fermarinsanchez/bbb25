import React from 'react';
import { Typography } from './Typography';
import styles from './FontTest.module.css';

export function FontTest() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Test con CSS Modules: Plus Jakarta Sans
            </h1>

            <Typography variant="headline-1">
                Test con componente Typography: Título H1
            </Typography>

            <Typography variant="body">
                Este es un párrafo de prueba usando el componente Typography con la variante "body".
                Debería mostrar Plus Jakarta Sans en peso regular (400) y tamaño 16px.
            </Typography>

            <p className={styles.paragraph}>
                Test directo con CSS Modules: Este texto también debería usar Plus Jakarta Sans.
            </p>

            <div className={styles.weightsContainer}>
                <p className={`${styles.weightItem} ${styles.weightLight}`}>Light (200)</p>
                <p className={`${styles.weightItem} ${styles.weightNormal}`}>Normal (400)</p>
                <p className={`${styles.weightItem} ${styles.weightMedium}`}>Medium (500)</p>
                <p className={`${styles.weightItem} ${styles.weightSemibold}`}>Semibold (600)</p>
                <p className={`${styles.weightItem} ${styles.weightBold}`}>Bold (700)</p>
                <p className={`${styles.weightItem} ${styles.weightExtrabold}`}>Extrabold (800)</p>
            </div>
        </div>
    );
} 