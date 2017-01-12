import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

class Signup extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      phoneNumber: '',
      streetaddress: '',
      unitnumber: '',
      city: '',
      state: '',
      zipcode: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  createUser(e) {
    e.preventDefault();
    axios.post('/api/users', {
      name: this.state.name,
      phonenumber: this.state.phoneNumber,
      streetaddress: this.state.streetaddress,
      unitnumber: this.state.unitnumber,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      email: this.state.email,
      password: this.state.password
    })
    .then(res => this.props.actions.login(res.data.email, res.data.password))
    .then(() => this.props.actions.hideModal())
  }

  updateInput(field, event) {
    this.setState({
      [field]: event.target.value
    })
  }

  render(){
    const login = this.props.actions.login;

    return (
      <form onSubmit={this.createUser.bind(this)} className="signUpLogin">
        <label>Name</label>
        <div className="form-group">
          <input value={this.state.name}
            onChange={this.updateInput.bind(this, 'name')}
            name="name" type="text" placeholder="Name" className="form-control"/>
        </div>

        <label>Phone</label>
        <div className="form-group">
          <input value={this.state.phoneNumber}
            onChange={this.updateInput.bind(this, 'phoneNumber')}
            name="phone" type="phoneNumber" placeholder="Phone #" className="form-control"/>
        </div>

        <label>Address</label>
        <div className="input-group">
          <input value={this.state.streetaddress}
            onChange={this.updateInput.bind(this, 'streetaddress')}
            name="streetaddress" type="text" placeholder="Street Address" className="form-control"/>
        </div>
        <div className="input-group">
          <input value={this.state.unitnumber}
            onChange={this.updateInput.bind(this, 'unitnumber')}
            name="unitnumber" type="text" placeholder="Unit/Apt" className="form-control"/>
        </div>

        <label>Email Address</label>
        <div className="form-group">
          <input value={this.state.email}
            onChange={this.updateInput.bind(this, 'email')}
            name="username" type="text" placeholder="Email" className="form-control"/>
        </div>

        <label>Password</label>
        <div className="form-group">
          <input value={this.state.password}
            onChange={this.updateInput.bind(this, 'password')}
            name="password" type="password" placeholder="Password" className="form-control"/>
        </div>

        <label>Confirm Password</label>
        <div className="form-group">
          <input value={this.state.confirmPassword}
            onChange={this.updateInput.bind(this, 'confirmPassword')}
            name="confirmPassword" type="password" placeholder="Confirm Password" className="form-control"/>
        </div>

        <button type="submit" className="btn btn-primary">Create Account & Login</button>
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
    user: state.auth
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({login, logout, hideModal}, dispatch)
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Signup)
