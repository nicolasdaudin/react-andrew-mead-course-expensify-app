import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { startAddExpense, startSetExpenses, addExpense, editExpense, removeExpense, setExpenses, startRemoveExpense, startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'thisismyuidfortests';
const defaultAuthState = {auth: {uid}}

beforeEach ((done) => {
  const expensesData = {};
  expenses.forEach( ( {id,description,note,amount,createdAt}) => {
    expensesData[id] = {description,note,amount,createdAt};
   } );
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => {done()});
});

test('should setup remove expense action',() => {
  const action = removeExpense({id: '123abc'});
  expect(action).toEqual({
    type:'REMOVE_EXPENSE',
    id:'123abc'
  })
});

test('should remove expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  store.dispatch(startRemoveExpense({id})).then( () => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type:'REMOVE_EXPENSE',
      id
    })

    return database.ref(`users/${uid}/expenses/${actions[0].id}`).once('value')
  }).then( (snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  })
})

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

test('should edit expense in firebase',(done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[1].id;
  const updates = {
    description: 'New desc',
    note:'New note'
  }
  store.dispatch(startEditExpense(id,updates)).then( () => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type:'EDIT_EXPENSE',
      id,
      updates
    })

    return database.ref(`users/${uid}/expenses/${id}`).once('value')
  }).then ( (snapshot) => {
    expect(snapshot.val()).toEqual({
      amount: expenses[1].amount,
      createdAt: expenses[1].createdAt,
      description: 'New desc',
      note: 'New note'
    })
    done();
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
  const store = createMockStore(defaultAuthState);
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

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
  }).then( (snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
})

test('should add expense with default values to dabatabase and store',(done) => {
  const store = createMockStore(defaultAuthState);
  
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

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
  }).then( (snapshot) => {
    expect(snapshot.val()).toEqual({description: '',
      amount: 0,
      note: '',
      createdAt: 0});
    done();
  });
})

test('should set up set expenses action with data ',() => {
  const result = setExpenses(expenses);
  expect(result).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then( () => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type:'SET_EXPENSES',
      expenses
    });
    done();

  })
})


