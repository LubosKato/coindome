# Coindome

This is blueprint for react app with nodejs.<br />
Its using mongolab for mongodb and heroku for hosting<br />
User password is hashed in DB,<br />
Redux is used for translations and currency (visible after login)<br />
React FE is addressing Node backend via Apollo graphQL
<br />
Use GraphiQL console for query data for Bitcoin diagram
<br />
Audit results<br />
![alt text](https://github.com/kejto/coindome/blob/master/client/public/images/results.jpg)

### Hosted on Heroku
https://coindome.herokuapp.com/

### Installing

yarn localinstall

## Getting Started

"yarn start"

### Prerequisites

VS Code

## Authors

* **Lubos Kato** - *Initial work* - [kejto](https://github.com/kejto)

## License

This project is licensed under the MIT License

## Acknowledgments

* credits for jwt oauth 2.0 implementation https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt

## TODO
* include tests
* add messaging system over websockets
* add wrong password retries
* add administration of the users / roles
* implement CI builds with heroku
