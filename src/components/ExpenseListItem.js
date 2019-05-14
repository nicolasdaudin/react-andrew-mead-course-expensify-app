import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import numeral from 'numeral';

const ExpenseListItem = ({id,description,amount,createdAt}) => (
  <div className="expense">
    <strong>{description}</strong> 
    &nbsp;- Coût: {numeral(amount/100).format('$0,0.00')} 
    &nbsp;- Date: {moment(createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")} 
    &nbsp;- <Link to={'/edit/' + id}>Edit {description}</Link>
  </div>
)


export default ExpenseListItem;