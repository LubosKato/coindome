import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../FooterC';

describe('Footer', () => {
  let mountedFooter;
  beforeEach(() => {
    mountedFooter = shallow(<Footer />);
  });

  it('renders without crashing', () => {
    const mountedFooter = shallow(<Footer />);
  });


});
