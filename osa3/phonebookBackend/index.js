const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const PersonModel = require('./models/person')

const app = express()

//logger
morgan.token('reqdata', (req) => (JSON.stringify(req.body)))
const morganOutput = ':method :url :reqdata :status :res[content-length] - :response-time ms'

//middlewares
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan(morganOutput))

//info
app.get('/info', (req, res) => {
  let time = new Date()

  PersonModel
    .count({})
    .then((amount) => {
      res.send(
        'Puhelinluettelossa on '
                + amount + ' henkilön tiedot.' +
                '<br><br>' + time
      )
    })
    .catch(error404)
})

//get all persons
app.get('/api/persons', (req, res) => {
  PersonModel
    .find({}, { __v: 0 })
    .then(p => {
      res.json(p.map(PersonModel.format))
    })
    .catch(error404)
})

//get a person
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id

  PersonModel
    .findById(id, { __v: 0 })
    .then(p => {
      res.json(PersonModel.format(p))
    })
    .catch(error404)
})

//delete a person
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  PersonModel
    .findByIdAndRemove(id)
    .then(() => { //if found or not found
      res.status(204).end()
    })
    .catch(error404)
})

//update a person
app.put('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const body = req.body

  if (body.name === undefined || body.number === undefined) return res.status(400).json({ error: 'Content missing' })

  PersonModel
    .findByIdAndUpdate(id, body, { new: true })
    .then((found) =>
      res.json(PersonModel.format(found))
    )
    .catch(error404)

})

//add a person
app.post('/api/persons', async (req, res) => {
  const body = req.body

  if (body.name === undefined || body.number === undefined) return res.status(400).json({ error: 'Content missing' })

  const person = new PersonModel({
    name: body.name,
    number: body.number
  })

  let alreadyExists = await PersonModel
    .findOne({ name: body.name })
    .then((found) => found)

  if (alreadyExists) res.status(405).end()
  else {
    person
      .save()
      .then(saved => {
        res.json(PersonModel.format(saved))
      })
      .catch(error404)
  }

})

const error404 = (res) => {
  res.status(404).end()
}
//start listening
const port = 3001
app.listen(port, () => {
  console.log('Server running on port ' + port)
})