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
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleChange(event){
    const dayofweek = event.target.name;
    const value = event.target.value==='true';
    let time = this.state.selecteddays[dayofweek];
    this.setState(state => {
      const newState = Object.assign({}, state)
      newState.selecteddays = Object.assign({}, state.selecteddays)
      if (value){
        if (!newState.selecteddays[dayofweek]){
            newState.selecteddays[dayofweek] = "6:00 am"
        }
      }
      else {
        newState.selecteddays[dayofweek] = null
      }
      return newState;
    });
  }

  handleTimeChange(event){
      const dayofweek = event.target.name;
      const value = event.target.value;
      console.log(value)
      this.setState(state => {
        const newState = Object.assign({}, state, state.selecteddays);
        newState.selecteddays[dayofweek] = value
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

componentWillReceiveProps(nextprops) {
this.setState({
    selecteddays : nextprops.selecteddays
  });;
}

  render(){
    const days = this.state.selecteddays;
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
  console.log("STATE", state)
  return {
    selecteddays : state.subscription.selecteddays
  }
}

function mapDispatchToProps(state){
  return {

  }
}

export default connect (mapStateToProps, mapDispatchToProps)(SubscriptionSchedule);
