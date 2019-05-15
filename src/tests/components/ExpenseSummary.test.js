import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';

test('should render ExpenseSummary correctly if no expenses',() => {
  const wrapper = shallow(<ExpenseSummary expenseCount={0} expensesTotal={0} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary correctly if one expenses or more',() => {
  const wrapper = shallow(<ExpenseSummary expenseCount={2} expensesTotal={35.21} />);
  expect(wrapper).toMatchSnapshot();
});
