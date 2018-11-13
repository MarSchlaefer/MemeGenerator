import React, { Component } from 'react';
import Meme from './Meme'
import ListDisplay from './ListDisplay'
import CreatedMeme from './CreatedMeme'
import Search from './Search'

export default class MemeList extends Component {

  constructor() {
    super()
    this.state = {
      currentListView: 'original-images',
      searchValue: ''
    }
  }

  render() {
    return (
      <div className="searchArea">
        <Search setSearchValue={this.setSearchValue} searchValue={this.state.searchValue}/>
        <ListDisplay handleSelectChange={this.handleSelectChange}/>
        {this.displaySelection()}
        <button onClick={this.props.setNewImage}>New Image</button>
      </div>
    )
  }

  setSearchValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => console.log(this.state.searchValue))
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
    const filteredArray = this.filterMemes()
    return filteredArray.map(createdMeme => {
      return <CreatedMeme
        key={createdMeme.id}
        memeObj={createdMeme}
        handleNewClick={this.props.handleNewClick}
        />
    })
  }

  filterMemes = () => {
    const input = this.state.searchValue.toLowerCase()
    return this.props.allCreatedMemes.filter(meme => {
      return meme.title.toLowerCase().includes(input) || meme.top.toLowerCase().includes(input) || meme.bottom.toLowerCase().includes(input)
    })
  }


} // end of class
