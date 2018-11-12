import React, { Component } from 'react';
import Meme from './Meme'
import CreateMemeForm from './CreateMemeForm'

export default class MemeList extends Component {

  constructor() {
    super()
    this.state = {
      currentMemeId: null
    }
  }

  render() {
    return (
      <div>
        {this.makeMemes()}
        {this.renderForm()}
      </div>
    )
  }

  makeMemes = () => {
    return this.props.allMemes.map(meme => {
      return <Meme
        key={meme.id}
        memeObj={meme}
        handleMemeClick={this.handleMemeClick}
        />
    })
  }

  renderForm = () => {
    if (this.state.currentMemeId) {
      return <CreateMemeForm
        allMemes={this.props.allMemes}
        currentMeme={this.findCurrentMeme()}
        handleCancelClick={this.handleCancelClick}
        />
    }
  }

  handleMemeClick = (event, id) =>{
    console.log('clicked')
    this.setState({
      currentMemeId: id
    }, console.log(id))
  }

  findCurrentMeme = () => {
    return this.props.allMemes.find(meme => this.state.currentMemeId === meme.id)
  }

  handleCancelClick = (event) => {
    this.setState({
      currentMemeId: null
    })
  }

} // end of class
