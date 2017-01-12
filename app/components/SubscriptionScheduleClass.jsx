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
        //this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

    handleChange(event){
        let dayofweek = event.target.name;
        let value = event.target.value==="true" ? true : false;
        this.setState((state) => {
            let newState = Object.assign({}, state)
            newState.selecteddays = Object.assign({}, state.selecteddays)
            newState.selecteddays[dayofweek] = value;
            return newState;
        });        
    }

    setDays(event) {
        let selecteddays = this.state.selecteddays;
        event.preventDefault();
        axios.put('/api/subscription', {
        selecteddays
        })
        .then( ()=> {}
    )};
           
    render(){
        let days = this.state.selecteddays;
        console.log(this.state)
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
