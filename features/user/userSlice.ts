import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  name: "",
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action: PayloadAction<{ name: string }>) {
      state.loading = false;
      state.name = action.payload.name;
    },
    fetchUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure } =
  userSlice.actions;

export default userSlice.reducer;
