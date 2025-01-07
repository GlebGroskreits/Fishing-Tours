import { API_ENDPOINTS } from "../http/apiEndpoints";
import BaseService from "./BaseService";

function createAuthResponse(data) {
    return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: {
            id: data.user.id,
            role: data.user.role,
        },
    };
}

class AuthService extends BaseService {
    async login(email, password) {
        const response = await BaseService.request("post", API_ENDPOINTS.USER.LOGIN, { email, password });

        const authResponse = createAuthResponse(response);
        
        return authResponse; 
    }

    async registration(registrationData) {
        const response = await BaseService.request("post", API_ENDPOINTS.USER.REGISTRATION, { registrationData });
        return response; 
    } 

    async getUser(id_user) {
        const response = await BaseService.request("get", API_ENDPOINTS.USER.GET_USER, {params: { id_user }});
        return response; 
    } 

    async getRequest(id_client) {
        const response = await BaseService.request("get", API_ENDPOINTS.REQUEST.GET_REQUEST, {params: { id_client }});
        return response; 
    } 

    async getRequestGuide(id_guide) {
        const response = await BaseService.request("get", API_ENDPOINTS.REQUEST.GET_REQUEST_GUIDE, {params: { id_guide }});
        return response; 
    } 

    async changePersonal(personalData) {
        const response = await BaseService.request("patch", API_ENDPOINTS.USER.CHANGE_USER, {personalData});
        return response; 
    } 
}

const authServiceInstance = new AuthService();

export default authServiceInstance;
