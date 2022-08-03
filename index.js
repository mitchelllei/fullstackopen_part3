const express = require('express')
const app = express()

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



app.get('/', (request, response) => {
    response.send(JSON.stringify(persons))
  })
  
app.get('/api/persons', (request, response) => {
    response.end(JSON.stringify(persons))
  })

  app.get('/info', (request, response) => {
    var timeStamp = new Date(Date.now());
   
    response.send(`<li> ${timeStamp.toUTCString()} </li>
     <li>${persons.length} entries in phonebook </li>`)
  })

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })