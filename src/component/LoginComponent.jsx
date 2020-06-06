import React, { Component } from 'react'
import AuthenticationService from '../service/AuthenticationService';
import Carousel from './Carousel';
import RegistrationCard from './RegistrationCard'
class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
    
        }
    }

    render() {
        return (
            <div>
               <Carousel/>
            <RegistrationCard/>
            </div>
        )
    }
}

export default LoginComponent