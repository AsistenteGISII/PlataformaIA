import { User } from "../types";

export const USER_REDUCER_ACTION_TYPE = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    UPDATE_USERNAME: 'UPDATE_USERNAME'
} as const;

interface LoginAction {
    type: typeof USER_REDUCER_ACTION_TYPE.LOGIN;
    payload: User;
}

interface LogoutAction {
    type: typeof USER_REDUCER_ACTION_TYPE.LOGOUT;
}

interface UpdateUsernameAction {
    type: typeof USER_REDUCER_ACTION_TYPE.UPDATE_USERNAME;
    payload: string;
}

export type UserAction = LoginAction | LogoutAction | UpdateUsernameAction;
