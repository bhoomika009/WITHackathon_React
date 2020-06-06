import React from 'react'
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import '../css/custom.css';
import { withRouter } from 'react-router-dom';

import About from "./AboutUs";
import Contact from "./ContactUs";

  const NavPills = (props) => {

        return(
            <div className="navCustom">
                      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="navBarCustom">
                               
                                <Navbar.Brand ><b>READY SET MAIDS</b>   |   <span className="subtitle"><i>We Are Here For You</i></span></Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                    <Nav.Link href="/logout">Home</Nav.Link>
                                    <Nav.Link href="/Contact">Contact Us</Nav.Link>
                                    <Nav.Link href="/About"> About Us</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>                          
                            <br />
                    </div>
        )  
    
}

export default withRouter(NavPills);