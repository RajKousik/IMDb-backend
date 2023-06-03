const express = require('express')
const app = express()

const PORT = 4500

const mongoose = require('mongoose') 

const movieRating = require('./routes/movieRating.js')


console.log('From app.js');

app.get('/', (req, res)=>{
    res.send('Welcome')
})

app.use('/api/v1/movieRatings', movieRating);

app.listen(PORT, ()=>{
    console.log(`API is working on ${PORT}`);
})