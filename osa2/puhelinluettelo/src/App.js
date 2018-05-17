import React from 'react'

import './index.css'
import noteService from './services/persons'
import Numbers from './components/Numbers'
import FiltertNumbers from './components/FilterNumbers'
import NewNumberForm from './components/NewNumberForm'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newPerson: { name: '', number: '' },
      filter: '',
      notification: null
    }
  }

  //loads data
  componentDidMount() {
    noteService.getAll()
      .then(persons => {
        this.setState({ persons })
      })
  }

  //adds new person
  newPerson = (event) => {
    event.preventDefault()

    const person = {
      name: this.state.newPerson.name,
      number: this.state.newPerson.number
    }

    if (!this.state.persons.map(p => p.name).includes(this.state.newPerson.name)) {
      //adds new person
      noteService.create(person)
        .then(person => {
          this.setState({
            persons: this.state.persons.concat(person),
            newPerson: { name: '', number: '' },
            notification: 'Henkilö lisättiin onnistuneesti.'
          })

          //animation 
          setTimeout(() => {
            this.setState({ notification: null })
          }, 2000)

        })

    } else {
      //updates old number to new one
      if (window.confirm('Päivitetäänkö ' + person.name + '?')) {
        const i = this.state.persons.map(p => p.name).indexOf(person.name)
        const updatedPersons = [...this.state.persons]
        updatedPersons[i].number = person.number
        noteService.update(updatedPersons[i])
          .then(person => {
            this.setState({
              persons: updatedPersons,
              notification: 'Henkilö päivitettiin onnistuneesti.'
            })

            //animation 
            setTimeout(() => {
              this.setState({ notification: null })
            }, 2000)
          })
          .catch(error => {
            alert("Henkilöä ei ole enää olemassa!")
            noteService.getAll()
            .then(persons => {
              this.setState({ persons })
            })
          })
      }
    }

  }

  //updates changed data
  newPersonChange = (event) => {
    let person = { ...this.state.newPerson }
    person[event.target.name] = event.target.value
    this.setState({ newPerson: person })
  }

  //updates filter
  filterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  //retruns filtered persons
  getPersons = () => (
    this.state.persons.filter(p => p.name.toLowerCase().includes(this.state.filter.toLowerCase()))
  )

  //deletes a person
  deletePerson = (event) => {
    if (window.confirm('Poistetaanko ' + event.target.name + '?')) {
      const id = event.target.id
      noteService.remove(id)
        .then(data => {
          this.setState(
            {
              persons: this.state.persons.filter(p => Number(p.id) !== Number(id)),
              notification: 'Henkilö poistetiin onnistuneesti.'
            }
          )

          //animation 
          setTimeout(() => {
            this.setState({ notification: null })
          }, 2000)
        })
    }
  }


  //renders everything
  render() {
    return (
      <div>
        <Notification message={this.state.notification} />
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