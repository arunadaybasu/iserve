import React, {Component} from 'react';
import {AppHeader} from './headers/appheader';
import {Footer} from './footer';
import {Estimate} from './estimate/estimatenew';
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

export class EstimateNew extends Component {
  constructor() {
    super();
    axios.defaults.headers.common.Authorization = 'Basic b250aGVkb3Q6dGVzdEAxMjM=';
  }
  render() {
    return (
      <div style={styles.container}>
        <AppHeader title="Estimate"/>
        <Estimate/>
        <main style={styles.main}>
          <br/>
        </main>
        <Footer/>
      </div>
    );
  }
}
