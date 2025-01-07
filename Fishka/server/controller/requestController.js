const requestService = require("../service/requestService");

const ApiError = require("../error/ApiError");
const Controller = require("./controller");

class RequestController extends Controller {
    async create(req, res) { 
        const { requestData } = req.body;

        const request = await requestService.create(requestData); 
    
        return res.json(request);
    }

    async getAll(req, res) { 
        const {id_client} = req.query;

        const requests = await requestService.getAll(id_client);
    
        return res.json(requests);
    }

    async getAllGuide(req, res) { 
        const {id_guide} = req.query;

        const requests = await requestService.getAllGuide(id_guide);
    
        return res.json(requests);
    }
}

module.exports = new RequestController();

