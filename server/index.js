const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const localizify = require('localizify');
const en = require('./constants/en.json');
const sk = require('./constants/sk.json');
const schema = require('./data/schema.js');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const cors = require('cors');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var path=require('path');
// connect to the database and load models
require('./models').connect(config.dbUri);

const app = express();
//app.use('*', cors({ origin: `http://localhost:8080` }));
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

app.use(logger('dev'));
app.use(bodyParser.json());
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// pass the passport middleware
app.use(passport.initialize());

//localizify for nodejs
app.use((request, response, next) => {
  const lang = request.headers['accept-language'] || 'en_US';
  localizify.setLocale(lang);
  next();
});

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.get('*.css', function(req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/css');
  next();
 });

app.use(express.static('../client/public'))
app.use(express.static(__dirname + '/'));

localizify
  .add('en_US', en)
  .add('sk_SK', sk)
  .setLocale('en_US');

// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
const localChangePassportStrategy = require('./passport/local-changePwd');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);
passport.use('local-changepwd', localChangePassportStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
app.use('/auth', authRoutes);
app.use('/api/v1/', apiRoutes);

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql',  subscriptionsEndpoint:  'wss://coindome.herokuapp.com/subscriptions' }));

app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/service-worker.html'));
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const GRAPHQL_PATH = '/graphql'
app.use(GRAPHQL_PATH, bodyParser.json(), graphqlExpress({
  schema: schema
}))

const port = process.env.PORT || 3000;
const httpServer = this._httpServer = app.listen(port)
SubscriptionServer.create(
  {schema: schema, execute, subscribe},
  {server: httpServer, path: GRAPHQL_PATH},
)