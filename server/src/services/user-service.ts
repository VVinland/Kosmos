import bcrypt from 'bcrypt';
import { CandidateForNewUsers } from "../types";
import db from '../db.js';
import tokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';
import ApiError from '../exceptions/api-error.js';

class UserService {
    async registration(candidateData: CandidateForNewUsers) {

        const candidate = await db.query(`SELECT * FROM user_data WHERE login='${candidateData.login}';`);

        if (candidate.rows.length !== 0) {

            throw ApiError.BadRequest(`Пользователь с таким login: ${candidate.rows[0].login} уже существует`);
        }
        const hashPassword = await bcrypt.hash(candidateData.password, 3);

        await db.query(`INSERT INTO user_data(
        firstname, lastname, middlename, login, password, supervisor) 
        VALUES('${candidateData.firstname}','${candidateData.lastname}','${candidateData.middlename}',
        '${candidateData.login}', '${hashPassword}', '${candidateData.supervisor}');`);

        return true;
    }

    async login(login: string, password: string) {
        const user = await db.query(`SELECT * FROM user_data WHERE login='${login}';`);

        if (user.rows.length === 0) {
            throw ApiError.BadRequest(`Пользователя с таким login:${login} нет`);
        }

        const isPassEqual = await bcrypt.compare(password, user.rows[0].password);
        if (!isPassEqual) {
            throw ApiError.BadRequest(`Пароль неверный`);
        }
        
        const tokens = tokenService.generateTokens({ ...user.rows[0] });
        await tokenService.saveRefreshToken(user.rows[0].id, tokens.refreshToken);
        
        return {
            ...tokens,
            user: { ...user.rows[0] }
        }
    }

    async logout(refreshToken: string) {
        const token = await tokenService.removeRefreshToken(refreshToken);
        return token;
    }

    async getLogins() {
        const logins = await db.query(`SELECT login FROM user_data;`);
        return logins.rows;
    }

    async refreshToken(refreshToken: string) {
        if (!refreshToken) throw ApiError.UnauthorizedError();

        const userData = tokenService.validateRefreshToken(refreshToken);
        if (!userData) throw ApiError.UnauthorizedError();

        const tokenFromDb = await tokenService.findRefreshToken(refreshToken);
        if (!tokenFromDb) throw ApiError.UnauthorizedError();

        const userDto = new UserDto(userData);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: { ...userData }
        }
    }
}

export default new UserService();