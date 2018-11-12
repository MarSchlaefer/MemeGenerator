import React, { Component } from 'react';


export default class CreateMemeForm extends Component {

  constructor(){
    super()
    this.state = {
      title: '',
      top: '',
      bottom: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      console.log(this.state);
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/createdMemes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: this.props.currentMeme.image_url,
        title: this.state.title,
        top: this.state.top,
        bottom: this.state.bottom,
        parent_id: this.props.currentMeme.id
      })
    }).then(resp => resp.json())
    .then(console.log)
  }


  render() {
    console.log(this.props.currentMeme)
    return (
      <div>
        <img src={this.props.currentMeme.image_url}/>
        <form onSubmit={this.handleSubmit}>
          <label> Image: </label>
            <input type='url' name='image' value={this.props.currentMeme.image_url}></input>
          <label> Title: </label>
            <input onChange={this.handleChange} type='text' name="title" value={this.state.title}></input>
          <label> Top Text: </label>
            <input onChange={this.handleChange} type='text' name="top" value={this.state.top}></input>
          <label> Bottom Text: </label>
            <input onChange={this.handleChange} type='text' name="bottom" value={this.state.bottom}></input>
            <button type='submit' value='Submit'>Save</button>
            <button onClick={this.props.handleCancelClick} value='Cancel'>Cancel</button>
        </form>
      </div>

    )
  }


} //end of class
