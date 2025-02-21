import { all, fork } from 'redux-saga/effects'
import { watchAuthSaga } from '@/features/auth/authSaga'
import { watchInspirationSaga } from '@/features/inspiration/inspirationSaga'
import { watchUserSaga } from '@/features/user/userSaga';

export function* rootSaga() {
  yield all([
    fork(watchAuthSaga),
    fork(watchUserSaga),
    fork(watchInspirationSaga),
    // fork(watchAnotherSaga),
  ]);
}
