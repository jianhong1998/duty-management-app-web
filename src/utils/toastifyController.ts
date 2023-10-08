import { ToastOptions, toast } from 'react-toastify';

export default class ToastifyController {
    private static readonly TOAST_SETTING: ToastOptions = {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    };

    static activeError(errorMessage: string) {
        toast.error(errorMessage, this.TOAST_SETTING);
    }

    static activeSuccess(message: string) {
        toast.success(message, this.TOAST_SETTING);
    }
}
