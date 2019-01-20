import React, {Component} from 'react';
import {Container, Row, Col, Hidden, Visible} from 'react-grid-system';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import NavIcon from 'material-ui/svg-icons/navigation/menu';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import MailIcon from 'material-ui/svg-icons/communication/email';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import Sticky from 'react-stickynode';
import FullscreenDialog from 'material-ui-fullscreen-dialog';
import TextField from 'material-ui/TextField';
import Cookies from 'universal-cookie';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
const cookies = new Cookies();
let logout = null;
let signin = null;
let signup = null;
let desktopLogout = null;
let desktopSignin = null;
let desktopSignup = null;
let profile = null;
const primaryColor = '#3386f4';
const hoverColor = '#3E8CF8';
const emailRegex = /^\S+@\S+\.\S+$/;
let validEmail;
let name = null;

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {menuOpen: false, signInOpen: false, signupOpen: false, email: '', phone: '', password: '', invalid: '', signUpSuccess: false, name: ''};
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleLogoutUser = this.handleLogoutUser.bind(this);
    this.handleOpenSignin = this.handleOpenSignin.bind(this);
    this.handleOpenSignup = this.handleOpenSignup.bind(this);
    this.handleSignupClose = this.handleSignupClose.bind(this);
    this.handleSigninMenuClose = this.handleSigninMenuClose.bind(this);
    this.handleSignupBtn = this.handleSignupBtn.bind(this);
    this.handleSigninBtn = this.handleSigninBtn.bind(this);
    this.handleCheckElement = this.handleCheckElement.bind(this);
    this.handleCheckBlurElement = this.handleCheckBlurElement.bind(this);
    this.handleEmailUpdateInput = this.handleEmailUpdateInput.bind(this);
    this.handleMobileUpdateInput = this.handleMobileUpdateInput.bind(this);
    this.handlePasswordUpdateInput = this.handlePasswordUpdateInput.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleCongratsMenuClose = this.handleCongratsMenuClose.bind(this);
    this.handleSignupEnter = this.handleSignupEnter.bind(this);
    this.handleSigninEnter = this.handleSigninEnter.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
  }

  handleChangeState(){
    window.location = '/profile';
  }

  componentDidMount() {
    logout = null;
    if (localStorage.getItem('userObject') !== null && localStorage.getItem('userObject') !== '' && localStorage.getItem('userObject') !== undefined) {
      name = JSON.parse(localStorage.getItem('userObject'));
      this.setState({
        name: 'Hi, ' + name.first_name
      });
    }
    if (cookies.get('userId') !== null && cookies.get('userId') !== undefined && cookies.get('userId') !== '') {
      logout = (
        <a id="logout" onClick={this.handleLogoutUser} className="menu-item">Logout</a>
      );
      signin = (
        <a style={{display: 'none'}}/>
      );
      signup = (
        <a style={{display: 'none'}}/>
      );
      profile = (
        <a href="/profile" className="menu-item">Profile</a>
      );
      desktopSignup = null;
      desktopSignin = null;
      desktopLogout = (
        <a id="logout" onClick={this.handleLogoutUser} style={{cursor: 'pointer'}}>LOGOUT</a>
      );
    } else {
      logout = (
        <a style={{display: 'none'}}/>
      );
      profile = (
        <a style={{display: 'none'}}/>
      );
      signin = (
        <a style={{cursor: 'pointer'}} onClick={this.handleOpenSignin} className="menu-item">Sign In</a>
      );
      signup = (
        <a style={{cursor: 'pointer'}} onClick={this.handleOpenSignup} className="menu-item">Sign Up</a>
      );
      desktopSignin = (
        <a style={{cursor: 'pointer'}} onClick={this.handleOpenSignin}>SIGN IN</a>
      );
      desktopSignup = (
        <a style={{cursor: 'pointer'}} onClick={this.handleOpenSignup}>SIGN UP</a>
      );
    }
    const menuSecond = document.getElementsByClassName('menu-secondary');
    if (menuSecond.length !== 0) {
      for (let i = 0; i < menuSecond[0].childNodes.length; i++) {
        if (window.location.pathname === menuSecond[0].childNodes[i].getAttribute("href")) {
          menuSecond[0].childNodes[i].classList.add('active');
        }
      }
    }

    const menuPrimary = document.getElementsByClassName('menu-primary');
    if (menuPrimary.length !== 0) {
      for (let j = 0; j < menuPrimary[0].childNodes.length; j++) {
        if (window.location.pathname === menuPrimary[0].childNodes[j].getAttribute("href")) {
          menuPrimary[0].childNodes[j].classList.add('active');
        }
      } 
    }
    
    this.forceUpdate();
  }

  handleSigninEnter(e) {
    if (e.keyCode === 13) {
      this.handleSigninBtn()
    }
  }

  handleSignupEnter(e) {
    if (e.keyCode === 13) {
      this.handleSignupBtn();
    }
  }

  handleOpenSignin() {
    this.setState({
      signInOpen: true, signupOpen: false
    });
    if (document.getElementById('signupbtn') !== null && document.getElementById('signupbtn') !== undefined && document.getElementById('signupbtn') !== '') {
      document.getElementById('signupbtn').style.display = 'none';
    }
  }

  handleOpenSignup() {
    this.setState({signupOpen: true});
    document.getElementById('signupbtn').style.display = 'none';
  }

  handleSignupClose() {
    this.setState({
      signupOpen: false
    });
    if (document.getElementById('signupbtn') !== null && document.getElementById('signupbtn') !== undefined && document.getElementById('signupbtn') !== '') {
      document.getElementById('signupbtn').style.display = 'block'; 
    }
  }

  handleSigninMenuClose() {
    this.setState({
      signInOpen: false
    });
    if (document.getElementById('signupbtn') !== null && document.getElementById('signupbtn') !== undefined && document.getElementById('signupbtn') !== '') {
      document.getElementById('signupbtn').style.display = 'block';
    }
  }

  handleMenuOpen() {
    this.setState({menuOpen: true});
  }

  handleMenuClose() {
    this.setState({menuOpen: false});
  }

  handleLogoutUser() {
    cookies.remove('userId');
    localStorage.clear();
    profile = (
      <a style={{display: 'none'}}/>
    );
    logout = (
      <a style={{display: 'none'}}/>
    );
    signin = (
      <a className="menu-item" onClick={this.handleOpenSignin}>Sign In</a>
    );
    signup = (
      <a className="menu-item" onClick={this.handleOpenSignup}>Sign Up</a>
    );
    desktopLogout = null;
    desktopSignin = (
      <a style={{cursor: 'pointer'}} onClick={this.handleOpenSignin}>SIGN IN</a>
    );
    desktopSignup = (
      <a style={{cursor: 'pointer'}} onClick={this.handleOpenSignup}>SIGN UP</a>
    );
    this.setState({
      menuOpen: false,
      name: ''
    });
    this.forceUpdate();
    window.location.reload();
  }

  handleSignup(ev) {
    ev.preventDefault();
    if (document.getElementById('signupbtn') !== null && document.getElementById('signupbtn') !== undefined) {
      document.getElementById('signupbtn').style.display = 'none';
    }
    this.setState({
      signupOpen: true,
      signInOpen: false
    });
  }

  handleSignupBtn() {
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
    axios({
      method: 'POST',
      url: 'http://icore.repairmonk.com/website/signup/',
      data: dataSignup
    }).then(response => {
      if (response.data.status === 'Successful') {
        cookies.set('userId', response.data.id, {path: '/'});
        this.setState({
          signupOpen: false,
          menuOpen: false,
          signUpSuccess: true
        });
      }
    }).catch(error => {
      console.log(error);
    });
  }
  handleSigninBtn() {
    if (this.state.email === null || this.state.email === '') {
      return this.setState({
        invalid: 'Email is missing'
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
        cookies.set('userId', response.data.id, {path: '/'});
        this.setState({
          signinOpen: false,
          openSnack: true
        });
        if (document.getElementById('signupbtn') !== null && document.getElementById('signupbtn') !== undefined && document.getElementById('signupbtn') !== '') {
          document.getElementById('signupbtn').style.display = 'none';
        }
        window.location = '/profile';
      } else {
        this.setState({
          invalid: response.data.status
        });
      }
    }).catch(error => {
      console.log(error);
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

  handleEmailUpdateInput(e) {
    e.preventDefault();
    this.setState({
      email: e.target.value
    });
    if (this.state.email.match(emailRegex)) {
      validEmail = true;
    } else {
      validEmail = false;
    }
  }

  handleMobileUpdateInput(e) {
    e.preventDefault();
    this.setState({
      phone: e.target.value
    });
  }

  handlePasswordUpdateInput(e) {
    e.preventDefault();
    this.setState({
      password: e.target.value
    });
  }

  handleCongratsMenuClose() {
    if (document.getElementById('signupbtn') !== null && document.getElementById('signupbtn') !== undefined) {
      document.getElementById('signupbtn').style.display = 'none';
    }
    this.setState({
      signUpSuccess: false
    });
    logout = (
      <a id="logout" onClick={this.handleLogoutUser} className="menu-item">Logout</a>
    );
    signin = (
      <a style={{display: 'none'}}/>
    );
    signup = (
      <a style={{display: 'none'}}/>
    );
    desktopSignup = null;
    desktopSignin = null;
    desktopLogout = (
      <a id="logout" onClick={this.handleLogoutUser} style={{cursor: 'pointer'}}>LOGOUT</a>
    );
  }

  handleNavigateProfileBtn() {
    window.location = '/profile';
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Container fluid className="header header-top" id="header-top-landing">
            <Row className="header-row">
              <Col xs={12} sm={6} md={8}>
                <a href="/profile" className="name-header" style={{float: 'left', marginTop: '10px'}} onClick={this.handleChangeState}>{this.state.name}</a>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <div className="menu-primary">
                  <a href="/blog">BLOG</a>
                  <a href="/about">ABOUT</a>
                  {desktopSignup}
                  {desktopSignin}
                  {desktopLogout}
                </div>
              </Col>
            </Row>
          </Container>
          <Hidden xs sm md>
            <Sticky enabled bottomBoundary={10000} innerZ={1499} activeClass="header-mobile-sticky">
              <Container fluid className="header header-bottom" id="landing-bottom-header">
                <Row className="header-row">
                  <Col sm={1}>
                    <div className="logo-img">
                      <div style={{textAlign: 'center'}}>
                        <img src={require("./imgs/logo.png")} style={{width: '90px'}}/>
                      </div>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="menu-secondary">
                      <a href="/home">HOME</a>
                      <a href="/repair">REPAIR</a>
                      <a href="/track">TRACK</a>
                      <a href="/diagnosis">DIAGNOSE</a>
                      <a href="/business">BUSINESS</a>
                      <a href="/partners">PARTNERS</a>
                    </div>
                  </Col>
                  <Col sm={5}>
                    <div style={{textAlign: 'right', paddingTop: '25px'}}>
                      <MailIcon color="#3386f4" style={{height: '16px', margin: '-3px 5px -3px -3px'}}/>
                      <a className="header-bottom-link" href="mailto:contact@iservice.co.in" target="_top">contact@iservice.co.in</a>
                      <PhoneIcon color="#3386f4" style={{height: '16px', margin: '-3px 5px -3px 15px'}}/>
                      <a className="header-bottom-link" href="7411-811-911">7411-811-911</a>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Sticky>
          </Hidden>
          <Visible xs sm md>
            <Sticky enabled bottomBoundary={10000} innerZ={1499} activeClass="header-mobile-sticky">
              <Container fluid className="header header-mobile">
                <Row className="header-row">
                  <Col xs={3}>
                    <div style={{textAlign: 'center'}}>
                        <img src={require("./imgs/glyph.png")} style={{width: '30px', paddingTop:'15px'}}/>
                      </div>
                  </Col>
                  <Col xs={6}>
                    <h1 className="logo-text">
                      iService
                    </h1>
                  </Col>
                  <Col xs={3}>
                    <IconButton tooltip="Menu" style={{width: '50px', margin: '10px', float: 'right'}} onTouchTap={this.handleMenuOpen}>
                      <NavIcon color="#3386f4"/>
                    </IconButton>
                  </Col>
                </Row>
              </Container>
            </Sticky>
            <FullscreenDialog
              open={this.state.menuOpen}
              title={'iService'}
              actionButton={<IconButton key={1} tooltip="Close Menu" style={{width: '50px'}} onTouchTap={this.handleMenuClose}><CloseIcon color="#3386f4"/></IconButton>}
              titleStyle={{
                fontFamily: 'Montserrat',
                letterSpacing: '1pt',
                fontWeight: '200',
                color: '#3386f4',
                textAlign: 'center',
                padding: '0',
                margin: '0',
                lineHeight: '50pt'
              }}
              appBarStyle={{display: 'none', background: 'none', boxShadow: 'none', marginBottom: '10px'}}
              >
              <Container fluid className="header header-mobile">
                <Row className="header-row">
                  <Col xs={12} style={{textAlign: 'center'}}>
                    <img src={require("./imgs/glyph.png")} style={{width:'30px', paddingTop:'15px', padding: '0 5px'}}/>
                    <h1 className="logo-text" style={{display: 'inline-block'}}>
                      iService
                    </h1>
                    <IconButton tooltip="Close Menu" style={{width: '50px', margin: '10px', position: 'absolute', right: '0', zIndex: '1500'}} onTouchTap={this.handleMenuClose}>
                      <CloseIcon color="#3386f4"/>
                    </IconButton>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col xs={12}>
                    <a href="/home" className="menu-item">
                      Home
                    </a>
                    {profile}
                    <a href="/repair" className="menu-item">
                      Repair
                    </a>
                    <a href="/track" className="menu-item">
                      Track
                    </a>
                    <a href="/diagnosis" className="menu-item">
                      Diagnose
                    </a>
                    <a href="/business" className="menu-item">
                      For Business
                    </a>
                    <a href="/partners" className="menu-item">
                      For Partners
                    </a>
                    <a href="/blog" className="menu-item">
                      Blog
                    </a>
                    <a href="/about" className="menu-item">
                      About
                    </a>
                    {signin}
                    {signup}
                    {logout}
                    <p className="menu-footer-text">
                      <span>35,000</span> iService customers India-wide
                    </p>
                  </Col>
                </Row>
              </Container>
            </FullscreenDialog>
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
            style={{left: '2%', width: '96vw', height: '98vh', borderRadius: '5px', marginTop: '5px', boxShadow: '0px 0px 0px 50px #3386f4'}}
            containerStyle={{padding: '20px'}}
            appBarStyle={{display: 'none'}}
            id="signup-screen-bar"
            >
            <Container fluid className="header header-mobile">
              <Row>
                <Col xs={12} style={{textAlign: 'center'}}>
                  <IconButton tooltip="Close Menu" style={{width: '50px', margin: '10px', position: 'absolute', right: '0', zIndex: '1500'}} onTouchTap={this.handleMenuClose}>
                    <CloseIcon color="#3386f4" onClick={this.handleSignupClose}/>
                  </IconButton>
                </Col>
                <Col xs={12} style={{textAlign: 'center'}}>
                  <br/><br/>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={4}>
                  <br/>
                </Col>
                <Col xs={12} sm={4}>
                  <Container fluid className="header header-mobile">
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
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div className="signupDialogText">
                          <p className="signupTextContent">SIGN UP FOR NOTIFICATIONS ON JOBS, TRACKING AND DIAGNOSIS BASED INFORMATION OF YOUR DEVICE</p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div className="signupInputArea">
                          <TextField type="text" inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Email" hintStyle={{color: '#9b9b9b', zIndex: '9999', paddingLeft: '15px'}} onChange={this.handleEmailUpdateInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement} onKeyDown={this.handleSignupEnter}/>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div className="signupInputArea">
                          <TextField type="number" inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Mobile Number" hintStyle={{color: '#9b9b9b', zIndex: '999', paddingLeft: '15px'}} onChange={this.handleMobileUpdateInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement} onKeyDown={this.handleSignupEnter}/>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div className="signupInputArea">
                          <TextField type="password" inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Password" hintStyle={{color: '#9b9b9b', zIndex: '999', paddingLeft: '15px'}} onChange={this.handlePasswordUpdateInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement} onKeyDown={this.handleSignupEnter}/>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div className="">
                          <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label="SIGN UP" fullWidth style={{color: '#fff', marginTop: '50px', minHeight: '55px', borderRadius: '5px'}} onTouchTap={this.handleSignupBtn}/>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div>
                          <p className="signInText">Already have an account? <span className="signInTextClick" style={{color: primaryColor, cursor: 'pointer'}} onTouchTap={this.handleOpenSignin}>Sign in</span></p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div>
                          <p className="signInErr">{this.state.invalidSignup}</p>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col xs={12} sm={4}>
                  <br/>
                </Col>
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
            style={{left: '2%', width: '96vw', height: '98vh', borderRadius: '5px', marginTop: '5px', boxShadow: '0px 0px 0px 50px #3386f4'}}
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
            <Container fluid>
              <Row>
                <Col xs={12} sm={4}>
                  <br/>
                </Col>
                <Col xs={12} sm={4}>
                  <Container>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div className="signupDialogText">
                          <p className="signupTextContent">SIGN UP FOR NOTIFICATIONS ON JOBS, TRACKING AND DIAGNOSIS BASED INFORMATION OF YOUR DEVICE</p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div className="signupInputArea">
                          <TextField inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Email" hintStyle={{color: '#9b9b9b', zIndex: '9999', paddingLeft: '15px'}} onChange={this.handleEmailUpdateInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement} onKeyDown={this.handleSigninEnter}/>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div className="signupInputArea">
                          <TextField type="password" inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Password" hintStyle={{color: '#9b9b9b', zIndex: '999', paddingLeft: '15px'}} onChange={this.handlePasswordUpdateInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement} onKeyDown={this.handleSigninEnter}/>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div className="">
                          <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label="SIGN IN" fullWidth style={{color: '#fff', marginTop: '50px', minHeight: '55px', borderRadius: '5px', cursor: 'pointer'}} onTouchTap={this.handleSigninBtn}/>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div>
                          <p className="signInText">Dont have an account? <span className="signInTextClick" style={{color: primaryColor, cursor: 'pointer'}} onTouchTap={this.handleSignup}>Sign Up</span></p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div>
                          <p className="signInErr">{this.state.invalid}</p>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col xs={12} sm={4}>
                  <br/>
                </Col>
              </Row>
            </Container>
          </FullscreenDialog>
          <FullscreenDialog
            open={this.state.signUpSuccess}
            title={'CONGRATULATIONS'}
            actionButton={<IconButton key={1} tooltip="Close Menu" style={{width: '50px'}} onTouchTap={this.handleCongratsMenuClose}><CloseIcon color="#3386f4"/></IconButton>}
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
            style={{left: '2%', width: '96vw', height: '98vh', borderRadius: '5px', marginTop: '5px', boxShadow: '0px 0px 40px 20px #3386f4'}}
            containerStyle={{padding: '20px'}}
            appBarStyle={{display: 'none', background: 'none', boxShadow: 'none', marginBottom: '10px'}}
            className="signup-screen-bar"
            >
            <Container fluid className="header header-mobile">
              <Row>
                <Col xs={12} style={{textAlign: 'center'}}>
                  <IconButton tooltip="Close Menu" style={{width: '50px', margin: '10px', position: 'absolute', right: '0', zIndex: '1500'}} onTouchTap={this.handleCongratsMenuClose}>
                    <CloseIcon color="#3386f4" onClick={this.handleCongratsMenuClose}/>
                  </IconButton>
                </Col>
                <Col xs={12} style={{textAlign: 'center'}}>
                  <br/><br/>
                </Col>
              </Row>
              <Row className="header-row">
                <Col xs={12} style={{textAlign: 'center'}}>
                  <h1 className="logo-text" style={{display: 'inline-block', color: '#eb6b62', fontSize: '18px', fontWeight: '400', letterSpacing: '4px'}}>
                    CONGRATULATIONS
                  </h1>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col sm={4} xs={12}/>
                <Col sm={4} xs={12}>
                  <Container>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div style={{textAlign: 'center'}}>
                          <img src={require("./imgs/confirmed-signup.png")} style={{width: '60%', marginLeft: 'auto', marginRight: 'auto'}}/>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div>
                          <p style={{textAlign: 'left', fontSize: '15px', letterSpacing: '1px', lineHeight: '22px'}}>
                            We have your device sorted.
                            <br/><br/><br/>
                            We recommend you to set your <span style={{color: '#3386f4'}}>notification</span> preferences on jobs, tracking and diagnosis based information to your device.
                          </p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div className="">
                          <FlatButton labelStyle={{fontSize: '15px', letterSpacing: '2px'}} backgroundColor={primaryColor} hoverColor={hoverColor} label="UPDATE PROFILE" fullWidth style={{color: '#fff', marginTop: '50px', minHeight: '55px', fontSize: '15px'}} onTouchTap={this.handleNavigateProfileBtn}/>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col sm={4} xs={12}/>
              </Row>
            </Container>
          </FullscreenDialog>
        </div>
      </MuiThemeProvider>
    );
  }
}
