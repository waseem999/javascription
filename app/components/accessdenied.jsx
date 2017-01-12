import React from 'react';
import {Link} from 'react-router';

export function AccessDenied() {
  return (
    <div>
      <img src="/access_denied.jpg" alt="DENIED"/>
      <Link to="/" >Home</Link>
    </div>
  )
}

export default AccessDenied;
