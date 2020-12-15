import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/toys")
    .then( res => res.json() )
    .then( toys => {
      this.setState({
        toys: toys
      })
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addToyToState = (e, name, image) => {
    e.preventDefault() 
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
          'Content-Type' : 'application/json',
          Accept: 'application/json'
      },
      body: JSON.stringify(
        {name: name,
        image: image}
      )
    })
    .then(resp => resp.json())
    .then(toy => {
      const newToys = [...this.state.toys, toy]
      this.setState({
        display: !this.state.display,
        toys:newToys
      })
    })
    e.target.reset()
  }

  deleteToyFromState = (id) => {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE"
    })
    .then( res => res.json() )

    const newToys = [...this.state.toys].filter( toy => toy.id !== id)
    this.setState({
      toys: newToys
    })
  }
  
  incrementLikesToState = (id) => {
    const toy = this.state.toys.find( toy => toy.id === id)
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type' : 'application/json',
        Accept: 'application/json'
    },
      body: JSON.stringify({ likes: toy.likes + 1})
    })
    .then(resp => resp.json())
    const newToys = this.state.toys.map( toy => {
      return toy.id === id ? {...toy, likes: toy.likes + 1} : toy
    })
    this.setState({
      toys: newToys
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToy={this.addToyToState}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer incrementLikes={this.incrementLikesToState} deleteToy={this.deleteToyFromState} toys={this.state.toys} />
      </>
    );
  }

}

export default App;
