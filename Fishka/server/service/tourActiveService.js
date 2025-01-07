const {Tour_Active, Tour} = require('../model/model')
const uuid = require('uuid')
const path = require('path')
const { Op } = require('sequelize');

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

        const updatedTourActive = await Tour_Active.update(tourActiveData, { where: { id },  returning: true});
    
        return updatedTourActive; 
    }

    async getAll(status, type) {
        const alltoursActive = await Tour_Active.findAll({
            where: {
                status: {
                    [Op.or]: ['reserve', 'now'], // Фильтруем по статусам "reserve" и "nav"
                },
            },
        });
         
        const allTours = await Tour.findAll({ where: { type: type } }); // Предполагаем, что у вас есть поле type

        // Фильтруем активные туры на основе совпадения id_tour и type
        const toursActive = alltoursActive.filter(activeTour => 
            allTours.some(tour => tour.id === activeTour.id_tour)
        );

        return toursActive;
    }
}

module.exports = new TourActiveService()