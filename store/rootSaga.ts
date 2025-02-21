import { all, fork } from 'redux-saga/effects'
import { watchAuthSaga } from '@/features/auth/authSaga'
import { watchInspirationSaga } from '@/features/inspiration/inspirationSaga'
import { watchUserSaga } from '@/features/user/userSaga';
import { watchWeatherSaga } from '@/features/weather/weatherSaga'

export default function* rootSaga() {
  yield all([
    fork(watchAuthSaga),
    fork(watchUserSaga),
    fork(watchInspirationSaga),
    fork(watchWeatherSaga)
  ]);
}
