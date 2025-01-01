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

        const tourGallery = tourGalleryService.create(tourGalleryData)

        return res.json(tourGallery);
    }

    async createDay(req, res){
        const { name, description, address } = req.body;
        const image = req.files ? req.files.image : undefined;

        const tourDayData = {name, description, address, image}

        const tourDay = tourDayService.create(tourDayData)

        return res.json(tourDay)
    }

    async update(req, res) {
        const { id, name, duration, description } = req.body;
        const image = req.files ? req.files.image : undefined;
    
        const tourData = {};

        if (id) tourData.id = id;
        if (name) tourData.name = name;
        if (description) tourData.description = description;
        if (duration) tourData.duration = duration;
        if (image) tourData.image = image;

        const tour = await tourService.update(tourData);
    
        return res.json(tour);
    }
    
    async updateDay(req, res){
        const  {id, id_tour, address, description, name } = req.body;

        const tourDayData = {id, id_tour, address, description, name };

        const updatedTourDay = await tourDayService.update(tourDayData);

        return res.json(updatedTourDay)
    }

    async getAll(req, res){
        const { type } = req.query;
        
        const tours = await tourService.getAll(type);

        return res.json(tours);
    }

    async getAllGallery(req, res){
        const {id_tour} = req.query; 

        const tourGalleries = await tourGalleryService.getAll(id_tour);

        return res.json();
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