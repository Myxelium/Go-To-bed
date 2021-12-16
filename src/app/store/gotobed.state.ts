export const storeName = "Gotobed";

export interface GotobedState {
    command: string;
    isLoading: boolean;
    protocol: string;
    port: string;
    address: string;
    isConnected: boolean;
}


export const initialGotoBedState: GotobedState = {
    command: '',
    isLoading: false,
    protocol: '',
    port: '',
    address: 'localhost:8080',
    isConnected: false,
}