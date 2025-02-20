import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: "",
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        fetchAuthStart(state, action: PayloadAction<{email: string; password: string}>) {
            state.loading = true;
            state.error = null;
        },
        fetchAuthSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.token = action.payload;
            console.log(action.payload)
        },
        fetchAuthFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchAuthSuccess, fetchAuthStart, fetchAuthFailure } = authSlice.actions;

export default authSlice.reducer;
