const tokenService = require("./tokenService");
const UserDTO = require("../dtos/userDTO");
const bcrypt = require("bcrypt");

const ApiError = require("../error/ApiError");
const { User, User_Personal } = require("../model/model");


class UserService {
    async registration(userData, personalData) {
        const {email, password } = userData
        const candidate = await User.findOne({ where: { email } });

        if (candidate) {
            throw ApiError.conflict(
                "Пользователь с таким email уже существует"
            );
        }

        const hashPassword = await bcrypt.hash(password, 3);

        const user = await User.create({ ...userData, password: hashPassword });

        const personal = await User_Personal.create({ ...personalData, id_user: user.id });

        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({ ...userDTO });

        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return { ...tokens, user: userDTO };
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw ApiError.unauthorized("Пользователь не найден");
        }

        const isPassEquals = await bcrypt.compare(password, user.password);

        if (!isPassEquals) {
            throw ApiError.unauthorized("Пароли не верны");
        }

        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({ ...userDTO });

        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return { ...tokens, user: userDTO };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);

        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.badRequest("Токен не предоставлен");
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.unauthorized("Не авторизован");
        }
        const user = await User.findByPk(userData.id);
        if (!user) {
            throw ApiError.notFound("Пользователь не найден");
        }

        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({ ...userDTO });
        if (!tokens) {
            throw ApiError.internal("Ошибка при создании токенов");
        }

        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return { ...tokens, user: userDTO };
    }

    async update(userData){
        const {id_user} = userData;

        const user = await Guide.findByPk(id_user);
        if (!user) {
            throw ApiError.badRequest('Пользователь не найден');
        }
        
        const updatedUser = await Guide.update(userData, { where: { id_user: id_user },  returning: true});
    
        return updatedUser;
    }
}

module.exports = new UserService();
