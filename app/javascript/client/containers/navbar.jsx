import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class NavBar extends Component {

  render () {

    const authLink = () => {
        if (this.props.logged_in) {
          return(
            <li class="nav-item active">
              <a class="nav-link"  href="/logout" data-method="delete" rel="nofollow">Se déconnecter</a>
            </li>)
        } else {
          return (
            <li class="nav-item active">
              <a class="nav-link"  href="/login" >Se connecter</a>
            </li>)
        }
    }

    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/c"><a class="navbar-brand" href="#">WelcomeBack</a></Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">Comment ça marche</a>
            </li>
            <li class="nav-item">
              <Link to="/c/stars" className="nav-link" tabindex="-1" aria-disabled="true">Entrer un code</Link>
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
