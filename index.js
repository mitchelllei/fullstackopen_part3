const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
// tiny output + other data


app.use(morgan(function (tokens, request, response) {
    if (request.method === "POST") {
        return JSON.stringify(request.body)
          
     } else {
    return [
      tokens.method(request, response),
      tokens.url(request, response),
      tokens.status(request, response),
      tokens.res(request, response, 'content-length'), '-',
      tokens['response-time'](request, response), 'ms'
      
    ]
}
  }))
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
    
    const contentReceived = request.body
    console.log("Body is ",contentReceived)
    if (!contentReceived) {
        return response.status(400).json({
            error: `Content missing ${contentReceived}`
        })
    } 
    else if(!contentReceived.name || !contentReceived.number) {
        return response.status(400).json({
            error: "name or number is missing"
        })
    }

    else if(persons.map(person => person.name).includes(contentReceived.name)){
        return response.status(400).json({
            error: "name is already in phonebook"
        })
    }
    else {
    const person = {
        name: request.body.name,
        number: request.body.number,
        id: Math.floor(Math.random() * 100000000000000)
    }
    persons = persons.concat(person)
    console.log(person)
    response.json(person)
    morgan.token('data', (request) => {
        return JSON.stringify(request.body)
    })
    
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

  