const {Tour} = require('../model/model')
const uuid = require('uuid')
const path = require('path');
const fs = require('fs');

const ApiError = require('../error/ApiError');
const tourActiveService = require('./tourActiveService');

class TourService{
    async create(tourData){
        let filename =  uuid.v4() + ".jpg";

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

        let updatedTour
        if(tourData.image){
            let filename =  uuid.v4() + ".jpg";
            tourData.image.mv(path.resolve(__dirname,'..', 'static', filename))
            updatedTour = await Tour.update({...tourData, image: filename}, { where: { id },  returning: true});
        }else{
            updatedTour = await Tour.update({...tourData}, { where: { id },  returning: true});
        }

        if(tourData.image){
            const imagePath = path.join(__dirname, '..', 'static', tour.image);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Ошибка при удалении изображения: ${err}`);
                } else {
                    console.log(`Старое изображение удалено.`);
                }
            });
        }

        return updatedTour[1][0];
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
        const activeTours = await tourActiveService.getAll('reserve', type);

        return { tours, activeTours };
    }

    async getOne(id) {
        const tour = await Tour.findOne({where: { id }});
    
        return tour;
    }
}

module.exports = new TourService()