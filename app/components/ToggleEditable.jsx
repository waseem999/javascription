import React, { Component } from 'react';
import { connect } from 'react-redux';

const inputsByType = {
  text: TextInput,
  textarea: TextArea
};

export function ToggleEditable (props) {
  const {attributes, content, editable, inputType} = props;
  return (
    <div className={'c-toggle-editable'}>
    {
      editable
      ? React.createElement(inputsByType[inputType], attributes)
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

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleEditable);
