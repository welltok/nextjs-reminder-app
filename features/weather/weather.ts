import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface weatherState {
    message: string;
    loading: boolean;
    error: string | null;
}

const initialState: weatherState = {
    message: "",
    loading: false,
    error: null,
};

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fetchWeatherStart(state, action: PayloadAction<{latitude: number; longitude: number}>) {
            state.loading = true;
            state.error = null;
        },
        fetchWeatherSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.message = action.payload;
            console.log(action.payload)
        },
        fetchWeatherFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchWeatherFailure, fetchWeatherStart, fetchWeatherSuccess } = weatherSlice.actions;

export default weatherSlice.reducer;
