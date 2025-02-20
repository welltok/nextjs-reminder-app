// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
// import someSlice from './someSlice'; // Example slice
import userSlice from '../features/user/userSlice'
import AuthSlice from '../features/auth/authSlice'
import InspirationSlice from '../features/inspiration/inspirationSlice'

const rootReducer = combineReducers({
  user: userSlice,
  auth: AuthSlice,
  inspiration: InspirationSlice
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
