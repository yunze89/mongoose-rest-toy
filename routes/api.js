var express = require('express');
var router = express.Router();
var Book = require('../models/book');

router.get('/books', (req, res, next) => {
    Book.find((err, books)=>{
        if(err)
            return res.status(500).send({err: 'db failure'});
        res.json(books);
    });
});

router.get('/books/:book_id', (req, res, next) => {
    res.send('respond with a resource');
});

router.get('/books/author/:author', (req, res, next) => {
    res.send('respond with a resource');
});

//새로운 book 데이터 등록
router.post('/books', (req, res, next) => {

    console.log(req.body);

    var book = new Book();
    book.title = req.body.title;
    book.author = req.body.author;
    book.published_date = new Date(req.body.published_date);

    book.save(err=>{
       if(err){
           console.error(err);
           res.json({result: 0});
           return;
       }

       res.json({result: 1});
    });
});

router.put('/books/:book_id', (req, res, next) => {
    res.send('respond with a resource');
});

router.delete('/books/:book_id', (req, res, next) => {
    res.send('respond with a resource');
});

module.exports = router;
