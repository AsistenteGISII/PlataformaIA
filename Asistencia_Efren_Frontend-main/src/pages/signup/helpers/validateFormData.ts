const validFullName = (name: string): boolean => {
    const validNameRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
    return validNameRegex.test(name);
}

const validPasswordLength = (password: string): boolean => {
    return password.length >= 8;
}

const validPasswordComplexity = (password: string): boolean => {
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const numberRegex = /\d/;
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;

    return upperCaseRegex.test(password) &&
           lowerCaseRegex.test(password) &&
           numberRegex.test(password) &&
           symbolRegex.test(password);
}

const passwordsAreTheSame = (password: string, confPassword: string): boolean => {
    return password === confPassword;
}

const validEmailFormat = (email: string): boolean => {
    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validEmailRegex.test(email);
  };
  
export const validateFormData = (fullname: string, email:string, password: string, confPassword: string) => {
    const validUName = validFullName(fullname);
    const validEmail = validEmailFormat(email);
    const validPassword = validPasswordLength(password) && validPasswordComplexity(password);
    const samePasswords = passwordsAreTheSame(password, confPassword);

    return {
        validUName,
        validEmail,
        validPassword,
        samePasswords
    };
}