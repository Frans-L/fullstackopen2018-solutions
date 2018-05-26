import React from 'react'
import PropTypes from 'prop-types'

import { Table } from 'semantic-ui-react'

const ITable = ({ data, columns, deleteAction }) => (
  <Table striped celled>
    <Table.Header>
      <HeaderRow columns={columns} />
    </Table.Header>
    <Table.Body>
      {data.map(row =>
        <Row key={row.id} columns={columns} dataRow={row} deleteAction={deleteAction} />
      )}
    </Table.Body>
  </Table>
)

const Row = ({ columns, dataRow, deleteAction }) => (
  <Table.Row>
    {
      Object.keys(columns).map(
        col => <Table.Cell key={dataRow.id + col}>{dataRow[col]}</Table.Cell>)
    }
    {/*<Table.Cell><button id={dataRow.id} name={dataRow.name} onClick={deleteAction}>Poista</button></Table.Cell>*/}
  </Table.Row>
)

const HeaderRow = ({ columns }) => {
  return (
    <Table.Row>
      {
        Object.values(columns).map(col =>
          (<Table.HeaderCell key={'HeaderRow' + col}>{col}</Table.HeaderCell>)
        )
      }
    </Table.Row>
  )
}


ITable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
  deleteAction: PropTypes.func.isRequired
}

Row.propTypes = {
  columns: PropTypes.object.isRequired,
  dataRow: PropTypes.object.isRequired,
  deleteAction: PropTypes.func.isRequired
}

HeaderRow.propTypes = {
  columns: PropTypes.object.isRequired
}

export default ITable