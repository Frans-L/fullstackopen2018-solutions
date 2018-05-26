import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

const Filter = ({
  columns,
  inputOnChange, selectOnChange,
  select, input
}) => {

  const options = Object.entries(columns).map(([k, t]) => ({ key: k, text: t, value: k }))

  return (
    <Form>
      <Form.Group>
        <Form.Input fluid label='Filter'
          value={input} onChange={inputOnChange}
          placeholder={columns[select]} width={12} />
        <Form.Select fluid label='by'
          value={select} onChange={selectOnChange}
          options={options} width={4} />
      </Form.Group>
    </Form>
  )
}

Filter.propTypes = {
  columns: PropTypes.object.isRequired,
  inputOnChange: PropTypes.func.isRequired,
  selectOnChange: PropTypes.func.isRequired,
  select: PropTypes.string.isRequired,
  input: PropTypes.string.isRequired
}

export default Filter