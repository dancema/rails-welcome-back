import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {



  render() {
    return (
      <nav className="fixed-top">
        <ul className="nav view-container p-3">
          <li><Link to="/" className="link">QR code</Link></li>
          <li><Link to="/c/" className="link"><strong>WelcomeBack</strong></Link></li>
          <li><a href="/logout" data-method="delete" rel="nofollow">Sign Out</a></li>
        </ul>
      </nav>

    )}
};

export default Navbar;
