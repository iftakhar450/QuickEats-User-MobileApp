"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var restaurants_service_1 = require("./restaurants.service");
var router_1 = require("@angular/router");
var map_service_1 = require("../maps/map.service");
var page_1 = require("ui/page");
var core_2 = require("@angular/core");
var resturants_1 = require("./resturants");
var deliveryaddress_1 = require("../deliveryaddresses/deliveryaddress");
var deliveryaddress_service_1 = require("../deliveryaddresses/deliveryaddress.service");
var nativescript_geolocation_1 = require("nativescript-geolocation");
var application_settings_1 = require("tns-core-modules/application-settings");
var dialog = require("nativescript-dialog");
var firebase = require("nativescript-plugin-firebase");
var restaurantsComponent = /** @class */ (function () {
    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.
    function restaurantsComponent(restaurantService, router, _changeDetectionRef, page, mapservice, deliveraddressservice) {
        this.restaurantService = restaurantService;
        this.router = router;
        this._changeDetectionRef = _changeDetectionRef;
        this.page = page;
        this.mapservice = mapservice;
        this.deliveraddressservice = deliveraddressservice;
        this.allrestaurants = [];
        this.allrestaurantslength = 1;
        this.restaurants = new Array();
        this.user_loc = [];
        this._mainContentText = "bsfnb hdv  hfhmnsb ihdvj";
        this.Current_location = "Loding..";
        this.message = "";
        this.isBusy = true;
    }
    restaurantsComponent.prototype.configure = function (timePicker) {
        timePicker.hour = 9;
        timePicker.minute = 25;
    };
    restaurantsComponent.prototype.ngOnInit = function () {
        this.allrestaurantslength = 1;
        this.isBusy = false;
        application_settings_1.setString("deliver_to_user", "ASAP");
        this.Current_location = "Loading..";
        this.isBusy = true;
        this.getCurrentlocationofuser();
        if (typeof (application_settings_1.getString("user_id")) !== 'undefined') {
            var id = JSON.parse(application_settings_1.getString("user_id"));
            this.getuserlocations();
        }
        var user_token = application_settings_1.getString("access_token");
        if (user_token.length > 2) {
            this.getfirebasetoken();
        }
    };
    ////get firebase token
    restaurantsComponent.prototype.getfirebasetoken = function () {
        var _this = this;
        console.log("called...");
        firebase.init({}).then(function (instance) {
            console.log("firebase.init done");
        }, function (error) {
            console.log("firebase.init error: " + error);
        });
        firebase.getCurrentPushToken().then(function (token) {
            // may be null if not known yet
            console.log("Current push token: " + token);
            _this.restaurantService.update_firebase_token({ "firebase_token": token })
                .subscribe(function (result) {
                console.log("firebase token........." + JSON.stringify(result));
            }, function (error) {
                // this.onGetDataError(error);
                console.log(JSON.stringify(error));
            });
        });
        firebase.addOnMessageReceivedCallback(function (message) {
            alert(message.body);
        });
    };
    restaurantsComponent.prototype.getCurrentlocationofuser = function () {
        var that = this;
        var marker1;
        var your_current_loc;
        var apikeyforloc = "AIzaSyDyamBO1Heo8nwXfy5vwk6QrnTt--mSCVM"; //this key privided by google on enabling tha geocoding api
        var location = nativescript_geolocation_1.getCurrentLocation({
            desiredAccuracy: 3,
            updateDistance: 10,
            maximumAge: 20000,
            timeout: 20000
        }).then(function (loc) {
            if (loc) {
                console.log("Cu lat/long: " + loc.latitude, loc.longitude);
                that.restaurantService.getaddress_from_api(loc.latitude, loc.longitude)
                    .subscribe(function (result) {
                    var helper = JSON.parse(JSON.stringify(result));
                    console.log("cc1" + JSON.stringify(helper._body.address));
                    that.Current_location = helper._body.address;
                    //  alert(helper._body.address+"     "+helper._body.postalCode);
                    application_settings_1.setString("user_address", helper._body.address);
                    application_settings_1.setString("user_pc", helper._body.postalCode);
                    that.getRestaurantListFromApi(loc.latitude, loc.longitude);
                }, function (error) {
                    console.log("Error in location" + JSON.stringify(error));
                });
            }
        }, function (e) {
            console.log("Error: " + e.message);
        });
    };
    restaurantsComponent.prototype.getuserlocations = function () {
        var _this = this;
        var id = JSON.parse(application_settings_1.getString("user_id"));
        this.deliveraddressservice.get_user_locations_from_api(id)
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
    restaurantsComponent.prototype.onsucces = function (data) {
        // alert("called");
        var that = this;
        for (var i = 0; i < data._body.userLocations.length; i++) {
            var item = new deliveryaddress_1.locations(data._body.userLocations[i].user_address, data._body.userLocations[i].user_postal_code);
            that.user_loc.push(item);
            //console.log("called");
            console.log("call" + that.user_loc[i]);
        }
    };
    restaurantsComponent.prototype.setTime = function () {
        var timePicker = this.tp.nativeElement;
        timePicker.hour = 5;
        timePicker.minute = 21;
    };
    restaurantsComponent.prototype.ngAfterViewInit = function () {
        this._changeDetectionRef.detectChanges();
    };
    restaurantsComponent.prototype.getRestaurantListFromApi = function (lat, lan) {
        var _this = this;
        this.isBusy = true;
        console.log("from component" + lat + "   " + lan);
        //{lat: 51.517899, lan: -0.124439}
        this.restaurantService
            .getRestaurants({ lat: lat, lan: lan })
            .subscribe(function (res) {
            _this.message = res;
            console.log("--------------------------------------------------------------------------------------------------");
            console.log("responce " + JSON.stringify(res));
            console.log("--------------------------------------------------------------------------------------------------");
            _this.allrestaurantslength = 1;
            _this.showrestaurants(res);
        }, function (error) {
            console.log("error" + JSON.stringify(error));
            _this.allrestaurantslength = 0;
            _this.isBusy = false;
            _this.no_restaurant_found = error._body.message;
        });
    };
    restaurantsComponent.prototype.showrestaurants = function (res) {
        this.allrestaurants = new Array();
        this.strigy = JSON.stringify(res);
        this.seperate = JSON.parse(this.strigy);
        for (var i = 0; i < this.seperate._body.restRangeList.length; i++) {
            var menutype = [];
            for (var j = 0; j < this.seperate._body.menus.length; j++) {
                if (this.seperate._body.menus[j].restaurant_id == this.seperate._body.restRangeList[i].restaurant_id) {
                    console.log(this.seperate._body.menus[j].restaurant_id);
                    console.log(this.seperate._body.restRangeList[i].restaurant_id);
                    menutype.push(this.seperate._body.menus[j].menu_type);
                    console.log(menutype);
                }
            }
            var restArr = this.seperate._body.restRangeList[i];
            var rest = new resturants_1.Restaurant(restArr.restaurant_id, restArr.restaurant_name, restArr.restaurant_address, restArr.restaurant_contect, restArr.restaurant_image_url, restArr.restaurant_delievery_time, restArr.restaurant_postal_code, restArr.restaurant_phone_no, restArr.restaurant_email, restArr.restaurant_password, restArr.restaurant_username, menutype);
            this.allrestaurants[i] = rest;
            this.restaurantService.restaurants[i] = rest;
        }
        this.isBusy = false;
    };
    Object.defineProperty(restaurantsComponent.prototype, "mainContentText", {
        /////for side drawer
        get: function () {
            return this._mainContentText;
        },
        set: function (value) {
            this._mainContentText = value;
        },
        enumerable: true,
        configurable: true
    });
    restaurantsComponent.prototype.onItemTap = function (args) {
        this.allrestaurants[args.index].id;
        console.log("------------------------ ItemTapped: " + args.index + "  " + this.allrestaurants[args.index].id);
        this.router.navigate(["/restaurants-detail", this.allrestaurants[args.index].id]);
    };
    restaurantsComponent.prototype.selectdeliverlocation = function () {
        console.log("tapped");
        var token = application_settings_1.getString("access_token");
        if (token != "") {
            var layout = this.page.getViewById("locationpicker");
            var llayout = this.page.getViewById("timepicker");
            if (layout.visibility == "collapse") {
                layout.visibility = "visible";
                llayout.visibility = "collapse";
            }
            else {
                layout.visibility = "collapse";
            }
        }
        else {
            var that_1 = this;
            dialog.show({
                title: "Attention",
                message: "Please login first to add location!",
                cancelButtonText: "Cancel",
                okButtonText: "Login"
            }).then(function (r) {
                console.log("Result: " + r);
                if (r == true) {
                    // phone.dial(abc,false);
                    that_1.router.navigate(["/login"]);
                }
            });
        }
    };
    restaurantsComponent.prototype.selectdelivertime = function () {
        var layout = this.page.getViewById("timepicker");
        var llayout = this.page.getViewById("locationpicker");
        if (layout.visibility == "collapse") {
            layout.visibility = "visible";
            llayout.visibility = "collapse";
        }
        else {
            layout.visibility = "collapse";
        }
    };
    restaurantsComponent.prototype.onPickerLoaded = function (args) {
        var timePicker = args.object;
        this.select_hour = timePicker.hour;
        this.select_mint = timePicker.minute;
        timePicker.hour = 9;
        timePicker.minute = 25;
    };
    restaurantsComponent.prototype.ontapsetdeliverytime = function () {
        var timePicker = this.tp.nativeElement;
        var lable = this.page.getViewById("deliverytime");
        lable.text = "Today " + timePicker.hour + ":" + timePicker.minute;
        var layout = this.page.getViewById("timepicker");
        layout.visibility = "collapse";
        // alert(lable.text);
        application_settings_1.setString("deliver_to_user", lable.text);
    };
    restaurantsComponent.prototype.onTapTomorrowSet = function () {
        var timePicker2 = this.tp2.nativeElement;
        var lable = this.page.getViewById("deliverytime");
        lable.text = "Tomorrow " + timePicker2.hour + ":" + timePicker2.minute;
        var layout = this.page.getViewById("timepicker");
        layout.visibility = "collapse";
        // alert(lable.text);
        application_settings_1.setString("deliver_to_user", lable.text);
    };
    restaurantsComponent.prototype.onempty = function () {
    };
    restaurantsComponent.prototype.onSearchRestaurants = function () {
        var sbar = this.page.getViewById("searchbar");
        sbar.visibility = "visible";
        var simage = this.page.getViewById("simage");
        simage.visibility = "collapse";
        this.allrestaurantslength = 1;
    };
    restaurantsComponent.prototype.onSearchTextChanged = function (args) {
        var _this = this;
        var searchBar = args.object;
        var postalCode = searchBar.text;
        this.isBusy = true;
        this.allrestaurants = null;
        this.restaurantService.searchRestaurantsfromapi(postalCode)
            .subscribe(function (result) {
            var helper = JSON.stringify(result);
            var data = JSON.parse(helper);
            console.log("data" + JSON.stringify(data.status));
            _this.allrestaurantslength = 1;
            _this.showrestaurants(data);
        }, function (error) {
            // this.onGetDataError(error);
            _this.isBusy = false;
            _this.allrestaurantslength = 0;
            // alert(JSON.stringify(error._body.message));
        });
        console.log("textchange" + searchBar.text);
    };
    restaurantsComponent.prototype.onSubmit = function (args) {
        var _this = this;
        var searchBar = args.object;
        console.log("submit" + searchBar.text);
        var sbar = this.page.getViewById("searchbar");
        sbar.visibility = "collapse";
        var simage = this.page.getViewById("simage");
        simage.visibility = "visible";
        var postalCode = searchBar.text;
        this.isBusy = true;
        this.allrestaurants = null;
        this.restaurantService.searchRestaurantsfromapi(postalCode)
            .subscribe(function (result) {
            var helper = JSON.stringify(result);
            var data = JSON.parse(helper);
            console.log("data" + JSON.stringify(data.status));
            _this.showrestaurants(data);
        }, function (error) {
            _this.isBusy = false;
        });
    };
    restaurantsComponent.prototype.onClear = function (args) {
        var sbar = this.page.getViewById("searchbar");
        sbar.visibility = "collapse";
        var simage = this.page.getViewById("simage");
        simage.visibility = "visible";
    };
    __decorate([
        core_1.ViewChild("timePicker"),
        __metadata("design:type", core_2.ElementRef)
    ], restaurantsComponent.prototype, "tp", void 0);
    __decorate([
        core_1.ViewChild("timePicker2"),
        __metadata("design:type", core_2.ElementRef)
    ], restaurantsComponent.prototype, "tp2", void 0);
    restaurantsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./restaurants.component.html",
            styleUrls: ['./restaurants.css']
        }),
        __metadata("design:paramtypes", [restaurants_service_1.RestaurantService, router_1.Router, core_1.ChangeDetectorRef,
            page_1.Page, map_service_1.mapService, deliveryaddress_service_1.DeliverAddressService])
    ], restaurantsComponent);
    return restaurantsComponent;
}());
exports.restaurantsComponent = restaurantsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGF1cmFudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzdGF1cmFudHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZGO0FBRTdGLDZEQUF3RDtBQUN4RCwwQ0FBdUM7QUFNdkMsbURBQThDO0FBRTlDLGdDQUE2QjtBQUk3QixzQ0FBeUM7QUFJekMsMkNBQXVDO0FBQ3ZDLHdFQUErRDtBQUMvRCx3RkFBbUY7QUFDbkYscUVBQTREO0FBQzVELDhFQUEyRTtBQUczRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUM1QyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQVF6RDtJQWtCSSw0SUFBNEk7SUFDNUksaUhBQWlIO0lBQ2pILDhCQUFvQixpQkFBb0MsRUFBVSxNQUFjLEVBQVUsbUJBQXNDLEVBQzVHLElBQVUsRUFBVSxVQUFzQixFQUFVLHFCQUE0QztRQURoRyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFDNUcsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBaEI3RyxtQkFBYyxHQUFpQixFQUFFLENBQUM7UUFDbEMseUJBQW9CLEdBQUssQ0FBQyxDQUFDO1FBQ2xDLGdCQUFXLEdBQXNCLElBQUksS0FBSyxFQUFjLENBQUM7UUFFbEQsYUFBUSxHQUFnQixFQUFFLENBQUM7UUFFMUIscUJBQWdCLEdBQVcsMEJBQTBCLENBQUM7UUFDdkQscUJBQWdCLEdBQVcsVUFBVSxDQUFDO1FBR3RDLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsV0FBTSxHQUFHLElBQUksQ0FBQztJQVFyQixDQUFDO0lBS0Qsd0NBQVMsR0FB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QUFBLEFBN2FELElBNmFDO0FBN2FZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBWaWV3Q2hpbGQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIEltYWdlTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCI7XHJcbmltcG9ydCB7UmVzdGF1cmFudFNlcnZpY2V9IGZyb20gXCIuL3Jlc3RhdXJhbnRzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuLy8gaW1wb3J0IHtOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGV9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0ICogYXMgZ2VvbG9jYXRpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xyXG5pbXBvcnQgKiBhcyB0aW1lUGlja2VyTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RpbWUtcGlja2VyXCI7XHJcbmltcG9ydCB7bWFwc0NvbXBvbmVudH0gZnJvbSBcIi4uL21hcHMvbWFwcy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHttYXBTZXJ2aWNlfSBmcm9tIFwiLi4vbWFwcy9tYXAuc2VydmljZVwiXHJcbmltcG9ydCB7TGFiZWx9IGZyb20gXCJ1aS9sYWJlbFwiO1xyXG5pbXBvcnQge1BhZ2V9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7QWJzb2x1dGVMYXlvdXR9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvYWJzb2x1dGUtbGF5b3V0XCI7XHJcbmltcG9ydCB7U3RhY2tMYXlvdXR9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XHJcbmltcG9ydCB7VGltZVBpY2tlcn0gZnJvbSBcInVpL3RpbWUtcGlja2VyXCI7XHJcbmltcG9ydCB7RWxlbWVudFJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZW51bXNcIjtcclxuaW1wb3J0IGFueSA9IEFjY3VyYWN5LmFueTtcclxuaW1wb3J0IHtPYnNlcnZhYmxlQXJyYXl9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQge1Jlc3RhdXJhbnR9IGZyb20gXCIuL3Jlc3R1cmFudHNcIlxyXG5pbXBvcnQge2xvY2F0aW9uc30gZnJvbSBcIi4uL2RlbGl2ZXJ5YWRkcmVzc2VzL2RlbGl2ZXJ5YWRkcmVzc1wiO1xyXG5pbXBvcnQge0RlbGl2ZXJBZGRyZXNzU2VydmljZX0gZnJvbSBcIi4uL2RlbGl2ZXJ5YWRkcmVzc2VzL2RlbGl2ZXJ5YWRkcmVzcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7Z2V0Q3VycmVudExvY2F0aW9ufSBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XHJcbmltcG9ydCB7Z2V0U3RyaW5nLCBzZXRTdHJpbmd9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7U2VhcmNoQmFyfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWFyY2gtYmFyXCI7XHJcbmltcG9ydCB7SW1hZ2V9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCI7XHJcbnZhciBkaWFsb2cgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWRpYWxvZ1wiKTtcclxuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcmVzdGF1cmFudHMuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL3Jlc3RhdXJhbnRzLmNzcyddXHJcblxyXG59KVxyXG5leHBvcnQgY2xhc3MgcmVzdGF1cmFudHNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQge1xyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RfaG91cjogYW55O1xyXG4gICAgcHVibGljIHNlbGVjdF9taW50OiBhbnk7XHJcbiAgICBwdWJsaWMgIG5vX3Jlc3RhdXJhbnRfZm91bmQ6YW55O1xyXG4gICAgcHVibGljIGFsbHJlc3RhdXJhbnRzOiBSZXN0YXVyYW50W10gPSBbXTtcclxuICAgIHB1YmxpYyBhbGxyZXN0YXVyYW50c2xlbmd0aDphbnk9MTtcclxuICAgIHJlc3RhdXJhbnRzOiBBcnJheTxSZXN0YXVyYW50PiA9IG5ldyBBcnJheTxSZXN0YXVyYW50PigpO1xyXG4gICAgZGF0YTogc3RyaW5nO1xyXG4gICAgcHVibGljIHVzZXJfbG9jOiBsb2NhdGlvbnNbXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgX21haW5Db250ZW50VGV4dDogc3RyaW5nID0gXCJic2ZuYiBoZHYgIGhmaG1uc2IgaWhkdmpcIjtcclxuICAgIHB1YmxpYyBDdXJyZW50X2xvY2F0aW9uOiBzdHJpbmcgPSBcIkxvZGluZy4uXCI7XHJcbiAgICBwdWJsaWMgdXNlcjogc3RyaW5nO1xyXG4gICAgcHVibGljIHBhc3M6IHN0cmluZztcclxuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIGlzQnVzeSA9IHRydWU7XHJcbiAgICBwdWJsaWMgbG9jOiBzdHJpbmc7XHJcbiAgICAvLyBUaGlzIHBhdHRlcm4gbWFrZXMgdXNlIG9mIEFuZ3VsYXLvv71zIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGltcGxlbWVudGF0aW9uIHRvIGluamVjdCBhbiBpbnN0YW5jZSBvZiB0aGUgSXRlbVNlcnZpY2Ugc2VydmljZSBpbnRvIHRoaXMgY2xhc3MuXHJcbiAgICAvLyBBbmd1bGFyIGtub3dzIGFib3V0IHRoaXMgc2VydmljZSBiZWNhdXNlIGl0IGlzIGluY2x1ZGVkIGluIHlvdXIgYXBw77+9cyBtYWluIE5nTW9kdWxlLCBkZWZpbmVkIGluIGFwcC5tb2R1bGUudHMuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlc3RhdXJhbnRTZXJ2aWNlOiBSZXN0YXVyYW50U2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBtYXBzZXJ2aWNlOiBtYXBTZXJ2aWNlLCBwcml2YXRlIGRlbGl2ZXJhZGRyZXNzc2VydmljZTogRGVsaXZlckFkZHJlc3NTZXJ2aWNlKSB7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBAVmlld0NoaWxkKFwidGltZVBpY2tlclwiKSB0cDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJ0aW1lUGlja2VyMlwiKSB0cDI6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgY29uZmlndXJlKHRpbWVQaWNrZXI6IFRpbWVQaWNrZXIpIHtcclxuICAgICAgICB0aW1lUGlja2VyLmhvdXIgPSA5O1xyXG4gICAgICAgIHRpbWVQaWNrZXIubWludXRlID0gMjU7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hbGxyZXN0YXVyYW50c2xlbmd0aD0xO1xyXG4gICAgICAgIHRoaXMuaXNCdXN5PWZhbHNlO1xyXG4gICAgICAgIHNldFN0cmluZyhcImRlbGl2ZXJfdG9fdXNlclwiLFwiQVNBUFwiKTtcclxuICAgICAgICB0aGlzLkN1cnJlbnRfbG9jYXRpb24gPSBcIkxvYWRpbmcuLlwiO1xyXG4gICAgICAgICAgICB0aGlzLmlzQnVzeT10cnVlO1xyXG4gICAgICAgIHRoaXMuZ2V0Q3VycmVudGxvY2F0aW9ub2Z1c2VyKCk7XHJcbiAgICAgICAgaWYodHlwZW9mKGdldFN0cmluZyhcInVzZXJfaWRcIikpIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IEpTT04ucGFyc2UoZ2V0U3RyaW5nKFwidXNlcl9pZFwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0dXNlcmxvY2F0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdXNlcl90b2tlbj1nZXRTdHJpbmcoXCJhY2Nlc3NfdG9rZW5cIik7XHJcbiAgICAgICAgaWYodXNlcl90b2tlbi5sZW5ndGg+Mil7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdldGZpcmViYXNldG9rZW4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgLy8vL2dldCBmaXJlYmFzZSB0b2tlblxyXG4gICAgZ2V0ZmlyZWJhc2V0b2tlbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2FsbGVkLi4uXCIpO1xyXG4gICAgICAgIGZpcmViYXNlLmluaXQoe1xyXG5cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICBpbnN0YW5jZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpcmViYXNlLmluaXQgZG9uZVwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGZpcmViYXNlLmluaXQgZXJyb3I6ICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50UHVzaFRva2VuKCkudGhlbigodG9rZW46IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAvLyBtYXkgYmUgbnVsbCBpZiBub3Qga25vd24geWV0XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBwdXNoIHRva2VuOiBcIiArIHRva2VuKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVzdGF1cmFudFNlcnZpY2UudXBkYXRlX2ZpcmViYXNlX3Rva2VuKHtcImZpcmViYXNlX3Rva2VuXCI6dG9rZW59KVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaXJlYmFzZSB0b2tlbi4uLi4uLi4uLlwiK0pTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZmlyZWJhc2UuYWRkT25NZXNzYWdlUmVjZWl2ZWRDYWxsYmFjayhcclxuICAgICAgICAgICAgZnVuY3Rpb24obWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICBhbGVydChtZXNzYWdlLmJvZHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q3VycmVudGxvY2F0aW9ub2Z1c2VyKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBsZXQgbWFya2VyMTtcclxuICAgICAgICBsZXQgeW91cl9jdXJyZW50X2xvYztcclxuICAgICAgICBsZXQgYXBpa2V5Zm9ybG9jOiBzdHJpbmcgPSBcIkFJemFTeUR5YW1CTzFIZW84bndYZnk1dndrNlFyblR0LS1tU0NWTVwiOyAgLy90aGlzIGtleSBwcml2aWRlZCBieSBnb29nbGUgb24gZW5hYmxpbmcgdGhhIGdlb2NvZGluZyBhcGlcclxuICAgICAgICB2YXIgbG9jYXRpb24gPSBnZXRDdXJyZW50TG9jYXRpb24oe1xyXG4gICAgICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IDMsXHJcbiAgICAgICAgICAgIHVwZGF0ZURpc3RhbmNlOiAxMCxcclxuICAgICAgICAgICAgbWF4aW11bUFnZTogMjAwMDAsXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IDIwMDAwXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAobG9jKSB7XHJcbiAgICAgICAgICAgIGlmIChsb2MpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ3UgbGF0L2xvbmc6IFwiICsgbG9jLmxhdGl0dWRlLCBsb2MubG9uZ2l0dWRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnJlc3RhdXJhbnRTZXJ2aWNlLmdldGFkZHJlc3NfZnJvbV9hcGkobG9jLmxhdGl0dWRlLCBsb2MubG9uZ2l0dWRlKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVscGVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYzFcIiArIEpTT04uc3RyaW5naWZ5KGhlbHBlci5fYm9keS5hZGRyZXNzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuQ3VycmVudF9sb2NhdGlvbiA9IGhlbHBlci5fYm9keS5hZGRyZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gIGFsZXJ0KGhlbHBlci5fYm9keS5hZGRyZXNzK1wiICAgICBcIitoZWxwZXIuX2JvZHkucG9zdGFsQ29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFN0cmluZyhcInVzZXJfYWRkcmVzc1wiLGhlbHBlci5fYm9keS5hZGRyZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U3RyaW5nKFwidXNlcl9wY1wiLGhlbHBlci5fYm9keS5wb3N0YWxDb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nZXRSZXN0YXVyYW50TGlzdEZyb21BcGkobG9jLmxhdGl0dWRlLGxvYy5sb25naXR1ZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBsb2NhdGlvblwiICsgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGUubWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0dXNlcmxvY2F0aW9ucygpIHtcclxuICAgICAgICBsZXQgaWQgPSBKU09OLnBhcnNlKGdldFN0cmluZyhcInVzZXJfaWRcIikpO1xyXG4gICAgICAgIHRoaXMuZGVsaXZlcmFkZHJlc3NzZXJ2aWNlLmdldF91c2VyX2xvY2F0aW9uc19mcm9tX2FwaShpZClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlbHBlciA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoaGVscGVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25zdWNjZXMoZGF0YSk7XHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25zdWNjZXMoZGF0YSkge1xyXG4gICAgICAgIC8vIGFsZXJ0KFwiY2FsbGVkXCIpO1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuX2JvZHkudXNlckxvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IG5ldyBsb2NhdGlvbnMoZGF0YS5fYm9keS51c2VyTG9jYXRpb25zW2ldLnVzZXJfYWRkcmVzcywgZGF0YS5fYm9keS51c2VyTG9jYXRpb25zW2ldLnVzZXJfcG9zdGFsX2NvZGUpO1xyXG4gICAgICAgICAgICB0aGF0LnVzZXJfbG9jLnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2FsbGVkXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbGxcIiArIHRoYXQudXNlcl9sb2NbaV0pO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lKCkge1xyXG4gICAgICAgIGxldCB0aW1lUGlja2VyOiBUaW1lUGlja2VyID0gPFRpbWVQaWNrZXI+dGhpcy50cC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIHRpbWVQaWNrZXIuaG91ciA9IDU7XHJcbiAgICAgICAgdGltZVBpY2tlci5taW51dGUgPSAyMTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0cmlneTogYW55O1xyXG4gICAgc2VwZXJhdGU6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIGdldFJlc3RhdXJhbnRMaXN0RnJvbUFwaShsYXQsbGFuKSB7XHJcblxyXG4gICAgICAgIHRoaXMuaXNCdXN5PXRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJmcm9tIGNvbXBvbmVudFwiK2xhdCtcIiAgIFwiK2xhbik7XHJcbiAgICAgICAgLy97bGF0OiA1MS41MTc4OTksIGxhbjogLTAuMTI0NDM5fVxyXG4gICAgICAgIHRoaXMucmVzdGF1cmFudFNlcnZpY2VcclxuICAgICAgICAgICAgLmdldFJlc3RhdXJhbnRzKHtsYXQsbGFufSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gKDxhbnk+cmVzKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3BvbmNlIFwiK0pTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxscmVzdGF1cmFudHNsZW5ndGg9MTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd3Jlc3RhdXJhbnRzKHJlcylcclxuXHJcbiAgICAgICAgICAgIH0sKGVycm9yKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvclwiK0pTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbHJlc3RhdXJhbnRzbGVuZ3RoPTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9fcmVzdGF1cmFudF9mb3VuZD1lcnJvci5fYm9keS5tZXNzYWdlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzaG93cmVzdGF1cmFudHMocmVzOmFueSl7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmFsbHJlc3RhdXJhbnRzID0gbmV3IEFycmF5PFJlc3RhdXJhbnQ+KCk7XHJcbiAgICAgICAgdGhpcy5zdHJpZ3kgPSBKU09OLnN0cmluZ2lmeShyZXMpO1xyXG4gICAgICAgIHRoaXMuc2VwZXJhdGUgPSBKU09OLnBhcnNlKHRoaXMuc3RyaWd5KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlcGVyYXRlLl9ib2R5LnJlc3RSYW5nZUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1lbnV0eXBlOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnNlcGVyYXRlLl9ib2R5Lm1lbnVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXBlcmF0ZS5fYm9keS5tZW51c1tqXS5yZXN0YXVyYW50X2lkID09IHRoaXMuc2VwZXJhdGUuX2JvZHkucmVzdFJhbmdlTGlzdFtpXS5yZXN0YXVyYW50X2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zZXBlcmF0ZS5fYm9keS5tZW51c1tqXS5yZXN0YXVyYW50X2lkKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNlcGVyYXRlLl9ib2R5LnJlc3RSYW5nZUxpc3RbaV0ucmVzdGF1cmFudF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudXR5cGUucHVzaCh0aGlzLnNlcGVyYXRlLl9ib2R5Lm1lbnVzW2pdLm1lbnVfdHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWVudXR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzdEFyciA9IHRoaXMuc2VwZXJhdGUuX2JvZHkucmVzdFJhbmdlTGlzdFtpXTtcclxuICAgICAgICAgICAgbGV0IHJlc3QgPSBuZXcgUmVzdGF1cmFudChyZXN0QXJyLnJlc3RhdXJhbnRfaWQsIHJlc3RBcnIucmVzdGF1cmFudF9uYW1lLCByZXN0QXJyLnJlc3RhdXJhbnRfYWRkcmVzcywgcmVzdEFyci5yZXN0YXVyYW50X2NvbnRlY3QsXHJcbiAgICAgICAgICAgICAgICByZXN0QXJyLnJlc3RhdXJhbnRfaW1hZ2VfdXJsLCByZXN0QXJyLnJlc3RhdXJhbnRfZGVsaWV2ZXJ5X3RpbWUsIHJlc3RBcnIucmVzdGF1cmFudF9wb3N0YWxfY29kZSwgcmVzdEFyci5yZXN0YXVyYW50X3Bob25lX25vLFxyXG4gICAgICAgICAgICAgICAgcmVzdEFyci5yZXN0YXVyYW50X2VtYWlsLCByZXN0QXJyLnJlc3RhdXJhbnRfcGFzc3dvcmQsIHJlc3RBcnIucmVzdGF1cmFudF91c2VybmFtZSwgbWVudXR5cGUpO1xyXG4gICAgICAgICAgICB0aGlzLmFsbHJlc3RhdXJhbnRzW2ldID0gcmVzdDtcclxuICAgICAgICAgICAgdGhpcy5yZXN0YXVyYW50U2VydmljZS5yZXN0YXVyYW50c1tpXSA9IHJlc3Q7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pc0J1c3k9ZmFsc2U7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vZm9yIHNpZGUgZHJhd2VyXHJcbiAgICBnZXQgbWFpbkNvbnRlbnRUZXh0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYWluQ29udGVudFRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1haW5Db250ZW50VGV4dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fbWFpbkNvbnRlbnRUZXh0ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uSXRlbVRhcChhcmdzKSB7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmFsbHJlc3RhdXJhbnRzW2FyZ3MuaW5kZXhdLmlkO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEl0ZW1UYXBwZWQ6IFwiICsgYXJncy5pbmRleCArIFwiICBcIiArIHRoaXMuYWxscmVzdGF1cmFudHNbYXJncy5pbmRleF0uaWQpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9yZXN0YXVyYW50cy1kZXRhaWxcIiwgdGhpcy5hbGxyZXN0YXVyYW50c1thcmdzLmluZGV4XS5pZF0pO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0ZGVsaXZlcmxvY2F0aW9uKCkge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInRhcHBlZFwiKTtcclxuICAgICAgICBsZXQgdG9rZW49Z2V0U3RyaW5nKFwiYWNjZXNzX3Rva2VuXCIpO1xyXG5cclxuICAgICAgICBpZih0b2tlbiE9XCJcIiApe1xyXG5cclxuICAgICAgICAgICAgbGV0IGxheW91dDogU3RhY2tMYXlvdXQgPSA8U3RhY2tMYXlvdXQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwibG9jYXRpb25waWNrZXJcIik7XHJcbiAgICAgICAgICAgIGxldCBsbGF5b3V0OiBTdGFja0xheW91dCA9IDxTdGFja0xheW91dD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJ0aW1lcGlja2VyXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChsYXlvdXQudmlzaWJpbGl0eSA9PSBcImNvbGxhcHNlXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsYXlvdXQudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG4gICAgICAgICAgICAgICAgbGxheW91dC52aXNpYmlsaXR5PVwiY29sbGFwc2VcIjtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGF5b3V0LnZpc2liaWxpdHkgPSBcImNvbGxhcHNlXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGhhdD10aGlzO1xyXG4gICAgICAgICAgICBkaWFsb2cuc2hvdyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQXR0ZW50aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJQbGVhc2UgbG9naW4gZmlyc3QgdG8gYWRkIGxvY2F0aW9uIVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OlwiTG9naW5cIlxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS50aGVuKGZ1bmN0aW9uKHIpe1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVzdWx0OiBcIiArIHIpO1xyXG4gICAgICAgICAgICAgICAgaWYocj09dHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAvLyBwaG9uZS5kaWFsKGFiYyxmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3V0ZXIubmF2aWdhdGUoW1wiL2xvZ2luXCJdKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0ZGVsaXZlcnRpbWUoKSB7XHJcblxyXG4gICAgICAgIGxldCBsYXlvdXQ6IFN0YWNrTGF5b3V0ID0gPFN0YWNrTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcInRpbWVwaWNrZXJcIik7XHJcbiAgICAgICAgbGV0IGxsYXlvdXQ6IFN0YWNrTGF5b3V0ID0gPFN0YWNrTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImxvY2F0aW9ucGlja2VyXCIpO1xyXG5cclxuICAgICAgICBpZiAobGF5b3V0LnZpc2liaWxpdHkgPT0gXCJjb2xsYXBzZVwiKSB7XHJcblxyXG4gICAgICAgICAgICBsYXlvdXQudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG4gICAgICAgICAgICBsbGF5b3V0LnZpc2liaWxpdHkgPSBcImNvbGxhcHNlXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGxheW91dC52aXNpYmlsaXR5ID0gXCJjb2xsYXBzZVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblBpY2tlckxvYWRlZChhcmdzKSB7XHJcbiAgICAgICAgbGV0IHRpbWVQaWNrZXIgPSA8dGltZVBpY2tlck1vZHVsZS5UaW1lUGlja2VyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0X2hvdXIgPSB0aW1lUGlja2VyLmhvdXI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RfbWludCA9IHRpbWVQaWNrZXIubWludXRlO1xyXG5cclxuXHJcbiAgICAgICAgdGltZVBpY2tlci5ob3VyID0gOTtcclxuICAgICAgICB0aW1lUGlja2VyLm1pbnV0ZSA9IDI1O1xyXG4gICAgfVxyXG5cclxuICAgIG9udGFwc2V0ZGVsaXZlcnl0aW1lKCkge1xyXG5cclxuICAgICAgICBsZXQgdGltZVBpY2tlcjogVGltZVBpY2tlciA9IDxUaW1lUGlja2VyPnRoaXMudHAubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICAgICAgbGV0IGxhYmxlOiBMYWJlbCA9IDxMYWJlbD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJkZWxpdmVyeXRpbWVcIik7XHJcbiAgICAgICAgbGFibGUudGV4dCA9IFwiVG9kYXkgXCIgKyB0aW1lUGlja2VyLmhvdXIgKyBcIjpcIiArIHRpbWVQaWNrZXIubWludXRlO1xyXG5cclxuICAgICAgICBsZXQgbGF5b3V0OiBBYnNvbHV0ZUxheW91dCA9IDxBYnNvbHV0ZUxheW91dD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJ0aW1lcGlja2VyXCIpO1xyXG4gICAgICAgIGxheW91dC52aXNpYmlsaXR5ID0gXCJjb2xsYXBzZVwiO1xyXG4gICAgICAgLy8gYWxlcnQobGFibGUudGV4dCk7XHJcbiAgICAgICAgc2V0U3RyaW5nKFwiZGVsaXZlcl90b191c2VyXCIsbGFibGUudGV4dCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uVGFwVG9tb3Jyb3dTZXQoKSB7XHJcblxyXG4gICAgICAgIGxldCB0aW1lUGlja2VyMjogVGltZVBpY2tlciA9IDxUaW1lUGlja2VyPnRoaXMudHAyLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGxldCBsYWJsZTogTGFiZWwgPSA8TGFiZWw+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiZGVsaXZlcnl0aW1lXCIpO1xyXG4gICAgICAgIGxhYmxlLnRleHQgPSBcIlRvbW9ycm93IFwiICsgdGltZVBpY2tlcjIuaG91ciArIFwiOlwiICsgdGltZVBpY2tlcjIubWludXRlO1xyXG5cclxuICAgICAgICBsZXQgbGF5b3V0OiBBYnNvbHV0ZUxheW91dCA9IDxBYnNvbHV0ZUxheW91dD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJ0aW1lcGlja2VyXCIpO1xyXG4gICAgICAgIGxheW91dC52aXNpYmlsaXR5ID0gXCJjb2xsYXBzZVwiO1xyXG4gICAgICAgLy8gYWxlcnQobGFibGUudGV4dCk7XHJcbiAgICAgICAgc2V0U3RyaW5nKFwiZGVsaXZlcl90b191c2VyXCIsbGFibGUudGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25lbXB0eSgpIHtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uU2VhcmNoUmVzdGF1cmFudHMoKXtcclxuXHJcbiAgICAgICAgbGV0IHNiYXI6U2VhcmNoQmFyPTxTZWFyY2hCYXI+dGhpcyAucGFnZS5nZXRWaWV3QnlJZChcInNlYXJjaGJhclwiKTtcclxuICAgICAgICBzYmFyLnZpc2liaWxpdHk9XCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgbGV0IHNpbWFnZTpJbWFnZT08SW1hZ2U+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwic2ltYWdlXCIpO1xyXG4gICAgICAgIHNpbWFnZS52aXNpYmlsaXR5PVwiY29sbGFwc2VcIjtcclxuICAgICAgICB0aGlzLmFsbHJlc3RhdXJhbnRzbGVuZ3RoPTE7XHJcbiAgICB9XHJcblxyXG4gICAgb25TZWFyY2hUZXh0Q2hhbmdlZChhcmdzKXtcclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuXHJcbiAgICAgICAgbGV0IHBvc3RhbENvZGU9c2VhcmNoQmFyLnRleHQ7XHJcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYWxscmVzdGF1cmFudHM9bnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5yZXN0YXVyYW50U2VydmljZS5zZWFyY2hSZXN0YXVyYW50c2Zyb21hcGkocG9zdGFsQ29kZSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGVscGVyID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShoZWxwZXIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkYXRhXCIrSlNPTi5zdHJpbmdpZnkoZGF0YS5zdGF0dXMpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxscmVzdGF1cmFudHNsZW5ndGg9MTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd3Jlc3RhdXJhbnRzKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5PWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxyZXN0YXVyYW50c2xlbmd0aD0wO1xyXG4gICAgICAgICAgICAgICAgLy8gYWxlcnQoSlNPTi5zdHJpbmdpZnkoZXJyb3IuX2JvZHkubWVzc2FnZSkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgY29uc29sZS5sb2coXCJ0ZXh0Y2hhbmdlXCIrc2VhcmNoQmFyLnRleHQpO1xyXG4gICAgfVxyXG4gICAgb25TdWJtaXQoYXJncyl7XHJcblxyXG5cclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN1Ym1pdFwiK3NlYXJjaEJhci50ZXh0KTtcclxuICAgICAgICBsZXQgc2JhcjpTZWFyY2hCYXI9PFNlYXJjaEJhcj50aGlzIC5wYWdlLmdldFZpZXdCeUlkKFwic2VhcmNoYmFyXCIpO1xyXG4gICAgICAgIHNiYXIudmlzaWJpbGl0eT1cImNvbGxhcHNlXCI7XHJcbiAgICAgICAgbGV0IHNpbWFnZTpJbWFnZT08SW1hZ2U+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwic2ltYWdlXCIpO1xyXG4gICAgICAgIHNpbWFnZS52aXNpYmlsaXR5PVwidmlzaWJsZVwiO1xyXG5cclxuICAgICAgIGxldCBwb3N0YWxDb2RlPXNlYXJjaEJhci50ZXh0O1xyXG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmFsbHJlc3RhdXJhbnRzPW51bGw7XHJcblxyXG4gICAgICAgIHRoaXMucmVzdGF1cmFudFNlcnZpY2Uuc2VhcmNoUmVzdGF1cmFudHNmcm9tYXBpKHBvc3RhbENvZGUpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlbHBlciA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoaGVscGVyKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YVwiK0pTT04uc3RyaW5naWZ5KGRhdGEuc3RhdHVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93cmVzdGF1cmFudHMoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5PWZhbHNlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgfVxyXG4gICAgb25DbGVhcihhcmdzKXtcclxuXHJcbiAgICAgICAgbGV0IHNiYXI6U2VhcmNoQmFyPTxTZWFyY2hCYXI+dGhpcyAucGFnZS5nZXRWaWV3QnlJZChcInNlYXJjaGJhclwiKTtcclxuICAgICAgICBzYmFyLnZpc2liaWxpdHk9XCJjb2xsYXBzZVwiO1xyXG4gICAgICAgIGxldCBzaW1hZ2U6SW1hZ2U9PEltYWdlPnRoaXMucGFnZS5nZXRWaWV3QnlJZChcInNpbWFnZVwiKTtcclxuICAgICAgICBzaW1hZ2UudmlzaWJpbGl0eT1cInZpc2libGVcIjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiJdfQ==