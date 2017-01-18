import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Days from './Days.jsx';
import { addSchedule, addScheduleFrontEnd } from 'APP/app/reducers/subscription.jsx';
import store from '../store.jsx'

export class SubscriptionSchedule extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedDays: {
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
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleChange(event){
    const dayofweek = event.target.name;
    const value = event.target.value==='true';
    this.setState(state => {
      const newState = Object.assign({}, state)
      newState.selectedDays = Object.assign({}, state.selectedDays)
      if (value){
        if (!newState.selectedDays[dayofweek]){
            newState.selectedDays[dayofweek] = "6:00 am"
        }
      }
      else {
        newState.selectedDays[dayofweek] = null
      }
      return newState;
    });
  }

  handleTimeChange(event){
      const dayofweek = event.target.name;
      const value = event.target.value;
      console.log(value)
      this.setState(state => {
        const newState = Object.assign({}, state, state.selectedDays);
        newState.selectedDays[dayofweek] = value
        return newState;
      });
  }

setDays(event) {
  const selectedDays = this.state.selectedDays;
  axios.put('/api/subscription/days', {
    selectedDays
  })
    .then( () => {
      store.dispatch(addScheduleFrontEnd(selectedDays));
    }
  )
}

componentWillReceiveProps(nextprops) {
this.setState({
    selectedDays : nextprops.selectedDays
  });
}

  render(){
    const days = this.state.selectedDays;
    return (
            <div>
              <div style={{textAlign : "center" } }>
                  {
                  Object.keys(days).map((day, i) => (
                      <Days handleChange={this.handleChange} handleTimeChange={this.handleTimeChange} day={{name: day, value: days[day]}} days={days} i={i} key={i}/>
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
  return {
    selectedDays : state.subscription.selectedDays
  }
}

function mapDispatchToProps(dispatch){
  return {
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(SubscriptionSchedule);
