const ReviewController = require('../controllers/review.controller');


module.exports = (app) => {
    app.post('/api/createReview', ReviewController.createReview);
    app.get('/api/getAllReviews', ReviewController.getAllReviews);
    app.get('/api/getOneReview/:id', ReviewController.getOneReview);
    app.put('/api/updateReview/:id', ReviewController.updateReview);
    app.delete('/api/deleteReview/:id', ReviewController.deleteReview);
}