export interface IActionCallback<T> {
    success: (data: T) => void;
    error: (error: any) => void;
    finally: () => void;
}