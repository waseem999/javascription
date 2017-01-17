import React from 'react';

const dayButtonStyle = {
    display : "inline-block",
    padding : "0.2em",
    width : `${100/7}%`,
    maxWidth : "10em",
    position: "relative"
}

const timeStyle = {
   position : "absolute",
   bottom : "0",
   zIndex : "10",
   width : "100%",
   padding : "0.5em",
   right : "0",
   left : "0"
}

export default function (props) {
    const day = props.day.name;
    const time = props.day.value;
    let active = time ? "btn-danger" : "btn-warning";
return (
    <div className="daybutton" style={dayButtonStyle}>
            <button type="button" className={`btn btn-primary ${active}`} 
            onClick={props.handleChange} id="button" name={day} value={!time} 
            style={{display : "block", width : "100%", paddingBottom : "3em"} }>{day}</button>
    {time ? 
        <div className="input-group" style={timeStyle}>
            <input type="text" className="form-control input-small" name={day} onChange={props.handleTimeChange} value={time} />
            <span className="input-group-addon"><i className="glyphicon glyphicon-time"></i></span>
        </div> : ""}
    </div>
   )
}
            