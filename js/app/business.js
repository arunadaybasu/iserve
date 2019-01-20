import React, {Component} from 'react';
import {AppHeader} from './headers/appheader';
import {Footer} from './footer';
import {BusinessNew} from './business/businessnew';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class Business extends Component {
  constructor() {
    super();
    axios.defaults.headers.common.Authorization = 'Basic b250aGVkb3Q6dGVzdEAxMjM=';
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppHeader title="Business"/>
          <BusinessNew/>
          <Footer/>
        </div>
      </MuiThemeProvider>
    );
  }
}
