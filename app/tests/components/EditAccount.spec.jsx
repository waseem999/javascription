import React from 'react';
import chai, {expect} from 'chai';
import {render, shallow} from 'enzyme';
import {spy} from 'sinon';

chai.use(require('chai-enzyme')());
chai.use(require('sinon-chai'));

import { EditAccount } from '../../components/EditAccount';

describe('<EditAccount />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EditAccount />);
  });

  it('should render without errors', () => {
    expect(wrapper).to.exist;
  });
});
