import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Container, Row, Col, Visible} from 'react-grid-system';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FullscreenDialog from 'material-ui-fullscreen-dialog';
import ActionFavorite from 'material-ui/svg-icons/image/lens';
import ActionFavoriteBorder from 'material-ui/svg-icons/image/panorama-fish-eye';
import axios from 'axios';
import Cookies from 'universal-cookie';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import ClevertapReact from 'clevertap-react';
ClevertapReact.initialize("TEST-758-986-794Z");

const emailRegex = /^\S+@\S+\.\S+$/;
let validEmail;
let counter = 1;
let counterProds = 0;
let total = 0;

const cookies = new Cookies();

const axiosConfig = {
  withCredentials: true,
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export class Estimate extends Component {

  constructor() {
    super();
    this.state = {
      deviceFullDescription: cookies.get('device-brand') + ' ' + cookies.get('device-model'),
      issues: '',
      relatedProducts: '',
      payLabel: '',
      method: 'delivery',
      signupOpen: false,
      signInOpen: false,
      email: '',
      password: '',
      invalid: '',
      invalidSignup: '',
      phone: '',
      openSnack: false,
      openLoginSnack: false
    };
    this.handleChangeMethod = this.handleChangeMethod.bind(this);
    this.handlePageRedirect = this.handlePageRedirect.bind(this);
    this.handleSigninMenuClose = this.handleSigninMenuClose.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleOpenSignIn = this.handleOpenSignIn.bind(this);
    this.handleSigninBtn = this.handleSigninBtn.bind(this);
    this.handleEmailUpdateInput = this.handleEmailUpdateInput.bind(this);
    this.handlePasswordUpdateInput = this.handlePasswordUpdateInput.bind(this);
    this.handleCheckElement = this.handleCheckElement.bind(this);
    this.handleCheckBlurElement = this.handleCheckBlurElement.bind(this);
    this.handleMobileUpdateInput = this.handleMobileUpdateInput.bind(this);
    this.handleSignupBtn = this.handleSignupBtn.bind(this);
    this.handleSignupClose = this.handleSignupClose.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
  }

  handlePageRedirect(e) {
    if (cookies.get('userId') === null || cookies.get('userId') === undefined || cookies.get('userId') === '') {
      return this.setState({
        openLoginSnack: true,
        signInOpen: true
      });
    }

    if (e.target.innerHTML === 'Skip payment for now') {
      cookies.set('skip-pay', '1', {path: '/'});
    } else {
      cookies.set('skip-pay', '0', {path: '/'});
    }
    window.location = '/' + this.state.method;
  }

  handleSnackRequestClose() {
    this.setState({
      openSnack: false,
      openLoginSnack: false
    });
  }

  handleChangeMethod(e, value) {
    e.preventDefault();
    console.log(value);
    this.setState({
      method: value
    });
    document.querySelector('#disappear-text').style.opacity = 0;
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

  handleSignup() {
    this.setState({
      signupOpen: true,
      signInOpen: false
    });
  }

  handleOpenSignIn() {
    this.setState({
      signInOpen: true,
      signupOpen: false
    });
  }

  handleSigninMenuClose() {
    this.setState({
      signInOpen: false,
      signupOpen: false
    });
    axios.post('http://icore.repairmonk.com/website/user/', {id: cookies.get('userId')}).then(response => {
      localStorage.setItem('userObject', JSON.stringify(response.data));
    }).catch(err => {
      console.log(err);
    });
  }

  handleEmailUpdateInput(e, val) {
    if (val.match(emailRegex)) {
      validEmail = true;
      this.setState({
        email: val
      });
    } else {
      validEmail = false;
    }
  }

  handleMobileUpdateInput(e) {
    this.setState({
      phone: e.target.value
    });
  }

  handlePasswordUpdateInput(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleCheckElement(e) {
    e.preventDefault();
    e.target.style.backgroundColor = '#FFF';
    e.target.parentElement.parentElement.style.border = '1px solid #3386f4';
  }

  handleCheckBlurElement(e) {
    e.preventDefault();
    e.target.style.backgroundColor = '#f0f3f7';
    e.target.parentElement.parentElement.style.border = '1px solid #d6edff';
  }

  handleSigninBtn(e) {
    e.preventDefault();
    if (this.state.email === null || this.state.email === '') {
      return this.setState({
        invalid: 'Email is missing',
      });
    }

    if (this.state.password === null || this.state.password === '') {
      return this.setState({
        invalid: 'Password is missing'
      });
    }

    if (validEmail === undefined || validEmail === false) {
      return this.setState({
        invalid: 'Invalid email input'
      });
    }

    const dataSignin = {
      username: this.state.email,
      password: this.state.password
    };
    axios({
      method: 'POST',
      url: 'http://icore.repairmonk.com/website/login/',
      data: dataSignin
    }).then(response => {
      if (response.data.status === 'Successful') {
        console.log(response.data);
        this.setState({
          signInOpen: false,
          signupOpen: false,
          openSnack: true
        });
        const payload = {
          "Site": {
           "Email": this.state.email
         }
        }
        ClevertapReact.profile(payload);
        ClevertapReact.event("User Signed In");
        document.getElementById('signin-desktop').style.display = 'none';
        document.getElementById('signup-desktop').style.display = 'none';
        // document.getElementById('logout').style.display = 'block';
        cookies.set('userId', response.data.id, {path: '/'});
        this.forceUpdate();
      } else {
        this.setState({
          invalid: response.data.status
        });
      }
      this.forceUpdate();
    }).catch(error => {
      console.log(error);
    });
  }

  handleSignupBtn() {
    console.log(this.state);
    if (this.state.email === null || this.state.email === '') {
      return this.setState({
        invalidSignup: 'Email is missing'
      });
    }

    if (this.state.phone === null || this.state.phone === '') {
      return this.setState({
        invalidSignup: 'Mobile number is missing'
      });
    }

    if (this.state.password === null || this.state.password === '') {
      return this.setState({
        invalidSignup: 'Password is missing'
      });
    }

    if (validEmail === undefined || validEmail === false) {
      return this.setState({
        invalid: 'Invalid email input'
      });
    }

    const dataSignup = {
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password
    };
    const payload = {
      "Site": {
       "Email": this.state.email,
       "Phone": this.state.phone
     }
    }
    axios({
      method: 'POST',
      url: 'http://icore.repairmonk.com/website/signup/',
      data: dataSignup
    }).then(response => {
      console.log(response);
      if (response.data.status === 'Successful') {
        cookies.set('userId', response.data.id, {path: '/'});
        ClevertapReact.profile(payload);
        ClevertapReact.event("User Signed Up");
        this.setState({
          signupOpen: false
        });
      }
    }).catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {
    if (cookies.get('userId') === undefined || cookies.get('userId') == '' || cookies.get('userId') === null) {
      this.setState({
        signInOpen: true
      });
      if (document.getElementById('estimate-btn') !== null && document.getElementById('estimate-btn') !== undefined) {
        document.getElementById('estimate-btn').style.display = 'none !important';
        this.forceUpdate();
        return;
      }
    }

    const issueList = {
      model: cookies.get('device-model'),
      issue: cookies.get('device-issues').join(),
      type: 'Doorstep'
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
      const productsList = cookies.get('related-products').map(result => {
        return (
          <Row key={counterProds} className="marginTop20">
            <Col lg={6} md={6} sm={6} xs={6}>
              <span className="issue-heading">
                {result}
              </span>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
              <span className="issue-heading floatRight">
                <strong>{cookies.get('related-prices')[counterProds++]}</strong>
              </span>
            </Col>
          </Row>
        );
      });
      this.setState({
        issues: issuesList,
        relatedProducts: productsList,
        netTime: response.data.net_time,
        payLabel: 'PAY ₹ ' + total
      });
      cookies.set('total-estimate', total, {path: '/'});
    }).catch(error => {
      console.log(error);
    });
  }

  handleSignupClose() {
    window.location = '/repair';
  }

  render() {
    const primaryColor = '#3386f4';
    const hoverColor = '#3E8CF8';
    return (
      <MuiThemeProvider>
        <div>
          <Container fluid className="estimateContainerNew" style={{paddingBottom: '50px', paddingTop: '50px'}}>
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
                <br/>
                <Row>
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <span className="product-heading">
                      ADDED PRODUCTS
                    </span>
                  </Col>
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <span className="product-heading floatRight">
                      INR
                    </span>
                  </Col>
                </Row>
                {this.state.relatedProducts}
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
                    <p id="disappear-text" className="disappear-text">Please select one of the methods:</p>
                    <RadioButtonGroup name="scheduleMethod" onChange={this.handleChangeMethod}>
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
                        label="Walk-in"
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
                <br/>
                <a style={{textAlign: 'center', padding: '10px 0', display: 'block', cursor: 'pointer'}} onClick={this.handlePageRedirect}>Skip payment for now</a>
                <br/>
                <div style={{width: '100%', textAlign: 'center'}}>
                  <FlatButton id="desk-btn-dis" backgroundColor="#3386f4" hoverColor="#3386f4" label={'PAY ₹ ' + cookies.get('total-estimate')} fullWidth style={{color: '#fff', margin: '20px auto', height: '50px'}} className="floating-btn-bot-row hide-on-mobile disabled btn-height"/>
                  <FlatButton id="desk-btn" onClick={this.handlePageRedirect} backgroundColor="#3386f4" hoverColor="#3386f4" label={'PAY ₹ ' + cookies.get('total-estimate')} fullWidth style={{color: '#fff', margin: '20px auto', height: '50px'}} className="floating-btn-bot-row hide hide-on-mobile btn-height"/>
                </div>
              </Col>
              <Col sm={4} xs={12}>
                <br/>
              </Col>
            </Row>
          </Container>
          <Visible xs sm>
            <Container fluid className="header header-mobile">
              <Row id="floating-btn-bot" className="floating-btn-bot-row hide">
                <Col lg={12} md={12} sm={12} xs={12}>
                  <FlatButton onClick={this.handlePageRedirect} label={'PAY ₹ ' + cookies.get('total-estimate')} fullWidth className="floating-btn-bot"/>
                </Col>
              </Row>
              <Row id="floating-btn-bot-dis" className="floating-btn-bot-row">
                <Col lg={12} md={12} sm={12} xs={12}>
                  <FlatButton label={'PAY ₹ ' + cookies.get('total-estimate')} fullWidth className="floating-btn-bot disabled"/>
                </Col>
              </Row>
            </Container>
          </Visible>
          <FullscreenDialog
            open={this.state.signupOpen}
            title={'SIGN UP'}
            actionButton={<IconButton key={1} tooltip="Close Menu" style={{width: '50px'}} onTouchTap={this.handleMenuClose}><CloseIcon color="#3386f4"/></IconButton>}
            titleStyle={{
              fontFamily: 'Montserrat',
              letterSpacing: '1pt',
              fontWeight: '200',
              color: '#eb6b62',
              textAlign: 'center',
              padding: '0',
              margin: '0',
              lineHeight: '50pt'
            }}
            style={{left: '2%', width: '96vw', height: '98vh', borderRadius: '10px', marginTop: '5px', boxShadow: '0px 0px 0px 50px #3386f4'}}
            containerStyle={{padding: '20px'}}
            appBarStyle={{display: 'none', background: 'none', boxShadow: 'none', marginBottom: '10px'}}
            className="signup-screen-bar"
            >
            <Container fluid className="header header-mobile">
              <Row>
                <Col xs={12} style={{textAlign: 'center'}}>
                  <IconButton tooltip="Close Menu" style={{width: '50px', margin: '10px', position: 'absolute', right: '0', zIndex: '1500'}} onTouchTap={this.handleSignupClose}>
                    <CloseIcon color="#3386f4" onClick={this.handleSignupClose}/>
                  </IconButton>
                </Col>
                <Col xs={12} style={{textAlign: 'center'}}>
                  <br/><br/>
                </Col>
              </Row>
              <Row className="header-row">
                <Col xs={12} style={{textAlign: 'center'}}>
                  <h1 className="logo-text" style={{display: 'inline-block', color: '#eb6b62', fontSize: '18px', fontWeight: '400'}}>
                    SIGN UP
                  </h1>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col sm={2} md={4} xs={12}/>
                <Col sm={8} md={4} xs={12}>
                  <div className="signupDialogText">
                    <p className="signupTextContent">SIGN UP FOR NOTIFICATIONS ON JOBS, TRACKING AND DIAGNOSIS BASED INFORMATION OF YOUR DEVICE</p>
                  </div>
                </Col>
                <Col sm={2} md={4} xs={12}/>
              </Row>
              <Row>
                <Col sm={2} md={4} xs={12}/>
                <Col sm={8} md={4} xs={12}>
                  <div className="signupInputArea">
                    <TextField inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Email" hintStyle={{color: '#9b9b9b', zIndex: '9999', paddingLeft: '15px'}} onChange={this.handleEmailUpdateInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement}/>
                  </div>
                </Col>
                <Col sm={2} md={4} xs={12}/>
              </Row>
              <Row>
                <Col sm={2} md={4} xs={12}/>
                <Col sm={8} md={4} xs={12}>
                  <div className="signupInputArea">
                    <TextField inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Mobile Number" hintStyle={{color: '#9b9b9b', zIndex: '999', paddingLeft: '15px'}} onChange={this.handleMobileUpdateInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement}/>
                  </div>
                </Col>
                <Col sm={2} md={4} xs={12}/>
              </Row>
              <Row>
                <Col sm={2} md={4} xs={12}/>
                <Col sm={8} md={4} xs={12}>
                  <div className="signupInputArea">
                    <TextField type="password" inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Password" hintStyle={{color: '#9b9b9b', zIndex: '999', paddingLeft: '15px'}} onChange={this.handlePasswordUpdateInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement}/>
                  </div>
                </Col>
                <Col sm={2} md={4} xs={12}/>
              </Row>
              <Row>
                <Col sm={2} md={4} xs={12}/>
                <Col sm={8} md={4} xs={12}>
                  <div className="">
                    <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label="SIGN UP" fullWidth style={{color: '#fff', marginTop: '50px', minHeight: '55px', borderRadius: '5px'}} onTouchTap={this.handleSignupBtn}/>
                  </div>
                </Col>
                <Col sm={2} md={4} xs={12}/>
              </Row>
              <Row>
                <Col sm={2} md={4} xs={12}/>
                <Col sm={8} md={4} xs={12}>
                  <div>
                    <p className="signInText">Already have an account?
                      <br/>
                      <span className="signInTextClick" style={{color: primaryColor}} onTouchTap={this.handleOpenSignIn}>
                        Sign in
                      </span>
                    </p>
                  </div>
                </Col>
                <Col sm={2} md={4} xs={12}/>
              </Row>
              <Row>
                <Col sm={2} md={4} xs={12}/>
                <Col sm={8} md={4} xs={12}>
                  <div>
                    <p className="signInErr">{this.state.invalidSignup}</p>
                  </div>
                </Col>
                <Col sm={2} md={4} xs={12}/>
              </Row>
            </Container>
          </FullscreenDialog>
          <FullscreenDialog
            open={this.state.signInOpen}
            title={'SIGN IN'}
            actionButton={<IconButton key={1} tooltip="Close Menu" style={{width: '50px'}} onTouchTap={this.handleSigninMenuClose}><CloseIcon color="#3386f4"/></IconButton>}
            titleStyle={{
              fontFamily: 'Montserrat',
              letterSpacing: '1pt',
              fontWeight: '200',
              color: '#eb6b62',
              textAlign: 'center',
              padding: '0',
              margin: '0',
              lineHeight: '50pt',
              borderRadius: '10px'
            }}
            style={{left: '2%', width: '96vw', height: '98vh', borderRadius: '10px', marginTop: '5px', boxShadow: '0px 0px 0px 50px #3386f4'}}
            containerStyle={{padding: '20px'}}
            appBarStyle={{display: 'none', background: 'none', boxShadow: 'none', marginBottom: '10px'}}
            className="signup-screen-bar"
            >
            <Container fluid className="header header-mobile">
              <Row>
                <Col xs={12} style={{textAlign: 'center'}}>
                  <IconButton tooltip="Close Menu" style={{width: '50px', margin: '10px', position: 'absolute', right: '0', zIndex: '1500'}} onTouchTap={this.handleMenuClose}>
                    <CloseIcon color="#3386f4" onClick={this.handleSigninMenuClose}/>
                  </IconButton>
                </Col>
                <Col xs={12} style={{textAlign: 'center'}}>
                  <br/><br/>
                </Col>
              </Row>
              <Row className="header-row">
                <Col xs={12} style={{textAlign: 'center'}}>
                  <h1 className="logo-text" style={{display: 'inline-block', color: '#eb6b62', fontSize: '18px', fontWeight: '400'}}>
                    SIGN IN
                  </h1>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col sm={2} md={4} xs={12}/>
                <Col sm={8} md={4} xs={12}>
                  <div className="signupDialogText">
                    <p className="signupTextContent">SIGN UP FOR NOTIFICATIONS ON JOBS, TRACKING AND DIAGNOSIS BASED INFORMATION OF YOUR DEVICE</p>
                  </div>
                </Col>
                <Col sm={2} md={4} xs={12}/>
              </Row>
              <Row>
                <Col sm={2} md={4} xs={12}/>
                <Col sm={8} md={4} xs={12}>
                  <div className="signupInputArea">
                    <TextField inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Email" hintStyle={{color: '#9b9b9b', zIndex: '9999', paddingLeft: '15px'}} onChange={this.handleEmailUpdateInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement}/>
                  </div>
                </Col>
                <Col sm={2} md={4} xs={12}/>
              </Row>
              <Row>
                <Col sm={2} md={4} xs={12}/>
                <Col sm={8} md={4} xs={12}>
                  <div className="signupInputArea">
                    <TextField type="password" inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Password" hintStyle={{color: '#9b9b9b', zIndex: '999', paddingLeft: '15px'}} onChange={this.handlePasswordUpdateInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement}/>
                  </div>
                </Col>
                <Col sm={2} md={4} xs={12}/>
              </Row>
              <Row>
                <Col sm={2} md={4} xs={12}/>
                <Col sm={8} md={4} xs={12}>
                  <div className="">
                    <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label="SIGN IN" fullWidth style={{color: '#fff', marginTop: '50px', minHeight: '55px', borderRadius: '5px'}} onTouchTap={this.handleSigninBtn}/>
                  </div>
                </Col>
                <Col sm={2} md={4} xs={12}/>
              </Row>
              <Row>
                <Col sm={2} md={4} xs={12}/>
                <Col sm={8} md={4} xs={12}>
                  <div>
                    <p className="signInText">Dont have an account? <span className="signInTextClick" style={{color: primaryColor}} onTouchTap={this.handleSignup}>Sign Up</span></p>
                  </div>
                </Col>
                <Col sm={2} md={4} xs={12}/>
              </Row>
              <Row>
                <Col sm={2} md={4} xs={12}/>
                <Col sm={8} md={4} xs={12}>
                  <div>
                    <p className="signInErr">{this.state.invalid}</p>
                  </div>
                </Col>
                <Col sm={2} md={4} xs={12}/>
              </Row>
            </Container>
          </FullscreenDialog>
          <Snackbar open={this.state.openSnack} message="Login Successful" autoHideDuration={2000} onRequestClose={this.handleSnackRequestClose}/>
          <Snackbar open={this.state.openLoginSnack} message="Please login to continue" autoHideDuration={2000} onRequestClose={this.handleSnackRequestClose}/>
        </div>
      </MuiThemeProvider>
    );
  }
}
