// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '@/features/user/userSlice'
import AuthSlice from '@/features/auth/authSlice'
import InspirationSlice from '@/features/inspiration/inspirationSlice'
import weatherSlice from '@/features/weather/weatherSlice'
import reminderslice from '@/features/reminders/reminderSlice'

const rootReducer = combineReducers({
  user: userSlice,
  auth: AuthSlice,
  inspiration: InspirationSlice,
  weather: weatherSlice,
  reminders: reminderslice
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
