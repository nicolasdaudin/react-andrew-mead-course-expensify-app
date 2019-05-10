import React from 'react';
import {shallow} from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should render ExpenseForm corretly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();

})

test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
})

test('should render error for invalid form submission', () => {
  // invalid form submission is just submitting the form with nothing special (since description or amount should not be empty)
  const wrapper = shallow(<ExpenseForm />);
  
  // forcing a dummy event, otherwise e.preventDefault() will crash
  wrapper.find('form').simulate('submit',{
    preventDefault : () => {}
  }); 
  
  // 'error' string is not empty
  expect(wrapper.state('error').length).toBeGreaterThan(0); 
  expect(wrapper).toMatchSnapshot();
})

test('should set description on input change', () => {
  const value = "newdesc";
  const wrapper = shallow(<ExpenseForm />);

  // at() picks up the right index in the wrapper (like in an array), in our case we want the 1st input
  // in simulate, the 2nd arg is an object 'e' with a target prop (see ExpenseForm to see how onDescriptionChange works) with a value prop to do e.target.value
  wrapper.find('input').at(0).simulate('change',{
    target: { value : value }
  });

  expect(wrapper.state('description')).toBe(value);
 
});

test('should set note on textarea change', () => {
  const value = "new description";
  const wrapper = shallow(<ExpenseForm />);

  wrapper.find('textarea').at(0).simulate('change',{
    target: { value : value }
  });

  expect(wrapper.state('note')).toBe(value);
 
});

test('should set amount if valid input', () => {
  const value = '23.14'
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change',{
    target : {value : value}
  });
  expect(wrapper.state('amount')).toBe(value);
  
});

test('should not set amount if invalid input', () => {
  const value = '23.142'
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change',{
    target : {value : value}
  });
  expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
  wrapper.find('form').simulate('submit',{
    preventDefault : () => {}
  }); 

  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description : expenses[0].description,
    note: expenses[0].note,
    amount: expenses[0].amount,
    createdAt: expenses[0].createdAt
  });

});

test('shouldset new date on date change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const now = moment();
  //wrapper.find.prop gets a handler for a function (for ondatechange function)
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now)

});

test('should set new focus on focus change', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
  expect(wrapper.state('calendarFocused')).toBe(focused);

})

