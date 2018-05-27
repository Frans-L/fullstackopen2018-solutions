import React, { Component } from 'react'

//import './index.css'
import noteService from './services/enrolls'
import Enrolls from './components/Enrolls'
import NewEnroll from './components/NewEnroll'

import './semantic/dist/semantic.min.css'
import { Container, Divider, Segment } from 'semantic-ui-react'


const notificationTime = 4000

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enrolls: [],

      columns: [
        { key: 'fName', text: 'First Name' },
        { key: 'lName', text: 'Last Name' },
        { key: 'number', text: 'Number' },
        { key: 'email', text: 'Email' }
      ],

      inputs: [
        [
          { key: 'fName', text: 'First Name', type: 'Input' },
          { key: 'lName', text: 'Last Name', type: 'Input' },
        ],
        [{ key: 'number', text: 'Phone Number', placeholder: '+358 40 1234567', type: 'Input' }],
        [{ key: 'email', text: 'Email', placeholder: 'example@mail.com', type: 'Input' }],
        [{ key: 'terms', text: 'I agree to the Terms And Conditions', type: 'Checkbox', mustBe: true }]
      ],

      newEnroll: {},

      notificationShow: false,
      notification: {},

      inputError: false

    }
  }

  //loads data
  componentDidMount() {
    noteService.getAll()
      .then(enrolls => {
        this.setState({
          enrolls: enrolls,
        })
      })
  }

  //adds new enroll
  newEnroll = (event) => {
    event.preventDefault()

    const enroll = {}
    let inputErrors = false

    var inputs = [].concat.apply([], this.state.inputs)

    inputs.forEach(c => {
      const value = this.state.newEnroll[c.key]
      if (value === undefined || value === '' || (c.mustBe && c.mustBe !== value)) inputErrors = true
      else enroll[c.key] = value
    })

    if (!inputErrors) { //data is valid
      noteService.create(enroll)
        .then(enroll => {
          this.setState({
            enrolls: this.state.enrolls.concat(enroll),
            newEnroll: {},
            inputError: false
          })
          this.showNotification('positive', 'Success', 'The check-in has been saved succesfully.')
        })

    } else { //errors in input
      this.setState({ inputError: true })
      this.showNotification('negative', 'Failed', 'Please, fill every input field.')
    }
  }

  //updates changed data
  newPersonChange = (key, value) => {
    let enroll = { ...this.state.newEnroll }
    enroll[key] = value
    this.setState({ newEnroll: enroll })
  }

  //deletes a enroll
  deletePerson = (event, id) => {
    noteService.remove(id)
      .then(() => {
        this.setState({
          enrolls: this.state.enrolls.filter(p => p.id !== id),
          inputError: false
        })
        this.showNotification('positive', 'Success', 'The check-in has been removed succesfully.')
      })
  }

  showNotification = (type, header, text) => {
    this.setState({
      notification: { type: type, header: header, text: text },
      notificationShow: true
    })

    //animation 
    setTimeout(() => {
      this.setState({ notificationShow: false })
    }, notificationTime)
  }

  //renders everything
  render() {
    return (
      <Container>
        <Segment>
          <NewEnroll
            newEnroll={this.state.newEnroll} submit={this.newEnroll}
            change={this.newPersonChange} inputs={this.state.inputs}
            notification={this.state.notification}
            notificationShow={this.state.notificationShow}
            inputError={this.state.inputError} />
        </Segment>
        <Divider hidden />
        <Segment>
          <Enrolls
            columns={this.state.columns} data={this.state.enrolls}
            deleteAction={this.deletePerson} />
        </Segment>
      </Container>
    )
  }
}

export default App