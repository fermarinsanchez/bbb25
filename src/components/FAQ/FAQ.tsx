import { useState } from 'react';
import styles from './FAQ.module.css';
import { Typography } from '../Typography';

export interface FAQItem {
    question: string;
    answer: string[];
}

interface FAQProps {
    items: FAQItem[];
    title?: string;
}

export function FAQ({ items, title = "Preguntas Frecuentes" }: FAQProps) {
    const [openItems, setOpenItems] = useState<Set<number>>(new Set());

    const toggleItem = (index: number) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(index)) {
            newOpenItems.delete(index);
        } else {
            newOpenItems.add(index);
        }
        setOpenItems(newOpenItems);
    };

    return (
        <div className={styles.faqContainer}>
            {title && <Typography variant="headline-4" className={styles.faqTitle}>{title}</Typography>}

            <div className={styles.faqList}>
                {items.map((item, index) => {
                    const isOpen = openItems.has(index);

                    return (
                        <div key={index} className={styles.faqItem}>
                            <button
                                className={styles.questionButton}
                                onClick={() => toggleItem(index)}
                                aria-expanded={isOpen}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <span className={styles.question}>{item.question}</span>
                                <svg
                                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M6 9L12 15L18 9"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            <div
                                id={`faq-answer-${index}`}
                                className={`${styles.answer} ${isOpen ? styles.answerOpen : ''}`}
                                aria-hidden={!isOpen}
                            >
                                {item.answer.map((line, lineIndex) => (
                                    <p key={lineIndex} className={styles.answerLine}>
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 