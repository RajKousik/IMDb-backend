const express = require('express')
const app = express()

const PORT = 4500

console.log('From app.js');

app.get('/', (req, res)=>{
    res.send('Welcome')
})

app.listen(PORT, ()=>{
    console.log(`API is working on ${PORT}`);
})