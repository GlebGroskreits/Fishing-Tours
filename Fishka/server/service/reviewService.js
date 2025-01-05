const {Review, Tour, User, User_Personal} = require('../model/model')
const uuid = require('uuid')
const path = require('path')

const ApiError = require('../error/ApiError')

class ReviewService{
    async create(reviewData){
        console.log(reviewData)
        const review = await Review.create({...reviewData})

        return review; 
    }
   
    async getAll() {
        const reviews = await Review.findAll({
            include: [
                {
                    model: Tour,
                    as: 'tour',
                    attributes: ['name'], 
                },
                {
                    model: User,
                    as: 'user',
                    include: [
                        {
                            model: User_Personal,
                            as: 'user_personal',
                            attributes: ['name', 'surname']
                        }
                    ]
                },
            ],
        }); 
    
        return reviews.map(review => ({
            description: review.description, // Получаем все поля из таблицы Review
            raiting: review.raiting, 
            tour: review.tour ? review.tour.name : null, // Добавляем название тура
            userName: review.user.user_personal.name, // Имя пользователя
            userSurname: review.user.user_personal.surname, // Фамилия пользователя
        }));    
    } 
}

module.exports = new ReviewService()