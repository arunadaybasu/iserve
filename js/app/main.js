import React, {Component} from 'react';
import {Header} from './header';
import {Footer} from './footer';
import {Landing} from './landing/landing';
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

export class Main extends Component {
  constructor(props) {
    super(props);
    axios.defaults.headers.common.Authorization = 'Basic b250aGVkb3Q6dGVzdEAxMjM=';
  }
  render() {
    return (
      <div style={styles.container}>
        <Header/>
        <Landing/>
        <Footer/>
      </div>
    );
  }
}
