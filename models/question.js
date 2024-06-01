const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    question : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    }
} , {timestamps : true});

const question = mongoose.model('question' , questionSchema);

module.exports = question;