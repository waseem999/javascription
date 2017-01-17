import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

import store from './store'
import {showModal, hideModal} from './reducers/loginModal';
import { getSubscription } from './reducers/subscription';

import Login from './components/Login';
import WhoAmI from './components/WhoAmI';
import Navbar from './components/Navbar';
import LoginSignupBox from './components/LoginSignupBox.jsx';
import HomeContainer from './components/homecontainer.jsx';
import AccountPage from './components/accountpage.jsx';
import AddProduct from './components/addproductcomponent.jsx';
import Subscription from './components/SubscriptionContainer.jsx';
import {loadAllCoffees} from './reducers/allcoffeescreator.jsx';
import EditAccount from './components/EditAccount.jsx';
import Payments from './components/PaymentsContainer.jsx';
import SingleCoffee from './components/SingleCoffee.jsx'


const ExampleAppComponent = props => (
  <div style={{backgroundColor: '#c2c4c6'}}>
    <Navbar
      modalVisible={props.modalVisible}
      showModal={props.actions.showModal}
      hideModal={props.actions.hideModal}
    />
    <div className="body-rest">
    {props.children}
    {props.modalVisible ? <LoginSignupBox/> : null}
    </div>
  </div>
)

const mapStateToProps = state => ({
  user: state.auth,
  modalVisible: state.modalVisible
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({showModal, hideModal}, dispatch)
})

const loadSubscriptionOnEnter = function() {
  store.dispatch(getSubscription());
  loadAllCoffeesOnEnter();
}

const loadAllCoffeesOnEnter = function(){
  axios.get('/api/coffee/all')
  .then(coffees => {
    store.dispatch(loadAllCoffees(coffees.data))
  })
  .catch(err => console.log(err));
}


const ExampleApp = connect(mapStateToProps, mapDispatchToProps)(ExampleAppComponent)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={HomeContainer} />
        <Route path="/login" component={Login} />

        <Route path="/subscriptions" component={Subscription} 
        onEnter={loadSubscriptionOnEnter}/>
        <Route path="/payments" component={Payments} />
        <Route path="/onecoffee" component={SingleCoffee} />
        <Route path="/stories" component={HomeContainer} />
        <Route path="/users" component={AccountPage} />
        <Route path="/coffee" component={AddProduct} />
        <Route path="/account" component={EditAccount} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
