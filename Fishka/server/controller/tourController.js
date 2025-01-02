const ApiError = require("../error/ApiError");
const Controller = require("./controller");

const tourGalleryService = require("../service/tourGalleryService");
const tourDayService = require("../service/tourDayService");
const tourService = require("../service/tourService");

class TourController extends Controller {
    async create(req, res) {
        const { name, duration, description, type } = req.body;
        const image = req.files ? req.files.image : undefined;

        if(!image){
            throw ApiError.badRequest("Фотография обязательная для создания")
        }

        const tourData = {name, description, duration, type, image}
        console.log(tourData)

        const tour = await tourService.create(tourData);
    
        return res.json(tour);
    }
 
    async createGallery(req, res){
        const {id_tour} = req.body;
        const image = req.files ? req.files.image : undefined;

        const tourGalleryData = {id_tour, image}

        const tourGalleryImage = await tourGalleryService.create(tourGalleryData)
        console.log(tourGalleryImage)
        return res.json(tourGalleryImage);
    }

    async createDay(req, res){
        const { name, description, id_tour } = req.body;
        const image = req.files ? req.files.image : undefined;

        const tourDayData = {name, description, image, id_tour}

        const tourDay = await tourDayService.create(tourDayData)

        return res.json(tourDay)
    }

    async update(req, res) {
        const { id, name, duration, description, cost } = req.body;
        const image = req.files ? req.files.image : undefined;
    
        const tourData = {};

        if (id) tourData.id = id;
        if (name) tourData.name = name;
        if (description) tourData.description = description;
        if (duration) tourData.duration = duration;
        if (cost) tourData.cost_people = cost;
        if (image) tourData.image = image;

        const tour = await tourService.update(tourData);
    
        return res.json(tour);
    }

    async getAll(req, res){
        const { type } = req.query;
        
        const tours = await tourService.getAll(type);

        return res.json(tours);
    }

    async getGallery(req, res){
        const {id_tour} = req.query; 

        const tourGalleries = await tourGalleryService.getAll(id_tour);

        return res.json(tourGalleries);
    }

    async getAllDay(req, res){
        const {id_tour} = req.query; 

        const tourDays = await tourDayService.getAll(id_tour);

        return res.json(tourDays);
    }

    async getOne(req, res){
        const { id } = req.query;

        const tour = await tourService.getOne(id);

        return res.json(tour);
    }
}

module.exports = new TourController();