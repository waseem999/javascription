import React from 'react';
import chai, { expect, assert } from 'chai';
import { render, shallow } from 'enzyme';

import AccessDeniedContainer, { AccessDenied } from '../../components/accessdenied';

chai.use(require('chai-enzyme')());

const defaultProps = {};
describe('<AccessDenied />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AccessDenied {...defaultProps} />);
  });

  it('Should run without errors', () => {
    assert(render(<AccessDenied />));
  });
});
