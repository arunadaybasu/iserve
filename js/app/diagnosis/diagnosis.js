import React, {Component} from 'react';
import {Container, Row, Col} from 'react-grid-system';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import ChipInput from 'material-ui-chip-input';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import Paper from 'material-ui/Paper';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import axios from 'axios';
import FullscreenDialog from 'material-ui-fullscreen-dialog';
const primaryColor = '#3386f4';
const hoverColor = '#3E8CF8';
const axiosConfig = {
  withCredentials: true
};
let counter = 0;
let allDevices = [];
let allBrands = [];
let allModels = [];
let justModels = [];
let allColors = [];
let allIssues = [];
let allSolutions = [];
let currentDevice = '';
let currentBrand = '';
let currentModel = '';
let currentColor = '';
let currentIssue = '';
const dataSourceConfig = {
  text: 'textKey',
  value: 'valueKey',
};

export class Diagnosis extends Component {
  constructor(props) {
    super(props);
    this.state = {tabvalue: 'phone', searchArr: [], solutions: [], viewSolution: false};
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleClickTab = this.handleClickTab.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.searchStringInArray = this.searchStringInArray.bind(this);
    this.handleViewSolution = this.handleViewSolution.bind(this);
    this.handleViewSolutionClose = this.handleViewSolutionClose.bind(this);
  }

  handleViewSolution() {
    this.setState({
      viewSolution: true
    });
    if (document.getElementById('signupbtn') !== null && document.getElementById('signupbtn') !== undefined) {
      document.getElementById('signupbtn').style.display = 'none';
    }
    if (document.getElementById('signupbtndesktop') !== null && document.getElementById('signupbtndesktop') !== undefined) {
      document.getElementById('signupbtndesktop').style.display = 'none';
    }
  }

  handleViewSolutionClose() {
    this.setState({
      viewSolution: false
    });
    if (document.getElementById('signupbtn') !== null && document.getElementById('signupbtn') !== undefined) {
      document.getElementById('signupbtn').style.display = 'block';
    }
    if (document.getElementById('signupbtndesktop') !== null && document.getElementById('signupbtndesktop') !== undefined) {
      document.getElementById('signupbtndesktop').style.display = 'block';
    }
  }

  componentDidMount() {
    axios.get('http://icore.repairmonk.com/website/models/', JSON.stringify(axiosConfig))
      .then(response => {
        allModels = response.data;
        for (let i = 0; i < response.data.length; i++) {
          justModels.push(response.data[i].name);
        }
        this.setState({
          searchArr: justModels
        });
        // console.log(allModels);
      })
      .catch(error => {
        console.log(error);
      });
  }

  searchStringInArray(str, strArray) {
    for (let j = 0; j < strArray.length; j++) {
      if (strArray[j].toLowerCase().match(str)) {
        return j;
      }
    }
    return -1;
  }

  handleChangeTab(value) {
    this.setState({
      tabvalue: value
    });
  }

  handleClickTab(e) {
    console.log(e);
    e.props.style.color = '#3386f4';
  }

  handleUpdateInput(chips) {
    console.log(chips, allModels);
    for (let j = 0; j < chips.length; j++) {
      if (this.searchStringInArray(chips[j].toLowerCase(), justModels) > -1) {
        console.log(this.searchStringInArray(chips[j].toLowerCase(), justModels), chips[j]);
      }
    }
    // if (this.searchStringInArray(chips[chips.length - 1], allDevices) > -1) {
    //   currentDevice = chips[chips.length - 1];
    //   console.log(currentDevice + ' in devices');
    //   axios.post('http://icore.repairmonk.com/website/issues/', {device: chips[chips.length - 1]}, JSON.stringify(axiosConfig))
    //     .then(response => {
    //       allBrands = response.data;
    //       this.setState({
    //         searchArr: allBrands
    //       });
    //       console.log(allBrands);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }
    // if (this.searchStringInArray(chips[chips.length - 1], allBrands) > -1) {
    //   currentBrand = chips[chips.length - 1];
    //   console.log(currentBrand + ' in brands');
    //   axios.post('http://icore.repairmonk.com/website/issues/', {device: currentDevice, brand: chips[chips.length - 1]}, JSON.stringify(axiosConfig))
    //     .then(response => {
    //       allModels = response.data;
    //       this.setState({
    //         searchArr: allModels
    //       });
    //       console.log(allModels);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }
    // if (this.searchStringInArray(chips[chips.length - 1], allModels) > -1) {
    //   currentModel = chips[chips.length - 1];
    //   console.log(currentModel + ' in models');
    //   axios.post('http://icore.repairmonk.com/website/issues/', {device: currentDevice, brand: currentBrand, model: chips[chips.length - 1]}, JSON.stringify(axiosConfig))
    //     .then(response => {
    //       allColors = response.data;
    //       this.setState({
    //         searchArr: allColors
    //       });
    //       console.log(allColors);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }
    // if (this.searchStringInArray(chips[chips.length - 1], allColors) > -1) {
    //   currentColor = chips[chips.length - 1];
    //   console.log(currentColor + ' in colors');
    //   axios.post('http://icore.repairmonk.com/website/issues/', {device: currentDevice, brand: currentBrand, model: currentModel, colour: chips[chips.length - 1]}, JSON.stringify(axiosConfig))
    //     .then(response => {
    //       allIssues = response.data;
    //       this.setState({
    //         searchArr: allIssues
    //       });
    //       console.log(allIssues, currentColor);
    //       allSolutions = allIssues.map(val => {
    //         return (
    //           <Paper key={counter++} style={{minHeight: '200px', width: '100%', textAlign: 'center', padding: '20px', marginBottom: '20px'}} zDepth={2}>
    //             <p className="landing-repair-p-info boxed">
    //               How much will it take to fix {currentModel} {val}?
    //             </p>
    //             <p className="landing-repair-diagnosis-ans">
    //               Depending on whether you are looking for an original or of another brand it could be anywhere between Rs. 6,000 to Rs. 18,000.
    //             </p>
    //             <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label="VIEW SOLUTION" fullWidth style={{color: '#fff'}} onClick={this.handleViewSolution}/>
    //           </Paper>
    //         );
    //       });
    //       this.setState({
    //         solutions: allSolutions
    //       });
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }
    // if (this.searchStringInArray(chips[chips.length - 1], allIssues) > -1) {
    //   currentIssue = chips[chips.length - 1];
    //   console.log(currentIssue + ' in issues');
    //   axios.post('http://icore.repairmonk.com/website/check_estimate/', {model: currentModel, issue: currentIssue}, JSON.stringify(axiosConfig))
    //     .then(response => {
    //       allSolutions =
    //       (
    //         <Paper key={counter++} style={{minHeight: '200px', width: '100%', textAlign: 'center', padding: '20px', marginBottom: '20px'}} zDepth={2}>
    //           <p className="landing-repair-p-info boxed">
    //             How much will it take to fix {currentModel} {currentIssue}?
    //           </p>
    //           <p className="landing-repair-diagnosis-ans">
    //             Depending on whether you are looking for an original or of another brand it could be anywhere around Rs. {response.data.estimate_amount}.
    //           </p>
    //           <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label="VIEW SOLUTION" fullWidth style={{color: '#fff'}} onClick={this.handleViewSolution}/>
    //         </Paper>
    //       );
    //       this.setState({
    //         solutions: allSolutions
    //       });
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }
    console.log(currentDevice, currentBrand, currentModel, currentColor, currentIssue);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Container fluid className="section landing-repair">
            <Row>
              <Col xs={12} style={{padding: '0'}}>
                <Tabs
                  value={this.state.tabvalue}
                  onChange={this.handleChangeTab}
                  inkBarStyle={{background: '#3386F4', color: '#3386F4'}}
                  className="diagnosis-tabs"
                  >
                  <Tab label="Phone" value="phone" style={{color: '#9b9b9b', letterSpacing: '0.5px'}} onActive={this.handleClickTab}>
                    <Container fluid>
                      <Row className="landing-repair-row" style={{backgroundColor: '#d6edff'}}>
                        <Col xs={12}>
                          <div style={{textAlign: 'center', width: '100%'}}>
                            <img src={require("../imgs/features3.png")} style={{width: '200px'}}/>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} sm={4}>
                          <br/>
                        </Col>
                        <Col xs={12} sm={4}>
                          <Row style={{backgroundColor: '#fff'}}>
                            <Col xs={10}>
                              <ChipInput
                                hintText="Filter your device…"
                                dataSource={this.state.searchArr}
                                onChange={this.handleUpdateInput}
                                fullWidth
                                style={{padding: '0px', lineHeight: '16px'}}
                                className="chip-input"
                                underlineShow={false}
                                openOnFocus
                                newChipKeyCodes={[13, 32]}
                                />
                            </Col>
                            <Col xs={2}>
                              <div style={{textAlign: 'center', width: '100%'}}>
                                <img src={require("../imgs/filter.png")} style={{width: '30px', margin: '20px 0 0 0'}}/>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={12} sm={4}>
                          <br/>
                        </Col>
                      </Row>
                      <Row className="landing-repair-row diagnosis-row">
                        <Col xs={12} sm={4}>
                          <br/>
                        </Col>
                        <Col xs={12} sm={4}>
                          <div className="small">
                            BEST SOLUTIONS
                          </div>
                          {this.state.solutions}
                        </Col>
                        <Col xs={12} sm={4}>
                          <br/>
                        </Col>
                      </Row>
                      <Row className="landing-repair-row diagnosis-row">
                        <Col xs={12} sm={4}>
                          <br/>
                        </Col>
                        <Col xs={12} sm={4}>
                          <div className="small">
                            POPULAR SEARCHES
                          </div>
                          <Paper style={{minHeight: '200px', width: '100%', textAlign: 'center', padding: '20px'}} zDepth={2}>
                            <p className="landing-repair-p-info boxed">
                              How much will it take to fix Apple 6S screen?
                            </p>
                            <p className="landing-repair-diagnosis-ans">
                              Depending on whether you are looking for an original or of another brand it could be anywhere between Rs. 6,000 to Rs. 18,000.
                            </p>
                            <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label="VIEW SOLUTION" fullWidth style={{color: '#fff'}} onClick={this.handleViewSolution}/>
                          </Paper>
                          <br/>
                          <br/>
                          <Paper style={{minHeight: '200px', width: '100%', textAlign: 'center', padding: '20px'}} zDepth={2}>
                            <p className="landing-repair-p-info boxed">
                              How much will it take to fix Apple 6S screen?
                            </p>
                            <p className="landing-repair-diagnosis-ans">
                              Depending on whether you are looking for an original or of another brand it could be anywhere between Rs. 6,000 to Rs. 18,000.
                            </p>
                            <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label="VIEW SOLUTION" fullWidth style={{color: '#fff'}} onClick={this.handleViewSolution}/>
                          </Paper>
                        </Col>
                        <Col xs={12} sm={4}>
                          <br/>
                        </Col>
                      </Row>
                    </Container>
                  </Tab>
                  <Tab label="Laptop" value="laptop" style={{color: '#9b9b9b', letterSpacing: '0.5px'}} onActive={this.handleClickTab}>
                    <Container fluid>
                      <Row className="landing-repair-row" style={{backgroundColor: '#d6edff'}}>
                        <Col xs={12}>
                          <div style={{textAlign: 'center', width: '100%'}}>
                            <img src={require("../imgs/hero_illus.png")} style={{width: '300px'}}/>
                          </div>
                        </Col>
                      </Row>
                      <Row style={{backgroundColor: '#fff'}}>
                        <Col xs={11}>
                          <ChipInput
                            hintText="Filter your device…"
                            dataSource={this.state.searchArr}
                            onChange={this.handleUpdateInput}
                            fullWidth
                            style={{padding: '10px'}}
                            className="chip-input"
                            underlineShow={false}
                            openOnFocus
                            />
                        </Col>
                        <Col xs={1}>
                          <FilterIcon color="#3386f4" className="filter-icon"/>
                        </Col>
                      </Row>
                      <Row className="landing-repair-row diagnosis-row">
                        <Col xs={12} sm={4}>
                          <br/>
                        </Col>
                        <Col xs={12} sm={4}>
                          <div className="small">
                            BEST SOLUTIONS
                          </div>
                          {this.state.solutions}
                        </Col>
                        <Col xs={12} sm={4}>
                          <br/>
                        </Col>
                      </Row>
                      <Row className="landing-repair-row diagnosis-row">
                        <Col xs={12} sm={4}>
                          <br/>
                        </Col>
                        <Col xs={12} sm={4}>
                          <div className="small">
                            POPULAR SEARCHES
                          </div>
                          <Paper style={{minHeight: '200px', width: '100%', textAlign: 'center', padding: '20px'}} zDepth={2}>
                            <p className="landing-repair-p-info boxed">
                              How much will it take to fix Apple 6S screen?
                            </p>
                            <p className="landing-repair-diagnosis-ans">
                              Depending on whether you are looking for an original or of another brand it could be anywhere between Rs. 6,000 to Rs. 18,000.
                            </p>
                            <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label="VIEW SOLUTION" fullWidth style={{color: '#fff'}} onClick={this.handleViewSolution}/>
                          </Paper>
                          <br/>
                          <br/>
                          <Paper style={{minHeight: '200px', width: '100%', textAlign: 'center', padding: '20px'}} zDepth={2}>
                            <p className="landing-repair-p-info boxed">
                              How much will it take to fix Apple 6S screen?
                            </p>
                            <p className="landing-repair-diagnosis-ans">
                              Depending on whether you are looking for an original or of another brand it could be anywhere between Rs. 6,000 to Rs. 18,000.
                            </p>
                            <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label="VIEW SOLUTION" fullWidth style={{color: '#fff'}} onClick={this.handleViewSolution}/>
                          </Paper>
                        </Col>
                        <Col xs={12} sm={4}>
                          <br/>
                        </Col>
                      </Row>
                    </Container>
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Container>
          <FullscreenDialog
            open={this.state.viewSolution}
            title={'VIEW SOLUTION'}
            actionButton={<IconButton key={1} tooltip="Close" style={{width: '50px'}} onTouchTap={this.handleMenuClose}><CloseIcon color="#3386f4"/></IconButton>}
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
            style={{width: '100vw', height: '100vh', borderRadius: '5px'}}
            containerStyle={{padding: '20px'}}
            appBarStyle={{display: 'none'}}
            id="signup-screen-bar"
            >
            <Container fluid className="header header-mobile">
              <Row>
                <Col sm={4} xs={12}/>
                <Col sm={4} xs={12}>
                  <div className="diagnose-phone-problem">
                    <Row>
                      <Col sm={12} xs={12}>
                        <IconButton tooltip="Close" style={{width: '50px', margin: '10px', position: 'absolute', right: '0', zIndex: '1500'}} onTouchTap={this.handleMenuClose}>
                          <CloseIcon color="#3386f4" onClick={this.handleViewSolutionClose}/>
                        </IconButton>
                      </Col>
                      <Col sm={12} xs={12}>
                        <div className="diagnose-modal-header">
                          <h1 className="diagnose-modal-header-text">
                            How much will it take to fix apple 6S screen?
                          </h1>
                        </div>
                      </Col>
                      <Col sm={12} xs={12}>
                        <div className="diagnose-modal-item">
                          <div className="diagnose-product-item">
                            apple
                          </div>
                          <div className="diagnose-product-item">
                            broken screen
                          </div>
                        </div>
                      </Col>
                      <Col sm={12} xs={12}>
                        <div className="diagnose-modal-item-content">
                          <p className="diagnose-modal-item-text">
                            Your device is suffering a <span className="orange-text">broken screen, faulty charger</span> and <span className="orange-text">memory loss</span>.
                          </p>
                          <p className="diagnose-modal-item-text">
                            This usually happens due to <span className="orange-text">device being dropped, pressure applied on device</span> and <span className="orange-text">improper maintainence during charging</span>.
                          </p>
                          <p className="diagnose-modal-item-text">
                            Depending on what the actual problem is the possible solutions can be:
                          </p>
                          <ul className="diagnose-modal-item-list">
                            <li className="solutions-list">•&nbsp;&nbsp;&nbsp;Solution 1 which is foe job 1</li>
                            <li className="solutions-list">•&nbsp;&nbsp;&nbsp;Solution 2 for job 2</li>
                            <li className="solutions-list">•&nbsp;&nbsp;&nbsp;Solution 3 for job 3</li>
                          </ul>
                          <p style={{paddingTop: '20px'}} className="diagnose-modal-item-text">
                            We can solve this for you in approximately <span className="orange-text">2 hours</span>.
                          </p>
                          <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label="GET A QUOTE" fullWidth style={{color: '#fff', marginTop: '0px', minHeight: '55px', borderRadius: '5px'}} onTouchTap={this.handleSignupBtn}/>
                        </div>
                      </Col>
                    </Row>
                  </div>
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
