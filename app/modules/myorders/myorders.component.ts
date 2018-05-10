import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {TextField} from "ui/text-field"
import {Page} from "ui/page";
import {orderService} from "./order.service";
import {getString} from "tns-core-modules/application-settings";
import {Orders} from "./userOrders";
import {Items} from "./Fooditem";
import {AbsoluteLayout} from "tns-core-modules/ui/layouts/absolute-layout";
import {Button} from "tns-core-modules/ui/button";
import {getViewById} from "tns-core-modules/ui/core/view-base";
import {StackLayout} from "tns-core-modules/ui/layouts/stack-layout";
import {Router} from "@angular/router";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./myorders.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./myorders.css']

})
export class MyordersComponent implements OnInit {


    public user_orders: Orders[] = [];
    public orderslength:number;
    public totalamount:any;
    public ridertip:any;
    public grossamount:any;



    public orders: Orders[] = [];
    public user_completed_orders: Orders[] = [];
    public completed_orders: Orders[] = [];
    public sta: number = 1;
    public order_details: Items[] = [];
    public completed_order_details: Items[] = [];
    public status: any;
    public order_id: any;
    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.


    constructor(private page: Page, private orderservice: orderService, private router: Router) {


    }

    ngOnInit(): void {
        this.user_orders=orderService.ordersFromService;
        this.orderslength=orderService.ordersLength;


        let id = JSON.parse(getString("user_id"));

    }

    refreshpage(){



         var currentUrl = this.router.url;
         var refreshUrl = currentUrl.indexOf('login') > -1 ? '/login' : '/login';

         this.router.navigateByUrl(refreshUrl).then(() => this.router.navigateByUrl(currentUrl));

    }
    search_restaurant_in_your_area(){

        this.router.navigate(["/restaurants"]);

    }

    CompletedOrderDetail(args) {


        alert("tapped" + this.user_completed_orders[args.index].order_status);
        this.order_details = this.user_completed_orders[args.index].menuitems;
        this.status = this.user_completed_orders[args.index].order_status;
        this.order_id = this.user_completed_orders[args.index].order_id;

        let ablayout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("completedorderdetail");
        ablayout.visibility = "visible";

    }

    PendingOrderDetail(args) {



        this.order_details = this.user_orders[args.index].menuitems;
        this.status = this.user_orders[args.index].order_status;
        this.order_id = this.user_orders[args.index].order_id;
        this.grossamount = this.user_orders[args.index].order_payment;

        this.ridertip=this.user_orders[args.index].rider_tip;
        this.totalamount=parseInt(this.user_orders[args.index].order_payment)+parseInt(this.ridertip);
        console.log("order detail" + JSON.stringify(this.user_orders[args.index]));
        console.log(this.user_orders[args.index]);

        let orderlist: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("orderlist");
        orderlist.visibility="collapse";
        let ablayout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("completedorderdetail");
        ablayout.visibility = "visible";

        let btn: Button = <Button>this.page.getViewById("trackriderbtn");
                if(this.status=="Going"){
                    btn.isEnabled=true;
                    btn.opacity=1;
                }else{

                    btn.isEnabled=false;
                    btn.opacity=.5;
                }
    }

    OkorderDetail() {


        let ablayout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("completedorderdetail");
        ablayout.visibility = "collapse";

        let orderlist: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("orderlist");
        orderlist.visibility="visible";



    }

    trackyourRider() {


        this.router.navigate(["/trackrider", this.order_id]);
    }
}

