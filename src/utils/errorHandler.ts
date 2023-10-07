import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import ToastifyController from './toastifyController';
import { SerializedError } from '@reduxjs/toolkit';

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

        if (this.isFetchBaseQueryError(error)) {
            switch (error.status) {
                case 'FETCH_ERROR':
                case 'TIMEOUT_ERROR':
                case 'PARSING_ERROR':
                case 'CUSTOM_ERROR':
                    ToastifyController.activeError(error.error);
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
