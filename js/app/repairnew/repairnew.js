import React, {Component} from 'react';
import {Container, Row, Col, Visible} from 'react-grid-system';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import DownIcon from 'material-ui/svg-icons/navigation/expand-more';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ErrorIcon from 'material-ui/svg-icons/content/clear';
import UpIcon from 'material-ui/svg-icons/navigation/expand-less';
import Accordion from 'react-responsive-accordion';
import axios from 'axios';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import keyIndex from 'react-key-index';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import FullscreenDialog from 'material-ui-fullscreen-dialog';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import CircularProgress from 'material-ui/CircularProgress';
const geolocator = require('geolocator');
let products = [];

import Cookies from 'universal-cookie';

const messageStyle = {
  backgroundColor: '#ffffff',
  color: '#000000',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block'
};

const axiosConfig = {
  withCredentials: true,
  Accept: 'application/json',
  'Content-Type': 'application/json'
};
const primaryColor = '#3386f4';
const hoverColor = '#3E8CF8';
const buttonHeight = '40px';
let deviceModelResponse = [];
let colorPallete = [];
let issueChecks = '';
let brandCounter = 0;
const finalColor = [];
const cookies = new Cookies();
let modelCounter = 0;
let counterIssue = 0;
const relatedIds = [];
const relatedProds = [];
const relatedPrices = [];

export class Repair extends Component {
  constructor(props) {
    super(props);
    this.state = {loader: null, colorPallete: [], relatedProducts: [], selectedIssues: [], checkedTest: true, triggersDisable: false, messageContent: '', searchIcon: (<SearchIcon color="#9b9b9b" style={{float: 'right', margin: '10px'}} onTouchTap={this.handleNextTab}/>), tabvalue: 'phone', searchArr: [], solutions: [], pinCode: '', selectBrandField: '', selectModelField: '', selectColorField: '', colorPalleteData: [], deviceType: '', brandContent: '', openSnack: false, repairMessage: '', openEnquire: false};
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleNextTab = this.handleNextTab.bind(this);
    this.handleSetDeviceSelection = this.handleSetDeviceSelection.bind(this);
    this.handleBrandSelectionChange = this.handleBrandSelectionChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleCheckIssue = this.handleCheckIssue.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);
    this.handleAddOrder = this.handleAddOrder.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
    this.handleEnquireMessage = this.handleEnquireMessage.bind(this);
    this.handleEnquireMenuClose = this.handleEnquireMenuClose.bind(this);
    this.brandListObject = [];
    geolocator.config({
      language: 'en',
      google: {
        version: '3',
        key: 'AIzaSyBT8geVW0_7SWA40w-ngiVhb_ODVaqlJiU'
      }
    });
  }

  handleEnquireMessage() {
    this.setState({
      openEnquire: true
    });
  }

  handleEnquireMenuClose() {
    this.setState({
      openEnquire: false
    });
  }

  handleSnackRequestClose() {
    this.setState({
      openSnack: false
    });
  }

  handleAddProduct(e) {
    if (relatedIds.indexOf(e.target.id) === -1) {
      relatedIds.push(e.target.id);
      relatedProds.push(e.target.parentElement.childNodes[0].innerText.split('₹')[0].trim());
      relatedPrices.push(e.target.parentElement.childNodes[0].childNodes[3].innerText.split('₹')[1].trim());
      cookies.set('related-prices', relatedPrices, {path: '/'});
      cookies.set('related-ids', relatedIds, {path: '/'});
      cookies.set('related-products', relatedProds, {path: '/'});
    }
    if (e.target.innerHTML === 'ADD') {
      e.target.innerHTML = 'REMOVE';
      e.target.parentElement.classList.add('active');
    } else {
      e.target.innerHTML = 'ADD';
      e.target.parentElement.classList.remove('active');
      if (relatedIds.indexOf(e.target.id) !== -1) {
        relatedIds.splice(relatedIds.indexOf(e.target.id), 1);
        relatedProds.splice(relatedProds.indexOf(e.target.parentElement.childNodes[0].innerText.split('₹')[0].trim()), 1);
        relatedPrices.splice(relatedPrices.indexOf(e.target.parentElement.childNodes[0].childNodes[3].innerText.split('₹')[1].trim()), 1);
        cookies.set('related-ids', relatedIds, {path: '/'});
        cookies.set('related-products', relatedProds, {path: '/'});
        cookies.set('related-prices', relatedPrices, {path: '/'});
      }
    }
  }

  handleAddOrder(e) {
    if (e.target.innerHTML === 'ADD TO ORDER') {
      e.target.innerHTML = 'REMOVE FROM ORDER';
      cookies.set('suggested-products', relatedIds, {path: '/'});
    } else {
      e.target.innerHTML = 'ADD TO ORDER';
      cookies.set('suggested-products', '', {path: '/'});
    }
  }

  componentDidMount() {
    this.setState({
      deviceType: cookies.get('device-type'),
      selectBrandField: cookies.get('device-brand'),
      selectModelField: cookies.get('device-model')
    });
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumWait: 10000,
      maximumAge: 0,
      desiredAccuracy: 200,
      fallbackToIP: true,
      addressLookup: true
    };
    let colors = [];
    axios.get('http://icore.repairmonk.com/website/models/', JSON.stringify(axiosConfig))
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          if (cookies.get('device-model') === response.data[i].name) {
            cookies.set('device-model-id', response.data[i].id, {path: '/'});
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
    axios.get('http://icore.repairmonk.com/website/colours/', JSON.stringify(axiosConfig)).then(response => {
      colors = response.data;
    }).catch(error => {
      console.log(error);
    });
    for (const col in colors) {
      if (col) {
      }
    }
    if (cookies.get('pincode')) {
      this.setState({
        pinCode: cookies.get('pincode')
      });
      const pincodeConfig = {
        pincode: cookies.get('pincode')
      };
      axios.post('http://icore.repairmonk.com/website/check_pincode/', pincodeConfig).then(response => {
          if (response.data.status) {
            if (cookies.get('device-type') && cookies.get('device-brand') && cookies.get('device-model')) {
              const colorSelectionCamp = {
                device: cookies.get('device-type'),
                brand: cookies.get('device-brand'),
                model: cookies.get('device-model')
              };
              let counter = 0;
              axios.post('http://icore.repairmonk.com/website/issues/', colorSelectionCamp).then(response => {
                this.setState({
                  colorPalleteData: response.data
                });
                for (let i = 0; i < response.data.length; i++) {
                  colorPallete[counter++] = (
                    (
                      <Col key={counter} lg={3} md={3} sm={3} xs={3}>
                        <input type="radio" value={response.data[i][0]}/>
                        <label id={counter} className="drinkcard-cc" style={{backgroundColor: response.data[i][1]}} onClick={this.handleColorChange}/>
                      </Col>
                    )
                  );
                }
                this.setState({
                  colorPallete
                });
                // this.forceUpdate();
                // document.getElementById('device-color').click();
                
                this.setState({
                  messageContent: '',
                  searchIcon: (<CheckIcon color="#41c0ad" style={{float: 'right', margin: '10px'}} onTouchTap={this.handleNextTab}/>),
                  triggersDisable: false,
                  openPosition: 2
                });
                const toDisable = document.querySelectorAll('.logo-text.repair-header, .filter-icon.accordion, .Collapsible');
                for (let k = 0; k < toDisable.length; k++) {
                  try {
                    toDisable[k].classList.remove('disabled');
                  } catch (err) {
                    console.log(err.message);
                  }
                }
                document.getElementById('device-color').click();
                return;
              });
            } else {
              this.setState({
                openPosition: 2
              });
              document.getElementById('device-accordion').click();
              this.setState({
                messageContent: '',
                searchIcon: (<CheckIcon color="#41c0ad" style={{float: 'right', margin: '10px'}} onTouchTap={this.handleNextTab}/>)
              });
            }
            this.setState({
              repairMessage: 'Pin code accepted',
              openSnack: true
            });
          }
        }).catch(error => {
          console.log(error);
        });
    } else {
      this.setState({
        searchIcon: (<CircularProgress size={24} style={{float: 'right', margin: '10px'}}/>)
      });
      geolocator.locate(options, (err, location) => {
        if (err) {
          return console.log(err);
        }
        this.setState({
          pinCode: location.address.postalCode
        });
        const pincodeConfig = {
          pincode: location.address.postalCode
        };
        axios.post('http://icore.repairmonk.com/website/check_pincode/', pincodeConfig).then(response => {
          if (response.data.status) {
            if (cookies.get('device-type') && cookies.get('device-brand') && cookies.get('device-model')) {
              const colorSelectionCamp = {
                device: cookies.get('device-type'),
                brand: cookies.get('device-brand'),
                model: cookies.get('device-model')
              };
              let counter = 0;
              axios.post('http://icore.repairmonk.com/website/issues/', colorSelectionCamp).then(response => {
                this.setState({
                  colorPalleteData: response.data
                });
                for (let i = 0; i < response.data.length; i++) {
                  colorPallete[counter++] = (
                    (
                      <Col key={counter} lg={3} md={3} sm={3} xs={3}>
                        <input type="radio" value={response.data[i][0]}/>
                        <label id={counter} className="drinkcard-cc" style={{backgroundColor: response.data[i][1]}} onClick={this.handleColorChange}/>
                      </Col>
                    )
                  );
                }
                this.setState({
                  colorPallete
                });
                this.forceUpdate();
                document.getElementById('device-color').click();
              });
            } else {
              this.setState({
                openPosition: 2
              });
              document.getElementById('device-accordion').click();
              this.setState({
                messageContent: '',
                searchIcon: (<CheckIcon color="#41c0ad" style={{float: 'right', margin: '10px'}} onTouchTap={this.handleNextTab}/>)
              });
            }
            this.setState({
              repairMessage: 'Pin code accepted',
              openSnack: true
            });
          }
          this.setState({
            messageContent: (
              <div>
                <p className="landing-repair-p repair-msg-p">
                  We do not serve this location yet.
                </p>
                <p className="landing-repair-p repair-msg-p">
                  Leave us a <a style={{cursor: 'pointer'}} onClick={this.handleEnquireMessage}>message</a> so we can find a partner to service you.
                </p>
              </div>),
            searchIcon: (<ErrorIcon color="#ed6a5e" style={{float: 'right', margin: '10px'}} onTouchTap={this.handleNextTab}/>),
            triggersDisable: true
          });
          const toDisable = document.querySelectorAll('.logo-text.repair-header, .filter-icon.accordion, .Collapsible');
          for (let k = 0; k < toDisable.length; k++) {
            try {
              toDisable[k].classList.add('disabled');
            } catch (err) {
              console.log(err.message);
            }
          }
        }).catch(error => {
          console.log(error);
        });
      });
    }
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

  handleBackClick() {
    window.history.back();
  }
  handleCheck(e, val) {
    console.log(e, val);
  }

  handleUpdateInput(e, val) {
    this.setState({
      pinCode: val,
      searchIcon: (<ErrorIcon color="#ed6a5e" style={{float: 'right', margin: '10px'}} onTouchTap={this.handleNextTab}/>)
    });
    if (val.length === 6) {
      this.setState({
        messageContent: (
          <div>
            <p className="landing-repair-p repair-msg-p">
              We do not serve this location yet.
            </p>
            <p className="landing-repair-p repair-msg-p">
              Leave us a <a style={{cursor: 'pointer'}} onClick={this.handleEnquireMessage}>message</a> so we can find a partner to service you.
            </p>
          </div>)
      });
      this.handleNextTab(val);
    }
  }

  handleSetDeviceSelection(e) {
    document.getElementById('device-brand').click();
    if (e.target.id === 'device-phone') {
      this.setState({
        deviceType: 'Mobile Phone',
        selectBrandField: '',
        selectModelField: '',
        selectColorField: ''
      });
      cookies.set('device-type', 'Mobile Phone', {path: '/'});
      document.getElementById('device-laptop').classList.add('disabled');
      document.getElementById('device-phone').classList.remove('disabled');
      return;
    }
    document.getElementById('device-phone').classList.add('disabled');
    document.getElementById('device-laptop').classList.remove('disabled');
    cookies.set('device-type', 'Laptop & Desktop', {path: '/'});
    this.setState({
      deviceType: 'Laptop & Desktop',
      selectBrandField: '',
      selectModelField: '',
      selectColorField: ''
    });
  }

  handleNextTab(pin) {
    console.log(pin);
    axios.post('http://icore.repairmonk.com/website/check_pincode/', {pincode: pin}).then(response => {
      if (response.data.status) {
        cookies.set('pincode', pin, {path: '/'});
        if (cookies.get('device-type') && cookies.get('device-brand') && cookies.get('device-model')) {
          const colorSelectionCamp = {
            device: cookies.get('device-type'),
            brand: cookies.get('device-brand'),
            model: cookies.get('device-model')
          };
          let counter = 0;
          axios.post('http://icore.repairmonk.com/website/issues/', colorSelectionCamp).then(response => {
            this.setState({
              selectModelField: cookies.get('device-model'),
              colorPalleteData: response.data
            });
            for (let i = 0; i < response.data.length; i++) {
              colorPallete[counter++] = (
                (
                  <Col key={counter} lg={3} md={3} sm={3} xs={3}>
                    <input type="radio" value={response.data[i][0]}/>
                    <label id={counter} className="drinkcard-cc" style={{backgroundColor: response.data[i][1]}} onClick={this.handleColorChange}/>
                  </Col>
                )
              );
            }
            document.getElementById('device-color').click();
            this.setState({
              colorPallete
            });
            this.forceUpdate();
          });
        }
        document.getElementById('device-accordion').click();
        this.setState({
          messageContent: '',
          searchIcon: (<CheckIcon color="#41c0ad" style={{float: 'right', margin: '10px'}} onTouchTap={this.handleNextTab}/>),
          triggersDisable: false,
          openPosition: 2
        });
        const toDisable = document.querySelectorAll('.logo-text.repair-header, .filter-icon.accordion, .Collapsible');
        for (let k = 0; k < toDisable.length; k++) {
          try {
            toDisable[k].classList.remove('disabled');
          } catch (err) {
            console.log(err.message);
          }
        }
        return;
      }
      this.setState({
        searchIcon: (<ErrorIcon color="#ed6a5e" style={{float: 'right', margin: '10px'}} onTouchTap={this.handleNextTab}/>),
        triggersDisable: true
      });
      const toDisable = document.querySelectorAll('.logo-text.repair-header, .filter-icon.accordion, .Collapsible');
      for (let k = 0; k < toDisable.length; k++) {
        try {
          toDisable[k].classList.add('disabled');
        } catch (err) {
          console.log(err.message);
        }
      }
    }).catch(error => {
      console.log(error);
    });
  }

  handleBrandSelectionChange(e, index, val) {
    this.setState({
      selectBrandField: val,
      selectModelField: '',
      selectColorField: ''
    });
    const brandSelection = {
      brand: val,
      device: this.state.deviceType
    };
    cookies.set('device-brand', val, {path: '/'});
    axios.post('http://icore.repairmonk.com/website/issues/', brandSelection).then(response => {
      if (response.data.error) {
        document.getElementById('device-model').click();
        this.setState({
          brandContent: (
            <p style={{color: '#000', textAlign: 'center', fontSize: '18px', fontFamily: 'Istok'}}>{response.data.error}</p>
          )
        });
        deviceModelResponse = (
          <MenuItem className="menu-item-repair"/>
        );
        this.forceUpdate();
        return;
      }
      this.setState({
        brandContent: ''
      });
      deviceModelResponse = response.data.map(result => {
        return (
          <MenuItem key={modelCounter++} value={result} primaryText={result} className="menu-item-repair"/>
        );
      });
      this.forceUpdate();
      document.getElementById('device-model').click();
    }).catch(error => {
      console.log(error);
    });
  }

  handleModelChange(e, indx, val) {
    this.setState({
      selectColorField: ''
    });
    const colorSelectionCamp = {
      device: this.state.deviceType,
      brand: this.state.selectBrandField,
      model: val
    };
    axios.get('http://icore.repairmonk.com/website/models/', JSON.stringify(axiosConfig))
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          if (val === response.data[i].name) {
            cookies.set('device-model-id', response.data[i].id, {path: '/'});
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
    cookies.set('device-model', val, {path: '/'});
    let counter = 0;
    axios.post('http://icore.repairmonk.com/website/issues/', colorSelectionCamp).then(response => {
      this.setState({
        selectModelField: val,
        colorPalleteData: response.data
      });
      for (let i = 0; i < response.data.length; i++) {
        colorPallete[counter++] = (
          (
            <Col key={counter} lg={3} md={3} sm={3} xs={3}>
              <input type="radio" value={response.data[i][0]}/>
              <label id={counter} className="drinkcard-cc" style={{backgroundColor: response.data[i][1]}} onClick={this.handleColorChange}/>
            </Col>
          )
        );
      }
      this.setState({
        colorPallete
      });
      this.forceUpdate();
      document.getElementById('device-color').click();
    });
  }

  handleColorChange(e) {
    const toDisable = document.querySelectorAll('.drinkcard-cc');
    for (let k = 0; k < toDisable.length; k++) {
      try {
        toDisable[k].classList.remove('active');
      } catch (err) {
        console.log(err.message);
      }
    }
    e.target.classList.add('active');
    const issueContainer = {
      device: this.state.deviceType,
      brand: this.state.selectBrandField,
      model: this.state.selectModelField,
      colour: this.state.colorPalleteData[e.target.id - 1][0]
    };
    this.setState({
      selectColorField: this.state.colorPalleteData[e.target.id - 1][0]
    });
    cookies.set('device-colour', this.state.colorPalleteData[e.target.id - 1][0], {path: '/'});
    axios.post('http://icore.repairmonk.com/website/issues/', issueContainer).then(response => {
      issueChecks = response.data.map(result => {
        return (
          <MenuItem
            key={counterIssue++}
            insetChildren
            checked={this.state.selectedIssues.indexOf(result) > -1}
            value={result}
            primaryText={result}
            />
        );
      });
      this.forceUpdate();
      document.getElementById('device-issues').click();
    });
  }

  handleCheckIssue(event, i, values) {
    this.setState({
      selectedIssues: values
    });
    cookies.set('device-issues', values, {path: '/'});
    axios.post('http://icore.repairmonk.com/website/suggestedproducts/', {device_id: cookies.get('device-model-id'), problems: values, location_code: 'KR'}, JSON.stringify(axiosConfig))
      .then(response => {
        products = [];
        for (let i = 0; i < response.data.suggested.length; i++) {
          products.push(
            <Col key={response.data.suggested[i].id} xs={12}>
              <div className="iservice-related-products">
                <p className="itracksuggested-products-left">{response.data.suggested[i].name}
                  <span style={{color: '#ed6a5e'}}>&nbsp;&nbsp; &#8377; {response.data.suggested[i].price}
                  </span>
                </p>
                <a id={response.data.suggested[i].id} className="itracksuggested-products-right" onClick={this.handleAddProduct}>
                  ADD
                </a>
              </div>
            </Col>
          );
        }
        this.setState({
          relatedProducts: products
        });
      })
      .catch(error => {
        console.log(error);
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

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Container className="section" style={{paddingBottom: '50px', paddingTop: '40px'}}>
            <Row>
              <Col xs={1} sm={2} md={3}>
                <br/>
                <div className="hide-on-mobile iservice-back-btn-container" onTouchTap={this.handleBackClick}>
                  <p style={{margin: '0px', padding: '0px'}}><ChevronLeft style={{color: '#c2c2c2', fontSize: '16px', textAlign: 'right'}}/></p>
                  <p style={{marginTop: '0px', textAlign: 'right', fontSize: '16px', padding: '0px'}} className="iservice-back-btn">BACK</p>
                </div>
              </Col>
              <Col xs={10} sm={8} md={6}>
                <Accordion easing="ease-in-out">
                  <div data-trigger={<div className="repair-acc-trig"><h2 className="logo-text repair-header">Location<span>{this.state.pinCode}</span></h2><DownIcon color="#3386f4" className="filter-icon accordion"/></div>} data-trigger-when-open={<div className="repair-acc-trig"><h2 className="logo-text repair-header">Location<span>{this.state.pinCode}</span></h2><UpIcon color="#3386f4" className="filter-icon accordion"/></div>}>
                    <Row className="landing-repair-field location">
                      <Col xs={10}>
                        <TextField
                          hintText="Enter pincode"
                          onChange={this.handleUpdateInput}
                          underlineShow={false}
                          fullWidth
                          maxLength="6"
                          autoFocus
                          value={this.state.pinCode}
                          />
                      </Col>
                      <Col xs={2}>
                        {this.state.searchIcon}
                      </Col>
                    </Row>
                    <Row id="repair-msg-row-1" className="repair-msg-row">
                      <Col sm={12}>
                        {this.state.messageContent}
                      </Col>
                    </Row>
                  </div>
                  <div data-trigger-disabled={this.state.triggersDisable} data-trigger={<div id="device-accordion" className="repair-acc-trig"><h2 className="logo-text repair-header">Device<span>{this.state.deviceType}</span></h2><DownIcon color="#3386f4" className="filter-icon accordion"/></div>} data-trigger-when-open={<div className="repair-acc-trig"><h2 className="logo-text repair-header">Device<span>{this.state.deviceType}</span></h2><UpIcon color="#3386f4" className="filter-icon accordion"/></div>}>
                    <Row>
                      <Col xs={2}>
                        <br/>
                      </Col>
                      <Col xs={3}>
                        <div style={{textAlign: 'center', width: '100%'}}>
                          <img className="device-sel-img" id="device-phone" src={require("../imgs/phone.png")} style={{width: '45px', cursor: 'pointer'}} onClick={this.handleSetDeviceSelection}/>
                        </div>
                      </Col>
                      <Col xs={5}>
                        <div style={{textAlign: 'center', width: '100%'}}>
                          <img className="device-sel-img" id="device-laptop" src={require("../imgs/laptop.png")} style={{width: '155px', cursor: 'pointer'}} onClick={this.handleSetDeviceSelection}/>
                        </div>
                      </Col>
                      <Col xs={2}>
                        <br/>
                      </Col>
                    </Row>
                  </div>
                  <div data-trigger-disabled={this.state.triggersDisable} data-trigger={<div id="device-brand" className="repair-acc-trig"><h2 className="logo-text repair-header">Brand<span>{this.state.selectBrandField}</span></h2><DownIcon color="#3386f4" className="filter-icon accordion"/></div>} data-trigger-when-open={<div className="repair-acc-trig"><h2 className="logo-text repair-header">Brand<span>{this.state.selectBrandField}</span></h2><UpIcon color="#3386f4" className="filter-icon accordion"/></div>}>
                    <div className="content">
                      <SelectField
                        value={this.state.selectBrandField}
                        className="brand-select-field"
                        hintText="Select brand..."
                        onChange={this.handleBrandSelectionChange}
                        >
                        {this.brandListObject.map(object => {
                          return (
                            <MenuItem key={brandCounter++} className="menu-item-repair" value={object.value} primaryText={object.value}/>
                          );
                        })}
                      </SelectField>
                    </div>
                  </div>
                  <div data-trigger-disabled={this.state.triggersDisable} data-trigger={<div id="device-model" className="repair-acc-trig"><h2 className="logo-text repair-header">Model<span>{this.state.selectModelField}</span></h2><DownIcon color="#3386f4" className="filter-icon accordion"/></div>} data-trigger-when-open={<div className="repair-acc-trig"><h2 className="logo-text repair-header">Model<span>{this.state.selectModelField}</span></h2><UpIcon color="#3386f4" className="filter-icon accordion"/></div>}>
                    <div className="content">
                      <SelectField
                        value={this.state.selectModelField}
                        className="model-select-field"
                        hintText="Select model..."
                        onChange={this.handleModelChange}
                        style={{width: '100%'}}
                        >
                        {deviceModelResponse}
                      </SelectField>
                      <Row className="repair-msg-row">
                        <Col sm={12} xs={12}>
                          {this.state.brandContent}
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div data-trigger-disabled={this.state.triggersDisable} data-trigger={<div id="device-color" className="repair-acc-trig"><h2 className="logo-text repair-header">Color<span>{this.state.selectColorField}</span></h2><DownIcon color="#3386f4" className="filter-icon accordion"/></div>} data-trigger-when-open={<div className="repair-acc-trig"><h2 className="logo-text repair-header">Color<span>{this.state.selectColorField}</span></h2><UpIcon color="#3386f4" className="filter-icon accordion"/></div>}>
                    <div>
                      <div className="content">
                        <div className="cc-selector">
                          <Container className="section color-dropdown">
                            <Row className="color-dropdown-row">
                              {this.state.colorPallete}
                            </Row>
                          </Container>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div data-trigger-disabled={this.state.triggersDisable} data-trigger={<div id="device-issues" className="repair-acc-trig"><h2 className="logo-text repair-header">Issues</h2><DownIcon color="#3386f4" className="filter-icon accordion"/></div>} data-trigger-when-open={<div className="repair-acc-trig"><h2 className="logo-text repair-header">Issues</h2><UpIcon color="#3386f4" className="filter-icon accordion"/></div>}>
                    <Container>
                      <Row>
                        <Col xs={12} sm={1}>
                          <br/>
                        </Col>
                        <Col xs={12} sm={10}>
                          <div className="issue-message-section" style={messageStyle}>Select more than one for full repair</div>
                          <div>
                            <SelectField
                              value={this.state.selectedIssues}
                              className="brand-select-field"
                              hintText="Select issues..."
                              onChange={this.handleCheckIssue}
                              multiple
                              autoWidth
                              >
                              {issueChecks}
                            </SelectField>
                          </div>
                          <Row style={{paddingTop: '20px', maxHeight: '200px', overflowY: 'scroll'}}>
                            {this.state.relatedProducts}
                          </Row>
                          <Row style={{paddingTop: '20px'}}>
                            <Col lg={12} md={12} sm={12} xs={12}>
                              <div style={{width: '100%', textAlign: 'center', display: 'none'}}>
                                <a className="iservice-add-order" onClick={this.handleAddOrder}>
                                  ADD TO ORDER
                                </a>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={12} sm={1}>
                          <br/>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </Accordion>
                <div style={{width: '100%', textAlign: 'center'}}>
                  <FlatButton id="desk-btn-dis" backgroundColor="#3386f4" hoverColor="#3386f4" label="PROCEED TO ESTIMATE" fullWidth style={{color: '#fff', margin: '20px auto'}} className="floating-btn-bot-row hide-on-mobile disabled btn-height"/>
                  <FlatButton id="desk-btn" href="/estimate" backgroundColor="#3386f4" hoverColor="#3386f4" label="PROCEED TO ESTIMATE" fullWidth style={{color: '#fff', margin: '20px auto'}} className="floating-btn-bot-row hide hide-on-mobile btn-height"/>
                </div>
              </Col>
              <Col xs={1} sm={2} md={3}>
                <br/>
              </Col>
            </Row>
            <Visible xs sm>
              <Container fluid className="header header-mobile">
                <Row id="floating-btn-bot" className="floating-btn-bot-row hide">
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <FlatButton href="/estimate" label="PROCEED TO ESTIMATE" fullWidth className="floating-btn-bot"/>
                  </Col>
                </Row>
                <Row id="floating-btn-bot-dis" className="floating-btn-bot-row">
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <FlatButton label="PROCEED TO ESTIMATE" fullWidth className="floating-btn-bot disabled"/>
                  </Col>
                </Row>
              </Container>
            </Visible>
          </Container>
          <Snackbar open={this.state.openSnack} message={this.state.repairMessage} autoHideDuration={4000} onRequestClose={this.handleSnackRequestClose}/>
          <FullscreenDialog
            open={this.state.openEnquire}
            title={'ENQUIRE'}
            actionButton={<IconButton key={1} tooltip="Close Menu" style={{width: '50px'}} onTouchTap={this.handleEnquireMenuClose}><CloseIcon color="#3386f4"/></IconButton>}
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
                  <IconButton tooltip="Close Menu" style={{width: '50px', margin: '10px', position: 'absolute', right: '0', zIndex: '1500'}} onTouchTap={this.handleMenuClose}>
                    <CloseIcon color="#3386f4" onClick={this.handleEnquireMenuClose}/>
                  </IconButton>
                </Col>
                <Col xs={12} style={{textAlign: 'center'}}>
                  <br/><br/>
                </Col>
              </Row>
              <Row className="header-row">
                <Col xs={12} style={{textAlign: 'center'}}>
                  <h1 className="logo-text" style={{display: 'inline-block', color: '#eb6b62', fontSize: '1.5em', fontWeight: '400'}}>
                    ENQUIRE
                  </h1>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col sm={4} xs={12}/>
                <Col sm={4} xs={12}>
                  <div className="signupDialogText">
                    <p className="signupTextContent" style={{textAlign: 'center'}}>ENQUIRE FOR BUSINESS PARTNERSHIPS OR VENDORSHIP FOR TECHNICAL ASSISTANCE WITH YOUR BUSINESS</p>
                  </div>
                </Col>
                <Col sm={4} xs={12}/>
              </Row>
              <Row>
                <Col sm={4} xs={12}/>
                <Col sm={4} xs={12}>
                  <div className="signupInputArea">
                    <TextField inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="First Name" hintStyle={{color: '#9b9b9b', zIndex: '9999', paddingLeft: '15px'}} onChange={this.handleFirstnameInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement}/>
                  </div>
                </Col>
                <Col sm={4} xs={12}/>
              </Row>
              <Row>
                <Col sm={4} xs={12}/>
                <Col sm={4} xs={12}>
                  <div className="signupInputArea">
                    <TextField inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Last Name" hintStyle={{color: '#9b9b9b', zIndex: '9999', paddingLeft: '15px'}} onChange={this.handleLastnameInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement}/>
                  </div>
                </Col>
                <Col sm={4} xs={12}/>
              </Row>
              <Row>
                <Col sm={4} xs={12}/>
                <Col sm={4} xs={12}>
                  <div className="signupInputArea">
                    <TextField inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Email" hintStyle={{color: '#9b9b9b', zIndex: '9999', paddingLeft: '15px'}} onChange={this.handleEmailUpdateInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement}/>
                  </div>
                </Col>
                <Col sm={4} xs={12}/>
              </Row>
              <Row>
                <Col sm={4} xs={12}/>
                <Col sm={4} xs={12}>
                  <div className="signupInputArea">
                    <TextField inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Mobile Number" hintStyle={{color: '#9b9b9b', zIndex: '999', paddingLeft: '15px'}} onChange={this.handleMobileUpdateInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement}/>
                  </div>
                </Col>
                <Col sm={4} xs={12}/>
              </Row>
              <Row>
                <Col sm={4} xs={12}/>
                <Col sm={4} xs={12}>
                  <div className="signupInputArea">
                    <TextField value={this.state.subject} inputStyle={{backgroundColor: '#f0f3f7', paddingLeft: '15px'}} className="signupintputText" hintText="Subject" hintStyle={{color: '#9b9b9b', zIndex: '999', paddingLeft: '15px'}} onChange={this.handleSubjectUpdateInput} underlineShow={false} fullWidth onFocus={this.handleCheckElement} onBlur={this.handleCheckBlurElement}/>
                  </div>
                </Col>
                <Col sm={4} xs={12}/>
              </Row>
              <Row>
                <Col sm={4} xs={12}/>
                <Col sm={4} xs={12}>
                  <div className="signupInputArea">
                    <TextField inputStyle={{backgroundColor: '#f0f3f7'}} className="signupintputText enquire-text-area" hintText="Write your enquiry here…" hintStyle={{color: '#9b9b9b', zIndex: '999', paddingLeft: '15px', paddingTop: '10px', top: '0', height: '0px'}} onChange={this.handlePasswordUpdateInput} underlineShow={false} fullWidth onFocus={this.handleTextAreaElement} onBlur={this.handleTextAreaBlurElement} multiLine rows={5}/>
                  </div>
                </Col>
                <Col sm={4} xs={12}/>
              </Row>
              <Row>
                <Col sm={4} xs={12}/>
                <Col sm={4} xs={12}>
                  <div>
                    <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label="ENQUIRE" fullWidth style={{color: '#fff', marginTop: '10px', minHeight: '55px', borderRadius: '5px'}} onTouchTap={this.handleSubmitBusinessEnquiry}/>
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
