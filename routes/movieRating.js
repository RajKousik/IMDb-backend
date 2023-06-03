const express = require('express')
const router = express.Router();

const movieRatingsModel = require('../models/movieRating');

// router.get('/', (req, res)=>{
//     res.send("Hello");
// })

router.get('/', async(req,res)=>{
    try
    {
        const movieRatings = await movieRatingsModel.find();
        res.status(200).json(movieRatings);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message : err.message});
    }
})

router.post('/', async (req, res)=>{

    const newMovie = new movieRatingsModel({
        name : req.body.name,
        genre : req.body.genre,
        language : req.body.language,
        releasedYear : req.body.releasedYear,
        rating : req.body.rating
    })

    try
    {
        const movie = await newMovie.save();
        res.status(201).json(movie);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message : err.message});
    }

})




async function getMovie(req, res, next){

    let movie;

    try{

        movie = await movieRatingsModel.findById(req.params.id);
        if(movie == null)
        {
            return res.status(404).json({Message : "Not Found"});
        }

    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message : err.message});
    }
    res.movie = movie;
    next()
}

module.exports = router;