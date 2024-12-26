import { API_ENDPOINTS } from "../http/apiEndpoints";
import BaseService from "./BaseService";

class GuideService extends BaseService {
    async getGuide() {
        const response = await BaseService.request("get", API_ENDPOINTS.GUIDE.GET_ALL_GUIDE );
        
        return response; // Успешный ответ
    }
}

const GuideServiceInstance = new GuideService();

export default GuideServiceInstance;
