import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(r => r.data)
}

const create = (newOne) => {
    const request = axios.post(baseUrl, newOne)
    return request.then(r => r.data)
}

const remove = (index) => {
    const request = axios.delete(baseUrl + '/' + index)
    return request.then(r => r.data)
}

export default { getAll, create, remove }