require('dotenv').config();

const express = require('express')
const app = express()

const PORT = 3500

const mongoose = require('mongoose') 


const movieRating = require('./routes/movieRating.js')

app.use(express.json())

//DB connection

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection

db.on('error', errorMsg => console.log(errorMsg));

db.once('open', ()=>{
    console.log('Connection Established to Database');
})

//


console.log('From app.js');

app.get('/', (req, res)=>{
    res.send('Welcome')
})

app.use('/api/v1/movieRatings', movieRating);

app.listen(PORT, ()=>{
    console.log(`API is working on ${PORT}`);
})