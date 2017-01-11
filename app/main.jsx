'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux';
import {bindActionCreators} from 'redux'

import store from './store'
import {showModal, hideModal} from './reducers/loginModal'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import Navbar from './components/Navbar'
import LoginSignupBox from './components/LoginSignupBox'

const ExampleAppComponent = (props) => (
  <div>
    <Navbar 
      modalVisible={props.modalVisible} 
      showModal={props.actions.showModal} 
      hideModal={props.actions.hideModal}
    />
    {props.children}
    {props.modalVisible ? <LoginSignupBox/> : null}
  </div>
)

const mapStateToProps = (state) => {
  return { 
    user: state.auth,
    modalVisible: state.modalVisible
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({showModal, hideModal}, dispatch)
  }
}

const ExampleApp = connect(mapStateToProps, mapDispatchToProps)(ExampleAppComponent)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/jokes" />
        <Route path="/jokes" component={Jokes} />
        <Route path="/login" component={LoginSignupBox} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)