import React, { Component } from 'react';

export default class Instructions extends Component {

  render() {
    return (
      <div>
      {!this.props.deleteClicked ?
        <div>
           <h1>Instructions</h1>
          <ol className="instructions-item">
            <li>Pick your meme background</li>
            <li>Create your meme</li>
            <li>Make everyone laugh!</li>
          </ol>
        </div>
        : <h1>Meme wasn't funny enough? It's okay, we deleted it.</h1>
      }
        </div>
    )
  }
}
