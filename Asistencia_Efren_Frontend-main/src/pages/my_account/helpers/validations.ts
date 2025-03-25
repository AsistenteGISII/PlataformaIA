export const validFullName = (name: string): boolean => {
    const validNameRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
    return validNameRegex.test(name);
}

export const validPasswordLength = (password: string): boolean => {
    return password.length >= 8;
}

export const validEmailFormat = (email: string): boolean => {
    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validEmailRegex.test(email);
};

export const validPasswordComplexity = (password: string): boolean => {
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const numberRegex = /\d/;
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;

    return upperCaseRegex.test(password) &&
           lowerCaseRegex.test(password) &&
           numberRegex.test(password) &&
           symbolRegex.test(password);
}

export const passwordsAreTheSame = (password: string, confPassword: string): boolean => {
    return password === confPassword;
}

export const validateFormData = (name: string, email:string, password: string) => {
    const validUName = validFullName(name);
    const validEmail = validEmailFormat(email);
    const validPassword = validPasswordLength(password) && validPasswordComplexity(password);

    return {
        validUName,
        validEmail,
        validPassword,
    };
}