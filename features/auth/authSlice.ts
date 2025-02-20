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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fetchAuthStart(state, action: PayloadAction<{email: string; password: string}>) {
            state.loading = true;
            state.error = null;
        },
        fetchAuthSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.token = action.payload;
        },
        fetchAuthFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        authLogOut(state) {
            state.loading = false;
            state.token = "";
        }
    },
});

export const { fetchAuthSuccess, fetchAuthStart, fetchAuthFailure, authLogOut } = authSlice.actions;

export default authSlice.reducer;
