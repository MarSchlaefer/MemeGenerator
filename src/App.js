import React, { Component } from 'react';
import './App.css';
import Content from './Content'
import MemeList from './MemeList'

class App extends Component {

  constructor() {
    super()
    this.state = {
      memesArray: [],
      currentMemeId: null,
      createdMemesArray: [],
      saveClicked: false,
      createdMemeId: null
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
              allMemes={this.state.memesArray}
              handleMemeClick={this.handleMemeClick}
              allCreatedMemes={this.state.createdMemesArray}
            />
          </div>
          <div className='master-detail-element detail'>
            <Content
              currentMemeId={this.state.currentMemeId}
              allMemes={this.state.memesArray}
              handleCancelClick={this.handleCancelClick}
              setSaveClicked={this.setSaveClicked}
              saveClicked={this.state.saveClicked}
              allCreatedMemes={this.state.createdMemesArray}
              reRenderMemes={this.reRenderMemes}
              createdMemeId={this.state.createdMemeId}
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
        memesArray: json
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
      currentMemeId: id
    }, console.log(id))
  }

  handleCancelClick = (event) => {
    this.setState({
      currentMemeId: null
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
