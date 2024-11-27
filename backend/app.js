const express = require("express")
const app = express()
const mongoose = require("mongoose");
const Book = require("./models/bookModel");
const bookRoute = require("./routes/booksRoute");
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const MongoURL = 'mongodb://127.0.0.1:27017/bookstore'

app.use("/books", bookRoute);

app.get("/" ,(req,res)=>{
    res.send("This is root");
});

mongoose.connect(MongoURL)
    .then(()=>{
        console.log("Connected to database");
        app.listen(5555, () =>{
            console.log("Listening on port 5555");
        })        
    })
    .catch((err)=>{
        console.log(err)
    })
