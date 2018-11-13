import React, { Component, Fragment } from 'react';


export default class CreateMemeForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      title: '',
      top: '',
      bottom: '',
      editTitle: this.findEditMeme().title,
      editTop: this.findEditMeme().top,
      editBottom: this.findEditMeme().bottom
    }
  }

  render() {
    return (
      <div>
        {this.props.editMemeId ? this.renderEditForm() : this.renderNewForm()}
      </div>

    )
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state))
  }

  handleNewSubmit = (e) => {
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

  handleEditSubmit = (e, id) => {
    e.preventDefault()

    fetch(`http://localhost:3000/created_memes/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.editTitle,
        top: this.state.editTop,
        bottom: this.state.editBottom
      })
    })
    .then(resp => resp.json())
    .then(json => {
      this.props.reRenderEditedMemes(json)
    })
  }

  findEditMeme = () => {
    if (this.props.editMemeId){
      return this.props.allCreatedMemes.find(meme => meme.id === this.props.editMemeId)
    } else {
      return this.props.currentMeme
    }
  }

  renderNewForm = () => {
    return <div>
      <img src={this.props.currentMeme.image_url} width='400' height='300'/>
      <form onSubmit={this.handleNewSubmit}>
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
  }

  renderEditForm = () => {
    return <div>
        <img src={this.findEditMeme().image} width='400' height='300'/>
        <form onSubmit={(e) => this.handleEditSubmit(e, this.findEditMeme().id)}>
          <label> Title: </label>
            <input onChange={this.handleChange} type='text' name="editTitle" value={this.state.editTitle}></input>
          <label> Top Text: </label>
            <input onChange={this.handleChange} type='text' name="editTop" value={this.state.editTop}></input>
          <label> Bottom Text: </label>
            <input onChange={this.handleChange} type='text' name="editBottom" value={this.state.editBottom}></input>
            <button type='submit' value='Submit'>Save</button>
            <button onClick={this.props.handleCancelClick} value='Cancel'>Cancel</button>
        </form>
    </div>
  }



} //end of class
