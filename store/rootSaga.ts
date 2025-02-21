import { all, fork } from 'redux-saga/effects'
//import { watchUserSaga } from '@/features/user/userSaga'
import { watchAuthSaga } from '@/features/auth/authSaga'
import { watchInspirationSaga } from '@/features/inspiration/inspirationSaga'
import { watchWeatherSaga } from '@/features/weather/weatherSaga'

export function* rootSaga() {
  yield all([
    fork(watchAuthSaga),
    //fork(watchUserSaga),
    fork(watchInspirationSaga),
    fork(watchWeatherSaga)
    // fork(watchAnotherSaga),
  ]);
}
