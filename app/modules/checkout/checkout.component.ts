import { Component, OnInit } from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import {setString,getString,setNumber,getNumber,setBoolean,getBoolean} from "tns-core-modules/application-settings";
import {locations} from "../deliveryaddresses/deliveryaddress";
import {DeliverAddressService} from "../deliveryaddresses/deliveryaddress.service";
import {AbsoluteLayout} from "tns-core-modules/ui/layouts/absolute-layout";
import {Page} from "tns-core-modules/ui/page";
import {Button} from "tns-core-modules/ui/button";
import {CheckoutService} from "./checkout.service";
import {addToCartService} from "../add-to-cart-datail/add-to-cart.service";
import { itemdetail } from "../restaurant-detail/itemdetail";
import { isAndroid, isIOS, device, screen } from "platform";
/*import * as Toast from 'nativescript-toasts';*/
class DeviceInfo {
    constructor(
        public uuid: string
    ) { }
}

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./checkout.component.html",
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    public totalPrice = this.route.snapshot.params["totalPrice"];
    public contact_no: number;
    public rec_no: number;
    public editState = false;
    public deliveryPlace:string;
    public token:string;
    public id:any;
    public rider_tip:any;
    public deliveryPlacePostalcode:any;
    public user_loc:locations[]=[];
    public cart:itemdetail[];
    public papypalAmount:number;
    public isBusy = false;
    //paypal
    public PayPal = require("nativescript-paypal");
    public Observable = require("data/observable").Observable;
    public deviceInformation: DeviceInfo;
    constructor(private checkotSrvice:CheckoutService,private page:Page,private routerExtensions: RouterExtensions, private route: ActivatedRoute, private router: Router,private deliveraddressservice:DeliverAddressService,private addtocartservice:addToCartService) {

        this.deviceInformation = new DeviceInfo(device.uuid);
    }

    ngOnInit(): void {
    //  alert(getString("user_address")+"---"+getString("user_pc"));

        this.cart=addToCartService.user_cart;
        this.getuserlocations();

        this.token=getString("access_token");
        this.id=JSON.parse(getString("user_id"));
        this.deliveryPlace=getString("user_address");
        alert(this.deliveryPlace);
        this.deliveryPlacePostalcode=getString("user_pc");
        this.contact_no = JSON.parse(getString("user_mobile_no"));
        this.rider_tip = JSON.parse(getString("rider_tip"));

        this.papypalAmount=parseInt(this.totalPrice) + parseInt(this.rider_tip)+2;
        //paypal
        this.PayPal.init({
            clientId: 'AXcqFBZQAyQ9-DBGF0Pz8Ixs9bzXEFRqzeqgoQ5fxBlIA3T9xIbnPPm9Di_qw1ea5cd6tDJiatifnFUe',
            environment: 0
        });
    }

    //paypal
    buyProduct(args) {
        console.log("ffffff");
        let that = this;
        let those=this;
        // configure
        var payment = this.PayPal.newPayment()
            .setDescription('Order Amount')
            .setAmount(this.papypalAmount);

        // start checkout / payment
        payment.start(function (cbResult) {
            var logPrefix = '[payment result] ';
            switch (cbResult.code) {
                case 0:
                    console.log(logPrefix + 'Success: ' + cbResult.key);
                    those.postOrder();

                    break;

                case 1:
                    console.log(logPrefix + 'Operation was cancelled.');
                    break;

                case -1:
                    console.log(logPrefix + 'Checkout failed!');
                    break;

                case -2:
                    console.log(logPrefix + 'Unhandled exception!');
                    break;
                default:
                    console.log(logPrefix + 'UNKNOWN: ' + cbResult.code);
                    break;
            }
        });
    }

    //paypal//

    public goBack() {
        this.routerExtensions.backToPreviousPage();
    }


    onItemTap(args) {

        this.deliveryPlace=this.user_loc[args.index].address;
        this.deliveryPlacePostalcode=this.user_loc[args.index].postalcode;
        //alert(this.user_loc[args.index].postalcode+"    "+this.user_loc[args.index].address);
        let layout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("locationpicker");
        let layoutbtn: Button = <Button>this.page.getViewById("btn_confirm");
        layoutbtn.visibility = "visible";
        layout.visibility = "collapse";


    }

    selectdeliverlocation() {

        let layout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("locationpicker");
        let layoutbtn: Button = <Button>this.page.getViewById("btn_confirm");
        if (layout.visibility == "collapse") {

            layout.visibility = "visible";
            layoutbtn.visibility = "collapse";
        } else {

            layout.visibility = "collapse";
            layoutbtn.visibility = "visible";
        }


    }

    getuserlocations(){
        this.deliveraddressservice.get_user_locations_from_api(1)
            .subscribe((result) => {
                //this.onGetDataSuccess(result);
                let helper=JSON.stringify(result);
                let data =JSON.parse(helper);
                this.onsucces(data);
            }, (error) => {
                // this.onGetDataError(error);
                console.log(JSON.stringify(error));
            });
    }
    onsucces(data){
        // alert("called");
        let that=this;
        for(let i=0;i<data._body.userLocations.length;i++){
            let item=new locations(data._body.userLocations[i].user_address,data._body.userLocations[i].user_postal_code);
            that.user_loc.push(item);

            //console.log("called");
            console.log("call"+that.user_loc[i]);


        }

        //console.log("addresses"+JSON.stringify(that.user_loc));
    }
    changeDelievery(){
        this.editState=true;
    }
    onempty() {

    }
    postOrder(){

        this.isBusy=true;
       /* let layoutbtn: Button = <Button>this.page.getViewById("btn_confirm");
        layoutbtn.isEnabled=false;*/
        this.checkotSrvice.getlatlonfromapi(this.deliveryPlacePostalcode)
            .subscribe((result) => {

                let string_response = JSON.stringify(result);
                let helper = JSON.parse(string_response);

              this.postOrderdone(helper._body.lat,helper._body.lon);

            }, (error) => {
                //this.onGetDataError(error);
                console.log(JSON.stringify(error));
                alert( console.log(JSON.stringify(error.message)));
            });



    }

    postOrderdone(lat,lan) {
       //alert(lat+"   "+lan);
        let placedAt=new Date();
        let restaurant_id=JSON.parse(getString("rest_id"));
       let dt =getString("deliver_to_user");
        let that=this;
         let userorder:itemdetail[]=addToCartService.user_cart;
         console.log("final user order"+JSON.stringify(userorder.length));
        this.checkotSrvice
            .post_order({order_placed_at:placedAt,order_payment:this.totalPrice,delivery_fee:"2",order_status:"Placed",restaurant_status:"Moderate",reciever_no:this.contact_no,
               user_id:that.id,restaurant_id:restaurant_id,order_lat:lat,order_lan:lan,orderinfo:userorder,rider_tip:this.rider_tip,delivery_time:dt})
            .subscribe(res => {
                    console.log("order added");
                    that.router.navigate(['/restaurants']);
                   // console.log("res"+JSON.stringify(res));
                that.isBusy=false;
                    that.removecartoforder();


                },
                (error) => {

                    console.log(JSON.stringify("error"+error));
                });
    }


    removecartoforder(){


        this.checkotSrvice.removeusercartapi(this.deviceInformation.uuid).subscribe(res => {
                console.log("cart  deleted");



            },
            (error) => {
                console.log(JSON.stringify("error"+error));

            });

    }

}
