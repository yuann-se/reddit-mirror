import React from "react";
import { shallow } from "enzyme";
import { Dropdown } from "../Dropdown";

describe ('Dropdown', () => {
  test ('should render', () => {
    const wrapper = shallow (<Dropdown children={<div />} button={<button />}/>);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('button').isEmptyRender()).toBeFalsy();
  })

  test('should render (snapshot)', () => {
    const wrapper = shallow (<Dropdown children={<div />} button={<button />}/>);
    expect(wrapper).toMatchSnapshot();
  })
})
