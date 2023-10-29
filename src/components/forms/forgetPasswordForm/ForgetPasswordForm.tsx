import {
    ChangeEventHandler,
    FC,
    MouseEventHandler,
    useEffect,
    useState,
} from 'react';
import TextInput from '../../common/input/TextInput';
import PrimaryButton from '../../common/buttons/PrimaryButton';
import EmailAddressUtil from '../../../utils/emailAddressUtil';
import { useForgetUserAccountPasswordMutation } from '../../../store/api/password.api';
import { QueryStatus } from '@reduxjs/toolkit/query/react';
import ToastifyController from '../../../utils/toastifyController';
import ErrorHandler from '../../../utils/errorHandler';
import { useNavigate } from 'react-router-dom';

const ForgetPasswordForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);

    const navigate = useNavigate();

    const [
        sendForgetPasswordRequest,
        { status, data, error, reset: resetForgetPasswordMutation },
    ] = useForgetUserAccountPasswordMutation();

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        const emailAddress = event.target.value;

        setEmail(emailAddress.trim());
    };

    const sendEmailButtonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        sendForgetPasswordRequest({ email });
    };

    const backButtonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        navigate('/login');
    };

    useEffect(() => {
        setIsValidEmail(EmailAddressUtil.isEmailAddressValid(email));
    }, [email]);

    useEffect(() => {
        if (status === QueryStatus.fulfilled && data?.isSuccess) {
            ToastifyController.activeSuccess(data.data.message);

            resetForgetPasswordMutation();
            navigate('/login');
        }

        if (status === QueryStatus.rejected && error) {
            ErrorHandler.activeToast(error);

            resetForgetPasswordMutation();
        }
    }, [status, data, error, resetForgetPasswordMutation, navigate]);

    return (
        <>
            <TextInput
                value={email}
                label='Email Address'
                onChangeFn={onChangeHandler}
            />
            <PrimaryButton
                onClickHanlder={sendEmailButtonOnClickHandler}
                disabled={!isValidEmail}
            >
                Send Email
            </PrimaryButton>
            <PrimaryButton onClickHanlder={backButtonOnClickHandler}>
                Back to Login Page
            </PrimaryButton>
        </>
    );
};

export default ForgetPasswordForm;
