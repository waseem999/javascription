import React from 'react';
import {Link} from 'react-router';

export const Navbar = (props)=> (
  <nav className="navbar navbar-inverse">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <Link className="navbar-brand clearfix" to="/"><span> JavaScription</span></Link>
    </div>
    <div className="collapse navbar-collapse">
      <ul className="nav navbar-nav">
        <li>
          <Link to="/" activeClassName="active">Home</Link>
        </li>
        <li>
          <Link to="/users" activeClassName="active">Account</Link>
        </li>
        <li>
          <Link to="/contact" activeClassName="active">Contact</Link>
        </li>
      </ul> 
      <ul className="nav navbar-nav navbar-right">
        <li>
         <Link to="/signup" activeClassName="active">Signup</Link>
        </li>
        <li>
          <Link to="/login" activeClassName="active">Login</Link>
        </li>
      </ul>
    </div>
  </nav>
  );


import {connect} from 'react-redux'

function mapStateToProps(state){
  return {

  }
}

export default connect (mapStateToProps)(Navbar)