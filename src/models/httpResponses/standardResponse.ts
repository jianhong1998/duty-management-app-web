interface SuccessResponse<T> {
    isSuccess: true;
    data: T;
}

interface FailureReponse {
    isSuccess: false;
    errorMessage: string;
}

type StandardResponse<T> = SuccessResponse<T> | FailureReponse;

export default StandardResponse;
