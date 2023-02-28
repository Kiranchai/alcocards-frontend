export interface IModalProps{
    open: boolean;
    onClose: () => void;
    message?:String;
}