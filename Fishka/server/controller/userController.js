const userService = require("../service/userService");

const ApiError = require("../error/ApiError");
const Controller = require("./controller");

class UserController extends Controller {
    async registration(req, res) {
        const { role, email, password, name,surname,patronymic,birthday,telephone, } = req.body;         //исправить валидацию
        const userData = { role, email, password };
        const personalData = { name, surname, patronymic, birthday, telephone };

        const user = await userService.registration(userData, personalData);

        if (!user) {
            return next(ApiError.internal("Ошибка при создании пользователя"));
        }

        res.cookie("refreshToken", user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

        return res.json(user);
    }

    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            throw ApiError.badRequest("Email и пароль обязательны для входа")
        }

        const userData = await userService.login(email, password);
        if (!userData) {
            throw ApiError.unauthorized("Неверный email или пароль");
        }

        res.cookie("refreshToken", userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000, 
            httpOnly: true,
        });

        return res.json(userData);
    }

    async logout(req, res) {
        const { refreshToken } = req.cookies;
        const token = await userService.logout(refreshToken);

        res.clearCookie("refreshToken");

        return res.json(token); 
    }

    async refresh(req, res) {
        const { refreshToken } = req.cookies;

        const userData = await userService.refresh(refreshToken);

        res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true,});

        return res.json(userData);
    }

    async update(req, res){
        const { id_user, name, surname, patronymic, birthday, telephone} = req.body
        
        const userData = { id_user, name, surname, patronymic, birthday, telephone}
        
        const updatedUser = await userService.update(userData);
        
        return res.json(updatedUser);
    }


    // async getOne(req, res) {
    //     const { id } = req.params;
    //     Controller.checkId(id);
        
    //     const user = await userService.getOne(id);

    //     return res.json(user);
    // }
}

module.exports = new UserController();

