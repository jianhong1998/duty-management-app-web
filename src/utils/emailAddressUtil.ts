export default class EmailAddressUtil {
    static isEmailAddressValid(emailAddress: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailAddress);
    }
}
