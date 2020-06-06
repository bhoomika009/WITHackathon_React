import React from 'react'
  import { Card } from 'react-bootstrap'
  import '../css/custom.css';
  
  class ContactUs extends React.Component{

    render(){
        return(
            <div className="navCustom">
                     <Card className="contactuscard">
                     <Card.Body>
    <Card.Title>CONTACT US </Card.Title>
    <Card.Text>
                      
Got  a question? We’d be happy to help you with all your queries

+91-9999999999                   
7 days open
8:00 AM-8 PM IST
or Send an email:info@readymaids.com</Card.Text>
</Card.Body>
</Card>
                    </div>
        )  
    }
}

export default ContactUs;