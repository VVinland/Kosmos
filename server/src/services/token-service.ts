import jsonwebtoken from 'jsonwebtoken';
import db from './../db.js';
import { UserData } from '../types.js';


class TokenService {

    generateTokens(payload: UserData) {
        const accessToken = jsonwebtoken.sign(payload, String(process.env.JWT_ACCESS_SECRET), { expiresIn: '15m' });
        const refreshToken = jsonwebtoken.sign(payload, String(process.env.JWT_REFRESH_SECRET), { expiresIn: '130m' });
        return { accessToken, refreshToken };
    }

    validateRefreshToken(refreshToken: string) {
        try {
            const payload = <UserData>jsonwebtoken.verify(refreshToken, String(process.env.JWT_REFRESH_SECRET));
            return payload;
        } catch {
            return null
        }
    }

    validateAccessToken(accessToken: string) {
        try {
            const payload = jsonwebtoken.verify(accessToken, String(process.env.JWT_ACCESS_SECRET));
            return payload;
        } catch {
            return null;
        }
    }

    async saveRefreshToken(userId: number, refreshToken: string) {
        
        const tokenData = await db.query(`SELECT * FROM refreshToken WHERE "user_dataId"='${userId}';`);
        
        if (tokenData.rows.length !== 0) {
            const token = await db.query(`UPDATE refreshToken SET "refreshToken"='${refreshToken}'
                                        WHERE "user_dataId" = '${userId}';`);
            return token;
        }

        const token = await db.query(`INSERT INTO refreshToken ("refreshToken", "user_dataId")
                                      VALUES('${refreshToken}','${userId}');`);
        

        return token;
    }

    async removeRefreshToken(refreshToken: string) {
        const token = await db.query(`DELETE FROM refreshToken WHERE "refreshToken" = '${refreshToken}';`);
        console.log(token);

        return token;
    }

    async findRefreshToken(refreshToken: string) {
        const token = await db.query(`SELECT * FROM refreshToken WHERE "refreshToken" ='${refreshToken}';`);
        if (token.rows.length === 0) return null;

        return token.rows[0];
    }
}

export default new TokenService();