const mongoose = require("mongoose");

const Schema = mongoose.Schema

const bookSchema = Schema(
    {
        title:{
            type: String,
            required: true,
        },
        author:{
            type: String,
            required: true,
        },
        publishYear:{
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;