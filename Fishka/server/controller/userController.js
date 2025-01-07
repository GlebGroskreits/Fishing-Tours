const userService = require("../service/userService");

const ApiError = require("../error/ApiError");
const Controller = require("./controller");

class UserController extends Controller {
    async registration(req, res) {
        const { role, email, password, name, surname,patronymic,birthday,telephone } = req.body.registrationData;         //исправить валидацию
        const userData = { role, email, password };
        const personalData = { name, surname, patronymic, birthday, telephone };

        if(!email || !password || !name || !surname || !birthday || !telephone){
            throw ApiError.badRequest("Пожалуйста, убедитесь, что все поля были заполнены!")
        }
        else{
            if (email.length > 45 || !email.endsWith('@gmail.com')) {
                throw ApiError.badRequest("Email должен быть не больше 45 символов и заканчиваться на @gmail.com!");
            }

            const namePattern = /^.{2,20}$/; // от 2 до 20 символов

            if (!namePattern.test(name)) {
                throw ApiError.badRequest("Имя должно содержать от 2 до 20 символов!");
            }
            if (!namePattern.test(surname)) {
                throw ApiError.badRequest("Фамилия должна содержать от 2 до 20 символов!");
            }
            if (!namePattern.test(patronymic)) {
                throw ApiError.badRequest("Отчество должно содержать от 2 до 20 символов!");
            }

            const phonePattern = /^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$|^\+7 \(\d{3}\) \d{3}-\d{4}$/;
            if (!phonePattern.test(telephone)) {
                throw ApiError.badRequest("Телефон должен соответствовать формату +375 (XX) XXX-XX-XX или +7 (XXX) XXX-XXXX!");
            }

            // Проверка email
        }

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

        if (email.length > 45 || !email.endsWith('@gmail.com')) {
            throw ApiError.badRequest("Email должен быть не больше 45 символов и заканчиваться на @gmail.com!");
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

        res.cookie("refreshToken", userData.refreshToken, {maxAge: 30  * 24 * 60 * 60 * 1000, httpOnly: true,});

        return res.json(userData);
    }

    async change(req, res){
        const { personalData } = req.body
        
        const updatedUser = await userService.update(personalData);
          
        return res.json(updatedUser);
    }


    async getOne(req, res) {
        const { id_user } = req.query;

        const user = await userService.getOne(id_user);

        return res.json(user);
    }
}

module.exports = new UserController();

