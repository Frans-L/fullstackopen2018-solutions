import React, { Component } from 'react';
import countryService from './services/countries'
import CountryInfo from './components/CountryInfo'
import './app.css'
import Filter from './components/Filter';

class App extends Component {

  constructor() {
    super()
    this.state = {
      countries: [],
      filter: '',
      selected: null
    }
  }

  componentDidMount() {
    countryService.getAll()
      .then(data =>
        this.setState({ countries: data })
      )
  }

  filterOnChange = (event) => {
    this.setState({
      filter: event.target.value,
      selected: null
    })
  }

  filteredCountries = () => {
    if (this.state.selected !== null) { //shows only selected
      return this.state.countries.filter(
        c => c.name.toLowerCase() === this.state.selected.toLowerCase())
    } else { //uses filter
      return this.state.countries.filter(
        c => c.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    }

  }

  onSelect = (name) => {
    this.setState({
      filter: name,
      selected: name
    })
  }

  render() {
    return (
      <div className="App">
        <Filter
          value={this.state.filter}
          onChange={this.filterOnChange} />
        <CountryInfo
          data={this.filteredCountries()}
          onSelect={this.onSelect} />
      </div>
    );
  }

}

export default App;
