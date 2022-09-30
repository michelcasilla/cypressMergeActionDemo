import { ascendUnknown } from "../DataGenerator/ASCENDTypes";

export class StoreService {
    
    static instance;
    
    public data: ascendUnknown = {};

    private _condition = null;

    get condition(): boolean {
        return this._condition ?? true;
    }

    set condition(condition: boolean) {
        this._condition = condition;
    }

    static getStore(force = false): StoreService {
        if (!StoreService.instance || force) {
            StoreService.instance = new StoreService();
        }
        return StoreService.instance;
    }

    public setItem(keyname: string, value: ascendUnknown): void{
        this.data[keyname] = value;
    }
    
    public getItem(keyname: string, defaultValue?: string): ascendUnknown{
       return this.data[keyname] ?? defaultValue ?? null;
    }
} 