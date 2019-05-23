import authReducer from '../../reducers/auth';

test('should set uid for login', () => {
  const action = {
    uid : '123abc',
    type: 'LOGIN'
  }
  const state = authReducer({},action);
  expect(state.uid).toEqual(action.uid);
});

test('should clear uid for logout', () => {
  const action = {
    type: 'LOGOUT'
  }
  const state = authReducer({uid:'123abc'},action);
  expect(state).toEqual({});
});