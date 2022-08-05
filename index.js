const express = require('express')
const app = express()
app.use(express.json())

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

app.post('/api/persons',(request,response) => {
    const generateId = () => {
        const maxId = persons.length > 0 
        ? Math.max(...persons.map(n=> n.id))
        : 0
        return maxId +1
    }
    
    const body1 = request.body
    console.log("Body is ",body1)
    if (!body1.false) {
        return response.status(400).json({
            error: `Content missing ${body1}`
        })
    } else {
    const person = {
        name: request.body.name,
        number: request.body.number,
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    }
    persons = persons.concat(person)
    console.log(person)
    response.json(person)
}
  })

app.get('/', (request, response) => {
    response.json(persons)
    
  })
 
app.get('/api/persons', (request, response) => {
    response.end(JSON.stringify(persons))
  })

  app.get('/info', (request, response) => {
    var timeStamp = new Date(Date.now()).toLocaleString();
   
    response.send(`<li> ${timeStamp} </li>
     <li>${persons.length} entries in phonebook </li>`)
     
  })

  app.get('/api/persons/:id',(request,response)=> {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person =>{
        console.log(person.id, typeof person.id, id, typeof id, person.id===id)
        return person.id === id
    })
    if (person) {
        response.send(person)
        console.log(person)
       
    } else {
        response.status(404).end()
    }
    
    
  })

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })

  

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  