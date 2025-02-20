import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    title: string;
    content: string;
    time: string;
}

const Card: React.FC<CardProps> = ({ title, content, time }) => {
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.titleContainer}`}><p className={styles.title}>{title}</p><p className={styles.time}>{time}</p></div>
            <p className={styles.contentSection}>{content}</p>
        </div>
    );
};

export default Card;
