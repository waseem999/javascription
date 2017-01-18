import React, { Component } from 'react';
import { connect } from 'react-redux';

import ToggleEditable from './ToggleEditable';

const defaultState = {
  inputs: []
};

export function ToggleForm(props) {
  const inputs = props.inputs;
  const editable = props.editable;

  return (
    <form>
      {
        inputs.map(input => (
          <ToggleEditable
            key={input.name}
            onChange={props.changeHandler}
            editable={editable}
            {...input} />
        ))
      }
    </form>
  );
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleForm);
