import React, { Component } from 'react'
import PropTypes from 'prop-types'

import noteService from '../services/enrolls'
import Enrolls from './checkins/Enrolls'
import NewEnroll from './checkins/NewEnroll'

import { Container, Divider, Segment, Label } from 'semantic-ui-react'

const notificationDuration = 4000 //show duration

class CheckIns extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enrolls: [], //the data

      newEnroll: {}, //the data of the check-in form
      inputError: false, //show the invalid fields

      notificationShow: false,
      notification: {} //notification info

    }
  }

  //loads data when component ready
  componentDidMount() {
    noteService.getAll()
      .then(enrolls => {
        this.setState({
          enrolls: enrolls,
        })
      })
  }

  //adds new enroll aka check in
  newEnroll = (event) => {
    event.preventDefault()

    const enroll = {} //will be filled with the data of the each input field
    const inputs = [].concat.apply([], this.props.inputs)
    let inputErrors = false

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
      this.showNotification('negative', 'Failed', 'Please, fill each input field.')
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

  //shows notification
  showNotification = (type, header, text) => {
    this.setState({
      notification: { type: type, header: header, text: text },
      notificationShow: true
    })

    setTimeout(() => {
      this.setState({ notificationShow: false })
    }, notificationDuration)
  }

  //returns the columns which will be showed at table
  getColumns = () => {
    const inputs = [].concat.apply([], this.props.inputs)
    return inputs.filter(i => !i.hidden)
  }


  //renders everything
  render() {
    return (
      <Container>
        <Divider hidden />
        <Segment>
          <Label color={'blue'} corner={'right'} icon={'shuffle'} size={'large'} as='a' onClick={this.props.shuffle} />
          <NewEnroll
            newEnroll={this.state.newEnroll} submit={this.newEnroll}
            change={this.newPersonChange} inputs={this.props.inputs}
            notification={this.state.notification}
            notificationShow={this.state.notificationShow}
            inputError={this.state.inputError} />
        </Segment>
        <Divider hidden />
        <Segment>
          <Enrolls
            columns={this.getColumns()} data={this.state.enrolls}
            deleteAction={this.deletePerson} />
        </Segment>
      </Container>
    )
  }

}

CheckIns.propTypes = {
  inputs: PropTypes.array.isRequired,
  shuffle: PropTypes.func.isRequired,
}

export default CheckIns