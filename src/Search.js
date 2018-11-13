import React, { Component } from 'react';

export default class Search extends Component {

  render() {
    return (
      <div>
        <input type='text' name='searchValue' value={this.props.searchValue} placeholder="Search memes..." onChange={this.props.setSearchValue}/>
      </div>
    )
  }

}// end of class
