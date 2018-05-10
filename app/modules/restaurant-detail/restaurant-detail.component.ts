import { Component, OnInit } from "@angular/core";
import { TextField } from "ui/text-field"
import { Page } from "ui/page";
import { Restaurant } from "../restaurants/resturants";
import { RestaurantService } from "../restaurants/restaurants.service";
import { ActivatedRoute } from "@angular/router";
import { itemdetail } from "./itemdetail";
import { Router } from "@angular/router";
import {RouterExtensions} from "nativescript-angular";
import {RestaurantDetailService} from "./restaurant-detail.service"
import { getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey,remove,clear} from "application-settings";
import {ObservableArray} from "tns-core-modules/data/observable-array";
import { isAndroid, isIOS, device, screen } from "platform";
import {addToCartService} from "../add-to-cart-datail/add-to-cart.service";
import * as application from "application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import {menudetail} from "./menu";

class DeviceInfo {
    constructor(
        public uuid: string
    ) { }
}



@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./restaurant-detail.component.html",
    styleUrls: ['./restaurant-detail.css']

})
export class restaurantdetailComponent implements OnInit {

    restaurant: Restaurant;
    public add_to_cart: number=0;
    public cart_cal: number=0;
    public no_partclr_item: number=0;

    public action_bar_title: string;
    public restaurant_image: string;
    public special_combo: string = "Have four Hotboxes or salads with four Drinks,plus four sodes or treats ";
    public obj:itemdetail;
    public isBusy = true;


    public menus:menudetail[] = [];
    public itemdetails:itemdetail[] = [];

    public host: string;
    public userAgent: string;
    public origin: string;
    public url: string;
    public listheight: any=20*20;


    public cartItems = new Array<itemdetail>();


    public deviceInformation: DeviceInfo;


    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.


    constructor(private restDetailService: RestaurantDetailService,private routerExtensions: RouterExtensions,private page: Page,
                private restaurantService: RestaurantService, private route: ActivatedRoute, private router:Router,private CartService:addToCartService) {
        //RestaurantService.add_to_cart_items = new Array<itemdetail>();

        this.deviceInformation = new DeviceInfo(device.uuid);
    }





    ngOnInit(): void {

        this.get_cart(this.deviceInformation.uuid);

        if (!isAndroid) {
            return;
        }
        application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            if (this.router.isActive("/restaurants-detail", true)) {
                data.cancel = true; // prevents default back button behavior
                this.goBack();
            }
        });

        const id = +this.route.snapshot.params["id"];
        setString("rest_id",JSON.stringify(id));
        this.extractData(id);

        let abc = new ObservableArray("sds", "2", "3");
           setString("items", abc[0]);
        console.log(getString("items"));



    }
    parString:any;
    parStrSeperate:any;
    parAgString:any;
    parAgStrSeperate:any;
    extractData(id:number) {
        this.restDetailService.getData(id)
            .subscribe((result) => {

/*

                console.log("---------------------------------------------------------------");
                console.log(JSON.stringify(result));
                console.log("---------------------------------------------------------------");*/


                this.parString = JSON.stringify(result);
                this.parStrSeperate = JSON.parse(this.parString);


                let restStr=JSON.stringify(this.parStrSeperate._body.response);
                let restPar = JSON.parse(restStr);
                this.restaurant_image=restPar.restaurant_image_url;
               // console.log(restImage);


                this.parAgString = JSON.stringify(this.parStrSeperate._body.itemsResponse);
                this.parAgStrSeperate = JSON.parse(this.parAgString);


     /*  console.log("----------------------------menus-----------------------------------");
                console.log(JSON.stringify(this.parAgStrSeperate)+"------------------"+this.parAgStrSeperate.length);
                console.log("-------------------------------menus--------------------------------");
                console.log("----------------------------menusitems-----------------------------------");
                console.log(JSON.stringify(this.parAgStrSeperate[0].fooditem_to_menu_Fk)+"------------------"+this.parAgStrSeperate[0].fooditem_to_menu_Fk.length);
                console.log("-------------------------------menusitems--------------------------------");*/

                for(let i=0;i<this.parAgStrSeperate.length;i++){
                    let foodStr = JSON.stringify(this.parAgStrSeperate[i].fooditem_to_menu_Fk);
                    let foodStrPar = JSON.parse(foodStr);
                     let menuitems:itemdetail[] = [];
                    let m_name=this.parAgStrSeperate[i].menu_type;
                   let m_id=this.parAgStrSeperate[i].menu_id;


                    for(let j=0;j<this.parAgStrSeperate[i].fooditem_to_menu_Fk.length;j++){
                        let item = new itemdetail(foodStrPar[j].item_id,foodStrPar[j].item_name,foodStrPar[j].item_type,
                            foodStrPar[j].item_price,foodStrPar[j].item_detail,foodStrPar[j].item_time,foodStrPar[j].cooking_time,
                            foodStrPar[j].menu_id);
                            this.itemdetails.push(item);
                            menuitems.push(item);


                    }
                    this.menus[i]=new menudetail(m_id,m_name,menuitems,menuitems.length);
                    // this.menus.push(m_id,m_name,menuitems);


                }


                console.log("----------------------------final1111-----------------------------------");
                console.log(JSON.stringify(this.menus));
                console.log("-------------------------------final-11111-------------------------------");
                //console.log(this.parAgStrSeperate.length);

                /*    for (let i = 0; i < this.parAgStrSeperate.length; i++) {
                       let foodStr = JSON.stringify(this.parAgStrSeperate[i].fooditem_to_menu_Fk);
                       let foodStrPar = JSON.parse(foodStr);


                       //console.log("ARRAY name :"+foodStrPar.length);
                      for (let j = 0; j < foodStrPar.length; j++) {
                           console.log(j+"j");

                           let item = new itemdetail(foodStrPar[j].item_id,foodStrPar[j].item_name,foodStrPar[j].item_type,
                               foodStrPar[j].item_price,foodStrPar[j].item_detail,foodStrPar[j].item_time,foodStrPar[j].cooking_time,
                               foodStrPar[j].menu_id);

                           this.itemdetails.push(item);
                           console.log("wwwwwwwwwww"+this.itemdetails[j].id);
                       }
                   }*/

                   for (let a = 0; a < this.itemdetails.length; a++) {
                       for (let b = 0; b < addToCartService.user_cart.length; b++) {
                           if(this.itemdetails[a].id==addToCartService.user_cart[b].id)
                           {
                               this.itemdetails[a].quantity+=addToCartService.user_cart[b].quantity;
                               this.add_to_cart+=this.itemdetails[a].quantity;
                               this.cart_cal+=this.itemdetails[a].quantity*this.itemdetails[a].price;
                           }

                       }
                   }
                this.isBusy = false;
            }, (error) => {
                console.log("error")
                console.log(JSON.stringify(error));

            });
    }


    ondetailItemTap(args,menuindex) {


        console.log(this.menus[menuindex].menu_items[args.index].price);

          this.add_to_cart++;
          this.cart_cal +=Number.parseInt(this.menus[menuindex].menu_items[args.index].price.toString());
        this.menus[menuindex].menu_items[args.index].quantity=this.menus[menuindex].menu_items[args.index].quantity+1;
            this.obj=this.menus[menuindex].menu_items[args.index];
          this.post_cart_data();
    }

    on_add_cart_tap() {
        this.router.navigate(["/add-to-cart-detail"]);
        console.log(RestaurantService.add_to_cart_items);
    }
    post_cart_data() {
        this.restDetailService
            .post_to_cart({device_id:this.deviceInformation.uuid, item_id: this.obj.id, item_name:this.obj.name, item_type:this.obj.type
                ,item_price:this.obj.price, item_detail:this.obj.detail, item_time:this.obj.time, cooking_time:this.obj.cooking_time,
                menu_id:this.obj.menuID   })
            .subscribe(res => {
                    console.log("res"+JSON.stringify(res));
                    },
                (error) => {
                    console.log(JSON.stringify("error"+error));
                });
    }

    get_cart(id) {

        this.CartService
            .get_From_Cart(id)
            .subscribe((result) => {
                let string_response = JSON.stringify(result);
                let helper = JSON.parse(string_response);
                for (let i = 0; i < helper._body.cart.length; i++) {
                    let check=0;
                    let item = new itemdetail(helper._body.cart[i].item_id,helper._body.cart[i].item_name,helper._body.cart[i].item_type,
                        helper._body.cart[i].item_price,helper._body.cart[i].item_detail,helper._body.cart[i].item_time,helper._body.cart[i].cooking_time,
                        helper._body.cart[i].menu_id);
                    item.quantity=1;

                    for (let j = 0; j < this.cartItems.length; j++) {
                        if(this.cartItems[j].id==helper._body.cart[i].item_id)
                        {
                            this.cartItems[j].quantity += 1;
                            check=1;
                        }

                    }
                    if(check==0){
                        this.cartItems.push(item);
                    }

                }
                this.assignToCart();

            }, (error) => {
                console.log(JSON.stringify(error));

            });
    }

    public assignToCart() {
        let len=addToCartService.user_cart.length;
        addToCartService.user_cart.splice(0,len)
        for (let l = 0; l < this.cartItems.length; l++) {
            addToCartService.user_cart.push(this.cartItems[l]);
        }
    }
    noWhere(){

    }
    public goBack() {
        this.routerExtensions.navigate(["/restaurants"], {
            clearHistory: true,
            transition: {
                name: "flip",
                duration: 500,
                curve: "linear"
            }
        });
    }


}

