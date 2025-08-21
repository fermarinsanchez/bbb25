import React from 'react';
import { Checkbox } from 'react-aria-components';
import styles from './Checkbox.module.css';

interface CheckboxProps {
    children: React.ReactNode;
    isSelected?: boolean;
    onChange?: (isSelected: boolean) => void;
}

export default function AriaCheckbox({ children, isSelected, onChange }: CheckboxProps) {
    return (
        <Checkbox
            isSelected={isSelected}
            onChange={onChange}
            className={styles.checkbox}
        >
            <div
                className={styles.box}
                data-selected={isSelected}
            >
                <svg
                    className={styles.icon}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <span className={styles.label}>{children}</span>
        </Checkbox>
    );
} 