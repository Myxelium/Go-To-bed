export const addressStorageKey = 'AddressKey';
export const portStorageKey = 'PortKey';
export const protocolStorageKey = 'ProtocolKey';
export const commandStorageKey = 'CommandKey';


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
