import React, { Component } from 'react';

export default class Meme extends Component {

  render() {
    return (
      <div onClick={(event) => this.props.handleMemeClick(event, this.props.memeObj.id)}>
        <img src={this.props.memeObj.image_url} height='200' width='400'/>
        <p>{this.props.memeObj.title}</p>
      </div>
    )
  }


} //end of class
