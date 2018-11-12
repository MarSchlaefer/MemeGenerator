import React, { Component } from 'react';


export default class CreateMemeForm extends Component {

  constructor(){
    super()
    this.state = {
      title: '',
      top: '',
      bottom: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // this.props.setSaveClicked()
    fetch('http://localhost:3000/created_memes', {
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
    })
    .then(resp => resp.json())
    .then(json => {
      this.props.reRenderMemes(json)
    })
  }


  render() {
    return (
      <div>
        <img src={this.props.currentMeme.image_url} width='400' height='300'/>
        <form onSubmit={this.handleSubmit}>
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
