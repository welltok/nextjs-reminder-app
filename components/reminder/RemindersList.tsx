import React from "react";
import ReminderCard from "./reminder-card/ReminderCard";

interface Reminder {
  _id: string;
  dueDate: string;
  title: string;
  description: string;
  status: "overdue" | "to-do" | "completed";
}

interface RemindersListProps {
  reminders: Reminder[];
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedReminder: Reminder) => void;
  onComplete: (id: string) => void;
}

export default function RemindersList({ reminders, onDelete, onEdit, onComplete }: RemindersListProps) {
  if (reminders.length === 0) {
    return <p className="text-muted">No reminders available.</p>;
  }

  return (
    <div>
      {(reminders).map((reminder) => (
        <ReminderCard
          key={reminder._id}
          date={reminder.dueDate}
          status={reminder.status}
          content={reminder.description}
          contentTitle={reminder.title}
          onDelete={() => onDelete(reminder._id)}
          onEdit={() => onEdit(reminder._id, reminder)}
          onComplete={() => onComplete(reminder._id)}
        />
      ))}
    </div>
  );
}
