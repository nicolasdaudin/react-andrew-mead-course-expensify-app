import uuid from 'uuid';
import db from '../firebase/firebase';


// AFTER INTEGRATING FIREBASE - ASYNC REDUX ACTIONS
// component calls action generator
// action generators returns functions
// component dispatches function (?)
// function runs (has ability to dispatch other actions and do whatever it wants )

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const { description = '', note = '', amount = 0, createdAt = 0 } = expenseData;
    const expense = { description, note, amount, createdAt }
    
    return db.ref('expenses').push(expense).then ( (ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }))
    })
  }
}

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

// BEFORE INTEGRATING FIREBASE - "normal actions"
// component calls action generator
// action generators returns object
// component dispatches object
// redux store changes

// ADD_EXPENSE
// export const addExpense = (
//   {
//     description = '',
//     note = '',
//     amount = 0,
//     createdAt = 0
//   } = {}
// ) => ({
//   type: 'ADD_EXPENSE',
//   expense: {
//     id: uuid(),
//     description,
//     note,
//     amount,
//     createdAt
//   }
// });

// EDIT_EXPENSE
export const editExpense = (id,updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

// REMOVE_EXPENSE
export const removeExpense = ({id}) => ({
  type: 'REMOVE_EXPENSE',
  id
});