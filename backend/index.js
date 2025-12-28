const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const password = process.argv[2]

const url = `mongodb+srv://marioflorez249_db_user:${password}@fullstackopen.lzvzwhu.mongodb.net/?appName=fullstackopen`

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

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  
  if(note){
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) =>{
  const id = req.params.id
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const body = req.body
  
  if(!body.content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  
  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId()
  }
  
  notes = notes.concat(note)
  console.log(note);
  res.json(note);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`);
});

function generateId() {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
  return maxId + 1;
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

// Database connection
mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

// toJson configuration
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})