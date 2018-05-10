
export class Items {

        public  item_id:number;
    public item_name: string;
    public item_price: string;
    public item_quantity:number;
   // public  item_quantity:number;


    constructor(i_name:string,i_price:string,id:number,quantity:number){

        this.item_name=i_name;
        this.item_price=i_price;
        this.item_id=id;
        this.item_quantity=quantity;
 //       this.item_quantity=i_q;


    }


}
