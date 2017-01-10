import React, { Component } from 'react';
import store from '../store';
import {connect} from 'react-redux';


function mapStateToProps(state){
  let freqency = state.preferences.frequency;
  let time = state.preferences.time;


  return {
    frequency, time 
  }
}
  
function mapDispatchToProps(dispatch){
  
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps)(PreferencesClass);