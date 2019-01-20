import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Container, Row, Col} from 'react-grid-system';
import axios from 'axios';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import ClevertapReact from 'clevertap-react';

ClevertapReact.initialize("TEST-758-986-794Z");

const styles = {
  block: {
    maxWidth: 250
  },
  radioButton: {
    marginBottom: 16
  },
  availableIconStyle: {
    float: 'right',
    display: 'block',
    marginRight: 69,
    marginTop: 25,
    position: 'relative',
    zIndex: 2,
    color: '#41c0ad',
    fontSize: 44
  }
};

const circleStyle = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block'
};

const axiosConfig = {
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  data: {
    device: 'Mobile Phone',
    brand: 'Apple',
    model: 'iPhone 7',
    colour: 'White'
  }
};

export class Estimate extends Component {

  componentWillMount() {
    axios.post('http://icore.repairmonk.com/website/issues/', JSON.stringify(axiosConfig))
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Container className="section landing-repair-estimate">
          <Row className="repair-row-estimate-product">
            <Col sm={4}/>
            <Col sm={4} xs={12}>
              <div className="product-title">PRODUCT</div>
              <div className="product-desc">
                Samsung NOTEBOOK 9
              </div>
            </Col>
            <Col sm={4}/>
          </Row>
          <Row className="repair-row-estimate-issues">
            <Col sm={4}/>
            <Col sm={4} xs={12}>
              <div className="issue-header">ISSUES</div>
              <div className="issue-amt">INR</div>
            </Col>
            <Col sm={4}/>
          </Row>
          <Row className="repair-row-estimate-issues">
            <Col sm={4}/>
            <Col sm={4} xs={12}>
              <div className="issue-type">SCREEN DAMAGE</div>
              <div className="issue-cost">5,000</div>
            </Col>
            <Col sm={4}/>
          </Row>
          <Row className="repair-row-estimate-issues">
            <Col sm={4}/>
            <Col sm={4} xs={12}>
              <div className="issue-type">BATTERY PROBLEMS</div>
              <div className="issue-cost">2,000</div>
            </Col>
            <Col sm={4}/>
          </Row>
          <Row className="repair-row-estimate-issues">
            <Col sm={4}/>
            <Col sm={4} xs={12}>
              <div className="issue-type">NOT SWITCHING ON</div>
              <div className="issue-cost">4,000</div>
            </Col>
            <Col sm={4}/>
          </Row>
          <Row className="repair-row-jobduration-product">
            <Col sm={4}/>
            <Col sm={4} xs={12}>
              <div className="product-title">JOB DURATION</div>
              <div className="product-desc">
                2 days 14 hours
              </div>
            </Col>
            <Col sm={4}/>
          </Row>
          <Row className="repair-row-schedule-product">
            <Col sm={4}/>
            <Col sm={4} xs={12}>
              <div className="product-title">SCHEDULE</div>
              <br/>
              <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                <RadioButton
                  value="light"
                  label="Delivery"
                  style={styles.radioButton}
                  />
                <RadioButton
                  value="not_light"
                  label="Pick up and drop"
                  style={styles.radioButton}
                  />
                <RadioButton
                  value="not_light2"
                  label="iTechie visit"
                  style={styles.radioButton}
                  />
              </RadioButtonGroup>
            </Col>
            <Col sm={4}/>
          </Row>
          <Row className="row-addpickup-add1">
            <Col sm={4}/>
            <Col className="col-walking" lg={12} sm={4} xs={12}>
              <RaisedButton className="proceed-button" label="PAY ₹11,199" backgroundColor="#3386f4" labelColor="#FFFFFF" fullWidth/>
            </Col>
            <Col sm={4}/>
          </Row>
          <Row className="row-estimate-receipt">
            <Col sm={4}/>
            <Col className="col-walking" lg={12} sm={4} xs={12}>
              <Paper className="estimate-paper-container" style={{height: '100%', width: '100%', textAlign: 'center', marginBottom: '5%', display: 'block'}} zDepth={2}>
                <Paper style={circleStyle} zDepth={1} circle>
                  <i className="fa fa-check" aria-hidden="true" style={styles.availableIconStyle}/>
                </Paper>
                <div className="order-text">
                  Your order for ₹11,119 is confirmed.
                </div>
                <div className="track-order">
                  TRACK YOUR ORDER
                </div>
              </Paper>
            </Col>
            <Col sm={4}/>
          </Row>
        </Container>
      </MuiThemeProvider>
    );
  }
}
