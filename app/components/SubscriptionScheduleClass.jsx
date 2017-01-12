import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

export class SubscriptionSchedule extends Component {
  constructor(props){
    super(props);
    this.state = {
      selecteddays: {
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false
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
      newState.selecteddays[dayofweek] = value;
      return newState;
    });
  }

  setDays(event) {
    const selecteddays = this.state.selecteddays;
    event.preventDefault();
    axios.put('/api/subscription', {
      selecteddays
    })
      .then( () => {}
    )
  }

  render(){
    const days = this.state.selecteddays;
    return (

            <div>
                {
                Object.keys(days).map((day, i) => (
                    <div className="checkbox" key={i}>
                        <label>
                            <input onChange={this.handleChange} type="checkbox" id="checkbox" name={day} checked={days[day]} value={!days[day]}/>
                            {day}
                        </label>
                    </div>
                ))
                }
                <button type="submit" className="btn btn-primary"
                onClick={this.setDays}>Submit Days</button>
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
