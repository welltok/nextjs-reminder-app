import { all, fork } from 'redux-saga/effects'
import { watchUserSaga } from '../features/user/userSaga'

export function* rootSaga() {
  yield all([
    fork(watchUserSaga),
    // fork(watchAnotherSaga),
  ]);
}