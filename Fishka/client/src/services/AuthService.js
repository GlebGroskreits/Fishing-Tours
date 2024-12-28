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

    // async logout() {
    //     try {
    //         return $api.post("/logout");
    //     } catch (error) {
    //         console.error("Login failed:", error);
    //         throw error; // Обработка ошибок
    //     }
    // }
}

const authServiceInstance = new AuthService();

export default authServiceInstance;
