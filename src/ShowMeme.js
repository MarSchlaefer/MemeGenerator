import React, { Component } from 'react';

export default class ShowMeme extends Component {

  render() {
    return (
      <div>
        <h2>{this.findNewMeme().title}</h2>
        <div className="meme">
          <p className="top">{this.findNewMeme().top}</p>
          <img src={this.findNewMeme().image} width="400" height="300"/>
          <p className="bottom">{this.findNewMeme().bottom}</p>
        </div>
        <h1>Congrats! You made new meme! You're soo comical!</h1>
      </div>
    )
  }

  findNewMeme = () => {
    // debugger
    console.log(this.props.createdMemeId)
    return this.props.allCreatedMemes.find(meme => this.props.createdMemeId === meme.id)
  }

}
