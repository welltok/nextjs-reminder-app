import React from 'react';
import styles from './Notification.module.css';
import Image from 'next/image'

interface NotificationProps {
    type: 'success' | 'fail';
    message: string;
}

const Notification: React.FC<NotificationProps> = ({ type, message }) => {
    return (
        <div className={`${styles.notification} ${styles[type]}`}>
            <div className= {styles.iconBackground}>
                <Image className={styles.iconSection}
                       src="/icons/info.svg"
                       alt="Info icon"
                       width={24}
                       height={24}
                />
            </div>
            <span className={styles.messageSection}>{message}</span>
        </div>
    );
};

export default Notification;
