import randomString from 'randomstring';
import jsonwebtoken, { VerifyErrors } from 'jsonwebtoken';
import { IUser } from '@shared/types/User';

export class JwtService {

    private readonly secret: string;
    private readonly options: object;
    private readonly VALIDATION_ERROR = 'JSON-web-token validation failed.';


    constructor() {
        this.secret = (process.env.JWT_SECRET || randomString.generate(100));
        this.options = {expiresIn: process.env.COOKIE_JWT_EXP};
    }


    /**
     * Encrypt data and return jwt.
     *
     * @param data
     */
    public getJwt(data: IUser): Promise<string> {
        return new Promise((resolve, reject) => {
            jsonwebtoken.sign(Object.assign({}, data), this.secret, this.options, (err, token) => {
                err ? reject(err) : resolve(token);
            });
        });
    }


    /**
     * Decrypt JWT and extract client data.
     *
     * @param jwt
     */
    public decodeJwt(jwt: string): Promise<IUser> {
        return new Promise((res, rej) => {
            jsonwebtoken.verify(jwt, this.secret, (err: VerifyErrors, decoded: object | string) => {
                return err ? rej(this.VALIDATION_ERROR) : res(decoded as IUser);
            });
        });
    }
}
