import React from 'react';
import './Header.css';

import seoLogo from '../../../img/SEO.jpg';

const Header = (props) => {
    return (
        <div className="header-container container-fluid">
            <div className="logo-container">
                <img src={seoLogo} className="header-logo" alt="seo" />
            </div>

            <h2 className="header-text">{props.text}</h2>
        </div>
    );
};
export default Header;