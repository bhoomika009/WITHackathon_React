import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
  import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
  import '../css/custom.css';


class NavPillsSub extends React.Component{

    render(){
        return(
            <div className="navNew">
                        <Router >
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="subNavCustom">
                            <Navbar.Brand >Find out how are we helping you fight against coronavirus 
                               | <button className="btn btn-primary">LEARN MORE</button> 
                            </Navbar.Brand>
                            </Navbar>
                            <br />
                           
                        </Router>
                    </div>
        )  
    }
}

export default NavPillsSub;