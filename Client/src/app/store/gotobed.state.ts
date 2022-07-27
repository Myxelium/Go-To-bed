import { macStorageKey, wolStorageKey } from './../gotobed.models';
import { addressStorageKey, portStorageKey, protocolStorageKey } from '../gotobed.models';

export const storeName = 'Gotobed';

export interface GotobedState {
    command: string;
    isLoading: boolean;
    protocol: string;
    port: string;
    address: string;
    isConnected: boolean;
    macAddress: string;
    wolAddress: string;
}

export const initialGotoBedState: GotobedState = {
    command: '',
    isLoading: false,
    protocol: localStorage.getItem(protocolStorageKey) ?? 'http',
    port: localStorage.getItem(portStorageKey) ?? '3000',
    address: localStorage.getItem(addressStorageKey) ?? 'localhost',
    isConnected: false,
    macAddress: localStorage.getItem(macStorageKey) ?? '',
    wolAddress: localStorage.getItem(wolStorageKey) ?? '',
};

export interface LoadSettingsState {
    protocol: string;
    port: string;
    address: string;
}
