import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import {addExpense} from '../actions/expenses';


export  class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
      this.props.addExpense(expense);
      this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    addExpense: (expense) => dispatch(addExpense(expense))
});


export default connect(undefined,mapDispatchToProps)(AddExpensePage);

// before adding test+jest and passing to class-based component, that was :
// the idea is to abstract away the call to addExpense, otherwise it's more complicated for jest tests
// see video 124 (section 12, vidoe 14)
// ===========
/*
const AddExpensePage = (props) => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm onSubmit={(expense) => {

      // redirect to dashboard without a full page refresh but with a browser routing
      props.dispatch(addExpense(expense)) ;
      props.history.push('/');
    }}/>
  </div>
)
export default connect ()(AddExpensePage);*/