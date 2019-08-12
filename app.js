const express = require('express');
const Joi = require('joi');
const mongo = require('mongodb').MongoClient;
const db = require("./db");

const app = express();
const url = 'mongodb://localhost:27017/mydb';
app.use(express.json());



const schema = {
    name :Joi.string().min(3).required()
};

function verifySchema(input, res)
{
    const result = Joi.validate(input, schema);
    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return false;
    }
    return true;
}

function verifyId(input, res)
{
    let course = courses.find(c =>c.id === parseInt(input));
    if(!course)
    {
        res.status(404).send('The Course with given ID was not found');
        return false;
    }
    return true;
}

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
    {id: 4, name: 'course4'},
]

app.get('/', (req, res) =>{
    res.send('Hello World');
});

app.get('/api/courses', (req, res) =>{
    res.send([1, 2, 3, 4]);    
});

app.get('/api/courses/:id', (req, res) =>{
   let course = courses.find(c =>c.id === parseInt(req.params.id));
   if (!course){
        res.status(404).send('The Course with given ID was not found');
   } 
   else{
        res.send(course);
   }
});

app.post('/api/courses', (req, res) => {
    const isValid = verifySchema(req.body, res);
    if(!isValid)
    {
        return false;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    let course = courses.find(c =>c.id === parseInt(req.params.id));

    const isIdValid = verifyId(req.params.id, res)
    if (!isIdValid)
    {
        console.log("Id is not valid");
        return;
    }
 
    const isValid = verifySchema(req.body, res);
    if (!isValid)
    {
        console.log("Schema is not valid");
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

const port = process.env.PORT || 3000
app.listen(port, () =>{
    console.log(`Listening on Port ${port}`)
});

