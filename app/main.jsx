import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import HomeContainer from './components/homecontainer.jsx'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import Navbar from './components/Navbar'
import SubscriptionSchedule from './components/SubscriptionScheduleClass.jsx'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <Navbar/>
      {/**<nav>
        {user ? <WhoAmI/> : <Login/>}

      </nav> **/}
      {children}
    </div>
)


render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/jokes" />
        <Route path="/jokes" component={Jokes} />
        <Route path="/subscription" component={SubscriptionSchedule} />

      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
