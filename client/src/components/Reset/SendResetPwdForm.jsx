import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TranslationContainer from '../../containers/TranslationContainer';
import styles from '../../styles/Index.css';

const SendResetPwdForm = ({
  onSubmit, onChange, errors, user,
}) => (
  <Card className={styles.container}>
    <form action="/" onSubmit={onSubmit}>
      <h2 className={styles.card_heading}><TranslationContainer translationKey="reset_text" /></h2>

      {errors.summary && <p className={styles.error_message}>{errors.summary}</p>}

      <div className={styles.field_line}>
        <TextField
          floatingLabelText={<TranslationContainer translationKey="email_text" />}
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className={styles.button_line}>
        <RaisedButton
          type="submit"
          label={<TranslationContainer translationKey="sendEmail_text" />}
          primary
        />
      </div>
    </form>
  </Card>
);

SendResetPwdForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default SendResetPwdForm;
