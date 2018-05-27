import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

const Filter = ({
  columns,
  inputOnChange, selectOnChange,
  select, input
}) => {

  const options = columns.map(col => ({ key: col.key, text: col.text, value: col.key }))

  return (
    <Form>
      <Form.Group>
        <Form.Input fluid label='Filter'
          value={input} onChange={inputOnChange}
          placeholder={select.text} width={12} />
        <Form.Select fluid label='by'
          value={select.key} onChange={selectOnChange}
          options={options} width={4} />
      </Form.Group>
    </Form>
  )
}

Filter.propTypes = {
  columns: PropTypes.array.isRequired,
  inputOnChange: PropTypes.func.isRequired,
  selectOnChange: PropTypes.func.isRequired,
  select: PropTypes.object.isRequired,
  input: PropTypes.string.isRequired
}

export default Filter