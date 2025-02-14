import { call, put, takeLatest } from "redux-saga/effects";
import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from "./userSlice";

// Simulate API call
export function mockFetchUserApi() {
  return new Promise<{ name: string }>((resolve) => {
    setTimeout(() => resolve({ name: "John Doe" }), 1000);
  });
}

function* handleFetchUser() {
  try {
    // 1) Indicate loading
    // (You might already do this in fetchUserStart reducer)
    
    // 2) Call API
    const data: { name: string } = yield call(mockFetchUserApi);

    // 3) Dispatch success
    yield put(fetchUserSuccess(data));
  } catch (error: any) {
    // 4) Dispatch failure
    yield put(fetchUserFailure(error.message));
  }
}

// fetchUserStart.type === "user/fetchUserStart"
// fetchUserStart.type === "sliceName/reducerName"

export function* watchUserSaga() {
  yield takeLatest(fetchUserStart.type, handleFetchUser);
}
