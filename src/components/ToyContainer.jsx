import React, { Component } from 'react';
import ToyCard from './ToyCard'

class ToyContainer extends Component {
  render() {
    return(
      <div id="toy-collection">
        {this.props.toys.map( toy => <ToyCard incrementLikes={this.props.incrementLikes} deleteToy={this.props.deleteToy} key={toy.name} toy={toy} /> )}
      </div>
    )
  }
}

export default ToyContainer;
