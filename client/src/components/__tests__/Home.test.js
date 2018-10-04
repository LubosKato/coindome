import React from 'react';
import { shallow } from 'enzyme';
import Home from '../Home';

describe('Home', () => {
  let mountedHome;
  beforeEach(() => {
    mountedHome = shallow(<Home />);
  });

  it('renders without crashing', () => {
    const mountedHome = shallow(<Home />);
  });

//   it('contains a image', () => {
//     const img = mountedHome.find('img');
//     expect(img.length).toBe(1);
//   });

//   it('displays the none map when no params are given', () => {
//     const defaultMap = mountedMap.find('img [src="images/none.png"]');
//     expect(defaultMap.length).toBe(1);
//   });
});
