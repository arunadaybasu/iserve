import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Container, Row, Col} from 'react-grid-system';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/image/lens';
import ActionFavoriteBorder from 'material-ui/svg-icons/image/panorama-fish-eye';
import axios from 'axios';
import Cookies from 'universal-cookie';

const receiptbg = require("../imgs/receiptbg.png");

const primaryColor = '#3386f4';
const hoverColor = '#3E8CF8';
let counter = 1;
let total = 0;

const cookies = new Cookies();

const axiosConfig = {
  withCredentials: true,
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export class Payment extends Component {

  constructor() {
    super();
    this.state = {
      deviceFullDescription: cookies.get('device-brand') + ' ' + cookies.get('device-model'),
      issues: '',
      payLabel: '',
      method: 'delivery'
    };
    this.handleChangeMethod = this.handleChangeMethod.bind(this);
    this.handlePageRedirect = this.handlePageRedirect.bind(this);
    this.handleAddPayment = this.handleAddPayment.bind(this);
  }

  handleAddPayment(e) {
    e.preventDefault();
    const payParams = {
      job: cookies.get('current-job-id'),
      amount: cookies.get('total-estimate'),
      mode: 'PayU'
    };
    axios.post('http://icore.repairmonk.com/website/addpayment/', payParams, axiosConfig).then(response => {
      console.log(response);
      if (response.data.status === 'Successful') {
        cookies.set('total-paid', cookies.get('total-estimate'), {path: '/'});
        window.location = '/track';
      }
    }).catch(error => {
      console.log(error);
    });
  }

  handlePageRedirect(e) {
    e.preventDefault();
    window.location = '/' + this.state.method;
  }

  handleChangeMethod(e, value) {
    e.preventDefault();
    console.log(value);
    this.setState({
      method: value
    });
  }

  componentDidMount() {
    console.log('device pincode cookie:' + cookies.get('pincode'));
    console.log('device type cookie:' + cookies.get('device-type'));
    console.log('device brand cookie:' + cookies.get('device-brand'));
    console.log('device model cookie:' + cookies.get('device-model'));
    console.log('device colour cookie:' + cookies.get('device-colour'));
    console.log('device issues cookie:' + cookies.get('device-issues'));
    console.log('current job id:' + cookies.get('current-job-id'));
    console.log('issue length: ' + cookies.get('device-issues').length);

    console.log(cookies.get('device-issues').join());
    const issueList = {
      model: cookies.get('device-model'),
      issue: cookies.get('device-issues').join()
    };
    axios.post('http://icore.repairmonk.com/website/check_estimate/', issueList, axiosConfig).then(response => {
      console.log(response);
      const issuesList = response.data.estimate.map(result => {
        total += result.estimate_amount;
        return (
          <Row key={counter++} className="marginTop20">
            <Col lg={6} md={6} sm={6} xs={6}>
              <span className="issue-heading">
                {result.estimate_issue}
              </span>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
              <span className="issue-heading floatRight">
                <strong>{result.estimate_amount}</strong>
              </span>
            </Col>
          </Row>
        );
      });
      this.setState({
        issues: issuesList,
        netTime: response.data.net_time,
        payLabel: 'PAY ₹ ' + total
      });
      cookies.set('total-estimate', total, {path: '/'});
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div id="mask">
            <Container fluid className="estimateContainer" style={{paddingBottom: '50px'}}>
              <Row>
                <Col sm={4} xs={12}>
                  <br/>
                </Col>
                <Col sm={4} xs={12}>
                  <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <span className="product-heading">
                        PRODUCT
                      </span>
                      <p className="product-name">{this.state.deviceFullDescription}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <span className="product-heading">
                        ISSUES
                      </span>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <span className="product-heading floatRight">
                        INR
                      </span>
                    </Col>
                  </Row>
                  {this.state.issues}
                  <Row className="rowWidth100 marginTop20">
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <span className="product-heading">
                        JOB DURATION
                      </span>
                      <p className="product-name">{this.state.netTime}</p>
                    </Col>
                  </Row>
                  <Row className="rowWidth100 marginTop20">
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <span className="product-heading marginBottom20">
                        SCHEDULE
                      </span>
                      <RadioButtonGroup name="scheduleMethod" defaultSelected="delivery" onChange={this.handleChangeMethod}>
                        <RadioButton
                          value="delivery"
                          label="Pickup and Delivery"
                          checkedIcon={<ActionFavorite style={{color: '#F44336'}}/>}
                          uncheckedIcon={<ActionFavoriteBorder/>}
                          style={{margin: '10px'}}
                          iconStyle={{width: '15px'}}
                          disableTouchRipple
                          />
                        <RadioButton
                          value="walkin"
                          label="Walk in"
                          checkedIcon={<ActionFavorite style={{color: '#F44336'}}/>}
                          uncheckedIcon={<ActionFavoriteBorder/>}
                          style={{margin: '10px'}}
                          iconStyle={{width: '15px'}}
                          disableTouchRipple
                          />
                        <RadioButton
                          value="itechie"
                          label="iTechie doorstep visit"
                          checkedIcon={<ActionFavorite style={{color: '#F44336'}}/>}
                          uncheckedIcon={<ActionFavoriteBorder/>}
                          style={{margin: '10px'}}
                          iconStyle={{width: '15px'}}
                          disableTouchRipple
                          />
                      </RadioButtonGroup>
                    </Col>
                  </Row>
                  <a href="/payment" style={{textAlign: 'center', padding: '10px 0', display: 'block'}}>Skip payment for now</a>
                  <Row className="floating-btn-bot-row">
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label={this.state.payLabel} fullWidth style={{color: '#fff'}} className="floating-btn-bot" onClick={this.handlePageRedirect}/>
                    </Col>
                  </Row>
                </Col>
                <Col sm={4} xs={12}>
                  <br/>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="receipt-section" style={{backgroundImage: "url('" + receiptbg + "')", backgroundRepeat: 'no-repeat', paddingTop: '10px', backgroundPosition: 'center top', position: 'fixed', bottom: '0', left: '50%', marginLeft: '-37.5%', width: '75%'}}>
            <Container fluid>
              <Row>
                <Col sm={4} xs={12}>
                  <br/>
                </Col>
                <Col sm={4} xs={12}>
                  <div style={{textAlign: 'center', width: '100%'}}>
                    <img src={require("../imgs/confirmed.png")} style={{width: '100px'}}/>
                  </div>
                  <h2 className="receipt-heading">
                    Your order<br/>
                    for <span>₹ {cookies.get('total-estimate')}</span> is confirmed.
                  </h2>
                  <a onHover={{}} onClick={this.handleAddPayment} className="receipt-a">
                    TRACK YOUR ORDER
                  </a>
                </Col>
                <Col sm={4} xs={12}>
                  <br/>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
