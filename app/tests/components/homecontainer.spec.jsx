import React from 'react';
import chai, { expect } from 'chai';
chai.use(require('chai-enzyme')());
import { render, shallow } from 'enzyme';

import HomeContainer, { HomeComponent } from '../../components/homecontainer';

describe('<HomeContainer />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HomeComponent />);
  });

  it('Should run without errors', () => {
    expect(render(<HomeComponent />)).to.exist;
  });
  // test if a random joke is picked before the component mounts
});
