import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Reminder {
  _id: string;
  dueDate: string;
  title: string;
  description: string;
  status: "overdue" | "to-do" | "completed";
}

interface RemindersState {
  data: Reminder[];
  loading: boolean;
  error: string | null;
}

const initialState: RemindersState = {
  data: [],
  loading: false,
  error: null,
};

const reminderSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    fetchRemindersRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRemindersSuccess(state, action: PayloadAction<Reminder[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchRemindersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createReminderRequest(state, action: PayloadAction<Reminder>) {
      state.loading = true;
    },
    deleteReminderRequest(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    updateReminderRequest(state, action: PayloadAction<{ id: string; updatedReminder: Reminder }>) {
      state.loading = true;
    },
    completeReminderRequest(state, action: PayloadAction<string>) {
      state.loading = true;
    },
  },
});

export const {
  fetchRemindersRequest,
  fetchRemindersSuccess,
  fetchRemindersFailure,
  createReminderRequest,
  deleteReminderRequest,
  updateReminderRequest,
  completeReminderRequest,
} = reminderSlice.actions;

export default reminderSlice.reducer;
