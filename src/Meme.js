import React, { Component } from 'react';

export default class Meme extends Component {

  render() {
    return (
      <div onClick={(event) => this.props.handleMemeClick(event, this.props.memeObj.id)}>
        <h2>{this.props.memeObj.title}</h2>
        <img src={this.props.memeObj.image_url} height='300' width='400'/>
      </div>
    )
  }


} //end of class
