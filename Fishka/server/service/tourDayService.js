const {Tour_Day} = require('../model/model')
const uuid = require('uuid')
const path = require('path')

const ApiError = require('../error/ApiError')

class TourDayService{
    async create(tourDayData){
        let filename =  uuid.v4() + ".jpg"
        tourDayData.image.mv(path.resolve(__dirname,'..', 'static', filename))

        const tourDay = await Tour_Day.create({...tourDayData, image: filename})

        return tourDay;
    }

    async update(tourDayData) {
        const {id} = tourDayData;

        const tou = await Guide.findByPk(id);
        if (!guide) {
            throw ApiError.badRequest('не найден');
        }
        
        const updatedTourDay = await Tour_Day.update(tourDayData, { where: { id },  returning: true});
    
        return updatedTourDay;
    }

    async getAll(id_tour) {
        const tourDays = await Tour_Day.findAll({where: {id_tour: id_tour}});
    
        return tourDays;
    }
}

module.exports = new TourDayService()