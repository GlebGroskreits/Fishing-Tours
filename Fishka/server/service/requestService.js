const {Request, Tour_Active, Tour} = require('../model/model')
const uuid = require('uuid')
const path = require('path')

const ApiError = require('../error/ApiError')

class RequestService{
    async create(requestData){
        const request = await Request.create({requestData})

        return request;
    }

    async getAll(id_client) {
        const requests = await Request.findAll({
            where: { id_client: id_client },
            include: [
                {
                    model: Tour_Active,
                    include: [{ model: Tour }]
                }
            ]
        });
    
        const completedTours = [];
        const inProgressTours = [];
        const notStartedTours = [];
    
        requests.forEach(request => {
            const tourData = request.Tour_Active.Tour;
    
            if (tourData) {
                const tourStatus = request.Tour_Active.status; 
    
                if (tourStatus) {
                    inProgressTours.push(tourData);
                } else {
                    completedTours.push(tourData);
                }
            } else {
                notStartedTours.push(request);
            }
        });
    
        return {
            completedTours,
            inProgressTours,
            notStartedTours
        };
    }
}

module.exports = new RequestService()