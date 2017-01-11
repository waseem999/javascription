import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import HomeContainer from './components/homecontainer.jsx'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import Navbar from './components/Navbar'
import AccountPage from './components/accountpage.jsx'
import AddProduct from './components/addproductcomponent.jsx'
// import Subscription from './components/SubscriptionScheduleClass.jsx'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <Navbar/>
      {/**<nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav> }**/}
      {children}
    </div>
)


render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={HomeContainer} />
        <Route path="/login" component={Login} />
        {/** 
        <Route path="/subscriptions" component={Subscription} />
        */}
        <Route path="/signup" component={HomeContainer} />
        <Route path="/about" component={HomeContainer} />
        <Route path="/contact" component={HomeContainer} />
        <Route path="/stories" component={HomeContainer} />
        <Route path="/users" component={AccountPage} />
        <Route path="/coffee" component={AddProduct} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
