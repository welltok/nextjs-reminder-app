import { takeLatest, call, put, select } from "redux-saga/effects";
import {
  fetchRemindersRequest,
  fetchRemindersSuccess,
  fetchRemindersFailure,
  createReminderRequest,
  deleteReminderRequest,
  updateReminderRequest,
  completeReminderRequest,
} from "./reminderSlice";

const selectAuthToken = (state) => state.auth.token;

// 🔹 Reusable API call function with auth
export function* authenticatedFetch(url: string, options: RequestInit = {}) {
  const token: string = yield select(selectAuthToken);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers, // Allow additional headers if needed
  };

  const response = yield fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
  return yield response.json();
}

function* handleFetchReminders() {
  try {
    const response = yield call(() => authenticatedFetch("/api/reminder"));
    yield put(fetchRemindersSuccess(response.reminders));
  } catch (error: any) {
    yield put(fetchRemindersFailure(error.message));
  }
}

// 🔹 Create a new reminder (POST)
function* handleCreateReminder(action: { type: string; payload: any }) {
  try {
    yield call(() =>
      authenticatedFetch("/api/reminder", {
        method: "POST",
        body: JSON.stringify(action.payload),
      })
    );
    yield put(fetchRemindersRequest()); // Refresh list
  } catch (error: any) {
    console.error("Create Reminder Error:", error.message);
  }
}

// 🔹 Delete a reminder (DELETE)
function* handleDeleteReminder(action: { type: string; payload: string }) {
  try {
    console.log('action',action)
    yield call(() => authenticatedFetch(`/api/reminder/${action.payload}`, { method: "DELETE" }));
    yield put(fetchRemindersRequest()); // Refresh list
  } catch (error: any) {
    console.error("Delete Reminder Error:", error.message);
  }
}

// 🔹 Update a reminder (PUT)
function* handleUpdateReminder(action: { type: string; payload: { id: string; updatedReminder: any } }) {
  try {
    yield call(() =>
      authenticatedFetch(`/api/reminder/${action.payload.id}`, {
        method: "PUT",
        body: JSON.stringify(action.payload.updatedReminder),
      })
    );
    yield put(fetchRemindersRequest()); // Refresh list
  } catch (error: any) {
    console.error("Update Reminder Error:", error.message);
  }
}

// 🔹 Mark a reminder as completed (PATCH)
function* handleCompleteReminder(action: { type: string; payload: string }) {
  try {
    yield call(() =>
      authenticatedFetch(`/api/reminder/${action.payload}`, {
        method: "PUT",
        body: JSON.stringify({ status: "completed" }),
      })
    );
    yield put(fetchRemindersRequest()); // Refresh list
  } catch (error: any) {
    console.error("Complete Reminder Error:", error.message);
  }
}

// 🔹 Watcher Saga
export function* watchReminderSaga() {
  yield takeLatest(fetchRemindersRequest.type, handleFetchReminders);
  yield takeLatest(createReminderRequest.type, handleCreateReminder);
  yield takeLatest(deleteReminderRequest.type, handleDeleteReminder);
  yield takeLatest(updateReminderRequest.type, handleUpdateReminder);
  yield takeLatest(completeReminderRequest.type, handleCompleteReminder);
}
