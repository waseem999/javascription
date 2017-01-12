import React from 'react';
import chai, { expect, assert } from 'chai';
import { render, shallow } from 'enzyme';

import SubscriptionScheduleContainer, { SubscriptionSchedule } from '../../components/SubscriptionScheduleClass';

chai.use(require('chai-enzyme')());

describe('<SubscriptionScheduleContainer />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SubscriptionSchedule />);
  });

  it('Should run without errors', () => {
    assert(render(<SubscriptionSchedule />));
  });
});
