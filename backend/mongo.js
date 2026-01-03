const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://marioflorez249_db_user:${password}@fullstackopen.lzvzwhu.mongodb.net/testNoteApp?appName=fullstackopen`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note ({
    content: "Supertest is a library for testing HTTP servers",
    important: true,
})

note.save().then(result => {
    console.log('note saved!');
    mongoose.connection.close()
})

// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note);
//     })
//     mongoose.connection.close()
// })