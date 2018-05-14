import React from 'react'

const NumberRow = ({ person, deleteAction }) => (
    <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td><button id={person.id} name={person.name} onClick={deleteAction}>Poista</button></td>
    </tr>
)

const Numbers = ({ persons, deleteAction }) => (
    <table>
        <tbody>
            {persons.map(p => <NumberRow key={p.name} person={p} deleteAction={deleteAction} />)}
        </tbody>
    </table >
)

export default Numbers