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
        // console.log(err);
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
        // console.log(err);
        res.status(500).json({message : err.message});
    }

})

router.get('/:id', getMovie,(req, res)=>{

    try{   
        res.status(200).json(res.movie);
    }
    catch(err)
    {
        // console.log(err);
        res.status(500).json({message : err.message});
    }

})

router.patch('/:id', getMovie, async(req, res)=>{

    if(req.body.name != null)
    {
        res.movie.name = req.body.name;
    }
    if(req.body.genre != null)
    {
        res.movie.genre = req.body.genre;
    }
    if(req.body.language != null)
    {
        res.movie.language = req.body.language;
    }
    if(req.body.releasedYear != null)
    {
        res.movie.releasedYear = req.body.releasedYear;
    }
    if(req.body.rating != null)
    {
        res.movie.rating = req.body.rating;
    }

    try
    {
        const updatedMovie = await res.movie.save();
        res.status(200).json(updatedMovie);
    }
    catch(err)
    {
        // console.log(err);
        res.status(400).json({message : err.message});
    }

})

router.delete('/:id', getMovie, async (req, res)=>{
    try{
        await res.movie.deleteOne();
        res.status(200).json({message : `Deleted Movie : ${res.movie.name}`});
    }
    catch(err)
    {
        res.status(400).json({message: error.message})
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
        // console.log(err);
        res.status(500).json({message : err.message});
    }
    res.movie = movie;
    next()
}

module.exports = router;