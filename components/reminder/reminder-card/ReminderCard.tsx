import React from "react";
import styles from "./ReminderCard.module.css";
import Image from "next/image";
import { convertUnixToDate } from "@/components/weather/WeatherCard";

interface ReminderCardProps {
  content: string;
  status: string;
  date: string;
  contentTitle: string;
  onDelete: () => void;
  onEdit: () => void;
  onComplete: () => void;
}

const ReminderCard: React.FC<ReminderCardProps> = ({ date, status, content, contentTitle, onDelete, onEdit, onComplete }) => {
  return (
    <div className={`${styles.container} ${status.toLowerCase()  === "Overdue" ? styles.overdueBorder : ""} ${status.toLowerCase() === "completed" ? styles.statusContainerComplete : ""}`}>
      <div className={`${styles.header}`}>
        <div className={`${styles.leftHeader}`}>
          <Image className={styles.iconSection} src="/icons/star.svg" alt="star-icon" width={15} height={15} />
          <p className={styles.date}>{convertUnixToDate(date)}</p>
          <span className={`${styles.status} ${status === "Overdue" ? styles.overdueBadge : ""} ${status.toLowerCase() === "completed" ? styles.statusComplete : ""}`}>{status}</span>
        </div>
        <div className={`${styles.rightHeader}`}>
          <Image className={styles.iconSection} src="/icons/delete-icon.svg" alt="delete-icon" width={25} height={15} onClick={onDelete} />
          <Image className={styles.iconSection} src="/icons/edit-icon.svg" alt="edit-icon" width={25} height={20} onClick={onEdit} />
          <Image className={styles.iconSection} src="/icons/success-icon.svg" alt="success-icon" width={25} height={20} onClick={onComplete} />
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
