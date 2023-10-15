import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import ToastifyController from './toastifyController';
import { SerializedError } from '@reduxjs/toolkit';
import StandardErrorMessage from '../models/error/errorMessage.enum';
import FetchErrorMessage from '../models/error/fetchErrorMessage.enum';

export default class ErrorHandler {
    static activeToast(error: unknown): void {
        if (this.isFetchBaseQueryError(error)) {
            if (typeof error.status === 'number') {
                switch (error.status) {
                    case 304:
                        ToastifyController.activeError(
                            // 'No changes made to the resource due to changes are not detected',
                            "The resource you requested to update has not been modified since there are no changes. If you believe this is an error or you're experiencing issues, please refresh the page, or contact our support team for assistance.",
                        );
                        return;
                    default:
                        ToastifyController.activeError(
                            (error.data as { errorMessage: string })
                                .errorMessage,
                        );
                        return;
                }
            }

            let errorMessage: string;

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
            console.log('Serialized Error');

            ToastifyController.activeError(
                error.message ||
                    error.code ||
                    error.name ||
                    '(Serialized Error) Something went wrong',
            );
        }

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
