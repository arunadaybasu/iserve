import React, {Component} from 'react';
import {Container, Row, Col} from 'react-grid-system';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchIcon from 'material-ui/svg-icons/action/search';
import DownIcon from 'material-ui/svg-icons/navigation/expand-more';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import FullscreenDialog from 'material-ui-fullscreen-dialog';
import {AppHeader} from './../headers/appheader';
import {Diagnosis} from './../diagnosis/diagnosis';
import {Repair} from './../repairnew/repairnew';
import AutoComplete from 'material-ui/AutoComplete';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Snackbar from 'material-ui/Snackbar';
import {ScrollSection, ScrollContainer} from 'react-onepage-scroll';
const cookies = new Cookies();
const emailRegex = /^\S+@\S+\.\S+$/;

let allModels = [];
let validEmail;
const dataSourceModels = [];

const axiosConfig = {
  withCredentials: true,
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export class Landing extends Component {
  constructor(props) {
    super(props);
    axios.defaults.headers.common.Authorization = 'Basic b250aGVkb3Q6dGVzdEAxMjM=';
    this.state = {dataSource: [], testvalue: 1, diagnosisOpen: false, RepairOpen: false, signupOpen: false, repairStr: '', chosenModel: '', chosenProblem: '', email: '', phone: '', password: '', signInOpen: false, invalid: '', invalidSignup: '', signUpSuccess: false, openSnack: false, openTablet: false};
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleDiagnosisOpen = this.handleDiagnosisOpen.bind(this);
    this.handleDiagnosisClose = this.handleDiagnosisClose.bind(this);
    this.handleRepairOpen = this.handleRepairOpen.bind(this);
    this.handleRepairClose = this.handleRepairClose.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleSignupClose = this.handleSignupClose.bind(this);
    this.handleCheckElement = this.handleCheckElement.bind(this);
    this.handleCheckBlurElement = this.handleCheckBlurElement.bind(this);
    this.handleEmailUpdateInput = this.handleEmailUpdateInput.bind(this);
    this.handleMobileUpdateInput = this.handleMobileUpdateInput.bind(this);
    this.handlePasswordUpdateInput = this.handlePasswordUpdateInput.bind(this);
    this.handleSignupBtn = this.handleSignupBtn.bind(this);
    this.handleOpenSignIn = this.handleOpenSignIn.bind(this);
    this.handleSigninMenuClose = this.handleSigninMenuClose.bind(this);
    this.handleSigninBtn = this.handleSigninBtn.bind(this);
    this.handleCongratsMenuClose = this.handleCongratsMenuClose.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.onHandleAutoComp = this.onHandleAutoComp.bind(this);
    this.handleTabletRequestClose = this.handleTabletRequestClose.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
  }

  handleRedirect(e) {
    e.preventDefault();
    document.getElementById('landing-repair').style.border = '1px solid #3F51B5';
  }

  componentDidMount() {
    axios.get('http://icore.repairmonk.com/website/models/', JSON.stringify(axiosConfig)).then(response => {
      for (let i = 0; i < response.data.length; i++) {
        dataSourceModels.push(response.data[i].name);
      }
      allModels = response.data;
      this.setState({
        dataSource: dataSourceModels
      });
    }).catch(error => {
      console.log(error);
    });
    if (cookies.get('userId') !== null && cookies.get('userId') !== undefined && cookies.get('userId') !== '') {
      if (document.getElementById('signupbtn') !== null && document.getElementById('signupbtn') !== undefined) {
        document.getElementById('signupbtn').style.display = 'none';
      }
    }
    if (cookies.get('userId') === null || cookies.get('userId') === undefined || cookies.get('userId') === '') {
      if (document.getElementById('signupbtn') !== null && document.getElementById('signupbtn') !== undefined) {
        document.getElementById('signupbtn').style.display = 'block';
      }
    }
  }

  onHandleAutoComp(searchText, key) {
    const searchArr = searchText.split(' ');
    return (key.toLowerCase().indexOf(searchArr[searchArr.length - 1]) !== -1);
  }

  handleDiagnosisOpen() {
    this.setState({diagnosisOpen: true});
  }

  handleDiagnosisClose() {
    this.setState({diagnosisOpen: false});
  }

  handleRepairOpen() {
    this.setState({RepairOpen: true});
  }

  handleRepairClose() {
    this.setState({RepairOpen: false});
  }

  handleUpdateInput(chosenRequest, index) {
    for (let s = 0; s < allModels.length; s++) {
      if (s === index) {
        if (allModels[s].device_type === 'Tablet Computer') {
          document.getElementById('signupbtn').style.display = 'none';
          this.setState({
            openTablet: true
          });
          return;
        }
      }
    }
    axios.get('http://icore.repairmonk.com/website/models/', JSON.stringify(axiosConfig))
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          if (chosenRequest === response.data[i].name) {
            cookies.set('device-model-id', response.data[i].id, {path: '/'});
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({
      chosenModel: chosenRequest
    });
    for (let i = 0; i < allModels.length; i++) {
      if (allModels[i].name === chosenRequest) {
        cookies.set('device-type', allModels[i].device_type, {path: '/'});
        cookies.set('device-brand', allModels[i].brand, {path: '/'});
        cookies.set('device-model', chosenRequest, {path: '/'});
        window.location = '/repair';
        return;
      }
    }
    if (index === -1 && cookies.get('device-model-id') !== '') {
      window.location = '/repair';
    }
  }

  handleSignup(ev) {
    ev.preventDefault();
    if (document.getElementById('signupbtn') !== null || document.getElementById('signupbtn') !== undefined) {
      document.getElementById('signupbtn').style.display = 'none';
    }
    this.setState({
      signupOpen: true,
      signInOpen: false
    });
  }

  handleSignupClose(ev) {
    ev.preventDefault();
    document.getElementById('signupbtn').style.display = 'block';
    this.setState({signupOpen: false});
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
        invalidSignup: 'Invalid email'
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
          signUpSuccess: true
        });
      }
    }).catch(error => {
      console.log(error);
    });
  }

  handleOpenSignIn() {
    this.setState({
      signupOpen: false,
      signInOpen: true
    });
  }

  handleSigninMenuClose() {
    document.getElementById('signupbtn').style.display = 'block';
    this.setState({
      signInOpen: false,
      invalid: ''
    });
  }

  handleCongratsMenuClose() {
    if (document.getElementById('signupbtn') !== null && document.getElementById('signupbtn') !== undefined) {
      document.getElementById('signupbtn').style.display = 'none';
    }
    this.setState({
      signUpSuccess: false
    });
  }

  handleSigninBtn(e) {
    e.preventDefault();
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
        invalidSignup: 'Invalid email'
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
        if (document.getElementById('signupbtn') !== null || document.getElementById('signupbtn') !== undefined) {
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

  handleNavigateProfileBtn() {
    window.location = '/profile';
  }

  handleSnackRequestClose() {
    this.setState({
      openSnack: false
    });
  }

  handleTabletRequestClose() {
    this.setState({
      openTablet: false
    });
    document.getElementById('signupbtn').style.display = 'block';
  }

  render() {
    const primaryColor = '#3386f4';
    const hoverColor = '#3E8CF8';
    const buttonHeight = '50px';
    return (
      <MuiThemeProvider>
        <div>
          <ScrollContainer>
            <ScrollSection pageId={0}>
              <Container fluid className="section landing-repair">
                <Row style={{padding: '20px 0'}}>
                  <Col sm={4} xs={12}/>
                  <Col sm={4} xs={12}>
                    <h1 className="landing-repair-h1">
                      Get your device<br/>
                      repaired, hassle-free
                    </h1>
                    <p className="landing-repair-p">
                      Book a doorstep service or walk-in to the nearest centre and track repair progress all the way
                    </p>
                  </Col>
                  <Col sm={4} xs={12}/>
                </Row>
                <Row>
                  <Col sm={4} xs={12}/>
                  <Col sm={4} xs={12}>
                    <div style={{height: '58px', marginLeft: 'auto', marginRight: 'auto'}}>
                      <Row id="landing-repair" className="landing-repair-field" style={{height: '58px'}}>
                        <Col xs={10}>
                          <AutoComplete
                            style={{height: '58px'}}
                            value={this.state.repairStr}
                            searchText={this.state.repairStr}
                            hintText="Enter device, brand or problem"
                            hintStyle={{fontSize: '13.4px', color: '#9b9b9b'}}
                            openOnFocus
                            dataSource={this.state.dataSource}
                            filter={this.onHandleAutoComp}
                            maxSearchResults={5}
                            onNewRequest={this.handleUpdateInput}
                            fullWidth
                            />
                        </Col>
                        <Col xs={2}>
                          <SearchIcon color="#9b9b9b" style={{float: 'right', margin: '10px'}}/>
                        </Col>
                      </Row>
                    </div>
                    <FullscreenDialog
                      open={this.state.RepairOpen}
                      title={'iService'}
                      actionButton={<IconButton key={1} tooltip="Close Menu" style={{width: '50px'}} onTouchTap={this.handleRepairClose}><CloseIcon color="#3386f4"/></IconButton>}
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
                      <AppHeader title="Repair"/>
                      <Repair/>
                    </FullscreenDialog>
                    <br/>
                    <br/>
                    <div style={{width: '100%', textAlign: 'center'}}>
                      <RaisedButton
                        className="raised-button repair-btn"
                        buttonStyle={{height: buttonHeight, width: '100%'}}
                        style={{borderRadius: '10px', textAlign: 'center'}}
                        label="REPAIR"
                        labelStyle={{fontSize: '14px', paddingTop: '10px'}}
                        backgroundColor={primaryColor}
                        labelColor="#fff"
                        onTouchTap={this.handleRedirect}
                        fullWidth
                        />
                    </div>
                    <br/>
                    <br/>
                    <br/>
                  </Col>
                  <Col sm={4} xs={12}/>
                </Row>
                <Row style={{backgroundColor: '#FAFAFA'}}>
                  <Col sm={12} xs={12}>
                    <div style={{textAlign: 'center', width: '100%', padding: '20px'}}>
                      <img src={require("../imgs/landinghero.png")} style={{width: '90%'}}/>
                    </div>
                    <br/>
                    <p className="landing-repair-p">
                      <span style={{color: '#ed6a5e', fontWeight: '600'}}>35,000</span> iService customers India-wide
                    </p>
                    <p style={{padding: 10}}/>
                  </Col>
                </Row>
              </Container>
            </ScrollSection>
            <ScrollSection pageId={1}>
              <Container fluid className="section landing-info-2" style={{paddingBottom: '20px'}}>
                <Row className="landing-repair-row">
                  <Col xs={12} sm={4}/>
                  <Col xs={12} sm={4}>
                    <h1 className="landing-repair-h1" style={{fontSize: '24pt', fontWeight: '300'}}>
                      How it works
                    </h1>
                  </Col>
                  <Col sm={4}>
                    <br/>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}/>
                  <Col sm={4}>
                    <Row>
                      <Col sm={12} xs={12}>
                        <p className="landing-repair-p-num">
                          1 <span className="landing-repair-works">
                              BOOK A REPAIR
                            </span><img src={require("../imgs/tracking1.png")} style={{width: '35px', float: 'right'}}/>
                        </p>
                        <div className="vertical-dashed-line">
                          <p className="vertical-dashed-line-content">
                            Book an at-home service or schedule a device pick-up at your convenience. Need to talk to us? Walk in to our nearest store.
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={4}/>
                </Row>
                <Row>
                  <Col sm={4}/>
                  <Col sm={4}>
                    <Row>
                      <Col sm={12} xs={12}>
                        <p className="landing-repair-p-num">
                          2 <span className="landing-repair-works">TRACK YOUR JOB</span><img src={require("../imgs/tracking2.png")} style={{width: '35px', float: 'right', marginTop: '10px'}}/>
                        </p>
                        <div className="vertical-dashed-line">
                          <p className="vertical-dashed-line-content" style={{marginLeft: '5px'}}>
                            Our tracking feature gives you real-time updates on the progress of your device repair.
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={4}/>
                </Row>
                <Row>
                  <Col sm={4}/>
                  <Col sm={4}>
                    <Row>
                      <Col sm={10} xs={10} style={{paddingLeft: '0px'}}>
                        <div className="collection">
                          <span className="landing-repair-p-num" style={{marginLeft: '34px', marginTop: '15px'}}>
                            3
                          </span>
                          <p className="landing-repair-p-num" style={{padding: '0px', marginLeft: '25px', textAlign: 'left', fontFamily: 'Istok', fontWeight: '600', color: '#ed6a5e', fontSize: '16px', maxWidth: '250px'}}>
                            COLLECT REPAIRED DEVICE IN LESS THAN 4 HOURS
                          </p>
                        </div>
                      </Col>
                      <Col sm={2} xs={2} style={{paddingLeft: '0px'}}>
                        <img src={require("../imgs/tracking3.png")} style={{width: '40px', marginTop: '20px'}}/>
                      </Col>
                      <Col sm={12}>
                        <p className="vertical-dashed-line-content" style={{paddingLeft: '0px', marginLeft: '60px', maxWidth: '300px'}}>
                          Collect your repaired device or get it delivered back to you. Most repairs are done within 2 hours!
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={4}/>
                </Row>
                <Row>
                  <Col sm={12} className="landing-bg-special-col">
                    <div style={{textAlign: 'center', width: '100%'}}>
                      <img src={require("../imgs/bgcurve.png")} style={{width: '100%', marginTop: '30px'}}/>
                    </div>
                  </Col>
                </Row>
              </Container>
            </ScrollSection>
            <ScrollSection pageId={2}>
              <Container fluid className="section landing-info-1" style={{marginTop: '-40px', marginBottom: '-40px', paddingBottom: '40px', paddingTop: '40px'}}>
                <Row style={{paddingTop: '0'}}>
                  <Col sm={12}>
                    <h1 className="landing-repair-h1 info-h1" style={{fontSize: '24pt', fontWeight: '300', paddingBottom: '20px'}}>
                      Why iService
                    </h1>
                  </Col>
                </Row>
                <Row>
                  <Col sm={3} xs={12}/>
                  <Col sm={6} xs={12}>
                    <div style={{padding: '20px'}}>
                      <Row>
                        <Col sm={12} xs={12}>
                          <p style={{paddingLeft: '0px', fontSize: '18px', color: '#d6edff', fontWeight: 600}} className="landing-repair-p-info">REPAIR FROM ANYWHERE, FAST</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={8} xs={12}>
                          <p style={{marginBottom: '20px', padding: '0px', marginTop: '0px'}} className="landing-repair-features">
                            Walk-in to the nearest centre or book a doorstep service for a quick repair. We would not want to keep you from your device for too long!
                          </p>
                        </Col>
                        <Col sm={4} xs={12}>
                          <div className="featured-1" style={{textAlign: 'center', width: '100%'}}>
                            <img src={require("../imgs/features1.png")} style={{maxWidth: '220px'}}/>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col sm={2} xs={12}/>
                </Row>
                <Row>
                  <Col sm={3} xs={12}/>
                  <Col sm={6} xs={12}>
                    <div style={{padding: '20px'}}>
                      <Row>
                        <Col sm={12} xs={12}>
                          <p style={{paddingLeft: '0px', fontSize: '18px', color: '#d6edff', fontWeight: 600}} className="landing-repair-p-info">iSERVICE WARRANTY</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={8} xs={12}>
                          <p style={{marginBottom: '20px', padding: '0px', marginTop: '0px'}} className="landing-repair-features">
                            We use high quality spares and give you upto 1 year warranty on repairs.
                          </p>
                        </Col>
                        <Col sm={4} xs={12} style={{paddingLeft: '0px'}}>
                          <div className="featured-2" style={{textAlign: 'center', width: '100%'}}>
                            <img src={require("../imgs/features2.png")} style={{maxWidth: '100px'}}/>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col sm={2} xs={12}/>
                </Row>
                <Row>
                  <Col sm={3} xs={12}/>
                  <Col sm={6} xs={12}>
                    <div style={{padding: '20px'}}>
                      <Row>
                        <Col sm={12} xs={12}>
                          <p style={{paddingLeft: '0px', fontSize: '18px', color: '#d6edff', fontWeight: 600}} className="landing-repair-p-info">TRANSPARENT ALL THE WAY</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={8} xs={12}>
                          <p style={{marginBottom: '20px', padding: '0px', marginTop: '0px'}} className="landing-repair-features">
                            Track repair progress and get honest estimate about what needs to be repaired so that <br/> you save time.
                          </p>
                        </Col>
                        <Col sm={4} xs={12}>
                          <div className="featured-3" style={{textAlign: 'center', width: '100%'}}>
                            <img src={require("../imgs/features3.png")} style={{maxWidth: '160px'}}/>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col sm={2} xs={12}/>
                </Row>
              </Container>
            </ScrollSection>
            <ScrollSection pageId={3}>
              <Container fluid className="section landing-faq">
                <Row className="landing-repair-row">
                  <Col xs={12} sm={3} className="landing-bg-special-col">
                    <div style={{width: '100%', textAlign: 'left'}} className="hide-on-mobile">
                      <img className="special-img-left" style={{width: '70%'}} src={require("../imgs/Diagnoselaptop.png")}/>
                    </div>
                  </Col>
                  <Col xs={12} sm={1}/>
                  <Col xs={12} sm={4} style={{padding: '30px'}}>
                    <h1 className="landing-repair-h1" style={{fontSize: '24pt', fontWeight: '300'}}>
                      Diagnose your problem
                    </h1>
                    <p className="landing-repair-p">
                      Whether it&#39;s a broken screen, a missing volume<br/>
                      button or a messy charger,<br/>
                      <span style={{fontWeight: '600'}}>we can fix it.</span>
                    </p>
                    <p className="landing-repair-p-info-inactive">
                      We fix almost all devices, you can search for your device here
                    </p>
                    <Row className="landing-repair-field">
                      <Col xs={10}>
                        <TextField
                          hintText="Search for the device you want to repair"
                          onChange={this.handleUpdateInput}
                          underlineShow={false}
                          fullWidth
                          onFocus={this.handleDiagnosisOpen}
                          hintStyle={{overflow: 'hidden', width: '100%', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}
                          />
                      </Col>
                      <Col xs={2}>
                        <DownIcon color="#3386f4" style={{float: 'right', margin: '10px'}}/>
                      </Col>
                    </Row>
                    <FullscreenDialog
                      open={this.state.diagnosisOpen}
                      title={'iService'}
                      actionButton={<IconButton key={1} tooltip="Close Menu" style={{width: '50px'}} onTouchTap={this.handleDiagnosisClose}><CloseIcon color="#3386f4"/></IconButton>}
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
                      <AppHeader title="Diagnosis"/>
                      <Diagnosis/>
                    </FullscreenDialog>
                    <div className="small">
                      ISSUES
                    </div>
                    <Paper style={{minHeight: '200px', width: '100%', textAlign: 'center', padding: '20px'}} zDepth={2}>
                      <p className="landing-repair-p-info boxed" style={{padding: '0'}}>
                        How much will it take to fix Apple 6S screen?
                      </p>
                      <p className="landing-repair-p" style={{fontSize: '14px', textAlign: 'left'}}>
                        Depending on whether you are looking for an original or of another brand it could be anywhere between <span style={{color: '#ed6a5e'}}>Rs. 6,000</span> to Rs. <span style={{color: '#ed6a5e'}}>18,000.</span>
                      </p>
                      <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label="VIEW SOLUTION" fullWidth style={{color: '#fff', height: '40px'}}/>
                    </Paper>
                    <br/>
                    <br/>
                    <Paper style={{minHeight: '200px', width: '100%', textAlign: 'center', padding: '20px'}} zDepth={2}>
                      <p className="landing-repair-p-info boxed" style={{padding: '0'}}>
                        How much will it take to fix Apple 6S screen?
                      </p>
                      <p className="landing-repair-p" style={{fontSize: '14px', textAlign: 'left'}}>
                        Depending on whether you are looking for an original or of another brand it could be anywhere between <span style={{color: '#ed6a5e'}}>Rs. 6,000</span> to Rs. <span style={{color: '#ed6a5e'}}>18,000.</span>
                      </p>
                      <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label="VIEW SOLUTION" fullWidth style={{color: '#fff', height: '40px'}}/>
                    </Paper>
                  </Col>
                  <Col xs={12} sm={4} className="landing-bg-special-col">
                    <div style={{width: '100%', textAlign: 'right'}} className="hide-on-mobile">
                      <img className="special-img-right" style={{width: '32%'}} src={require("../imgs/Diagnosemobile.png")}/>
                    </div>
                  </Col>
                </Row>
              </Container>
            </ScrollSection>
            <ScrollSection pageId={4}>
              <Container fluid className="section landing-reviews">
                <Row>
                  <p style={{padding: 40}}/>
                  <Col sm={12}>
                    <h1 className="landing-repair-h1 info-h1" style={{fontSize: '24pt'}}>
                      People &hearts; us
                    </h1>
                  </Col>
                </Row>
                <Row>
                  <Col sm={3}>
                    <br/>
                  </Col>
                  <Col sm={6}>
                    <div className="small" style={{color: '#d6edff'}}>
                      REVIEWS
                    </div>
                    <Paper style={{minHeight: '200px', width: '100%', textAlign: 'center', padding: '20px'}} zDepth={2}>
                      <Row>
                        <Col xs={9}>
                          <p className="landing-repair-p-info info-reviews">
                            Animesh Roy
                          </p>
                          <p className="landing-repair-p-info info-reviews-small">
                            These guys are brilliant and they really know how to keep you happy.
                          </p>
                        </Col>
                        <Col xs={3}>
                          <div style={{textAlign: 'right', width: '100%'}}>
                            <img className="techie-img" src={require("../imgs/iTechie.png")} style={{maxWidth: '80px'}}/>
                          </div>
                        </Col>
                      </Row>
                    </Paper>
                    <br/>
                    <br/>
                    <Paper style={{minHeight: '200px', width: '100%', textAlign: 'center', padding: '20px'}} zDepth={2}>
                      <Row>
                        <Col xs={9}>
                          <p className="landing-repair-p-info info-reviews">
                            Nikhila Anoth Mamagidallu
                          </p>
                          <p className="landing-repair-p-info info-reviews-small">
                            These guys are brilliant and they really know how to keep you happy.
                            But this one is with longer text and this is the standard way to keep
                            the sizes unified across different length of sentences
                          </p>
                        </Col>
                        <Col xs={3}>
                          <div style={{textAlign: 'right', width: '100%'}}>
                            <img className="techie-img" src={require("../imgs/iTechie.png")}/>
                          </div>
                        </Col>
                      </Row>
                    </Paper>
                    <br/>
                    <br/>
                    <Paper style={{minHeight: '200px', width: '100%', textAlign: 'center', padding: '20px'}} zDepth={2}>
                      <Row>
                        <Col xs={9}>
                          <p className="landing-repair-p-info info-reviews">
                            Animesh Roy
                          </p>
                          <p className="landing-repair-p-info info-reviews-small">
                            These guys are brilliant and they really know how to keep you happy.
                          </p>
                        </Col>
                        <Col xs={3}>
                          <div style={{textAlign: 'right', width: '100%'}}>
                            <img className="techie-img" src={require("../imgs/iTechie.png")}/>
                          </div>
                        </Col>
                      </Row>
                    </Paper>
                  </Col>
                  <Col sm={3}>
                    <br/>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} xs={12}>
                    <FlatButton id="signupbtndesktop" label="SIGN UP" style={{color: '#fff', fontSize: '20px !important', fontWeight: '600'}} className="floating-btn-bot-signup desktop hide-on-desktop" onClick={this.handleSignup}/>
                    <FlatButton id="signupbtn" label="SIGN UP" style={{color: '#fff', fontSize: '20px !important', fontWeight: '600'}} className="floating-btn-desktop-signup mobile hide-on-mobile" onClick={this.handleSignup}/>
                  </Col>
                </Row>
              </Container>
            </ScrollSection>
          </ScrollContainer>
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
                          <TextField type="text" inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Email" hintStyle={{color: '#9b9b9b', zIndex: '9999', paddingLeft: '15px'}} onChange={this.handleEmailUpdateInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement}/>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div className="signupInputArea">
                          <TextField type="number" inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Mobile Number" hintStyle={{color: '#9b9b9b', zIndex: '999', paddingLeft: '15px'}} onChange={this.handleMobileUpdateInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement}/>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div className="signupInputArea">
                          <TextField type="password" inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Password" hintStyle={{color: '#9b9b9b', zIndex: '999', paddingLeft: '15px'}} onChange={this.handlePasswordUpdateInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement}/>
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
                          <p className="signInText">Already have an account? <span className="signInTextClick" style={{color: primaryColor}} onTouchTap={this.handleOpenSignIn}>Sign in</span></p>
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
                          <TextField inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Email" hintStyle={{color: '#9b9b9b', zIndex: '9999', paddingLeft: '15px'}} onChange={this.handleEmailUpdateInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement}/>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div className="signupInputArea">
                          <TextField type="password" inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Password" hintStyle={{color: '#9b9b9b', zIndex: '999', paddingLeft: '15px'}} onChange={this.handlePasswordUpdateInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement}/>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div className="">
                          <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label="SIGN IN" fullWidth style={{color: '#fff', marginTop: '50px', minHeight: '55px', borderRadius: '5px'}} onTouchTap={this.handleSigninBtn}/>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div>
                          <p className="signInText">Dont have an account? <span className="signInTextClick" style={{color: primaryColor}} onTouchTap={this.handleSignup}>Sign Up</span></p>
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
            style={{left: '2%', width: '96vw', height: '96vh', borderRadius: '5px', marginTop: '5px', boxShadow: '0px 0px 0px 50px #3386f4'}}
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
                          <img src={require("../imgs/confirmed-signup.png")} style={{width: '60%', marginLeft: 'auto', marginRight: 'auto'}}/>
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
          <Snackbar open={this.state.openSnack} message="Login Successful" autoHideDuration={2000} onRequestClose={this.handleSnackRequestClose}/>
          <Snackbar style={{zIndex: '9999'}} open={this.state.openTablet} message="We do not fix it yet" autoHideDuration={2000} onRequestClose={this.handleTabletRequestClose}/>
        </div>
      </MuiThemeProvider>
    );
  }
}
