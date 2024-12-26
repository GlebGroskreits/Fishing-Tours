const {Review} = require('../model/model')
const uuid = require('uuid')
const path = require('path')

const ApiError = require('../error/ApiError')

class ReviewService{
    async create(reviewData){
        const review = await Review.create({reviewData})

        return tourActive;
    }

    async getAll() {
        const reviews = await Review.findAll();
    
        return reviews;
    }
}

module.exports = new ReviewService()