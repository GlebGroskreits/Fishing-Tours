const requestService = require("../service/requestService");

const ApiError = require("../error/ApiError");
const Controller = require("./controller");

class RequestController extends Controller {
    async create(req, res) {
        const { id_client, id_tour } = req.body;

        const requestData = {id_client, id_tour}

        const request = await guideService.create(requestData);
    
        return res.json(request);
    }

    async getAll(req, res) {
        const {id_client} = req.query;

        const requests = await requestService.getAll(id_client);
    
        return res.json(requests);
    }
}

module.exports = new RequestController();

