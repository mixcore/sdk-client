export declare class SafeLocalStorage {
    static getItem<T = string>(key: string): T | null;
    static setItem(key: string, value: string): void;
    static removeItem(key: string): void;
}
