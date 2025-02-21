import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InspirationState {
    message: string;
    loading: boolean;
    error: string | null;
}

const initialState: InspirationState = {
    message: "",
    loading: false,
    error: null,
};

const inspirationSlice = createSlice({
    name: "inspiration",
    initialState,
    reducers: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fetchInspirationStart(state, action: PayloadAction<{latitude: number; longitude: number}>) {
            state.loading = true;
            state.error = null;
        },
        fetchInspirationSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.message = action.payload;
        },
        fetchInspirationFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchInspirationFailure, fetchInspirationStart, fetchInspirationSuccess } = inspirationSlice.actions;

export default inspirationSlice.reducer;
