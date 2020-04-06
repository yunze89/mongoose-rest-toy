var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// model : 데이터베이스에서 데이터를 읽고, 생성하고, 수정하는프로그래밍 인터페이스를 정의
var bookSchema = new Schema({
    title: String,
    author: String,
    published_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('book', bookSchema);
