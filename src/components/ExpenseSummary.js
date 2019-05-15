import React from 'react';
import { connect } from 'react-redux';
import selectExpensesTotal from '../selectors/expenses-total.js';
import selectExpenses from '../selectors/expenses.js';
import numeral from 'numeral'


export const ExpenseSummary = (props) => (
  <div>
    Viewing { props.expenseCount } expense{ props.expenseCount !== 1 ? 's' : '' } for a total of { numeral(props.expensesTotal/100).format('$0,0.00') } $ 
  </div>
)

const mapStateToProps = (state ) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount:visibleExpenses.length,
    expensesTotal:selectExpensesTotal(visibleExpenses)
  }
}

const ConnectedExpenseSummary = connect(mapStateToProps)(ExpenseSummary);

export default ConnectedExpenseSummary