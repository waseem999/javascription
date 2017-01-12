import React from 'react';
import chai, { expect, assert } from 'chai';
import { render, shallow } from 'enzyme';

import AddProductContainer, { AddProduct } from '../../components/addproductcomponent';

chai.use(require('chai-enzyme')());

const defaultProps = {};
describe('<AddProduct />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AddProduct {...defaultProps} />);
  });

  it('Should run without errors', () => {
    assert(render(<AddProduct />));
  });
});
