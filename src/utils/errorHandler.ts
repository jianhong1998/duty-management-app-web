import ToastifyController from './toastifyController';

export default class ErrorHandler {
    static activeToast(error: unknown): void {
        if (error instanceof Error) {
            ToastifyController.activeError(error.message);
            return;
        }

        ToastifyController.activeError(JSON.stringify(error));
    }
}
