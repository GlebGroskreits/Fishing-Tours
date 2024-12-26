const {Tour_Gallery} = require('../model/model')
const uuid = require('uuid')
const path = require('path')

const ApiError = require('../error/ApiError')

class TourGalleryService{
    async create(tourGalleryData){
        let filename =  uuid.v4() + ".jpg"
        tourGalleryData.image.mv(path.resolve(__dirname,'..', 'static', filename))

        const tourGallery = await Tour_Gallery.create({...tourGalleryData, image: filename})

        return tourGallery;
    }
    
    async getAll(id_tour) {
        const tourGalleries = await Tour_Gallery.findAll({where: {id_tour: id_tour}});
    
        return tourGalleries;
    }
}

module.exports = new TourGalleryService()