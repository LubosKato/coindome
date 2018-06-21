import React from 'react';
import { Card } from 'material-ui/Card';
import TranslationContainer from './../../containers/TranslationContainer.jsx';
import styles from './../../styles/Index.css'

const ProfileSuccess = () => (
  <Card className={styles.container}>
    <h2 className={styles.card_heading}><TranslationContainer translationKey="user_welcome_text"/> {JSON.parse(localStorage.getItem('usrname')).name}</h2>
      <TranslationContainer translationKey="update_password_success_text"/>
  </Card>
);
export default ProfileSuccess;
