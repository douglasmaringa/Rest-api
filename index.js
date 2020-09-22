const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
let Todo = require('./todo.model')
let port = process.env.PORT || 3000;

app.use(cors());

const connection_url = 'mongodb+srv://douglas2:pass@cluster0-oxngv.mongodb.net/todos?retryWrites=true&w=majority'

mongoose.connect(connection_url, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.get('/', (req,res)=>{
    
        Todo.find(function(err, todos) {
            if (err) {
                console.log(err)
            } else {
                res.json(todos)
            }
        })
    })

    app.post('/add', (req,res)=>{
        let todo = new Todo(req.body)
        todo.save()
            .then(todo => {
                res.status(200).json({'todo': 'todo added successfully'})
            })
            .catch(err => {
                res.status(400).send('adding new todo failed')
            })
        
    })


app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`)
})