import React from 'react';
import { Button } from 'react-aria-components';
import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    onPress?: () => void;
}

export default function AriaButton({ children, variant = 'primary', onPress }: ButtonProps) {
    return (
        <Button
            onPress={onPress}
            className={`${styles.button} ${styles[variant]}`}
        >
            {children}
        </Button>
    );
} 