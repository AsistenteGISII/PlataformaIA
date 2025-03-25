

// Se encarga de validar, mediante expresiones regulares, que el nombre del usuario cumpla los requisitos
const validIdUser = (id_user: number): boolean => {
    if (id_user > 1) {
        return true;
    }
    return false;
}

export const validateTicketFormData = (id_user: number) => {

    const validIdUs = validIdUser(id_user);

    return {
        validIdUs
    };

}