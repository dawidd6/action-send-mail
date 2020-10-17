import { CallbackFunction } from './types';
export interface IOptions {
    spread: boolean;
}
export default function asCallback(promise: Promise<any>, nodeback: CallbackFunction, options?: IOptions): Promise<any>;
