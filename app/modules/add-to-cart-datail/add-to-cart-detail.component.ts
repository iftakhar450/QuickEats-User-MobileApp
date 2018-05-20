import { Component, OnInit } from "@angular/core";
import { TextField } from "ui/text-field"
import { Page } from "ui/page";
import { Restaurant } from "../restaurants/resturants";
import { RestaurantService } from "../restaurants/restaurants.service";
import { ActivatedRoute } from "@angular/router";
import { restaurantdetailComponent } from "../restaurant-detail/restaurant-detail.component";
import { itemdetail } from "../restaurant-detail/itemdetail";
import {KeyboardType} from "tns-core-modules/ui/enums";
import number = KeyboardType.number;
import {setString,getString,setNumber,getNumber,setBoolean,getBoolean} from "tns-core-modules/application-settings";
import * as elementRegistryModule from 'nativescript-angular/element-registry';
import { Router } from "@angular/router";
import {RouterExtensions} from "nativescript-angular";
import {addToCartService} from "./add-to-cart.service";
elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);
import * as dialogs from "ui/dialogs";
import { isAndroid, isIOS, device, screen } from "platform";
import * as application from "application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import {AbsoluteLayout} from "tns-core-modules/ui/layouts/absolute-layout";

var dialog = require("nativescript-dialog");
class DeviceInfo {
    constructor(
        public uuid: string
    ) { }
}


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./add-to-cart-detail.component.html",
    styleUrls: ['./add-to-cart-detail.css']

})
export class addtocartdetailComponent implements OnInit {

    public totalPrice:number =0;
    public rider_tip:number=0;
    public delivery_fee:number=2;
    public grand_total:any;
    public delete_item_id:any;
    public delete_item_index:any;



    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.


    public add_to_cart_items = new Array<itemdetail>();
    public cartItems = new Array<itemdetail>();
    public cartItemsLength:any;

    public deviceInformation: DeviceInfo;
    public rest_id: any;

    constructor(private router:Router,private CartService:addToCartService,private routerExtensions: RouterExtensions,
                private page: Page, private restaurantService: RestaurantService,
                private route: ActivatedRoute) {
        this.deviceInformation = new DeviceInfo(device.uuid);
    }

    ngOnInit(): void {
        this.get_cart(this.deviceInformation.uuid);
        this.rest_id=parseInt(getString("rest_id"));

        if (!isAndroid) {
            return;
        }
        application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            if (this.router.isActive("/add-to-cart-detail", true)) {
                data.cancel = true; // prevents default back button behavior
                this.goBack();
            }
        });
    }
    removeZeroEntryElement(arr:itemdetail[]) {
        for (let i = 0; i < arr.length; i++) {
            //console.log(arr.length);
            if (arr[i].quantity == 0) {
                arr.splice(i, 1);
                //console.log(arr);
                i = -1;
            }
        }
        this.add_to_cart_items = arr;
        for (let i = 0; i < arr.length; i++) {
            this.totalPrice = this.totalPrice + (arr[i].price * arr[i].quantity);
        }

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
                          //addToCartService.user_cart[j].quantity=1;
                          this.totalPrice = parseInt(JSON.stringify(this.totalPrice)) + parseInt(helper._body.cart[i].item_price);
                           this.grand_total=this.totalPrice+this.delivery_fee+this.rider_tip;
                          check=1;
                       }

                    }
                    if(check==0){
                        this.cartItems.push(item);
                        //addToCartService.user_cart.push(item);
                        this.totalPrice = parseInt(JSON.stringify(this.totalPrice)) + parseInt(helper._body.cart[i].item_price);
                        this.grand_total=this.totalPrice+this.delivery_fee+this.rider_tip;
                        this.cartItemsLength=1;
                    }

                }

            }, (error) => {
                //this.onGetDataError(error);
                console.log(JSON.stringify(error));
              //  alert( console.log(JSON.stringify(error._body.message)));
            });
    }

    public goBack() {

        this.routerExtensions.navigate(["/restaurants-detail", this.rest_id], {
            clearHistory: true,
            transition: {
                name: "flip",
                duration: 500,
                curve: "linear"
            }
        });
    }
    onchkout(){
        let token=getString("access_token");

        if(token==""){
            let that=this;
            let layout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("customalert");

            layout.visibility="visible";
            let layout1: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("deleteItemalert");
            layout1.visibility="collapse";


        }
        else{
            let that=this;
            console.log("called");
            let len=addToCartService.user_cart.length;
            addToCartService.user_cart.splice(0,len)
            for (let l = 0; l < that.cartItems.length; l++) {
                addToCartService.user_cart.push(that.cartItems[l]);
            }
            if(!this.rider_tip)
                this.rider_tip=0;
            console.log("called  1"+that.rider_tip);
            setString("rider_tip",JSON.stringify(that.rider_tip));
            console.log("called   3" );

            that.router.navigate(["/checkout",that.totalPrice]);
            console.log("called  5");
        }
    }

    delItem(id,index){
                this.delete_item_id=id;
                this.delete_item_index=index;
        let layout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("deleteItemalert");
        layout.visibility="visible";
        let layout1: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("customalert");

        layout1.visibility="collapse";

        /*
                let that=this;
                dialog.show({
                        title: "Attention",
                        message: "Sure To Delete ?",
                        cancelButtonText: "Cancel",
                        okButtonText:"Yes"

                    }).then(function(r){


                    console.log("Result: " + r);
                    if(r==true){

                        that.CartService
                            .del_cart_item(id)
                            .subscribe((result) => {
                                console.log("Dialog: " + index);
                                let string_response = JSON.stringify(result);
                                let helper = JSON.parse(string_response);
                                that.totalPrice-=that.cartItems[index].quantity*that.cartItems[index].price;
                                that.grand_total-=that.cartItems[index].quantity*that.cartItems[index].price;
                                that.cartItems.splice(index, 1);
                                console.log(JSON.stringify(that.cartItems));


                            }, (error) => {
                                //this.onGetDataError(error);
                                console.log(JSON.stringify(error));
                                //alert( console.log(JSON.stringify(error._body.message)));
                            });

                    }

                });*/

    }


        onRiderTipPlus(){
            if(this.rider_tip<10){
                this.rider_tip=this.rider_tip+1;
                this.grand_total=this.grand_total+1;
            }


        }
        onRiderTipMinus(){
            if(this.rider_tip>0) {
                this.rider_tip = this.rider_tip - 1;
                this.grand_total=this.grand_total-1;
            }

        }

    search_restaurant_from_empty_cart(){

        this.router.navigate(['/restaurants']);

    }
    onAlertCancel(){
        let layout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("customalert");
        layout.visibility="collapse";

    }
    OnAlertOK(){

        let layout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("customalert");
        layout.visibility="collapse";
        this.router.navigate(["/login"]);
    }
    onDeleteAlertCancel(){
        let layout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("deleteItemalert");
        layout.visibility="collapse";

    }
    OnDeleteAlertOK(){

        let layout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("deleteItemalert");
        layout.visibility="collapse";

        this.CartService
            .del_cart_item(this.delete_item_id)
            .subscribe((result) => {
                console.log("Dialog: " + this.delete_item_index);
                let string_response = JSON.stringify(result);
                let helper = JSON.parse(string_response);
                this.totalPrice-=this.cartItems[this.delete_item_index].quantity*this.cartItems[this.delete_item_index].price;
                this.grand_total-=this.cartItems[this.delete_item_index].quantity*this.cartItems[this.delete_item_index].price;
                this.cartItems.splice(this.delete_item_index, 1);
                console.log(JSON.stringify(this.cartItems));


            }, (error) => {
                //this.onGetDataError(error);
                console.log(JSON.stringify(error));
                //alert( console.log(JSON.stringify(error._body.message)));
            });



    }


}

