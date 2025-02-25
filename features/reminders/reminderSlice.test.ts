// features/reminders/reminderSlice.test.ts
import reminderReducer, {
  fetchRemindersRequest,
  fetchRemindersSuccess,
} from './reminderSlice'

describe('reminderSlice', () => {
  it('should handle fetchRemindersRequest', () => {
    const initialState = { data: [], loading: false, error: null }
    const nextState = reminderReducer(initialState, fetchRemindersRequest())
    expect(nextState.loading).toBe(true)
  })

  it('should handle fetchRemindersSuccess', () => {
    const initialState = { data: [], loading: true, error: null }
    const payload = [{ title: 'Test', date: '2025-02-19' }]
    const nextState = reminderReducer(initialState, fetchRemindersSuccess(payload))
    expect(nextState.data).toHaveLength(1)
    expect(nextState.loading).toBe(false)
  })
})
