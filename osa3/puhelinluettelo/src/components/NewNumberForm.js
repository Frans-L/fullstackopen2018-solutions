import React from 'react'

const NewNumberForm = ({ person, submit, change }) => {

    return (
        <form onSubmit={submit}>
            <div>
                nimi: <input name='name' value={person.name} onChange={change} />
            </div>
            <div>
                numero: <input name='number' value={person.number} onChange={change} />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

export default NewNumberForm;