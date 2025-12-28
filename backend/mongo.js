const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://marioflorez249_db_user:${password}@fullstackopen.lzvzwhu.mongodb.net/?appName=fullstackopen`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note ({
//     content: "POST is used to create new resources",
//     important: true,
// })

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note);
    })
    mongoose.connection.close()
})