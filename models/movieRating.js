const mongoose = require("mongoose")

const movieRatingSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true,
        unique : true,
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
        type : Number, 
        required : true
    },
    rating : {
        type : Number, 
        required : true
    }
    
})

module.exports = mongoose.model('movieRatingsModel', movieRatingSchema);