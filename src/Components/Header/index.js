import './style.css'
import Logo from '../../../public/img/Homes_England_3282_DIGI_AW.png'
import React from 'react';
import Form from 'react-jsonschema-form';

export default class Header extends React.Component {
    render() {
        return <header><img src={Logo} id="logo"/></header>
    }
}
