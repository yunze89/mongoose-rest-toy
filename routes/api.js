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

//id로 하나의 Book 데이터 조회
router.get('/books/:book_id', (req, res, next) => {
    Book.findOne({_id: req.params.book_id}, (err, book)=>{
        if(err) return res.status(500).json({error: err});
        if(!book) return res.status(404).json({error: 'book not found'});
        res.json(book);
    });
});

//author로 모든 author의 책 조회 (title, published_date 필드 반환)
router.get('/books/author/:author', (req, res, next) => {
    let {author} = req.body;
    //query, projection(원하는 필드만 1로 선택, 나머지는 0, projection 생략 시 모든 필드 선택된), callback
    Book.find({author}, {_id: 0, title: 1, published_date: 1}, (err, books)=>{
        if(err) return res.status(500).json({error: err});
        if(books.length==0) return res.status(400).json({err: 'book not found'});
        res.json(books);
    });
});

//새로운 book 데이터 등록
router.post('/books', (req, res, next) => {

    console.log(req.body);

    let {title, author, published_date} = req.body;

    let book = new Book({
        title,
        author,
        published_date
    });

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
    Book.findById(req.params.book_id, (err, book)=>{
        if(err) return res.status(500).json({error:'database failure'});
        if(!book) return res.status(404).json({error: 'book not found'});

        let {title, author, published_date} = req.body;

        //값이 있는 경우에만 update
        book.title = title ? title : book.title;
        book.author = author ? author : book.author;
        book.published_date = published_date ? published_date : book.published_date;

        book.save(err=>{
            if(err) res.status(500).json({error: 'failed to update'});
            res.json({message: 'book updated'});
        });
    });
});

router.delete('/books/:book_id', (req, res, next) => {
    Book.remove({_id: req.params.book_id}, (err, output)=>{

        if(err) return res.status(500).json( {error: 'database failure'} );

        // 요청한 작업을 수행하였고 데이터를 반환 할 필요가 없다는것을 의미
        res.status(204).end();
    });
});

module.exports = router;
