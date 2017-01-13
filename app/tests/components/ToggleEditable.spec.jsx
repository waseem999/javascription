import React from 'react';
import chai, {expect} from 'chai';
import {render, shallow} from 'enzyme';
import {spy} from 'sinon';
import {
  ToggleEditable,
  TextArea,
  TextInput
} from '../../components/ToggleEditable';

chai.use(require('chai-enzyme')());
chai.use(require('sinon-chai'));

const initProps = {
  editable: false,
  content: 'The brown fox is fast.'
};

describe('<ToggleEditable />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ToggleEditable {...initProps} />);
  });

  it('should render without errors', () => {
    expect(wrapper).to.exist;
  });

  it('should have the class `.c-toggle-editable`', () => {
    expect(wrapper).to.have.className('c-toggle-editable');
  });

  it('should display `props.content` as text when `props.editable` is false', () => {
    const props = Object.assign({}, initProps, { editable: false }
    );
    expect(shallow(<ToggleEditable {...props} />).text()).to.equal(initProps.content);
  });

  describe('when `props.editable` is true and `props.inputType` equals \'text\'', () => {
    const props = Object.assign({}, initProps, {
      attributes: {
        placeholder: 'foo',
        value: 'bar'
      },
      editable: true,
      inputType: 'text'
    });

    beforeEach(() => {
      wrapper = shallow(<ToggleEditable {...props} />);
    });

    it('should contain a text input', () => {
      expect(wrapper.children('TextInput').length).to.equal(1);
    });

    it('should pass `props.attributes` to TextInput as props', () => {
      const input = wrapper.children('TextInput');
      expect(input).to.have.prop('placeholder', props.attributes.placeholder);
      expect(input).to.have.prop('value', 'bar');
    });
  });

  describe('when `props.editable` is true and `props.inputType` equals \'textarea\'', () => {
    const props = Object.assign({}, initProps, {editable: true, inputType: 'textarea'});

    beforeEach(() => {
      wrapper = shallow(<ToggleEditable {...props} />);
    });

    it('should contain a text input', () => {
      expect(wrapper.children('TextArea').length).to.equal(1);
    });
  });

  describe('<TextInput />', () => {
    const props = {
      placeholder: 'foobar',
      value: 'foobaz',
      onChange: spy(),
      onFocus: spy()
    };

    beforeEach(() => {
      props.onChange.reset();
      props.onFocus.reset();
      wrapper = shallow(<TextInput {...props} />);
    });

    it('should contain a text input', () => {
      expect(wrapper.type()).to.equal('input');
      expect(wrapper).to.have.attr('type', 'text');
    });

    it('should set it\'s attributes to the values of `props`', () => {
      expect(wrapper).to.have.attr('placeholder', props.placeholder);
      expect(wrapper).to.have.attr('value', props.value);
    });

    it('should call event handlers when triggered', () => {
      wrapper.simulate('change');
      wrapper.simulate('focus');
      expect(props.onChange).to.have.been.calledOnce;
      expect(props.onFocus).to.have.been.calledOnce;
    });
  });

  describe('<TextArea />', () => {
    const props = {
      content: 'lorem ipsum',
      name: 'jimmy',
      onChange: spy(),
      onFocus: spy(),
      placeholder: 'foobar'
    };

    beforeEach(() => {
      props.onChange.reset();
      props.onFocus.reset();
      wrapper = shallow(<TextArea {...props} />);
    });

    it('should contain a textarea', () => {
      expect(wrapper.type()).to.equal('textarea');
    });

    it('should set it\'s attributes to the values of `props`', () => {
      expect(wrapper).to.have.attr('placeholder', props.placeholder);
      expect(wrapper).to.have.attr('name', props.name);
    });

    it('should call event handlers when triggered', () => {
      wrapper.simulate('change');
      wrapper.simulate('focus');
      expect(props.onChange).to.have.been.calledOnce;
      expect(props.onFocus).to.have.been.calledOnce;
    });

    it('should have inner text equal to `props.content`', () => {
      expect(wrapper.text()).to.equal(props.content);
    });
  });
});
