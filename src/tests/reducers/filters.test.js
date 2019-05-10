import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should set up default filter values', () => {
  const state = filtersReducer(undefined, { type : '@@INIT'}); // action launched upon init of app
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate : moment().startOf('month'),
    endDate:moment().endOf('month')
  })

});

test('should set sortby to amount', () => {
  const state = filtersReducer(undefined, { type : 'SORT_BY_AMOUNT'});
  expect(state.sortBy).toBe('amount');
})

test('should set sortby to date', () => {
  const state = {
    text: '',
    sortBy : 'amount',
    startDate: moment().startOf('month'),
    endDate:moment().endOf('month')
  }
  const newstate = filtersReducer(state, { type : 'SORT_BY_DATE'});
  expect(newstate.sortBy).toBe('date');
})

// test('should set text filter')
test('should set text filter', () => {
  const text = 'testfilter'
  const action = { type : 'SET_TEXT_FILTER', text}
  const state = filtersReducer(undefined,action);
  expect(state.text).toBe('testfilter');
})

// test('should set start Date')
test('should set start date filter', () => {
  const currentState = {
    text : '',
    sortBy: 'date',
    startDate:undefined,
    endDate:undefined
  }
  const action = {type : 'SET_START_DATE',startDate: moment().startOf('day').add(2,'days')}
  const state = filtersReducer(currentState,action);
  expect(state.startDate).toEqual(moment().startOf('day').add(2,'days'));
})

// test('should set end date filter')
test('should set end date filter', () => {
  const currentState = {
    text : '',
    sortBy: 'date',
    startDate:undefined,
    endDate:undefined
  }
  const action = {type : 'SET_END_DATE',endDate: moment().endOf('day').add(2,'days')}
  const state = filtersReducer(currentState,action);
  expect(state.endDate).toEqual(moment().endOf('day').add(2,'days'));
})