import React from 'react';
import ReactDOM from 'react-dom';
console.log('hoc');

const Info = (props) => {
  return (
    <div>
      <h1>Info</h1>
      <p>This is the info: {props.info}</p>
    </div>
  )
}

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info, please DO NOT share</p>}
      <WrappedComponent {...props}/>
    </div>
  )
}

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
    { props.isAuthenticated ? <WrappedComponent {...props}/> : <p>You need to be authenticated to see this</p>}
    </div>
  )
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={false} info="Nicolas es un guapo"/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="Nicolas es un guapo"/>, document.getElementById('app'));