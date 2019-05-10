import expensesReducer from '../../reducers/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';

// initial array
test('should set default state', () => {
  const state = expensesReducer(undefined,{type:'@@INIT'});
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    id : expenses[1].id,
    type: 'REMOVE_EXPENSE'
  }
  const state = expensesReducer(expenses,action);
  expect(state).toEqual([expenses[0],expenses[2]])
});

test('should not remove expense by invalid id', () => {
  const action = {
    id : -1,
    type: 'REMOVE_EXPENSE'
  }
  const state = expensesReducer(expenses,action);
  expect(state).toEqual(expenses);
});

test('should add an expense',() => {
  const newexpense = {
    id:'4',  
    description:'Restaurant',  
    note:'',  
    amount:9900,    
    createdAt:moment(0)
  }
  const action = {
    expense : newexpense,
    type: 'ADD_EXPENSE'
  }
  const state = expensesReducer(expenses,action);
  expect(state).toEqual([expenses[0],expenses[1],expenses[2],newexpense])
});

test('should edit an expense with valid id',() => {
  const amount = 22220;
  const action = {
    type:'EDIT_EXPENSE',
    id:expenses[0].id,
    updates: {
      amount
    }
  }
  const state = expensesReducer(expenses,action);
  expect(state[0].amount).toBe(amount); 
});

test('should not edit an expense with unvalid id',() => {
  const amount = 22220;
  const action = {
    type:'EDIT_EXPENSE',
    id:-1,
    updates: {
      amount
    }
  }
  const state = expensesReducer(expenses,action);
  expect(state).toEqual(expenses);
});

