"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var application_settings_1 = require("tns-core-modules/application-settings");
var deliveryaddress_1 = require("../deliveryaddresses/deliveryaddress");
var deliveryaddress_service_1 = require("../deliveryaddresses/deliveryaddress.service");
var page_1 = require("tns-core-modules/ui/page");
var checkout_service_1 = require("./checkout.service");
var add_to_cart_service_1 = require("../add-to-cart-datail/add-to-cart.service");
var platform_1 = require("platform");
/*import * as Toast from 'nativescript-toasts';*/
var DeviceInfo = /** @class */ (function () {
    function DeviceInfo(uuid) {
        this.uuid = uuid;
    }
    return DeviceInfo;
}());
var CheckoutComponent = /** @class */ (function () {
    function CheckoutComponent(checkotSrvice, page, routerExtensions, route, router, deliveraddressservice, addtocartservice) {
        this.checkotSrvice = checkotSrvice;
        this.page = page;
        this.routerExtensions = routerExtensions;
        this.route = route;
        this.router = router;
        this.deliveraddressservice = deliveraddressservice;
        this.addtocartservice = addtocartservice;
        this.totalPrice = this.route.snapshot.params["totalPrice"];
        this.editState = false;
        this.user_loc = [];
        this.isBusy = false;
        //paypal
        this.PayPal = require("nativescript-paypal");
        this.Observable = require("data/observable").Observable;
        this.deviceInformation = new DeviceInfo(platform_1.device.uuid);
    }
    CheckoutComponent.prototype.ngOnInit = function () {
        //  alert(getString("user_address")+"---"+getString("user_pc"));
        this.cart = add_to_cart_service_1.addToCartService.user_cart;
        this.getuserlocations();
        this.token = application_settings_1.getString("access_token");
        this.id = JSON.parse(application_settings_1.getString("user_id"));
        this.deliveryPlace = application_settings_1.getString("user_address");
        alert(this.deliveryPlace);
        this.deliveryPlacePostalcode = application_settings_1.getString("user_pc");
        this.contact_no = JSON.parse(application_settings_1.getString("user_mobile_no"));
        this.rider_tip = JSON.parse(application_settings_1.getString("rider_tip"));
        this.papypalAmount = parseInt(this.totalPrice) + parseInt(this.rider_tip) + 2;
        //paypal
        /*  this.PayPal.init({
              // clientId: 'AXcqFBZQAyQ9-DBGF0Pz8Ixs9bzXEFRqzeqgoQ5fxBlIA3T9xIbnPPm9Di_qw1ea5cd6tDJiatifnFUe',
              environment: 2
          });*/
    };
    //paypal
    CheckoutComponent.prototype.buyProduct = function (args) {
        console.log("ffffff");
        var that = this;
        var those = this;
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
    };
    //paypal//
    CheckoutComponent.prototype.goBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    CheckoutComponent.prototype.onItemTap = function (args) {
        this.deliveryPlace = this.user_loc[args.index].address;
        this.deliveryPlacePostalcode = this.user_loc[args.index].postalcode;
        //alert(this.user_loc[args.index].postalcode+"    "+this.user_loc[args.index].address);
        var layout = this.page.getViewById("locationpicker");
        var layoutbtn = this.page.getViewById("btn_confirm");
        layoutbtn.visibility = "visible";
        layout.visibility = "collapse";
    };
    CheckoutComponent.prototype.selectdeliverlocation = function () {
        var layout = this.page.getViewById("locationpicker");
        var layoutbtn = this.page.getViewById("btn_confirm");
        if (layout.visibility == "collapse") {
            layout.visibility = "visible";
            layoutbtn.visibility = "collapse";
        }
        else {
            layout.visibility = "collapse";
            layoutbtn.visibility = "visible";
        }
    };
    CheckoutComponent.prototype.getuserlocations = function () {
        var _this = this;
        this.deliveraddressservice.get_user_locations_from_api(1)
            .subscribe(function (result) {
            //this.onGetDataSuccess(result);
            var helper = JSON.stringify(result);
            var data = JSON.parse(helper);
            _this.onsucces(data);
        }, function (error) {
            // this.onGetDataError(error);
            console.log(JSON.stringify(error));
        });
    };
    CheckoutComponent.prototype.onsucces = function (data) {
        // alert("called");
        var that = this;
        for (var i = 0; i < data._body.userLocations.length; i++) {
            var item = new deliveryaddress_1.locations(data._body.userLocations[i].user_address, data._body.userLocations[i].user_postal_code);
            that.user_loc.push(item);
            //console.log("called");
            console.log("call" + that.user_loc[i]);
        }
        //console.log("addresses"+JSON.stringify(that.user_loc));
    };
    CheckoutComponent.prototype.changeDelievery = function () {
        this.editState = true;
    };
    CheckoutComponent.prototype.onempty = function () {
    };
    CheckoutComponent.prototype.postOrder = function () {
        var _this = this;
        this.isBusy = true;
        /* let layoutbtn: Button = <Button>this.page.getViewById("btn_confirm");
         layoutbtn.isEnabled=false;*/
        this.checkotSrvice.getlatlonfromapi(this.deliveryPlacePostalcode)
            .subscribe(function (result) {
            var string_response = JSON.stringify(result);
            var helper = JSON.parse(string_response);
            _this.postOrderdone(helper._body.lat, helper._body.lon);
        }, function (error) {
            //this.onGetDataError(error);
            console.log(JSON.stringify(error));
            _this.isBusy = false;
            alert(console.log(JSON.stringify(error.message)));
        });
    };
    CheckoutComponent.prototype.postOrderdone = function (lat, lan) {
        //alert(lat+"   "+lan);
        var placedAt = new Date();
        var restaurant_id = JSON.parse(application_settings_1.getString("rest_id"));
        var dt = application_settings_1.getString("deliver_to_user");
        var that = this;
        var userorder = add_to_cart_service_1.addToCartService.user_cart;
        console.log("final user order" + JSON.stringify(userorder.length));
        this.checkotSrvice
            .post_order({ order_placed_at: placedAt, order_payment: this.totalPrice, delivery_fee: "2", order_status: "Placed", restaurant_status: "Moderate", reciever_no: this.contact_no,
            user_id: that.id, restaurant_id: restaurant_id, order_lat: lat, order_lan: lan, orderinfo: userorder, rider_tip: this.rider_tip, delivery_time: dt })
            .subscribe(function (res) {
            console.log("order added");
            that.router.navigate(['/restaurants']);
            // console.log("res"+JSON.stringify(res));
            that.isBusy = false;
            that.removecartoforder();
        }, function (error) {
            console.log(JSON.stringify("error" + error));
        });
    };
    CheckoutComponent.prototype.removecartoforder = function () {
        this.checkotSrvice.removeusercartapi(this.deviceInformation.uuid).subscribe(function (res) {
            console.log("cart  deleted");
        }, function (error) {
            console.log(JSON.stringify("error" + error));
        });
    };
    CheckoutComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./checkout.component.html",
            styleUrls: ['./checkout.component.css']
        }),
        __metadata("design:paramtypes", [checkout_service_1.CheckoutService, page_1.Page, nativescript_angular_1.RouterExtensions, router_1.ActivatedRoute, router_2.Router, deliveryaddress_service_1.DeliverAddressService, add_to_cart_service_1.addToCartService])
    ], CheckoutComponent);
    return CheckoutComponent;
}());
exports.CheckoutComponent = CheckoutComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hlY2tvdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDZEQUFzRDtBQUN0RCwwQ0FBaUQ7QUFDakQsMENBQXlDO0FBQ3pDLDhFQUFvSDtBQUNwSCx3RUFBK0Q7QUFDL0Qsd0ZBQW1GO0FBRW5GLGlEQUE4QztBQUU5Qyx1REFBbUQ7QUFDbkQsaUZBQTJFO0FBRTNFLHFDQUE0RDtBQUM1RCxpREFBaUQ7QUFDakQ7SUFDSSxvQkFDVyxJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtJQUNuQixDQUFDO0lBQ1QsaUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQVFEO0lBbUJJLDJCQUFvQixhQUE2QixFQUFTLElBQVMsRUFBUyxnQkFBa0MsRUFBVSxLQUFxQixFQUFVLE1BQWMsRUFBUyxxQkFBMkMsRUFBUyxnQkFBaUM7UUFBL08sa0JBQWEsR0FBYixhQUFhLENBQWdCO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBSztRQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUywwQkFBcUIsR0FBckIscUJBQXFCLENBQXNCO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQWpCNVAsZUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUd0RCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBTWxCLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFHeEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixRQUFRO1FBQ0QsV0FBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3hDLGVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxV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LFNBQVMsQ0FBQyxVQUFBLEdBQUc7WUFDdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUlqQyxDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRS9DLENBQUMsQ0FBQyxDQUFDO0lBRVgsQ0FBQztJQTNOUSxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1NBQzFDLENBQUM7eUNBb0JvQyxrQ0FBZSxFQUFjLFdBQUksRUFBMkIsdUNBQWdCLEVBQWlCLHVCQUFjLEVBQWtCLGVBQU0sRUFBK0IsK0NBQXFCLEVBQTBCLHNDQUFnQjtPQW5CMVAsaUJBQWlCLENBNk43QjtJQUFELHdCQUFDO0NBQUEsQUE3TkQsSUE2TkM7QUE3TlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge3NldFN0cmluZyxnZXRTdHJpbmcsc2V0TnVtYmVyLGdldE51bWJlcixzZXRCb29sZWFuLGdldEJvb2xlYW59IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7bG9jYXRpb25zfSBmcm9tIFwiLi4vZGVsaXZlcnlhZGRyZXNzZXMvZGVsaXZlcnlhZGRyZXNzXCI7XHJcbmltcG9ydCB7RGVsaXZlckFkZHJlc3NTZXJ2aWNlfSBmcm9tIFwiLi4vZGVsaXZlcnlhZGRyZXNzZXMvZGVsaXZlcnlhZGRyZXNzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtBYnNvbHV0ZUxheW91dH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9hYnNvbHV0ZS1sYXlvdXRcIjtcclxuaW1wb3J0IHtQYWdlfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XHJcbmltcG9ydCB7QnV0dG9ufSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9idXR0b25cIjtcclxuaW1wb3J0IHtDaGVja291dFNlcnZpY2V9IGZyb20gXCIuL2NoZWNrb3V0LnNlcnZpY2VcIjtcclxuaW1wb3J0IHthZGRUb0NhcnRTZXJ2aWNlfSBmcm9tIFwiLi4vYWRkLXRvLWNhcnQtZGF0YWlsL2FkZC10by1jYXJ0LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgaXRlbWRldGFpbCB9IGZyb20gXCIuLi9yZXN0YXVyYW50LWRldGFpbC9pdGVtZGV0YWlsXCI7XHJcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MsIGRldmljZSwgc2NyZWVuIH0gZnJvbSBcInBsYXRmb3JtXCI7XHJcbi8qaW1wb3J0ICogYXMgVG9hc3QgZnJvbSAnbmF0aXZlc2NyaXB0LXRvYXN0cyc7Ki9cclxuY2xhc3MgRGV2aWNlSW5mbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgdXVpZDogc3RyaW5nXHJcbiAgICApIHsgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9jaGVja291dC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vY2hlY2tvdXQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDaGVja291dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgcHVibGljIHRvdGFsUHJpY2UgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcInRvdGFsUHJpY2VcIl07XHJcbiAgICBwdWJsaWMgY29udGFjdF9ubzogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlY19ubzogbnVtYmVyO1xyXG4gICAgcHVibGljIGVkaXRTdGF0ZSA9IGZhbHNlO1xyXG4gICAgcHVibGljIGRlbGl2ZXJ5UGxhY2U6c3RyaW5nO1xyXG4gICAgcHVibGljIHRva2VuOnN0cmluZztcclxuICAgIHB1YmxpYyBpZDphbnk7XHJcbiAgICBwdWJsaWMgcmlkZXJfdGlwOmFueTtcclxuICAgIHB1YmxpYyBkZWxpdmVyeVBsYWNlUG9zdGFsY29kZTphbnk7XHJcbiAgICBwdWJsaWMgdXNlcl9sb2M6bG9jYXRpb25zW109W107XHJcbiAgICBwdWJsaWMgY2FydDppdGVtZGV0YWlsW107XHJcbiAgICBwdWJsaWMgcGFweXBhbEFtb3VudDpudW1iZXI7XHJcbiAgICBwdWJsaWMgaXNCdXN5ID0gZmFsc2U7XHJcbiAgICAvL3BheXBhbFxyXG4gICAgcHVibGljIFBheVBhbCA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGF5cGFsXCIpO1xyXG4gICAgcHVibGljIE9ic2VydmFibGUgPSByZXF1aXJlKFwiZGF0YS9vYnNlcnZhYmxlXCIpLk9ic2VydmFibGU7XHJcbiAgICBwdWJsaWMgZGV2aWNlSW5mb3JtYXRpb246IERldmljZUluZm87XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNoZWNrb3RTcnZpY2U6Q2hlY2tvdXRTZXJ2aWNlLHByaXZhdGUgcGFnZTpQYWdlLHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIscHJpdmF0ZSBkZWxpdmVyYWRkcmVzc3NlcnZpY2U6RGVsaXZlckFkZHJlc3NTZXJ2aWNlLHByaXZhdGUgYWRkdG9jYXJ0c2VydmljZTphZGRUb0NhcnRTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZGV2aWNlSW5mb3JtYXRpb24gPSBuZXcgRGV2aWNlSW5mbyhkZXZpY2UudXVpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAvLyAgYWxlcnQoZ2V0U3RyaW5nKFwidXNlcl9hZGRyZXNzXCIpK1wiLS0tXCIrZ2V0U3RyaW5nKFwidXNlcl9wY1wiKSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FydD1hZGRUb0NhcnRTZXJ2aWNlLnVzZXJfY2FydDtcclxuICAgICAgICB0aGlzLmdldHVzZXJsb2NhdGlvbnMoKTtcclxuXHJcbiAgICAgICAgdGhpcy50b2tlbj1nZXRTdHJpbmcoXCJhY2Nlc3NfdG9rZW5cIik7XHJcbiAgICAgICAgdGhpcy5pZD1KU09OLnBhcnNlKGdldFN0cmluZyhcInVzZXJfaWRcIikpO1xyXG4gICAgICAgIHRoaXMuZGVsaXZlcnlQbGFjZT1nZXRTdHJpbmcoXCJ1c2VyX2FkZHJlc3NcIik7XHJcbiAgICAgICAgYWxlcnQodGhpcy5kZWxpdmVyeVBsYWNlKTtcclxuICAgICAgICB0aGlzLmRlbGl2ZXJ5UGxhY2VQb3N0YWxjb2RlPWdldFN0cmluZyhcInVzZXJfcGNcIik7XHJcbiAgICAgICAgdGhpcy5jb250YWN0X25vID0gSlNPTi5wYXJzZShnZXRTdHJpbmcoXCJ1c2VyX21vYmlsZV9ub1wiKSk7XHJcbiAgICAgICAgdGhpcy5yaWRlcl90aXAgPSBKU09OLnBhcnNlKGdldFN0cmluZyhcInJpZGVyX3RpcFwiKSk7XHJcblxyXG4gICAgICAgIHRoaXMucGFweXBhbEFtb3VudD1wYXJzZUludCh0aGlzLnRvdGFsUHJpY2UpICsgcGFyc2VJbnQodGhpcy5yaWRlcl90aXApKzI7XHJcbiAgICAgICAgLy9wYXlwYWxcclxuICAgICAgLyogIHRoaXMuUGF5UGFsLmluaXQoe1xyXG4gICAgICAgICAgICAvLyBjbGllbnRJZDogJ0FYY3FGQlpRQXlROS1EQkdGMFB6OEl4czlielhFRlJxemVxZ29RNWZ4QmxJQTNUOXhJYm5QUG05RGlfcXcxZWE1Y2Q2dERKaWF0aWZuRlVlJyxcclxuICAgICAgICAgICAgZW52aXJvbm1lbnQ6IDJcclxuICAgICAgICB9KTsqL1xyXG4gICAgfVxyXG5cclxuICAgIC8vcGF5cGFsXHJcbiAgICBidXlQcm9kdWN0KGFyZ3MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImZmZmZmZlwiKTtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHRob3NlPXRoaXM7XHJcbiAgICAgICAgLy8gY29uZmlndXJlXHJcbiAgICAgICAgdmFyIHBheW1lbnQgPSB0aGlzLlBheVBhbC5uZXdQYXltZW50KClcclxuICAgICAgICAgICAgLnNldERlc2NyaXB0aW9uKCdPcmRlciBBbW91bnQnKVxyXG4gICAgICAgICAgICAuc2V0QW1vdW50KHRoaXMucGFweXBhbEFtb3VudCk7XHJcblxyXG4gICAgICAgIC8vIHN0YXJ0IGNoZWNrb3V0IC8gcGF5bWVudFxyXG4gICAgICAgIHBheW1lbnQuc3RhcnQoZnVuY3Rpb24gKGNiUmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHZhciBsb2dQcmVmaXggPSAnW3BheW1lbnQgcmVzdWx0XSAnO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGNiUmVzdWx0LmNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhsb2dQcmVmaXggKyAnU3VjY2VzczogJyArIGNiUmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhvc2UucG9zdE9yZGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhsb2dQcmVmaXggKyAnT3BlcmF0aW9uIHdhcyBjYW5jZWxsZWQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAtMTpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhsb2dQcmVmaXggKyAnQ2hlY2tvdXQgZmFpbGVkIScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgLTI6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobG9nUHJlZml4ICsgJ1VuaGFuZGxlZCBleGNlcHRpb24hJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvZ1ByZWZpeCArICdVTktOT1dOOiAnICsgY2JSZXN1bHQuY29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL3BheXBhbC8vXHJcblxyXG4gICAgcHVibGljIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uSXRlbVRhcChhcmdzKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZGVsaXZlcnlQbGFjZT10aGlzLnVzZXJfbG9jW2FyZ3MuaW5kZXhdLmFkZHJlc3M7XHJcbiAgICAgICAgdGhpcy5kZWxpdmVyeVBsYWNlUG9zdGFsY29kZT10aGlzLnVzZXJfbG9jW2FyZ3MuaW5kZXhdLnBvc3RhbGNvZGU7XHJcbiAgICAgICAgLy9hbGVydCh0aGlzLnVzZXJfbG9jW2FyZ3MuaW5kZXhdLnBvc3RhbGNvZGUrXCIgICAgXCIrdGhpcy51c2VyX2xvY1thcmdzLmluZGV4XS5hZGRyZXNzKTtcclxuICAgICAgICBsZXQgbGF5b3V0OiBBYnNvbHV0ZUxheW91dCA9IDxBYnNvbHV0ZUxheW91dD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJsb2NhdGlvbnBpY2tlclwiKTtcclxuICAgICAgICBsZXQgbGF5b3V0YnRuOiBCdXR0b24gPSA8QnV0dG9uPnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImJ0bl9jb25maXJtXCIpO1xyXG4gICAgICAgIGxheW91dGJ0bi52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgbGF5b3V0LnZpc2liaWxpdHkgPSBcImNvbGxhcHNlXCI7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RkZWxpdmVybG9jYXRpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBsYXlvdXQ6IEFic29sdXRlTGF5b3V0ID0gPEFic29sdXRlTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImxvY2F0aW9ucGlja2VyXCIpO1xyXG4gICAgICAgIGxldCBsYXlvdXRidG46IEJ1dHRvbiA9IDxCdXR0b24+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiYnRuX2NvbmZpcm1cIik7XHJcbiAgICAgICAgaWYgKGxheW91dC52aXNpYmlsaXR5ID09IFwiY29sbGFwc2VcIikge1xyXG5cclxuICAgICAgICAgICAgbGF5b3V0LnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuICAgICAgICAgICAgbGF5b3V0YnRuLnZpc2liaWxpdHkgPSBcImNvbGxhcHNlXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGxheW91dC52aXNpYmlsaXR5ID0gXCJjb2xsYXBzZVwiO1xyXG4gICAgICAgICAgICBsYXlvdXRidG4udmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldHVzZXJsb2NhdGlvbnMoKXtcclxuICAgICAgICB0aGlzLmRlbGl2ZXJhZGRyZXNzc2VydmljZS5nZXRfdXNlcl9sb2NhdGlvbnNfZnJvbV9hcGkoMSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlbHBlcj1KU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPUpTT04ucGFyc2UoaGVscGVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25zdWNjZXMoZGF0YSk7XHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIG9uc3VjY2VzKGRhdGEpe1xyXG4gICAgICAgIC8vIGFsZXJ0KFwiY2FsbGVkXCIpO1xyXG4gICAgICAgIGxldCB0aGF0PXRoaXM7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTxkYXRhLl9ib2R5LnVzZXJMb2NhdGlvbnMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtPW5ldyBsb2NhdGlvbnMoZGF0YS5fYm9keS51c2VyTG9jYXRpb25zW2ldLnVzZXJfYWRkcmVzcyxkYXRhLl9ib2R5LnVzZXJMb2NhdGlvbnNbaV0udXNlcl9wb3N0YWxfY29kZSk7XHJcbiAgICAgICAgICAgIHRoYXQudXNlcl9sb2MucHVzaChpdGVtKTtcclxuXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjYWxsZWRcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FsbFwiK3RoYXQudXNlcl9sb2NbaV0pO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiYWRkcmVzc2VzXCIrSlNPTi5zdHJpbmdpZnkodGhhdC51c2VyX2xvYykpO1xyXG4gICAgfVxyXG4gICAgY2hhbmdlRGVsaWV2ZXJ5KCl7XHJcbiAgICAgICAgdGhpcy5lZGl0U3RhdGU9dHJ1ZTtcclxuICAgIH1cclxuICAgIG9uZW1wdHkoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgcG9zdE9yZGVyKCl7XHJcblxyXG4gICAgICAgIHRoaXMuaXNCdXN5PXRydWU7XHJcbiAgICAgICAvKiBsZXQgbGF5b3V0YnRuOiBCdXR0b24gPSA8QnV0dG9uPnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImJ0bl9jb25maXJtXCIpO1xyXG4gICAgICAgIGxheW91dGJ0bi5pc0VuYWJsZWQ9ZmFsc2U7Ki9cclxuICAgICAgICB0aGlzLmNoZWNrb3RTcnZpY2UuZ2V0bGF0bG9uZnJvbWFwaSh0aGlzLmRlbGl2ZXJ5UGxhY2VQb3N0YWxjb2RlKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyaW5nX3Jlc3BvbnNlID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIGxldCBoZWxwZXIgPSBKU09OLnBhcnNlKHN0cmluZ19yZXNwb25zZSk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMucG9zdE9yZGVyZG9uZShoZWxwZXIuX2JvZHkubGF0LGhlbHBlci5fYm9keS5sb24pO1xyXG5cclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5PWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLm1lc3NhZ2UpKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHBvc3RPcmRlcmRvbmUobGF0LGxhbikge1xyXG4gICAgICAgLy9hbGVydChsYXQrXCIgICBcIitsYW4pO1xyXG4gICAgICAgIGxldCBwbGFjZWRBdD1uZXcgRGF0ZSgpO1xyXG4gICAgICAgIGxldCByZXN0YXVyYW50X2lkPUpTT04ucGFyc2UoZ2V0U3RyaW5nKFwicmVzdF9pZFwiKSk7XHJcbiAgICAgICBsZXQgZHQgPWdldFN0cmluZyhcImRlbGl2ZXJfdG9fdXNlclwiKTtcclxuICAgICAgICBsZXQgdGhhdD10aGlzO1xyXG4gICAgICAgICBsZXQgdXNlcm9yZGVyOml0ZW1kZXRhaWxbXT1hZGRUb0NhcnRTZXJ2aWNlLnVzZXJfY2FydDtcclxuICAgICAgICAgY29uc29sZS5sb2coXCJmaW5hbCB1c2VyIG9yZGVyXCIrSlNPTi5zdHJpbmdpZnkodXNlcm9yZGVyLmxlbmd0aCkpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tvdFNydmljZVxyXG4gICAgICAgICAgICAucG9zdF9vcmRlcih7b3JkZXJfcGxhY2VkX2F0OnBsYWNlZEF0LG9yZGVyX3BheW1lbnQ6dGhpcy50b3RhbFByaWNlLGRlbGl2ZXJ5X2ZlZTpcIjJcIixvcmRlcl9zdGF0dXM6XCJQbGFjZWRcIixyZXN0YXVyYW50X3N0YXR1czpcIk1vZGVyYXRlXCIscmVjaWV2ZXJfbm86dGhpcy5jb250YWN0X25vLFxyXG4gICAgICAgICAgICAgICB1c2VyX2lkOnRoYXQuaWQscmVzdGF1cmFudF9pZDpyZXN0YXVyYW50X2lkLG9yZGVyX2xhdDpsYXQsb3JkZXJfbGFuOmxhbixvcmRlcmluZm86dXNlcm9yZGVyLHJpZGVyX3RpcDp0aGlzLnJpZGVyX3RpcCxkZWxpdmVyeV90aW1lOmR0fSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3JkZXIgYWRkZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3V0ZXIubmF2aWdhdGUoWycvcmVzdGF1cmFudHMnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlc1wiK0pTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc0J1c3k9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5yZW1vdmVjYXJ0b2ZvcmRlcigpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KFwiZXJyb3JcIitlcnJvcikpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlbW92ZWNhcnRvZm9yZGVyKCl7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmNoZWNrb3RTcnZpY2UucmVtb3ZldXNlcmNhcnRhcGkodGhpcy5kZXZpY2VJbmZvcm1hdGlvbi51dWlkKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FydCAgZGVsZXRlZFwiKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShcImVycm9yXCIrZXJyb3IpKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIl19