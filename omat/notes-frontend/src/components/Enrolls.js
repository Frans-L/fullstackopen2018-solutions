import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Filter from './Filter'
import { Table, Header } from 'semantic-ui-react'
import ITable from './ITable'


/** Shows the all enrolls with filter. */
class Enrolls extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      select: Object.keys(props.columns)[0]
    }
  }

  //returns filtered data
  filteredData = () => (
    this.props.data.filter(d => d[this.state.select].toLowerCase().includes(this.state.filter.toLowerCase()))
  )

  //updates filter
  inputOnChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  //updates filter
  selectOnChange = (event, data) => {
    this.setState({ select: data.value })
  }

  render() {
    return (
      <div>
        <Header size='large'> All check-ins </Header>
        <Filter
          input={this.state.filter}
          select={this.state.select}

          inputOnChange={this.inputOnChange}
          selectOnChange={this.selectOnChange}

          columns={this.props.columns}
          placeholder={this.props.columns[this.state.select]}
        />
        <ITable
          data={this.filteredData()}
          columns={this.props.columns}
          deleteAction={this.props.deleteAction} />
      </div >
    )
  }

}

Enrolls.propTypes = {
  columns: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  deleteAction: PropTypes.func.isRequired
}


export default Enrolls