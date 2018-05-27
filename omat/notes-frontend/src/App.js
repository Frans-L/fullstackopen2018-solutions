import React, { Component } from 'react'

import CheckIns from './components/CheckIns'

/** All input fields */
const AllInputs = [
  [
    { key: 'fName', text: 'First Name', type: 'Input' },
    { key: 'mName', text: 'Middle Name', type: 'Input', hidden: true },
    { key: 'lName', text: 'Last Name', type: 'Input' },
  ],
  [
    { key: 'number', text: 'Phone Number', placeholder: '+358 40 1234567', type: 'Input' },
    { key: 'numberWork', text: 'Work Number', placeholder: '+358 40 1234567', type: 'Input' }
  ],
  [{ key: 'email', text: 'Email', placeholder: 'example@mail.com', type: 'Input' }],
  [
    { key: 'terms', text: 'I agree to the Terms And Conditions', type: 'Checkbox', mustBe: true, hidden: true },
    { key: 'cat', text: 'I am a cat ', type: 'Checkbox', mustBe: true, hidden: true }
  ]
]

/** The main component */
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputs: AllInputs, //inputs that are shown
    }
  }

  shuffleInputs = () => {
    const inputs =
      AllInputs.map(group =>
        group.map(form => (Math.random() > 0.33 ? form : null)).filter(f => f))
        .filter(g => g.length > 0)

    this.setState({
      inputs: inputs
    })
  }

  //renders everything
  render() {
    return (
      <CheckIns inputs={this.state.inputs} shuffle={this.shuffleInputs} />
    )
  }

}

export default App