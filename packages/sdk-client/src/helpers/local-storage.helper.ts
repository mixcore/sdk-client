export class SafeLocalStorage {
    static getItem<T = string>(key: string): T | null {
        try {
            const value = window.localStorage.getItem(key);
            if (!value) return null;
        
            try {
                return JSON.parse(value) as T;
            } catch {
                return value as T;
            }
        } catch (e) {
            console.warn('LocalStorage is not available:', e);
            return null;
        }
    }

    static setItem(key: string, value: string): void {
        try {
            window.localStorage.setItem(key, value);
        } catch (e) {
            console.warn('LocalStorage is not available:', e);
        }
    }

    static removeItem(key: string): void {
        try {
            window.localStorage.removeItem(key);
        } catch (e) {
            console.warn('LocalStorage is not available:', e);
        }
    }
}

