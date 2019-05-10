import {addExpense,editExpense,removeExpense} from '../../actions/expenses';

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
  const expenseData = {
    description: 'Rent',
    amount: 98000,
    createdAt: 1000,
    note: ''
  };
  const result = addExpense(expenseData);
  expect(result).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  })
})

test('should set up add expense action with defdaukt values',() => {
  const expenseData = {};
  const result = addExpense();
  expect(result).toEqual({
    type:'ADD_EXPENSE',
    expense: {
      description : '',
      note : '',
      createdAt: 0,
      amount:0,
      id: expect.any(String) 
    }
  })

})