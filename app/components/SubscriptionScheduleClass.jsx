import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Days from './Days.jsx';

export class SubscriptionSchedule extends Component {
  constructor(props){
    super(props);
    this.state = {
      selecteddays: {
        Sunday: null,
        Monday: null,
        Tuesday: null,
        Wednesday: null,
        Thursday: null,
        Friday: null,
        Saturday: null
      }
    }
    this.setDays = this.setDays.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    const dayofweek = event.target.name;
    const value = event.target.value==='true';
    this.setState(state => {
      const newState = Object.assign({}, state)
      newState.selecteddays = Object.assign({}, state.selecteddays)
      value ? newState.selecteddays[dayofweek] = "1" : newState.selecteddays[dayofweek] = null ;
      return newState;
    });
  }

  setDays(event) {
    const selecteddays = this.state.selecteddays;
    event.preventDefault();
    axios.put('/api/subscription/days', {
      selecteddays
    })
      .then( () => {}
    )
  }

  render(){
    const days = this.state.selecteddays;
    return (
            <div>
              <div style={{textAlign : "center" } }>
                  {
                  Object.keys(days).map((day, i) => (
                      <Days handleChange={this.handleChange} day={{name: day, value: days[day]}} days={days} i={i} key={i}/>
                  ))
                  }
              </div>
                <div style={{textAlign : "center" } }>
                  <button type="submit" className="btn btn-primary"
                  onClick={this.setDays}>Submit Days</button>
                </div>
            </div>
    )
  }
}

function mapStateToProps(state){
  const selecteddays = state.subscription.selecteddays;
  const time = state.subscription.time;

  return {
    selecteddays, time
  }
}

function mapDispatchToProps(state){
  return {

  }
}

export default connect (mapStateToProps, mapDispatchToProps)(SubscriptionSchedule);
