import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
  import { withRouter } from 'react-router';
  import { Card, Button , ButtonGroup , Input, Form, Col, InputGroup } from 'react-bootstrap'
  import '../css/custom.css';
  import Modal from 'react-bootstrap/Modal';
import ModalBody from "react-bootstrap/ModalBody";
import Alert from 'react-bootstrap/Alert';
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import axios from "axios";

 
  class RegisCard extends React.Component{

    constructor() {
        super();
        this.state = {
          name: "React",
          regisClicked: false,
          agencyregisClicked: false,
          validated: false,
          setValidated: false,
          userfname:"",
          userlname:"",
          userphno:"",
          useraddres:"",
          useruid:"",
          userpass:"",
          agencyname:"",
          agencyno:"",
          agencypan:"",
          agencyaddres:"",
          agencyid:"",
          agencypass:"",
          userregiscompleted:false,
          agencyregiscompleted:false,
          useridexists: false,
          agencyidexists:false ,
          selected:"radio1",
          useridlogin: "",
          userpasslogin: "",
          agencyidlogin: "",
          agencypasslogin :"",
          userlogin: false,
          agencylogin: false,
          usernotallowed: false,
          agencynotallowed: false
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.regisClicked = this.regisClicked.bind(this);
        this.agencyregisClicked = this.agencyregisClicked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.userregistration= this.userregistration.bind(this);
        this.agencyregistration= this.agencyregistration.bind(this);
        this.loginuser= this.loginuser.bind(this);
        this.loginagency = this.loginagency.bind(this);
        this.handlelogin = this.handlelogin.bind(this);

      }

      handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    loginuser= (details) => {
      var self = this;
        console.log("user login clicked")
        console.log(details);         
      axios.post("http://coding-clan-api-pipeline.mybluemix.net/login/user",
      details).then(function(response) {                  
                  console.log("response" + JSON.stringify(response.data));
                  console.log("response status" + JSON.stringify(response.status));
                  if (response.status === 200) {
                  if(response.data.status === "Success"){
                      self.setState({
                        userlogin: true
                    });} 
                    sessionStorage.setItem("userloginid", response.data.id);}    
                    self.props.history.push('/Userdashboard')                   
              })
              .catch(function(error) {
                  console.log(error);
                  if (error.response.status === 404) {
                      self.setState({
                        usernotallowed: true
                    });    } 
              });
  }
    loginagency= (details) => {
      var self = this;
        console.log("agency login clicked")
        console.log(details);         
      axios.post("http://coding-clan-api-pipeline.mybluemix.net/login/agent",
      details)
              .then(function(response) {                  
                  console.log("response" + JSON.stringify(response.data));
                  console.log("response status" + JSON.stringify(response.status));
                  if (response.status === 200) {
                    if(response.data === "Success"){
                        self.setState({
                          agencylogin: true
                      });} }    
                      self.props.history.push('/Agencydashboard')                   
                })
              .catch(function(error) {
                  console.log(error);
                  if (error.response.status === 404) {
                    self.setState({
                      agencynotallowed: true
                  });    }
              });
      
  }


      handleSubmit(event) {
        event.preventDefault();
       const form = event.currentTarget;
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          this.setState({
            setValidated: true,
            validated:true
          });
          if (this.state.regisClicked){
              this.userregistration({
                "fname": this.state.userfname,
                "lname": this.state.userlname,
                "userId": this.state.useruid,
                "userPwd": this.state.userpass,
                "address": this.state.useraddres,
                "contactNumber":this.state.userphno            
              })
          }

          if (this.state.agencyregisClicked){
            this.agencyregistration({
                "agencyName": this.state.agencyname,
                "agentId": this.state.agencyid,
                "panNo": this.state.agencypan,
                "agentPwd": this.state.agencypass,
                "address": this.state.agencyaddres,
                "contactNumber":this.state.agencyno 
            })
        }

        }

        handlelogin(event) {
          event.preventDefault();
         const form = event.currentTarget;
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            if (this.state.selected === 'radio1'){
                this.loginuser({
                  "loginId": this.state.useridlogin,
                  "loginPwd": this.state.userpasslogin       
                })
            }
  
            if (this.state.selected === 'radio2'){
              this.loginagency({                                  
                  "loginId": this.state.agencyidlogin,                
                  "loginPwd": this.state.agencypasslogin
              })
          }
  
          }
      
      regisClicked(event) {
        this.setState({
          regisClicked: true
        });
      }

      agencyregisClicked(event) {
        this.setState({
          agencyregisClicked: true
        });
      }

      userregistration = (member) => {
        var self = this;
          console.log("user registration clicked")
          console.log(member);         
        axios.post("http://coding-clan-api-pipeline.mybluemix.net/register/user",
                    member)
                .then(function(response) {                  
                    console.log("response" + JSON.stringify(response.data));
                    console.log("response status" + JSON.stringify(response.data.status));
                    self.setState({
                        useridexists: response.data.status 
                    });
                    if(response.data.status === false){
                        self.setState({
                            userregiscompleted: true
                        }); 
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });

    }
      
      agencyregistration =(details)=>{
        var self = this;
       
        console.log("agency registration clicked")
        console.log(details);
        axios.post("http://coding-clan-api-pipeline.mybluemix.net/register/agent", details).then(function(response) {
            self.setState({
                agencyidexists: response.data.status 
            });
            if(response.data.status === false){
                self.setState({
                    agencyregiscompleted: true
                }); 
            }
        })
        .catch(function(error) {
            console.log(error);
        });
      }
    
      onValueChange(event) {
        this.setState({
          selectedOption: event.target.value
        });
      }
    
      formSubmit(event) {
        event.preventDefault();
        console.log(this.state.selectedOption)
      }
    render(){

          
        let closeModal = () => this.setState({regisClicked:false, agencyregisClicked:false})
        return(
  <Card className="regiscard">
  <Card.Body>
    <Card.Title>LOGIN</Card.Title>
    <Card.Text>
    <Form onSubmit={this.handlelogin}>
      <Form.Row>    
        <Form.Group as={Col} md="4" controlId="radio">
          <Form.Check
          type="radio"
          id="radio1"
          className="radio1"
          name="USER"
          label="USER"
          value='radio1'
          checked={this.state.selected === 'radio1'}
          onChange={(e) => this.setState({ selected: e.target.value })} 
        />
         <Form.Check
          type="radio"
          label="AGENCY"
          name="AGENCY"
          className="radio2"
          id="radio2"
          value='radio2'
          checked={this.state.selected === 'radio2'}
          onChange={(e) => this.setState({ selected: e.target.value })}
        />
        </Form.Group>
        </Form.Row>
        {this.state.selected === 'radio1' &&
        <Form.Row>
          {this.state.usernotallowed && <Alert variant="danger" className="alertlogin">Username or password is not correct</Alert>}
        <Form.Group as={Col} md="6" controlId="useridlogin">
          <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
              value={this.state.useridlogin}
              onChange={this.handleChange}
            />
        </Form.Group>
      
        <Form.Group as={Col} md="6" controlId="userpasslogin">
          <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              aria-describedby="inputGroupPrepend"
              required
              value={this.state.userpasslogin}
              onChange={this.handleChange}
            />
        </Form.Group>
        <Button type="submit" className="loginbtn">LOGIN</Button>
      
        </Form.Row>
      
       }
       {this.state.selected === 'radio2' &&
        <Form.Row>
          {this.state.agencynotallowed && <Alert variant="danger" className="alertlogin">Username or password is not correct</Alert>}
        <Form.Group as={Col} md="6" controlId="agencyidlogin">
          <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
              value={this.state.agencyidlogin}
              onChange={this.handleChange}
            />
        </Form.Group>
      
        <Form.Group as={Col} md="6" controlId="agencypasslogin">
          <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              aria-describedby="inputGroupPrepend"
              required
              value={this.state.agencypasslogin}
              onChange={this.handleChange}
            />
        </Form.Group>
        <Button type="submit" className="loginbtn">LOGIN</Button>
        </Form.Row>
       }
        </Form>
     <div>
        <div className="regishead"><b>New to our site  :</b></div>
          <div>If you are looking for help, please choose <b>User</b>, If you want to register as an agency, choose <b>Agency</b></div>
        <button className="btn btn-primary" onClick={this.regisClicked}>
          User
        </button>
        <button className="btn btn-primary" onClick={this.agencyregisClicked}>
         Agency
        </button>
        </div>
   </Card.Text>
    <Modal show={this.state.regisClicked} onHide={closeModal} aria-labelledby="ModalHeader"
                           size="lg" keyboard={true} backdrop="static" centered>
    <ModalHeader closeButton>
        <ModalTitle>User Details</ModalTitle>
    </ModalHeader>
    <ModalBody>
    {this.state.userregiscompleted && <Alert variant="success">USER REGISTERED</Alert>}
     {!this.state.userregiscompleted &&    
<Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
     {this.state.useridexists && <Alert variant="danger">User ID already exists, please re-enter</Alert>}
      <Form.Row>    
        <Form.Group as={Col} md="4" controlId="userfname">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First name"
            value={this.state.userfname}
            onChange={this.handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="userlname">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            value={this.state.userlname}
            onChange={this.handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="userphno">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Phone Number"
            value={this.state.userphno}
            onChange={this.handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
       
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="useraddres">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="City" required 
           value={this.state.useraddres}
           onChange={this.handleChange}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid address.
          </Form.Control.Feedback>
        </Form.Group>
       
      </Form.Row>
      <Form.Row>
      <Form.Group as={Col} md="4" controlId="useruid">
          <Form.Label>Username</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
              value={this.state.useruid}
              onChange={this.handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="userpass">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" 
            value={this.state.userpass}
            onChange={this.handleChange}/>
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Group>
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>}
                        </ModalBody>
                    </Modal>
                    <Modal show={this.state.agencyregisClicked} onHide={closeModal} aria-labelledby="ModalHeader"
                           size="lg" keyboard={true} backdrop="static" centered>
                        <ModalHeader closeButton>
                            <ModalTitle>Agency Details</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                        {this.state.agencyregiscompleted && <Alert variant="success">NEW AGENCY REGISTERED</Alert>}
    {!this.state.agencyregiscompleted &&
    <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
     {this.state.agencyidexists && <Alert variant="danger">User ID already exists, please re-enter</Alert>}
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="agencyname">
          <Form.Label>Agency name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Agency Name"
            value={this.state.agencyname}
              onChange={this.handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        
          <Form.Group as={Col} md="4" controlId="agencyno">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Phone Number"
            value={this.state.agencyno}
              onChange={this.handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
       
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="agencyaddres">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="City" required 
          value={this.state.agencyaddres}
          onChange={this.handleChange}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid address.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="agencypan">
          <Form.Label>PAN Number/GST Number</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="XXXX"  
            value={this.state.agencypan}
              onChange={this.handleChange}         
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
      </Form.Row>
      <Form.Row>
      <Form.Group as={Col} md="4" controlId="agencyid">
          <Form.Label>Username</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
              value={this.state.agencyid}
              onChange={this.handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="agencypass">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" 
            value={this.state.agencypass}
            onChange={this.handleChange}/>
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Group>
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>}
                        </ModalBody>
                    </Modal>                
  </Card.Body>
</Card>
        )
    }
}

export default withRouter(RegisCard)