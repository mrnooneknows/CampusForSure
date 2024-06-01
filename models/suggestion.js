const mongoose = require('mongoose');

const suggestionSchema = mongoose.Schema({
    about : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    snippet : {
        type : String,
        required : true
    },
    body : {
        type :String,
        required:true
    }
} , {timestamps : true});

const suggestion = mongoose.model('suggestion' , suggestionSchema);

module.exports = suggestion;