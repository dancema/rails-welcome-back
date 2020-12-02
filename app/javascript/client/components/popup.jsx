import React, { Component } from 'react';

class Popup extends React.Component {
  render() {
    console.log(this)
    console.log(this.props)
    console.log(this.props.restaurant_id)
    const link = `/c/restaurants/${this.props.restaurant_id}`
    console.log(link)
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
          <a href={link} className="button" role="button" >Continuer</a>
        </div>
      </div>
    );
  }
}


export default Popup;
