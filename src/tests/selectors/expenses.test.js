import selectExpenses from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';


test('should filter by text value',() => {
  const filters = { text : 'e',sortBy:'date'};
  const result = selectExpenses(expenses,filters);
  expect(result).toEqual([expenses[2],expenses[1]])
});

test('should filter by startdate', () => {
  const filters = {startDate : moment(0),sortBy:'date',text:''}
  const result = selectExpenses(expenses,filters);
  expect(result).toEqual([expenses[2],expenses[0]])
});

// should filter by end date
test('should filter by end date',() => {
  const filters = {endDate : moment(0).subtract(1,'days'),sortBy:'date',text:''}
  const result = selectExpenses(expenses,filters);
  expect(result).toEqual([expenses[1]])
})


// should srt by amount
test('should sort by amount',() => {
  const filters = {sortBy:'amount',text:''}
  const result = selectExpenses(expenses,filters);
  expect(result).toEqual([expenses[1],expenses[2],expenses[0]])
})

// should sort by date
test('should sort by date',() => {
  const filters = {sortBy:'date',text:''}
  const result = selectExpenses(expenses,filters);
  expect(result).toEqual([expenses[2],expenses[0],expenses[1]])
})