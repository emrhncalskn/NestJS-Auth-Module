export class ErrorMessages {
    static USER_NOT_FOUND() {
        return {
            tr: "Kullanıcı bulunamadı",
            en: "User not found"
        }
    }
    static USER_ALREADY_EXISTS() {
        return {
            tr: "Kullanıcı zaten var",
            en: "User already exists"
        }
    }
    static EMAIL_ALREADY_EXISTS() {
        return {
            tr: "Bu email adresi zaten kullanılmaktadır",
            en: "This email address is already in use"
        }
    }
    static EMAIL_OR_PASSWORD_INCORRECT() {
        return {
            tr: "Email veya şifre hatalı",
            en: "Email or password incorrect"
        }
    }
}