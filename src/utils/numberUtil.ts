export default class NumberUtil {
    static getDigitNumber(number: number): number {
        return Math.floor(Math.log10(number)) + 1;
    }
}
