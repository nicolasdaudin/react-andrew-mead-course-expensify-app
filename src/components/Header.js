import React from 'react';
import {NavLink} from 'react-router-dom';
import NicoTimer from './NicoTimer';


const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink> -&nbsp;
    <NavLink to="/create" activeClassName="is-active">Create expense</NavLink> -&nbsp;
    <NavLink to="/help" activeClassName="is-active">Help me!</NavLink> -&nbsp;
    <NicoTimer />
    
  </header>
)

export default Header;