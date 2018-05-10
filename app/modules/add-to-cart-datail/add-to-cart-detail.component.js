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
            var that_1 = this;
            dialog.show({
                title: "Attention",
                message: "You  have to login first!",
                cancelButtonText: "Cancel",
                okButtonText: "login"
            }).then(function (r) {
                console.log("Result: " + r);
                if (r == true) {
                    that_1.router.navigate(["/login"]);
                }
            });
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
        var that = this;
        dialog.show({
            title: "Attention",
            message: "Sure To Delete ?",
            cancelButtonText: "Cancel",
            okButtonText: "Yes"
        }).then(function (r) {
            console.log("Result: " + r);
            if (r == true) {
                that.CartService
                    .del_cart_item(id)
                    .subscribe(function (result) {
                    console.log("Dialog: " + index);
                    var string_response = JSON.stringify(result);
                    var helper = JSON.parse(string_response);
                    that.totalPrice -= that.cartItems[index].quantity * that.cartItems[index].price;
                    that.grand_total -= that.cartItems[index].quantity * that.cartItems[index].price;
                    that.cartItems.splice(index, 1);
                    console.log(JSON.stringify(that.cartItems));
                }, function (error) {
                    //this.onGetDataError(error);
                    console.log(JSON.stringify(error));
                    //alert( console.log(JSON.stringify(error._body.message)));
                });
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXRvLWNhcnQtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkZC10by1jYXJ0LWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsZ0NBQStCO0FBRS9CLDBFQUF1RTtBQUN2RSwwQ0FBaUQ7QUFFakQsOERBQTZEO0FBRzdELDhFQUFvSDtBQUNwSCw2RUFBK0U7QUFDL0UsMENBQXlDO0FBQ3pDLDZEQUFzRDtBQUN0RCw2REFBdUQ7QUFDdkQscUJBQXFCLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsUUFBUSxFQUF6QyxDQUF5QyxDQUFDLENBQUM7QUFFbkcscUNBQTREO0FBQzVELHlDQUEyQztBQUMzQywyQ0FBc0Y7QUFFdEYsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDNUM7SUFDSSxvQkFDVyxJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtJQUNuQixDQUFDO0lBQ1QsaUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQVVEO0lBa0JJLGtDQUFvQixNQUFhLEVBQVMsV0FBNEIsRUFBUyxnQkFBa0MsRUFDN0YsSUFBVSxFQUFVLGlCQUFvQyxFQUN4RCxLQUFxQjtRQUZyQixXQUFNLEdBQU4sTUFBTSxDQUFPO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUM3RixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUN4RCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQWxCbEMsZUFBVSxHQUFTLENBQUMsQ0FBQztRQUNyQixjQUFTLEdBQVEsQ0FBQyxDQUFDO1FBQ25CLGlCQUFZLEdBQVEsQ0FBQyxDQUFDO1FBRzdCLDZJQUE2STtRQUM3SSxpSEFB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LENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7SUFFTCxDQUFDO0lBRUwsb0VBQWlDLEdBQWpDO1FBRUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBRTNDLENBQUM7SUFyTlEsd0JBQXdCO1FBUHBDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHFDQUFxQztZQUNsRCxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUUxQyxDQUFDO3lDQW1CNkIsZUFBTSxFQUFxQixzQ0FBZ0IsRUFBMkIsdUNBQWdCO1lBQ3ZGLFdBQUksRUFBNkIsdUNBQWlCO1lBQ2pELHVCQUFjO09BcEJoQyx3QkFBd0IsQ0FzTnBDO0lBQUQsK0JBQUM7Q0FBQSxBQXRORCxJQXNOQztBQXROWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCJcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFJlc3RhdXJhbnQgfSBmcm9tIFwiLi4vcmVzdGF1cmFudHMvcmVzdHVyYW50c1wiO1xyXG5pbXBvcnQgeyBSZXN0YXVyYW50U2VydmljZSB9IGZyb20gXCIuLi9yZXN0YXVyYW50cy9yZXN0YXVyYW50cy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyByZXN0YXVyYW50ZGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIi4uL3Jlc3RhdXJhbnQtZGV0YWlsL3Jlc3RhdXJhbnQtZGV0YWlsLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBpdGVtZGV0YWlsIH0gZnJvbSBcIi4uL3Jlc3RhdXJhbnQtZGV0YWlsL2l0ZW1kZXRhaWxcIjtcclxuaW1wb3J0IHtLZXlib2FyZFR5cGV9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2VudW1zXCI7XHJcbmltcG9ydCBudW1iZXIgPSBLZXlib2FyZFR5cGUubnVtYmVyO1xyXG5pbXBvcnQge3NldFN0cmluZyxnZXRTdHJpbmcsc2V0TnVtYmVyLGdldE51bWJlcixzZXRCb29sZWFuLGdldEJvb2xlYW59IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCAqIGFzIGVsZW1lbnRSZWdpc3RyeU1vZHVsZSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5JztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xyXG5pbXBvcnQge2FkZFRvQ2FydFNlcnZpY2V9IGZyb20gXCIuL2FkZC10by1jYXJ0LnNlcnZpY2VcIjtcclxuZWxlbWVudFJlZ2lzdHJ5TW9kdWxlLnJlZ2lzdGVyRWxlbWVudChcIkNhcmRWaWV3XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtY2FyZHZpZXdcIikuQ2FyZFZpZXcpO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MsIGRldmljZSwgc2NyZWVuIH0gZnJvbSBcInBsYXRmb3JtXCI7XHJcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBBbmRyb2lkQXBwbGljYXRpb24sIEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XHJcblxyXG52YXIgZGlhbG9nID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1kaWFsb2dcIik7XHJcbmNsYXNzIERldmljZUluZm8ge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHV1aWQ6IHN0cmluZ1xyXG4gICAgKSB7IH1cclxufVxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FkZC10by1jYXJ0LWRldGFpbC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYWRkLXRvLWNhcnQtZGV0YWlsLmNzcyddXHJcblxyXG59KVxyXG5leHBvcnQgY2xhc3MgYWRkdG9jYXJ0ZGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBwdWJsaWMgdG90YWxQcmljZTpudW1iZXIgPTA7XHJcbiAgICBwdWJsaWMgcmlkZXJfdGlwOm51bWJlcj0wO1xyXG4gICAgcHVibGljIGRlbGl2ZXJ5X2ZlZTpudW1iZXI9MjtcclxuICAgIHB1YmxpYyBncmFuZF90b3RhbDpudW1iZXI7XHJcblxyXG4gICAgLy8gVGhpcyBwYXR0ZXJuIG1ha2VzIHVzZSBvZiBBbmd1bGFy77+9cyBkZXBlbmRlbmN5IGluamVjdGlvbiBpbXBsZW1lbnRhdGlvbiB0byBpbmplY3QgYW4gaW5zdGFuY2Ugb2YgdGhlIEl0ZW1TZXJ2aWNlIHNlcnZpY2UgaW50byB0aGlzIGNsYXNzLiBcclxuICAgIC8vIEFuZ3VsYXIga25vd3MgYWJvdXQgdGhpcyBzZXJ2aWNlIGJlY2F1c2UgaXQgaXMgaW5jbHVkZWQgaW4geW91ciBhcHDvv71zIG1haW4gTmdNb2R1bGUsIGRlZmluZWQgaW4gYXBwLm1vZHVsZS50cy5cclxuXHJcblxyXG4gICAgcHVibGljIGFkZF90b19jYXJ0X2l0ZW1zID0gbmV3IEFycmF5PGl0ZW1kZXRhaWw+KCk7XHJcbiAgICBwdWJsaWMgY2FydEl0ZW1zID0gbmV3IEFycmF5PGl0ZW1kZXRhaWw+KCk7XHJcbiAgICBwdWJsaWMgY2FydEl0ZW1zTGVuZ3RoOmFueTtcclxuXHJcbiAgICBwdWJsaWMgZGV2aWNlSW5mb3JtYXRpb246IERldmljZUluZm87XHJcbiAgICBwdWJsaWMgcmVzdF9pZDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOlJvdXRlcixwcml2YXRlIENhcnRTZXJ2aWNlOmFkZFRvQ2FydFNlcnZpY2UscHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIHJlc3RhdXJhbnRTZXJ2aWNlOiBSZXN0YXVyYW50U2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcbiAgICAgICAgdGhpcy5kZXZpY2VJbmZvcm1hdGlvbiA9IG5ldyBEZXZpY2VJbmZvKGRldmljZS51dWlkKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdldF9jYXJ0KHRoaXMuZGV2aWNlSW5mb3JtYXRpb24udXVpZCk7XHJcbiAgICAgICAgdGhpcy5yZXN0X2lkPXBhcnNlSW50KGdldFN0cmluZyhcInJlc3RfaWRcIikpO1xyXG5cclxuICAgICAgICBpZiAoIWlzQW5kcm9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGRhdGE6IEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJvdXRlci5pc0FjdGl2ZShcIi9hZGQtdG8tY2FydC1kZXRhaWxcIiwgdHJ1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEuY2FuY2VsID0gdHJ1ZTsgLy8gcHJldmVudHMgZGVmYXVsdCBiYWNrIGJ1dHRvbiBiZWhhdmlvclxyXG4gICAgICAgICAgICAgICAgdGhpcy5nb0JhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlWmVyb0VudHJ5RWxlbWVudChhcnI6aXRlbWRldGFpbFtdKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhhcnIubGVuZ3RoKTtcclxuICAgICAgICAgICAgaWYgKGFycltpXS5xdWFudGl0eSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhhcnIpO1xyXG4gICAgICAgICAgICAgICAgaSA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkX3RvX2NhcnRfaXRlbXMgPSBhcnI7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy50b3RhbFByaWNlID0gdGhpcy50b3RhbFByaWNlICsgKGFycltpXS5wcmljZSAqIGFycltpXS5xdWFudGl0eSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0X2NhcnQoaWQpIHtcclxuXHJcbiAgICAgICAgdGhpcy5DYXJ0U2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0X0Zyb21fQ2FydChpZClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyaW5nX3Jlc3BvbnNlID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIGxldCBoZWxwZXIgPSBKU09OLnBhcnNlKHN0cmluZ19yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlbHBlci5fYm9keS5jYXJ0Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hlY2s9MDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IG5ldyBpdGVtZGV0YWlsKGhlbHBlci5fYm9keS5jYXJ0W2ldLml0ZW1faWQsaGVscGVyLl9ib2R5LmNhcnRbaV0uaXRlbV9uYW1lLGhlbHBlci5fYm9keS5jYXJ0W2ldLml0ZW1fdHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyLl9ib2R5LmNhcnRbaV0uaXRlbV9wcmljZSxoZWxwZXIuX2JvZHkuY2FydFtpXS5pdGVtX2RldGFpbCxoZWxwZXIuX2JvZHkuY2FydFtpXS5pdGVtX3RpbWUsaGVscGVyLl9ib2R5LmNhcnRbaV0uY29va2luZ190aW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXIuX2JvZHkuY2FydFtpXS5tZW51X2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5xdWFudGl0eT0xO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY2FydEl0ZW1zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jYXJ0SXRlbXNbal0uaWQ9PWhlbHBlci5fYm9keS5jYXJ0W2ldLml0ZW1faWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcnRJdGVtc1tqXS5xdWFudGl0eSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWRkVG9DYXJ0U2VydmljZS51c2VyX2NhcnRbal0ucXVhbnRpdHk9MTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUHJpY2UgPSBwYXJzZUludChKU09OLnN0cmluZ2lmeSh0aGlzLnRvdGFsUHJpY2UpKSArIHBhcnNlSW50KGhlbHBlci5fYm9keS5jYXJ0W2ldLml0ZW1fcHJpY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYW5kX3RvdGFsPXRoaXMudG90YWxQcmljZSt0aGlzLmRlbGl2ZXJ5X2ZlZSt0aGlzLnJpZGVyX3RpcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjaz0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNoZWNrPT0wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJ0SXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9hZGRUb0NhcnRTZXJ2aWNlLnVzZXJfY2FydC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUHJpY2UgPSBwYXJzZUludChKU09OLnN0cmluZ2lmeSh0aGlzLnRvdGFsUHJpY2UpKSArIHBhcnNlSW50KGhlbHBlci5fYm9keS5jYXJ0W2ldLml0ZW1fcHJpY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYW5kX3RvdGFsPXRoaXMudG90YWxQcmljZSt0aGlzLmRlbGl2ZXJ5X2ZlZSt0aGlzLnJpZGVyX3RpcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJ0SXRlbXNMZW5ndGg9MTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgICAvLyAgYWxlcnQoIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLl9ib2R5Lm1lc3NhZ2UpKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcblxyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcmVzdGF1cmFudHMtZGV0YWlsXCIsIHRoaXMucmVzdF9pZF0sIHtcclxuICAgICAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImZsaXBcIixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA1MDAsXHJcbiAgICAgICAgICAgICAgICBjdXJ2ZTogXCJsaW5lYXJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvbmNoa291dCgpe1xyXG4gICAgICAgIGxldCB0b2tlbj1nZXRTdHJpbmcoXCJhY2Nlc3NfdG9rZW5cIik7XHJcblxyXG4gICAgICAgIGlmKHRva2VuPT1cIlwiKXtcclxuICAgICAgICAgICAgbGV0IHRoYXQ9dGhpcztcclxuICAgICAgICAgICAgZGlhbG9nLnNob3coe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkF0dGVudGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiWW91ICBoYXZlIHRvIGxvZ2luIGZpcnN0IVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OlwibG9naW5cIlxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS50aGVuKGZ1bmN0aW9uKHIpe1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVzdWx0OiBcIiArIHIpO1xyXG4gICAgICAgICAgICAgICAgaWYocj09dHJ1ZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucm91dGVyLm5hdmlnYXRlKFtcIi9sb2dpblwiXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGxldCB0aGF0PXRoaXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FsbGVkXCIpO1xyXG4gICAgICAgICAgICBsZXQgbGVuPWFkZFRvQ2FydFNlcnZpY2UudXNlcl9jYXJ0Lmxlbmd0aDtcclxuICAgICAgICAgICAgYWRkVG9DYXJ0U2VydmljZS51c2VyX2NhcnQuc3BsaWNlKDAsbGVuKVxyXG4gICAgICAgICAgICBmb3IgKGxldCBsID0gMDsgbCA8IHRoYXQuY2FydEl0ZW1zLmxlbmd0aDsgbCsrKSB7XHJcbiAgICAgICAgICAgICAgICBhZGRUb0NhcnRTZXJ2aWNlLnVzZXJfY2FydC5wdXNoKHRoYXQuY2FydEl0ZW1zW2xdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighdGhpcy5yaWRlcl90aXApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZGVyX3RpcD0wO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbGxlZCAgMVwiK3RoYXQucmlkZXJfdGlwKTtcclxuICAgICAgICAgICAgc2V0U3RyaW5nKFwicmlkZXJfdGlwXCIsSlNPTi5zdHJpbmdpZnkodGhhdC5yaWRlcl90aXApKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYWxsZWQgICAzXCIgKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQucm91dGVyLm5hdmlnYXRlKFtcIi9jaGVja291dFwiLHRoYXQudG90YWxQcmljZV0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbGxlZCAgNVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVsSXRlbShpZCxpbmRleCl7XHJcblxyXG4gICAgICAgIGxldCB0aGF0PXRoaXM7XHJcbiAgICAgICAgZGlhbG9nLnNob3coe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQXR0ZW50aW9uXCIsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlN1cmUgVG8gRGVsZXRlID9cIixcclxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCIsXHJcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6XCJZZXNcIlxyXG5cclxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihyKXtcclxuXHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3VsdDogXCIgKyByKTtcclxuICAgICAgICAgICAgaWYocj09dHJ1ZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5DYXJ0U2VydmljZVxyXG4gICAgICAgICAgICAgICAgICAgIC5kZWxfY2FydF9pdGVtKGlkKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZzogXCIgKyBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHJpbmdfcmVzcG9uc2UgPSBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVscGVyID0gSlNPTi5wYXJzZShzdHJpbmdfcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRvdGFsUHJpY2UtPXRoYXQuY2FydEl0ZW1zW2luZGV4XS5xdWFudGl0eSp0aGF0LmNhcnRJdGVtc1tpbmRleF0ucHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JhbmRfdG90YWwtPXRoYXQuY2FydEl0ZW1zW2luZGV4XS5xdWFudGl0eSp0aGF0LmNhcnRJdGVtc1tpbmRleF0ucHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2FydEl0ZW1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoYXQuY2FydEl0ZW1zKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9hbGVydCggY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IuX2JvZHkubWVzc2FnZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAgICAgb25SaWRlclRpcFBsdXMoKXtcclxuICAgICAgICAgICAgaWYodGhpcy5yaWRlcl90aXA8MTApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWRlcl90aXA9dGhpcy5yaWRlcl90aXArMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JhbmRfdG90YWw9dGhpcy5ncmFuZF90b3RhbCsxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgb25SaWRlclRpcE1pbnVzKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucmlkZXJfdGlwPjApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmlkZXJfdGlwID0gdGhpcy5yaWRlcl90aXAgLSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmFuZF90b3RhbD10aGlzLmdyYW5kX3RvdGFsLTE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIHNlYXJjaF9yZXN0YXVyYW50X2Zyb21fZW1wdHlfY2FydCgpe1xyXG5cclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9yZXN0YXVyYW50cyddKTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==