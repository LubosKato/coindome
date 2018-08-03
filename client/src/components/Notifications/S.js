import React from "react";
import { Subscription } from "react-apollo";
import { gql } from "apollo-boost";
import { toast } from 'react-toastify';

const newNums = gql`
  subscription {
    newNum
  }
`;

export default () => (
  <Subscription subscription={newNums}>
    {({ data }) => {
      return toast(!data ? "" : data.newNum);
    }}
  </Subscription>
);
