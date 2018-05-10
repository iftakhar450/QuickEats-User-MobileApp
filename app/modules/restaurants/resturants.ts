import {KeyboardType} from "tns-core-modules/ui/enums";
import number = KeyboardType.number;

export class Restaurant {
    public id: number;
    public name: string;
    public address: string;
    public contact: string;
    public url: string;
    public delivery_time: string;
    public postal_code: string;
    public phone_no: string;
    public email: string;
    public password: string;
    public username: string;
    public menutype:string[]=[];


    constructor(id: number, name: string, address: string, contact: string, url: string, delievery_time: string, postal_code:string
        , phone_no:string, email:string, password:string, username:string,menutype:string[]){
        this.id=id;
        this.name=name;
        this.address=address;
        this.contact=contact;
        this.url=url;
        this.delivery_time=delievery_time;
        this.postal_code=postal_code;
        this.phone_no=phone_no;
        this.email=email;
        this.password=password;
        this.username=username;
        this.menutype=menutype;
    }



}
