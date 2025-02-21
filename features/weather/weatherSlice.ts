import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface weatherState {
    message: string;
    loading: boolean;
    error: string | null;
    data: object | null;
}

const initialState: weatherState = {
    message: "",
    loading: false,
    error: null,
    data: {}
};

const mappedWeatherData = (data) => ({
    temperature: data.main.temp, // Celsius
    feelsLike: data.main.feels_like, // Celsius
    city: data.name,
    condition: data.weather[0].description,
    iconSrc: data.weather[0].icon,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    timezoneOffset: data.timezone,
    forecast: [
      { day: "Tomorrow", high: 30, low: 20, iconSrc: "01d" },
      { day: "Sunday", high: 32, low: 18, iconSrc: "02d" },
      { day: "Monday", high: 28, low: 16, iconSrc: "03d" },
      { day: "Tuesday", high: 25, low: 14, iconSrc: "04d" },
      { day: "Wednesday", high: 27, low: 19, iconSrc: "10d" },
    ],
  })


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
            state.data = mappedWeatherData(action.payload)
        },
        fetchWeatherFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchWeatherFailure, fetchWeatherStart, fetchWeatherSuccess } = weatherSlice.actions;

export default weatherSlice.reducer;
