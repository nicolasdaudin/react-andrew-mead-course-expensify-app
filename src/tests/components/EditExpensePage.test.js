import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let historySpy, editExpenseSpy, removeExpenseSpy, wrapper,expense;

beforeEach( () => {
  historySpy = { push : jest.fn()}
  editExpenseSpy = jest.fn();
  removeExpenseSpy = jest.fn();
  expense = expenses[0];
  wrapper = shallow(
    <EditExpensePage 
      history={historySpy} 
      editExpense={editExpenseSpy} 
      removeExpense={removeExpenseSpy} 
      expense={expense}
    />
  );
})

test('should render EditExpensePage correctly',() => {  
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense',() => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expense);
  expect(editExpenseSpy).toHaveBeenLastCalledWith(expense.id,expense);
  expect(historySpy.push).toHaveBeenLastCalledWith('/');

});

test('should handle removeExpense',() => {
  wrapper.find('button').simulate('click');
  expect(removeExpenseSpy).toHaveBeenLastCalledWith(expense.id);
  expect(historySpy.push).toHaveBeenLastCalledWith('/');
});