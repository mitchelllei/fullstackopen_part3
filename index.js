if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

// const dotenv = require("dotenv");

// dotenv.config();


const morgan = require('morgan')
app.use(express.json())
app.use(requestLogger)
app.use(cors())
app.use(express.static('build'))


// tiny output + other data






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
  response.json(persons)
  
})

app.post('/api/persons', (request, response,next) => {
  const body1 = request.body

  if (body1.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  const person = new Person({
    name: request.body.name,
    number: Number(request.body.number),
  })
  person.save().then(savedNote => {
    response.json(savedNote)
  })
  .catch(error => next(error))
})

  
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })

  app.get('/info', (request, response) => {
    var timeStamp = new Date(Date.now()).toLocaleString();
   
    response.send(`<li> ${timeStamp} </li>
     <li>${persons.length} entries in phonebook </li>`)
     
  })

  app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
    // notes = notes.filter(note => note.id !== id)
  
  })
 
  app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
      if(person) {
        response.json(person)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
  })

  app.put('/api/persons/:id', (request, response, next) => {
    const body1 = request.body
  
    const updatePerson = {
      name: body1.name,
      number: body1.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, updatePerson, { new: true })
      .then(result => {
        response.json(result)
      })
      .catch(error => next(error))
  })
  
  
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
   } 
   else if (error.name === 'ValidationError') {
    return respponse.status(400).json({error: error.message})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })



  
// app.post('/api/persons',(request,response) => {
//     const generateId = () => {
//         const maxId = persons.length > 0 
//         ? Math.max(...persons.map(n=> n.id))
//         : 0
//         return maxId +1
//     } 
    
    
//     console.log("Body is ",contentReceived)
//     if (!contentReceived) {
//         return response.status(400).json({
//             error: `Content missing ${contentReceived}`
//         })
//     } 
//     else if(!contentReceived.name || !contentReceived.number) {
//         return response.status(400).json({
//             error: "name or number is missing"
//         })
//     }

//     else if(persons.map(person => person.name).includes(contentReceived.name)){
//         return response.status(400).json({
//             error: "name is already in phonebook"
//         })
//     }
//     else {
//     const person = {
//         name: request.body.name,
//         number: request.body.number,
//         id: Math.floor(Math.random() * 100000000000000)
//     }
//     persons = persons.concat(person)
//     console.log(person)
//     response.json(person)
//     morgan.token('data', (request) => {
//         return JSON.stringify(request.body)
//     })
    
// }

  // app.get('/api/persons/:id',(request,response)=> {
  //   const id = Number(request.params.id)
  //   console.log(id)
  //   const person = persons.find(person =>{
  //       console.log(person.id, typeof person.id, id, typeof id, person.id===id)
  //       return person.id === id
  //   })
  //   if (person) {
  //       response.send(person)
  //       console.log(person)
       
  //   } else {
  //       response.status(404).end()
  //   }
    
    
  // })

  // app.use(morgan(function (tokens, request, response) {
//     if (request.method === "POST") {
//         return JSON.stringify(request.body)
          
//      } else {
//     return [
//       tokens.method(request, response),
//       tokens.url(request, response),
//       tokens.status(request, response),
//       tokens.res(request, response, 'content-length'), '-',
//       tokens['response-time'](request, response), 'ms'
      
//     ]
// }
//   }))