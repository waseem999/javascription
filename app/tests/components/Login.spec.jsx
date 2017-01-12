/* eslint no-unused-expressions: 0 */
/* globals describe, beforeEach, it */

import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {render, shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))

import {Login} from '../../components/Login'

const defaultProps = {
  actions: {
    login: () => {},
    hideModal: () => {}
  }
};

describe('<Login />', () => {
  let root
  beforeEach('render the root', () => {
    root = shallow(<Login {...defaultProps} />)
  })

  it('shows a login form', () => {
    expect(root.find('input[name="username"]')).to.have.length(1)
    expect(root.find('input[name="password"]')).to.have.length(1)
  })

  it('shows a password field', () => {
    const pw = root.find('input[name="password"]')
    expect(pw).to.have.length(1)
    expect(pw.at(0)).to.have.attr('type').equals('password')
  })

  it('has a login button', () => {
    const submit = root.find('[type="submit"]')
    expect(submit.length).to.be.at.least(1)
  })

  describe('when submitted', () => {
    const login = spy();
    const props = Object.assign({}, defaultProps);
    const state = {
      email: 'bones@example.com',
      password: '12345'
    };
    const submitEvent = {
      preventDefault: spy(),
      target: {
        username: {value: 'bones@example.com'},
        password: {value: '12345'},
      }
    }

    props.actions.login = login;

    const root = shallow(<Login {...props}/>)

    beforeEach('submit', () => {
      login.reset()
      submitEvent.preventDefault.reset()
      root.setState(state);
      root.simulate('submit', submitEvent)
    })

    it('calls props.login with credentials', () => {
      expect(login).to.have.been.calledWith(
        submitEvent.target.username.value,
        submitEvent.target.password.value
      )
    })

    it('calls preventDefault', () => {
      expect(submitEvent.preventDefault).to.have.been.called
    })
  })
})
