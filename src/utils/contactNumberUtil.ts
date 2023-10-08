import { COUNTRY_CODE } from '../constants/countryCode';
import NumberUtil from './numberUtil';

export default class ContactNumberUtil {
    static convertContactNumberToString(contactNumber: number): string {
        const digitNumber = NumberUtil.getDigitNumber(contactNumber);

        const contactNumberString = String(contactNumber);

        switch (digitNumber) {
            case 9:
                return `0${contactNumberString.slice(
                    0,
                    2,
                )}-${contactNumberString.slice(2, 9)}`;
            case 10:
                return `0${contactNumberString.slice(
                    0,
                    3,
                )}-${contactNumberString.slice(3, 9)}`;
            default:
                throw new Error('Invalid contact number');
        }
    }

    static convertContactNumberToFormettedString(
        contactNumber: number,
    ): string {
        let stringValue = contactNumber.toString();

        if (stringValue.length === 10) {
            stringValue = `${COUNTRY_CODE} ${stringValue.slice(
                0,
                3,
            )} ${stringValue.slice(3, 6)} ${stringValue.slice(6)}`;
        } else if (stringValue.length > 5) {
            stringValue = `${COUNTRY_CODE} ${stringValue.slice(
                0,
                2,
            )} ${stringValue.slice(2, 5)} ${stringValue.slice(5)}`;
        } else if (stringValue.length > 2) {
            stringValue = `${COUNTRY_CODE} ${stringValue.slice(
                0,
                2,
            )} ${stringValue.slice(2)}`;
        } else {
            stringValue = `${COUNTRY_CODE} ${stringValue.slice(
                0,
                stringValue.length,
            )}`;
        }

        return stringValue;
    }

    static isContactNumberValid(contactNumber: number): boolean {
        return (
            (NumberUtil.getDigitNumber(contactNumber) === 9 ||
                NumberUtil.getDigitNumber(contactNumber) === 10) &&
            NumberUtil.getNumberAt(contactNumber, 0) === 1
        );
    }
}
