import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TranslationContainer from '../containers/TranslationContainer';
import styles from '../styles/Index.css';

const SignUpForm = ({
  onSubmit, onChange, errors, user,
}) => (
  <Card className={styles.loginContainer}>
    <form action="/" onSubmit={onSubmit}>
      <h2 className={styles.card_heading}><TranslationContainer translationKey="signup_text" /></h2>

      {errors.summary && <p className={styles.error_message}>{errors.summary}</p>}

      <div className={styles.field_line}>
        <TextField
          floatingLabelText={<TranslationContainer translationKey="name_text" />}
          name="name"
          errorText={errors.name}
          onChange={onChange}
          value={user.name}
        />
      </div>

      <div className={styles.field_line}>
        <TextField
          floatingLabelText={<TranslationContainer translationKey="email_text" />}
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className={styles.field_line}>
        <TextField
          floatingLabelText={<TranslationContainer translationKey="password_text" />}
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className={styles.field_line}>
        <TextField
          floatingLabelText={<TranslationContainer translationKey="confirm_password_text" />}
          type="password"
          name="confirmPassword"
          onChange={onChange}
          errorText={errors.password}
          value={user.confirmPassword}
        />
      </div>

      <div className={styles.button_line}>
        <RaisedButton
          type="submit"
          label={<TranslationContainer translationKey="create_text" />}
          primary
        />
      </div>

      <CardText>
        <TranslationContainer translationKey="have_account_text" />
        <Link to="/login"><TranslationContainer translationKey="login_text" /></Link>
      </CardText>
    </form>
  </Card>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

export default SignUpForm;
