const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

//logger
morgan.token('reqdata', (req) => (JSON.stringify(req.body)))
const morganOutput = ':method :url :reqdata :status :res[content-length] - :response-time ms'

//middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(morgan(morganOutput))

//temp data
let data = {
    persons: [
        {
            name: "Arto Hellas",
            number: "040-123456",
            id: 1
        },
        {
            name: "Martti Tienari",
            number: "040-123456",
            id: 2
        },
        {
            name: "Arto Järvinen",
            number: "040-123456",
            id: 3
        },
        {
            name: "Lea Kutvonen",
            number: "040-123456",
            id: 4
        }
    ]
}

//normal
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1')
})

//info
app.get('/info', (req, res) => {
    let time = new Date()
    let amount = data.persons.length
    res.send(
        'Puhelinluettelossa on '
        + amount + ' henkilön tiedot.' +
        '<br><br>' + time
    )
})

//get all persons
app.get('/api/persons', (req, res) => {
    res.json(data.persons)
})

//get a person
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = data.persons.find(p => p.id == id)
    if (person) res.json(person)
    else res.status(404).end()
})

//delete a person
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const newPersons = data.persons.filter(p => p.id != id)
    if (newPersons.length < data.persons.length) {
        data = { ...data, persons: newPersons }
        res.status(204).end()
    }
    else res.status(404).end()
})

//add a person
app.post('/api/persons', (req, res) => {
    const id = generateID()
    const body = req.body

    if (body.name !== undefined && body.number !== undefined) {
        const person = { ...body, id: id }
        if (data.persons.find(p => p.name === person.name) === undefined) {
            data.persons = data.persons.concat(person)
            res.json(person)

        } else res.status(400).json({ error: 'Person already exists' })
    } else res.status(400).json({ error: 'Content missing' })

})

//random id
const generateID = () => (
    Math.ceil(Math.random() * 1000000)
)

//start listening
const port = 3001
app.listen(port, () => {
    console.log('Server running on port ' + port)
})