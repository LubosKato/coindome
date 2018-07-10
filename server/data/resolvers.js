const CoinBase = require('./connectors.js');
const GraphQLJSON = require('graphql-type-json');

const resolvers= {
  JSON: GraphQLJSON,
  Query: {
    getGraphData(obj, args, context, info) {
      return CoinBase.getOne(args.currency,args.period);
    },
    getInfoBox() {
      return CoinBase.getInfo();
    }
  }
};

module.exports = resolvers;
