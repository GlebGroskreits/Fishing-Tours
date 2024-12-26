const {Guide} = require('../model/model')
const uuid = require('uuid')
const path = require('path')

const ApiError = require('../error/ApiError')

class GuideService{
    async create(guideData){
        let filename =  uuid.v4() + ".jpg"
        guideData.image.mv(path.resolve(__dirname,'..', 'static', filename))

        const guide = await Guide.create({...guideData, image: filename})

        return guide;
    }

    async update(guideData) {
        const {id_guide} = guideData;

        const guide = await Guide.findByPk(id_guide);
        if (!guide) {
            throw ApiError.badRequest('Гид не найден');
        }

        if (guideData.image) {
            const filename = uuid.v4() + ".jpg";
            await guideData.image.mv(path.resolve(__dirname, '..', 'static', filename));
            guideData.image = filename; 
        } else {
            throw ApiError.badRequest('Нет фото гид');
        }
        
        const updatedGuide = await Guide.update(guideData, { where: { id_guide: id_guide },  returning: true});
    
        return updatedGuide;
    }
    
    async getAll() {
        const guides = await Guide.findAll();
    
        return guides;
    }
}

module.exports = new GuideService()