import React, { Component } from 'react';
import Instructions from './Instructions'
import CreateMemeForm from './CreateMemeForm'
import ShowMeme from './ShowMeme'
import ShowClickedMeme from './ShowClickedMeme'
import NewImageForm from './NewImageForm'

export default class Content extends Component{

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }

  renderContent = () => {
    if (this.props.currentImageId && this.props.saveClicked) {
      return <ShowMeme
        createdMemeId={this.props.createdMemeId}
        allCreatedMemes={this.props.allCreatedMemes}
        />
    } else if (this.props.currentImageId || this.props.editMemeId) {
      return this.renderForm()
    } else if (this.props.showClickedMemeId){
      return <ShowClickedMeme
        allCreatedMemes={this.props.allCreatedMemes}
        showClickedMemeId={this.props.showClickedMemeId}
        handleEditClick={this.props.handleEditClick}
        handleDeleteClick={this.props.handleDeleteClick}
      />
    } else if (this.props.newImage){
      return <NewImageForm cancelNewImage={this.props.cancelNewImage}
        renderNewImage={this.props.renderNewImage}/>
    } else {
        return <Instructions deleteClicked={this.props.deleteClicked}/>
    }
  }

  renderForm = () => {
    return <CreateMemeForm
      allImages={this.props.allImages}
      currentMeme={this.findCurrentMeme()}
      handleCancelClick={this.props.handleCancelClick}
      setSaveClicked={this.props.setSaveClicked}
      allCreatedMemes={this.props.allCreatedMemes}
      reRenderMemes={this.props.reRenderMemes}
      editMemeId={this.props.editMemeId}
      reRenderEditedMemes={this.props.reRenderEditedMemes}
      />
  }

  findCurrentMeme = () => {
    return this.props.allImages.find(meme => this.props.currentImageId === meme.id)
  }

} //end of class
