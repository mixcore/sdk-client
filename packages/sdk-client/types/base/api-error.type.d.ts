import { AxiosError } from 'axios';
export type TApiError = AxiosError<{
    code?: string;
    message?: string;
}>;
