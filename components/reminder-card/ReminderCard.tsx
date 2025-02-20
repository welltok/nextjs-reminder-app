import React from 'react';
import styles from './ReminderCard.module.css';
import Image from 'next/image';

interface ReminderCardProps {
    content: string;
    status: string;
    date: string;
    contentTitle: string;
}

const ReminderCard: React.FC<ReminderCardProps> = ({ date, status, content, contentTitle }) => {
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.header}`}>
                <div className={`${styles.leftHeader}`}>
                    <Image className={styles.iconSection}
                        src="/icons/star.svg"
                        alt="star-icon"
                        width={15}
                        height={15}
                    />
                    <p className={styles.date}>{date}</p>
                    <span className={styles.status}>{status}</span>
                </div>
                <div className={`${styles.rightHeader}`}>
                    <Image className={styles.iconSection}
                        src="/icons/delete-icon.svg"
                        alt="star-icon"
                        width={25}
                        height={15}
                    />
                    <Image className={styles.iconSection}
                        src="/icons/edit-icon.svg"
                        alt="star-icon"
                        width={25}
                        height={20}
                    />
                    <Image className={styles.iconSection}
                        src="/icons/success-icon.svg"
                        alt="star-icon"
                        width={25}
                        height={20}
                    />
                </div>
            </div>
<div className={styles.contentSection}>
<p className={styles.contentTitle}>{contentTitle}</p>
<p className={styles.contentBody}>{content}</p>
</div>
        </div>
    );
};


export default ReminderCard;
