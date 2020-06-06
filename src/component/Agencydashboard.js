import React from 'react'
  import { Tab,Nav,Row,Col,Button } from 'react-bootstrap'
  import '../css/custom.css';
  import { Card, ButtonGroup , Input, Form,InputGroup, Alert } from 'react-bootstrap'
  import axios from "axios";

  
  class Agencydashboard extends React.Component{
    constructor() {
        super();
        this.state = {
            validated: false,
            setValidated: "",
            helperfname :"",
            helperlname: "",
            helperphno:"",
            helperaadharno:"",
            helpercategory:"",
            helperagentid:"",
            helperaddres:"",
            helperadded:false,
            selectedFile: null,
            certificateuploaded: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.newhelper = this.newhelper.bind(this);
        this.uploadcertificate= this.uploadcertificate.bind(this);
        this.onFileChange= this.onFileChange.bind(this);
      }
      
      handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
      }
      
      submitForm = (details) => {
        var self = this;       
        console.log("add helper")
        console.log(details);
        axios.post("http://coding-clan-api-pipeline.mybluemix.net/helpers/add", details).then(function(response) {
            if(response.status === 200){
            self.setState({
                helperadded: true
        })
        } })
        .catch(function(error) {
            console.log(error);
        });
      }

      

      handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        this.setState({
          setValidated: true,
          validated:true
        });
        event.preventDefault();
        this.submitForm({
            "fname": this.state.helperfname,
            "lname": this.state.helperlname,
            "username": "test",
            "password": "test",
            "address": this.state.helperaddres,
            "contactNumber": this.state.helperphno,
            "aadharNumber": this.state.aadharNumber,
            "category": this.state.helpercategory,
            "agentId": this.state.helperagentid          
          })
    }


    onFileChange(event){ 
      
        this.setState({ selectedFile: event.target.files[0] }); 
       
      };

    uploadcertificate(event){
        event.preventDefault();
        var self = this;   
        const formData = new FormData();  
        formData.append( 
            "file", 
            self.state.selectedFile
          ); 
          formData.append('helperId', 1);
          formData.append('validFrom', "2020/06/02");
          formData.append('validThrough', "2020/11/02");
          console.log(this.state.selectedFile); 
        console.log("add certificate")
        axios.post("http://coding-clan-api-pipeline.mybluemix.net/uploadCertificate", formData).then(function(response) {
            if(response.status === 200){
            self.setState({
               uploadcertificate: true
        })
        } })
        .catch(function(error) {
            console.log(error);
        });

    }

    newhelper(event){
        this.setState({
          validated: false,
          setValidated: "",
          helperfname :"",
          helperlname: "",
          helperphno:"",
          helperaadharno:"",
          helpercategory:"",
          helperagentid:"",
          helperaddres:"",
          helperadded:false
      });
    }

    render(){
        return(
            <div className="navCustom">
                      
                      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                <Nav.Link eventKey="first">Add Helper</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            </Col>
                            <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                {this.state.helperadded && <Alert variant="success" className="alertlogin">Helper Added Sucessfully</Alert>}
                                {this.state.helperadded && <div>If you want to add a new helper , please click this button
                            <Button type="btn" onClick={this.newhelper}>ADD NEW HELPER</Button> </div>}
                                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit} className="helperform">                              
                                <Form.Row>    
                                    <Form.Group as={Col} md="4" controlId="helperfname">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                    required
                                        type="text"
                                        placeholder="First name"
                                        value={this.state.helperfname}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="helperlname">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Last name"
                                        value={this.state.helperlname}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="helperphno">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Phone Number"
                                        value={this.state.helperphno}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                
                                </Form.Row>
                                <Form.Row>    
                                    <Form.Group as={Col} md="4" controlId="helperaadharno">
                                    <Form.Label>Aadhar Number</Form.Label>
                                    <Form.Control
                                    required
                                        type="text"
                                        placeholder="First name"
                                        value={this.state.helperaadharno}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="helpercategory">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Last name"
                                        value={this.state.helpercategory}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="helperagentid">
                                    <Form.Label>Agent ID</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Phone Number"
                                        value={this.state.helperagentid}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="helperaddres">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" placeholder="City" required 
                                    value={this.state.helperaddres}
                                    onChange={this.handleChange}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid address.
                                    </Form.Control.Feedback>
                                    </Form.Group>
                                    <input type="file" onChange={this.onFileChange} className="choosefile"/> 
                                    <Button type="btn" onClick={this.uploadcertificate}>Upload health certificate</Button>
                                </Form.Row>
                                <Form.Group>
                                    <Form.Check
                                    required
                                    label="Agree to terms and conditions"
                                    feedback="You must agree before submitting."
                                    />
                                </Form.Group>
                                
                                <Button type="submit">Submit form</Button>
                                </Form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                second
                                </Tab.Pane>
                            </Tab.Content>
                            </Col>
                        </Row>
                        </Tab.Container>
                    </div>
        )  
    }
}

export default Agencydashboard;



  