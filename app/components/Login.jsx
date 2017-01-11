import React from 'react'

export const Login = (props) => {

  const login = props.login;

  return (
    <form className="signUpLogin" onSubmit={evt => {
      evt.preventDefault()
      login(evt.target.username.value, evt.target.password.value)
    } }>
      <label>Email Address</label>
      <div className="form-group">
        <input name="username" type="text" placeholder="Email" className="form-control"/>
      </div>
      <label>Password</label>
      <div className="form-group">
        <input name="password" 
          type="password" 
          placeholder="Password"
          className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
}


import {login, logout} from 'APP/app/reducers/auth';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

function mapStateToProps(state){
  return {

  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({login, logout}, dispatch)
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Login)

