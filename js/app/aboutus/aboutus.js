import React, {Component} from 'react';
import {Container, Row, Col} from 'react-grid-system';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';

const fb = require("../imgs/Facebook_Color hover.png");
const insta = require("../imgs/Instagram_Color hover.png");
const twitter = require("../imgs/Twitter_Color hover.png");
const youtube = require("../imgs/Youtube_Color hover.png");

export class Aboutus extends Component {
  constructor() {
    super();
    axios.defaults.headers.common.Authorization = 'Basic b250aGVkb3Q6dGVzdEAxMjM=';
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver(e) {
    e.target.src = e.target.src.replace("normal", "hover");
  }

  handleMouseOut(e) {
    e.target.src = e.target.src.replace("hover", "normal");
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Container className="aboutus-section-1">
            <Row>
              <Col sm={4} xs={12}/>
              <Col sm={4} xs={12}>
                <div className="aboutus-container">
                  <h1 className="aboutus-container-h1"><span className="aboutus-wefix-everything">We fix everything,</span><br/> at your convenience</h1>
                  <p className="aboutus-wefix-content">Schedule a pickup, walk in to the nearest store or call your personal iTechie to where you are.</p>
                  <div className="aboutus-icons" style={{maxWidth: '100%'}}>
                    <img className="aboutus-icon-image" src={require("../imgs/abouthero.png")}/>
                  </div>
                </div>
              </Col>
              <Col sm={4} xs={12}/>
            </Row>
          </Container>
          <Container className="aboutus-section-2">
            <Row>
              <Col sm={4} xs={12}/>
              <Col sm={4} xs={12}>
                <div className="aboutus-container">
                  <Row>
                    <Col sm={12} xs={12}>
                      <div className="aboutus-story-container">
                        <h1>The iService <span className="aboutus-story">story</span></h1>
                      </div>
                    </Col>
                  </Row>
                  <Row className="paddingBottom20">
                    <Col sm={6} xs={6}>
                      <div className="aboutus-timeline">
                        <h1 className="aboutus-time">2013</h1>
                        <p className="aboutus-timeline-text">Founded by Ankit, a techie at heart, an engineer by education and an entrepreneur by profession.</p>
                      </div>
                    </Col>
                    <Col sm={6} xs={6}>
                      <div className="aboutus-image-container">
                        <img style={{marginTop: '10px'}} className="aboutus-image" src={require("../imgs/story1.png")}/>
                      </div>
                    </Col>
                  </Row>
                  <Row className="paddingBottom20">
                    <Col sm={6} xs={6}>
                      <div className="aboutus-timeline">
                        <h1 className="aboutus-time">2014</h1>
                        <p className="aboutus-timeline-text">We are the goto brand for repairs and services of Apple Products in Bangalore and have presence in 2 locations.</p>
                      </div>
                    </Col>
                    <Col sm={6} xs={6}>
                      <div className="aboutus-image-container">
                        <img className="aboutus-image aboutus-2014-img" src={require("../imgs/story_2.png")}/>
                      </div>
                    </Col>
                  </Row>
                  <Row className="paddingBottom20">
                    <Col sm={6} xs={6}>
                      <div className="aboutus-timeline">
                        <h1 className="aboutus-time">2015</h1>
                        <p className="aboutus-timeline-text">The team found a co-founder and head of Tech. Another store was opened up.</p>
                      </div>
                    </Col>
                    <Col sm={6} xs={6}>
                      <div className="aboutus-image-container">
                        <img className="aboutus-image aboutus-2015-img" src={require("../imgs/story_3.png")}/>
                      </div>
                    </Col>
                  </Row>
                  <Row className="paddingBottom20">
                    <Col sm={6} xs={6}>
                      <div className="aboutus-timeline">
                        <h1 className="aboutus-time">2016</h1>
                        <p className="aboutus-timeline-text">Spread out to Android devices and the heavy demand Delhi market</p>
                      </div>
                    </Col>
                    <Col sm={6} xs={6}>
                      <div className="aboutus-image-container">
                        <img className="aboutus-image aboutus-2016-img" src={require("../imgs/story_4.png")}/>
                      </div>
                    </Col>
                  </Row>
                  <Row className="paddingBottom20">
                    <Col sm={6} xs={6}>
                      <div className="aboutus-timeline">
                        <h1 className="aboutus-time">2017</h1>
                        <p className="aboutus-timeline-text">Prominent investors Blume Ventures decide to solve the problems of great after sales service at scale with us.</p>
                      </div>
                    </Col>
                    <Col sm={6} xs={6}>
                      <div className="aboutus-image-container">
                        <img className="aboutus-image aboutus-2017-img" src={require("../imgs/story_5.png")}/>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col sm={4} xs={12}/>
            </Row>
          </Container>
          <Container className="aboutus-section-3">
            <Row>
              <Col sm={12} xs={12} style={{'padding': '0px'}}>
                <img src={require('../imgs/aboutuscurvedesktop.png')} style={{marginTop: '-80px', height: '160px', width: '100%'}}/>
              </Col>
            </Row>
            <Row>
              <Col sm={4} xs={12}/>
              <Col sm={4} xs={12}>
                <div className="aboutus-container" style={{paddingTop: '0px', marginTop: '-20px'}}>
                  <Row>
                    <Col sm={12} xs={12}>
                      <h1 className="text-align-center aboutus-figures">35,000</h1>
                      <p className="text-align-center" style={{color: '#0067e8', fontSize: '1.2em', lineHeight: '1em', fontFamily: 'Istok-Regular'}}>iService customers India-wide</p>
                      <hr className="iservice-hr"/>
                    </Col>
                  </Row>
                </div>
                <div className="aboutus-container">
                  <Row>
                    <Col sm={12} xs={12}>
                      <h1 className="text-align-center aboutus-figures">55,000</h1>
                      <p className="text-align-center" style={{color: '#0067e8', fontSize: '1.2em', lineHeight: '1em', fontFamily: 'Istok-Regular'}}>devices repaired</p>
                      <hr className="iservice-hr"/>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col sm={4} xs={12}/>
            </Row>
          </Container>
          <Container className="aboutus-section-4">
            <Row>
              <Col sm={4} xs={12}/>
              <Col sm={4} xs={12}>
                <Row>
                  <Col xs={12} sm={12}>
                    <p className="aboutus-follow-me">FOLLOW US</p>
                  </Col>
                  <Col xs={3} sm={3} className="text-align-center">
                    <a href="https://www.facebook.com/iServiceIndia"><img style={{width: '45px'}} className="aboutus-follow-images" src={require("../imgs/Facebook_Color normal.png")} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}/></a>
                  </Col>
                  <Col xs={3} sm={3} className="text-align-center">
                    <a href="https://twitter.com/iserviceindia"><img style={{width: '62px'}} className="aboutus-follow-images" src={require("../imgs/Twitter_Color normal.png")} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}/></a>
                  </Col>
                  <Col xs={3} sm={3} className="text-align-center">
                    <a href=""><img style={{width: '60px'}} className="aboutus-follow-images" src={require("../imgs/Instagram_Color normal.png")} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}/></a>
                  </Col>
                  <Col xs={3} sm={3} className="text-align-center">
                    <a href=""><img style={{width: '70px'}} className="aboutus-follow-images" src={require("../imgs/Youtube_Color normal.png")} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}/></a>
                  </Col>
                </Row>
              </Col>
              <Col sm={4} xs={12}/>
            </Row>
          </Container>
        </div>
      </MuiThemeProvider>
    );
  }
}
