const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Todo = new Schema({
  todoDescription: {
        type: String
    }
})

module.exports = mongoose.model('Todo', Todo)
