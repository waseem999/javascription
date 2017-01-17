import React, { Component } from 'react';
import StripeComponent from './stripe.jsx';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


handleSubmit(e){
  e.preventDefault();
    Stripe.card.createToken(e.target, function (status, response){
      axios.post('/')
    });
  return false;
}


render(){
    return (
        <div>
            <StripeComponent handleSubmit={this.handleSubmit}/>
        </div>
    );
  }
}