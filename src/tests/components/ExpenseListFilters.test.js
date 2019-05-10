import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters }  from '../../components/ExpenseListFilters';
import { filters, altFilters} from '../fixtures/filters';

let setTextFilterSpy, sortByDateSpy, sortByAmountSpy, setStartDateSpy, setEndDateSpy,wrapper;

beforeEach( () => {
  setTextFilterSpy = jest.fn();
  sortByDateSpy = jest.fn();
  sortByAmountSpy = jest.fn();
  setStartDateSpy = jest.fn();
  setEndDateSpy = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilterSpy}
      sortByDate={sortByDateSpy}
      sortByAmount={sortByAmountSpy}
      setStartDate={setStartDateSpy}
      setEndDate={setEndDateSpy}
    />
  );
});

test('should render ExpenseListFilters correctly',() => {
  expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseListFilters with alt filters correctly',() => {
  wrapper.setProps({filters: altFilters});
  expect(wrapper).toMatchSnapshot();
})

// SPIES
// should handle text change
// should sort by date
// should sort bu amount
// should handle date changes
// STATE
// should handle date focus changes

test('should handle text change',() => {
  wrapper.find('input').simulate('change', {
    target: { value : altFilters.text}
  });
  expect(setTextFilterSpy).toHaveBeenLastCalledWith(altFilters.text);
})

test('should sort by date', () => {
  wrapper.setProps({filters: altFilters});
  wrapper.find('select').simulate('change', {
    target: { value: 'date'}
  })
  expect(sortByDateSpy).toHaveBeenCalled();
})

test('should sort by amount', () => {
  wrapper.find('select').simulate('change', {
    target: { value: 'amount'}
  })
  expect(sortByAmountSpy).toHaveBeenCalled();
})

test('should handle date changes', () => {
  wrapper.find('DateRangePicker').prop('onDatesChange')({startDate:altFilters.startDate,endDate:altFilters.endDate});
  expect(setStartDateSpy).toHaveBeenLastCalledWith(altFilters.startDate);
  expect(setEndDateSpy).toHaveBeenLastCalledWith(altFilters.endDate);
})

test('should handle date focus changes', () => {
  wrapper.find('DateRangePicker').prop('onFocusChange')('startDate');
  expect(wrapper.state('calendarFocused')).toBe('startDate');
});