import React, { Component } from 'react';
import './App.css';
import Instructions from './Instructions'
import MemeList from './MemeList'

class App extends Component {

  constructor() {
    super()
    this.state = {
      memesArray: []
    }
  }

  componentDidMount() {
    this.getMemes()
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
            <MemeList allMemes={this.state.memesArray}/>
          </div>
          <div className='master-detail-element detail'>
            <Instructions />
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

} // end of class

export default App;
