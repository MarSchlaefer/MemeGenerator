import React, { Component } from 'react';
import Meme from './Meme'
import ListDisplay from './ListDisplay'
import CreatedMeme from './CreatedMeme'
import Search from './Search'

export default class MemeList extends Component {

  constructor() {
    super()
    this.state = {
      currentListView: 'original-images'
    }
  }

  render() {
    return (
      <div>
        <Search />
        <ListDisplay handleSelectChange={this.handleSelectChange}/>
        {this.displaySelection()}
        <button onClick={this.props.setNewImage}>New Image</button>
      </div>
    )
  }

  displaySelection = () => {
    if (this.state.currentListView === 'original-images') {
      return this.makeImages()
    } else {
      return this.makeMemes()
    }
  }


  handleSelectChange = (e) => {
    console.log(e.target.value);
    this.setState({
      currentListView: e.target.value
    })
  }

  makeImages = () => {
    return this.props.allImages.map(meme => {
      return <Meme
        key={meme.id}
        memeObj={meme}
        handleMemeClick={this.props.handleMemeClick}
        />
    })
  }

  makeMemes = () => {
    return this.props.allCreatedMemes.map(createdMeme => {
      return <CreatedMeme
        key={createdMeme.id}
        memeObj={createdMeme}
        handleNewClick={this.props.handleNewClick}
        />
    })
  }


} // end of class
