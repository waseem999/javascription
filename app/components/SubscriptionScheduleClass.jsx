import React, { Component } from 'react';
import {connect} from 'react-redux';


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
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // js has a json object that has a stringify method that will turn json 
    // 

    handleChange(event){
        console.log("EVENT", event.target)
        let dayofweek = event.target.name;
        let value = event.target.value==="true" ? true : false;
        this.setState((state) => {
            let newState = Object.assign({}, state)
            newState.selecteddays = Object.assign({}, state.selecteddays)
            newState.selecteddays[dayofweek] = value;
            
            return newState;
            
        });
                    // this.setState({
                    //     selecteddays : {
                    //         [dayofweek] : event.target.value
                    //     }
                    // })
    }
           
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
            </div>
        )
    }
}

function mapStateToProps(state){
  let dayselected = state.subscription.dayselected;
  let time = state.subscription.time;


  return {
    dayselected, time 
  }
}

function mapDispatchToProps(state){
  return {

  }
};

export default connect (mapStateToProps, mapDispatchToProps)(SubscriptionSchedule);


