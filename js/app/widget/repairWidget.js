import React, {Component} from 'react';
import {LocationDropdownComponent} from './../repair/LocationDropdownComponent';
import {DeviceDropdownComponent} from './../repair/DeviceDropdownComponent';
import {BrandDropdownComponent} from './../repair/BrandDropdownComponent';
import {ModelDropdownComponent} from './../repair/ModelDropdownComponent';
import {ColorDropdownComponent} from './../repair/ColorDropdownComponent';
import {IssueDropdownComponent} from './../repair/IssueDropdownComponent';
import {Container, Row, Col} from 'react-grid-system';
import './../repair/scss/common.scss';

export class Repair extends Component {
  render() {
    return (
      <div>
        <Container className="section landing-repair-widget">
          <Row className="repair-row-location-widget">
            <Col sm={12}>
              <LocationDropdownComponent/>
            </Col>
          </Row>
          <Row className="repair-row-location-widget">
            <Col sm={12}>
              <DeviceDropdownComponent/>
            </Col>
          </Row>
          <Row className="repair-row-location-widget">
            <Col sm={12}>
              <BrandDropdownComponent/>
            </Col>
          </Row>
          <Row className="repair-row-location-widget">
            <Col sm={12}>
              <ModelDropdownComponent/>
            </Col>
          </Row>
          <Row className="repair-row-location-widget">
            <Col sm={12}>
              <ColorDropdownComponent/>
            </Col>
          </Row>
          <Row className="repair-row-location-widget">
            <Col sm={12}>
              <IssueDropdownComponent/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
