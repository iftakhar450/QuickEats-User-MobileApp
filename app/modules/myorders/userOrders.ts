import {Items} from "./Fooditem";

export class Orders {

    public order_id: string;
    public restaurant_name: string;
    public restaurant_addrss: string;
    public restaurant_contact: string;
    public rider_name: string;
    public rider_mobile_no: string;
    public rider_tip: string;
    public rider_lat: string;
    public rider_lan: string;

    public order_payment: string;
    public order_status: string;
    public order_lat: string;
    public order_lan: string;
    public rider_id:number;
    //public menuitems:string[]=[];
    public menuitems: Items[] = [];

    constructor(id: string, rest_name: string, rest_add: string,
                rest_cont: string, r_name: string, r_m_no: string,
                o_payment: string, o_status: string, items:Items[],
                r_lat: string, r_lan: string, o_lat: string,
                o_lan: string,r_tip:string,r_id ){
        this.order_id = id;
        this.restaurant_name = rest_name;
        this.restaurant_addrss = rest_add;
        this.restaurant_contact = rest_cont;
        this.rider_name = r_name;
        this.rider_mobile_no = r_m_no;
        this.rider_tip = r_tip;
        this.order_payment = o_payment;
        this.order_status = o_status;
        this.menuitems = items;
        this.rider_lat = r_lat;
        this.rider_lan = r_lan;
        this.order_lat = o_lat;
        this.order_lan = o_lan;
    this.rider_id=r_id;

    }


}


