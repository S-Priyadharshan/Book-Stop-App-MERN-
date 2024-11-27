const express = require("express");
const Book  = require("../models/bookModel.js");

const router = express.Router();

//Create Route
router.post("/", async (req,res)=>{
    try{
        if(
            !req.body.title||
            !req.body.author||
            !req.body.publishYear
        ){
            res.status(400).send({
                message: "Send all the required fields"    
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }

        const book = await Book.create(newBook);

        res.status(201).send(book);
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
})

//Show all Route
router.get("/", async (req,res)=>{
    try{
        const books = await Book.find({});

        res.status(200).json({
            count: books.length,
            data: books
        })
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message:err.message
        })
    }
})

//Info Route
router.get("/:id", async (req,res)=>{
    try{
        const { id } = req.params;

        const book = await Book.findById(id);

        res.status(200).json(book)
    }catch(err){
        console.log(err);
        res.status(500).send({
            message: err.message
        })
    }
})

//Edit Route
router.put("/:id", async (req,res)=>{ 
    try{
        if(
            !req.body.title||
            !req.body.author||
            !req.body.publishYear
        ){
            res.status(400).send({
                message: "Send all the required fields",
            })
        }
        
        const { id } = req.params;

        const newBook = await Book.findByIdAndUpdate(id, req.body);

        if(!newBook){
            res.status(404).send({
                message: "Book not found",
            })
        }
        res.status(200).send({
            message: "Book updated successfully"
        })  
    }catch(err){
        console.log(err);
        res.status(500).send({
            message: err.message
        })
    }
})

//Delete Route
router.delete("/:id", async (req,res)=>{
    try{
        const {id} = req.params;

        const deletedBook = await Book.findByIdAndDelete(id);

        if(!deletedBook){
            res.status(404).json({message: "Book not found"});
        }

        res.status(200).send({
            message: "Book deleted successfully",
        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            message: err.message,
        })
    }

})

module.exports = router;