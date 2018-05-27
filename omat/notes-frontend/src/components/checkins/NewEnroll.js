import React from 'react'
import PropTypes from 'prop-types'
import { Form, Header, Message, Transition, Divider } from 'semantic-ui-react'

/** All forms created from data of 'inputs'. */
const NewNumberForm = ({
  inputs, newEnroll,
  submit, change,
  notification, notificationShow,
  inputError }) => {

  return (
    <div>
      <Header size='large'>Check in</Header>
      <Form onSubmit={submit}>

        {inputs.map(formGroup => (
          <FormGroup key={formGroup[0].key} formGroup={formGroup} newEnroll={newEnroll} change={change} inputError={inputError} />
        ))
        }

        <Divider hidden />
        <Form.Button type="submit" primary>Check in</Form.Button>
        <Notification notification={notification} notificationShow={notificationShow} />
      </Form>
    </div>
  )
}

const Notification = ({ notification, notificationShow }) => {

  const notificationObj = notification || {}
  const pos = notificationObj.type === 'positive'
  const neg = notificationObj.type === 'negative'

  return (
    <Transition visible={notificationShow} Transition={'slide down'} >
      < Message positive={pos} negative={neg} >
        <Message.Header> {notificationObj.header} </Message.Header>
        {notificationObj.text}
      </Message >
    </Transition>
  )
}

/** Forms in same line */
const FormGroup = ({ formGroup, newEnroll, change, inputError }) => (
  <Form.Group widths='equal' >
    {
      formGroup.map(form => {
        switch (form.type) {
          case 'Input':
            return <FormInput key={form.key} form={form} newEnroll={newEnroll} change={change} inputError={inputError} />
          case 'Checkbox':
            return <Checkbox key={form.key} form={form} newEnroll={newEnroll} change={change} inputError={inputError} />
          default: 
            console.error('Invalid type:', form.type)
            return null
        }
      })
    }
  </Form.Group >
)

/** Defaul checkbox */
const Checkbox = ({ form, newEnroll, change, inputError }) => {
  const checked = newEnroll[form.key] || false

  return (
    <Form.Checkbox
      label={form.text}
      checked={checked}
      onClick={() => change(form.key, !checked)}
      error={inputError && checked === false}
    />
  )

}

/** Default input field */
const FormInput = ({ form, newEnroll, change, inputError }) => {
  const value = newEnroll[form.key] || ''
  const placeholder = form.placeholder || form.text

  return (
    <Form.Input
      label={form.text}
      name={form.text}
      value={value}
      placeholder={placeholder}
      onChange={(event) => change(form.key, event.target.value)}
      error={inputError && value === ''}
    />)
}

NewNumberForm.propTypes = {
  inputs: PropTypes.array.isRequired,
  newEnroll: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  notification: PropTypes.object,
  inputError: PropTypes.bool
}

export default NewNumberForm