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
      editMemeId: null,
      deleteClicked: false,
      newImage: false
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
          <li className="nav-item"><h1>Welcome to Memerator!!</h1></li>
          </ul>
        </div>
        <div className="container">
          <div className='master-detail-element sidebar'>
            <MemeList
              allImages={this.state.imagesArray}
              handleMemeClick={this.handleMemeClick}
              allCreatedMemes={this.state.createdMemesArray}
              handleNewClick={this.handleNewClick}
              setNewImage={this.setNewImage}
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
              handleEditClick={this.handleEditClick}
              editMemeId={this.state.editMemeId}
              reRenderEditedMemes={this.reRenderEditedMemes}
              handleDeleteClick={this.handleDeleteClick}
              deleteClicked={this.state.deleteClicked}
              newImage={this.state.newImage}
              cancelNewImage={this.cancelNewImage}
              renderNewImage={this.renderNewImage}
            />
          </div>
        </div>
        <div className="footer">
          <ul>
          <li className="foot-item"><h1>! Create memes - Create fun !</h1></li>
          </ul>
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

  handleEditClick = (event, id) => {
    console.log('in edit')
    this.setState({
      editMemeId: id
    })
  }

  handleNewClick = (event, id) => {
    console.log('clicked')
    this.setState({
      showClickedMemeId: id,
      currentImageId: null,
      editMemeId: null
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

  setNewImage = () => {
    this.setState({
      newImage: true
    }, () => {
      console.log(this.state.newImage)
    })
  }

  cancelNewImage = () => {
    this.setState({
      newImage: false
    }, () => {
      console.log(this.state.newImage)
    })
  }

  renderNewImage = (obj) => {
    const newImages = [...this.state.imagesArray, obj]

    this.setState({
      imagesArray: newImages,
      newImage: false
    }, () => {
      console.log(this.state);
    })
  }

  reRenderEditedMemes = (obj) => {
    const newMemes = this.state.createdMemesArray.map(meme => {
      if (meme.id === obj.id) {
        return obj
      } else {
        return meme
      }
    })

    this.setState({
      createdMemesArray: newMemes,
      createdMemeId: obj.id,
      showClickedMemeId: obj.id,
      editMemeId: null
    }, () => {
      // debugger
      console.log(this.state.createdMemeId, 'render meme ID');
    })
  }


} // end of class

export default App;
