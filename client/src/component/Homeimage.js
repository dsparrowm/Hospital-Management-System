import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { MDBContainer } from 'mdbreact';
import Img from '../photos/hospital.jpg'

class Homeimage extends Component {
   
    render() { 
        return (
        <div>
        <Card className="text-white">
        <Card.Img src={Img} alt="Card image" height="700" style={{opacity:"0.6"}}/>
                <Card.ImgOverlay>
                    <Card.Title>
                    <MDBContainer >
                        <h1 className="font-weight-bold display-1 text-danger mt-5">
                            UCTH
                        </h1>
                        <p className="font-weight-bold text-danger">
                            Service * Integrity * Empathy * Innovation
                        </p>
                    </MDBContainer>
                    </Card.Title>
                    
                    
                </Card.ImgOverlay>
        </Card>
        </div>);
    }
}
 
export default Homeimage;