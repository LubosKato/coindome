const CoinBase = require('./connectors.js');
const GraphQLJSON = require('graphql-type-json');
const { PubSub } = require('graphql-subscriptions');
const { withFilter } = require('graphql-subscriptions');

const pubsub = new PubSub();
const NOTIFICATION_SUBSCRIPTION_TOPIC = 'newNotifications';

const notifications = [];
let id = 0;

const resolvers= {
  JSON: GraphQLJSON,
  Query: {
    getGraphData(obj, args, context, info) {
      return CoinBase.getOne(args.currency,args.period);
    },
    getInfoBox() {
      return CoinBase.getInfo();
    },
    notifications: () => notifications
  },  
  Mutation: {
    pushNotification: (root, args) => {
      const newNotification = { id : id++, label: args.label };
      notifications.push(newNotification);
      pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, { newNotification: newNotification });

      return newNotification;
    },
  },
  Subscription: {
      newNotification: {
        subscribe: withFilter(() => pubsub.asyncIterator(NOTIFICATION_SUBSCRIPTION_TOPIC),
        (payload, variables) =>  {
          //console.log('!!!', payload, variables)
          return true;
        })
      }
  },
};

module.exports = resolvers;
