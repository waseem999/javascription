
import React, { Component } from 'react';
import axios from 'axios';
import SubscriptionSchedule from './SubscriptionScheduleClass.jsx';
import SelectedCoffees from "./selectedcoffees.jsx";


export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
render(){
    return (
        <div>
            <SubscriptionSchedule/>
            <SelectedCoffees/>
        </div>
    );
  }
}