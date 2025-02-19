// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
// import someSlice from './someSlice'; // Example slice
import userSlice from '../features/user/userSlice'

const rootReducer = combineReducers({
  user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;