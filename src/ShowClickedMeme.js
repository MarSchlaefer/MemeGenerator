import React, { Component } from 'react';

export default class ShowClickedMeme extends Component{

  render() {
    return (
      <div>
        <div>
          <h2>{this.findNewMeme().title}</h2>
          <div className="meme">
            <p className="top">{this.findNewMeme().top}</p>
            <img src={this.findNewMeme().image} width="400" height="300"/>
            <p className="bottom">{this.findNewMeme().bottom}</p>
          </div>
        </div>
        <button onClick={this.props.handleEditClick}>Edit</button>
        <button onClick={(event) => this.props.handleDeleteClick(event, this.findNewMeme().id)}>Delete</button>
      </div>
    )
  }

  findNewMeme = () => {
    // debugger
    return this.props.allCreatedMemes.find(meme => this.props.showClickedMemeId === meme.id)
  }

} //end of class
