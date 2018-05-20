"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var restaurants_service_1 = require("../restaurants/restaurants.service");
var router_1 = require("@angular/router");
var itemdetail_1 = require("../restaurant-detail/itemdetail");
var application_settings_1 = require("tns-core-modules/application-settings");
var elementRegistryModule = require("nativescript-angular/element-registry");
var router_2 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var add_to_cart_service_1 = require("./add-to-cart.service");
elementRegistryModule.registerElement("CardView", function () { return require("nativescript-cardview").CardView; });
var platform_1 = require("platform");
var application = require("application");
var application_1 = require("application");
var dialog = require("nativescript-dialog");
var DeviceInfo = /** @class */ (function () {
    function DeviceInfo(uuid) {
        this.uuid = uuid;
    }
    return DeviceInfo;
}());
var addtocartdetailComponent = /** @class */ (function () {
    function addtocartdetailComponent(router, CartService, routerExtensions, page, restaurantService, route) {
        this.router = router;
        this.CartService = CartService;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.restaurantService = restaurantService;
        this.route = route;
        this.totalPrice = 0;
        this.rider_tip = 0;
        this.delivery_fee = 2;
        // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class. 
        // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.
        this.add_to_cart_items = new Array();
        this.cartItems = new Array();
        this.deviceInformation = new DeviceInfo(platform_1.device.uuid);
    }
    addtocartdetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.get_cart(this.deviceInformation.uuid);
        this.rest_id = parseInt(application_settings_1.getString("rest_id"));
        if (!platform_1.isAndroid) {
            return;
        }
        application.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (data) {
            if (_this.router.isActive("/add-to-cart-detail", true)) {
                data.cancel = true; // prevents default back button behavior
                _this.goBack();
            }
        });
    };
    addtocartdetailComponent.prototype.removeZeroEntryElement = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            //console.log(arr.length);
            if (arr[i].quantity == 0) {
                arr.splice(i, 1);
                //console.log(arr);
                i = -1;
            }
        }
        this.add_to_cart_items = arr;
        for (var i = 0; i < arr.length; i++) {
            this.totalPrice = this.totalPrice + (arr[i].price * arr[i].quantity);
        }
    };
    addtocartdetailComponent.prototype.get_cart = function (id) {
        var _this = this;
        this.CartService
            .get_From_Cart(id)
            .subscribe(function (result) {
            var string_response = JSON.stringify(result);
            var helper = JSON.parse(string_response);
            for (var i = 0; i < helper._body.cart.length; i++) {
                var check = 0;
                var item = new itemdetail_1.itemdetail(helper._body.cart[i].item_id, helper._body.cart[i].item_name, helper._body.cart[i].item_type, helper._body.cart[i].item_price, helper._body.cart[i].item_detail, helper._body.cart[i].item_time, helper._body.cart[i].cooking_time, helper._body.cart[i].menu_id);
                item.quantity = 1;
                for (var j = 0; j < _this.cartItems.length; j++) {
                    if (_this.cartItems[j].id == helper._body.cart[i].item_id) {
                        _this.cartItems[j].quantity += 1;
                        //addToCartService.user_cart[j].quantity=1;
                        _this.totalPrice = parseInt(JSON.stringify(_this.totalPrice)) + parseInt(helper._body.cart[i].item_price);
                        _this.grand_total = _this.totalPrice + _this.delivery_fee + _this.rider_tip;
                        check = 1;
                    }
                }
                if (check == 0) {
                    _this.cartItems.push(item);
                    //addToCartService.user_cart.push(item);
                    _this.totalPrice = parseInt(JSON.stringify(_this.totalPrice)) + parseInt(helper._body.cart[i].item_price);
                    _this.grand_total = _this.totalPrice + _this.delivery_fee + _this.rider_tip;
                    _this.cartItemsLength = 1;
                }
            }
        }, function (error) {
            //this.onGetDataError(error);
            console.log(JSON.stringify(error));
            //  alert( console.log(JSON.stringify(error._body.message)));
        });
    };
    addtocartdetailComponent.prototype.goBack = function () {
        this.routerExtensions.navigate(["/restaurants-detail", this.rest_id], {
            clearHistory: true,
            transition: {
                name: "flip",
                duration: 500,
                curve: "linear"
            }
        });
    };
    addtocartdetailComponent.prototype.onchkout = function () {
        var token = application_settings_1.getString("access_token");
        if (token == "") {
            var that = this;
            var layout = this.page.getViewById("customalert");
            layout.visibility = "visible";
            var layout1 = this.page.getViewById("deleteItemalert");
            layout1.visibility = "collapse";
        }
        else {
            var that = this;
            console.log("called");
            var len = add_to_cart_service_1.addToCartService.user_cart.length;
            add_to_cart_service_1.addToCartService.user_cart.splice(0, len);
            for (var l = 0; l < that.cartItems.length; l++) {
                add_to_cart_service_1.addToCartService.user_cart.push(that.cartItems[l]);
            }
            if (!this.rider_tip)
                this.rider_tip = 0;
            console.log("called  1" + that.rider_tip);
            application_settings_1.setString("rider_tip", JSON.stringify(that.rider_tip));
            console.log("called   3");
            that.router.navigate(["/checkout", that.totalPrice]);
            console.log("called  5");
        }
    };
    addtocartdetailComponent.prototype.delItem = function (id, index) {
        this.delete_item_id = id;
        this.delete_item_index = index;
        var layout = this.page.getViewById("deleteItemalert");
        layout.visibility = "visible";
        var layout1 = this.page.getViewById("customalert");
        layout1.visibility = "collapse";
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
    };
    addtocartdetailComponent.prototype.onRiderTipPlus = function () {
        if (this.rider_tip < 10) {
            this.rider_tip = this.rider_tip + 1;
            this.grand_total = this.grand_total + 1;
        }
    };
    addtocartdetailComponent.prototype.onRiderTipMinus = function () {
        if (this.rider_tip > 0) {
            this.rider_tip = this.rider_tip - 1;
            this.grand_total = this.grand_total - 1;
        }
    };
    addtocartdetailComponent.prototype.search_restaurant_from_empty_cart = function () {
        this.router.navigate(['/restaurants']);
    };
    addtocartdetailComponent.prototype.onAlertCancel = function () {
        var layout = this.page.getViewById("customalert");
        layout.visibility = "collapse";
    };
    addtocartdetailComponent.prototype.OnAlertOK = function () {
        var layout = this.page.getViewById("customalert");
        layout.visibility = "collapse";
        this.router.navigate(["/login"]);
    };
    addtocartdetailComponent.prototype.onDeleteAlertCancel = function () {
        var layout = this.page.getViewById("deleteItemalert");
        layout.visibility = "collapse";
    };
    addtocartdetailComponent.prototype.OnDeleteAlertOK = function () {
        var _this = this;
        var layout = this.page.getViewById("deleteItemalert");
        layout.visibility = "collapse";
        this.CartService
            .del_cart_item(this.delete_item_id)
            .subscribe(function (result) {
            console.log("Dialog: " + _this.delete_item_index);
            var string_response = JSON.stringify(result);
            var helper = JSON.parse(string_response);
            _this.totalPrice -= _this.cartItems[_this.delete_item_index].quantity * _this.cartItems[_this.delete_item_index].price;
            _this.grand_total -= _this.cartItems[_this.delete_item_index].quantity * _this.cartItems[_this.delete_item_index].price;
            _this.cartItems.splice(_this.delete_item_index, 1);
            console.log(JSON.stringify(_this.cartItems));
        }, function (error) {
            //this.onGetDataError(error);
            console.log(JSON.stringify(error));
            //alert( console.log(JSON.stringify(error._body.message)));
        });
    };
    addtocartdetailComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./add-to-cart-detail.component.html",
            styleUrls: ['./add-to-cart-detail.css']
        }),
        __metadata("design:paramtypes", [router_2.Router, add_to_cart_service_1.addToCartService, nativescript_angular_1.RouterExtensions,
            page_1.Page, restaurants_service_1.RestaurantService,
            router_1.ActivatedRoute])
    ], addtocartdetailComponent);
    return addtocartdetailComponent;
}());
exports.addtocartdetailComponent = addtocartdetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXRvLWNhcnQtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkZC10by1jYXJ0LWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsZ0NBQStCO0FBRS9CLDBFQUF1RTtBQUN2RSwwQ0FBaUQ7QUFFakQsOERBQTZEO0FBRzdELDhFQUFvSDtBQUNwSCw2RUFBK0U7QUFDL0UsMENBQXlDO0FBQ3pDLDZEQUFzRDtBQUN0RCw2REFBdUQ7QUFDdkQscUJBQXFCLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsUUFBUSxFQUF6QyxDQUF5QyxDQUFDLENBQUM7QUFFbkcscUNBQTREO0FBQzVELHlDQUEyQztBQUMzQywyQ0FBc0Y7QUFHdEYsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDNUM7SUFDSSxvQkFDVyxJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtJQUNuQixDQUFDO0lBQ1QsaUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQVVEO0lBc0JJLGtDQUFvQixNQUFhLEVBQVMsV0FBNEIsRUFBUyxnQkFBa0MsRUFDN0YsSUFBVSxFQUFVLGlCQUFvQyxFQUN4RCxLQUFxQjtRQUZyQixXQUFNLEdBQU4sTUFBTSxDQUFPO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUM3RixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUN4RCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQXRCbEMsZUFBVSxHQUFTLENBQUMsQ0FBQztRQUNyQixjQUFTLEdBQVEsQ0FBQyxDQUFDO1FBQ25CLGlCQUFZLEdBQVEsQ0FBQyxDQUFDO1FBTzdCLDZJQUE2STtRQUM3SSxpSEFB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c0NBQWdCLEVBQTJCLHVDQUFnQjtZQUN2RixXQUFJLEVBQTZCLHVDQUFpQjtZQUNqRCx1QkFBYztPQXhCaEMsd0JBQXdCLENBb1FwQztJQUFELCtCQUFDO0NBQUEsQUFwUUQsSUFvUUM7QUFwUVksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiXHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBSZXN0YXVyYW50IH0gZnJvbSBcIi4uL3Jlc3RhdXJhbnRzL3Jlc3R1cmFudHNcIjtcclxuaW1wb3J0IHsgUmVzdGF1cmFudFNlcnZpY2UgfSBmcm9tIFwiLi4vcmVzdGF1cmFudHMvcmVzdGF1cmFudHMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgcmVzdGF1cmFudGRldGFpbENvbXBvbmVudCB9IGZyb20gXCIuLi9yZXN0YXVyYW50LWRldGFpbC9yZXN0YXVyYW50LWRldGFpbC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgaXRlbWRldGFpbCB9IGZyb20gXCIuLi9yZXN0YXVyYW50LWRldGFpbC9pdGVtZGV0YWlsXCI7XHJcbmltcG9ydCB7S2V5Ym9hcmRUeXBlfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9lbnVtc1wiO1xyXG5pbXBvcnQgbnVtYmVyID0gS2V5Ym9hcmRUeXBlLm51bWJlcjtcclxuaW1wb3J0IHtzZXRTdHJpbmcsZ2V0U3RyaW5nLHNldE51bWJlcixnZXROdW1iZXIsc2V0Qm9vbGVhbixnZXRCb29sZWFufSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgKiBhcyBlbGVtZW50UmVnaXN0cnlNb2R1bGUgZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcclxuaW1wb3J0IHthZGRUb0NhcnRTZXJ2aWNlfSBmcm9tIFwiLi9hZGQtdG8tY2FydC5zZXJ2aWNlXCI7XHJcbmVsZW1lbnRSZWdpc3RyeU1vZHVsZS5yZWdpc3RlckVsZW1lbnQoXCJDYXJkVmlld1wiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWNhcmR2aWV3XCIpLkNhcmRWaWV3KTtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBpc0FuZHJvaWQsIGlzSU9TLCBkZXZpY2UsIHNjcmVlbiB9IGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgQW5kcm9pZEFwcGxpY2F0aW9uLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQge0Fic29sdXRlTGF5b3V0fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2Fic29sdXRlLWxheW91dFwiO1xyXG5cclxudmFyIGRpYWxvZyA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZGlhbG9nXCIpO1xyXG5jbGFzcyBEZXZpY2VJbmZvIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyB1dWlkOiBzdHJpbmdcclxuICAgICkgeyB9XHJcbn1cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9hZGQtdG8tY2FydC1kZXRhaWwuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL2FkZC10by1jYXJ0LWRldGFpbC5jc3MnXVxyXG5cclxufSlcclxuZXhwb3J0IGNsYXNzIGFkZHRvY2FydGRldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgcHVibGljIHRvdGFsUHJpY2U6bnVtYmVyID0wO1xyXG4gICAgcHVibGljIHJpZGVyX3RpcDpudW1iZXI9MDtcclxuICAgIHB1YmxpYyBkZWxpdmVyeV9mZWU6bnVtYmVyPTI7XHJcbiAgICBwdWJsaWMgZ3JhbmRfdG90YWw6YW55O1xyXG4gICAgcHVibGljIGRlbGV0ZV9pdGVtX2lkOmFueTtcclxuICAgIHB1YmxpYyBkZWxldGVfaXRlbV9pbmRleDphbnk7XHJcblxyXG5cclxuXHJcbiAgICAvLyBUaGlzIHBhdHRlcm4gbWFrZXMgdXNlIG9mIEFuZ3VsYXLvv71zIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGltcGxlbWVudGF0aW9uIHRvIGluamVjdCBhbiBpbnN0YW5jZSBvZiB0aGUgSXRlbVNlcnZpY2Ugc2VydmljZSBpbnRvIHRoaXMgY2xhc3MuIFxyXG4gICAgLy8gQW5ndWxhciBrbm93cyBhYm91dCB0aGlzIHNlcnZpY2UgYmVjYXVzZSBpdCBpcyBpbmNsdWRlZCBpbiB5b3VyIGFwcO+/vXMgbWFpbiBOZ01vZHVsZSwgZGVmaW5lZCBpbiBhcHAubW9kdWxlLnRzLlxyXG5cclxuXHJcbiAgICBwdWJsaWMgYWRkX3RvX2NhcnRfaXRlbXMgPSBuZXcgQXJyYXk8aXRlbWRldGFpbD4oKTtcclxuICAgIHB1YmxpYyBjYXJ0SXRlbXMgPSBuZXcgQXJyYXk8aXRlbWRldGFpbD4oKTtcclxuICAgIHB1YmxpYyBjYXJ0SXRlbXNMZW5ndGg6YW55O1xyXG5cclxuICAgIHB1YmxpYyBkZXZpY2VJbmZvcm1hdGlvbjogRGV2aWNlSW5mbztcclxuICAgIHB1YmxpYyByZXN0X2lkOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6Um91dGVyLHByaXZhdGUgQ2FydFNlcnZpY2U6YWRkVG9DYXJ0U2VydmljZSxwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcmVzdGF1cmFudFNlcnZpY2U6IFJlc3RhdXJhbnRTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgICAgICB0aGlzLmRldmljZUluZm9ybWF0aW9uID0gbmV3IERldmljZUluZm8oZGV2aWNlLnV1aWQpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2V0X2NhcnQodGhpcy5kZXZpY2VJbmZvcm1hdGlvbi51dWlkKTtcclxuICAgICAgICB0aGlzLnJlc3RfaWQ9cGFyc2VJbnQoZ2V0U3RyaW5nKFwicmVzdF9pZFwiKSk7XHJcblxyXG4gICAgICAgIGlmICghaXNBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihBbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCAoZGF0YTogQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucm91dGVyLmlzQWN0aXZlKFwiL2FkZC10by1jYXJ0LWRldGFpbFwiLCB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5jYW5jZWwgPSB0cnVlOyAvLyBwcmV2ZW50cyBkZWZhdWx0IGJhY2sgYnV0dG9uIGJlaGF2aW9yXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvQmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZW1vdmVaZXJvRW50cnlFbGVtZW50KGFycjppdGVtZGV0YWlsW10pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGFyci5sZW5ndGgpO1xyXG4gICAgICAgICAgICBpZiAoYXJyW2ldLnF1YW50aXR5ID09IDApIHtcclxuICAgICAgICAgICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGFycik7XHJcbiAgICAgICAgICAgICAgICBpID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGRfdG9fY2FydF9pdGVtcyA9IGFycjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsUHJpY2UgPSB0aGlzLnRvdGFsUHJpY2UgKyAoYXJyW2ldLnByaWNlICogYXJyW2ldLnF1YW50aXR5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRfY2FydChpZCkge1xyXG5cclxuICAgICAgICB0aGlzLkNhcnRTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5nZXRfRnJvbV9DYXJ0KGlkKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBzdHJpbmdfcmVzcG9uc2UgPSBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlbHBlciA9IEpTT04ucGFyc2Uoc3RyaW5nX3Jlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVscGVyLl9ib2R5LmNhcnQubGVuZ3RoOyBpKyspIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGVjaz0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gbmV3IGl0ZW1kZXRhaWwoaGVscGVyLl9ib2R5LmNhcnRbaV0uaXRlbV9pZCxoZWxwZXIuX2JvZHkuY2FydFtpXS5pdGVtX25hbWUsaGVscGVyLl9ib2R5LmNhcnRbaV0uaXRlbV90eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXIuX2JvZHkuY2FydFtpXS5pdGVtX3ByaWNlLGhlbHBlci5fYm9keS5jYXJ0W2ldLml0ZW1fZGV0YWlsLGhlbHBlci5fYm9keS5jYXJ0W2ldLml0ZW1fdGltZSxoZWxwZXIuX2JvZHkuY2FydFtpXS5jb29raW5nX3RpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlci5fYm9keS5jYXJ0W2ldLm1lbnVfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnF1YW50aXR5PTE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jYXJ0SXRlbXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNhcnRJdGVtc1tqXS5pZD09aGVscGVyLl9ib2R5LmNhcnRbaV0uaXRlbV9pZClcclxuICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FydEl0ZW1zW2pdLnF1YW50aXR5ICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hZGRUb0NhcnRTZXJ2aWNlLnVzZXJfY2FydFtqXS5xdWFudGl0eT0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxQcmljZSA9IHBhcnNlSW50KEpTT04uc3RyaW5naWZ5KHRoaXMudG90YWxQcmljZSkpICsgcGFyc2VJbnQoaGVscGVyLl9ib2R5LmNhcnRbaV0uaXRlbV9wcmljZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JhbmRfdG90YWw9dGhpcy50b3RhbFByaWNlK3RoaXMuZGVsaXZlcnlfZmVlK3RoaXMucmlkZXJfdGlwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrPTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2hlY2s9PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcnRJdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2FkZFRvQ2FydFNlcnZpY2UudXNlcl9jYXJ0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxQcmljZSA9IHBhcnNlSW50KEpTT04uc3RyaW5naWZ5KHRoaXMudG90YWxQcmljZSkpICsgcGFyc2VJbnQoaGVscGVyLl9ib2R5LmNhcnRbaV0uaXRlbV9wcmljZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JhbmRfdG90YWw9dGhpcy50b3RhbFByaWNlK3RoaXMuZGVsaXZlcnlfZmVlK3RoaXMucmlkZXJfdGlwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcnRJdGVtc0xlbmd0aD0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICAgIC8vICBhbGVydCggY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IuX2JvZHkubWVzc2FnZSkpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvQmFjaygpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9yZXN0YXVyYW50cy1kZXRhaWxcIiwgdGhpcy5yZXN0X2lkXSwge1xyXG4gICAgICAgICAgICBjbGVhckhpc3Rvcnk6IHRydWUsXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZmxpcFwiLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDUwMCxcclxuICAgICAgICAgICAgICAgIGN1cnZlOiBcImxpbmVhclwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIG9uY2hrb3V0KCl7XHJcbiAgICAgICAgbGV0IHRva2VuPWdldFN0cmluZyhcImFjY2Vzc190b2tlblwiKTtcclxuXHJcbiAgICAgICAgaWYodG9rZW49PVwiXCIpe1xyXG4gICAgICAgICAgICBsZXQgdGhhdD10aGlzO1xyXG4gICAgICAgICAgICBsZXQgbGF5b3V0OiBBYnNvbHV0ZUxheW91dCA9IDxBYnNvbHV0ZUxheW91dD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJjdXN0b21hbGVydFwiKTtcclxuXHJcbiAgICAgICAgICAgIGxheW91dC52aXNpYmlsaXR5PVwidmlzaWJsZVwiO1xyXG4gICAgICAgICAgICBsZXQgbGF5b3V0MTogQWJzb2x1dGVMYXlvdXQgPSA8QWJzb2x1dGVMYXlvdXQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiZGVsZXRlSXRlbWFsZXJ0XCIpO1xyXG4gICAgICAgICAgICBsYXlvdXQxLnZpc2liaWxpdHk9XCJjb2xsYXBzZVwiO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGxldCB0aGF0PXRoaXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FsbGVkXCIpO1xyXG4gICAgICAgICAgICBsZXQgbGVuPWFkZFRvQ2FydFNlcnZpY2UudXNlcl9jYXJ0Lmxlbmd0aDtcclxuICAgICAgICAgICAgYWRkVG9DYXJ0U2VydmljZS51c2VyX2NhcnQuc3BsaWNlKDAsbGVuKVxyXG4gICAgICAgICAgICBmb3IgKGxldCBsID0gMDsgbCA8IHRoYXQuY2FydEl0ZW1zLmxlbmd0aDsgbCsrKSB7XHJcbiAgICAgICAgICAgICAgICBhZGRUb0NhcnRTZXJ2aWNlLnVzZXJfY2FydC5wdXNoKHRoYXQuY2FydEl0ZW1zW2xdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighdGhpcy5yaWRlcl90aXApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZGVyX3RpcD0wO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbGxlZCAgMVwiK3RoYXQucmlkZXJfdGlwKTtcclxuICAgICAgICAgICAgc2V0U3RyaW5nKFwicmlkZXJfdGlwXCIsSlNPTi5zdHJpbmdpZnkodGhhdC5yaWRlcl90aXApKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYWxsZWQgICAzXCIgKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQucm91dGVyLm5hdmlnYXRlKFtcIi9jaGVja291dFwiLHRoYXQudG90YWxQcmljZV0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbGxlZCAgNVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVsSXRlbShpZCxpbmRleCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZV9pdGVtX2lkPWlkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVfaXRlbV9pbmRleD1pbmRleDtcclxuICAgICAgICBsZXQgbGF5b3V0OiBBYnNvbHV0ZUxheW91dCA9IDxBYnNvbHV0ZUxheW91dD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJkZWxldGVJdGVtYWxlcnRcIik7XHJcbiAgICAgICAgbGF5b3V0LnZpc2liaWxpdHk9XCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgbGV0IGxheW91dDE6IEFic29sdXRlTGF5b3V0ID0gPEFic29sdXRlTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImN1c3RvbWFsZXJ0XCIpO1xyXG5cclxuICAgICAgICBsYXlvdXQxLnZpc2liaWxpdHk9XCJjb2xsYXBzZVwiO1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgbGV0IHRoYXQ9dGhpcztcclxuICAgICAgICAgICAgICAgIGRpYWxvZy5zaG93KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQXR0ZW50aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiU3VyZSBUbyBEZWxldGUgP1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6XCJZZXNcIlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHIpe1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXN1bHQ6IFwiICsgcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocj09dHJ1ZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LkNhcnRTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVsX2NhcnRfaXRlbShpZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nOiBcIiArIGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RyaW5nX3Jlc3BvbnNlID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVscGVyID0gSlNPTi5wYXJzZShzdHJpbmdfcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudG90YWxQcmljZS09dGhhdC5jYXJ0SXRlbXNbaW5kZXhdLnF1YW50aXR5KnRoYXQuY2FydEl0ZW1zW2luZGV4XS5wcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyYW5kX3RvdGFsLT10aGF0LmNhcnRJdGVtc1tpbmRleF0ucXVhbnRpdHkqdGhhdC5jYXJ0SXRlbXNbaW5kZXhdLnByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2FydEl0ZW1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhhdC5jYXJ0SXRlbXMpKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWxlcnQoIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLl9ib2R5Lm1lc3NhZ2UpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pOyovXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAgICAgb25SaWRlclRpcFBsdXMoKXtcclxuICAgICAgICAgICAgaWYodGhpcy5yaWRlcl90aXA8MTApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWRlcl90aXA9dGhpcy5yaWRlcl90aXArMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JhbmRfdG90YWw9dGhpcy5ncmFuZF90b3RhbCsxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgb25SaWRlclRpcE1pbnVzKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucmlkZXJfdGlwPjApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmlkZXJfdGlwID0gdGhpcy5yaWRlcl90aXAgLSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmFuZF90b3RhbD10aGlzLmdyYW5kX3RvdGFsLTE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIHNlYXJjaF9yZXN0YXVyYW50X2Zyb21fZW1wdHlfY2FydCgpe1xyXG5cclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9yZXN0YXVyYW50cyddKTtcclxuXHJcbiAgICB9XHJcbiAgICBvbkFsZXJ0Q2FuY2VsKCl7XHJcbiAgICAgICAgbGV0IGxheW91dDogQWJzb2x1dGVMYXlvdXQgPSA8QWJzb2x1dGVMYXlvdXQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiY3VzdG9tYWxlcnRcIik7XHJcbiAgICAgICAgbGF5b3V0LnZpc2liaWxpdHk9XCJjb2xsYXBzZVwiO1xyXG5cclxuICAgIH1cclxuICAgIE9uQWxlcnRPSygpe1xyXG5cclxuICAgICAgICBsZXQgbGF5b3V0OiBBYnNvbHV0ZUxheW91dCA9IDxBYnNvbHV0ZUxheW91dD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJjdXN0b21hbGVydFwiKTtcclxuICAgICAgICBsYXlvdXQudmlzaWJpbGl0eT1cImNvbGxhcHNlXCI7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2xvZ2luXCJdKTtcclxuICAgIH1cclxuICAgIG9uRGVsZXRlQWxlcnRDYW5jZWwoKXtcclxuICAgICAgICBsZXQgbGF5b3V0OiBBYnNvbHV0ZUxheW91dCA9IDxBYnNvbHV0ZUxheW91dD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJkZWxldGVJdGVtYWxlcnRcIik7XHJcbiAgICAgICAgbGF5b3V0LnZpc2liaWxpdHk9XCJjb2xsYXBzZVwiO1xyXG5cclxuICAgIH1cclxuICAgIE9uRGVsZXRlQWxlcnRPSygpe1xyXG5cclxuICAgICAgICBsZXQgbGF5b3V0OiBBYnNvbHV0ZUxheW91dCA9IDxBYnNvbHV0ZUxheW91dD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJkZWxldGVJdGVtYWxlcnRcIik7XHJcbiAgICAgICAgbGF5b3V0LnZpc2liaWxpdHk9XCJjb2xsYXBzZVwiO1xyXG5cclxuICAgICAgICB0aGlzLkNhcnRTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5kZWxfY2FydF9pdGVtKHRoaXMuZGVsZXRlX2l0ZW1faWQpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2c6IFwiICsgdGhpcy5kZWxldGVfaXRlbV9pbmRleCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyaW5nX3Jlc3BvbnNlID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIGxldCBoZWxwZXIgPSBKU09OLnBhcnNlKHN0cmluZ19yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUHJpY2UtPXRoaXMuY2FydEl0ZW1zW3RoaXMuZGVsZXRlX2l0ZW1faW5kZXhdLnF1YW50aXR5KnRoaXMuY2FydEl0ZW1zW3RoaXMuZGVsZXRlX2l0ZW1faW5kZXhdLnByaWNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmFuZF90b3RhbC09dGhpcy5jYXJ0SXRlbXNbdGhpcy5kZWxldGVfaXRlbV9pbmRleF0ucXVhbnRpdHkqdGhpcy5jYXJ0SXRlbXNbdGhpcy5kZWxldGVfaXRlbV9pbmRleF0ucHJpY2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnRJdGVtcy5zcGxpY2UodGhpcy5kZWxldGVfaXRlbV9pbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmNhcnRJdGVtcykpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KCBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvci5fYm9keS5tZXNzYWdlKSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG4iXX0=