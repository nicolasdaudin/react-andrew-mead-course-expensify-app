import React from 'react';
import { connect } from 'react-redux';
import {Route,Redirect} from 'react-router-dom';
import Header from '../components/Header.js';

export const PublicRoute = ({
  isAuthenticated, 
  component: Component , 
  ...restOfProps
}) => (
  <Route {...restOfProps} component={(props) => (
    isAuthenticated ? (
      <div>
        <Redirect to="/dashboard" />        
      </div>
    ) : (
      <Component {...props} />
    )   
  )}/>
);

const mapStateToProps = (state) => ({
  isAuthenticated : !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);

