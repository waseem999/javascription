import React from 'react';
import {Link} from 'react-router';
import ReactModal from 'react-modal'

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
        <li>
          <button className="navbar-btn btn btn-default"
            onClick={showModal}
          >Login
        </button>
        </li>
      </ul>
    );
  }

  logoutClick(){
    this.props.actions.logout()
  }

  renderLogout() {
    // let name= this.props.user.name - later add this after welcome
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
        <button className="navbar-btn btn btn-default"
          onClick={this.logoutClick.bind(this)}>Logout
        </button>
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
        <Link className="navbar-brand clearfix" to="/"><span> JavaScription</span></Link>
      </div>
      <div className="collapse navbar-collapse" id="navbar-collapse-id">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/" className="active">Home</Link>
          </li>
          <li>
            <Link to="/account" activeClassName="active">Account</Link>
          </li>
          <li>
            <Link to="/contact" activeClassName="active">Contact</Link>
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