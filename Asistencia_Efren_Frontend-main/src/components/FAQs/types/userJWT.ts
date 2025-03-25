import { User } from "../../../context/UserContext/types";

export interface UserTokenPayload {
    user: User;
    iat: number;
    exp: number;
  }