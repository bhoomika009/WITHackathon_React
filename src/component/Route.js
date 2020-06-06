import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import About from "./AboutUs";
import Contact from "./ContactUs"
import history from './history';
import UserDashboard from "./Userdashboard"
import AgencyDashboard from "./Agencydashboard"

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/About" component={About} />
                    <Route path="/Contact" component={Contact} />
                    <Route path="/UserDashboard" component={UserDashboard} />
                    <Route path="/AgencyDashboard" component={AgencyDashboard} />
                </Switch>
            </Router>
        )
    }
}