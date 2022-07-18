import React from 'react';
import PropTypes from 'prop-types';
import Slider from '../components/Slider';
import Header from '../components/Header';
import Register from '../components/Register';

function Login(props) {
    return (
        <div className='container'>
        <div className='header'>
            <Header />
        </div>
        <div className='main'>
            <Slider />
            <Register />
        </div>
        </div>
    );
}

export default Login;