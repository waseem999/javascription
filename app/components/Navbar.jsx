import React from 'react';
import {Link} from 'react-router';
import {DropdownButton, MenuItem} from 'react-bootstrap'

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.renderLoginSignup = this.renderLoginSignup.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
  }

  renderLoginSignup() {
    const showModal = this.props.showModal ? this.props.showModal.bind(this) : () => {};
    return (
      <ul className="nav navbar-nav navbar-right">
        <li id="loginBtn">
          <button className="navbar-btn btn btn-default"
            onClick={showModal}
          >Login
        </button>
        </li>
      </ul>
    );
  }

  renderLogout() {

    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <div id="welcomeName">Welcome, {this.props.user.name}</div>
        </li>
        <li>
          <div className="user-dropdown">
            <DropdownButton title={<span className="glyphicon glyphicon-user"></span>} id={`dropdown-basic-1`}>
              <MenuItem eventKey="1" href="/account">
                Account
              </MenuItem>
              <MenuItem eventKey="2" href="/subscriptions">
                Subscription
              </MenuItem>
              <MenuItem divider/>
              <MenuItem eventKey="3" onSelect={this.props.actions.logout.bind(this)}>
                Logout
              </MenuItem>
            </DropdownButton>
          </div>
        </li>
      </ul>
    );
  }

  render() {
    return (
    <nav className="navbar navbar-inverse" role="navigation">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-id">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <Link className="navbar-brand clearfix" to="/home"><span> JavaScription</span></Link>
      </div>
      <div className="collapse navbar-collapse" id="navbar-collapse-id">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/" className="active">Home</Link>
          </li>
        </ul>
        {this.props.user  ?
          this.renderLogout() :
          this.renderLoginSignup()}
      </div>
    </nav>
    );
  }
}

import {login, logout} from 'APP/app/reducers/auth';
import {showModal, hideModal} from 'APP/app/reducers/loginModal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

function mapStateToProps(state){
  return {
    user: state.auth,
    modalVisible: state.modalVisible
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({login, logout, showModal, hideModal}, dispatch)
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(Navbar)
