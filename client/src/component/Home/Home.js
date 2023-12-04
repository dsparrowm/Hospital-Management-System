import React, { Component } from 'react';
import Homeimage from '../Homeimage';
import Navber from '../Navber/Navber';
import './Home.css';

import Footer from '../Footer';
class Home extends Component {
    render() {
        return (
            <div className = "bg-dark">
                <Navber />
                <Homeimage/>
                <Footer/>
            </div>
        );
    }
}

export default Home;