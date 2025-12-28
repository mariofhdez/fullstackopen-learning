require('dotenv').config()

const express = require('express');
const cors = require('cors');

const app = express();
const Note = require('./models/note')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:', request.path);
  console.log('Body:', request.body);
  console.log('---');
  next();
}

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: false,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
  {
    id: 4,
    content: "POST is used to create new resources",
    important: true,
  },
];

app.use(cors())
app.use(express.json());
app.use(requestLogger);
app.use(express.static('dist'));

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
});

app.get('/api/notes/:id', (req, res, next ) => {
  const id = req.params.id
  Note.findById(id).then(note => {
      if(note){
        res.json(note)
      } else {
        res.status(404).end()
      }
      
    }).catch(error => next(error))
  
})

app.delete('/api/notes/:id', (req, res) =>{
  const id = req.params.id
  Note.findByIdAndDelete(id).then(result => {
    res.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/notes', (req, res) => {
  const body = req.body
  
  if(body.content === undefined) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  
  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  })
  
  note.save().then(savedNote => {
    res.json(savedNote);
  })
})

app.put('/api/notes/:id', (req, res, next) => {
  const body = req.body

  const newNote = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(req.params.id, newNote, { new: true })
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`);
});

// function generateId() {
//   const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
//   return maxId + 1;
// }

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id'})
  }
}

app.use(errorHandler)