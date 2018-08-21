import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle } from 'material-ui/Card';
import Auth from '../modules/Auth';
import DashboardPage from '../containers/DashboardContainer';
import styles from '../styles/Index.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.cardtitleP = '';
    this.cardsubtitle = '';
  }

  render() {
    const { cardsubtitleP } = this.props;
    const { cardtitleP } = this.props;
    return (
      <div>
        {Auth.isUserAuthenticated() === false
          ? (
            <Card className={styles.container}>
              <CardTitle title={cardtitleP} subtitle={cardsubtitleP} />
            </Card>
          )
          : (<DashboardPage />)}
      </div>
    );
  }
}

Home.propTypes = {
  cardtitleP: PropTypes.object.isRequired,
  cardsubtitleP: PropTypes.object.isRequired,
};

export default Home;
