import React, { useState } from "react";
import RemindersList from "./RemindersList";
import remindersCSS from './reminders.module.css'
interface Reminder {
  _id: string;
  dueDate: string;
  title: string;
  description: string;
  status: "overdue" | "to-do" | "completed";
}

interface RemindersProps {
  reminders: Array<Reminder>;
  onViewCompleted: () => void;
  onCreateNew: (newReminder: Reminder) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedReminder: Reminder) => void;
  onComplete: (id: string) => void;
}

export default function Reminders({
  reminders,
  // onViewCompleted,
  onCreateNew,
  onDelete,
  onEdit,
  onComplete,
}: RemindersProps) {
  const [newReminder, setNewReminder] = useState({
    date: "",
    title: "",
    description: "",
  });

  const handleAddReminder = () => {
    if (!newReminder.date || !newReminder.title) return;
    onCreateNew({
      _id: String(Date.now()),
      dueDate: newReminder.date,
      title: newReminder.title,
      description: newReminder.description,
      status: "to-do",
    });
    setNewReminder({ date: "", title: "", description: "" });
  };

  console.log('reminders', reminders)

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Reminders: {reminders.length}</h4>
        <div className={remindersCSS.remindersButtons}>
          {/* <button className="btn btn-outline-primary me-2" onClick={onViewCompleted}>
            View Completed
          </button> */}
          <button className="btn btn-primary" onClick={handleAddReminder}>
            Create New
          </button>
        </div>
      </div>

      {/* New Reminder Form */}
      <div className="border p-3 mb-3 rounded">
        <input
          type="date"
          className="form-control mb-2"
          value={newReminder.date}
          onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Add Description*"
          value={newReminder.title}
          onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Add Note"
          value={newReminder.description}
          onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
        />
      </div>

      {/* Render Reminder List */}
      <RemindersList reminders={reminders} onDelete={onDelete} onEdit={onEdit} onComplete={onComplete} />
    </div>
  );
}
