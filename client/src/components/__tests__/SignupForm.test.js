import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  let mountedSignUpForm;
  beforeEach(() => {
    mountedSignUpForm = shallow(<SignUpForm />);
  });

  it('renders without crashing', () => {
    const mountedSignUpForm = shallow(<SignUpForm />);
  });

//   it('contains a card title', () => {
//     const title = mountedSignupForm.find('CardText');
//     expect(title.length).toBe(1);
//   });
});
