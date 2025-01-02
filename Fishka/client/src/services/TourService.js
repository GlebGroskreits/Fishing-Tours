import { API_ENDPOINTS } from "../http/apiEndpoints";
import BaseService from "./BaseService";

class TourService extends BaseService {
    
    async getTour(type){
        const response = await BaseService.request("get", API_ENDPOINTS.TOUR.GET_TOUR, {params: {type}});

        console.log(response)
        response.activeTours = response.activeTours.map(at => {
            const matchingTour = response.tours.find(tour => tour.id === at.id_tour);
            if (matchingTour) {
                return {
                    ...matchingTour, 
                    ...at            
                };
            }
            return at; 
        });

        return response;
    }

    async getGallery(id_tour){
        const response = await BaseService.request("get", API_ENDPOINTS.TOUR.GET_GALLERY, {params: {id_tour}});
        console.log(response)
        return response;
    }

    async createGallery(tourData){
        const formData = new FormData();

        formData.append('id_tour', tourData.id);
        
        formData.append('image', tourData.image);
        
        const response = await BaseService.request("post", API_ENDPOINTS.TOUR.CREATE_GALLERY, formData);
        console.log(response)
        return response;
    }

    async changeTour(tourData) {
        const formData = new FormData();

        if (tourData.id) {
            formData.append('id', tourData.id);
        }

        if (tourData.name) {
            formData.append('name', tourData.name);
        }
        
        if (tourData.duration) {
            formData.append('duration', tourData.duration);
        }
        
        if (tourData.description) {
            formData.append('description', tourData.description);
        }
        
        if (tourData.cost) {
            formData.append('cost', Number(tourData.cost));
        }

        if (tourData.image) {
            formData.append('image', tourData.image);
        }
        
        const response = await BaseService.request("patch", API_ENDPOINTS.TOUR.UPDATE_TOUR, formData);
        
        return response;
    }
    
    async createTour(tourData) {
        const formData = new FormData();

        formData.append('name', tourData.name);
        formData.append('duration', tourData.duration);
        formData.append('description', tourData.description);
        
        if (tourData.image) {
            formData.append('image', tourData.image);
        }

        const response = await BaseService.request("post", API_ENDPOINTS.TOUR.CREATE_TOUR, formData);

        return response;
    }

    async createTourActive(tourActiveDataOld) {
        const tourActiveData = {
            id_guide: tourActiveDataOld.guide,
            id_tour: tourActiveDataOld.tour,
            date_start: tourActiveDataOld["date start"]
        }

        const response = await BaseService.request("post", API_ENDPOINTS.TOUR_ACTIVE.CREATE_TOUR_ACTIVE, tourActiveData);

        return response;
    }
}

const TourServiceInstance = new TourService();

export default TourServiceInstance;
