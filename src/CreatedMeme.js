import React, { Component } from 'react';

export default class CreatedMeme extends Component {

  render() {
    return (
      <div>
        <h2>{this.props.memeObj.title}</h2>
        <div className="meme">
          <p className="top">{this.props.memeObj.top}</p>
          <img src={this.props.memeObj.image} width="400" height="300"/>
          <p className="bottom">{this.props.memeObj.bottom}</p>
        </div>
      </div>
    )
  }


} //end of class
