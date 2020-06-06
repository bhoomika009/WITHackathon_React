import React, { Component } from 'react';
import ListCoursesComponent from './ListCoursesComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import MenuComponent from './MenuComponent';
import AuthenticationService from '../service/AuthenticationService';
import AuthenticatedRoute from './AuthenticatedRoute';
import NavPills from './NavPills';
import NavPillsSub from './NavPillsSub';
import About from "./AboutUs";
import Contact from "./ContactUs"
import Userdashboard from "./Userdashboard";
import Agencydashboard from "./Agencydashboard"

class InstructorApp extends Component {
    

    render() {
        return (
            <>
                <Router>
                    <>
                    <NavPills/>
                    <NavPillsSub/>                   
                        <Switch>
                            <Route path="/" exact component={LoginComponent} />
                            <Route path="/login" exact component={LoginComponent} />
                            <AuthenticatedRoute path="/logout" exact component={LogoutComponent} />
                            <AuthenticatedRoute path="/courses" exact component={ListCoursesComponent} />
                        </Switch>
                        <Route path="/About" exact component={About} />
                        <Route path="/Contact" exact component={Contact} />
                        <Route path="/Userdashboard" exact component={Userdashboard} />
                        <Route path="/Agencydashboard" exact component={Agencydashboard} />
                       
                    </>
                </Router>
            </>
        )
    }
}

export default InstructorApp