import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <nav className="fixed-top">
      <ul className="nav view-container p-3">
        <li><Link to="/" className="link">QR code</Link></li>
        <li><Link to="/" className="link"><strong>WelcomeBack</strong></Link></li>
        <li><Link to="/" className="link">Settings</Link></li>
      </ul>
    </nav>

  );
};

export default Navbar;
