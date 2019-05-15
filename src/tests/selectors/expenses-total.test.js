import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';


// should return 0 if no expense
// should correctly add up a single expense
// should correctly add up multiple expenses
test('should return 0 if no expense', () => {
  const total = selectExpensesTotal([]);
  expect(total).toEqual(0);
})

test('should correctly add up a single expense', () => {
  const total = selectExpensesTotal([expenses[1]]);
  expect(total).toEqual(expenses[1].amount);
})

test('should correctly add up multiple expenses', () => {
  const total = selectExpensesTotal([expenses[0],expenses[2]]);
  expect(total).toEqual(expenses[0].amount + expenses[2].amount)
})