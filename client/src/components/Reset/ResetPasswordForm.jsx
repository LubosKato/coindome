import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TranslationContainer from '../../containers/TranslationContainer';
import styles from '../../styles/Index.css';

const ResetPasswordForm = ({
  onSubmit, onChange, errors, user,
}) => (
  <Card className={styles.container}>
    <form action="/" onSubmit={onSubmit}>
      <h2 className={styles.card_heading}>
        <TranslationContainer translationKey="user_welcome_text" />
        {' '}
        {user.name}
      </h2>
      <TranslationContainer translationKey="update_password_text" />
      {' '}
      {errors.summary && <p className={styles.error_message}>{errors.summary}</p>}
      <div className={styles.field_line}>
        <TextField
          floatingLabelText={<TranslationContainer translationKey="curr_password_text" />}
          type="password"
          name="currentpwd"
          onChange={onChange}
          errorText={errors.currentpwd}
          value={user.currentpwd}
        />
      </div>

      <div className={styles.field_line}>
        <TextField
          floatingLabelText={<TranslationContainer translationKey="new_password_text" />}
          type="password"
          name="newpwd"
          onChange={onChange}
          errorText={errors.password}
          value={user.newpwd}
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
          label={<TranslationContainer translationKey="update_password_text" />}
          primary
        />
      </div>
    </form>
  </Card>
);

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default ResetPasswordForm;
