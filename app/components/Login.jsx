import React from 'react';
import {Alert} from 'react-bootstrap';

import {login, logout, whoami} from 'APP/app/reducers/auth';
import {loginIssue} from 'APP/app/reducers/loginIssues';
import {hideModal} from 'APP/app/reducers/loginModal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

export class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  loginUser(e){
    e.preventDefault();
    this.props.actions.login(this.state.email, this.state.password)
  }

  updateInput(field, event) {
    this.setState({
      [field]: event.target.value
    })
  }

  render(){
    return (
      <form className="sign-up-login" onSubmit={this.loginUser.bind(this)}>

      <div className="buffer-oauth">
          <p>
            <a target="_self"
               href="/api/auth/google"
               className="btn btn-social btn-google">
            <span className="fa fa-google"></span>
            <span>Login with Google</span>
            </a>
          </p>
        </div>

        <hr/>
          
      {this.props.loginProb ? 
        (<Alert bsStyle="warning">
          <strong>Oh no!</strong> Looks like your email or password is incorrect. Try again!
        </Alert>) : null
      }

        <label>Email Address</label>
        <div className="form-group">
          <input name="username" type="text" placeholder="Email" className="form-control" value={this.state.email}
            onChange={this.updateInput.bind(this, 'email')}/>
        </div>
        <label>Password</label>
        <div className="form-group">
          <input name="password"
            type="password"
            placeholder="Password"
            className="form-control"
            value={this.state.password}
            onChange={this.updateInput.bind(this, 'password')} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    );
  }
}


function mapStateToProps(state){
  return {
    user: state.auth,
    loginProb: state.loginProb
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({login, logout, hideModal, loginIssue, whoami}, dispatch)
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Login)
