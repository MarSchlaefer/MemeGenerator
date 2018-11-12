import React, { Component } from 'react';

export default class ListDisplay extends Component {

  render() {
    return (
      <div>
        <select onChange={this.props.handleSelectChange} >
          <option value='original-images'>Original Images</option>
          <option value='created-memes'>Created Memes</option>
        </select>
      </div>
    )
  }



} // end of class
