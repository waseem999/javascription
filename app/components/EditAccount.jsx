import React, { Component } from 'react';
import { connect } from 'react-redux';

import ToggleForm from './ToggleForm';
import WhoAmI from './WhoAmI';

export class EditAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountForm: {
        editable: false,
        id: 'accountForm',
        inputs: [
          {
            name: 'name',
            content: '',
            inputType: 'text'
          },
          {
            name: 'email',
            content: '',
            inputType: 'text'
          },
          {
            name: 'password',
            content: '',
            inputType: 'password'
          },
          {
            name: 'phone',
            content: '',
            inputType: 'text'
          },
          {
            name: 'address_street',
            content: '',
            inputType: 'text'
          },
          {
            name: 'address_unit',
            content: '',
            inputType: 'text'
          },
          {
            name: 'address_city',
            content: '',
            inputType: 'text'
          },
          {
            name: 'address_state',
            content: '',
            inputType: 'text'
          },
          {
            name: 'address_zipcode',
            content: '',
            inputType: 'text'
          }
        ]
      }
    };

    this.toggleAccountForm = this.toggleForm.bind(this, 'accountForm');
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

  render() {
    const accountForm = this.state.accountForm;
    return (
      <div className={'c-edit-account'}>
        <WhoAmI />
        <h2>
          Account Details
        </h2>
        <button
          form={accountForm.id}
          className={`btn btn-primary ${accountForm.editable ? 'btn-success' : ''}`}
          onClick={this.toggleAccountForm}>
          {accountForm.editable ? 'Save' : 'Edit'}
        </button>
        <ToggleForm {...this.state.accountForm} />
        <hr />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);
