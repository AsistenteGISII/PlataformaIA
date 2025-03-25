import { useContext } from "react";
import { UserContext } from "../../../context/UserContext/UserContext";
import { useJwt } from "react-jwt";

export const getIdUser = () => {
    const ContxValues = useContext(UserContext);

    // Obtener el ID de usuario del token cuando el componente se monta
    const token = ContxValues?.user.token;
    const { decodedToken } = useJwt(token ? token : '');
    const userId = decodedToken?.user.id;
    console.log(userId, "")

    return userId;
}