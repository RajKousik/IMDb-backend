const mongoose = require("mongoose")

const movieRatingSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true
    },
    genre : {
        type : String, 
        required : true
    },
    language : {
        type : String, 
        default : "Unknown"
    },
    releasedYear : {
        type : String, 
        required : true
    },
    rating : {
        type : String, 
        required : true
    }
    
})

module.exports = mongoose.model('movieRatingsModel', movieRatingSchema);