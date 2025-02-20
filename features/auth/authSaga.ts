import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchAuthStart, fetchAuthSuccess, fetchAuthFailure } from './authSlice';

function* handleLogin(action: ReturnType<typeof fetchAuthStart>) {
    try {
        const response: Response = yield call(fetch, 'http://localhost:3080/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action.payload),
        });

        if (response.status === 201) {
            // @ts-ignore
            const data = yield response.json();
            yield put(fetchAuthSuccess(data.access_token));
            console.log('Login successful');
        } else if (response.status === 401) {
            console.log('Login failed: Unauthorized');
            yield put(fetchAuthFailure('Invalid username or password'));
        } else {
            console.log('Login failed: Unexpected error');
            yield put(fetchAuthFailure('Unexpected error occurred'));
        }
    } catch (error) {
        console.log('Login failed: Network error', error);
        yield put(fetchAuthFailure('Network error occurred'));
    }
}

export function* watchAuthSaga() {
    yield takeLatest(fetchAuthStart.type, handleLogin);
}
