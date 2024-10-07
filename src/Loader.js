// Loader.js
import React from 'react';
import logo from './logo.svg';
import './Loader.css'; // Importez le CSS pour le style

const Loader = () => {
    return (
        <div className="loader">
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );
};

export default Loader;
