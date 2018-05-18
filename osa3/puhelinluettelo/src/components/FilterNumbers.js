import React from 'react'

const FilterNumbers = ({ change }) => (
    <div>
        Rajaa näytettäviä: <input onChange={change} />
    </div>
)

export default FilterNumbers