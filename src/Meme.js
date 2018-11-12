import React, { Component } from 'react';

export default class Meme extends Component {

  render() {
    return (
      <div onClick={(event) => this.props.handleMemeClick(event, this.props.memeObj.id)}>
        <img src={this.props.memeObj.image_url} height='300' width='400'/>
        <h2>{this.props.memeObj.title}</h2>
      </div>
    )
  }


} //end of class
