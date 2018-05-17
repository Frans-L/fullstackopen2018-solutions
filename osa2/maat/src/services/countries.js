import axios from 'axios'

const baseUrl = 'https://restcountries.eu/rest/v2/all'

/** Returns all countries. */
const getAll = () => (
    axios
        .get(baseUrl)
        .then(response =>
            response.data
        )
)

export default { getAll }