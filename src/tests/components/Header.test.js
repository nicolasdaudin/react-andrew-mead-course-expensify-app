import React from 'react';
import {shallow} from 'enzyme';
import Header from '../../components/Header';

 test('should render Header correctly',() => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot(); 
  // what it really does is toJSON(wrapper) but this has been specified to run aumomatically in jest.config.json
  // toJSON extracts only the meaningfull part of the wrapper rendered output
  // since the wrapper is of type Shallow, there are a lot of stuff happening in there but to compare for a test, we don't need to check everything
  // (especially because some stuff would probably have changed but for the test we don't care)


  // expect(wrapper.find('h1').text()).toBe('Expensify');


  //  const renderer = new ReactShallowRenderer();
  //  renderer.render(<Header />);
  //  expect(renderer.getRenderOutput()).toMatchSnapshot();
 })