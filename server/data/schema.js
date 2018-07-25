const { makeExecutableSchema } = require('graphql-tools');
// import mocks from './mocks';
const resolvers = require('./resolvers.js');

const schemaString = `
scalar JSON
type Query {
  getGraphData(currency: String, period: String): Bitcoin @cacheControl(maxAge: 5000)
  getInfoBox: InfoBox @cacheControl(maxAge: 5000)
  notifications: [Notification]
}
type Notification { label: String }
type Mutation { pushNotification(label: String!): Notification }
type Subscription { newNotification: Notification }
type Bitcoin {
  period: String
  currency: String
  bpi: JSON
  disclaimer: String
  time: Time
}
type Time{
  updated: String
  updatedISO: String
  updateduk: String
}
type InfoBox{
  time: Time
  disclaimer: String
  chartName: String
  bpi: JSON
}`;

const schema = makeExecutableSchema({ typeDefs: schemaString, resolvers: resolvers })

// addMockFunctionsToSchema({ schema, mocks });

module.exports =  schema;
