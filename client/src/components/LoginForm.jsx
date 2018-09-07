import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import TranslationContainer from '../containers/TranslationContainer';
import styles from '../styles/Index.css';

const LoginForm = ({
  onSubmit, onChange, errors, successMessage, user, facebookResponse, googleResponse, onFailure,
}) => (
  <Card className={styles.container}>
    <form action="/" onSubmit={onSubmit}>
      <h2 className={styles.card_heading}><TranslationContainer translationKey="login_text" /></h2>
      <div className={styles.field_line}>
        <FacebookLogin
          appId="265160767429693"
          autoLoad={false}
          fields="name,email,picture"
          callback={facebookResponse}
        />
      </div>
      <div className={styles.field_line}>
        <GoogleLogin
          clientId="409271290184-l962h3l398k6729vj2ht8rs77662apil.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={googleResponse}
          onFailure={onFailure}
        />
      </div>
      <div><TranslationContainer translationKey="or" /></div>
      {successMessage && <p style={{ fontSize: '16px', color: 'green' }}>{successMessage}</p>}
      {errors.summary && <p style={{ fontSize: '16px', color: 'tomato' }}>{errors.summary}</p>}

      <div className={styles.field_line}>
        <TextField
          floatingLabelText={<TranslationContainer translationKey="email_alias" />}
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className={styles.field_line}>
        <TextField
          floatingLabelText={<TranslationContainer translationKey="password_alias" />}
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className={styles.button_line}>
        <RaisedButton
          type="submit"
          label={<TranslationContainer translationKey="login_text" />}
          primary
        />
      </div>
      <CardText>
        <TranslationContainer translationKey="reset_legend" />
        <Link to="/sendreset"><TranslationContainer translationKey="reset_text" /></Link>
      </CardText>
      <CardText>
        <TranslationContainer translationKey="login_legend" />
        <Link to="/signup"><TranslationContainer translationKey="create_text" /></Link>
      </CardText>
    </form>
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  facebookResponse: PropTypes.func.isRequired,
};

export default LoginForm;
