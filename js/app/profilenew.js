import React, {Component} from 'react';
import {AppHeader} from './headers/appheader';
import {Footer} from './footer';
import {Profile} from './profile/profile';
import axios from 'axios';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },
  main: {
    flex: 1,
    display: 'none',
    flexDirection: 'column'
  }
};

export class ProfileNew extends Component {
  constructor() {
    super();
    axios.defaults.headers.common.Authorization = 'Basic b250aGVkb3Q6dGVzdEAxMjM=';
  }
  render() {
    return (
      <div style={styles.container}>
        <AppHeader title="Profile"/>
        <Profile/>
        <main style={styles.main}>
          <br/>
        </main>
        <Footer/>
      </div>
    );
  }
}
