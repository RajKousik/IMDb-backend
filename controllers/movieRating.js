const movieRatingsModel = require('../models/movieRating');

const getAllMovieRatings = async(req,res)=>{
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
}

const createNewMovie = async (req, res)=>{

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

}


const getMovieRating = (req, res)=>{

    try{   
        res.status(200).json(res.movie);
    }
    catch(err)
    {
        // console.log(err);
        res.status(500).json({message : err.message});
    }
    
}


const updateMovie = async(req, res)=>{

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

}

const deleteMovie = async (req, res)=>{
    try{
        await res.movie.deleteOne();
        res.status(200).json({message : `Deleted Movie : ${res.movie.name}`});
    }
    catch(err)
    {
        res.status(400).json({message: error.message})
    }
}



//MiddleWare

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

module.exports = {getAllMovieRatings, createNewMovie, getMovie, getMovieRating, updateMovie, deleteMovie};