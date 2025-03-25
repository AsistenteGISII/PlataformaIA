import { createContext } from "react";
import { User } from "./types/User";

interface CurrentUserContextType {
    user: User;
    logged: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
    updateUsername: (newUsername: string) => void;
}

export const UserContext = createContext<CurrentUserContextType | null>(null);
