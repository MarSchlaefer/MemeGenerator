import React, { Component } from 'react';
import logo from './logo.svg';
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
        <h1>Welcome to Meme Generator!!</h1>
          <Instructions />
          <MemeList allMemes={this.state.memesArray}/>
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
