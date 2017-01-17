import React, { Component } from 'react';
import StripeComponent from './stripe.jsx';
import axios from 'axios';

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
      response.object === "token" ? alert("Payment Received!") : alert("That's not a real credit card!")
      axios.post('/api/payments', response)
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