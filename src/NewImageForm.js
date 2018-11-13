import React, { Component } from 'react';

export default class NewImageForm extends Component {

  constructor(){
    super()
    this.state = {
      image: '',
      title: ''
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      console.log(this.state)
    })
  }

  postNewImage = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/memes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_url: this.state.image,
        title: this.state.title
      })
    })
    .then(resp => resp.json())
    .then(json => this.props.renderNewImage(json))
  }



  render() {
    return(
      <form onSubmit={this.postNewImage}>
        <label> Image URL: </label>
          <input onChange={this.onChange} type='text' name="image" ></input>
        <label> Title: </label>
          <input onChange={this.onChange} type='text' name="title" ></input>
          <button type='submit' value='Submit'>Save</button>
          <button onClick={this.props.cancelNewImage} value='Cancel'>Cancel</button>
      </form>
    )
  }
}
