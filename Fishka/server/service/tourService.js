const {Tour} = require('../model/model')
const uuid = require('uuid')
const path = require('path')

const ApiError = require('../error/ApiError')

class TourService{
    async create(tourData){
        let filename =  uuid.v4() + ".jpg"
        tourData.image.mv(path.resolve(__dirname,'..', 'static', filename))

        const tour = await Tour.create({...tourData, image: filename})

        return tour;
    }

    async update(tourData) {
        const {id} = tourData;

        const tour = await Tour.findByPk(id);
        if (!tour) {
            throw ApiError.badRequest('Тур не найден');
        }

        const updatedTour = await Tour.update(tourData, { where: { id },  returning: true});
    
        return updatedTour;
    }
    
    async updateDetails(tourData){
        const {id} = tourData;

        const tour = await Tour.findByPk(id);
        if (!tour) {
            throw ApiError.badRequest('Тур не найден');
        }

        const updatedTour = await Tour.update(tourData, { where: { id },  returning: true});
    
        return updatedTour;
    }

    async getAll(type) {
        const tours = await Tour.findAll({where: {type: type}});
    
        return tours;
    }

    async getOne(id) {
        const tour = await Tour.findOne({where: { id }});
    
        return tour;
    }
}

module.exports = new TourService()