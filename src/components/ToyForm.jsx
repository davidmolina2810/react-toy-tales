import React, { Component } from 'react';

class ToyForm extends Component {
  constructor() {
    super() 
    this.state = {
      name: '',
      image: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  sendData = (e) => {
    this.props.addToy(e, this.state.name, this.state.image)
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={e => this.sendData(e)}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" value={this.state.name} onChange={this.handleChange}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" value={this.state.image} onChange={this.handleChange}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
