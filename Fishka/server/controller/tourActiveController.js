const ApiError = require("../error/ApiError");
const Controller = require("./controller");
const tourActiveService = require("../service/tourActiveService");

class TourActiveController extends Controller {
    async create(req, res) {
        const { id_tour, date_start } = req.body;

        const tourActiveData = {id_tour, date_start}

        const tourActive = await tourActiveService.create(tourActiveData);
    
        return res.json(tourActive);
    }

    async update(req, res) {
        const { id, status } = req.body;

        const tourActiveData = {id, status};
    
        const updatedTourActive = await tourActiveService.update(tourActiveData);
    
        return res.json(updatedTourActive);
    }
    
    async getAll(req, res){
        const { status } = req.query;
        
        const toursActive = await tourActiveService.getAll(status);
    
        return res.json(toursActive);
    }

    //
}

module.exports = new TourActiveController();