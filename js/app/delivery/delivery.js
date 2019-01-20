import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Container, Row, Col, Visible} from 'react-grid-system';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ActionFavorite from 'material-ui/svg-icons/image/lens';
import ActionFavoriteBorder from 'material-ui/svg-icons/image/panorama-fish-eye';
import CircularProgress from 'material-ui/CircularProgress';
import Cookies from 'universal-cookie';
import axios from 'axios';
const geolocator = require('geolocator');
const axiosConfig = {
  withCredentials: true
};
let counter = 0;
let counterAdd = 0;

const cookies = new Cookies();

export class Delivery extends Component {

  constructor() {
    super();
    this.state = {
      deviceFullDescription: cookies.get('device-brand') + ' ' + cookies.get('device-model'),
      issues: '',
      payLabel: '',
      deliveryTime: '',
      city: '',
      postalCode: '',
      street: '',
      address: '',
      houseNumber: '',
      timeSlots: [],
      savedAddress: [],
      selectedAdd: ''
    };
    geolocator.config({
      language: 'en',
      google: {
        version: '3',
        key: 'AIzaSyBT8geVW0_7SWA40w-ngiVhb_ODVaqlJiU'
      }
    });
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleStreetChange = this.handleStreetChange.bind(this);
    this.handlePincodeChange = this.handlePincodeChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleAddJob = this.handleAddJob.bind(this);
  }

  componentDidMount() {
    console.log('loaded user id:' + cookies.get('userId'));
    console.log('total-estimate:' + cookies.get('total-estimate'));
    console.log(cookies.get('device-issues').join());
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumWait: 10000,
      maximumAge: 0,
      desiredAccuracy: 30,
      fallbackToIP: true,
      addressLookup: true,
      timezone: true
    };
    geolocator.locate(options, (err, location) => {
      if (err) {
        return console.log(err);
      }
      console.log(location);
      this.setState({
        city: location.address.city,
        postalCode: location.address.postalCode,
        street: location.address.street,
        address: location.formattedAddress
      });
      cookies.set('city', location.address.city, {path: '/'});
      cookies.set('postalCode', location.address.postalCode, {path: '/'});
      cookies.set('street', location.address.street, {path: '/'});
      cookies.set('address', location.formattedAddress, {path: '/'});
      document.querySelector('#disappear-text').style.opacity = 0;
    });
    axios.get('http://icore.repairmonk.com/website/walkin_time/', JSON.stringify(axiosConfig))
      .then(response => {
        console.log(response);
        const allTimes = response.data.map(val => {
          if (counter === 0) {
            this.setState({
              deliveryTime: val
            });
          }
          return (
            <MenuItem key={counter++} className="menu-item-repair" value={val} primaryText={val}/>
          );
        });
        this.setState({
          timeSlots: allTimes
        });
      })
      .catch(error => {
        console.log(error);
      });
    axios.post('http://icore.repairmonk.com/website/user/', {id: cookies.get('userId')}, JSON.stringify(axiosConfig))
      .then(response => {
        console.log(response);
        const addresses = response.data.address.map(add => {
          console.log(add);
          if (counterAdd === 0) {
            this.setState({
              selectedAdd: add.id
            });
          }
          return (
            <RadioButton
              key={counterAdd++}
              value={add.id}
              label={add.address_first_line + '...'}
              checkedIcon={<ActionFavorite style={{color: '#7ed321'}}/>}
              uncheckedIcon={<ActionFavoriteBorder style={{color: '#d6edff'}}/>}
              style={{margin: '10px'}}
              iconStyle={{width: '15px'}}
              disableTouchRipple
              />
          );
        });
        this.setState({
          savedAddress: addresses
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleAddJob(e) {
    e.preventDefault();
    console.log(this.state.selectedAdd);
    if (this.state.houseNumber) {
      axios.post('http://icore.repairmonk.com/website/updateprofile/', {id: cookies.get('userId'), address: [{address_first_line: this.state.houseNumber, address_second_line: this.state.street, city: this.state.city, state: '', country: 'India', pincode: this.state.postalCode}]}, JSON.stringify(axiosConfig))
      .then(response => {
        console.log(response);
        if (response.data.status === 'Successful') {
          axios.post('http://icore.repairmonk.com/website/user/', {id: cookies.get('userId')}, JSON.stringify(axiosConfig))
            .then(response => {
              console.log(response);
              for (let j = 0; j < response.data.address.length; j++) {
                console.log(response.data.address[j].address_first_line, this.state.houseNumber);
                if (response.data.address[j].address_first_line === this.state.houseNumber) {
                  axios.post('http://icore.repairmonk.com/website/createjob/', {customer_id: cookies.get('userId'), location_code: 'KR', address_id: response.data.address[j].id, device_id: cookies.get('device-model-id'), problems: cookies.get('device-issues'), colour: cookies.get('device-colour'), type: 'Service Center'}, JSON.stringify(axiosConfig))
                    .then(response => {
                      console.log(response);
                      if (response.data.job_id) {
                        cookies.set('current-job-id', response.data.job_id, {path: '/'});
                        window.location = '/payment';
                      }
                      axios.post('http://icore.repairmonk.com/website/imojopayment/', {
                        id: response.data.job_id,
                        amount: 10,
                        'success-url': 'http://test.servicemonk.com/payment'
                      }, JSON.stringify(axiosConfig))
                      .then(response => {
                        console.log(response);
                        window.location = response.data.url;
                      })
                      .catch(error => {
                        console.log(error);
                      });
                    })
                    .catch(error => {
                      console.log(error);
                      cookies.set('current-job-id', 'N20322', {path: '/'});
                      window.location = '/payment';
                    });
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      axios.post('http://icore.repairmonk.com/website/createjob/', {customer_id: cookies.get('userId'), location_code: 'KR', address_id: this.state.selectedAdd, device_id: cookies.get('device-model-id'), problems: cookies.get('device-issues'), colour: cookies.get('device-colour'), type: 'Pickup and Drop'}, JSON.stringify(axiosConfig))
        .then(response => {
          console.log(response);
          if (response.data.job_id) {
            cookies.set('current-job-id', response.data.job_id, {path: '/'});
            window.location = '/payment';
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  handleAddressChange(e, val) {
    console.log(val);
    this.setState({
      selectedAdd: val
    });
    try {
      document.getElementById('floating-btn-bot-dis').classList.add('hide');
      document.getElementById('floating-btn-bot').classList.remove('hide');
    } catch (err) {
      console.log(err.message);
    }

    try {
      document.getElementById('desk-btn-dis').classList.add('hide');
      document.getElementById('desk-btn').classList.remove('hide');
    } catch (err) {
      console.log(err.message);
    }
    cookies.set('address-id', val, {path: '/'});
  }

  handleTimeChange(e, i, val) {
    console.log(i, val);
    this.setState({
      deliveryTime: val
    });
  }

  handleNumberChange(e, val) {
    this.setState({
      houseNumber: val
    });
    try {
      document.getElementById('floating-btn-bot-dis').classList.add('hide');
      document.getElementById('floating-btn-bot').classList.remove('hide');
    } catch (err) {
      console.log(err.message);
    }
    this.forceUpdate();

    try {
      document.getElementById('desk-btn-dis').classList.add('hide');
      document.getElementById('desk-btn').classList.remove('hide');
    } catch (err) {
      console.log(err.message);
    }
    this.forceUpdate();

    try {
      document.getElementById('repair-msg-row-1').classList.add('hide');
    } catch (err) {
      console.log(err.message);
    }
    this.forceUpdate();
  }

  handleStreetChange(e, val) {
    this.setState({
      street: val
    });
  }

  handlePincodeChange(e, val) {
    this.setState({
      postalCode: val
    });
  }

  handleCityChange(e, val) {
    this.setState({
      city: val
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Container fluid className="estimateContainer" style={{padding: '60px 40px 40px 40px'}}>
          <Row>
            <Col sm={2} md={4} xs={12}>
              <br/>
            </Col>
            <Col sm={8} md={4} xs={12}>
              <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                  <span className="product-heading">
                    1
                  </span>
                  <span className="product-heading" style={{paddingLeft: '20px'}}>
                    ADD PICKUP ADDRESS
                  </span>
                  <div id="loaderCircle" style={{width: '100%', textAlign: 'center'}}>
                    <CircularProgress size={24} style={{margin: '10px'}}/>
                  </div>
                </Col>
              </Row>
              <TextField onChange={this.handleNumberChange} value={this.state.houseNumber} hintText="House number / floor" fullWidth className="trackerOrder delivery"/>
              <TextField onChange={this.handleStreetChange} value={this.state.street} hintText="Street" fullWidth className="trackerOrder delivery"/>
              <TextField onChange={this.handleCityChange} value={this.state.city} hintText="City" fullWidth className="trackerOrder delivery"/>
              <TextField onChange={this.handlePincodeChange} value={this.state.postalCode} hintText="Pincode" fullWidth className="trackerOrder delivery"/>
              <Row className="rowWidth100 marginTop20">
                <Col xs={1}>
                  <br/>
                </Col>
                <Col xs={10}>
                  <div className="product-heading middle" style={{paddingLeft: '20px'}}>
                    <span>
                      OR
                    </span>
                  </div>
                  <span className="product-heading marginBottom20 marginTop20">
                    SAVED ADDRESSES
                  </span>
                  <RadioButtonGroup name="savedAddress" value={this.state.selectedAdd} onChange={this.handleAddressChange}>
                    {this.state.savedAddress}
                  </RadioButtonGroup>
                </Col>
                <Col xs={1}>
                  <br/>
                </Col>
              </Row>
              <Row className="marginTop20">
                <Col lg={12} md={12} sm={12} xs={12}>
                  <span className="product-heading">
                    2
                  </span>
                  <span className="product-heading" style={{paddingLeft: '20px'}}>
                    SELECT TIME
                  </span>
                </Col>
              </Row>
              <br/>
              <SelectField
                value={this.state.deliveryTime}
                className="repair-select-field"
                hintText="Select brand..."
                onChange={this.handleTimeChange}
                fullWidth
                >
                {this.state.timeSlots}
              </SelectField>
              <div style={{width: '100%', textAlign: 'center'}}>
                <FlatButton id="desk-btn-dis" backgroundColor="#3386f4" hoverColor="#3386f4" label={(cookies.get('skip-pay') === '1') ? 'CONFIRM ORDER' : 'PAY ₹ ' + cookies.get('total-estimate')} fullWidth style={{color: '#fff', margin: '20px auto', height: '50px'}} className="floating-btn-bot-row hide-on-mobile disabled btn-height"/>
                <FlatButton id="desk-btn" onClick={this.handleAddJob} backgroundColor="#3386f4" hoverColor="#3386f4" label={(cookies.get('skip-pay') === '1') ? 'CONFIRM ORDER' : 'PAY ₹ ' + cookies.get('total-estimate')} fullWidth style={{color: '#fff', margin: '20px auto', height: '50px'}} className="floating-btn-bot-row hide hide-on-mobile btn-height"/>
              </div>
              <Visible xs sm>
                <Container fluid className="header header-mobile">
                  <Row id="floating-btn-bot" className="floating-btn-bot-row hide">
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <FlatButton onClick={this.handleAddJob} label={(cookies.get('skip-pay') === '1') ? 'CONFIRM ORDER' : 'PAY ₹ ' + cookies.get('total-estimate')} fullWidth className="floating-btn-bot"/>
                    </Col>
                  </Row>
                  <Row id="floating-btn-bot-dis" className="floating-btn-bot-row">
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <FlatButton label={(cookies.get('skip-pay') === '1') ? 'CONFIRM ORDER' : 'PAY ₹ ' + cookies.get('total-estimate')} fullWidth className="floating-btn-bot disabled"/>
                    </Col>
                  </Row>
                </Container>
              </Visible>
            </Col>
            <Col sm={2} md={4} xs={12}>
              <br/>
            </Col>
          </Row>
        </Container>
      </MuiThemeProvider>
    );
  }
}
