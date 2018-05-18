import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(r => {
        console.log(r.data)
        return r.data
    })
}

const create = (newOne) => {
    const request = axios.post(baseUrl, newOne)
    return request.then(r => r.data)
}

const remove = (index) => {
    const request = axios.delete(baseUrl + '/' + index)
    return request.then(r => r.data)
}

const update = (updated) => {
    const request = axios.put(baseUrl + '/' + updated.id, updated)
    return request.then(r => r.data)
}

export default { getAll, create, remove, update }