
import React, { Component } from 'react';
import SubscriptionSchedule from './SubscriptionScheduleClass.jsx';
import SelectedCoffees from "./selectedcoffees.jsx";
import AllCoffees from './allcoffees.jsx';


export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
render(){
    return (
        <div style={{backgroundColor: '#c2c4c6'}}>
            <SubscriptionSchedule/>
            <SelectedCoffees/>
            <AllCoffees/>
        </div>
    );
  }
}
