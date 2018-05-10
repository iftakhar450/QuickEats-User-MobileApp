export class itemdetail {


    id: number;
    name:string;
    type: string;
    price: number;
    detail: string;
    time: string;
    cooking_time: string;
    quantity:number;
    menuID:number;


    constructor(id: number, name: string, type: string, price: number, detail: string, time:string
        , cooking_time:string, menu_id:number) {

        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.detail = detail;
        this.time = time;
        this.cooking_time = cooking_time;
        this.quantity=0;
        this.menuID = menu_id;

    }

}
