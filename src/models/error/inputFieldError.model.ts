export type IInputFieldError =
    | {
          isError: true;
          message: string;
      }
    | {
          isError: false;
      };
