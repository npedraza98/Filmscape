const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
    {
        movieId: {
            type:String,
            required:true
        },
        movieTitle:{
            type:String,
            required:true
        },
        movieYear:{
            type:String,
            required:true
        },
        moviePoster:{
            type:String,
            required:true
        },
        movieScore:{
            type:Number,
            min: 1,
            max: 10,
            required:true
        },
        reviewContent:{
            type:String,
            required:true
        }

    },{timestamps:true}
);

module.exports = mongoose.model('Review', ReviewSchema);