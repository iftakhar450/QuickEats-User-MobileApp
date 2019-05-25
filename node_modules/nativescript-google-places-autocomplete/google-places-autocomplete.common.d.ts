import { Observable } from 'tns-core-modules/data/observable';
export declare class Common extends Observable {
    private apikey;
    constructor(key: string);
    search(terms: string): Promise<any[]>;
    getPlaceById(placeId: any): Promise<any>;
    private handleErrors(response);
}
