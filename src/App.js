import React, { Component } from 'react';
import './App.css';
import Content from './Content'
import MemeList from './MemeList'

class App extends Component {

  constructor() {
    super()
    this.state = {
      imagesArray: [],
      currentImageId: null,
      createdMemesArray: [],
      saveClicked: false,
      createdMemeId: null,
      showClickedMemeId: null,
      deleteClicked: false
    }
  }

  componentDidMount() {
    this.getMemes()
    this.getCreatedMemes()
  }

  render() {
    return (
      <div className="App">
        <div className="nav-bar">
          <ul>
          <li className="nav-item"><h1>Welcome to Meme Generator!!</h1></li>
          </ul>
        </div>
        <div className="container">
          <div className='master-detail-element sidebar'>
            <MemeList
              allImages={this.state.imagesArray}
              handleMemeClick={this.handleMemeClick}
              allCreatedMemes={this.state.createdMemesArray}
              handleNewClick={this.handleNewClick}
            />
          </div>
          <div className='master-detail-element detail'>
            <Content
              currentImageId={this.state.currentImageId}
              allImages={this.state.imagesArray}
              handleCancelClick={this.handleCancelClick}
              setSaveClicked={this.setSaveClicked}
              saveClicked={this.state.saveClicked}
              allCreatedMemes={this.state.createdMemesArray}
              reRenderMemes={this.reRenderMemes}
              createdMemeId={this.state.createdMemeId}
              showClickedMemeId={this.state.showClickedMemeId}
              handleDeleteClick={this.handleDeleteClick}
              deleteClicked={this.state.deleteClicked}
            />
          </div>
        </div>
      </div>
    );
  }

  getMemes = () => {
    fetch('http://localhost:3000/memes')
    .then(response => response.json())
    .then(json => {
      console.log(json)
      this.setState({
        imagesArray: json
      })
    })
  }

  getCreatedMemes = () => {
    fetch('http://localhost:3000/created_memes')
    .then(response => response.json())
    .then(json => {
      console.log(json)
      this.setState({
        createdMemesArray: json
      })
    })
  }

  handleMemeClick = (event, id) =>{
    console.log('clicked')
    this.setState({
      currentImageId: id,
      createdMemeId: null,
      saveClicked: false
    }, console.log(id))
  }

  handleCancelClick = (event) => {
    this.setState({
      currentImageId: null
    })
  }

  handleDeleteClick = (event, id) => {
    console.log(' in delete function')
    fetch(`http://localhost:3000/created_memes/${id}`, {
      'method': 'DELETE'
    })
    .then(this.setState({
      createdMemesArray: this.removeDeletedMeme(id)
    }, console.log(this.state)))
    .then(this.reRenderDelete())
  }

  reRenderDelete = () => {
    this.setState({
      createdMemeId: null,
      deleteClicked: true,
      showClickedMemeId: null
    })
  }

  removeDeletedMeme = (id) => {
    return this.state.createdMemesArray.filter(meme => meme.id !== id)
  }

  handleNewClick = (event, id) => {
    console.log('clicked')
    this.setState({
      showClickedMemeId: id,
      currentImageId: null
    })
  }

  setSaveClicked = () => {
    this.setState({
      saveClicked: true
    }, () => {
      console.log(this.state.saveClicked);
    })
  }

  reRenderMemes = (obj) => {
    const newMemes = [...this.state.createdMemesArray, obj]
    // debugger
    this.setState({
      createdMemesArray: newMemes,
      createdMemeId: obj.id
    }, () => {
      // debugger
      console.log(this.state.createdMemeId, 'render meme ID');
      this.setSaveClicked()
    })
  }


} // end of class

export default App;
