import React, {Component} from 'react';
import {Container, Row, Col} from 'react-grid-system';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class Footer extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Container fluid className="footer footer-container">
            <Row className="footer-top">
              <Col sm={12} md={12}>
                <Row>
                  <Col sm={4} xs={12} className="footer-main-link-container">
                    <a href="/diagnose" className="footer-top-link">
                      Diagnose a<br/>
                      problem online
                    </a>
                  </Col>
                  <Col sm={4} xs={12} className="footer-main-link-container">
                    <a href="/join" className="footer-top-link">
                      Become an<br/>
                      iService technician
                    </a>
                  </Col>
                  <Col sm={4} xs={12} className="footer-main-link-container">
                    <a href="/partner" className="footer-top-link">
                      Partner with us
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="footer-bottom">
              <Col sm={12} md={12}>
                <Row>
                  <Col lg={6} md={12} sm={12} xs={12} className="footer-links-contact footer-link-container-left">
                    <p className="footer-link-desktop-left">
                      <a href="/about" className="footer-bot-link">
                        About&nbsp;&nbsp;| 
                      </a>
                      <a href="/contact" className="footer-bot-link">
                        &nbsp;&nbsp;Contact Us&nbsp;&nbsp;|
                      </a>
                      <a href="/blog" className="footer-bot-link">
                        &nbsp;&nbsp;Blog&nbsp;&nbsp;| 
                      </a>
                    </p>
                  </Col>
                  <Col lg={6} md={12} sm={12} xs={12} className="footer-links-contact footer-link-container-right">
                    <p className="footer-link-desktop-right">
                      <a href="/about" className="footer-bot-link">
                        &nbsp;&nbsp;Privacy Policy&nbsp;&nbsp;|
                      </a>
                      <a href="/about" className="footer-bot-link">
                        &nbsp;&nbsp;Terms of Service
                      </a>
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="footer-bottom-copyright">
              <Col sm={1} md={2}>
                <br/>
              </Col>
              <Col sm={10} md={8}>
                <p className="footer-copyright">
                  Copyright © 2017 iService is an Independent Repairs & Services Company and is in no way affiliated with or Authorised by Apple, OnePlus, Xiaomi, Samsung or any other brand unless explicitly specified. But we love them and their products. All product, brand and company names are trademarks of their respective holders.
                </p>
              </Col>
              <Col sm={1} md={2}>
                <br/>
              </Col>
            </Row>
          </Container>
        </div>
      </MuiThemeProvider>
    );
  }
}
