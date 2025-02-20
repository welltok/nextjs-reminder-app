import { all, fork } from 'redux-saga/effects'
import { watchUserSaga } from '@/features/user/userSaga'
import { watchAuthSaga } from '@/features/auth/authSaga'

export function* rootSaga() {
  yield all([
    fork(watchAuthSaga),
    fork(watchUserSaga),
    // fork(watchAnotherSaga),
  ]);
}
