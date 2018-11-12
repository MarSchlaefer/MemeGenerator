import React, { Component } from 'react';
import Instructions from './Instructions'
import CreateMemeForm from './CreateMemeForm'
import ShowMeme from './ShowMeme'
import ShowClickedMeme from './ShowClickedMeme'

export default class Content extends Component{

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }

  renderContent = () => {
      if (this.props.currentMemeId && this.props.saveClicked) {
        return <ShowMeme
          createdMemeId={this.props.createdMemeId}
          allCreatedMemes={this.props.allCreatedMemes}
          />
      } else if (this.props.currentMemeId) {
        return this.renderForm()
      } else if (this.props.newCurrentId){
        return <ShowClickedMeme
          allCreatedMemes={this.props.allCreatedMemes}
          newCurrentId={this.props.newCurrentId}
        />
      } else {
        return <Instructions />
    }
  }

  renderForm = () => {
    return <CreateMemeForm
      allMemes={this.props.allMemes}
      currentMeme={this.findCurrentMeme()}
      handleCancelClick={this.props.handleCancelClick}
      setSaveClicked={this.props.setSaveClicked}
      allCreatedMemes={this.props.allCreatedMemes}
      reRenderMemes={this.props.reRenderMemes}
      />
  }

  findCurrentMeme = () => {
    return this.props.allMemes.find(meme => this.props.currentMemeId === meme.id)
  }

} //end of class
