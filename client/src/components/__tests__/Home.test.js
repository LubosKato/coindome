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

  it('contains a card title', () => {
    const title = mountedHome.find('CardTitle');
    expect(title.length).toBe(1);
  });
});
