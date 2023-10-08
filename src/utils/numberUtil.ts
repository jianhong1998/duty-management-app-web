export default class NumberUtil {
    static getDigitNumber(number: number): number {
        const newNumber = number < 0 ? number * -1 : number;

        return Math.floor(Math.log10(newNumber)) + 1;
    }

    static getNumberAt(number: number, index: number): number {
        const totalDigit = this.getDigitNumber(number);

        if (Number.isNaN(number) || index >= totalDigit || index < 0) {
            return NaN;
        }

        return Math.floor(number / Math.pow(10, totalDigit - index - 1)) % 10;
    }
}
