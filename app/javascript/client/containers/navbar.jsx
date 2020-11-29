import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class NavBar extends Component {

  render () {

    const authLink = () => {
        if (this.props.logged_in) {
          return(
            <li className="nav-item active">
              <a className="nav-link"  href="/logout" data-method="delete" rel="nofollow">Se déconnecter</a>
            </li>)
        } else {
          return (
            <li className="nav-item active">
              <a className="nav-link"  href="/login" >Se connecter</a>
            </li>)
        }
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/c/restaurants"><div className="navbar-brand" >WelcomeBack</div></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">Comment ça marche</a>
            </li>
            <li className="nav-item">
              <Link to="/c/code" className="nav-link" tabIndex="-1" aria-disabled="true">Entrer un code</Link>
            </li>
            {authLink()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    logged_in: state.logged_in,
  };
}



export default connect(mapStateToProps, null)(NavBar);
