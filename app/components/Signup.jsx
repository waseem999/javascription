import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import {FormGroup, FormControl, HelpBlock, Alert} from 'react-bootstrap'

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
      phone_number: this.state.phoneNumber,
      email: this.state.email,
      password: this.state.password,
      billing_address: {
        street_address: this.state.streetaddress,
        unit_number: this.state.unitnumber,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode
      }
    })
    .then(res => {
      this.props.actions.login(res.data.email, res.data.password)
    })
    .then(() => this.props.actions.hideModal())
    .catch(()=> this.props.actions.signinIssue())
  }

  updateInput(field, event) {
    event.preventDefault()
    this.setState({
      [field]: event.target.value
    })
  }

  checkEmail(){
    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    let length = this.state.email.length;
    if(!validateEmail(this.state.email) && length > 0) return 'error';
    else if(length > 0 && validateEmail(this.state.email)) return 'success';

  }

  checkConfirmPassword() {
    let length = this.state.confirmPassword.length;
    if(this.state.confirmPassword !== this.state.password) return 'error';
    else if (length > 0 && this.state.confirmPassword === this.state.password) return 'success';
  }

  render(){
    const login = this.props.actions.login;

    return (
      <form onSubmit={this.createUser.bind(this)} className="signUpLogin">

      <div className="buffer-oauth">
        <a target="_self"
           href="/api/auth/google"
           className="btn btn-social btn-google"
           id="google-signin">
        <span className="fa fa-google"></span>
        <span>Signup with Google</span>
        </a>

      </div>

      <hr/>

      {this.props.signinProb ? 
        (<Alert bsStyle="warning">
          <strong>Oh no!</strong> Looks like there was an issue creating your account. Try again! 
        </Alert>) : null
      }

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
        <div className="form-inline">
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
        </div>
        <div className="input-form">
          <input value={this.state.city}
          onChange= {this.updateInput.bind(this, 'city')} name="city" type="text" placeholder="City" className = "form-control"/>
        </div>
        <div className="form-inline">
          <div className="input-group">
            <input value={this.state.state}
              onChange={this.updateInput.bind(this, 'state')}
              name="state" type="text" placeholder="State" className="form-control"/>
          </div>
          <div className="input-group">
            <input value={this.state.zipcode}
              onChange={this.updateInput.bind(this, 'zipcode')}
              name="zipcode" type="text" placeholder="Zip Code" className="form-control"/>
          </div>
        </div>
        <p></p>

        <label>Email Address</label>
        <FormGroup
          controlId="formBasicText"
          validationState={this.checkEmail()}
        >
          <FormControl
            value={this.state.email}
            onChange={this.updateInput.bind(this, 'email')}
            name="username" type="text" 
            placeholder="Email" className="form-control"
          />
          <FormControl.Feedback />
        </FormGroup>

        <label>Password</label>
        <div className="form-group">
          <input value={this.state.password}
            onChange={this.updateInput.bind(this, 'password')}
            name="password" type="password" placeholder="Password" className="form-control"/>
        </div>

        <label>Confirm Password</label>
         <FormGroup
          controlId="formBasicText"
          validationState={this.checkConfirmPassword()}
        >
          <FormControl
            type="text"
            value={this.state.confirmPassword}
            placeholder="Confirm Password"
            type="password"
            onChange={this.updateInput.bind(this,'confirmPassword')}
          />
          <FormControl.Feedback />
          {this.state.confirmPasswordWarning ?
            <HelpBlock>{this.state.confirmPasswordWarning}</HelpBlock>: null
          }
        </FormGroup>
        <button type="submit" className="btn btn-primary">Create Account & Login</button>
        </form>
    );
  }
}


import {login, logout} from 'APP/app/reducers/auth';
import {signinIssue} from 'APP/app/reducers/signinIssues';
import {hideModal} from 'APP/app/reducers/loginModal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

function mapStateToProps(state){
  return {
    user: state.auth,
    signinProb: state.signinProb
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({login, signinIssue, logout, hideModal}, dispatch)
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Signup)




