import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';

import ToggleForm from './ToggleForm';
import AccessDenied from './accessdenied';

import { updateUser } from '../reducers/auth';

export class EditAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountForm: {
        editable: false,
        id: 'accountForm',
        inputs: []
      }
    };

    this.toggleAccountForm = this.toggleAccountForm.bind(this);
    this.updateAccountInput = this.updateInput.bind(this, 'accountForm');
  }

  componentWillReceiveProps(props) {
    const user = props.user;
    console.log(user);
    if (user){
      const inputs = [
        {
          name: 'name',
          label: 'Name',
          content: user.name,
          inputType: 'text'
        },
        {
          name: 'email',
          label: 'Email',
          content: user.email,
          inputType: 'text'
        },
        {
          name: 'password',
          label: 'Password',
          content: user.password_digest,
          inputType: 'password'
        },
        {
          name: 'phone_number',
          label: 'Phone',
          content: user.phone_number,
          inputType: 'text'
        }
      ];

      this.setState(prevState => {
        const nextState = Object.assign({}, prevState);
        nextState.accountForm = Object.assign({}, nextState.accountForm);
        nextState.accountForm.inputs = [...inputs];
        return nextState;
      });
    }
  }

  updateInput(form, name, value) {
    this.setState(prevState => {
      const nextState = Object.assign({}, prevState);
      nextState[form] = Object.assign({}, nextState[form]);
      nextState[form].inputs = prevState[form].inputs.map(input => {
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

  toggleForm(name) {
    this.setState(prevState => Object.assign({}, prevState, {
      [name]: Object.assign(
          {},
          prevState[name],
          {editable: !prevState[name].editable}
      )
    }));
  }

  toggleAccountForm() {
    const accountForm = this.state.accountForm;
    if (accountForm.editable) {
      const userData = {};
      accountForm.inputs.forEach(input => {
        userData[input.name] = input.content;
      });
      this.props.updateUser(this.props.user.id, userData);
    }
    this.toggleForm('accountForm');
  }

  render() {
    const accountForm = this.state.accountForm;
    return this.props.user ? (
          <div className={'c-edit-account'}>
            <h2>
              Account Details
            </h2>
            <button
              form={accountForm.id}
              className={`btn btn-primary ${accountForm.editable ? 'btn-success' : ''}`}
              onClick={this.toggleAccountForm}
              onChange={this.updateAccountInput}>
              {accountForm.editable ? 'Save' : 'Edit'}
            </button>
            <ToggleForm changeHandler={this.updateAccountInput} {...this.state.accountForm} />
            <hr />
          </div> )
          : <AccessDenied />;
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: bindActionCreators(updateUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);
