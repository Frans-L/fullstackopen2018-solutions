import React, { Component } from 'react'

//import './index.css'
import noteService from './services/persons'
import Enrolls from './components/Enrolls'
import NewEnroll from './components/NewEnroll'
import Notification from './components/Notification'

import './semantic/dist/semantic.min.css'
import { Container, Divider } from 'semantic-ui-react'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [{ id: '1', name: 'Test', number: '0440' }],
      newPerson: { id: '', name: '', number: '' },
      columns: { name: 'Name', number: 'Number' },
      notification: null
    }
  }

  //loads data
  /*
  componentDidMount() {
    noteService.getAll()
      .then(persons => {
        this.setState({ persons })
      })
  }
  */

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
          .then(() => {
            this.setState({
              persons: updatedPersons,
              notification: 'Henkilö päivitettiin onnistuneesti.'
            })

            //animation 
            setTimeout(() => {
              this.setState({ notification: null })
            }, 2000)
          })
          .catch(() => {
            alert('Henkilöä ei ole enää olemassa!')
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

  //deletes a person
  deletePerson = (event) => {
    if (window.confirm('Poistetaanko ' + event.target.name + '?')) {
      const id = event.target.id
      noteService.remove(id)
        .then(() => {
          this.setState(
            {
              persons: this.state.persons.filter(p => p.id !== id),
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
      <Container>
        <Notification message={this.state.notification} />
        <NewEnroll person={this.state.newPerson} submit={this.newPerson} change={this.newPersonChange} />
        <Divider hidden />
        <Enrolls columns={this.state.columns} data={this.state.persons} deleteAction={this.deletePerson} />
      </Container>
    )
  }
}

export default App