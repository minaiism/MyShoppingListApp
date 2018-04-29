import React from 'react';
import Logo from './sale.png';
import classes from './Logo.css';

const logo = (prop) =>(
    <div className={classes.logo}>
        <img src={Logo} alt="ShoppingLogo" />
    </div>
);


export default logo;