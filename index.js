const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const stripe = require("stripe")("sk_test_LQ7kUSQKXdfMSVm2MwpGczgS00QjrRZswN");
let Todo = require('./todo.model')
let port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json())
const connection_url = 'mongodb+srv://douglas2:pass@cluster0-oxngv.mongodb.net/todo?retryWrites=true&w=majority'

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
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment request received BOOM!! FOR THIS AMOUNT", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // OK, created something
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`)
})
