import React, { Component } from 'react';
import { connect } from 'react-redux';

const inputsByType = {
  text: TextInput,
  textarea: TextArea,
  password: Password
};

export function ToggleEditable (props) {
  function changeHandler(e) {
    e.preventDefault();
    props.onChange(e.target.name, e.target.value);
  }

  const {attributes, content, editable, label, name, inputType} = props;

  return (
    <div className={'c-toggle-editable'}>
    {
      React.createElement(inputsByType[inputType],
        {
          ...attributes,
          value: content,
          name: name,
          onChange: changeHandler,
          label: label,
          editable: editable
        }
      )
    }
    </div>
  );
}

export function TextInput(props) {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      { props.editable
        ? <input type='text' {...props} />
        : props.value
      }
    </div>
  );
}

export function TextArea(props) {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
        { props.editable
          ? <textarea {...props}>
              {props.content}
            </textarea>
          : props.value
        }
    </div>
  );
}

export function Password(props) {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      { props.editable
        ? <input type='password' {...props}/>
        : props.value
      }
    </div>
  );
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleEditable);
