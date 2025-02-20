import { call, put, takeLatest, select } from 'redux-saga/effects';
import { fetchInspirationSuccess, fetchInspirationStart, fetchInspirationFailure } from './inspirationSlice';

function* getInspiration(action: ReturnType<typeof fetchInspirationStart>) {
    try {
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        const token = yield select((state: RootState) => state.auth.token);
        const response: Response = yield call(fetch, '/api/inspiration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(action.payload),
        });

        if (response.status === 201) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            const data = yield response.json();
            yield put(fetchInspirationSuccess(data.inspirationalMessage));
            console.log('Message retrieved');
        } else if (response.status === 401) {
            console.log('Retrieval failed: Unauthorized');
            yield put(fetchInspirationFailure('Invalid token'));
        } else {
            console.log('Retrieval failed: Unexpected error');
            yield put(fetchInspirationFailure('Unexpected error occurred'));
        }
    } catch (error) {
        console.log('Retrieval failed: Network error', error);
        yield put(fetchInspirationFailure('Network error occurred'));
    }
}

export function* watchInspirationSaga() {
    yield takeLatest(fetchInspirationStart.type, getInspiration);
}
