import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = ({ kurssi }) => (
    <h1>{kurssi}</h1>
)

const Sisalto = ({ osat }) => (
    osat.map((osa) => <Osa osa={osa.nimi} tehtava={osa.tehtavia} />)
)

const Osa = ({ osa, tehtava }) => (
    <p>{osa} {tehtava}</p>
)


const Yhteensa = ({ osat }) => (
    <p>yhteensä {osat.reduce((total, osa) => total + osa.tehtavia, 0)} tehtävää</p>
)


const App = () => {

    const kurssi = 'Half Stack -sovelluskehitys'
    const osat = [
        {
            nimi: 'Reactin perusteet',
            tehtavia: 10
        },
        {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
        },
        {
            nimi: 'Komponenttien tila',
            tehtavia: 14
        }
    ]


    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto osat={osat} />
            <Yhteensa osat={osat} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)