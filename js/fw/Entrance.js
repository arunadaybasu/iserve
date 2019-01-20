/**
 *  Entrance.js launch the application.
 *
 *  @author  root
 *  @date    Jun 8, 2017
 *
 **/
import {Splash} from 'splash-screen';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {Main} from 'js/app/main';

import {DiagnosisPage} from 'js/app/diagnosis';

import {RepairNew} from 'js/app/repairnew';

import {EstimateNew} from 'js/app/estimatenew';

import {Tracking} from 'js/app/tracking';

import {DeliveryPage} from 'js/app/delivery';

import {WalkinPage} from 'js/app/walkin';

import {ITechiePage} from 'js/app/itechie';

import {PaymentPage} from 'js/app/payment';

import {ProfileNew} from 'js/app/profilenew';

import {Partners} from 'js/app/partners';

import {Business} from 'js/app/business';

import {About} from 'js/app/about';

import ClevertapReact from 'clevertap-react';

ClevertapReact.initialize("TEST-758-986-794Z");

class Entrance {

    constructor() {}

    beforeStart() {
        let injectTapEventPlugin = require('react-tap-event-plugin');
        //Needed for onTouchTap
        //Can go away when react 1.0 release
        //Check this repo:
        //https://github.com/zilverline/react-tap-event-plugin
        injectTapEventPlugin();
    }

    _destroySplash() {
        let _this = this;
        Splash.destroy();
        require('splash-screen/dist/splash.min.css').unuse();
        setTimeout(function() {
            if (Splash.isRunning()) {
                _this.destroySplash();
            }
        }, 100);
    }

    launch() {
        ReactDOM.render((
            <Router>
                <div>
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/home" component={Main}/>
                    <Route exact path="/repair" component={RepairNew}/>
                    <Route exact path="/diagnosis" component={DiagnosisPage}/>
                    <Route exact path="/delivery" component={DeliveryPage}/>
                    <Route exact path="/estimate" component={EstimateNew}/>
                    <Route exact path="/track" component={Tracking}/>
                    <Route exact path="/walkin" component={WalkinPage}/>
                    <Route exact path="/itechie" component={ITechiePage}/>
                    <Route exact path="/payment" component={PaymentPage}/>
                    <Route exact path="/profile" component={ProfileNew}/>
                    <Route exact path="/partners" component={Partners}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/business" component={Business}/>
                </div>
            </Router>
            ), document.querySelector('#view'));
    }

    run() {
        this.beforeStart();
        this._destroySplash();
        this.launch();
    }

}

export default Entrance;
