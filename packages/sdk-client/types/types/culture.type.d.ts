export interface ICulture {
    id?: number;
    specificulture: string;
    lcid: string;
    alias: string;
    fullName: string;
    description: string;
    icon: string;
    isSupported: boolean;
    displayName?: string;
}
