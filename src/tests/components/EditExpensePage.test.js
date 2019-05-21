import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let historySpy, startEditExpenseSpy, startRemoveExpenseSpy, wrapper,expense;

beforeEach( () => {
  historySpy = { push : jest.fn()}
  startEditExpenseSpy = jest.fn();
  startRemoveExpenseSpy = jest.fn();
  expense = expenses[0];
  wrapper = shallow(
    <EditExpensePage 
      history={historySpy} 
      startEditExpense={startEditExpenseSpy} 
      startRemoveExpense={startRemoveExpenseSpy} 
      expense={expense}
    />
  );
})

test('should render EditExpensePage correctly',() => {  
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense',() => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expense);
  expect(startEditExpenseSpy).toHaveBeenLastCalledWith(expense.id,expense);
  expect(historySpy.push).toHaveBeenLastCalledWith('/');

});

test('should handle removeExpense',() => {
  wrapper.find('button').simulate('click');
  expect(startRemoveExpenseSpy).toHaveBeenLastCalledWith(expense.id);
  expect(historySpy.push).toHaveBeenLastCalledWith('/');
});