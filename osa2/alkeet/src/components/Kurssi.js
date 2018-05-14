import React from 'react'

const Otsikko = ({ kurssi }) => (
    <h1>{kurssi}</h1>
)

const Sisalto = ({ osat }) => (
    osat.map((osa) => <Osa key={osa.nimi} osa={osa.nimi} tehtava={osa.tehtavia} />)
)

const Osa = ({ osa, tehtava }) => (
    <p>{osa} {tehtava}</p>
)


const Yhteensa = ({ osat }) => (
    <p>yhteensä {osat.reduce((total, osa) => total + osa.tehtavia, 0)} tehtävää</p>
)

const Kurssi = ({ kurssi }) => {

    return (
        <div>
            <Otsikko kurssi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

export default Kurssi