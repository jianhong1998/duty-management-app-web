import { TextField } from '@mui/material';
import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { IInputFieldError } from '../../../models/error/inputFieldError.model';
import { COUNTRY_CODE } from '../../../constants/countryCode';
import ContactNumberUtil from '../../../utils/contactNumberUtil';

interface ContactNumberInputProps {
    contactNumber: number | null;
    label: string;
    contactNumberOnChangeHandler: (changedValue: number | null) => void;
    error?: IInputFieldError;
}

const ContactNumberInput: FC<ContactNumberInputProps> = ({
    contactNumber,
    label,
    contactNumberOnChangeHandler,
    error,
}) => {
    const [displayedValue, setDisplayedValue] = useState<string>('');

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        let changedValue = event.target.value;

        if (changedValue.length > COUNTRY_CODE.length) {
            const numberStrings = changedValue
                .slice(COUNTRY_CODE.length + 1, changedValue.length + 1)
                .split(' ');

            changedValue = numberStrings.join('');
        }

        if (changedValue.length === 0) {
            contactNumberOnChangeHandler(null);
            return;
        }

        if (changedValue.length > 10) {
            return;
        }

        const contactNumber = Number.parseInt(changedValue);

        if (Number.isNaN(contactNumber)) {
            return;
        }

        contactNumberOnChangeHandler(contactNumber);
    };

    useEffect(() => {
        if (contactNumber === null) {
            setDisplayedValue('');
            return;
        }

        if (contactNumber === 0) {
            setDisplayedValue(`${COUNTRY_CODE} `);
            return;
        }

        const stringValue =
            ContactNumberUtil.convertContactNumberToFormettedString(
                contactNumber,
            );

        setDisplayedValue(stringValue);
    }, [contactNumber]);

    return (
        <TextField
            value={displayedValue}
            label={label}
            onChange={onChangeHandler}
            variant='outlined'
            error={error?.isError}
            helperText={error?.isError && error.message ? error.message : ''}
            fullWidth
        />
    );
};

export default ContactNumberInput;
