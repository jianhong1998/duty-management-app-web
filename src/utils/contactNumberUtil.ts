import NumberUtil from './numberUtil';

export default class ContactNumberUtil {
    static convertContactNumberToString(contactNumber: number): string {
        const digitNumber = NumberUtil.getDigitNumber(contactNumber);

        const contactNumberString = String(contactNumber);

        switch (digitNumber) {
            case 9:
                return `0${contactNumberString.slice(
                    0,
                    2
                )}-${contactNumberString.slice(2, 9)}`;
            case 10:
                return `0${contactNumberString.slice(
                    0,
                    3
                )}-${contactNumberString.slice(3, 9)}`;
            default:
                throw new Error('Invalid contact number');
        }
    }
}
