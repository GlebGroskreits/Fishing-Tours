const ApiError = require("../error/ApiError");
const Controller = require("./controller");

const reviewService = require("../service/reviewService");

class ReviewController extends Controller {
    async create(req, res) {
        const { reviewData } = req.body;

        const review = await reviewService.create(reviewData);
    
        return res.json(review);
    }

    async getAll(req, res){        
        const reviews = await reviewService.getAll();
    
        return res.json(reviews);
    }   
}

module.exports = new ReviewController();