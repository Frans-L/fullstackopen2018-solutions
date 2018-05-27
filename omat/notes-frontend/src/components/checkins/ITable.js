import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ITable.css'
import { Table, Icon } from 'semantic-ui-react'

class ITable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rowHover: null
    }
  }

  mouseLeaveTable = () => {
    this.setState({ rowHover: null })
  }

  mouseOverRow = (event, id) => {
    this.setState({ rowHover: id })
  }

  render() {
    return (
      <Table compact striped>
        <Table.Header>
          <HeaderRow columns={this.props.columns} />
        </Table.Header>
        <Table.Body onMouseLeave={this.mouseLeaveTable}>
          {this.props.data.map(row =>
            <Row key={row.id}
              id={row.id}
              dataRow={row}
              props={this.props}
              onMouseOver={this.mouseOverRow}
              showSettings={row.id === this.state.rowHover}
            />
          )}
        </Table.Body>
      </Table>
    )
  }

}


const Row = ({ id, props, dataRow, onMouseOver, showSettings }) => {
  return (
    <Table.Row onMouseOver={(event) => onMouseOver(event, id)}>
      {props.columns.map(
        col => <Table.Cell key={dataRow.id + col.key}>{dataRow[col.key]}</Table.Cell>)}

      <Table.Cell>
        <Icon name='trash' link circular
          className={showSettings ? '' : 'own-hidden'}
          onClick={(event) => props.deleteAction(event, id)}
        />
      </Table.Cell>

    </Table.Row>
  )
}

const HeaderRow = ({ columns }) => {
  return (
    <Table.Row>
      {
        columns.map(col =>
          (<Table.HeaderCell key={'HeaderRow' + col.key}>{col.text}</Table.HeaderCell>)
        )
      }
      <Table.HeaderCell collapsing width={1}> </Table.HeaderCell>
    </Table.Row>
  )
}


ITable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  deleteAction: PropTypes.func.isRequired
}

Row.propTypes = {
  id: PropTypes.string.isRequired,
  props: PropTypes.object.isRequired,
  dataRow: PropTypes.object.isRequired,
  showSettings: PropTypes.bool.isRequired
}

HeaderRow.propTypes = {
  columns: PropTypes.array.isRequired
}

export default ITable