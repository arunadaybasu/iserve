import React, {Component} from 'react';
import {Header} from './header';
import {Footer} from './footer';
import axios from 'axios';
import {NewPartners} from './partners/newpartners';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class Partners extends Component {

  constructor() {
    super();
    this.state = {};
    axios.defaults.headers.common.Authorization = 'Basic b250aGVkb3Q6dGVzdEAxMjM=';
  }

  componentDidMount() {
    document.getElementById('header-top-landing').style.backgroundColor = '#d6edff';
    document.getElementById('landing-bottom-header').style.backgroundColor = '#d6edff';
    console.log(document.getElementById('header-top-landing'));
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header/>
          <NewPartners/>
          <Footer/>
        </div>
      </MuiThemeProvider>
    );
  }
}
