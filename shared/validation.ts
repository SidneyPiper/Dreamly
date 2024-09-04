const validateUsername = (username: string) => {
    return username.trim().length > 0;
}

const validateEmail = (email: string): boolean => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(email);
}

const MIN_LENGTH = 8;
const hasMinLength = (password: string) => password.length >= MIN_LENGTH
const hasUpperCase = (password: string) => /[A-Z]/.test(password)
const hasLowerCase = (password: string) => /[a-z]/.test(password)
const hasNumber = (password: string) => /[0-9]/.test(password)
const hasSpecialChar = (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password)

const validatePassword = (password: string) => {
    return hasMinLength(password)
        && hasUpperCase(password)
        && hasLowerCase(password)
        && hasNumber(password)
        && hasSpecialChar(password)
}

export {validateEmail, validatePassword, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar, hasMinLength, validateUsername}