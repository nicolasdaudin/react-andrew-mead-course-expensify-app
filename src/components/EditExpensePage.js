import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense,startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  
  onSubmit = (expense) => {
    //console.log('updated ',expense);
    this.props.startEditExpense(this.props.expense.id,expense);
    this.props.history.push('/');
  }

  onClickRemove = () => { 
    //console.log('removed',this.props.expense.id);
    this.props.startRemoveExpense(this.props.expense.id);
    this.props.history.push('/');
  }

  render () {
    return (
      <div>
        <ExpenseForm 
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onClickRemove}>Remove Expense</button>
      </div>
    )
  } 
  
}

const mapStateToProps = (state,props) => {
  // props.match is passed to us by React via component. 
  // when we did <PrivateRoute path='/edit/:id' component={EditExpensePage} /> in AppRouter, when passing EditExpensePage as 'component'
  // react inject props element with match, history and location

  return { 
    expense : state.expenses.find( (expense) => (expense.id === props.match.params.id))
  }
}

const mapDispatchToProps = (dispatch) => ({
  startEditExpense : (id,expense) => { dispatch(startEditExpense(id,expense))},
  startRemoveExpense : (id) => { dispatch(startRemoveExpense({id}))}  
});

export default connect(mapStateToProps,mapDispatchToProps)(EditExpensePage);

/* 
// see video 12.15 refactor for further testing
// that was the state before
const EditExpensePage = (props) => {
  console.log(props);
  return (
    <div>
      <ExpenseForm 
        expense={props.expense}
        onSubmit={(expense) => {
          console.log('updated ',expense);
          props.dispatch(editExpense(props.expense.id,expense));
          props.history.push('/');
        }}
      />
      <button onClick={() => { 
        props.dispatch(removeExpense({ id : props.expense.id }));
        props.history.push('/');
      }}>Remove Expense</button>
    </div>
  )
}

const mapStateToProps = (state,props) => {
  return { 
    expense : state.expenses.find( (expense) => (expense.id === props.match.params.id))
  }
}

export default connect(mapStateToProps)(EditExpensePage);*/