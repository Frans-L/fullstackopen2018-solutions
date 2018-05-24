
const mongoose = require('mongoose')
require('dotenv').config() //global variables from env files

const url = process.env.DB_URL
const conn = mongoose.connect(url)

const PersonModel = mongoose.model('Person', {
  name: String,
  number: String
})

conn.then(() => { //connection is successful

  if (process.argv.length === 4) addNewPerson()
  else showPeople()

}).catch(error => { //connection fails
  console.log('Yhdistäminen epäonnistui: \n')
  console.log(error)
})


/** Prints each person */
const showPeople = () => {
  PersonModel
    .find({})
    .then(result => {
      result.forEach(p => {
        console.log(p.name + ' ' + p.number)
      })
      mongoose.connection.close()
    })
}

/** Adds new person */
const addNewPerson = () => {
  const name = process.argv[2]
  const number = process.argv[3]

  const txt = 'Lisätään henkilö ' + name + ' numero ' + number + ' luetteloon.'
  console.log(txt)

  const person = new PersonModel({
    name: name,
    number: number
  })

  person
    .save()
    .then(() => {
      console.log('Lisätty onnistuneesti!')
      mongoose.connection.close()
    })
    .catch(error => {
      console.log(error)
    })

}


