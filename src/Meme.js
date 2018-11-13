import React, { Component } from 'react';

export default class Meme extends Component {

  render() {
    return (
      <div className="orig-image" onClick={(event) => this.props.handleMemeClick(event, this.props.memeObj.id)}>
        <h3 className='image-text'>{this.props.memeObj.title}</h3>
        <img src={this.props.memeObj.image_url} height='300' width='400'/>
      </div>
    )
  }


} //end of class
