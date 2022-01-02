export const AddressStorageKey = "AddressKey";
export const PortStorageKey = "PortKey";
export const ProtocolStorageKey = "ProtocolKey";
export const CommandStorageKey = "CommandKey";


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