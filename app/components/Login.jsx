import React from 'react'

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  loginUser(e){
    this.props.actions.login(this.state.email, this.state.password)
    this.props.actions.hideModal()
  }

  updateInput(field, event) {
    this.setState({
      [field]: event.target.value
    })
  }

  render(){
    return (
      <form className="signUpLogin" onSubmit={this.loginUser.bind(this)}>
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


import {login, logout} from 'APP/app/reducers/auth';
import {hideModal} from 'APP/app/reducers/loginModal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

function mapStateToProps(state){
  return {

  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({login, logout, hideModal}, dispatch)
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Login)

