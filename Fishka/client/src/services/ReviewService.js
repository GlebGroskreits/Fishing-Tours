import { API_ENDPOINTS } from "../http/apiEndpoints";
import BaseService from "./BaseService";

class ReviewService extends BaseService {
    async getReview() {
        const response = await BaseService.request("get", API_ENDPOINTS.REVIEW.GET_REVIEW );
        
        return response; 
    }

    async createReview(reviewData) {
        const response = await BaseService.request("post", API_ENDPOINTS.REVIEW.CREATE_REVIEW, {reviewData});
        
        return response; 
    }
}

const ReviewServiceInstance = new ReviewService();

export default ReviewServiceInstance;
