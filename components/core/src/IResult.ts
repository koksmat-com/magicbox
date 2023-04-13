export interface IResult<T> {
    hasError: boolean;
    timedOut?: boolean;
    errorMessage?: string;
    data?: T;
  }