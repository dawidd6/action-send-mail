import { CallbackFunction } from './types';
export declare const errorObj: {
    e: {};
};
declare function tryCatcher(err: Error, val?: any): any;
export declare function tryCatch(fn: CallbackFunction): typeof tryCatcher;
export {};
