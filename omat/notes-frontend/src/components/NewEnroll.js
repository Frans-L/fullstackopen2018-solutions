import React from 'react'
import { Container, Form, Header } from 'semantic-ui-react'

const NewNumberForm = ({ person, submit, change }) => {

  return (
    <div>
      <Header size='large'>Check in</Header>
      <Form onSubmit={submit}>
        <Form.Input label='Name' name='name' value={person.name} onChange={change} />
        <Form.Input label='Number' name='number' value={person.number} onChange={change} />
        <Form.Button type="submit">Check in</Form.Button>
      </Form>
    </div>
  )
}

export default NewNumberForm