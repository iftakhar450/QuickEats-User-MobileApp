import {
    Component, ViewChild, AfterViewInit, NgZone, OnDestroy
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RouterExtensions} from 'nativescript-angular/router';
import {
    setString,
    getString,
    setNumber,
    getNumber,
    setBoolean,
    getBoolean
} from "tns-core-modules/application-settings";
import {Page} from 'ui/page';
import {isAndroid, isIOS} from 'platform';
import {ActionItem} from 'ui/action-bar';
import {
    RadSideDrawerComponent, SideDrawerType
} from 'nativescript-telerik-ui/sidedrawer/angular';
import {
    PushTransition, SlideInOnTopTransition
} from 'nativescript-telerik-ui/sidedrawer';
import {AbsoluteLayout} from "tns-core-modules/ui/layouts/absolute-layout";
import {StackLayout} from "tns-core-modules/ui/layouts/stack-layout";
import {Label} from 'tns-core-modules/ui/label/label';
import {Orders} from "../../myorders/userOrders";
import {Items} from "../../myorders/Fooditem";

import {orderService} from "../../myorders/order.service";

var http = require("http");
@Component({
    selector: 'side-drawer-page',
    templateUrl: 'modules/shared/side-drawer-page/side-drawer-page.component.html',
    styleUrls: ['modules/shared/side-drawer-page/side-drawer-page.component.css']
})
export class SideDrawerPageComponent implements AfterViewInit, OnDestroy {
    @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;

    /**
     * On tap of any side-drawer item, hiding content if this flag is true.
     */
    isContentVisible: boolean = true;

    /**
     * For android using SlideOnTop transition and for iOS, push transition.
     */
    drawerTransition: any;

    /**
     * Navigation Menu Items
     */
    navMenu: any[] = [
        {imageURL: 'res://home', name: 'Find Food', commands: ['/']},
        {imageURL: 'res://myorders', name: 'My Orders', commands: ['/myorders']},
        {imageURL: 'res://mycart', name: 'My Cart', commands: ['/add-to-cart-detail']},
        {imageURL: 'res://mydetail', name: 'My Profile', commands: ['/mydetail']},
        {imageURL: 'res://paymentmethod', name: 'Payment Method', commands: ['/payment']},
        {imageURL: 'res://deliveraddress', name: 'Delivery Addresses', commands: ['/deliveryaddress']},
        {imageURL: 'res://aboutus', name: 'About Us', commands: ['/aboutus']},
        {imageURL: 'res://shuffle', name: 'Change Password', commands: ['/changepassword']},
        {imageURL: 'res://logout', name: 'Logout', commands: ['/logout']}

    ];

    private drawer: SideDrawerType;
    public email: string;
    public name: string;
    public token: string;


    public orders: Orders[] = [];

    constructor(private routerExtensions: RouterExtensions,
                private activatedRoute: ActivatedRoute,
                private page: Page,
                private ngZone: NgZone,
                private orderservice: orderService) {
        if(typeof(getString("user_id"))!== 'undefined') {
            let id = JSON.parse(getString("user_id"));
            //alert(id);
            this.getUserOrderDetail(id);
         }

         this.setActionBarIcon(this.page);
         this.setDrawerTransition();

         this.email = getString("email");
         this.name = getString("name");
         this.token = getString("access_token");
         if (this.token == "" || this.token==null) {
             this.email = "Your are not logged in";
             this.navMenu = [

                 {imageURL: 'res://login', name: 'Login', commands: ['/login']},
                 {imageURL: 'res://registered', name: 'Register', commands: ['/signup']}

             ];
         }
     }
       getUserOrderDetail(id) {


           this.orderservice.getUserOrderDetailFromApi(id)
            .subscribe((result) => {

                    /* this.orders = new Array<Orders>();*/
                    //this.completed_orders = new Array<Orders>();
                    let helper = JSON.parse(JSON.stringify(result));

                   for(let i = 0; i < helper._body.response.length; i++){
                        let menuitems: Items[] = [];


                        for(let j = 0; j < helper._body.response[i].fooditem_to_order_Fk.length; j++){

                            let chk=0;
                            if(j==0) {

                                menuitems.push(new Items(helper._body.response[i].fooditem_to_order_Fk[j].item_name,
                                    helper._body.response[i].fooditem_to_order_Fk[j].item_price,
                                    helper._body.response[i].fooditem_to_order_Fk[j].item_id,1));
                            }
                            else {
                                for(let k=0;k<menuitems.length;k++){
                                    if(menuitems[k].item_id==helper._body.response[i].fooditem_to_order_Fk[j].item_id){

                                        menuitems[k].item_quantity+=1;


                                        chk=1;
                                        break;
                                    }
                                    else if(k==(menuitems.length-1) && chk!=1)
                                    {

                                        menuitems.push(new Items(helper._body.response[i].fooditem_to_order_Fk[j].item_name,
                                            helper._body.response[i].fooditem_to_order_Fk[j].item_price,
                                            helper._body.response[i].fooditem_to_order_Fk[j].item_id,1));
                                        break;
                                    }
                                }

                            }
                        }
                        if(helper._body.response[i].order_status=="Placed"){


                            this.orders[i] = new Orders(helper._body.response[i].order_id,
                                helper._body.response[i].restaurant_id.restaurant_name,
                                helper._body.response[i].restaurant_id.restaurant_address,
                                helper._body.response[i].restaurant_id.restaurant_contect,
                                "Not assign yet",
                                "",
                                helper._body.response[i].order_payment,
                                helper._body.response[i].order_status,
                                menuitems,
                                "",
                                "",
                                helper._body.response[i].order_lat,
                                helper._body.response[i].order_lan,
                                helper._body.response[i].rider_tip,

                                0
                            );



                        }

                        else{
                            this.orders[i] = new Orders(helper._body.response[i].order_id,
                                helper._body.response[i].restaurant_id.restaurant_name,
                                helper._body.response[i].restaurant_id.restaurant_address,
                                helper._body.response[i].restaurant_id.restaurant_contect,
                                helper._body.response[i].rider_id.rider_name,
                                helper._body.response[i].rider_id.rider_mobile_no,
                                helper._body.response[i].order_payment,
                                helper._body.response[i].order_status,
                                menuitems,
                                helper._body.response[i].rider_lat,
                                helper._body.response[i].rider_lan,
                                helper._body.response[i].order_lat,
                                helper._body.response[i].order_lan,
                                helper._body.response[i].rider_tip,
                                helper._body.response[i].rider_id.rider_id
                            );




                        }




                    }


                orderService.ordersFromService = this.orders;

                orderService.ordersLength=this.orders.length;

                },(error) => {
                    //alert(JSON.stringify("Getting order error "+error._body.message));
               // alert("error");
                    orderService.ordersLength=0;
                }
            );
    }

     logout() {
         console.log("logout");

         setString("access_token", "");
         setString("name", "");
         setString("email", "");
         setString("user_pc", "");
         /*let token=getString("access_token");
         alert(token);
         http.request({
             url: "http://192.168.100.19:3000/user/logout",

             method: "PUT",
             headers: { "Content-Type": "application/json" ,"token":token}

         }).then(function (response) {
            alert(JSON.stringify(response));
         }, function (e) {
             // console.log("Error occurred " + e);
             alert(JSON.stringify("errrrrrr"+e));
         });*/


    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
    }

    ngOnDestroy() {
        this.drawer.off('drawerClosed');
    }

    toggleSideDrawer() {
        this.drawer.toggleDrawerState();
    }

    /**
     * Navigates to next page after drawer is closed.
     */
    navigateTo(routeCommands: any[]) {
        this.drawer.closeDrawer();
        let currentUrl = this.routerExtensions.router.routerState.snapshot.url;
        let newUrlTree = this.routerExtensions.router.createUrlTree(routeCommands);
        let newUrl = this.routerExtensions.router.serializeUrl(newUrlTree);
        console.log("current url :" + currentUrl + " : New Url : " + newUrl);
        if (currentUrl !== newUrl) {

            this.isContentVisible = false;
            if (newUrl == "/logout") {

                this.logout();

            }
            this.drawer.on('drawerClosed', () => {
                this.ngZone.run(() => {
                    this.routerExtensions.navigate(routeCommands,
                        {
                            clearHistory: true,
                            animated: false
                        });
                    this.isContentVisible = true;
                    this.drawer.off('drawerClosed');
                });
            });
        }
    }

    private setDrawerTransition() {
        if (isAndroid) {
            this.drawerTransition = new SlideInOnTopTransition();
        }

        if (isIOS) {
            this.drawerTransition = new PushTransition();
        }
    }

    private setActionBarIcon(page: Page) {
        if (isAndroid) {
            page.actionBar.navigationButton = this.getNavigationButton();
        }

        if (isIOS) {
            page.actionBar.actionItems.addItem(this.getNavigationButton());
        }
    }

    private getNavigationButton() {
        let navActionItem = new ActionItem();
        navActionItem.icon = 'res://ic_menu_black';
        if (navActionItem.ios) {
            navActionItem.ios.position = 'left';
        }
        navActionItem.on('tap', this.toggleDrawer.bind(this));
        return navActionItem;
    }

    private toggleDrawer() {
        this.drawer.toggleDrawerState();
    }
}
