import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  setFilter = ({ target: { value } }) => {
    this.setState({ filters: { type: value } });
  };

  findPets = () => {

    if (this.state.filters.type === 'all'){
    fetch('/api/pets')
    .then(resp => resp.json())
    .then(json => this.setState({pets: json}));
    } else {

    fetch('/api/pets?type=' + `${this.state.filters.type}`)
    .then(resp => resp.json())
    .then(json => this.setState({pets: json}));
    }
  }

  adoptPet = (id) => {
    const pets = this.state.pets.map(p => {
      return p.id === id ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets: pets });
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
            <Filters onChangeType={this.setFilter} onFindPetsClick={this.findPets}/>
            </div>
            <div className="twelve wide column">
            <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
