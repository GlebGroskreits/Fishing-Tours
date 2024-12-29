import { API_ENDPOINTS } from "../http/apiEndpoints";
import BaseService from "./BaseService";

class TourService extends BaseService {
    
    async getTour(type){
        const response = await BaseService.request("get", API_ENDPOINTS.TOUR.GET_TOUR, {params: {type}});

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
}

const TourServiceInstance = new TourService();

export default TourServiceInstance;
