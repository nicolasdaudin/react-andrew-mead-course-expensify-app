import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {startAddExpense, addExpense,editExpense,removeExpense, setExpenses} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach ((done) => {
  const expensesData = {};
  expenses.forEach( ( {id,description,note,amount,createdAt}) => {
    expensesData[id] = {description,note,amount,createdAt};
   } );
  database.ref('expenses').set(expensesData).then(() => {done()});
});

test('should setup remove expense action',() => {
  const action = removeExpense({id: '123abc'});
  expect(action).toEqual({
    type:'REMOVE_EXPENSE',
    id:'123abc'
  })
});

test('should setup edit expense action',() => {
  const action = editExpense('123abc',{note: 'New note'});
  expect(action).toEqual({
    type:'EDIT_EXPENSE',
    id:'123abc',
    updates: {
      note:'New note'
    }
  })
})

test('should set up add expense action with provided values',() => {
  const result = addExpense(expenses[2]);
  expect(result).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  })
})

test('should add expense to database and store',(done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'this one is better',
    createdAt: 2222222
  }
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type:'ADD_EXPENSE',
      expense:{
        id:expect.any(String),
        ...expenseData
      }
    })

    return database.ref(`expenses/${actions[0].expense.id}`).once('value')
  }).then( (snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
})

test('should add expense with default values to dabatabase and store',(done) => {
  const store = createMockStore({});
  
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type:'ADD_EXPENSE',
      expense:{
        id:expect.any(String),
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
      }
    })

    return database.ref(`expenses/${actions[0].expense.id}`).once('value')
  }).then( (snapshot) => {
    expect(snapshot.val()).toEqual({description: '',
      amount: 0,
      note: '',
      createdAt: 0});
    done();
  });
})

test('should set up set expenses action ',() => {
  const result = setExpenses(expenses);
  expect(result).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
})