import React from 'react';
import { TextField, Input, Label } from 'react-aria-components';
import styles from './TextField.module.css';

interface TextFieldProps {
    label: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export default function AriaTextField({ label, placeholder, value, onChange }: TextFieldProps) {
    return (
        <TextField
            value={value}
            onChange={onChange}
            className={styles.textField}
        >
            <Label className={styles.label}>{label}</Label>
            <Input
                placeholder={placeholder}
                className={styles.input}
            />
        </TextField>
    );
} 