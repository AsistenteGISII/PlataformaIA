import { UserState } from "../types";
import { USER_REDUCER_ACTION_TYPE, UserAction } from "./actions";

export const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case USER_REDUCER_ACTION_TYPE.LOGIN:
            return {
                ...state,
                user: action.payload,
                logged: true
            };
        case USER_REDUCER_ACTION_TYPE.LOGOUT:
            return {
                ...state,
                logged: false,
                user: {
                    email: "",
                    id: 0,
                    token: "",
                    fullname: "",
                    username: "",
                    verified: true,
                    user_role: ""
                }
            };
        case USER_REDUCER_ACTION_TYPE.UPDATE_USERNAME:
            return {
                ...state,
                user: {
                    ...state.user,
                    username: action.payload
                }
            };
        default:
            return state;
    }
};
