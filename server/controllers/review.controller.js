const Review = require('../models/review.model');

module.exports = {
    createReview:(req, res) => {
        Review.create(req.body, (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.json(result);
            }
        });
    },
    getAllReviews:(req, res) => {
        Review.find({})
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
    },
    getOneReview:(req, res) => {
        Review.findOne({_id:req.params.id})
        .then((result) => {
            console.log(req.params.id)
            res.json(result)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
    }
    ,
    updateReview:(req, res) => {
        Review.findOneAndUpdate({_id:req.params.id}, req.body, {new:true})
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
    },
    deleteReview:(req, res) => {
        Review.deleteOne({_id:req.params.id})
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
    }
}