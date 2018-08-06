import './style.css'
import Logo from './Homes_England_3282_DIGI_AW.png'
import React from 'react';

export default class Header extends React.Component {
    render() {
        return <header><img src={Logo} alt="Homes England" id="logo"/></header>
    }
}
