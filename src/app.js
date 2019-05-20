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
import './firebase/firebase'

moment.locale('fr');

const store = configureStore();
//console.log('testing sourcemaps');
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx ,document.getElementById('app'));
