export const addressStorageKey = 'AddressKey';
export const portStorageKey = 'PortKey';
export const protocolStorageKey = 'ProtocolKey';
export const commandStorageKey = 'CommandKey';
export const macStorageKey = 'MacKey';
export const wolStorageKey = 'WolKey';

export interface InputChangeEventDetail {
    value: string | undefined | null;
}

export interface InputCustomEvent extends CustomEvent {
    detail: InputChangeEventDetail;
    target: HTMLIonInputElement;
}

export interface NetRequest{
    command: string;
}

export interface ServiceOptions {
    name: string;
    host?: string | undefined;
    port: number;
    type: string;
    subtypes?: string[] | undefined;
    protocol?: 'udp'|'tcp' | undefined;
    txt?: { [key: string]: string } | undefined;
    probe?: boolean | undefined;
}

export interface LocalZeroconf {
    domain: string;
    type: string;
    name: string;
    port: number;
    hostname: string;
    ipv4Addresses: string[];
    ipv6Addresses: string[];
    txtRecord: macAddress;
}

export interface macAddress {
    mac: string;
}