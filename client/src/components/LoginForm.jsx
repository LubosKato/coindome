import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TranslationContainer from './../containers/TranslationContainer.jsx';
import styles from './../styles/Index.css'

const LoginForm = ({onSubmit,onChange,errors,successMessage,user}) => (
  <Card className={styles.container}>
    <form action="/" onSubmit={onSubmit}>
      <h2 className={styles.card_heading}><TranslationContainer translationKey="login_text"/></h2> 

      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      {errors.summary && <p className={styles.error_message}>{errors.summary}</p>}

      <div className={styles.field_line}>
        <TextField
          floatingLabelText={<TranslationContainer translationKey="email_alias"/>}
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className={styles.field_line}>
        <TextField
          floatingLabelText={<TranslationContainer translationKey="password_alias"/>}
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className={styles.button_line}>
        <RaisedButton type="submit" label={<TranslationContainer translationKey="login_text"/>} primary />
      </div>

      <CardText><TranslationContainer translationKey="login_legend"/> <Link to={'/signup'}><TranslationContainer translationKey="create_text"/></Link>.</CardText>
    </form>
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
