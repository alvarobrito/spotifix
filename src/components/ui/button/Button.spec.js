import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button component', () => {
  const buttonText = 'Text button';

  it('snapshot', () => {
    const tree = renderer.create(
      <Button>{buttonText}</Button>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should contain a text passed as children', () => {
    const wrapper = shallow(
      <Button>{buttonText}</Button>
    );
    expect(wrapper.text()).toEqual(buttonText);
  });

  it('should contain an empty render if a text is not passed as children', () => {
    const wrapper = shallow(
      <Button />
    );
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
