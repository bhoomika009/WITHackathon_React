import React from 'react'
  import { Card } from 'react-bootstrap'
  import '../css/custom.css';
  
  class AboutUs extends React.Component{

    render(){
        return(
            <div className="navCustom">
            <Card className="aboutus">
  <Card.Body>
    <Card.Title>PROFICIENT, TRUSTED &HEALTH CERTIFIED HELPERS </Card.Title>
    <Card.Text>
                  <p>Why Chose us?</p>
<p><ui>
Today’s demanding jobs don’t really leave much time for other 
house hold chores, that’s where  we come in to make the 
lives of our customers easier . 
<li>Unparalleled service quality and efficiency</li>
<li>Service by only Health certified professionals –The Safety and wellbeing of our customers is of supreme importance to us and in order to maintain it we do regular health checkups of the helpers and do continuous monitoring.
100 % customer satisfaction guarantee</li>
<li>Bonded and Insured: You’re in Good Hands</li>
<li>Your home and property will always be safe with us. We are committed to taking care of our members the best way possible</li>
<li>Special services during Covid-19 Crisis with best- in- class safety measures .</li>
</ui></p>
</Card.Text></Card.Body></Card>
                    </div>
        )  
    }
}

export default AboutUs;