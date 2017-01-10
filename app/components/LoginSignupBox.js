import React from 'react'
import Login from './Login'
import {Link} from 'react-router';
import Signup from './Jokes' //this is temporary until we have sign in component

export const LoginSignupBox = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <div className="form-body">
          <ul className="nav nav-tabs final-login">
            <li className="active">
              <Link to="/login" data-toggle="tab">Log in</Link>
            </li>
            <li className="active">
              <Link to="/signup" data-toggle="tab">Sign up</Link>
            </li>
          </ul>
          <div className="tab-content">
            <div id="login" className="tab-pane fade in active">
              <div className="tab-inner-form">
                <Login/>
              </div>
              <div className="clearfix"></div>
            </div>
            <div id="signup" className="tab-pane fade">
              <div className="tab-inner-form">
                <Login/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

import {connect} from 'react-redux'

export default connect (
  state => ({})
) (LoginSignupBox)
