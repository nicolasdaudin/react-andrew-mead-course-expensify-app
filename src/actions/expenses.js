import uuid from 'uuid';
import db from '../firebase/firebase';


// AFTER INTEGRATING FIREBASE - ASYNC REDUX ACTIONS
// component calls action generator
// action generators returns functions
// component dispatches function (?)
// function runs (has ability to dispatch other actions and do whatever it wants )

export const startAddExpense = (expenseData = {}) => {
  return (dispatch,getState) => {
    const uid = getState().auth.uid;
    const { description = '', note = '', amount = 0, createdAt = 0 } = expenseData;
    const expense = { description, note, amount, createdAt }
    
    return db.ref(`users/${uid}/expenses`).push(expense).then ( (ref) => {
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
export const removeExpense = ({id} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({id} = {}) => {
  return (dispatch,getState) => {
    const uid = getState().auth.uid;
    return db.ref(`users/${uid}/expenses/${id}`).remove().then( () => {
      dispatch(removeExpense({id}))
    })
  }
}

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
})

export const startSetExpenses = () => {
  return (dispatch,getState) => {
    const uid = getState().auth.uid;
    return db.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
      const expenses = [];
      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      });

      dispatch(setExpenses(expenses));
    });
  };
};

export const startEditExpense = (id,updates) => {
  return (dispatch,getState) => {
    const uid = getState().auth.uid;
    return db.ref(`users/${uid}/expenses/${id}`).update(updates).then ( () => {
      dispatch(editExpense(id,updates))
    })
  }
}