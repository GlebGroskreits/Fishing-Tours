const {Request, Tour_Active, Tour} = require('../model/model')
const uuid = require('uuid')
const path = require('path')

const ApiError = require('../error/ApiError')

class RequestService{
    async create(requestData){
        const {id_client, id_tour} = requestData;

        const reqst = await Request.findOne({where: {id_client: id_client, id_tour: id_tour}})
        if(reqst){
            throw ApiError.badRequest('Вы уже отправили заявку на тур! Ожидайте начало...')
        }  

        const request = await Request.create(requestData)

        return request;
    }
    
    async getAll(id_client) {
        const requests = await Request.findAll({
            where: { id_client: id_client },
            include: [
                {
                    model: Tour_Active, 
                    as: 'tour', 
                    include: {
                        model: Tour,
                        as: 'tour' 
                    }
                }
            ]
        }); 
    
        const mergedRequests = requests.map(request => {
            const requestData = request.toJSON(); // Преобразуем Request в обычный объект
            const activeTourData = requestData.tour; // Данные активного тура
    
            // Проверяем, существует ли activeTourData
            if (!activeTourData) {
                return {
                    ...requestData, // Все поля из Request
                    tour: null // Или любое значение по умолчанию
                };
            }
    
            const tourData = activeTourData.tour; // Данные обычного тура
    
            // Проверяем, существует ли tourData
            if (!tourData) {
                return {
                    ...requestData, // Все поля из Request
                    ...activeTourData, // Поля из Tour_Active
                    tour: null // Или любое значение по умолчанию
                };
            }
    
            // Создаем новый объект, объединяя все поля
            return {
                ...requestData, // Все поля из Request
                ...activeTourData, // Поля из Tour_Active
                ...tourData,  // Поля из Tour
                tour: undefined
            };
        });
    
        const reservedRequests = mergedRequests.filter(request => request.status === 'reserve');
        const doneRequests = mergedRequests.filter(request => request.status === 'done');
        const nowRequests = mergedRequests.filter(request => request.status === 'now');

        return {
            reserved: reservedRequests, 
            done: doneRequests,
            now: nowRequests
        }; 
    } 

    async getAllGuide(id_guide) {
        const requests = await Tour_Active.findAll({
            where: { id_guide: id_guide },
            include: [
                {
                    model: Tour,
                    as: 'tour' 
                } 
            ]
        }); 
          
        console.log(id_guide)
        console.log(requests)
 
        const mergedRequests = requests.map(request => {
            const requestData = request.toJSON(); // Преобразуем Tour_Active в обычный объект
            const tourData = requestData.tour; // Данные тура
    
            // Если tourData не существует, возвращаем объект с null
            if (!tourData) { 
                return {
                    ...requestData, // Все поля из Tour_Active
                    tour: null // Или любое значение по умолчанию
                };
            }
    
            // Создаем новый объект, объединяя все поля
            return {
                ...tourData, // Поля из Tour
                ...requestData, // Все поля из Tour_Active 
                tour: undefined // Убираем лишний объект tour
            };
        });
    
        // Разделяем на три массива по статусу
        const reservedRequests = mergedRequests.filter(request => request.status === 'reserve');
        const doneRequests = mergedRequests.filter(request => request.status === 'done');
        const nowRequests = mergedRequests.filter(request => request.status === 'now');
    
        return {
            reserved: reservedRequests,
            done: doneRequests,
            now: nowRequests
        };  
    } 
}

module.exports = new RequestService()