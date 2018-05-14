import React from 'react'

import noteService from './services/persons'
import Numbers from './components/Numbers'
import FiltertNumbers from './components/FilterNumbers'
import NewNumberForm from './components/NewNumberForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newPerson: { name: '', number: ''},
      filter: ''
    }
  }

  componentDidMount() {
    noteService.getAll()
      .then(persons => {
        this.setState({ persons })
      })
  }

  newPerson = (event) => {
    event.preventDefault()
    if (!this.state.persons.map(p => p.name).includes(this.state.newPerson.name)) {
      const person = {
        name: this.state.newPerson.name,
        number: this.state.newPerson.number
      }

      noteService.create(person)
        .then(person => {
          this.setState({
            persons: this.state.persons.concat(person),
            newPerson: { name: '', number: '' }
          })
        })

    } else {
      alert("Henkilö on jo olemassa.")
    }

  }

  newPersonChange = (event) => {
    let person = { ...this.state.newPerson }
    person[event.target.name] = event.target.value
    this.setState({ newPerson: person })
  }

  filterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  getPersons = () => (
    this.state.persons.filter(p => p.name.toLowerCase().includes(this.state.filter.toLowerCase()))
  )

  deletePerson = (event) => {
    if(window.confirm('Poistetaanko ' + event.target.name + '?')){
      const id = event.target.id
      noteService.remove(id)
        .then(data => {
          this.setState(
            { persons: this.state.persons.filter(p => Number(p.id) !== Number(id)) }
          )
        })
    }
  }


  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <FiltertNumbers change={this.filterChange} />
        <h2>Lisää uusi</h2>
        <NewNumberForm person={this.state.newPerson} submit={this.newPerson} change={this.newPersonChange} />
        <h2>Numerot</h2>
        <Numbers persons={this.getPersons()} deleteAction={this.deletePerson} />
      </div>
    )
  }
}

export default App