import authReducer, { 
  fetchAuthStart, 
  fetchAuthSuccess, 
  fetchAuthFailure, 
  authLogOut 
} from './authSlice';

describe('auth slice', () => {
  const initialState = {
    token: "",
    loading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchAuthStart', () => {
    const action = fetchAuthStart({ email: 'test@test.com', password: '1234' });
    const state = authReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchAuthSuccess', () => {
    const action = fetchAuthSuccess('token123');
    const state = authReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.token).toBe('token123');
  });

  it('should handle fetchAuthFailure', () => {
    const action = fetchAuthFailure('Invalid credentials');
    const state = authReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Invalid credentials');
  });

  it('should handle authLogOut', () => {
    const stateWithToken = { ...initialState, token: 'token123', loading: false };
    const action = authLogOut();
    const state = authReducer(stateWithToken, action);
    expect(state.token).toBe('');
    expect(state.loading).toBe(false);
  });
});
