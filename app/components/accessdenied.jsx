import React from 'react';
import {Link} from 'react-router';

const styleObj = {
  height: '100vh',
  textAlign: 'center'
}

const picStyle = {
  width: '75%'
}

export function AccessDenied() {
  return (
    <div style={styleObj}>
      <Link to="/" >
        <img style={picStyle} src="/access_denied.jpg" alt="DENIED"/>
      </Link>
    </div>
  )
}

export default AccessDenied;
