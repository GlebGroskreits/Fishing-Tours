const ApiError = require("../error/ApiError");
const Controller = require("./controller");

const reviewService = require("../service/reviewService");

class ReviewController extends Controller {
    async create(req, res) {
        const { id_client, id_tour, raiting, description } = req.body;

        const reviewData = { id_client, id_tour, raiting, description }

        const review = await reviewService.create(reviewData);
    
        return res.json(review);
    }

    async getAll(req, res){        
        const reviews = await reviewService.getAll();
    
        return res.json(reviews);
    }   
}

module.exports = new ReviewController();