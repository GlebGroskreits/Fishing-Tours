const {Guide, User_Personal, User} = require('../model/model')
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
        const guides = await Guide.findAll({
            include: [
                {
                    model: User,
                    as: 'user', 
                    include: {
                        model: User_Personal,
                        as: 'user_personal', 
                        attributes: ['name', 'surname']
                    }
                }
            ]
        });
    
        // Преобразуем массив для получения плоской структуры
        const flatGuides = guides.map(guide => {
            const { id_guide, description, image, seniority } = guide;
            const { user } = guide;
            const { user_personal } = user;
    
            return {
                id_guide,
                description,
                image,
                seniority,
                name: user_personal.name,
                surname: user_personal.surname
            };
        });

        return flatGuides;
    }
}

module.exports = new GuideService()