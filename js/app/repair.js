import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Container, Row, Col} from 'react-grid-system';
import {Header} from './header';
import {Footer} from './footer';
import './repair/scss/common.scss';
import './repair/scss/colorselection.scss';
import './repair/scss/checkbox.scss';
import ToggleDisplay from 'react-toggle-display';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import SearchIcon from 'material-ui/svg-icons/action/search';
import keyIndex from 'react-key-index';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const messageStyle = {
  backgroundColor: '#ffffff',
  color: '#000000',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block'
};

const styles = {
  searchIconStyle: {
    float: 'right',
    margin: '10px',
    display: 'block',
    cursor: 'pointer'
  },
  availableIconStyle: {
    display: 'none',
    float: 'right',
    margin: '15px'
  },
  unavailableIconStyle: {
    display: 'none',
    float: 'right',
    margin: '15px'
  },
  issueContainer: {
    minHeight: '300px',
    overflowY: 'scroll'
  }
};

const locationControlToggleON = '\'checked\'';
const locationControlToggleOFF = '';
const deviceControlToggleON = '\'checked\'';
const deviceControlToggleOFF = '';
const brandControlToggleON = '\'checked\'';
const brandControlToggleOFF = '';
const modelControlToggleON = '\'checked\'';
const modelControlToggleOFF = '';
const colorControlToggleON = '"checked"';
const colorControlToggleOFF = '';
const checkedState = '"checked"';
const unCheckedState = '';
let deviceModelResponse = [];
let colorPallete = [];
let issueChecks = [];
const axiosConfig = {
  withCredentials: true,
  Accept: 'application/json',
  'Content-Type': 'application/json'
};
export class Repair extends Component {

  constructor() {
    super();
    this.state = {
      show: false,
      deviceType: '',
      raisedButtonText: 'PROCEED TO ESTIMATE',
      messageContent: '',
      locationControlToggleState: locationControlToggleON,
      dataSource: [],
      deviceControlToggleState: deviceControlToggleOFF,
      brandControlToggleState: brandControlToggleOFF,
      value: 1,
      modelControlToggleState: modelControlToggleOFF,
      colorControlToggleState: colorControlToggleOFF,
      checkStateA: '',
      checkStateB: '',
      checkStateC: '',
      checkStateD: '',
      checkStateE: '',
      checkStateF: '',
      checkStateG: '',
      selectBrandField: '',
      selectModelField: '',
      selectedBrand: '',
      colorPalleteData: [],
      issueControlToggleState: unCheckedState
    };
    this.handleDropdownForLocationComponentClick = this.handleDropdownForLocationComponentClick.bind(this);
    this.handleLocationPincodeInputUpdate = this.handleLocationPincodeInputUpdate.bind(this);
    this.handlePincodeSearchCallAPI = this.handlePincodeSearchCallAPI.bind(this);
    this.handleDropdownForDeviceComponentClick = this.handleDropdownForDeviceComponentClick.bind(this);
    this.handleGETDeviceListAPI = this.handleGETDeviceListAPI.bind(this);
    this.deviceListObject = [];
    this.handleDropdownForBrandComponentClick = this.handleDropdownForBrandComponentClick.bind(this);
    this.handleGETBrandListAPI = this.handleGETBrandListAPI.bind(this);
    this.brandListObject = [];
    this.handleDropdownForModelComponentClick = this.handleDropdownForModelComponentClick.bind(this);
    this.handleGETModelListAPI = this.handleGETModelListAPI.bind(this);
    this.modelListObject = [];
    this.handleDropdownForColorComponentClick = this.handleDropdownForColorComponentClick.bind(this);
    this.handleColorA = this.handleColorA.bind(this);
    this.handleColorB = this.handleColorB.bind(this);
    this.handleColorC = this.handleColorC.bind(this);
    this.handleColorD = this.handleColorD.bind(this);
    this.handleSetDeviceSelection = this.handleSetDeviceSelection.bind(this);
    this.handleBrandSelectionChange = this.handleBrandSelectionChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleCheckA = this.handleCheckA.bind(this);
    this.handleCheckB = this.handleCheckB.bind(this);
    this.handleCheckC = this.handleCheckC.bind(this);
    this.handleCheckD = this.handleCheckD.bind(this);
    this.handleCheckE = this.handleCheckE.bind(this);
    this.handleCheckF = this.handleCheckF.bind(this);
    this.handleCheckG = this.handleCheckG.bind(this);
    this.handleCheckIssue = this.handleCheckIssue.bind(this);
    axios.defaults.headers.common.Authorization = 'Basic b250aGVkb3Q6dGVzdEAxMjM=';
  }

  handleDropdownForLocationComponentClick() {
    if (this.state.locationControlToggleState === '') {
      this.setState({
        locationControlToggleState: locationControlToggleON
      });
    } else {
      this.setState({
        locationControlToggleState: locationControlToggleOFF
      });
    }
  }

  handlePincodeSearchCallAPI() {
    console.log('Clicked pin search button!');
    const pincodeConfig = {
      pincode: this.state.dataSource[0]
    };
    axios.post('http://icore.repairmonk.com/website/check_pincode/', pincodeConfig).then(response => {
      console.log(response.data);
      if (response.data.status) {
        this.setState({
          locationControlToggleState: locationControlToggleOFF,
          deviceControlToggleState: '\'checked\''
        });
        return;
      }
      this.setState({
        messageContent: 'We do not serve this location yet. Leave us a message so we can find a partner to service you.'
      });
    }).catch(error => {
      console.log(error);
    });
  }

  handleLocationPincodeInputUpdate(value) {
    this.setState({
      dataSource: [
        value
      ]
    });
  }

  componentDidMount() {
    console.log('[+] Initilization started');
    axios.get('http://icore.repairmonk.com/website/devices/', JSON.stringify(axiosConfig)).then(response => {
      this.deviceListObject = response.data;
      this.deviceListObject = keyIndex(this.deviceListObject, 1);
    }).catch(error => {
      console.log(error);
    });

    axios.get('http://icore.repairmonk.com/website/brands/', JSON.stringify(axiosConfig)).then(response => {
      this.brandListObject = response.data;
      this.brandListObject = keyIndex(this.brandListObject, 1);
    })
    .catch(error => {
      console.log(error);
    });
    // Write API device fetching axios GET call here + implement page loader animation
  }

  handleGETDeviceListAPI() {
    axios.get('http://icore.repairmonk.com/website/devices/', JSON.stringify(axiosConfig))
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDropdownForDeviceComponentClick() {
    if (this.state.deviceControlToggleState === '') {
      this.setState({
        deviceControlToggleState: deviceControlToggleON
      });
    } else {
      this.setState({
        deviceControlToggleState: deviceControlToggleOFF
      });
    }
  }

  handleGETBrandListAPI() {
    axios.defaults.headers.common.Authorization = '186aa02937e6971d46a5f7f131d409bfa4889e1d';
    axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post('http://icore.repairmonk.com/website/brands/')
      .then(response => {
        console.log(response);
        this.brandListObject = keyIndex(response, 1);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDropdownForBrandComponentClick() {
    if (this.state.brandControlToggleState === '') {
      this.setState({
        brandControlToggleState: brandControlToggleON
      });
    } else {
      this.setState({
        brandControlToggleState: brandControlToggleOFF
      });
    }
  }

  handleModelChange(e, indx, val) {
    const colorSelectionCamp = {
      device: this.state.deviceType,
      brand: this.state.selectedBrand,
      model: val
    };
    let counter = 0;
    axios.post('http://icore.repairmonk.com/website/issues/', colorSelectionCamp).then(response => {
      this.setState({
        selectModelField: val,
        colorControlToggleState: colorControlToggleON,
        colorPalleteData: response.data
      });
      colorPallete = response.data.map(result => {
        return (
          <Col key={counter++} lg={3} md={3} sm={3} xs={3}>
            <input type="radio" value={result}/>
            <label id={counter} className="drinkcard-cc colorA" onClick={this.handleColorChange}/>
          </Col>
        );
      });
      this.forceUpdate();
    });
  }

  handleColorChange(e) {
    console.log(e.target.id);
    const issueContainer = {
      device: this.state.deviceType,
      brand: this.state.selectedBrand,
      model: this.state.selectModelField,
      colour: this.state.colorPalleteData[e.target.id - 1]
    };
    axios.post('http://icore.repairmonk.com/website/issues/', issueContainer).then(response => {
      console.log(response);
      let counterIssue = 0;
      this.setState({
        issueControlToggleState: checkedState
      });
      issueChecks = response.data.map(result => {
        return (
          <Row key={counterIssue++}>
            <input type="checkbox" value={result} id={result} onClick={this.handleCheckIssue}/>
            <label>{result}</label>
          </Row>
        );
      });
      this.forceUpdate();
    });
  }

  handleCheckIssue(e) {
    console.log(e.target);
  }

  handleGETModelListAPI() {
    axios.defaults.headers.common.Authorization = '186aa02937e6971d46a5f7f131d409bfa4889e1d';
    axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post('http://icore.repairmonk.com/website/models/')
      .then(response => {
        console.log(response);
        this.modelListObject = keyIndex(response, 1);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDropdownForModelComponentClick() {
    if (this.state.modelControlToggleState === '') {
      this.setState({
        modelControlToggleState: modelControlToggleON
      });
    } else {
      this.setState({
        modelControlToggleState: modelControlToggleOFF
      });
    }
  }

  handleColorA() {
    console.log('Color A Checked!!');
    this.setState({
      checkStateA: checkedState,
      checkStateB: unCheckedState,
      checkStateC: unCheckedState,
      checkStateD: unCheckedState
    });
  }

  handleColorB() {
    console.log('Color B Checked!!');
    this.setState({
      checkStateA: unCheckedState,
      checkStateB: checkedState,
      checkStateC: unCheckedState,
      checkStateD: unCheckedState
    });
  }

  handleColorC() {
    console.log('Color C Checked!!');
    this.setState({
      checkStateA: unCheckedState,
      checkStateB: unCheckedState,
      checkStateC: checkedState,
      checkStateD: unCheckedState

    });
  }

  handleColorD() {
    console.log('Color D Checked!!');
    this.setState({
      checkStateA: unCheckedState,
      checkStateB: unCheckedState,
      checkStateC: unCheckedState,
      checkStateD: checkedState
    });
  }

  handleDropdownForColorComponentClick() {
    if (this.state.colorControlToggleState === '') {
      this.setState({
        colorControlToggleState: colorControlToggleON
      });
    } else {
      this.setState({
        colorControlToggleState: colorControlToggleOFF
      });
    }
  }

  handleSetDeviceSelection(e) {
    if (e.target.id === 'device-phone') {
      this.setState({
        deviceType: 'Mobile Phone',
        brandControlToggleState: brandControlToggleON
      });
      return;
    }
    return this.setState({
      deviceType: 'laptop',
      brandControlToggleState: brandControlToggleON
    });
  }

  handleBrandSelectionChange(e, index, val) {
    this.setState({
      selectBrandField: val,
      modelControlToggleState: modelControlToggleON,
      selectedBrand: val
    });
    const brandSelection = {
      brand: val,
      device: this.state.deviceType
    };
    axios.post('http://icore.repairmonk.com/website/issues/', brandSelection).then(response => {
      deviceModelResponse = response.data.map(result => {
        return (
          <MenuItem key={result._id} value={result} primaryText={result}/>
        );
      });
      this.forceUpdate();
    }).catch(error => {
      console.log(error);
    });
  }

  handleDropdownForIssueComponentClick() {
    if (this.state.issueControlToggleState === '') {
      this.setState({
        issueControlToggleState: checkedState
      });
    } else {
      this.setState({
        issueControlToggleState: unCheckedState
      });
    }
  }

  handleCheckA() {
    console.log('Check A Checked!!');
    if (this.state.checkStateA === '') {
      console.log('A unchecked is true');
      this.setState({
        checkStateA: checkedState
      });
      console.log('1 checkState: ' + this.state.checkStateA);
    } else {
      console.log('A unchecked is true');
      this.setState({
        checkStateA: unCheckedState
      });
      console.log('2 checkState: ' + this.state.checkStateA);
    }
  }

  handleCheckB() {
    console.log('Check B Checked!!');
    if (this.state.checkStateB === '') {
      this.setState({
        checkStateB: checkedState
      });
    } else {
      this.setState({
        checkStateB: unCheckedState
      });
    }
  }

  handleCheckC() {
    console.log('Check C Checked!!');
    if (this.state.checkStateC === '') {
      this.setState({
        checkStateC: checkedState
      });
    } else {
      this.setState({
        checkStateC: unCheckedState
      });
    }
  }

  handleCheckD() {
    console.log('Check D Checked!!');
    if (this.state.checkStateD === '') {
      this.setState({
        checkStateD: checkedState
      });
    } else {
      this.setState({
        checkStateD: unCheckedState
      });
    }
  }

  handleCheckE() {
    console.log('Check E Checked!!');
    if (this.state.checkStateE === '') {
      this.setState({
        checkStateE: checkedState
      });
    } else {
      this.setState({
        checkStateE: unCheckedState
      });
    }
  }

  handleCheckF() {
    console.log('Check F Checked!!');
    if (this.state.checkStateF === '') {
      this.setState({
        checkStateF: checkedState
      });
    } else {
      this.setState({
        checkStateF: unCheckedState
      });
    }
  }

  handleCheckG() {
    console.log('Check G Checked!!');
    if (this.state.checkStateG === '') {
      this.setState({
        checkStateG: checkedState
      });
    } else {
      this.setState({
        checkStateG: unCheckedState
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header/>
          <Container className="section landing-repair">
            <Row className="repair-row-location">
              <Col lg={4} md={4} sm={4}/>
              <Col lg={4} md={4} sm={4}>
                <div className="dropdown-for-component">
                  <div className="togglebox">
                    <div>
                      <input id="radio1" type="radio" name="toggle" checked={this.state.locationControlToggleState}/>
                      <label htmlFor="radio1" className="location-control" onClick={this.handleDropdownForLocationComponentClick}>Location</label>
                      <div className="content">
                        <Paper className="paper-container" style={{height: '22%', width: '90%', margin: '20px', textAlign: 'center', display: 'block'}} zDepth={2}>
                          <Container fluid className="section location-repair">
                            <Row className="location-repair-row">
                              <Col xs={10}>
                                <AutoComplete
                                  className="location-control-text-input-class"
                                  hintText="Insert your pincode.."
                                  dataSource={this.state.dataSource}
                                  onUpdateInput={this.handleLocationPincodeInputUpdate}
                                  />
                              </Col>
                              <Col xs={2}>
                                <span onClick={this.handlePincodeSearchCallAPI}>
                                  <SearchIcon color="#9b9b9b" style={styles.searchIconStyle}/>
                                </span>
                                <i className="fa fa-check avail" aria-hidden="true" style={styles.availableIconStyle}/>
                                <i className="fa fa-times unavail" aria-hidden="true" style={styles.unavailableIconStyle}/>
                              </Col>
                            </Row>
                          </Container>
                        </Paper>
                        <div className="location-message-section-div">
                          <span className="location-message-section" style={messageStyle}>{this.state.messageContent}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={4} md={4} sm={4}/>
            </Row>
            <Row className="repair-row-location">
              <Col lg={4} md={4} sm={4}/>
              <Col lg={4} md={4} sm={4}>
                <div className="dropdown-for-component">
                  <div className="togglebox">
                    <div>
                      <input id="radio1" type="radio" name="toggle" checked={this.state.deviceControlToggleState}/>
                      <label htmlFor="radio1" className="device-control" onClick={this.handleDropdownForDeviceComponentClick}>Device</label>
                      <div className="content">
                        <span className="device-message-section" style={messageStyle}>Choose a device</span>
                        <Container className="device-selection-section">
                          <Row>
                            <Col lg={6} md={6} sm={6} xs={6}>
                              <div style={{textAlign: 'center', width: '100%'}}>
                                <img id="device-phone" src={require("../imgs/phone.png")} style={{width: '40%'}} onClick={this.handleSetDeviceSelection}/>
                              </div>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={6}>
                              <div style={{textAlign: 'center', width: '100%'}}>
                                <img id="device-laptop" src={require("../imgs/laptop.png")} style={{width: '90%'}} onClick={this.handleSetDeviceSelection}/>
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={4} md={4} sm={4}/>
            </Row>
            <Row className="repair-row-location">
              <Col lg={4} md={4} sm={4}/>
              <Col lg={4} md={4} sm={4}>
                <div className="dropdown-for-component">
                  <div className="togglebox">
                    <div>
                      <input id="radio1" type="radio" name="toggle" checked={this.state.brandControlToggleState}/>
                      <label htmlFor="radio1" className="brand-control" onClick={this.handleDropdownForBrandComponentClick}>Brand</label>
                      <div className="content">
                        <SelectField
                          value={this.state.selectBrandField}
                          className="brand-select-field"
                          floatingLabelText="Select brand..."
                          onChange={this.handleBrandSelectionChange}
                          style={{width: '100%'}}
                          >
                          {this.brandListObject.map(object => {
                            return (
                              <MenuItem key={object._id} value={object.value} primaryText={object.value}/>
                            );
                          })}
                        </SelectField>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={4} md={4} sm={4}/>
            </Row>
            <Row className="repair-row-location">
              <Col lg={4} md={4} sm={4}/>
              <Col lg={4} md={4} sm={4}>
                <div className="dropdown-for-component">
                  <div className="togglebox">
                    <div>
                      <input id="radio1" type="radio" name="toggle" checked={this.state.modelControlToggleState}/>
                      <label htmlFor="radio1" className="model-control" onClick={this.handleDropdownForModelComponentClick}>Model</label>
                      <div className="content">
                        <SelectField
                          value={this.state.selectModelField}
                          className="model-select-field"
                          floatingLabelText="Select model..."
                          onChange={this.handleModelChange}
                          style={{width: '100%'}}
                          >
                          {deviceModelResponse}
                        </SelectField>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={4} md={4} sm={4}/>
            </Row>
            <Row className="repair-row-location">
              <Col lg={4} md={4} sm={4}/>
              <Col lg={4} md={4} sm={4}>
                <div className="dropdown-for-component">
                  <div className="togglebox">
                    <div>
                      <input id="radio1" type="radio" name="toggle" checked={this.state.colorControlToggleState}/>
                      <label htmlFor="radio1" className="color-control" onClick={this.handleDropdownForColorComponentClick}>Color</label>
                      <div className="content">
                        <div className="cc-selector">
                          <Container className="section color-dropdown">
                            <Row className="color-dropdown-row">
                              {colorPallete}
                            </Row>
                          </Container>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={4} md={4} sm={4}/>
            </Row>
            <Row className="repair-row-location">
              <Col lg={4} md={4} sm={4}/>
              <Col lg={4} md={4} sm={4}>
                <div className="dropdown-for-component">
                  <div className="togglebox">
                    <div>
                      <input id="radio1" type="radio" name="toggle" checked={this.state.issueControlToggleState}/>
                      <label htmlFor="radio1" className="issue-control" onClick={this.handleDropdownForIssueComponentClick}>Issue</label>
                      <div className="content" style={styles.issueContainer}>
                        <span className="issue-message-section" style={messageStyle}>Select more than one for full repair</span>
                        <Container className="issue-selection-section">
                          {issueChecks}
                        </Container>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={4} md={4} sm={4}/>
            </Row>
          </Container>
          <ToggleDisplay show={this.state.show}/>
          <Container className="section landing-repair-proceed">
            <Row className="repair-row-estimate-product">
              <Col lg={4}/>
              <Col lg={4} md={12} sm={12}>
                <RaisedButton className="proceed-button" label={this.state.raisedButtonText} backgroundColor="#3386f4" labelColor="#FFFFFF" fullWidth/>
              </Col>
              <Col lg={4}/>
            </Row>
          </Container>
          <Footer/>
        </div>
      </MuiThemeProvider>
    );
  }
}
