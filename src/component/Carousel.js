import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
  import { Carousel } from 'react-bootstrap'
  import '../css/custom.css';
  import logo from '../assets/img/hack1.jpg'
  import logo2 from '../assets/img/hack2.webp'
  import logo3 from '../assets/img/hack3.jpg'

class CustomCarousel extends React.Component{
    setIndex = (selectedIndex) => {
        this.setState({index: selectedIndex})
        }   
    
        handleSelect = (selectedIndex, e) => {
            this.setIndex(selectedIndex);
        }
    
        constructor(props) {
            super(props);
            this.state = {
                index: 0,
                setIndex: 0,
                setDirection: null
            };
        }

    render(){
        const { index, direction } = this.state;
        return(
            <Carousel activeIndex={index} onSelect={this.handleSelect} className="customCarosel">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={logo}
                alt="First slide"
                width="1000px"
                height="517px"
              />
              <Carousel.Caption>
               
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={logo2}
                alt="Second slide"
                width="1000px"
                height="517px"
              />
      
              <Carousel.Caption>
                
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={logo3}
                alt="Third slide"
                width="1000px"
                height="517px"
              />
      
              <Carousel.Caption>
                
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
    )
  }
}
  
export  default CustomCarousel