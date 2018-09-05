import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import TranslationContainer from '../containers/TranslationContainer';
import styles from '../styles/Index.css';
import PushNotification from './Notifications/PushNotification';

const Confirmation = ({ response }) => (
  <Card className={styles.container}>
    {/* <CardTitle
      title={<TranslationContainer translationKey="dashboard_text" />}
      subtitle={<TranslationContainer translationKey="logged_in_text" />}
    /> */}
    <PushNotification label="verify" />
    {' '}
    {response && (
    <CardText style={{
      fontSize: '16px',
      color: 'green',
    }}
    >
      {response}
    </CardText>
    )}
  </Card>
);

Confirmation.propTypes = {
  response: PropTypes.string.isRequired,
};

export default Confirmation;
