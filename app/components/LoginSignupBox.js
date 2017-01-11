import React from 'react'
import Login from './Login'
import {Link} from 'react-router';
import Signup from './Signup' //this is temporary until we have sign in component
import Perf from 'react-addons-perf';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class LoginSignupBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: this.props.modalVisible,
      showLogin: true
    };

    this.openModal = this.props.actions.showModal.bind(this)
    this.closeModal = this.props.actions.hideModal.bind(this)
  }

  loginOrSignupClick(e){
    e.preventDefault()
    this.setState({showLogin: !this.state.showLogin})

  }

  render(){
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Login/Signup"
        >
          <div className="btn-group btn-group-lg" role="group" aria-label="..." id="loginField">
            <button type="button" className={`btn btn-default ${this.state.showLogin ? "active" : ''}`} onClick={this.loginOrSignupClick.bind(this)}>Login</button>
            <button type="button" className={`btn btn-default ${!this.state.showLogin ? "active" : ''}`} onClick={this.loginOrSignupClick.bind(this)}>Signup</button>
          </div>
          <hr/>
          {this.state.showLogin ? <Login/> : <Signup/>}
        </Modal>
      </div>
    )  
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
export default connect (mapStateToProps, mapDispatchToProps)(LoginSignupBox)

