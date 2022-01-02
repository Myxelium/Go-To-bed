import { addressStorageKey, portStorageKey, protocolStorageKey } from '../gotobed.models';

export const storeName = 'Gotobed';

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
    protocol: localStorage.getItem(protocolStorageKey) ?? 'http',
    port: localStorage.getItem(portStorageKey) ?? '3000',
    address: localStorage.getItem(addressStorageKey) ?? 'localhost:8080',
    isConnected: false,
};

export interface LoadSettingsState {
    protocol: string;
    port: string;
    address: string;
}
