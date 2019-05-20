import moment from 'moment';

export default  (expenses,{text,startDate,endDate,sortBy}) => {
  //console.log('selectors-expenses');
  return expenses.filter( (expense) => {
    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = startDate? startDate.isSameOrBefore(createdAtMoment,'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment,'day') : true;
    const textMatch = text.length === 0 ||  expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b) => {
    if (sortBy === 'date'){ 
      return a.createdAt < b.createdAt ? 1 : -1
    } else if (sortBy === 'amount'){
      return a.amount < b.amount ? 1 : -1 
    } else {
      return 0
    }
  });
}