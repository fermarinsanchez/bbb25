import React from 'react';
import styles from './Typography.module.css';

type TypographyVariant =
    | 'body'
    | 'body-strong'
    | 'headline-1'
    | 'headline-2'
    | 'headline-3'
    | 'headline-4'
    | 'headline-5';

interface TypographyProps {
    variant: TypographyVariant;
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}

const defaultElements = {
    'body': 'p',
    'body-strong': 'p',
    'headline-1': 'h1',
    'headline-2': 'h2',
    'headline-3': 'h3',
    'headline-4': 'h4',
    'headline-5': 'h5',
} as const satisfies Record<TypographyVariant, React.ElementType>;

export function Typography({
    variant,
    children,
    className,
    as
}: TypographyProps) {
    const Component = as || defaultElements[variant];

    return React.createElement(Component, {
        className: `${styles.typography} ${styles[`typography--${variant}`]} ${className || ''}`.trim()
    }, children);
} 