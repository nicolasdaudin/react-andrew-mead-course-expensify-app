import {login,logout} from '../../actions/auth';

test('should set login action', () => {
  const result = login('123abc');
  expect(result).toEqual({
    type:'LOGIN',
    uid : '123abc'
  })
})

test('should set logoug action', () => {
  const result = logout();
  expect(result).toEqual({
    type:'LOGOUT'
  })
})