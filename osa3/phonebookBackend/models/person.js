
const mongoose = require('mongoose')
require('dotenv').config() //global variables from env files

const url = process.env.DB_URL
const conn = mongoose.connect(url)

conn.catch(error => { //connection fails
    console.log('Yhdistäminen epäonnistui: \n')
    console.log(error)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.statics.format = (person) => (
    {
        name: person.name,
        number: person.number,
        id: person._id
    }
)

const PersonModel = mongoose.model('Person', personSchema)

module.exports = PersonModel