import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Container, Row, Col, Visible} from 'react-grid-system';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Moment from 'react-moment';
import Snackbar from 'material-ui/Snackbar';
const primaryColor = '#3386f4';
const hoverColor = '#3E8CF8';
const cookies = new Cookies();

const Pusher = require('pusher-js');
const pusher = new Pusher('72840a2f872787efb795', {
    cluster: 'ap2',
    encrypted: true
  });
const channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
  alert(data.message);
});

// Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;
// const pusher = new Pusher({
//   appId: '348823',
//   key: 'fac9da29a8f5c6d18e3c',
//   secret: '72484729aeaebc82faf0',
//   cluster: 'ap2'
// });

// let channel = pusher.subscribe('private-' + cookies.get('current-job-id'));

// console.log(Pusher);
// let pushernew = new Pusher({
//   appId: '348823',
//   key: 'fac9da29a8f5c6d18e3c',
//   secret: '72484729aeaebc82faf0',
//   cluster: 'ap2'
// });
// console.log(pushernew);
const styles = {
  backgroundTexture: {
    backgroundColor: '#f9f9f9',
    minWidth: '100%',
    minHeight: '430px',
    paddingBottom: '50px'
  },
  backgroundTextureMarginBottom: {
    backgroundColor: '#f9f9f9',
    minWidth: '100%',
    padding: '30px'
  },
  backgroundTextureInvoice: {
    backgroundColor: '#f9f9f9',
    minWidth: '100%'
  },
  dateInitiate: {
    color: '#b2b2b2',
    marginLeft: '30px',
    paddingBottom: '0px',
    marginBottom: '0px',
    fontSize: '12px'
  },
  dateTracker: {
    color: '#b2b2b2',
    paddingLeft: '0px',
    paddingRight: '0px',
    marginLeft: '70px',
    minWidth: '50px',
    textAlign: 'right',
    paddingTop: '15px'
  },
  estDateTracker: {
    color: '#b2b2b2',
    paddingLeft: '0px',
    paddingRight: '0px',
    marginLeft: '70px',
    minWidth: '50px',
    textAlign: 'left',
    paddingTop: '15px'
  },
  orderCompleteCircle: {
    borderRadius: '50%',
    border: '2px solid #b2b2b2',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  orderCompleteBlueCircle: {
    borderRadius: '50%',
    border: '2px solid rgb(51, 134, 244)',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  orderCompleteStand: {
    minHeight: '40px',
    width: '1px',
    border: '1px solid #e2e1e2',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px'
  },
  orderMidway: {
    maxHeight: '40px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    marginTop: '-3px'
  },
  orderPostReadyStand: {
    minHeight: '31px',
    width: '1px',
    border: '1px solid #e2e1e2',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '0px',
    marginBottom: '10px'
  },
  orderMidwayCircle: {
    borderRadius: '50%',
    border: '2px solid #41c0ad',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  orderMidwayFadeCircle: {
    borderRadius: '50%',
    border: '2px solid #9b9b9b',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  paddingBottom60: {
    paddingBottom: '60px'
  },
  orderStatus: {
    color: '#000000',
    marginLeft: '-40px',
    marginTop: '30px'
  },
  orderRepairStand: {
    minHeight: '90px',
    width: '1px',
    border: '1px solid #e2e1e2',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
    marginBottom: '10px'
  },
  orderTopRepairStand: {
    minHeight: '90px',
    width: '1px',
    border: '1px solid #e2e1e2',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '-40px',
    marginBottom: '10px'
  },
  orderRepairCircle: {
    borderRadius: '50%',
    border: '2px solid #3386f4',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  paddingNil: {
    padding: '0px'
  },
  statusOrderTimeUpdate: {
    color: '#212121',
    textAlign: 'right',
    paddingLeft: '0px',
    paddingRight: '0px',
    marginLeft: '70px',
    minWidth: '50px',
    marginTop: '0px'
  },
  deviceRepairText: {
    color: '#b2b2b2',
    paddingLeft: '0px',
    paddingRight: '0px',
    marginLeft: '70px',
    minWidth: '50px',
    textAlign: 'right',
    paddingTop: '55px'
  },
  deviceRepairTime: {
    color: '#212121',
    textAlign: 'right',
    paddingLeft: '0px',
    paddingRight: '0px',
    marginLeft: '70px',
    minWidth: '50px',
    marginTop: '0px'
  },
  orderTrackerInitiated: {
    marginTop: '-15px',
    color: '#b2b2b2',
    paddingLeft: '0px',
    paddingRight: '0px',
    marginLeft: '70px',
    minWidth: '50px',
    textAlign: 'right'
  },
  orderTrackerTimeInitiated: {
    color: '#212121',
    textAlign: 'right',
    paddingLeft: '0px',
    paddingRight: '0px',
    marginLeft: '70px',
    minWidth: '50px',
    marginTop: '0px'
  },
  orderStatusRepairDevice: {
    marginLeft: '-40px',
    marginTop: '102px',
    color: '#000000'
  },
  orderStatusProcessed: {
    marginLeft: '-40px',
    marginTop: '15px',
    color: '#000000'
  },
  orderStatusDelivery: {
    color: '#000000',
    marginLeft: '-40px',
    marginTop: '60px'
  },
  productAmount: {
    color: '#ed6a5e'
  },
  download: {
    color: '#FFFFFF !important'
  },
  marginBottom20: {
    marginBottom: '20px',
    color: '#fff',
    maxWidth: '85px !important',
  },
  payAmount: {
    marginLeft: '-20px',
    color: '#fff'
  }
};
let device = null;
let issues = [];
let downloadBtn = null;
let greyReadyDelivery = null;
let cancelBtn = null;
let estimateCost = null;
let paidAmount = null;
let jobNumber = null;
let finishDate = null;
let created = null;
let readyDelivery = null;
let repair = null;
let pendingAmount = null;
let receivedCourierText = null;
let receivedCourierTime = null;
let pendingAmountBtn = null;
let orderRepairedTop = null;
let orderReadyForDeliveryCirlce = null;
let orderReadyForDeliveryText = null;
let orderInProgress = null;
let estimatedDelivery = null;
let deliveredTime = null;
let WaitingForApprovalCircle = null;
let orderCompleteBlueCircle = null;
let repairTime = null;
let repairDate = null;
let readyDeliveryDate = null;
let readyDeliveryTime = null;
let estimatedDeliveryTime = null;

export class Tracker extends Component {
  constructor() {
    super();
    this.state = {cancelJob: false, currentComment: ''}
    this.handleClickInvoice = this.handleClickInvoice.bind(this);
    this.handleCancelJob = this.handleCancelJob.bind(this);
    this.handleTextAreaBlurElement = this.handleTextAreaBlurElement.bind(this);
    this.handleTextAreaElement = this.handleTextAreaElement.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
  }

  handleAddComment() {
    console.log(this.state.currentComment);
    channel.trigger('client-my-event', { message: "hello world" });
  }

  handleSnackRequestClose() {
    this.setState({
      cancelJob: true
    });
  }

  handleKeyPress(e, val) {
    // if (e.charCode === 13) {
    //   // channel.bind('private-event', function(data) {
    //   //   console.log(data.message);
    //   // });
    // } else {

    // }
    this.setState({
      currentComment: val
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
  }

  handleClickInvoice(e) {
    e.preventDefault();
    axios.post('http://icore.repairmonk.com/website/getinvoice/', {id: cookies.get('current-job-id')}).then(result => {
      if (result.data) {
        axios.get(result.data.url).then(resp => {
        }).catch(error => {
          console.log(error);
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  handleCancelJob(e) {
    e.preventDefault();
    axios.post('http://icore.repairmonk.com/website/canceljob/', {job_id: cookies.get('current-job-id')}).then(result => {
      if (result.data.status === 'Successful') {
        window.location = '/profile';
      } else {
        this.setState({
          cancelJob: true
        });
      }
    });
  }

  handleTextAreaElement(e) {
    e.preventDefault();
    e.target.parentElement.style.border = '1px solid #3386f4';
  }

  handleTextAreaBlurElement(e) {
    e.preventDefault();
    e.target.parentElement.parentElement.style.border = '1px solid #d6edff';
    e.target.parentElement.style.border = '1px solid #d6edff';
  }

  handleEnterPress(e) {
    if (e.keyCode === 13) {
      console.log(e.keyCode);
    }
  }

  componentDidMount() {
    if (cookies.get('userId') === undefined || cookies.get('userId') === null || cookies.get('userId') === '') {
      window.location = '/';
      return;
    }

    if (cookies.get('current-job-id') === undefined || cookies.get('current-job-id') === null || cookies.get('current-job-id') === '') {
      window.location = '/';
      return;
    }
    axios.post('http://icore.repairmonk.com/website/jobdetails/', {jobId: cookies.get('current-job-id')}).then(response => {
      estimateCost = response.data.estimated_amount;
      paidAmount = response.data.paid_amount;
      jobNumber = response.data.jobId;
      finishDate = response.data.time.delivered;
      estimatedDelivery = response.data.estimated_delivery;
      readyDelivery = response.data.time.ready;
      created = response.data.time.created;
      repair = response.data.time.repair;
      pendingAmount = response.data.pending_amount;
      deliveredTime = response.data.time.delivered;
      device = response.data.device;
      cookies.set('amountPayable', pendingAmount, {path: '/'});
      let damageCounter = 0;

      issues = response.data.problems.map(result => {
        return (
          <Row key={damageCounter++}>
            <Col sm={4} xs={12}/>
            <Col sm={4} xs={12}>
              <p className="tracker-damages">
                {result}
              </p>
            </Col>
            <Col sm={4} xs={12}/>
          </Row>
        );
      });

      orderCompleteBlueCircle = (
        <div style={styles.orderCompleteCircle}/>
      );

      orderReadyForDeliveryText = (
        <p style={{color: 'rgb(178, 178, 178)', marginLeft: '-40px', marginTop: '60px'}}>Ready for delivery</p>
      );

      orderRepairedTop = (
        <div className="orderRepairedTopStand" style={styles.orderTopRepairStand}/>
      );

      greyReadyDelivery = (
        <div style={styles.orderPostReadyStand}/>
      );

      receivedCourierText = (
        <p style={{color: 'rgb(178, 178, 178)', marginLeft: '-40px', marginTop: '30px'}}>Received by courier</p>
      );

      orderReadyForDeliveryCirlce = (
        <div style={styles.orderMidwayFadeCircle}/>
      );

      orderInProgress = (
        <p style={{marginLeft: '-40px', marginTop: '102px', color: 'rgb(178, 178, 178)'}}>Device is being repaired</p>
      );

      receivedCourierTime = (
        <p style={styles.dateTracker}>Est. <Moment format="hh:mm A">{deliveredTime}</Moment></p>
      );

      WaitingForApprovalCircle = (
        <div style={styles.orderMidwayFadeCircle}/>
      );

      repairDate = (
        <p style={styles.deviceRepairText}><Moment format="DD/MM/YYYY">{repair}</Moment></p>
      );

      repairTime = (
        <p style={styles.deviceRepairTime}><Moment format="hh:mm A">{repair}</Moment></p>
      );

      readyDeliveryDate = (
        <p style={styles.dateTracker}><Moment format="DD/MM/YYYY">{readyDelivery}</Moment></p>
      );

      readyDeliveryTime = (
        <p style={styles.statusOrderTimeUpdate}><Moment format="hh:mm A">{readyDelivery}</Moment></p>
      );

      estimatedDeliveryTime = (
        <p style={styles.estDateTracker}>Est. <Moment format="DD/MM/YYYY">{estimatedDelivery}</Moment></p>
      );

      if (deliveredTime === null) {
        receivedCourierTime = (
          <p style={styles.dateTracker}/>
        );
      }

      if (estimatedDelivery === null) {
        estimatedDeliveryTime = (
          <p style={styles.estDateTracker}>Est. Delivery time awaiting</p>
        );
      }

      if (repair === null) {
        repairDate = (
          <p style={styles.deviceRepairText}/>
        );

        repairTime = (
          <p style={styles.deviceRepairTime}/>
        );
      }

      if (readyDelivery === null) {
        readyDeliveryDate = (
          <p style={styles.dateTracker}/>
        );

        readyDeliveryTime = (
          <p style={styles.statusOrderTimeUpdate}/>
        );
      }

      if (response.data.status === 'In Progress') {
        orderInProgress = (
          <p style={{marginLeft: '-40px', marginTop: '102px', color: 'rgb(178, 178, 178)'}}>Device is being repaired</p>
        );

        greyReadyDelivery = (
          <div style={{minHeight: '31px', width: '1px', border: '1px solid #e2e1e2', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: '-2px', marginBottom: '10px'}}/>
        );

        orderRepairedTop = (
          <div className="orderRepairedTopStand" style={{minHeight: '90px', width: '1px', border: '1px solid #e2e1e2', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: '-10px', marginBottom: '10px'}}/>
        );

        cancelBtn = (
          <Row style={{paddingBottom: '20px'}}>
            <Col sm={4} xs={6}><br/></Col>
            <Col sm={4} xs={6}>
              <Col sm={6} xs={12}/>
              <Col sm={6} xs={12} className="cancelJobBtn">
                <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label="CANCEL" fullWidth style={styles.marginBottom20} onClick={this.handleCancelJob}/>
              </Col>
            </Col>
            <Col sm={4} xs={6}><br/></Col>
          </Row>
        );
      }

      if (response.data.status === 'Waiting For Approval') {
        WaitingForApprovalCircle = (
          <div style={styles.orderRepairCircle}/>
        );

        orderRepairedTop = (
          <div style={{minHeight: '90px', width: '1px', border: '1px solid #e2e1e2', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: '0px', marginBottom: '10px'}}/>
        );
      }

      if (response.data.status === 'Ready For Delivery') {
        if (response.data.pending_amount !== 0 && response.data.pending_amount < 0) {
          pendingAmountBtn = (
            <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label={'₹' + parseInt(pendingAmount, 10)} fullWidth style={styles.payAmount}/>
          );
        }

        orderReadyForDeliveryCirlce = (
          <div style={styles.orderMidwayCircle}/>
        );

        WaitingForApprovalCircle = (
          <div style={styles.orderRepairCircle}/>
        );

        orderReadyForDeliveryText = (
          <p style={styles.orderStatusDelivery}>Ready for delivery</p>
        );

        orderInProgress = (
          <p style={styles.orderStatusRepairDevice}>Device is being repaired</p>
        );

        orderRepairedTop = (
          <div style={{minHeight: '90px', width: '1px', border: '1px solid #e2e1e2', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: '0px', marginBottom: '10px'}}/>
        );
      }

      if (response.data.status === 'Delivered') {
        downloadBtn = (
          <Container style={styles.backgroundTextureInvoice}>
            <Row>
              <Col sm={4} xs={12}><br/></Col>
              <Col sm={4} xs={12}>
                <div>
                  <FlatButton backgroundColor={primaryColor} hoverColor={hoverColor} label="DOWNLOAD INVOICE" style={{color: '#fff'}} className="download-invoice" onClick={this.handleClickInvoice}/>
                </div>
              </Col>
              <Col sm={4} xs={12}><br/></Col>
            </Row>
          </Container>
        );

        greyReadyDelivery = (
          <img style={styles.orderMidway} src={require("../imgs/tracking-arrow.png")}/>
        );

        receivedCourierText = (
          <p style={styles.orderStatus}>Received by courier</p>
        );

        orderRepairedTop = (
          <div style={{minHeight: '90px', width: '1px', border: '1px solid #e2e1e2', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: '0px', marginBottom: '10px'}}/>
        );

        orderReadyForDeliveryCirlce = (
          <div style={styles.orderMidwayCircle}/>
        );

        orderReadyForDeliveryText = (
          <p style={styles.orderStatusDelivery}>Ready for delivery</p>
        );

        WaitingForApprovalCircle = (
          <div style={styles.orderRepairCircle}/>
        );

        orderInProgress = (
          <p style={styles.orderStatusRepairDevice}>Device is being repaired</p>
        );

        orderCompleteBlueCircle = (
          <div style={styles.orderCompleteBlueCircle}/>
        );
      }
      this.forceUpdate();
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <section>
          <Container fluid style={styles.backgroundTexture} style={{padding: '30px', backgroundColor: '#f9f9f9', paddingTop: '0px'}}>
            <Row>
              <Col sm={4} xs={12}/>
              <Col sm={4} xs={12}>
                <p className="tracker-heading">
                  DEVICE
                </p>
                <p className="tracker-device-name">{device}</p>
              </Col>
              <Col sm={4} xs={12}/>
            </Row>
            <Row>
              <Col sm={4} xs={12}/>
              <Col sm={4} xs={12}>
                <p className="tracker-heading">
                  ISSUES
                </p>
              </Col>
              <Col sm={4} xs={12}/>
            </Row>
            {issues}
            <Row>
              <Col sm={4} xs={12}/>
              <Col sm={4} xs={12}>
                <Row>
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <p className="tracker-heading">
                      ESTIMATE COST
                    </p>
                    <p className="tracker-damages">
                      <strong>&#8377; {estimateCost}
                      </strong>
                    </p>
                  </Col>
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <p className="tracker-heading">
                      PAID AMOUNT
                    </p>
                    <p className="tracker-damages">
                      <strong>&#8377; {paidAmount}
                      </strong>
                    </p>
                  </Col>
                </Row>
                <Row className="marginTop20">
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <p className="tracker-heading">
                      FINISH DATE
                    </p>
                    <p className="tracker-damages">
                      <strong><Moment format="DD MMM">{finishDate}</Moment>
                      </strong>
                    </p>
                  </Col>
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <p className="tracker-heading">
                      JOB NUMBER
                    </p>
                    <p className="tracker-damages">
                      <strong>{jobNumber}
                      </strong>
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col sm={4} xs={12}/>
            </Row>
          </Container>
          {downloadBtn}
          <div>
            <Row>
              <Col sm={4} xs={12}/>
              <Col sm={4} xs={12}>
                {estimatedDeliveryTime}
              </Col>
              <Col sm={4} xs={12}/>
            </Row>
            <Row>
              <Col sm={4} xs={12}/>
              <Col sm={4} xs={12}>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4} style={styles.paddingNil}>
                    {receivedCourierTime}
                  </Col>
                  <Col lg={4} md={4} sm={4} xs={4} style={styles.paddingNil}>
                    {orderCompleteBlueCircle}
                    <div style={styles.orderCompleteStand}/>
                  </Col>
                  <Col lg={4} md={4} sm={4} xs={4} style={styles.paddingNil}>
                    {receivedCourierText}
                  </Col>
                </Row>
              </Col>
              <Col sm={4} xs={12}/>
            </Row>
            <Row>
              <Col sm={4} xs={12}/>
              <Col sm={4} xs={12}>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4} style={styles.paddingNil}>
                    {readyDeliveryDate}
                    {readyDeliveryTime}
                  </Col>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    <div className="width100">
                      {greyReadyDelivery}
                    </div>
                    {orderReadyForDeliveryCirlce}
                  </Col>
                  <Col lg={4} md={4} sm={4} xs={4} style={styles.paddingNil}>
                    {orderReadyForDeliveryText}
                    {pendingAmountBtn}
                  </Col>
                </Row>
              </Col>
              <Col sm={4} xs={12}/>
            </Row>
            <Row>
              <Col sm={4} xs={12}/>
              <Col sm={4} xs={12}>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4} style={styles.paddingNil}>
                    {repairDate}
                    {repairTime}
                  </Col>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    {orderRepairedTop}
                    {WaitingForApprovalCircle}
                    <div style={styles.orderRepairStand}/>
                  </Col>
                  <Col lg={4} md={4} sm={4} xs={4} style={styles.paddingNil}>
                    {orderInProgress}
                  </Col>
                </Row>
              </Col>
              <Col sm={4} xs={12}/>
            </Row>
            <Row>
              <Col sm={4} xs={12}/>
              <Col sm={4} xs={12}>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4} style={styles.paddingNil}>
                    <p style={styles.orderTrackerInitiated}><Moment format="DD/MM/YYYY">{created}</Moment>
                    </p>
                    <p style={styles.orderTrackerTimeInitiated}><Moment format="hh:mm A">{created}</Moment>
                    </p>
                  </Col>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    <div style={styles.orderRepairCircle}/>
                  </Col>
                  <Col lg={4} md={4} sm={4} xs={4} style={styles.paddingNil}>
                    <p style={styles.orderStatusProcessed}>Order is being processed
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col sm={4} xs={12}/>
            </Row>
            {cancelBtn}
            <div>
              <div style={styles.backgroundTextureMarginBottom}>
                <Container>
                  <Row className="displayNone">
                    <Col sm={3} xs={12}>
                      <br/>
                    </Col>
                    <Col sm={6} xs={12}>
                      <p className="tracker-heading">
                        SUGGESTED PRODUCTS
                      </p>
                    </Col>
                    <Col sm={3} xs={12}>
                      <br/>
                    </Col>
                  </Row>
                  <Row className="displayNone">
                    <Col sm={3} xs={12}>
                      <br/>
                    </Col>
                    <Col sm={6} xs={12}>
                      <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <div className="iservice-related-products">
                            <p className="itracksuggested-products-left">Screen Guard
                              <span style={styles.productAmount}>&nbsp;&nbsp; &#8377; 5,000
                              </span>
                            </p>
                            <p className="itracksuggested-products-right">ADD
                            </p>
                          </div>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <div className="iservice-related-products">
                            <p className="itracksuggested-products-left">Screen Guard
                              <span style={styles.productAmount}>&nbsp;&nbsp; &#8377; 5,000
                              </span>
                            </p>
                            <p className="itracksuggested-products-right">REMOVE
                            </p>
                          </div>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <div className="iservice-related-products">
                            <p className="itracksuggested-products-left">Screen Guard
                              <span style={styles.productAmount}>&nbsp;&nbsp; &#8377; 5,000
                              </span>
                            </p>
                            <p className="itracksuggested-products-right">ADD
                            </p>
                          </div>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <p className="iservice-add-order">ADD TO ORDER
                          </p>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <p className="iservice-add-order-txt">ADD ORDER INSTRUCTIONS
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={3} xs={12}>
                      <br/>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={3} xs={12}/>
                    <Col sm={6} xs={12}>
                      <p className="add-order">ADD ORDER INSTRUCTIONS</p>
                    </Col>
                    <Col sm={3} xs={12}/>
                  </Row>
                  <Row>
                    <Col sm={3} xs={12}>
                      <br/>
                    </Col>
                    <Col sm={6} xs={12}>
                      <TextField value={this.state.currentComment} id="comments-field" multiLine fullWidth rows={5} rowsMax={5} className="trackerOrder" onFocus={this.handleTextAreaElement} onBlur={this.handleTextAreaBlurElement} onChange={this.handleKeyPress}/>
                    </Col>
                    <Col sm={3} xs={12}>
                      <br/>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={3} xs={12}>
                      <br/>
                    </Col>
                    <Col sm={6} xs={12}>
                      <div className="iservice-chat-history">
                        <div className="iservice-customer-section">
                          <img src={require("../imgs/iTechie.png")} className="customer"/>
                          <p className="iservice-chat">
                            Please convert my order into a pick up instead of a drop
                          </p>
                        </div>
                        <div className="iservice-customer-section iservice-techie">
                          <p className="iservice-techie-chat">
                            Sure! not a problem.
                          </p>
                          <img src={require("../imgs/iTechie.png")} className="customer"/>
                        </div>
                        <div className="iservice-customer-section">
                          <img src={require("../imgs/iTechie.png")} className="customer"/>
                          <p className="iservice-chat">
                            Please convert my order into a pick up instead of a drop
                          </p>
                        </div>
                      </div>
                      <div style={{width: '100%', textAlign: 'center'}}>
                        <FlatButton id="desk-btn-dis" backgroundColor="#3386f4" hoverColor="#3386f4" label="COMMENT" fullWidth style={{color: '#fff', margin: '20px auto', height: '50px'}} className="floating-btn-bot-row hide-on-mobile disabled"/>
                        <FlatButton id="desk-btn" onClick={this.handleAddComment} backgroundColor="#3386f4" hoverColor="#3386f4" label="COMMENT" fullWidth style={{color: '#fff', margin: '20px auto', height: '50px'}} className="floating-btn-bot-row hide hide-on-mobile"/>
                      </div>
                    </Col>
                    <Col sm={3} xs={12}>
                      <br/>
                    </Col>
                  </Row>
                </Container>
              </div>
              <Visible xs sm>
                <Container fluid className="header header-mobile">
                  <Row id="floating-btn-bot" className="floating-btn-bot-row hide">
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <FlatButton onClick={this.handleAddComment} label="COMMENT" fullWidth className="floating-btn-bot"/>
                    </Col>
                  </Row>
                  <Row id="floating-btn-bot-dis" className="floating-btn-bot-row">
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <FlatButton label="COMMENT" fullWidth className="floating-btn-bot disabled"/>
                    </Col>
                  </Row>
                </Container>
              </Visible>
            </div>
          </div>
          <Snackbar open={this.state.cancelJob} message="Could not cancel the job. Please try later." autoHideDuration={2000} onRequestClose={this.handleSnackRequestClose}/>
        </section>
      </MuiThemeProvider>
    );
  }
}
