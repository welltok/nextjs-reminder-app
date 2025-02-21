import { call, put, select, takeLatest } from "redux-saga/effects";
import { fetchUserStart, fetchUserSuccess, fetchUserFailure, addUserRequest, setUsers, fetchUserRequest } from "./userSlice";

function* handleFetchUser() {
  try {
    const token = yield select((state) => state.auth.token);
    const response = yield call(fetch, '/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
   
    const userData: User[] = yield response.json();
    yield put(setUsers(userData?.users));

  } catch (error: any) {
    yield put(fetchUserFailure(error.message));
    console.log({ error });
  }
}

function* handleAddUser(action) {
  try {
    const token = yield select((state) => state.auth.token);
    const response = yield call(fetch, '/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(action.payload),

    });
    console.log({ response })
    yield put(fetchUserRequest())
  } catch (error: any) {
    yield put(fetchUserFailure(error.message));
    console.log({ error })

  }
}

export function* watchUserSaga() {
  yield takeLatest(fetchUserRequest.type, handleFetchUser);
  yield takeLatest(addUserRequest.type, handleAddUser);
}
