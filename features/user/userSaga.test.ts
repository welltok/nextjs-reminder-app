// features/user/userSaga.test.ts
import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";
import { watchUserSaga } from "./userSaga";
import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from "./userSlice";
import { mockFetchUserApi } from "./userSaga"; // If it's exported

describe("userSaga", () => {
  it("should fetch user successfully", () => {
    const mockResponse = { name: "John Doe" };

    return expectSaga(watchUserSaga)
      .provide([[call(mockFetchUserApi), mockResponse]])
      .dispatch(fetchUserStart()) // triggers the saga
      .put(fetchUserSuccess(mockResponse))
      .silentRun();
  });

  it("should handle fetch user failure", () => {
    const errorMessage = "API failed";

    return expectSaga(watchUserSaga)
      .provide([
        [call(mockFetchUserApi), Promise.reject(new Error(errorMessage))],
      ])
      .dispatch(fetchUserStart())
      .put(fetchUserFailure(errorMessage))
      .silentRun();
  });
});
