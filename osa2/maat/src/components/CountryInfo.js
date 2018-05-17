import React from 'react'


const TextLine = ({ definition, value }) => (
    <div>
        {definition}: {value}
    </div>
)

const Info = ({ map }) => (
    <div>
        <h2> {map.name} </h2>
        <TextLine definition='Capital' value={map.capital} />
        <TextLine definition='Population' value={map.population} />
        <br />
        <img src={map.flag} alt='The flag' width='300px' />
    </div>
)

const List = ({ values, onSelect }) => (
    <ul>
        {values.map(v => <li key={v} onClick={() => onSelect(v)}> {v} </li>)}
    </ul>
)

const CountryInfo = ({ data, onSelect }) => {

    if (data.length === 1) { //show info of the country
        return (
            <Info map={data[0]} />
        )
    } else if (data.length <= 10) { //list of countries
        return (
            <List values={data.map(d => d.name)} onSelect={onSelect} />
        )
    } else { //too many matches
        return <div> Too many matches. Specify your filter.</div>
    }


}

export default CountryInfo