import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle } from 'material-ui/Card';
import Auth from '../modules/Auth';
import DashboardPage from '../containers/DashboardPage.jsx';
import styles from './../styles/Index.css'

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.cardtitleP = "";
    this.cardsubtitle = "";
  }
  
  //  componentWillMount() {
  //     console.log('Component WILL MOUNT!')
  //  }

  //  componentDidMount() {
  //     console.log('Component DID MOUNT!')
  //  }

  //  componentWillReceiveProps(newProps) {    
  //     console.log('Component WILL RECIEVE PROPS!')
  //  }

  //  shouldComponentUpdate(newProps, newState) {
  //     return true;
  //  }

  //  componentWillUpdate(nextProps, nextState) {
  //     console.log('Component WILL UPDATE!');
  //  }

  //  componentDidUpdate(prevProps, prevState) {
  //     console.log('Component DID UPDATE!')
  //  }

  //  componentWillUnmount() {
  //     console.log('Component WILL UNMOUNT!')
  //  }

  render() {
    return (
      <div>
        {Auth.isUserAuthenticated() == false ? (
          <Card className={styles.container}>
          <CardTitle title={this.props.cardtitleP} subtitle={this.props.cardsubtitleP} />  
      </Card>):
      (
        <DashboardPage/>
      )}
      </div>    
    )
  }
}

Home.propTypes = {
  cardtitleP: PropTypes.object.isRequired,
  cardsubtitleP: PropTypes.object.isRequired
};

export default Home;