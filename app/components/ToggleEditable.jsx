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

  const {attributes, content, editable, name, inputType} = props;

  return (
    <div className={'c-toggle-editable'}>
    {
      editable
      ? React.createElement(inputsByType[inputType],
        {
          ...attributes,
          value: content,
          name: name,
          onChange: changeHandler})
      : content
    }
    </div>
  );
}

export function TextInput(props) {
  return (
    <input
      type='text'
      {...props} />
  );
}

export function TextArea(props) {
  return (
    <textarea {...props}>
      {props.content}
    </textarea>
  );
}

export function Password(props) {
  return (
    <input type='password'
      {...props}/>
  );
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleEditable);
