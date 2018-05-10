"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var restaurants_service_1 = require("../restaurants/restaurants.service");
var router_1 = require("@angular/router");
var itemdetail_1 = require("./itemdetail");
var router_2 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var restaurant_detail_service_1 = require("./restaurant-detail.service");
var application_settings_1 = require("application-settings");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var platform_1 = require("platform");
var add_to_cart_service_1 = require("../add-to-cart-datail/add-to-cart.service");
var application = require("application");
var application_1 = require("application");
var menu_1 = require("./menu");
var DeviceInfo = /** @class */ (function () {
    function DeviceInfo(uuid) {
        this.uuid = uuid;
    }
    return DeviceInfo;
}());
var restaurantdetailComponent = /** @class */ (function () {
    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.
    function restaurantdetailComponent(restDetailService, routerExtensions, page, restaurantService, route, router, CartService) {
        //RestaurantService.add_to_cart_items = new Array<itemdetail>();
        this.restDetailService = restDetailService;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.restaurantService = restaurantService;
        this.route = route;
        this.router = router;
        this.CartService = CartService;
        this.add_to_cart = 0;
        this.cart_cal = 0;
        this.no_partclr_item = 0;
        this.special_combo = "Have four Hotboxes or salads with four Drinks,plus four sodes or treats ";
        this.isBusy = true;
        this.menus = [];
        this.itemdetails = [];
        this.listheight = 20 * 20;
        this.cartItems = new Array();
        this.deviceInformation = new DeviceInfo(platform_1.device.uuid);
    }
    restaurantdetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.get_cart(this.deviceInformation.uuid);
        if (!platform_1.isAndroid) {
            return;
        }
        application.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (data) {
            if (_this.router.isActive("/restaurants-detail", true)) {
                data.cancel = true; // prevents default back button behavior
                _this.goBack();
            }
        });
        var id = +this.route.snapshot.params["id"];
        application_settings_1.setString("rest_id", JSON.stringify(id));
        this.extractData(id);
        var abc = new observable_array_1.ObservableArray("sds", "2", "3");
        application_settings_1.setString("items", abc[0]);
        console.log(application_settings_1.getString("items"));
    };
    restaurantdetailComponent.prototype.extractData = function (id) {
        var _this = this;
        this.restDetailService.getData(id)
            .subscribe(function (result) {
            /*
            
                            console.log("---------------------------------------------------------------");
                            console.log(JSON.stringify(result));
                            console.log("---------------------------------------------------------------");*/
            _this.parString = JSON.stringify(result);
            _this.parStrSeperate = JSON.parse(_this.parString);
            var restStr = JSON.stringify(_this.parStrSeperate._body.response);
            var restPar = JSON.parse(restStr);
            _this.restaurant_image = restPar.restaurant_image_url;
            // console.log(restImage);
            _this.parAgString = JSON.stringify(_this.parStrSeperate._body.itemsResponse);
            _this.parAgStrSeperate = JSON.parse(_this.parAgString);
            /*  console.log("----------------------------menus-----------------------------------");
                       console.log(JSON.stringify(this.parAgStrSeperate)+"------------------"+this.parAgStrSeperate.length);
                       console.log("-------------------------------menus--------------------------------");
                       console.log("----------------------------menusitems-----------------------------------");
                       console.log(JSON.stringify(this.parAgStrSeperate[0].fooditem_to_menu_Fk)+"------------------"+this.parAgStrSeperate[0].fooditem_to_menu_Fk.length);
                       console.log("-------------------------------menusitems--------------------------------");*/
            for (var i = 0; i < _this.parAgStrSeperate.length; i++) {
                var foodStr = JSON.stringify(_this.parAgStrSeperate[i].fooditem_to_menu_Fk);
                var foodStrPar = JSON.parse(foodStr);
                var menuitems = [];
                var m_name = _this.parAgStrSeperate[i].menu_type;
                var m_id = _this.parAgStrSeperate[i].menu_id;
                for (var j = 0; j < _this.parAgStrSeperate[i].fooditem_to_menu_Fk.length; j++) {
                    var item = new itemdetail_1.itemdetail(foodStrPar[j].item_id, foodStrPar[j].item_name, foodStrPar[j].item_type, foodStrPar[j].item_price, foodStrPar[j].item_detail, foodStrPar[j].item_time, foodStrPar[j].cooking_time, foodStrPar[j].menu_id);
                    _this.itemdetails.push(item);
                    menuitems.push(item);
                }
                _this.menus[i] = new menu_1.menudetail(m_id, m_name, menuitems, menuitems.length);
                // this.menus.push(m_id,m_name,menuitems);
            }
            console.log("----------------------------final1111-----------------------------------");
            console.log(JSON.stringify(_this.menus));
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
            for (var a = 0; a < _this.itemdetails.length; a++) {
                for (var b = 0; b < add_to_cart_service_1.addToCartService.user_cart.length; b++) {
                    if (_this.itemdetails[a].id == add_to_cart_service_1.addToCartService.user_cart[b].id) {
                        _this.itemdetails[a].quantity += add_to_cart_service_1.addToCartService.user_cart[b].quantity;
                        _this.add_to_cart += _this.itemdetails[a].quantity;
                        _this.cart_cal += _this.itemdetails[a].quantity * _this.itemdetails[a].price;
                    }
                }
            }
            _this.isBusy = false;
        }, function (error) {
            console.log("error");
            console.log(JSON.stringify(error));
        });
    };
    restaurantdetailComponent.prototype.ondetailItemTap = function (args, menuindex) {
        console.log(this.menus[menuindex].menu_items[args.index].price);
        this.add_to_cart++;
        this.cart_cal += Number.parseInt(this.menus[menuindex].menu_items[args.index].price.toString());
        this.menus[menuindex].menu_items[args.index].quantity = this.menus[menuindex].menu_items[args.index].quantity + 1;
        this.obj = this.menus[menuindex].menu_items[args.index];
        this.post_cart_data();
    };
    restaurantdetailComponent.prototype.on_add_cart_tap = function () {
        this.router.navigate(["/add-to-cart-detail"]);
        console.log(restaurants_service_1.RestaurantService.add_to_cart_items);
    };
    restaurantdetailComponent.prototype.post_cart_data = function () {
        this.restDetailService
            .post_to_cart({ device_id: this.deviceInformation.uuid, item_id: this.obj.id, item_name: this.obj.name, item_type: this.obj.type,
            item_price: this.obj.price, item_detail: this.obj.detail, item_time: this.obj.time, cooking_time: this.obj.cooking_time,
            menu_id: this.obj.menuID })
            .subscribe(function (res) {
            console.log("res" + JSON.stringify(res));
        }, function (error) {
            console.log(JSON.stringify("error" + error));
        });
    };
    restaurantdetailComponent.prototype.get_cart = function (id) {
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
                        check = 1;
                    }
                }
                if (check == 0) {
                    _this.cartItems.push(item);
                }
            }
            _this.assignToCart();
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    restaurantdetailComponent.prototype.assignToCart = function () {
        var len = add_to_cart_service_1.addToCartService.user_cart.length;
        add_to_cart_service_1.addToCartService.user_cart.splice(0, len);
        for (var l = 0; l < this.cartItems.length; l++) {
            add_to_cart_service_1.addToCartService.user_cart.push(this.cartItems[l]);
        }
    };
    restaurantdetailComponent.prototype.noWhere = function () {
    };
    restaurantdetailComponent.prototype.goBack = function () {
        this.routerExtensions.navigate(["/restaurants"], {
            clearHistory: true,
            transition: {
                name: "flip",
                duration: 500,
                curve: "linear"
            }
        });
    };
    restaurantdetailComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./restaurant-detail.component.html",
            styleUrls: ['./restaurant-detail.css']
        }),
        __metadata("design:paramtypes", [restaurant_detail_service_1.RestaurantDetailService, nativescript_angular_1.RouterExtensions, page_1.Page,
            restaurants_service_1.RestaurantService, router_1.ActivatedRoute, router_2.Router, add_to_cart_service_1.addToCartService])
    ], restaurantdetailComponent);
    return restaurantdetailComponent;
}());
exports.restaurantdetailComponent = restaurantdetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGF1cmFudC1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzdGF1cmFudC1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELGdDQUErQjtBQUUvQiwwRUFBdUU7QUFDdkUsMENBQWlEO0FBQ2pELDJDQUEwQztBQUMxQywwQ0FBeUM7QUFDekMsNkRBQXNEO0FBQ3RELHlFQUFtRTtBQUNuRSw2REFBd0g7QUFDeEgsMkVBQXVFO0FBQ3ZFLHFDQUE0RDtBQUM1RCxpRkFBMkU7QUFDM0UseUNBQTJDO0FBQzNDLDJDQUFzRjtBQUN0RiwrQkFBa0M7QUFFbEM7SUFDSSxvQkFDVyxJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtJQUNuQixDQUFDO0lBQ1QsaUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQVdEO0lBOEJJLDZJQUE2STtJQUM3SSxpSEFBaUg7SUFHakgsbUNBQW9CLGlCQUEwQyxFQUFTLGdCQUFrQyxFQUFTLElBQVUsRUFDeEcsaUJBQW9DLEVBQVUsS0FBcUIsRUFBVSxNQUFhLEVBQVMsV0FBNEI7UUFDL0ksZ0VBQWdFO1FBRmhELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBeUI7UUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUN4RyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFPO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBaEM1SSxnQkFBVyxHQUFTLENBQUMsQ0FBQztRQUN0QixhQUFRLEdBQVMsQ0FBQyxDQUFDO1FBQ25CLG9CQUFlLEdBQVMsQ0FBQyxDQUFDO1FBSTFCLGtCQUFhLEdBQVcsMEVBQTBFLENBQUM7UUFFbkcsV0FBTSxHQUFHLElBQUksQ0FBQztRQUdkLFVBQUssR0FB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SSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQzdDLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsTUFBTTtnQkFDWixRQUFRLEVBQUUsR0FBRztnQkFDYixLQUFLLEVBQUUsUUFBUTthQUNsQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFoUVEseUJBQXlCO1FBUHJDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUV6QyxDQUFDO3lDQW1DeUMsbURBQXVCLEVBQTJCLHVDQUFnQixFQUFlLFdBQUk7WUFDckYsdUNBQWlCLEVBQWlCLHVCQUFjLEVBQWlCLGVBQU0sRUFBcUIsc0NBQWdCO09BbkMxSSx5QkFBeUIsQ0FtUXJDO0lBQUQsZ0NBQUM7Q0FBQSxBQW5RRCxJQW1RQztBQW5RWSw4REFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCJcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFJlc3RhdXJhbnQgfSBmcm9tIFwiLi4vcmVzdGF1cmFudHMvcmVzdHVyYW50c1wiO1xyXG5pbXBvcnQgeyBSZXN0YXVyYW50U2VydmljZSB9IGZyb20gXCIuLi9yZXN0YXVyYW50cy9yZXN0YXVyYW50cy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBpdGVtZGV0YWlsIH0gZnJvbSBcIi4vaXRlbWRldGFpbFwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XHJcbmltcG9ydCB7UmVzdGF1cmFudERldGFpbFNlcnZpY2V9IGZyb20gXCIuL3Jlc3RhdXJhbnQtZGV0YWlsLnNlcnZpY2VcIlxyXG5pbXBvcnQgeyBnZXRCb29sZWFuLHNldEJvb2xlYW4sZ2V0TnVtYmVyLHNldE51bWJlcixnZXRTdHJpbmcsc2V0U3RyaW5nLGhhc0tleSxyZW1vdmUsY2xlYXJ9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQge09ic2VydmFibGVBcnJheX0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MsIGRldmljZSwgc2NyZWVuIH0gZnJvbSBcInBsYXRmb3JtXCI7XHJcbmltcG9ydCB7YWRkVG9DYXJ0U2VydmljZX0gZnJvbSBcIi4uL2FkZC10by1jYXJ0LWRhdGFpbC9hZGQtdG8tY2FydC5zZXJ2aWNlXCI7XHJcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBBbmRyb2lkQXBwbGljYXRpb24sIEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7bWVudWRldGFpbH0gZnJvbSBcIi4vbWVudVwiO1xyXG5cclxuY2xhc3MgRGV2aWNlSW5mbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgdXVpZDogc3RyaW5nXHJcbiAgICApIHsgfVxyXG59XHJcblxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3Jlc3RhdXJhbnQtZGV0YWlsLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9yZXN0YXVyYW50LWRldGFpbC5jc3MnXVxyXG5cclxufSlcclxuZXhwb3J0IGNsYXNzIHJlc3RhdXJhbnRkZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQ7XHJcbiAgICBwdWJsaWMgYWRkX3RvX2NhcnQ6IG51bWJlcj0wO1xyXG4gICAgcHVibGljIGNhcnRfY2FsOiBudW1iZXI9MDtcclxuICAgIHB1YmxpYyBub19wYXJ0Y2xyX2l0ZW06IG51bWJlcj0wO1xyXG5cclxuICAgIHB1YmxpYyBhY3Rpb25fYmFyX3RpdGxlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVzdGF1cmFudF9pbWFnZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHNwZWNpYWxfY29tYm86IHN0cmluZyA9IFwiSGF2ZSBmb3VyIEhvdGJveGVzIG9yIHNhbGFkcyB3aXRoIGZvdXIgRHJpbmtzLHBsdXMgZm91ciBzb2RlcyBvciB0cmVhdHMgXCI7XHJcbiAgICBwdWJsaWMgb2JqOml0ZW1kZXRhaWw7XHJcbiAgICBwdWJsaWMgaXNCdXN5ID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgcHVibGljIG1lbnVzOm1lbnVkZXRhaWxbXSA9IFtdO1xyXG4gICAgcHVibGljIGl0ZW1kZXRhaWxzOml0ZW1kZXRhaWxbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBob3N0OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdXNlckFnZW50OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgb3JpZ2luOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdXJsOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgbGlzdGhlaWdodDogYW55PTIwKjIwO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgY2FydEl0ZW1zID0gbmV3IEFycmF5PGl0ZW1kZXRhaWw+KCk7XHJcblxyXG5cclxuICAgIHB1YmxpYyBkZXZpY2VJbmZvcm1hdGlvbjogRGV2aWNlSW5mbztcclxuXHJcblxyXG4gICAgLy8gVGhpcyBwYXR0ZXJuIG1ha2VzIHVzZSBvZiBBbmd1bGFy77+9cyBkZXBlbmRlbmN5IGluamVjdGlvbiBpbXBsZW1lbnRhdGlvbiB0byBpbmplY3QgYW4gaW5zdGFuY2Ugb2YgdGhlIEl0ZW1TZXJ2aWNlIHNlcnZpY2UgaW50byB0aGlzIGNsYXNzLiBcclxuICAgIC8vIEFuZ3VsYXIga25vd3MgYWJvdXQgdGhpcyBzZXJ2aWNlIGJlY2F1c2UgaXQgaXMgaW5jbHVkZWQgaW4geW91ciBhcHDvv71zIG1haW4gTmdNb2R1bGUsIGRlZmluZWQgaW4gYXBwLm1vZHVsZS50cy5cclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZXN0RGV0YWlsU2VydmljZTogUmVzdGF1cmFudERldGFpbFNlcnZpY2UscHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLHByaXZhdGUgcGFnZTogUGFnZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVzdGF1cmFudFNlcnZpY2U6IFJlc3RhdXJhbnRTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6Um91dGVyLHByaXZhdGUgQ2FydFNlcnZpY2U6YWRkVG9DYXJ0U2VydmljZSkge1xyXG4gICAgICAgIC8vUmVzdGF1cmFudFNlcnZpY2UuYWRkX3RvX2NhcnRfaXRlbXMgPSBuZXcgQXJyYXk8aXRlbWRldGFpbD4oKTtcclxuXHJcbiAgICAgICAgdGhpcy5kZXZpY2VJbmZvcm1hdGlvbiA9IG5ldyBEZXZpY2VJbmZvKGRldmljZS51dWlkKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0X2NhcnQodGhpcy5kZXZpY2VJbmZvcm1hdGlvbi51dWlkKTtcclxuXHJcbiAgICAgICAgaWYgKCFpc0FuZHJvaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChkYXRhOiBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yb3V0ZXIuaXNBY3RpdmUoXCIvcmVzdGF1cmFudHMtZGV0YWlsXCIsIHRydWUpKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmNhbmNlbCA9IHRydWU7IC8vIHByZXZlbnRzIGRlZmF1bHQgYmFjayBidXR0b24gYmVoYXZpb3JcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29CYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgaWQgPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZFwiXTtcclxuICAgICAgICBzZXRTdHJpbmcoXCJyZXN0X2lkXCIsSlNPTi5zdHJpbmdpZnkoaWQpKTtcclxuICAgICAgICB0aGlzLmV4dHJhY3REYXRhKGlkKTtcclxuXHJcbiAgICAgICAgbGV0IGFiYyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkoXCJzZHNcIiwgXCIyXCIsIFwiM1wiKTtcclxuICAgICAgICAgICBzZXRTdHJpbmcoXCJpdGVtc1wiLCBhYmNbMF0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGdldFN0cmluZyhcIml0ZW1zXCIpKTtcclxuXHJcblxyXG5cclxuICAgIH1cclxuICAgIHBhclN0cmluZzphbnk7XHJcbiAgICBwYXJTdHJTZXBlcmF0ZTphbnk7XHJcbiAgICBwYXJBZ1N0cmluZzphbnk7XHJcbiAgICBwYXJBZ1N0clNlcGVyYXRlOmFueTtcclxuICAgIGV4dHJhY3REYXRhKGlkOm51bWJlcikge1xyXG4gICAgICAgIHRoaXMucmVzdERldGFpbFNlcnZpY2UuZ2V0RGF0YShpZClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcblxyXG4vKlxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTsqL1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhclN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhclN0clNlcGVyYXRlID0gSlNPTi5wYXJzZSh0aGlzLnBhclN0cmluZyk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZXN0U3RyPUpTT04uc3RyaW5naWZ5KHRoaXMucGFyU3RyU2VwZXJhdGUuX2JvZHkucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3RQYXIgPSBKU09OLnBhcnNlKHJlc3RTdHIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0YXVyYW50X2ltYWdlPXJlc3RQYXIucmVzdGF1cmFudF9pbWFnZV91cmw7XHJcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3RJbWFnZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGFyQWdTdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnBhclN0clNlcGVyYXRlLl9ib2R5Lml0ZW1zUmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJBZ1N0clNlcGVyYXRlID0gSlNPTi5wYXJzZSh0aGlzLnBhckFnU3RyaW5nKTtcclxuXHJcblxyXG4gICAgIC8qICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1tZW51cy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5wYXJBZ1N0clNlcGVyYXRlKStcIi0tLS0tLS0tLS0tLS0tLS0tLVwiK3RoaXMucGFyQWdTdHJTZXBlcmF0ZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tbWVudXMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLW1lbnVzaXRlbXMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMucGFyQWdTdHJTZXBlcmF0ZVswXS5mb29kaXRlbV90b19tZW51X0ZrKStcIi0tLS0tLS0tLS0tLS0tLS0tLVwiK3RoaXMucGFyQWdTdHJTZXBlcmF0ZVswXS5mb29kaXRlbV90b19tZW51X0ZrLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1tZW51c2l0ZW1zLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7Ki9cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMucGFyQWdTdHJTZXBlcmF0ZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9vZFN0ciA9IEpTT04uc3RyaW5naWZ5KHRoaXMucGFyQWdTdHJTZXBlcmF0ZVtpXS5mb29kaXRlbV90b19tZW51X0ZrKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9vZFN0clBhciA9IEpTT04ucGFyc2UoZm9vZFN0cik7XHJcbiAgICAgICAgICAgICAgICAgICAgIGxldCBtZW51aXRlbXM6aXRlbWRldGFpbFtdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1fbmFtZT10aGlzLnBhckFnU3RyU2VwZXJhdGVbaV0ubWVudV90eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgbGV0IG1faWQ9dGhpcy5wYXJBZ1N0clNlcGVyYXRlW2ldLm1lbnVfaWQ7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHRoaXMucGFyQWdTdHJTZXBlcmF0ZVtpXS5mb29kaXRlbV90b19tZW51X0ZrLmxlbmd0aDtqKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IG5ldyBpdGVtZGV0YWlsKGZvb2RTdHJQYXJbal0uaXRlbV9pZCxmb29kU3RyUGFyW2pdLml0ZW1fbmFtZSxmb29kU3RyUGFyW2pdLml0ZW1fdHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvb2RTdHJQYXJbal0uaXRlbV9wcmljZSxmb29kU3RyUGFyW2pdLml0ZW1fZGV0YWlsLGZvb2RTdHJQYXJbal0uaXRlbV90aW1lLGZvb2RTdHJQYXJbal0uY29va2luZ190aW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9vZFN0clBhcltqXS5tZW51X2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbWRldGFpbHMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVpdGVtcy5wdXNoKGl0ZW0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudXNbaV09bmV3IG1lbnVkZXRhaWwobV9pZCxtX25hbWUsbWVudWl0ZW1zLG1lbnVpdGVtcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMubWVudXMucHVzaChtX2lkLG1fbmFtZSxtZW51aXRlbXMpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWZpbmFsMTExMS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5tZW51cykpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZmluYWwtMTExMTEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnBhckFnU3RyU2VwZXJhdGUubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvKiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFyQWdTdHJTZXBlcmF0ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGxldCBmb29kU3RyID0gSlNPTi5zdHJpbmdpZnkodGhpcy5wYXJBZ1N0clNlcGVyYXRlW2ldLmZvb2RpdGVtX3RvX21lbnVfRmspO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGxldCBmb29kU3RyUGFyID0gSlNPTi5wYXJzZShmb29kU3RyKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJBUlJBWSBuYW1lIDpcIitmb29kU3RyUGFyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGZvb2RTdHJQYXIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaitcImpcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IG5ldyBpdGVtZGV0YWlsKGZvb2RTdHJQYXJbal0uaXRlbV9pZCxmb29kU3RyUGFyW2pdLml0ZW1fbmFtZSxmb29kU3RyUGFyW2pdLml0ZW1fdHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvb2RTdHJQYXJbal0uaXRlbV9wcmljZSxmb29kU3RyUGFyW2pdLml0ZW1fZGV0YWlsLGZvb2RTdHJQYXJbal0uaXRlbV90aW1lLGZvb2RTdHJQYXJbal0uY29va2luZ190aW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9vZFN0clBhcltqXS5tZW51X2lkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbWRldGFpbHMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3d3d3d3d3d3d3d1wiK3RoaXMuaXRlbWRldGFpbHNbal0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH0qL1xyXG5cclxuICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgdGhpcy5pdGVtZGV0YWlscy5sZW5ndGg7IGErKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGIgPSAwOyBiIDwgYWRkVG9DYXJ0U2VydmljZS51c2VyX2NhcnQubGVuZ3RoOyBiKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pdGVtZGV0YWlsc1thXS5pZD09YWRkVG9DYXJ0U2VydmljZS51c2VyX2NhcnRbYl0uaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbWRldGFpbHNbYV0ucXVhbnRpdHkrPWFkZFRvQ2FydFNlcnZpY2UudXNlcl9jYXJ0W2JdLnF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRfdG9fY2FydCs9dGhpcy5pdGVtZGV0YWlsc1thXS5xdWFudGl0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FydF9jYWwrPXRoaXMuaXRlbWRldGFpbHNbYV0ucXVhbnRpdHkqdGhpcy5pdGVtZGV0YWlsc1thXS5wcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIilcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25kZXRhaWxJdGVtVGFwKGFyZ3MsbWVudWluZGV4KSB7XHJcblxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1lbnVzW21lbnVpbmRleF0ubWVudV9pdGVtc1thcmdzLmluZGV4XS5wcmljZSk7XHJcblxyXG4gICAgICAgICAgdGhpcy5hZGRfdG9fY2FydCsrO1xyXG4gICAgICAgICAgdGhpcy5jYXJ0X2NhbCArPU51bWJlci5wYXJzZUludCh0aGlzLm1lbnVzW21lbnVpbmRleF0ubWVudV9pdGVtc1thcmdzLmluZGV4XS5wcmljZS50b1N0cmluZygpKTtcclxuICAgICAgICB0aGlzLm1lbnVzW21lbnVpbmRleF0ubWVudV9pdGVtc1thcmdzLmluZGV4XS5xdWFudGl0eT10aGlzLm1lbnVzW21lbnVpbmRleF0ubWVudV9pdGVtc1thcmdzLmluZGV4XS5xdWFudGl0eSsxO1xyXG4gICAgICAgICAgICB0aGlzLm9iaj10aGlzLm1lbnVzW21lbnVpbmRleF0ubWVudV9pdGVtc1thcmdzLmluZGV4XTtcclxuICAgICAgICAgIHRoaXMucG9zdF9jYXJ0X2RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbl9hZGRfY2FydF90YXAoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2FkZC10by1jYXJ0LWRldGFpbFwiXSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coUmVzdGF1cmFudFNlcnZpY2UuYWRkX3RvX2NhcnRfaXRlbXMpO1xyXG4gICAgfVxyXG4gICAgcG9zdF9jYXJ0X2RhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5yZXN0RGV0YWlsU2VydmljZVxyXG4gICAgICAgICAgICAucG9zdF90b19jYXJ0KHtkZXZpY2VfaWQ6dGhpcy5kZXZpY2VJbmZvcm1hdGlvbi51dWlkLCBpdGVtX2lkOiB0aGlzLm9iai5pZCwgaXRlbV9uYW1lOnRoaXMub2JqLm5hbWUsIGl0ZW1fdHlwZTp0aGlzLm9iai50eXBlXHJcbiAgICAgICAgICAgICAgICAsaXRlbV9wcmljZTp0aGlzLm9iai5wcmljZSwgaXRlbV9kZXRhaWw6dGhpcy5vYmouZGV0YWlsLCBpdGVtX3RpbWU6dGhpcy5vYmoudGltZSwgY29va2luZ190aW1lOnRoaXMub2JqLmNvb2tpbmdfdGltZSxcclxuICAgICAgICAgICAgICAgIG1lbnVfaWQ6dGhpcy5vYmoubWVudUlEICAgfSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzXCIrSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KFwiZXJyb3JcIitlcnJvcikpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2NhcnQoaWQpIHtcclxuXHJcbiAgICAgICAgdGhpcy5DYXJ0U2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0X0Zyb21fQ2FydChpZClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyaW5nX3Jlc3BvbnNlID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIGxldCBoZWxwZXIgPSBKU09OLnBhcnNlKHN0cmluZ19yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlbHBlci5fYm9keS5jYXJ0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoZWNrPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBuZXcgaXRlbWRldGFpbChoZWxwZXIuX2JvZHkuY2FydFtpXS5pdGVtX2lkLGhlbHBlci5fYm9keS5jYXJ0W2ldLml0ZW1fbmFtZSxoZWxwZXIuX2JvZHkuY2FydFtpXS5pdGVtX3R5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlci5fYm9keS5jYXJ0W2ldLml0ZW1fcHJpY2UsaGVscGVyLl9ib2R5LmNhcnRbaV0uaXRlbV9kZXRhaWwsaGVscGVyLl9ib2R5LmNhcnRbaV0uaXRlbV90aW1lLGhlbHBlci5fYm9keS5jYXJ0W2ldLmNvb2tpbmdfdGltZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyLl9ib2R5LmNhcnRbaV0ubWVudV9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5xdWFudGl0eT0xO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY2FydEl0ZW1zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2FydEl0ZW1zW2pdLmlkPT1oZWxwZXIuX2JvZHkuY2FydFtpXS5pdGVtX2lkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcnRJdGVtc1tqXS5xdWFudGl0eSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2s9MTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2hlY2s9PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcnRJdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2lnblRvQ2FydCgpO1xyXG5cclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzc2lnblRvQ2FydCgpIHtcclxuICAgICAgICBsZXQgbGVuPWFkZFRvQ2FydFNlcnZpY2UudXNlcl9jYXJ0Lmxlbmd0aDtcclxuICAgICAgICBhZGRUb0NhcnRTZXJ2aWNlLnVzZXJfY2FydC5zcGxpY2UoMCxsZW4pXHJcbiAgICAgICAgZm9yIChsZXQgbCA9IDA7IGwgPCB0aGlzLmNhcnRJdGVtcy5sZW5ndGg7IGwrKykge1xyXG4gICAgICAgICAgICBhZGRUb0NhcnRTZXJ2aWNlLnVzZXJfY2FydC5wdXNoKHRoaXMuY2FydEl0ZW1zW2xdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBub1doZXJlKCl7XHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3Jlc3RhdXJhbnRzXCJdLCB7XHJcbiAgICAgICAgICAgIGNsZWFySGlzdG9yeTogdHJ1ZSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJmbGlwXCIsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogNTAwLFxyXG4gICAgICAgICAgICAgICAgY3VydmU6IFwibGluZWFyXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbiJdfQ==