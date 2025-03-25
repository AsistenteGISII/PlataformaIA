import { ReactNode, useReducer, useEffect } from "react";
import { UserContext } from "./UserContext";
import { User, UserState } from "./types";
import { userReducer, USER_REDUCER_ACTION_TYPE } from "./reducer";
import { isExpired } from 'react-jwt';

type UserProviderProps = {
    children: ReactNode
}

const init = () => {
    const userFromLocalStorage = localStorage.getItem('user');
    let user: User = {
        email: "",
        id: 0,
        token: "",
        fullname: "",
        username: "",
        verified: true,
        user_role: ""
    }

    let found = false;

    if (typeof userFromLocalStorage === 'string') {
        user = JSON.parse(userFromLocalStorage);
        found = true;
    }

    return {
        logged: found,
        user: user
    }
}

const initState: UserState = {
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
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [state, dispatch] = useReducer(userReducer, initState, init);

    useEffect(() => {
        const interval = setInterval(() => {
            const userFromLocalStorage = localStorage.getItem('user');
            if (userFromLocalStorage) {
                const user = JSON.parse(userFromLocalStorage);
                if (isExpired(user.token)) {
                    logout();
                }
            }
        }, 60000); // Verificar cada minuto

        return () => clearInterval(interval);
    }, []);

    const login = (userData: User, token: string) => {
        const updatedUser = { ...userData, token };
        const action = {
            type: USER_REDUCER_ACTION_TYPE.LOGIN,
            payload: updatedUser
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        dispatch(action);
    }

    const updateUsername = (newUsername: string) => {
        dispatch({
            type: USER_REDUCER_ACTION_TYPE.UPDATE_USERNAME,
            payload: newUsername
        });
    };

    const logout = () => {
        localStorage.removeItem('user');
        const action = { type: USER_REDUCER_ACTION_TYPE.LOGOUT };
        dispatch(action);
        
    }

    return (
        <UserContext.Provider value={{
            ...state,
            login,
            updateUsername,
            logout
        }}>
            {children}
        </UserContext.Provider>
    )
}
