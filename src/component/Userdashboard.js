import React from 'react'
import { Tab,Nav,Row,Col,Button, Container, Form } from 'react-bootstrap'
import '../css/custom.css';
import axios from "axios"
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import httpAdapter from "axios/lib/adapters/http"
  
const cboxes = [ "Full-time", "Part-time" ,"Cooking", "Household chores" ,"Baby sitting", "Elder care" ];

class Userdashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          check: {},
          val : [],
          categories : [],
          tableShowFlag: false,
          helperlist: [],
          helperId:"",
          hireById:"", 
          isHired: false,
          viewcert:false,
          hiredtableShowFlag: false,
          hiredhelperlist:[]
        };
        this.formSearch = this.formSearch.bind(this);
        this.showHireModal= this.showHireModal.bind(this);
        this.viewcertificate = this.viewcertificate.bind(this);
        this.gethired = this.gethired.bind(this);
      }
      
      handleChange(key, event) {
        this.state.categories.push(key);
       
      }

      gethired(event){
        console.log("get hired");
        event.preventDefault();
        var self= this;
        var loggedinuserid = sessionStorage.getItem("userloginid");
        axios.get("http://coding-clan-api-pipeline.mybluemix.net/user/helpers"+"/"+loggedinuserid
        ).then(function(response) {                  
                    console.log("response" + JSON.stringify(response.data));
                    console.log("response status" + JSON.stringify(response.status));
                    if (response.status === 200) {
                    console.log(response) 
                    self.setState({'hiredtableShowFlag': true,
                    hiredhelperlist: response.data}); }                                     
                })
                .catch(function(error) {
                    console.log(error);                   
                });
      }

      formSearch(event){
        event.preventDefault();
        let post_data=JSON.stringify({categories: this.state.categories});
        var self = this;
        axios.post("http://coding-clan-api-pipeline.mybluemix.net/helpers/searchByCategory",
        post_data, {
          headers: {
              'Content-Type': 'application/json',
          }
          }).then(function(response) {                  
                    console.log("response" + JSON.stringify(response.data));
                    console.log("response status" + JSON.stringify(response.status));
                    if (response.status === 200) {
                    console.log(response) 
                    self.setState({
                      helperlist: response.data,
                      loading: false,
                      errmsg: ""
                  })}  
                    self.setState({'tableShowFlag': true});                 
                })
                .catch(function(error) {
                    console.log(error);                   
                });
      }

      showHireModal(event, row){
        event.preventDefault();
        console.log("row" + JSON.stringify(row.id));       
        this.setState({isHired : true});
        console.log("hired");
        var self = this;
        var helperid = row.id;
        var loggedinuserid = sessionStorage.getItem("userloginid");
        axios.get("http://coding-clan-api-pipeline.mybluemix.net/helpers/hire"+"/"+loggedinuserid+"/"+helperid
        ).then(function(response) {                  
                    console.log("response" + JSON.stringify(response.data));
                    console.log("response status" + JSON.stringify(response.status));
                    if (response.status === 200) {
                    console.log(response) 
                    self.setState({'tableShowFlag': true}); }                                     
                })
                .catch(function(error) {
                    console.log(error);                   
                });
      }

      viewcertificate(event){
        var newWindow = window;  
        event.preventDefault();  
          const fileURL = "http://coding-clan-api-pipeline.mybluemix.net/downloadCertificate/1";     
          newWindow.location = fileURL;
      }

      renderChecks() {
        return cboxes.map(
          k =>
        <Form.Check
          type='checkbox'
          label={k}
          onChange={this.handleChange.bind(this, k)}
          key={k}
          name={k}
        /> );
      }

    render(){
      const columns = [
        {
            text: 'First Name',
            dataField: 'fname',
            sort: true
        },
        {
            text: 'Last Name',
            dataField: 'lname',
            sort: true
        },
        {
            text: 'Address',
            dataField: 'address',
            sort: true
        },
        {
            text: 'Contact No',
            dataField: 'contactNumber',
            sort: true
        },
        {
            text: 'Aadhar No',
            dataField: 'aadharNumber',
            sort: true
        },
        {
            text: 'Category',
            dataField: 'category',
            sort: true
            
        },
        
        {
          text: 'HIRE',
          dataField: 'hireById',
          isDummyField: true,
          formatter: (cellContent, row) => (
              <a className="nav-link"
                 href="/#"
                 onClick={(e) => {
                     this.showHireModal(e, row)
                 }}>{'HIRE'}</a>
          )
      },
      {
        text: 'View Certificate',
        dataField: 'id',
        isDummyField: true,
        formatter: (cellContent, row) => (
            <a className="nav-link"
               href="/#"
               onClick={(e) => {
                   this.viewcertificate(e, row)
               }}>{'View Certificate'}</a>
        )
    }
    ]
    const columnsnew = [
      {
          text: 'First Name',
          dataField: 'fname',
          sort: true
      },
      {
          text: 'Last Name',
          dataField: 'lname',
          sort: true
      },
      {
          text: 'Contact NO',
          dataField: 'contactNumber',
          sort: true
      },
      
      {
        text: 'Temperature(updated 5 mins ago)',
        dataField: 'temperature',
        sort: true
        
    },
    {
      text: 'View Certificate',
      dataField: 'id',
      isDummyField: true,
      formatter: (cellContent, row) => (
          <a className="nav-link"
             href="/#"
             onClick={(e) => {
                 this.viewcertificate(e, row)
             }}>{'View Certificate'}</a>
      )
  }
  ]

    const options = {
        paginationSize: 5,
        pageStartIndex: 1,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        sizePerPageList: [
            {text: '20', value: 20},
            {text: '40', value: 40},
            {text: 'All', value: this.state.helperlist.length}]
        // A numeric array is also available. the purpose of above example is custom the text
    };
    let closeModal = () => this.setState({isHired:false})
        return(
            <div className="navCustom">
                      
                      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                <Nav.Link eventKey="first">Search for Helper</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                <Nav.Link eventKey="second" onClick={this.gethired}>Your Hired Helpers</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            </Col>
                            <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                <Form onSubmit={this.formSearch}>
                              	<Container>
                                <h4 className="header">Let us know which type of help you are looking for ?</h4>
                                <div className="checkboxdiv">
                                {this.renderChecks() }                               
                                </div>
                                </Container>
                                <Button type="submit" className="searchhelpbtn">Search</Button>
                                </Form>
                                {(this.state.tableShowFlag) &&
                            <div>
                                <BootstrapTable keyField='helper'
                                                bootstrap4
                                                columns={columns}
                                                data={this.state.helperlist}
                                                loading={this.state.loading}
                                                pagination={paginationFactory(options)}
                                                defaultSorted={defaultSorted}
                                                noDataIndication="No users found"
                                                condensed
                                                only
                                                striped
                                                hover
                                />

                            </div>
                            }

                              <Modal show={this.state.isHired} onHide={closeModal} aria-labelledby="ModalHeader"
                                                        size="lg" keyboard={true} backdrop="static" centered>
                                  <ModalHeader closeButton>
                                      <ModalTitle>Helper Hired !!!!</ModalTitle>
                                  </ModalHeader>
                                  </Modal>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                
                                <div>
                                <BootstrapTable keyField='helper'
                                                bootstrap4
                                                columns={columnsnew}
                                                data={this.state.hiredhelperlist}
                                                loading={this.state.loading}
                                                pagination={paginationFactory(options)}
                                                defaultSorted={defaultSorted}
                                                noDataIndication="No users found"
                                                condensed
                                                only
                                                striped
                                                hover
                                />

                            </div>
                            <img src={this.state.source} />
                                </Tab.Pane>
                            </Tab.Content>
                            </Col>
                        </Row>
                        </Tab.Container>
                    </div>
        )  
    }
}



export default Userdashboard;

const defaultSorted = [{
  dataField: 'optumId',
  order: 'asc'
}]

const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
  Showing {from} to {to} of {size} Results
</span>
);