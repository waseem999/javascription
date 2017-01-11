import React from 'react'

class Signup extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      phoneNumber: '',
      address: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  createUser(e) {
    e.preventDefault();
    axios.post('/api/signup', {
      name: this.state.name,
      phone: this.state.phone,
      address: this.state.address,
      email: this.state.email,
      password: this.state.password
    })
    .then(res => window.location.href = '/bars')
    .then(user => console.log(user));
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
          <input value={this.state.phone}
            onChange={this.updateInput.bind(this, 'phone')}
            name="phone" type="text" placeholder="Phone #" className="form-control"/>
        </div>

        <label>Address</label>
        <div className="form-group">
          <input value={this.state.address}
            onChange={this.updateInput.bind(this, 'address')}
            name="address" type="text" placeholder="Address" className="form-control"/>
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
            name="password" type="text" placeholder="Password" className="form-control"/>
        </div>

        <label>Confirm Password</label>
        <div className="form-group">
          <input value={this.state.confirmPassword}
            onChange={this.updateInput.bind(this, 'confirmPassword')}
            name="confirmPassword" type="text" placeholder="Confirm Password" className="form-control"/>
        </div>

        <button type="submit" className="btn btn-primary">Create Account & Login</button>
        </form>
    );
  }
}


import {login, logout} from 'APP/app/reducers/auth';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

function mapStateToProps(state){
  return {
    user: state.auth
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({login, logout}, dispatch)
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Signup)
