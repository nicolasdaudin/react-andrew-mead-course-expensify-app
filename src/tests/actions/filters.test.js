import moment from 'moment';
import {setStartDate,setEndDate, setTextFilter, sortByAmount,sortByDate} from '../../actions/filters';

test('should set start date action', () => {
  const result = setStartDate(moment(0));
  expect(result).toEqual({
    type:'SET_START_DATE',
    startDate: moment(0)
  })
})

test('should set end date action', () => {
  const result = setEndDate(moment(0));
  expect(result).toEqual({
    type:'SET_END_DATE',
    endDate: moment(0)
  })
})

test('should set text filter with value', () => {
  const result = setTextFilter('toto');
  expect(result).toEqual({
    type:'SET_TEXT_FILTER',
    text:'toto'
  })
})

test('should set text filter with default', () => {
  const result = setTextFilter();
  expect(result).toEqual({
    type:'SET_TEXT_FILTER',
    text:''
  })
})

test('should set amount filter',() => {
  const result = sortByAmount();
  expect(result).toEqual({
    type:'SORT_BY_AMOUNT'
  })
})

test('should set date filter',() => {
  const result = sortByDate();
  expect(result).toEqual({
    type:'SORT_BY_DATE'
  })
})
