const {Tour_Active} = require('../model/model')
const uuid = require('uuid')
const path = require('path')

const ApiError = require('../error/ApiError')

class TourActiveService{
    async create(tourActiveData){
        const tourActive = await Tour_Active.create(tourActiveData)

        return tourActive;
    }

    async update(tourActiveData) {
        const {id} = tourActiveData;

        const tourActive = await Tour_Active.findByPk(id);
        if (!tourActive) {
            throw ApiError.badRequest('Активный тур не найден');
        }

        const updatedTourActive = await Tour.update(tourActiveData, { where: { id },  returning: true});
    
        return updatedTourActive;
    }

    async getAll(status) {
        const toursActive = await Tour_Active.findAll({where: {status: status}});
    
        return toursActive;
    }
}

module.exports = new TourActiveService()