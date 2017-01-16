import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux';
import {bindActionCreators} from 'redux'

import store from './store'
import {showModal, hideModal} from './reducers/loginModal'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import Navbar from './components/Navbar'
import LoginSignupBox from './components/LoginSignupBox.jsx'
import HomeContainer from './components/homecontainer.jsx'
import AccountPage from './components/accountpage.jsx'
import AddProduct from './components/addproductcomponent.jsx'
import Subscription from './components/SubscriptionScheduleClass.jsx'
import EditAccount from './components/EditAccount.jsx';

const ExampleAppComponent = props => (
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

const mapStateToProps = state => ({
  user: state.auth,
  modalVisible: state.modalVisible
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({showModal, hideModal}, dispatch)
})

const ExampleApp = connect(mapStateToProps, mapDispatchToProps)(ExampleAppComponent)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>

        <IndexRedirect to="/home" />
        <Route path="/home" component={HomeContainer} />
        <Route path="/login" component={Login} />
        <Route path="/subscriptions" component={Subscription} />
        <Route path="/signup" component={HomeContainer} />
        <Route path="/about" component={HomeContainer} />
        <Route path="/contact" component={HomeContainer} />
        <Route path="/stories" component={HomeContainer} />
        <Route path="/users" component={AccountPage} />
        <Route path="/coffee" component={AddProduct} />
        <Route path="/account" component={EditAccount} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
