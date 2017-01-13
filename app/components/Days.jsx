

import React from 'react';
import axios from 'axios';

const dayButtonStyle = {
    display : "inline-block",
    padding : "0.2em",
    width : `${100/7}%`,
    maxWidth : "10em"
}

const timeStyle = {
   
}

export default function (props) {
    const day = props.day.name;
    const time = props.day.value;
    let active = time ? "btn-danger" : "btn-warning";
return (
    <div className="daybutton" style={dayButtonStyle}>
            <button type="button" className={`btn btn-primary ${active}`} onClick={props.handleChange} id="button" name={day} value={!time} style={{display : "block", width : "100%"} }>{day}</button>
    {time ? 
        <div className="input-group" style={timeStyle}>
            <input type="text" className="form-control input-small"/>
            <span className="input-group-addon"><i className="glyphicon glyphicon-time"></i></span>
        </div> : ""}
    </div>
   )
}
            