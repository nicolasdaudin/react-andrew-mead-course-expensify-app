import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';  
import AppRouter from './routers/AppRouter'
import {addExpense} from './actions/expenses.js';
import {setTextFilter} from './actions/filters.js';
import getVisibleExpenses from './selectors/expenses.js';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import  './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

moment.locale('fr');

const store = configureStore();



store.dispatch(addExpense({description:'Waeter bill',amount:5000,createdAt:24}));
store.dispatch(addExpense({description:'Gas bill',amount:6000,createdAt:26}));
store.dispatch(addExpense({description:'Rent',amount:70000,createdAt:1}));
store.dispatch(addExpense({description:'Coffee 2 may 2019',amount:3200,createdAt:1556789402880}));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx ,document.getElementById('app'));
