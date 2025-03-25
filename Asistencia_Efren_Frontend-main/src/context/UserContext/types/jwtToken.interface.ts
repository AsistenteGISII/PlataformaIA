import { IUser } from "./iUser.interface";

export interface JwtUserToken {
    user: IUser;
    iat: string;
    exp: string;
}