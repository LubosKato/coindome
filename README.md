# Coindome

This is blueprint for react app with nodejs.<br />
Its using mongolab for mongodb and heroku for hosting<br />
User password is hashed in DB,<br />
Redux is used for translations and currency (visible after login)<br />
React FE is addressing Node backend via Apollo graphQL
<br />
Use GraphiQL console for query data for Bitcoin diagram


### Hosted on Heroku
https://coindome.herokuapp.com/

### Installing

npm install

## Getting Started

please run in 2 separate terminals :
* npm run bundle
* npm start

### Prerequisites

VS Code

## Authors

* **Lubos Kato** - *Initial work* - [kejto](https://github.com/kejto)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* credits for jwt oauth 2.0 implementation https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt

## TODO
* include tests
* add logout timeout, wrong password retries (5)
* add administration of the users / roles
