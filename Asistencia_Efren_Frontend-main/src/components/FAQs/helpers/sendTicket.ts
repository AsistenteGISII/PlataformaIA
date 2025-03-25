import axios from "axios";
import { TicketForm } from "../types/TicketRedactionForm";
import api from "../../../context/UserContext/API";


const URL_TICKET = "/ticket";

export const sendTicket = async (formInformation: TicketForm) => {
    const { id_user, title, message, status } = formInformation;

    let validations = {
        id_user
    };

    try {
        const res = await api.post(`${URL_TICKET}`, { id_user, title, message, status });

        // Verificar si hay errores en la respuesta
        if (res.data?.errors) {
            res.data.errors.forEach((element: any) => {
                switch (element.param) {
                    case "id_user":
                        validations.id_user > 0;
                        break;
                    default:
                        break;
                }
            });
        }
    } catch (error) {
        // Manejar el error de la solicitud HTTP
        console.error("Error:", error);
    }

    return validations;
};
