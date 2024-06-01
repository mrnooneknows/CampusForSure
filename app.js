const express = require('express');
const mongoose = require('mongoose');
const question = require('./models/question');
const suggestion = require('./models/suggestion');
const { ObjectId } = require('bson');

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine' , 'ejs');

const dbURI = process.env.MONGODB_URI || 'mongodb+srv://meandme:Appu2020@demoproject.kdihnw3.mongodb.net/gourisivam122?retryWrites=true&w=majority&appName=demoProject';
mongoose.connect(dbURI ,{useNewUrlParser: true,useUnifiedTopology: true,})
    .then(() => {
        app.listen(port);
    })
    .catch((err)=>{
        console.log(err);
    })

app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));

app.get('/' , (req , res) => {
    title = 'Home';
    suggestion.find().sort({createdAt : -1})
        .then((result) => {res.render('index' , {title : title , sugg : result});})
        .catch((err)=> {console.log(err);})
})
app.get('/about' , (req , res) => {
    title = 'About';
    res.render('about' , {title : title});
})
app.get('/suggestions' , (req , res) => {
    title = 'Suggestions';
    suggestion.find().sort({createdAt : -1})
        .then((result)=> {
            const sugg = result;
            res.render('suggestions' , {title : title , sugg});
        })
        .catch((err)=>{
            console.log(err);
        })
})
app.post('/suggestions' ,(req , res) => {
    const sugg = new suggestion(req.body);

    sugg.save()
        .then((result) =>{
            res.redirect('/suggestions');
        })
        .catch((err)=> {
            console.log(err);
        })
})
app.get('/suggestions/:id', (req , res) => {
    const id = req.params.id;
    suggestion.findById(id)
        .then((result) => {
            res.render('suggestion-details' , {title:"Details" , sugg:result});
        })
        .catch((err)=>{
            console.log(err);
        })
})
app.delete('/suggestions/:id' , (req , res) => {
    const id = req.params.id;
    suggestion.findByIdAndDelete(id)
        .then((result)=> {
            res.json({redirect : '/suggestions'});
        })
        .catch((err) => {
            console.log(err);
        })
})
app.get('/questions' , (req , res) => {
    title = 'Questions';
    question.find().sort({createdAt : -1})
        .then((result)=> {
            const ques = result;
            res.render('questions' , {title : title , ques});
        })
        .catch((err)=>{
            console.log(err);
        })
})
app.post('/questions' ,(req , res) => {
    const ques = new question(req.body);

    ques.save()
        .then((result) =>{
            res.redirect('/questions');
        })
        .catch((err)=> {
            console.log(err);
        })
})
app.get('/questions/:id', (req , res) => {
    const id = req.params.id;
    question.findById(id)
        .then((result) => {
            res.render('question-details' , {title:"Details" , ques:result});
        })
        .catch((err)=>{
            console.log(err);
        })
})
app.delete('/questions/:id' , (req , res) => {
    const id = req.params.id;
    question.findByIdAndDelete(id)
        .then((result)=> {
            res.json({redirect : '/questions'});
        })
        .catch((err) => {
            console.log(err);
        })
})
app.get('/add/question' , (req , res) => {
    title = 'Add Question';
    res.render('add-question' , {title : title});
})
app.get('/add/suggestion' , (req , res) => {
    title = 'Add Suggestion';
    res.render('add-suggestion' , {title : title});
})
app.use((req , res) => {
    res.status(404).render('404', {title:'404'});
})