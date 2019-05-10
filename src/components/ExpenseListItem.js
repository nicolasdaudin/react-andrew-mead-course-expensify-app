import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';


const ExpenseListItem = ({id,description,amount,createdAt}) => (
  <div className="expense">
    <strong>{description}</strong> - Coût: {amount} € - Date: {moment(createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")} - <Link to={'/edit/' + id}>Edit</Link>
  </div>
)


export default ExpenseListItem;