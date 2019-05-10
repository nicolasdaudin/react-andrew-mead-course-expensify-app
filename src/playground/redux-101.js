import { createStore} from 'redux';


// const add = ( { a, b } ) => {
//   return a + b 
// }
// console.log('add',add({ a:4, b:23 }));


// before destructuring
// const incrementCount = (payload = {}) => ({
//   type: 'INCREMENT',
//   incrementBy : typeof payload.incrementBy === 'number' ? payload.incrementBy : 1 
// });

// after destructuring
const incrementCount = ({incrementBy = 1} = {}) => ({
  type: 'INCREMENT',
  incrementBy // : incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type : 'DECREMENT',
    decrementBy 
})

const setCount = ({count}) => ({
  type:'SET',
  count
})

const resetCount = () => ({
  type:'RESET'
})

// Reducers
const countReducer = (state = {count : 0},action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count : state.count + action.incrementBy}
    case 'RESET':
      return { count : 0}
    case 'SET':
      return { count : action.count}
    case 'DECREMENT':      
      return { count : state.count - action.decrementBy}
    default:
      return state;
  }
};

const store = createStore( countReducer );

store.subscribe(() => {
  console.log('store changed',store.getState());
})


store.dispatch(incrementCount({incrementBy : 67}));

store.dispatch(incrementCount());

store.dispatch(decrementCount());
store.dispatch(resetCount());



store.dispatch(decrementCount({decrementBy:4}));

store.dispatch(setCount({count:1331}));


store.dispatch(decrementCount());

