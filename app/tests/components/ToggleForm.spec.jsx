import React from 'react';
import chai, {expect} from 'chai';
import {render, shallow} from 'enzyme';
import {spy} from 'sinon';
import {
  ToggleForm
} from '../../components/ToggleForm';

chai.use(require('chai-enzyme')());
chai.use(require('sinon-chai'));

const initProps = {
  editable: false,
  inputs: []
};

describe('<ToggleForm />', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = Object.assign({}, initProps);
    wrapper = shallow(<ToggleForm {...props} />);
  });

  it('should render without errors', () => {
    expect(wrapper).to.exist;
  });
});
