import {itemdetail} from "./itemdetail";

export class menudetail {


   public menu_id: number;
    public menu_name:string;
    public menu_items:itemdetail[]=[];
    public length:number;



    constructor(id: number, name: string,items:itemdetail[],l:number) {

        this.menu_id = id;
        this.menu_name = name;
        this.menu_items=items;
        this.length = l;


    }

}
