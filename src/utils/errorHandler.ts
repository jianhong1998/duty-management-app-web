import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import ToastifyController from './toastifyController';
import { SerializedError } from '@reduxjs/toolkit';
import StandardErrorMessage from '../models/error/errorMessage.enum';
import FetchErrorMessage from '../models/error/fetchErrorMessage.enum';

export default class ErrorHandler {
    static activeToast(error: unknown): void {
        if (error instanceof Error) {
            ToastifyController.activeError(error.message);
            return;
        }

        if (
            typeof error === 'object' &&
            error !== null &&
            'message' in error &&
            typeof error.message === 'string'
        ) {
            ToastifyController.activeError(error.message);
            return;
        }

        let errorMessage: string;

        if (this.isFetchBaseQueryError(error)) {
            if (typeof error.status === 'number') {
                if (
                    typeof error.data === 'object' &&
                    error.data !== null &&
                    'errorMessage' in error.data
                ) {
                    ToastifyController.activeError(
                        String(error.data.errorMessage),
                    );

                    return;
                }

                switch (error.status) {
                    case 204:
                        ToastifyController.activeError('Deleted');
                        break;
                    case 304:
                        ToastifyController.activeError('Data no changes');
                        break;
                    default:
                        console.log(
                            `Received status code ${error.status}: `,
                            error,
                        );

                        ToastifyController.activeError(
                            'Something went wrong, please try again',
                        );
                        break;
                }

                return;
            }

            switch (error.status) {
                case 'FETCH_ERROR':
                    errorMessage = error.error;
                    if (
                        errorMessage === FetchErrorMessage.FAIL_TO_FETCH_MESSAGE
                    ) {
                        errorMessage =
                            StandardErrorMessage.SERVER_CONNECTION_REFUSE;
                    }

                    ToastifyController.activeError(errorMessage);
                    return;
                case 'TIMEOUT_ERROR':
                case 'PARSING_ERROR':
                    ToastifyController.activeError(error.error);
                    return;
                case 'CUSTOM_ERROR':
                    console.log(error.error);
                    return;
                default:
                    return;
            }
        }

        if (this.isSerializedError(error)) {
            ToastifyController.activeError(
                error.message ||
                    error.code ||
                    error.name ||
                    '(Serialized Error) Something went wrong',
            );
        }

        ToastifyController.activeError(JSON.stringify(error));
    }

    static isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
        return typeof error === 'object' && error != null && 'status' in error;
    }

    static isSerializedError(error: unknown): error is SerializedError {
        return (
            typeof error === 'object' &&
            error instanceof Error &&
            error.name === 'SerializedError'
        );
    }
}
