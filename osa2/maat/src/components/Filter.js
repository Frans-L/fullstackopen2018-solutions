import React from 'react'

const Filter = ({ value, onChange }) => (
    <div>
        Find countries: <input onChange={onChange} value={value} />
    </div>
)


export default Filter