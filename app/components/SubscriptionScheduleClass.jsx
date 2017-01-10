import React from 'react';
import {connect} from 'react-redux';


export const SubscriptionSchedule = () => (
    <div>
        <div className="checkbox">
            <label>
                <input onChange={} type="checkbox" id="checkbox"/>
                Monday
            </label>
        </div>
         <div className="checkbox">
            <label>
                <input onChange={} type="checkbox" id="checkbox"/>
                Tuesday
            </label>
        </div>
         <div className="checkbox">
            <label>
                <input onChange={} type="checkbox" id="checkbox"/>
                Wednesday
            </label>
        </div>
         <div className="checkbox">
            <label>
                <input onChange={} type="checkbox" id="checkbox"/>
                Thursday
            </label>
        </div>
         <div className="checkbox">
            <label>
                <input onChange={} type="checkbox" id="checkbox"/>
                Friday
            </label>
        </div>
        <div className="checkbox">
            <label>
                <input onChange={} type="checkbox" id="checkbox"/>
                Saturday
            </label>
        </div>
         <div className="checkbox">
            <label>
                <input onChange={} type="checkbox" id="checkbox"/>
                Sunday
            </label>
        </div>
    </div>
);

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


