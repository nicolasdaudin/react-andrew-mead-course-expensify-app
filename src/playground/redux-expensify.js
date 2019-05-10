import {createStore,combineReducers} from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE

const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});



// EDIT_EXPENSE
const editExpense = (id,updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

// REMOVE_EXPENSE
const removeExpense = ({id}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
})
// SET_START_DATE
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
})
// SET_END_DATE
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
})

const expensesReducerDefaultSate = [];

const expensesReducer = (state = expensesReducerDefaultSate,action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state,action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter( ({id}) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id){
          return {
            ...expense,
            ...action.updates 
          }
        } else {
          return expense;
        }
      }) 
    default:
      return state;
  }
}

const filtersReducerDefaultState = { 
  text: '',
  sortBy : 'date',
  startDate: undefined,
  endDate:undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text:action.text
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy:'date'
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy:'amount'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate:action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate:action.endDate
      }
    default: 
      return state;
  }
}

const getVisibleExpenses = (expenses,{text,startDate,endDate,sortBy}) => {
  return expenses.filter( (expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
    const textMatch = text.length === 0 ||  expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b) => {
    if (sortBy === 'date'){ 
      return a.createdAt < b.createdAt ? 1 : -1
    } else if (sortBy === 'amount'){
      return a.amount < b.amount ? 1 : -1 
    } else {
      return 0
    }
  });
}



const store = createStore(
  combineReducers({
    expenses : expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe( () => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
  console.log(visibleExpenses);
})

const expenseOne = store.dispatch(addExpense({description:'Rent',amount:100000,createdAt: 200}));
const expenseTwo = store.dispatch(addExpense({description:'Coffee',amount:5000,createdAt: 1420}));
const expenseThree = store.dispatch(addExpense({description:'Restaurant',amount:300,createdAt: 1401}));

// store.dispatch(removeExpense({id: expenseOne.expense.id}));

// store.dispatch(editExpense(expenseTwo.expense.id,{amount:500}));

//store.dispatch(setTextFilter('rent'));
//store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(223));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1259));

const demoState = {
  expenses: [{
    id: 'fefefefe',
    description : 'January Rent',
    notes: 'Final payment for that flat',
    amount: 54500,
    createdAt:0
  }],
  filters:{
    text: 'rent',
    sortBy: 'amount', //amount or date
    startDate: undefined,
    endDate: undefined

  }
}

// console.log('redux-expensify');

const user = { 
  name:'Jen',
  city:'Madrid'
}
// console.log({...user,city:'Lyon',age:25})