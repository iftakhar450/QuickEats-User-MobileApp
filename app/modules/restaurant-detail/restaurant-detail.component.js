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
        this.menulistheight = 0;
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
                _this.menulistheight = _this.menulistheight + (menuitems.length * 80);
                _this.menus[i] = new menu_1.menudetail(m_id, m_name, menuitems, menuitems.length);
                // this.menus.push(m_id,m_name,menuitems);
            }
            console.log("----------------------------final1111-----------------------------------");
            _this.menulistheight = _this.menulistheight + (_this.menus.length * 50);
            console.log(_this.menulistheight);
            // this.menulistheight=this.menus.length*50;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGF1cmFudC1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzdGF1cmFudC1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELGdDQUErQjtBQUUvQiwwRUFBdUU7QUFDdkUsMENBQWlEO0FBQ2pELDJDQUEwQztBQUMxQywwQ0FBeUM7QUFDekMsNkRBQXNEO0FBQ3RELHlFQUFtRTtBQUNuRSw2REFBd0g7QUFDeEgsMkVBQXVFO0FBQ3ZFLHFDQUE0RDtBQUM1RCxpRkFBMkU7QUFDM0UseUNBQTJDO0FBQzNDLDJDQUFzRjtBQUN0RiwrQkFBa0M7QUFJbEM7SUFDSSxvQkFDVyxJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtJQUNuQixDQUFDO0lBQ1QsaUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQVdEO0lBOEJJLDZJQUE2STtJQUM3SSxpSEFBaUg7SUFHakgsbUNBQW9CLGlCQUEwQyxFQUFTLGdCQUFrQyxFQUFTLElBQVUsRUFDeEcsaUJBQW9DLEVBQVUsS0FBcUIsRUFBVSxNQUFhLEVBQVMsV0FBNEI7UUFDL0ksZ0VBQWdFO1FBRmhELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBeUI7UUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUN4RyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFPO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBaEM1SSxnQkFBVyxHQUFTLENBQUMsQ0FBQztRQUN0QixhQUFRLEdBQVMsQ0FBQyxDQUFDO1FBQ25CLG9CQUFlLEdBQVMsQ0FBQyxDQUFDO1FBSTFCLGtCQUFhLEdBQVcsMEVBQTBFLENBQUM7UUFFbkcsV0FBTSxHQUFHLElBQUksQ0FBQztRQUdkLFVBQUssR0FB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QUUsRUFBRSxDQUFDO1lBQzdDLHNDQUFnQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7SUFDTCxDQUFDO0lBQ0QsMkNBQU8sR0FBUDtJQUVBLENBQUM7SUFDTSwwQ0FBTSxHQUFiO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQzdDLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsTUFBTTtnQkFDWixRQUFRLEVBQUUsR0FBRztnQkFDYixLQUFLLEVBQUUsUUFBUTthQUNsQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFuUVEseUJBQXlCO1FBUHJDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUV6QyxDQUFDO3lDQW1DeUMsbURBQXVCLEVBQTJCLHVDQUFnQixFQUFlLFdBQUk7WUFDckYsdUNBQWlCLEVBQWlCLHVCQUFjLEVBQWlCLGVBQU0sRUFBcUIsc0NBQWdCO09BbkMxSSx5QkFBeUIsQ0F3UXJDO0lBQUQsZ0NBQUM7Q0FBQSxBQXhRRCxJQXdRQztBQXhRWSw4REFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCJcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFJlc3RhdXJhbnQgfSBmcm9tIFwiLi4vcmVzdGF1cmFudHMvcmVzdHVyYW50c1wiO1xyXG5pbXBvcnQgeyBSZXN0YXVyYW50U2VydmljZSB9IGZyb20gXCIuLi9yZXN0YXVyYW50cy9yZXN0YXVyYW50cy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBpdGVtZGV0YWlsIH0gZnJvbSBcIi4vaXRlbWRldGFpbFwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XHJcbmltcG9ydCB7UmVzdGF1cmFudERldGFpbFNlcnZpY2V9IGZyb20gXCIuL3Jlc3RhdXJhbnQtZGV0YWlsLnNlcnZpY2VcIlxyXG5pbXBvcnQgeyBnZXRCb29sZWFuLHNldEJvb2xlYW4sZ2V0TnVtYmVyLHNldE51bWJlcixnZXRTdHJpbmcsc2V0U3RyaW5nLGhhc0tleSxyZW1vdmUsY2xlYXJ9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQge09ic2VydmFibGVBcnJheX0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MsIGRldmljZSwgc2NyZWVuIH0gZnJvbSBcInBsYXRmb3JtXCI7XHJcbmltcG9ydCB7YWRkVG9DYXJ0U2VydmljZX0gZnJvbSBcIi4uL2FkZC10by1jYXJ0LWRhdGFpbC9hZGQtdG8tY2FydC5zZXJ2aWNlXCI7XHJcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBBbmRyb2lkQXBwbGljYXRpb24sIEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7bWVudWRldGFpbH0gZnJvbSBcIi4vbWVudVwiO1xyXG5pbXBvcnQgeyBHZXN0dXJlVHlwZXMsIFBhbkdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidWkvZ2VzdHVyZXNcIjtcclxuXHJcblxyXG5jbGFzcyBEZXZpY2VJbmZvIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyB1dWlkOiBzdHJpbmdcclxuICAgICkgeyB9XHJcbn1cclxuXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcmVzdGF1cmFudC1kZXRhaWwuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL3Jlc3RhdXJhbnQtZGV0YWlsLmNzcyddXHJcblxyXG59KVxyXG5leHBvcnQgY2xhc3MgcmVzdGF1cmFudGRldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgcmVzdGF1cmFudDogUmVzdGF1cmFudDtcclxuICAgIHB1YmxpYyBhZGRfdG9fY2FydDogbnVtYmVyPTA7XHJcbiAgICBwdWJsaWMgY2FydF9jYWw6IG51bWJlcj0wO1xyXG4gICAgcHVibGljIG5vX3BhcnRjbHJfaXRlbTogbnVtYmVyPTA7XHJcblxyXG4gICAgcHVibGljIGFjdGlvbl9iYXJfdGl0bGU6IHN0cmluZztcclxuICAgIHB1YmxpYyByZXN0YXVyYW50X2ltYWdlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc3BlY2lhbF9jb21ibzogc3RyaW5nID0gXCJIYXZlIGZvdXIgSG90Ym94ZXMgb3Igc2FsYWRzIHdpdGggZm91ciBEcmlua3MscGx1cyBmb3VyIHNvZGVzIG9yIHRyZWF0cyBcIjtcclxuICAgIHB1YmxpYyBvYmo6aXRlbWRldGFpbDtcclxuICAgIHB1YmxpYyBpc0J1c3kgPSB0cnVlO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgbWVudXM6bWVudWRldGFpbFtdID0gW107XHJcbiAgICBwdWJsaWMgaXRlbWRldGFpbHM6aXRlbWRldGFpbFtdID0gW107XHJcblxyXG4gICAgcHVibGljIGhvc3Q6IHN0cmluZztcclxuICAgIHB1YmxpYyB1c2VyQWdlbnQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBvcmlnaW46IHN0cmluZztcclxuICAgIHB1YmxpYyB1cmw6IHN0cmluZztcclxuICAgIHB1YmxpYyBtZW51bGlzdGhlaWdodDogYW55PTA7XHJcblxyXG5cclxuICAgIHB1YmxpYyBjYXJ0SXRlbXMgPSBuZXcgQXJyYXk8aXRlbWRldGFpbD4oKTtcclxuXHJcblxyXG4gICAgcHVibGljIGRldmljZUluZm9ybWF0aW9uOiBEZXZpY2VJbmZvO1xyXG5cclxuXHJcbiAgICAvLyBUaGlzIHBhdHRlcm4gbWFrZXMgdXNlIG9mIEFuZ3VsYXLvv71zIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGltcGxlbWVudGF0aW9uIHRvIGluamVjdCBhbiBpbnN0YW5jZSBvZiB0aGUgSXRlbVNlcnZpY2Ugc2VydmljZSBpbnRvIHRoaXMgY2xhc3MuIFxyXG4gICAgLy8gQW5ndWxhciBrbm93cyBhYm91dCB0aGlzIHNlcnZpY2UgYmVjYXVzZSBpdCBpcyBpbmNsdWRlZCBpbiB5b3VyIGFwcO+/vXMgbWFpbiBOZ01vZHVsZSwgZGVmaW5lZCBpbiBhcHAubW9kdWxlLnRzLlxyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlc3REZXRhaWxTZXJ2aWNlOiBSZXN0YXVyYW50RGV0YWlsU2VydmljZSxwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMscHJpdmF0ZSBwYWdlOiBQYWdlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZXN0YXVyYW50U2VydmljZTogUmVzdGF1cmFudFNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjpSb3V0ZXIscHJpdmF0ZSBDYXJ0U2VydmljZTphZGRUb0NhcnRTZXJ2aWNlKSB7XHJcbiAgICAgICAgLy9SZXN0YXVyYW50U2VydmljZS5hZGRfdG9fY2FydF9pdGVtcyA9IG5ldyBBcnJheTxpdGVtZGV0YWlsPigpO1xyXG5cclxuICAgICAgICB0aGlzLmRldmljZUluZm9ybWF0aW9uID0gbmV3IERldmljZUluZm8oZGV2aWNlLnV1aWQpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRfY2FydCh0aGlzLmRldmljZUluZm9ybWF0aW9uLnV1aWQpO1xyXG5cclxuICAgICAgICBpZiAoIWlzQW5kcm9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGRhdGE6IEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJvdXRlci5pc0FjdGl2ZShcIi9yZXN0YXVyYW50cy1kZXRhaWxcIiwgdHJ1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEuY2FuY2VsID0gdHJ1ZTsgLy8gcHJldmVudHMgZGVmYXVsdCBiYWNrIGJ1dHRvbiBiZWhhdmlvclxyXG4gICAgICAgICAgICAgICAgdGhpcy5nb0JhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBpZCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkXCJdO1xyXG4gICAgICAgIHNldFN0cmluZyhcInJlc3RfaWRcIixKU09OLnN0cmluZ2lmeShpZCkpO1xyXG4gICAgICAgIHRoaXMuZXh0cmFjdERhdGEoaWQpO1xyXG5cclxuICAgICAgICBsZXQgYWJjID0gbmV3IE9ic2VydmFibGVBcnJheShcInNkc1wiLCBcIjJcIiwgXCIzXCIpO1xyXG4gICAgICAgICAgIHNldFN0cmluZyhcIml0ZW1zXCIsIGFiY1swXSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZ2V0U3RyaW5nKFwiaXRlbXNcIikpO1xyXG5cclxuXHJcblxyXG4gICAgfVxyXG4gICAgcGFyU3RyaW5nOmFueTtcclxuICAgIHBhclN0clNlcGVyYXRlOmFueTtcclxuICAgIHBhckFnU3RyaW5nOmFueTtcclxuICAgIHBhckFnU3RyU2VwZXJhdGU6YW55O1xyXG4gICAgZXh0cmFjdERhdGEoaWQ6bnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5yZXN0RGV0YWlsU2VydmljZS5nZXREYXRhKGlkKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuXHJcbi8qXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpOyovXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGFyU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyU3RyU2VwZXJhdGUgPSBKU09OLnBhcnNlKHRoaXMucGFyU3RyaW5nKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3RTdHI9SlNPTi5zdHJpbmdpZnkodGhpcy5wYXJTdHJTZXBlcmF0ZS5fYm9keS5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdFBhciA9IEpTT04ucGFyc2UocmVzdFN0cik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RhdXJhbnRfaW1hZ2U9cmVzdFBhci5yZXN0YXVyYW50X2ltYWdlX3VybDtcclxuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdEltYWdlKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJBZ1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KHRoaXMucGFyU3RyU2VwZXJhdGUuX2JvZHkuaXRlbXNSZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhckFnU3RyU2VwZXJhdGUgPSBKU09OLnBhcnNlKHRoaXMucGFyQWdTdHJpbmcpO1xyXG5cclxuXHJcbiAgICAgLyogIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLW1lbnVzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLnBhckFnU3RyU2VwZXJhdGUpK1wiLS0tLS0tLS0tLS0tLS0tLS0tXCIrdGhpcy5wYXJBZ1N0clNlcGVyYXRlLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1tZW51cy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tbWVudXNpdGVtcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5wYXJBZ1N0clNlcGVyYXRlWzBdLmZvb2RpdGVtX3RvX21lbnVfRmspK1wiLS0tLS0tLS0tLS0tLS0tLS0tXCIrdGhpcy5wYXJBZ1N0clNlcGVyYXRlWzBdLmZvb2RpdGVtX3RvX21lbnVfRmsubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLW1lbnVzaXRlbXMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTsqL1xyXG5cclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5wYXJBZ1N0clNlcGVyYXRlLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb29kU3RyID0gSlNPTi5zdHJpbmdpZnkodGhpcy5wYXJBZ1N0clNlcGVyYXRlW2ldLmZvb2RpdGVtX3RvX21lbnVfRmspO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb29kU3RyUGFyID0gSlNPTi5wYXJzZShmb29kU3RyKTtcclxuICAgICAgICAgICAgICAgICAgICAgbGV0IG1lbnVpdGVtczppdGVtZGV0YWlsW10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbV9uYW1lPXRoaXMucGFyQWdTdHJTZXBlcmF0ZVtpXS5tZW51X3R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICBsZXQgbV9pZD10aGlzLnBhckFnU3RyU2VwZXJhdGVbaV0ubWVudV9pZDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8dGhpcy5wYXJBZ1N0clNlcGVyYXRlW2ldLmZvb2RpdGVtX3RvX21lbnVfRmsubGVuZ3RoO2orKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gbmV3IGl0ZW1kZXRhaWwoZm9vZFN0clBhcltqXS5pdGVtX2lkLGZvb2RTdHJQYXJbal0uaXRlbV9uYW1lLGZvb2RTdHJQYXJbal0uaXRlbV90eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9vZFN0clBhcltqXS5pdGVtX3ByaWNlLGZvb2RTdHJQYXJbal0uaXRlbV9kZXRhaWwsZm9vZFN0clBhcltqXS5pdGVtX3RpbWUsZm9vZFN0clBhcltqXS5jb29raW5nX3RpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb29kU3RyUGFyW2pdLm1lbnVfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtZGV0YWlscy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudWl0ZW1zLnB1c2goaXRlbSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51bGlzdGhlaWdodD10aGlzLm1lbnVsaXN0aGVpZ2h0KyhtZW51aXRlbXMubGVuZ3RoKjgwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudXNbaV09bmV3IG1lbnVkZXRhaWwobV9pZCxtX25hbWUsbWVudWl0ZW1zLG1lbnVpdGVtcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMubWVudXMucHVzaChtX2lkLG1fbmFtZSxtZW51aXRlbXMpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWZpbmFsMTExMS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51bGlzdGhlaWdodD10aGlzLm1lbnVsaXN0aGVpZ2h0Kyh0aGlzLm1lbnVzLmxlbmd0aCo1MClcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5tZW51bGlzdGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgIC8vIHRoaXMubWVudWxpc3RoZWlnaHQ9dGhpcy5tZW51cy5sZW5ndGgqNTA7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1maW5hbC0xMTExMS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucGFyQWdTdHJTZXBlcmF0ZS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wYXJBZ1N0clNlcGVyYXRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvb2RTdHIgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnBhckFnU3RyU2VwZXJhdGVbaV0uZm9vZGl0ZW1fdG9fbWVudV9Gayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvb2RTdHJQYXIgPSBKU09OLnBhcnNlKGZvb2RTdHIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkFSUkFZIG5hbWUgOlwiK2Zvb2RTdHJQYXIubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZm9vZFN0clBhci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhqK1wialwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gbmV3IGl0ZW1kZXRhaWwoZm9vZFN0clBhcltqXS5pdGVtX2lkLGZvb2RTdHJQYXJbal0uaXRlbV9uYW1lLGZvb2RTdHJQYXJbal0uaXRlbV90eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9vZFN0clBhcltqXS5pdGVtX3ByaWNlLGZvb2RTdHJQYXJbal0uaXRlbV9kZXRhaWwsZm9vZFN0clBhcltqXS5pdGVtX3RpbWUsZm9vZFN0clBhcltqXS5jb29raW5nX3RpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb29kU3RyUGFyW2pdLm1lbnVfaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtZGV0YWlscy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInd3d3d3d3d3d3d3XCIrdGhpcy5pdGVtZGV0YWlsc1tqXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfSovXHJcblxyXG4gICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYSA9IDA7IGEgPCB0aGlzLml0ZW1kZXRhaWxzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYiA9IDA7IGIgPCBhZGRUb0NhcnRTZXJ2aWNlLnVzZXJfY2FydC5sZW5ndGg7IGIrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLml0ZW1kZXRhaWxzW2FdLmlkPT1hZGRUb0NhcnRTZXJ2aWNlLnVzZXJfY2FydFtiXS5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtZGV0YWlsc1thXS5xdWFudGl0eSs9YWRkVG9DYXJ0U2VydmljZS51c2VyX2NhcnRbYl0ucXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZF90b19jYXJ0Kz10aGlzLml0ZW1kZXRhaWxzW2FdLnF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJ0X2NhbCs9dGhpcy5pdGVtZGV0YWlsc1thXS5xdWFudGl0eSp0aGlzLml0ZW1kZXRhaWxzW2FdLnByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvclwiKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbmRldGFpbEl0ZW1UYXAoYXJncyxtZW51aW5kZXgpIHtcclxuXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubWVudXNbbWVudWluZGV4XS5tZW51X2l0ZW1zW2FyZ3MuaW5kZXhdLnByaWNlKTtcclxuXHJcbiAgICAgICAgICB0aGlzLmFkZF90b19jYXJ0Kys7XHJcbiAgICAgICAgICB0aGlzLmNhcnRfY2FsICs9TnVtYmVyLnBhcnNlSW50KHRoaXMubWVudXNbbWVudWluZGV4XS5tZW51X2l0ZW1zW2FyZ3MuaW5kZXhdLnByaWNlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIHRoaXMubWVudXNbbWVudWluZGV4XS5tZW51X2l0ZW1zW2FyZ3MuaW5kZXhdLnF1YW50aXR5PXRoaXMubWVudXNbbWVudWluZGV4XS5tZW51X2l0ZW1zW2FyZ3MuaW5kZXhdLnF1YW50aXR5KzE7XHJcbiAgICAgICAgICAgIHRoaXMub2JqPXRoaXMubWVudXNbbWVudWluZGV4XS5tZW51X2l0ZW1zW2FyZ3MuaW5kZXhdO1xyXG4gICAgICAgICAgdGhpcy5wb3N0X2NhcnRfZGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uX2FkZF9jYXJ0X3RhcCgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvYWRkLXRvLWNhcnQtZGV0YWlsXCJdKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhSZXN0YXVyYW50U2VydmljZS5hZGRfdG9fY2FydF9pdGVtcyk7XHJcbiAgICB9XHJcbiAgICBwb3N0X2NhcnRfZGF0YSgpIHtcclxuICAgICAgICB0aGlzLnJlc3REZXRhaWxTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5wb3N0X3RvX2NhcnQoe2RldmljZV9pZDp0aGlzLmRldmljZUluZm9ybWF0aW9uLnV1aWQsIGl0ZW1faWQ6IHRoaXMub2JqLmlkLCBpdGVtX25hbWU6dGhpcy5vYmoubmFtZSwgaXRlbV90eXBlOnRoaXMub2JqLnR5cGVcclxuICAgICAgICAgICAgICAgICxpdGVtX3ByaWNlOnRoaXMub2JqLnByaWNlLCBpdGVtX2RldGFpbDp0aGlzLm9iai5kZXRhaWwsIGl0ZW1fdGltZTp0aGlzLm9iai50aW1lLCBjb29raW5nX3RpbWU6dGhpcy5vYmouY29va2luZ190aW1lLFxyXG4gICAgICAgICAgICAgICAgbWVudV9pZDp0aGlzLm9iai5tZW51SUQgICB9KVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNcIitKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoXCJlcnJvclwiK2Vycm9yKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfY2FydChpZCkge1xyXG5cclxuICAgICAgICB0aGlzLkNhcnRTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5nZXRfRnJvbV9DYXJ0KGlkKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBzdHJpbmdfcmVzcG9uc2UgPSBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlbHBlciA9IEpTT04ucGFyc2Uoc3RyaW5nX3Jlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVscGVyLl9ib2R5LmNhcnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hlY2s9MDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IG5ldyBpdGVtZGV0YWlsKGhlbHBlci5fYm9keS5jYXJ0W2ldLml0ZW1faWQsaGVscGVyLl9ib2R5LmNhcnRbaV0uaXRlbV9uYW1lLGhlbHBlci5fYm9keS5jYXJ0W2ldLml0ZW1fdHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyLl9ib2R5LmNhcnRbaV0uaXRlbV9wcmljZSxoZWxwZXIuX2JvZHkuY2FydFtpXS5pdGVtX2RldGFpbCxoZWxwZXIuX2JvZHkuY2FydFtpXS5pdGVtX3RpbWUsaGVscGVyLl9ib2R5LmNhcnRbaV0uY29va2luZ190aW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXIuX2JvZHkuY2FydFtpXS5tZW51X2lkKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnF1YW50aXR5PTE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jYXJ0SXRlbXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jYXJ0SXRlbXNbal0uaWQ9PWhlbHBlci5fYm9keS5jYXJ0W2ldLml0ZW1faWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FydEl0ZW1zW2pdLnF1YW50aXR5ICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjaz0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihjaGVjaz09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FydEl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYXNzaWduVG9DYXJ0KCk7XHJcblxyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXNzaWduVG9DYXJ0KCkge1xyXG4gICAgICAgIGxldCBsZW49YWRkVG9DYXJ0U2VydmljZS51c2VyX2NhcnQubGVuZ3RoO1xyXG4gICAgICAgIGFkZFRvQ2FydFNlcnZpY2UudXNlcl9jYXJ0LnNwbGljZSgwLGxlbilcclxuICAgICAgICBmb3IgKGxldCBsID0gMDsgbCA8IHRoaXMuY2FydEl0ZW1zLmxlbmd0aDsgbCsrKSB7XHJcbiAgICAgICAgICAgIGFkZFRvQ2FydFNlcnZpY2UudXNlcl9jYXJ0LnB1c2godGhpcy5jYXJ0SXRlbXNbbF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG5vV2hlcmUoKXtcclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcmVzdGF1cmFudHNcIl0sIHtcclxuICAgICAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImZsaXBcIixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA1MDAsXHJcbiAgICAgICAgICAgICAgICBjdXJ2ZTogXCJsaW5lYXJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59XHJcblxyXG4iXX0=