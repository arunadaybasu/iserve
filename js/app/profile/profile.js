import React, {Component} from 'react';
import axios from 'axios';
import {Container, Row, Col, Visible} from 'react-grid-system';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Cookies from 'universal-cookie';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import Sticky from 'react-stickynode';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
const cookies = new Cookies();
let user_status = null;
const scrollToElement = require('scroll-to-element');
const primaryColorFinal = '#3386f4';
let orders = [];
let slides = null;
const styles = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
};
export class Profile extends Component {
  constructor() {
    super();
    this.state = {
      slideIndex: 0,
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      emailId: '',
      phoneId: '',
      class: 'profileScroller',
      snackOpen: false,
      checkedNote: false,
      email_permission: false,
      sms_permission: false,
      call_permission: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleHighlight = this.handleHighlight.bind(this);
    this.handleDimHighlight = this.handleDimHighlight.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleProfileUpdateContent = this.handleProfileUpdateContent.bind(this);
    this.handleUpdateFirstName = this.handleUpdateFirstName.bind(this);
    this.handleUpdateLastName = this.handleUpdateLastName.bind(this);
    this.handleUpdateEmail = this.handleUpdateEmail.bind(this);
    this.handleUpdateMobile = this.handleUpdateMobile.bind(this);
    this.handleProfileHeader = this.handleProfileHeader.bind(this);
    this.handleTrackSolution = this.handleTrackSolution.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    axios.defaults.headers.common.Authorization = 'Basic b250aGVkb3Q6dGVzdEAxMjM=';
  }

  componentDidMount() {
    if (cookies.get('userId') === null || cookies.get('userId') === undefined || cookies.get('userId') === '') {
      window.location = '/home';
    }
    axios.post('http://icore.repairmonk.com/website/user/', {id: cookies.get('userId')}).then(response => {
      if (response.data.email_permission) {
        document.getElementById('email').classList.add('active');
      }
      if (response.data.call_permission) {
        document.getElementById('call').classList.add('active');
      }
      if (response.data.sms_permission) {
        document.getElementById('sms').classList.add('active');
      }
      this.setState({
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        phone: response.data.phone[0].phone,
        email: response.data.email[0].email,
        emailId: response.data.email[0].id,
        phoneId: response.data.phone[0].id
      });
      localStorage.setItem('userObject', JSON.stringify(response.data));
      this.forceUpdate();
    }).catch(err => {
      console.log(err);
    });

    axios.post('http://icore.repairmonk.com/website/user_jobs/', {id: cookies.get('userId')}).then(result => {
      let orderCounter = 0;
      orders = result.data.jobs.map(response => {
        if (response.status === 'Cancelled') {
          user_status = (<strong style={{color: '#FF0000'}}>{response.status}</strong>);
        } else {
          user_status = (<strong style={{color: '#32CD32'}}>{response.status}</strong>);
        }  
        return (
          <Col key={orderCounter++} sm={6} xs={6}>
            <div className="profileOrderSection">
              <Row>
                <Col xs={12}>
                  <div className="profileOrderContainer">
                    <div className="profileOrderOverlay"/>
                  </div>
                </Col>
                <Col xs={12}>
                  <div className="profileOrderContainerText">
                    <h6 className="order-pair">{response.device}</h6>
                    <p className="paddingZero order-amount-text">STATUS {user_status} </p>
                    <p className="paddingZero order-amount-text">PAID <strong>₹{response.paid_amount}</strong> </p>
                    <p className="paddingZero order-detail-text" style={{minHeight: '60px'}}>FIXED <strong>{response.problems.join()}</strong></p>
                    <Row>
                      <Col xs={12}><FlatButton id={response.jobId} onClick={this.handleTrackSolution} className="viewSolution" labelStyle={{textAlign: 'center'}} backgroundColor={primaryColorFinal} label="VIEW" fullWidth style={{color: '#fff'}}/></Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        );
      });
      this.forceUpdate();
    }).catch(err => {
      console.log(err);
    });
  }

  handleTrackSolution(e) {
    if (e.target.parentElement.parentElement.id !== null && e.target.parentElement.parentElement.id !== undefined && e.target.parentElement.parentElement.id !== '') {
      cookies.set('current-job-id', e.target.parentElement.parentElement.id, {path: '/'});
      window.location = '/track';
    }
  }

  handleChange(value) {
    this.setState({
      slideIndex: value
    });
  }

  handleHighlight(e) {
    e.target.style.border = '1px solid #3386f4';
  }

  handleDimHighlight(e) {
    e.target.style.border = '1px solid #d6edff';
  }

  handleCheckbox(e) {
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active');
      if (e.target.id === 'email') {
        this.setState({
          email_permission: false
        });
      }

      if (e.target.id === 'call') {
        this.setState({
          call_permission: false
        });
      }

      if (e.target.id === 'sms') {
        this.setState({
          sms_permission: false
        });
      }
    } else {
      e.target.classList.add('active');
      if (e.target.id === 'email') {
        this.setState({
          email_permission: true
        });
      }

      if (e.target.id === 'call') {
        this.setState({
          call_permission: true
        });
      }

      if (e.target.id === 'sms') {
        this.setState({
          sms_permission: true
        });
      }
    }
  }

  handleUpdateFirstName(e, val) {
    e.preventDefault();
    this.setState({
      firstName: val
    });
  }

  handleUpdateLastName(e, val) {
    e.preventDefault();
    this.setState({
      lastName: val
    });
  }

  handleUpdateEmail(e, val) {
    e.preventDefault();
    this.setState({
      email: val
    });
  }

  handleUpdateMobile(e, val) {
    e.preventDefault();
    this.setState({
      phone: val
    });
  }

  handlePasswordChange(e, val) {
    this.setState({
      password: val
    });
  }

  handleConfirmPasswordChange(e, val) {
    this.setState({
      passwordConfirm: val
    });
  }

  handleProfileUpdateContent() {
    let userObj = {
      id: cookies.get('userId'),
      first_name: this.state.firstName,
      second_name: this.state.lastName,
      email: [{id: this.state.emailId, email: this.state.email}],
      phone: [{id: this.state.phoneId, phone: this.state.phone}],
      call_permission: this.state.call_permission,
      email_permission: this.state.email_permission,
      sms_permission: this.state.sms_permission
    };
    if (this.state.password !== '' && this.state.password !== null && this.state.password !== undefined) {
      userObj.password = this.state.password;
    }
    axios.post('http://icore.repairmonk.com/website/updateprofile/', userObj).then(result => {
      if (result.data) {
        this.setState({
          snackOpen: true
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  handleProfileHeader(e) {
    scrollToElement('#id-' + e.target.id);
    const headers = document.getElementsByClassName('profileHeader');
    for (let i = 0; i < headers.length; i++) {
      headers[i].classList.remove('active');
    }
    e.target.classList.add('active');
  }

  handleRequestClose() {
    this.setState({
      snackOpen: false
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Sticky enabled top={50} bottomBoundary={10000} innerZ={1499} activeClass="header-mobile-sticky profile">
            <Container fluid>
              <Row className="profile-header">
                <Col sm={4} xs={12}/>
                <Col sm={4} xs={12}>
                  <Row style={{height: '50px'}}>
                    <Col className="header" sm={4} xs={4}>
                      <p className="profileHeader" id="personal" onClick={this.handleProfileHeader}>PERSONAL</p>
                    </Col>
                    <Col className="header" sm={4} xs={4}>
                      <p className="profileHeader" id="orders" onClick={this.handleProfileHeader}>ORDERS</p>
                    </Col>
                    <Col className="header" sm={4} xs={4}>
                      <p className="profileHeader" id="notifcation" onClick={this.handleProfileHeader}>NOTIFICATIONS</p>
                    </Col>
                  </Row>
                </Col>
                <Col sm={4}/>
              </Row>
            </Container>
          </Sticky>
          <Container fluid>
            <Row id="id-personal">
              <Col sm={4} xs={12}/>
              <Col sm={4} xs={12}>
                <div className="profileContainer">
                  <TextField onChange={this.handleUpdateFirstName} type="text" floatingLabelStyle={{paddingLeft: '10px', marginTop: '0px'}} inputStyle={{border: '1px solid #d6edff', borderRadius: '2px'}} className="profileName" floatingLabelText="FIRST NAME" onFocus={this.handleHighlight} onBlur={this.handleDimHighlight} value={this.state.firstName}/>
                  <TextField onChange={this.handleUpdateLastName} type="text" floatingLabelStyle={{paddingLeft: '10px', marginTop: '0px'}} inputStyle={{border: '1px solid #d6edff', borderRadius: '2px'}} className="profileName" floatingLabelText="LAST NAME" onFocus={this.handleHighlight} onBlur={this.handleDimHighlight} value={this.state.lastName}/>
                  <TextField onChange={this.handleUpdateEmail} type="text" floatingLabelStyle={{paddingLeft: '10px', marginTop: '0px'}} inputStyle={{border: '1px solid #d6edff', borderRadius: '2px'}} className="profileName" floatingLabelText="EMAIL" onFocus={this.handleHighlight} onBlur={this.handleDimHighlight} value={this.state.email}/>
                  <TextField onChange={this.handleUpdateMobile} type="number" floatingLabelStyle={{paddingLeft: '10px', marginTop: '0px'}} inputStyle={{border: '1px solid #d6edff', borderRadius: '2px'}} className="profileName" floatingLabelText="PHONE" onFocus={this.handleHighlight} onBlur={this.handleDimHighlight} value={this.state.phone}/>
                  <TextField onChange={this.handlePasswordChange} type="password" floatingLabelStyle={{paddingLeft: '10px', marginTop: '0px'}} inputStyle={{border: '1px solid #d6edff', borderRadius: '2px'}} className="profileName" floatingLabelText="PASSWORD" onFocus={this.handleHighlight} onBlur={this.handleDimHighlight} value={this.state.password}/>
                  <TextField onChange={this.handleConfirmPasswordChange} type="password" floatingLabelStyle={{paddingLeft: '10px', marginTop: '0px'}} inputStyle={{border: '1px solid #d6edff', borderRadius: '2px'}} className="profileName" floatingLabelText="CONFITM PASSWORD" onFocus={this.handleHighlight} onBlur={this.handleDimHighlight} value={this.state.confirmPassword}/>
                </div>
              </Col>
              <Col sm={4} xs={4}/>
            </Row>
            <Row id="id-orders">
              <Col sm={4} xs={12}/>
              <Col sm={4} xs={12}>
                <div className="profile-order">   
                  <Row>
                    <Col sm={12} xs={12}>
                      <p className="profileOrdertext">ORDERS</p>
                    </Col>
                    {orders}
                  </Row>
                </div>
              </Col>
              <Col sm={4} xs={4}><br/></Col>
            </Row>
            <Row id="id-notifcation" className="marginBottom40">
              <Col sm={4} xs={12}><br/></Col>
              <Col sm={4} xs={12}>
                <Row>
                  <Col xs={12}>
                    <p>NOTIFICATIONS</p>
                  </Col>
                  <Col xs={12}>
                    <div className="check-div">
                      <img id="email" src={require("../imgs/checked.png")} onClick={this.handleCheckbox}/>
                    </div>
                    <p style={{display: 'inline-block', fontSize: '12pt', verticalAlign: 'middle'}}>Email Alerts</p>
                  </Col>
                  <Col xs={12}>
                    <div className="check-div">
                      <img id="sms" src={require("../imgs/checked.png")} onClick={this.handleCheckbox}/>
                    </div>
                    <p style={{display: 'inline-block', fontSize: '12pt', verticalAlign: 'middle'}}>SMS Alerts</p>
                  </Col>
                  <Col xs={12}>
                    <div className="check-div">
                      <img id="call" src={require("../imgs/checked.png")} onClick={this.handleCheckbox}/>
                    </div>
                    <p style={{display: 'inline-block', fontSize: '12pt', verticalAlign: 'middle'}}>Call Alerts</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <div style={{width: '100%', textAlign: 'center'}}>
                      <FlatButton id="desk-btn-dis" onClick={this.handleProfileUpdateContent} backgroundColor="#3386f4" hoverColor="#3386f4" label={'APPLY'} fullWidth style={{color: '#fff', margin: '20px auto', height: '50px'}} className="floating-btn-bot-row hide-on-mobile btn-height"/>
                      <FlatButton id="desk-btn" onClick={this.handleProfileUpdateContent} backgroundColor="#3386f4" hoverColor="#3386f4" label={'APPLY'} fullWidth style={{color: '#fff', margin: '20px auto', height: '50px'}} className="floating-btn-bot-row hide hide-on-mobile btn-height"/>
                    </div>
                    <Visible xs sm>
                      <Container fluid className="header header-mobile">
                        <Row id="floating-btn-bot" className="floating-btn-bot-row hide">
                          <Col lg={12} md={12} sm={12} xs={12}>
                            <FlatButton onClick={this.handleProfileUpdateContent} label={'APPLY'} fullWidth className="floating-btn-bot"/>
                          </Col>
                        </Row>
                        <Row id="floating-btn-bot-dis" className="floating-btn-bot-row" style={{paddingBottom: '20px'}}>
                          <Col lg={12} md={12} sm={12} xs={12}>
                            <FlatButton onClick={this.handleProfileUpdateContent} label={'APPLY'} fullWidth className="floating-btn-bot"/>
                          </Col>
                        </Row>
                      </Container>
                    </Visible>
                    <Snackbar open={this.state.snackOpen} message="User data updated" autoHideDuration={1000} onRequestClose={this.handleRequestClose}/>
                  </Col>
                </Row>
              </Col>
              <Col sm={4} xs={12}><br/></Col>
            </Row>
          </Container>
        </div>
      </MuiThemeProvider>
    );
  }
}
