export default  (expenses) => {
  console.log('selectors-expenses-total');
  return expenses
      .map(expense => expense.amount)
      .reduce((total,amount) => total + amount,0)
}