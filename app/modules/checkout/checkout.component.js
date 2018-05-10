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
        this.PayPal.init({
            clientId: 'AXcqFBZQAyQ9-DBGF0Pz8Ixs9bzXEFRqzeqgoQ5fxBlIA3T9xIbnPPm9Di_qw1ea5cd6tDJiatifnFUe',
            environment: 0
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hlY2tvdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDZEQUFzRDtBQUN0RCwwQ0FBaUQ7QUFDakQsMENBQXlDO0FBQ3pDLDhFQUFvSDtBQUNwSCx3RUFBK0Q7QUFDL0Qsd0ZBQW1GO0FBRW5GLGlEQUE4QztBQUU5Qyx1REFBbUQ7QUFDbkQsaUZBQTJFO0FBRTNFLHFDQUE0RDtBQUM1RCxpREFBaUQ7QUFDakQ7SUFDSSxvQkFDVyxJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtJQUNuQixDQUFDO0lBQ1QsaUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQVFEO0lBbUJJLDJCQUFvQixhQUE2QixFQUFTLElBQVMsRUFBUyxnQkFBa0MsRUFBVSxLQUFxQixFQUFVLE1BQWMsRUFBUyxxQkFBMkMsRUFBUyxnQkFBaUM7UUFBL08sa0JBQWEsR0FBYixhQUFhLENBQWdCO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBSztRQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUywwQkFBcUIsR0FBckIscUJBQXFCLENBQXNCO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQWpCNVAsZUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUd0RCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBTWxCLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFHeEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixRQUFRO1FBQ0QsV0FBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3hDLGVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxV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QUFpQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFJakMsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUUvQyxDQUFDLENBQUMsQ0FBQztJQUVYLENBQUM7SUExTlEsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUMxQyxDQUFDO3lDQW9Cb0Msa0NBQWUsRUFBYyxXQUFJLEVBQTJCLHVDQUFnQixFQUFpQix1QkFBYyxFQUFrQixlQUFNLEVBQStCLCtDQUFxQixFQUEwQixzQ0FBZ0I7T0FuQjFQLGlCQUFpQixDQTRON0I7SUFBRCx3QkFBQztDQUFBLEFBNU5ELElBNE5DO0FBNU5ZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtzZXRTdHJpbmcsZ2V0U3RyaW5nLHNldE51bWJlcixnZXROdW1iZXIsc2V0Qm9vbGVhbixnZXRCb29sZWFufSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQge2xvY2F0aW9uc30gZnJvbSBcIi4uL2RlbGl2ZXJ5YWRkcmVzc2VzL2RlbGl2ZXJ5YWRkcmVzc1wiO1xyXG5pbXBvcnQge0RlbGl2ZXJBZGRyZXNzU2VydmljZX0gZnJvbSBcIi4uL2RlbGl2ZXJ5YWRkcmVzc2VzL2RlbGl2ZXJ5YWRkcmVzcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7QWJzb2x1dGVMYXlvdXR9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvYWJzb2x1dGUtbGF5b3V0XCI7XHJcbmltcG9ydCB7UGFnZX0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG5pbXBvcnQge0J1dHRvbn0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYnV0dG9uXCI7XHJcbmltcG9ydCB7Q2hlY2tvdXRTZXJ2aWNlfSBmcm9tIFwiLi9jaGVja291dC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7YWRkVG9DYXJ0U2VydmljZX0gZnJvbSBcIi4uL2FkZC10by1jYXJ0LWRhdGFpbC9hZGQtdG8tY2FydC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IGl0ZW1kZXRhaWwgfSBmcm9tIFwiLi4vcmVzdGF1cmFudC1kZXRhaWwvaXRlbWRldGFpbFwiO1xyXG5pbXBvcnQgeyBpc0FuZHJvaWQsIGlzSU9TLCBkZXZpY2UsIHNjcmVlbiB9IGZyb20gXCJwbGF0Zm9ybVwiO1xyXG4vKmltcG9ydCAqIGFzIFRvYXN0IGZyb20gJ25hdGl2ZXNjcmlwdC10b2FzdHMnOyovXHJcbmNsYXNzIERldmljZUluZm8ge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHV1aWQ6IHN0cmluZ1xyXG4gICAgKSB7IH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY2hlY2tvdXQuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL2NoZWNrb3V0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHB1YmxpYyB0b3RhbFByaWNlID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJ0b3RhbFByaWNlXCJdO1xyXG4gICAgcHVibGljIGNvbnRhY3Rfbm86IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWNfbm86IG51bWJlcjtcclxuICAgIHB1YmxpYyBlZGl0U3RhdGUgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBkZWxpdmVyeVBsYWNlOnN0cmluZztcclxuICAgIHB1YmxpYyB0b2tlbjpzdHJpbmc7XHJcbiAgICBwdWJsaWMgaWQ6YW55O1xyXG4gICAgcHVibGljIHJpZGVyX3RpcDphbnk7XHJcbiAgICBwdWJsaWMgZGVsaXZlcnlQbGFjZVBvc3RhbGNvZGU6YW55O1xyXG4gICAgcHVibGljIHVzZXJfbG9jOmxvY2F0aW9uc1tdPVtdO1xyXG4gICAgcHVibGljIGNhcnQ6aXRlbWRldGFpbFtdO1xyXG4gICAgcHVibGljIHBhcHlwYWxBbW91bnQ6bnVtYmVyO1xyXG4gICAgcHVibGljIGlzQnVzeSA9IGZhbHNlO1xyXG4gICAgLy9wYXlwYWxcclxuICAgIHB1YmxpYyBQYXlQYWwgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBheXBhbFwiKTtcclxuICAgIHB1YmxpYyBPYnNlcnZhYmxlID0gcmVxdWlyZShcImRhdGEvb2JzZXJ2YWJsZVwiKS5PYnNlcnZhYmxlO1xyXG4gICAgcHVibGljIGRldmljZUluZm9ybWF0aW9uOiBEZXZpY2VJbmZvO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjaGVja290U3J2aWNlOkNoZWNrb3V0U2VydmljZSxwcml2YXRlIHBhZ2U6UGFnZSxwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLHByaXZhdGUgZGVsaXZlcmFkZHJlc3NzZXJ2aWNlOkRlbGl2ZXJBZGRyZXNzU2VydmljZSxwcml2YXRlIGFkZHRvY2FydHNlcnZpY2U6YWRkVG9DYXJ0U2VydmljZSkge1xyXG5cclxuICAgICAgICB0aGlzLmRldmljZUluZm9ybWF0aW9uID0gbmV3IERldmljZUluZm8oZGV2aWNlLnV1aWQpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgLy8gIGFsZXJ0KGdldFN0cmluZyhcInVzZXJfYWRkcmVzc1wiKStcIi0tLVwiK2dldFN0cmluZyhcInVzZXJfcGNcIikpO1xyXG5cclxuICAgICAgICB0aGlzLmNhcnQ9YWRkVG9DYXJ0U2VydmljZS51c2VyX2NhcnQ7XHJcbiAgICAgICAgdGhpcy5nZXR1c2VybG9jYXRpb25zKCk7XHJcblxyXG4gICAgICAgIHRoaXMudG9rZW49Z2V0U3RyaW5nKFwiYWNjZXNzX3Rva2VuXCIpO1xyXG4gICAgICAgIHRoaXMuaWQ9SlNPTi5wYXJzZShnZXRTdHJpbmcoXCJ1c2VyX2lkXCIpKTtcclxuICAgICAgICB0aGlzLmRlbGl2ZXJ5UGxhY2U9Z2V0U3RyaW5nKFwidXNlcl9hZGRyZXNzXCIpO1xyXG4gICAgICAgIGFsZXJ0KHRoaXMuZGVsaXZlcnlQbGFjZSk7XHJcbiAgICAgICAgdGhpcy5kZWxpdmVyeVBsYWNlUG9zdGFsY29kZT1nZXRTdHJpbmcoXCJ1c2VyX3BjXCIpO1xyXG4gICAgICAgIHRoaXMuY29udGFjdF9ubyA9IEpTT04ucGFyc2UoZ2V0U3RyaW5nKFwidXNlcl9tb2JpbGVfbm9cIikpO1xyXG4gICAgICAgIHRoaXMucmlkZXJfdGlwID0gSlNPTi5wYXJzZShnZXRTdHJpbmcoXCJyaWRlcl90aXBcIikpO1xyXG5cclxuICAgICAgICB0aGlzLnBhcHlwYWxBbW91bnQ9cGFyc2VJbnQodGhpcy50b3RhbFByaWNlKSArIHBhcnNlSW50KHRoaXMucmlkZXJfdGlwKSsyO1xyXG4gICAgICAgIC8vcGF5cGFsXHJcbiAgICAgICAgdGhpcy5QYXlQYWwuaW5pdCh7XHJcbiAgICAgICAgICAgIGNsaWVudElkOiAnQVhjcUZCWlFBeVE5LURCR0YwUHo4SXhzOWJ6WEVGUnF6ZXFnb1E1ZnhCbElBM1Q5eEliblBQbTlEaV9xdzFlYTVjZDZ0REppYXRpZm5GVWUnLFxyXG4gICAgICAgICAgICBlbnZpcm9ubWVudDogMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcGF5cGFsXHJcbiAgICBidXlQcm9kdWN0KGFyZ3MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImZmZmZmZlwiKTtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHRob3NlPXRoaXM7XHJcbiAgICAgICAgLy8gY29uZmlndXJlXHJcbiAgICAgICAgdmFyIHBheW1lbnQgPSB0aGlzLlBheVBhbC5uZXdQYXltZW50KClcclxuICAgICAgICAgICAgLnNldERlc2NyaXB0aW9uKCdPcmRlciBBbW91bnQnKVxyXG4gICAgICAgICAgICAuc2V0QW1vdW50KHRoaXMucGFweXBhbEFtb3VudCk7XHJcblxyXG4gICAgICAgIC8vIHN0YXJ0IGNoZWNrb3V0IC8gcGF5bWVudFxyXG4gICAgICAgIHBheW1lbnQuc3RhcnQoZnVuY3Rpb24gKGNiUmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHZhciBsb2dQcmVmaXggPSAnW3BheW1lbnQgcmVzdWx0XSAnO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGNiUmVzdWx0LmNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhsb2dQcmVmaXggKyAnU3VjY2VzczogJyArIGNiUmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhvc2UucG9zdE9yZGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhsb2dQcmVmaXggKyAnT3BlcmF0aW9uIHdhcyBjYW5jZWxsZWQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAtMTpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhsb2dQcmVmaXggKyAnQ2hlY2tvdXQgZmFpbGVkIScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgLTI6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobG9nUHJlZml4ICsgJ1VuaGFuZGxlZCBleGNlcHRpb24hJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvZ1ByZWZpeCArICdVTktOT1dOOiAnICsgY2JSZXN1bHQuY29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL3BheXBhbC8vXHJcblxyXG4gICAgcHVibGljIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uSXRlbVRhcChhcmdzKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZGVsaXZlcnlQbGFjZT10aGlzLnVzZXJfbG9jW2FyZ3MuaW5kZXhdLmFkZHJlc3M7XHJcbiAgICAgICAgdGhpcy5kZWxpdmVyeVBsYWNlUG9zdGFsY29kZT10aGlzLnVzZXJfbG9jW2FyZ3MuaW5kZXhdLnBvc3RhbGNvZGU7XHJcbiAgICAgICAgLy9hbGVydCh0aGlzLnVzZXJfbG9jW2FyZ3MuaW5kZXhdLnBvc3RhbGNvZGUrXCIgICAgXCIrdGhpcy51c2VyX2xvY1thcmdzLmluZGV4XS5hZGRyZXNzKTtcclxuICAgICAgICBsZXQgbGF5b3V0OiBBYnNvbHV0ZUxheW91dCA9IDxBYnNvbHV0ZUxheW91dD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJsb2NhdGlvbnBpY2tlclwiKTtcclxuICAgICAgICBsZXQgbGF5b3V0YnRuOiBCdXR0b24gPSA8QnV0dG9uPnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImJ0bl9jb25maXJtXCIpO1xyXG4gICAgICAgIGxheW91dGJ0bi52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgbGF5b3V0LnZpc2liaWxpdHkgPSBcImNvbGxhcHNlXCI7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RkZWxpdmVybG9jYXRpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBsYXlvdXQ6IEFic29sdXRlTGF5b3V0ID0gPEFic29sdXRlTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImxvY2F0aW9ucGlja2VyXCIpO1xyXG4gICAgICAgIGxldCBsYXlvdXRidG46IEJ1dHRvbiA9IDxCdXR0b24+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiYnRuX2NvbmZpcm1cIik7XHJcbiAgICAgICAgaWYgKGxheW91dC52aXNpYmlsaXR5ID09IFwiY29sbGFwc2VcIikge1xyXG5cclxuICAgICAgICAgICAgbGF5b3V0LnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuICAgICAgICAgICAgbGF5b3V0YnRuLnZpc2liaWxpdHkgPSBcImNvbGxhcHNlXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGxheW91dC52aXNpYmlsaXR5ID0gXCJjb2xsYXBzZVwiO1xyXG4gICAgICAgICAgICBsYXlvdXRidG4udmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldHVzZXJsb2NhdGlvbnMoKXtcclxuICAgICAgICB0aGlzLmRlbGl2ZXJhZGRyZXNzc2VydmljZS5nZXRfdXNlcl9sb2NhdGlvbnNfZnJvbV9hcGkoMSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlbHBlcj1KU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPUpTT04ucGFyc2UoaGVscGVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25zdWNjZXMoZGF0YSk7XHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIG9uc3VjY2VzKGRhdGEpe1xyXG4gICAgICAgIC8vIGFsZXJ0KFwiY2FsbGVkXCIpO1xyXG4gICAgICAgIGxldCB0aGF0PXRoaXM7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTxkYXRhLl9ib2R5LnVzZXJMb2NhdGlvbnMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtPW5ldyBsb2NhdGlvbnMoZGF0YS5fYm9keS51c2VyTG9jYXRpb25zW2ldLnVzZXJfYWRkcmVzcyxkYXRhLl9ib2R5LnVzZXJMb2NhdGlvbnNbaV0udXNlcl9wb3N0YWxfY29kZSk7XHJcbiAgICAgICAgICAgIHRoYXQudXNlcl9sb2MucHVzaChpdGVtKTtcclxuXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjYWxsZWRcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FsbFwiK3RoYXQudXNlcl9sb2NbaV0pO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiYWRkcmVzc2VzXCIrSlNPTi5zdHJpbmdpZnkodGhhdC51c2VyX2xvYykpO1xyXG4gICAgfVxyXG4gICAgY2hhbmdlRGVsaWV2ZXJ5KCl7XHJcbiAgICAgICAgdGhpcy5lZGl0U3RhdGU9dHJ1ZTtcclxuICAgIH1cclxuICAgIG9uZW1wdHkoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgcG9zdE9yZGVyKCl7XHJcblxyXG4gICAgICAgIHRoaXMuaXNCdXN5PXRydWU7XHJcbiAgICAgICAvKiBsZXQgbGF5b3V0YnRuOiBCdXR0b24gPSA8QnV0dG9uPnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImJ0bl9jb25maXJtXCIpO1xyXG4gICAgICAgIGxheW91dGJ0bi5pc0VuYWJsZWQ9ZmFsc2U7Ki9cclxuICAgICAgICB0aGlzLmNoZWNrb3RTcnZpY2UuZ2V0bGF0bG9uZnJvbWFwaSh0aGlzLmRlbGl2ZXJ5UGxhY2VQb3N0YWxjb2RlKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyaW5nX3Jlc3BvbnNlID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIGxldCBoZWxwZXIgPSBKU09OLnBhcnNlKHN0cmluZ19yZXNwb25zZSk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMucG9zdE9yZGVyZG9uZShoZWxwZXIuX2JvZHkubGF0LGhlbHBlci5fYm9keS5sb24pO1xyXG5cclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvci5tZXNzYWdlKSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwb3N0T3JkZXJkb25lKGxhdCxsYW4pIHtcclxuICAgICAgIC8vYWxlcnQobGF0K1wiICAgXCIrbGFuKTtcclxuICAgICAgICBsZXQgcGxhY2VkQXQ9bmV3IERhdGUoKTtcclxuICAgICAgICBsZXQgcmVzdGF1cmFudF9pZD1KU09OLnBhcnNlKGdldFN0cmluZyhcInJlc3RfaWRcIikpO1xyXG4gICAgICAgbGV0IGR0ID1nZXRTdHJpbmcoXCJkZWxpdmVyX3RvX3VzZXJcIik7XHJcbiAgICAgICAgbGV0IHRoYXQ9dGhpcztcclxuICAgICAgICAgbGV0IHVzZXJvcmRlcjppdGVtZGV0YWlsW109YWRkVG9DYXJ0U2VydmljZS51c2VyX2NhcnQ7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiZmluYWwgdXNlciBvcmRlclwiK0pTT04uc3RyaW5naWZ5KHVzZXJvcmRlci5sZW5ndGgpKTtcclxuICAgICAgICB0aGlzLmNoZWNrb3RTcnZpY2VcclxuICAgICAgICAgICAgLnBvc3Rfb3JkZXIoe29yZGVyX3BsYWNlZF9hdDpwbGFjZWRBdCxvcmRlcl9wYXltZW50OnRoaXMudG90YWxQcmljZSxkZWxpdmVyeV9mZWU6XCIyXCIsb3JkZXJfc3RhdHVzOlwiUGxhY2VkXCIscmVzdGF1cmFudF9zdGF0dXM6XCJNb2RlcmF0ZVwiLHJlY2lldmVyX25vOnRoaXMuY29udGFjdF9ubyxcclxuICAgICAgICAgICAgICAgdXNlcl9pZDp0aGF0LmlkLHJlc3RhdXJhbnRfaWQ6cmVzdGF1cmFudF9pZCxvcmRlcl9sYXQ6bGF0LG9yZGVyX2xhbjpsYW4sb3JkZXJpbmZvOnVzZXJvcmRlcixyaWRlcl90aXA6dGhpcy5yaWRlcl90aXAsZGVsaXZlcnlfdGltZTpkdH0pXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9yZGVyIGFkZGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucm91dGVyLm5hdmlnYXRlKFsnL3Jlc3RhdXJhbnRzJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZXNcIitKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNCdXN5PWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucmVtb3ZlY2FydG9mb3JkZXIoKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShcImVycm9yXCIrZXJyb3IpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZW1vdmVjYXJ0b2ZvcmRlcigpe1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5jaGVja290U3J2aWNlLnJlbW92ZXVzZXJjYXJ0YXBpKHRoaXMuZGV2aWNlSW5mb3JtYXRpb24udXVpZCkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhcnQgIGRlbGV0ZWRcIik7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoXCJlcnJvclwiK2Vycm9yKSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==