import { all, fork } from 'redux-saga/effects'
import { watchAuthSaga } from '@/features/auth/authSaga'
import { watchInspirationSaga } from '@/features/inspiration/inspirationSaga'
import { watchUserSaga } from '@/features/user/userSaga';
import { watchWeatherSaga } from '@/features/weather/weatherSaga'
import { watchReminderSaga } from '@/features/reminders/reminderSaga'

const list = [watchAuthSaga, watchInspirationSaga, watchUserSaga, watchWeatherSaga, watchReminderSaga]
function forked (listSagas: any) {
  return listSagas.map((saga: any) => fork(saga))
}

export default function* rootSaga() {
  yield all([
    ...forked(list)
  ]);
}
