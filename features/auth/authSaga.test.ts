import { testSaga } from 'redux-saga-test-plan';
import { fetchAuthStart, fetchAuthSuccess, fetchAuthFailure } from './authSlice';
import { handleLogin } from './authSaga';

describe('handleLogin saga', () => {
  const payload = { email: 'test@example.com', password: 'password' };

  it('should handle successful login', () => {
    const fakeResponse = {
      status: 201,
      json: () => ({ access_token: 'token123' }),
    };
    const data = { access_token: 'token123' };

    testSaga(handleLogin, fetchAuthStart(payload))
      .next()
      .call(fetch, '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      .next(fakeResponse)
      .next(data)
      .put(fetchAuthSuccess(data.access_token))
      .next()
      .isDone();
  });

  it('should handle unauthorized login (status 401)', () => {
    testSaga(handleLogin, fetchAuthStart(payload))
      .next()
      .call(fetch, '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      // Simulate a response with status 401
      .next({ status: 401 })
      .put(fetchAuthFailure('Invalid username or password'))
      .next()
      .isDone();
  });

  it('should handle unexpected error (non-201/401 status)', () => {
    testSaga(handleLogin, fetchAuthStart(payload))
      .next()
      .call(fetch, '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      // Simulate a response with a status other than 201 or 401 (e.g. 500)
      .next({ status: 500 })
      .put(fetchAuthFailure('Unexpected error occurred'))
      .next()
      .isDone();
  });

  it('should handle network error', () => {
    const error = new Error('Network error');
    testSaga(handleLogin, fetchAuthStart(payload))
      .next()
      .call(fetch, '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      // Simulate a network error by throwing the error in the saga.
      .throw(error)
      .put(fetchAuthFailure('Network error occurred'))
      .next()
      .isDone();
  });
});
