import React, { Component } from 'react';
import { connect } from 'react-redux';

import ToggleEditable from './ToggleEditable';

const defaultState = {
  inputs: []
};

export class ToggleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: props.inputs || []
    }

    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(name, value) {
    this.setState(prevState => {
      const nextState = Object.assign({}, prevState);
      nextState.inputs = prevState.inputs.map(input => {
        if (input.name === name) {
          return Object.assign({}, input, {
            content: value
          });
        }
        return input;
      });
      return nextState;
    });
  }

  render() {
    const inputs = this.state.inputs;
    const editable = this.props.editable;
    return (
      <form>
        {
          inputs.map(input => (
            <ToggleEditable
              key={input.name}
              onChange={this.updateInput}
              editable={editable}
              {...input} />
          ))
        }
      </form>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleForm);
