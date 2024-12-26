const guideService = require("../service/guideService");

const ApiError = require("../error/ApiError");
const Controller = require("./controller");

class GuideController extends Controller {
    async create(req, res) {
        const { id_user, seniority, description } = req.body;
        const image = req.files ? req.files.image : undefined;

        const guideData = {id_user, seniority, description, image}

        const guide = await guideService.create(guideData);
    
        return res.json(guide);
    }
    
    async update(req, res) {
        const {id_guide, seniority, description} = req.body

        const guideData = {id_guide, seniority, description}

        const updatedGuide = await guideService.update(guideData);

        return res.json(updatedGuide);
    }

    async getAll(req, res) {//
        const guides = await guideService.getAll();
    
        return res.json(guides);
    }
}

module.exports = new GuideController();

