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
        var token = application_settings_1.getString("access_token");
        if (token) {
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
                var layout = this.page.getViewById("customalert");
                layout.visibility = "visible";
                /* let that=this;
             dialog.show({
                     title: "Attention",
                     message: "Please login first to add location!",
                     cancelButtonText: "Cancel",
                     okButtonText:"Login"

                 }
             ).then(function(r){

                 console.log("Result: " + r);
                 if(r==true){
                    // phone.dial(abc,false);
                     that.router.navigate(["/login"]);


                 }

             });*/
            }
        }
        else {
            var layout = this.page.getViewById("customalert");
            layout.visibility = "visible";
            /* let that=this;
         dialog.show({
                 title: "Attention",
                 message: "Please login first to add location!",
                 cancelButtonText: "Cancel",
                 okButtonText:"Login"

             }
         ).then(function(r){

             console.log("Result: " + r);
             if(r==true){
                // phone.dial(abc,false);
                 that.router.navigate(["/login"]);


             }

         });*/
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
        this.allrestaurantslength = 1;
        this.restaurantService.searchRestaurantsfromapi(postalCode)
            .subscribe(function (result) {
            var helper = JSON.stringify(result);
            var data = JSON.parse(helper);
            console.log("data" + JSON.stringify(data.status));
            _this.allrestaurantslength = 1;
            _this.isBusy = false;
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
    restaurantsComponent.prototype.onAlertCancel = function () {
        var layout = this.page.getViewById("customalert");
        layout.visibility = "collapse";
    };
    restaurantsComponent.prototype.OnAlertOK = function () {
        var layout = this.page.getViewById("customalert");
        layout.visibility = "collapse";
        this.router.navigate(["/login"]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGF1cmFudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzdGF1cmFudHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZGO0FBRTdGLDZEQUF3RDtBQUN4RCwwQ0FBdUM7QUFNdkMsbURBQThDO0FBRTlDLGdDQUE2QjtBQUk3QixzQ0FBeUM7QUFJekMsMkNBQXVDO0FBQ3ZDLHdFQUErRDtBQUMvRCx3RkFBbUY7QUFDbkYscUVBQTREO0FBQzVELDhFQUEyRTtBQUczRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUM1QyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQVF6RDtJQWtCSSw0SUFBNEk7SUFDNUksaUhBQWlIO0lBQ2pILDhCQUFvQixpQkFBb0MsRUFBVSxNQUFjLEVBQVUsbUJBQXNDLEVBQzVHLElBQVUsRUFBVSxVQUFzQixFQUFVLHFCQUE0QztRQURoRyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFDNUcsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBaEI3RyxtQkFBYyxHQUFpQixFQUFFLENBQUM7UUFDbEMseUJBQW9CLEdBQUssQ0FBQyxDQUFDO1FBQ2xDLGdCQUFXLEdBQXNCLElBQUksS0FBSyxFQUFjLENBQUM7UUFFbEQsYUFBUSxHQUFnQixFQUFFLENBQUM7UUFFMUIscUJBQWdCLEdBQVcsMEJBQTBCLENBQUM7UUFDdkQscUJBQWdCLEdBQVcsVUFBVSxDQUFDO1FBR3RDLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsV0FBTSxHQUFHLElBQUksQ0FBQztJQVFyQixDQUFDO0lBS0Qsd0NBQVMsR0FB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QUFDO0lBQ2Q7UUFBekIsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7a0NBQU0saUJBQVU7cURBQUM7SUEzQmpDLG9CQUFvQjtRQVBoQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7U0FFbkMsQ0FBQzt5Q0FxQnlDLHVDQUFpQixFQUFrQixlQUFNLEVBQStCLHdCQUFpQjtZQUN0RyxXQUFJLEVBQXNCLHdCQUFVLEVBQWlDLCtDQUFxQjtPQXJCM0csb0JBQW9CLENBeWVoQztJQUFELDJCQUFDO0NBQUEsQUF6ZUQsSUF5ZUM7QUF6ZVksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIFZpZXdDaGlsZCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgSW1hZ2VNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2VcIjtcclxuaW1wb3J0IHtSZXN0YXVyYW50U2VydmljZX0gZnJvbSBcIi4vcmVzdGF1cmFudHMuc2VydmljZVwiO1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG4vLyBpbXBvcnQge05hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgKiBhcyBnZW9sb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XHJcbmltcG9ydCAqIGFzIHRpbWVQaWNrZXJNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGltZS1waWNrZXJcIjtcclxuaW1wb3J0IHttYXBzQ29tcG9uZW50fSBmcm9tIFwiLi4vbWFwcy9tYXBzLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQge21hcFNlcnZpY2V9IGZyb20gXCIuLi9tYXBzL21hcC5zZXJ2aWNlXCJcclxuaW1wb3J0IHtMYWJlbH0gZnJvbSBcInVpL2xhYmVsXCI7XHJcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHtBYnNvbHV0ZUxheW91dH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9hYnNvbHV0ZS1sYXlvdXRcIjtcclxuaW1wb3J0IHtTdGFja0xheW91dH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcclxuaW1wb3J0IHtUaW1lUGlja2VyfSBmcm9tIFwidWkvdGltZS1waWNrZXJcIjtcclxuaW1wb3J0IHtFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge0FjY3VyYWN5fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9lbnVtc1wiO1xyXG5pbXBvcnQgYW55ID0gQWNjdXJhY3kuYW55O1xyXG5pbXBvcnQge09ic2VydmFibGVBcnJheX0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7UmVzdGF1cmFudH0gZnJvbSBcIi4vcmVzdHVyYW50c1wiXHJcbmltcG9ydCB7bG9jYXRpb25zfSBmcm9tIFwiLi4vZGVsaXZlcnlhZGRyZXNzZXMvZGVsaXZlcnlhZGRyZXNzXCI7XHJcbmltcG9ydCB7RGVsaXZlckFkZHJlc3NTZXJ2aWNlfSBmcm9tIFwiLi4vZGVsaXZlcnlhZGRyZXNzZXMvZGVsaXZlcnlhZGRyZXNzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtnZXRDdXJyZW50TG9jYXRpb259IGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcclxuaW1wb3J0IHtnZXRTdHJpbmcsIHNldFN0cmluZ30gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHtTZWFyY2hCYXJ9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXJcIjtcclxuaW1wb3J0IHtJbWFnZX0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2VcIjtcclxudmFyIGRpYWxvZyA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZGlhbG9nXCIpO1xyXG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9yZXN0YXVyYW50cy5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vcmVzdGF1cmFudHMuY3NzJ11cclxuXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyByZXN0YXVyYW50c0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCB7XHJcblxyXG4gICAgcHVibGljIHNlbGVjdF9ob3VyOiBhbnk7XHJcbiAgICBwdWJsaWMgc2VsZWN0X21pbnQ6IGFueTtcclxuICAgIHB1YmxpYyAgbm9fcmVzdGF1cmFudF9mb3VuZDphbnk7XHJcbiAgICBwdWJsaWMgYWxscmVzdGF1cmFudHM6IFJlc3RhdXJhbnRbXSA9IFtdO1xyXG4gICAgcHVibGljIGFsbHJlc3RhdXJhbnRzbGVuZ3RoOmFueT0xO1xyXG4gICAgcmVzdGF1cmFudHM6IEFycmF5PFJlc3RhdXJhbnQ+ID0gbmV3IEFycmF5PFJlc3RhdXJhbnQ+KCk7XHJcbiAgICBkYXRhOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdXNlcl9sb2M6IGxvY2F0aW9uc1tdID0gW107XHJcbnB1YmxpYyBpc0NvbnRlbnRWaXNpYmxlOmFueTtcclxuICAgIHByaXZhdGUgX21haW5Db250ZW50VGV4dDogc3RyaW5nID0gXCJic2ZuYiBoZHYgIGhmaG1uc2IgaWhkdmpcIjtcclxuICAgIHB1YmxpYyBDdXJyZW50X2xvY2F0aW9uOiBzdHJpbmcgPSBcIkxvZGluZy4uXCI7XHJcbiAgICBwdWJsaWMgdXNlcjogc3RyaW5nO1xyXG4gICAgcHVibGljIHBhc3M6IHN0cmluZztcclxuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIGlzQnVzeSA9IHRydWU7XHJcbiAgICBwdWJsaWMgbG9jOiBzdHJpbmc7XHJcbiAgICAvLyBUaGlzIHBhdHRlcm4gbWFrZXMgdXNlIG9mIEFuZ3VsYXLvv71zIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGltcGxlbWVudGF0aW9uIHRvIGluamVjdCBhbiBpbnN0YW5jZSBvZiB0aGUgSXRlbVNlcnZpY2Ugc2VydmljZSBpbnRvIHRoaXMgY2xhc3MuXHJcbiAgICAvLyBBbmd1bGFyIGtub3dzIGFib3V0IHRoaXMgc2VydmljZSBiZWNhdXNlIGl0IGlzIGluY2x1ZGVkIGluIHlvdXIgYXBw77+9cyBtYWluIE5nTW9kdWxlLCBkZWZpbmVkIGluIGFwcC5tb2R1bGUudHMuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlc3RhdXJhbnRTZXJ2aWNlOiBSZXN0YXVyYW50U2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBtYXBzZXJ2aWNlOiBtYXBTZXJ2aWNlLCBwcml2YXRlIGRlbGl2ZXJhZGRyZXNzc2VydmljZTogRGVsaXZlckFkZHJlc3NTZXJ2aWNlKSB7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBAVmlld0NoaWxkKFwidGltZVBpY2tlclwiKSB0cDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJ0aW1lUGlja2VyMlwiKSB0cDI6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgY29uZmlndXJlKHRpbWVQaWNrZXI6IFRpbWVQaWNrZXIpIHtcclxuICAgICAgICB0aW1lUGlja2VyLmhvdXIgPSA5O1xyXG4gICAgICAgIHRpbWVQaWNrZXIubWludXRlID0gMjU7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hbGxyZXN0YXVyYW50c2xlbmd0aD0xO1xyXG4gICAgICAgIHRoaXMuaXNCdXN5PWZhbHNlO1xyXG4gICAgICAgIHNldFN0cmluZyhcImRlbGl2ZXJfdG9fdXNlclwiLFwiQVNBUFwiKTtcclxuICAgICAgICB0aGlzLkN1cnJlbnRfbG9jYXRpb24gPSBcIkxvYWRpbmcuLlwiO1xyXG4gICAgICAgICAgICB0aGlzLmlzQnVzeT10cnVlO1xyXG4gICAgICAgIHRoaXMuZ2V0Q3VycmVudGxvY2F0aW9ub2Z1c2VyKCk7XHJcbiAgICAgICAgaWYodHlwZW9mKGdldFN0cmluZyhcInVzZXJfaWRcIikpIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IEpTT04ucGFyc2UoZ2V0U3RyaW5nKFwidXNlcl9pZFwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0dXNlcmxvY2F0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdXNlcl90b2tlbj1nZXRTdHJpbmcoXCJhY2Nlc3NfdG9rZW5cIik7XHJcbiAgICAgICAgaWYodXNlcl90b2tlbi5sZW5ndGg+Mil7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdldGZpcmViYXNldG9rZW4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgLy8vL2dldCBmaXJlYmFzZSB0b2tlblxyXG4gICAgZ2V0ZmlyZWJhc2V0b2tlbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2FsbGVkLi4uXCIpO1xyXG4gICAgICAgIGZpcmViYXNlLmluaXQoe1xyXG5cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICBpbnN0YW5jZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpcmViYXNlLmluaXQgZG9uZVwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGZpcmViYXNlLmluaXQgZXJyb3I6ICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50UHVzaFRva2VuKCkudGhlbigodG9rZW46IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAvLyBtYXkgYmUgbnVsbCBpZiBub3Qga25vd24geWV0XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBwdXNoIHRva2VuOiBcIiArIHRva2VuKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVzdGF1cmFudFNlcnZpY2UudXBkYXRlX2ZpcmViYXNlX3Rva2VuKHtcImZpcmViYXNlX3Rva2VuXCI6dG9rZW59KVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaXJlYmFzZSB0b2tlbi4uLi4uLi4uLlwiK0pTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZmlyZWJhc2UuYWRkT25NZXNzYWdlUmVjZWl2ZWRDYWxsYmFjayhcclxuICAgICAgICAgICAgZnVuY3Rpb24obWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICBhbGVydChtZXNzYWdlLmJvZHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q3VycmVudGxvY2F0aW9ub2Z1c2VyKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBsZXQgbWFya2VyMTtcclxuICAgICAgICBsZXQgeW91cl9jdXJyZW50X2xvYztcclxuICAgICAgICBsZXQgYXBpa2V5Zm9ybG9jOiBzdHJpbmcgPSBcIkFJemFTeUR5YW1CTzFIZW84bndYZnk1dndrNlFyblR0LS1tU0NWTVwiOyAgLy90aGlzIGtleSBwcml2aWRlZCBieSBnb29nbGUgb24gZW5hYmxpbmcgdGhhIGdlb2NvZGluZyBhcGlcclxuICAgICAgICB2YXIgbG9jYXRpb24gPSBnZXRDdXJyZW50TG9jYXRpb24oe1xyXG4gICAgICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IDMsXHJcbiAgICAgICAgICAgIHVwZGF0ZURpc3RhbmNlOiAxMCxcclxuICAgICAgICAgICAgbWF4aW11bUFnZTogMjAwMDAsXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IDIwMDAwXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAobG9jKSB7XHJcbiAgICAgICAgICAgIGlmIChsb2MpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ3UgbGF0L2xvbmc6IFwiICsgbG9jLmxhdGl0dWRlLCBsb2MubG9uZ2l0dWRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnJlc3RhdXJhbnRTZXJ2aWNlLmdldGFkZHJlc3NfZnJvbV9hcGkobG9jLmxhdGl0dWRlLCBsb2MubG9uZ2l0dWRlKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVscGVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYzFcIiArIEpTT04uc3RyaW5naWZ5KGhlbHBlci5fYm9keS5hZGRyZXNzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuQ3VycmVudF9sb2NhdGlvbiA9IGhlbHBlci5fYm9keS5hZGRyZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gIGFsZXJ0KGhlbHBlci5fYm9keS5hZGRyZXNzK1wiICAgICBcIitoZWxwZXIuX2JvZHkucG9zdGFsQ29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFN0cmluZyhcInVzZXJfYWRkcmVzc1wiLGhlbHBlci5fYm9keS5hZGRyZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U3RyaW5nKFwidXNlcl9wY1wiLGhlbHBlci5fYm9keS5wb3N0YWxDb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nZXRSZXN0YXVyYW50TGlzdEZyb21BcGkobG9jLmxhdGl0dWRlLGxvYy5sb25naXR1ZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBsb2NhdGlvblwiICsgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGUubWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0dXNlcmxvY2F0aW9ucygpIHtcclxuICAgICAgICBsZXQgaWQgPSBKU09OLnBhcnNlKGdldFN0cmluZyhcInVzZXJfaWRcIikpO1xyXG4gICAgICAgIHRoaXMuZGVsaXZlcmFkZHJlc3NzZXJ2aWNlLmdldF91c2VyX2xvY2F0aW9uc19mcm9tX2FwaShpZClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlbHBlciA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoaGVscGVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25zdWNjZXMoZGF0YSk7XHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25zdWNjZXMoZGF0YSkge1xyXG4gICAgICAgIC8vIGFsZXJ0KFwiY2FsbGVkXCIpO1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuX2JvZHkudXNlckxvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IG5ldyBsb2NhdGlvbnMoZGF0YS5fYm9keS51c2VyTG9jYXRpb25zW2ldLnVzZXJfYWRkcmVzcywgZGF0YS5fYm9keS51c2VyTG9jYXRpb25zW2ldLnVzZXJfcG9zdGFsX2NvZGUpO1xyXG4gICAgICAgICAgICB0aGF0LnVzZXJfbG9jLnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2FsbGVkXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbGxcIiArIHRoYXQudXNlcl9sb2NbaV0pO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lKCkge1xyXG4gICAgICAgIGxldCB0aW1lUGlja2VyOiBUaW1lUGlja2VyID0gPFRpbWVQaWNrZXI+dGhpcy50cC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIHRpbWVQaWNrZXIuaG91ciA9IDU7XHJcbiAgICAgICAgdGltZVBpY2tlci5taW51dGUgPSAyMTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0cmlneTogYW55O1xyXG4gICAgc2VwZXJhdGU6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIGdldFJlc3RhdXJhbnRMaXN0RnJvbUFwaShsYXQsbGFuKSB7XHJcblxyXG4gICAgICAgIHRoaXMuaXNCdXN5PXRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJmcm9tIGNvbXBvbmVudFwiK2xhdCtcIiAgIFwiK2xhbik7XHJcbiAgICAgICAgLy97bGF0OiA1MS41MTc4OTksIGxhbjogLTAuMTI0NDM5fVxyXG4gICAgICAgIHRoaXMucmVzdGF1cmFudFNlcnZpY2VcclxuICAgICAgICAgICAgLmdldFJlc3RhdXJhbnRzKHtsYXQsbGFufSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gKDxhbnk+cmVzKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3BvbmNlIFwiK0pTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxscmVzdGF1cmFudHNsZW5ndGg9MTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd3Jlc3RhdXJhbnRzKHJlcylcclxuXHJcbiAgICAgICAgICAgIH0sKGVycm9yKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvclwiK0pTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbHJlc3RhdXJhbnRzbGVuZ3RoPTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9fcmVzdGF1cmFudF9mb3VuZD1lcnJvci5fYm9keS5tZXNzYWdlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzaG93cmVzdGF1cmFudHMocmVzOmFueSl7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmFsbHJlc3RhdXJhbnRzID0gbmV3IEFycmF5PFJlc3RhdXJhbnQ+KCk7XHJcbiAgICAgICAgdGhpcy5zdHJpZ3kgPSBKU09OLnN0cmluZ2lmeShyZXMpO1xyXG4gICAgICAgIHRoaXMuc2VwZXJhdGUgPSBKU09OLnBhcnNlKHRoaXMuc3RyaWd5KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlcGVyYXRlLl9ib2R5LnJlc3RSYW5nZUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1lbnV0eXBlOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnNlcGVyYXRlLl9ib2R5Lm1lbnVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXBlcmF0ZS5fYm9keS5tZW51c1tqXS5yZXN0YXVyYW50X2lkID09IHRoaXMuc2VwZXJhdGUuX2JvZHkucmVzdFJhbmdlTGlzdFtpXS5yZXN0YXVyYW50X2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zZXBlcmF0ZS5fYm9keS5tZW51c1tqXS5yZXN0YXVyYW50X2lkKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNlcGVyYXRlLl9ib2R5LnJlc3RSYW5nZUxpc3RbaV0ucmVzdGF1cmFudF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudXR5cGUucHVzaCh0aGlzLnNlcGVyYXRlLl9ib2R5Lm1lbnVzW2pdLm1lbnVfdHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWVudXR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzdEFyciA9IHRoaXMuc2VwZXJhdGUuX2JvZHkucmVzdFJhbmdlTGlzdFtpXTtcclxuICAgICAgICAgICAgbGV0IHJlc3QgPSBuZXcgUmVzdGF1cmFudChyZXN0QXJyLnJlc3RhdXJhbnRfaWQsIHJlc3RBcnIucmVzdGF1cmFudF9uYW1lLCByZXN0QXJyLnJlc3RhdXJhbnRfYWRkcmVzcywgcmVzdEFyci5yZXN0YXVyYW50X2NvbnRlY3QsXHJcbiAgICAgICAgICAgICAgICByZXN0QXJyLnJlc3RhdXJhbnRfaW1hZ2VfdXJsLCByZXN0QXJyLnJlc3RhdXJhbnRfZGVsaWV2ZXJ5X3RpbWUsIHJlc3RBcnIucmVzdGF1cmFudF9wb3N0YWxfY29kZSwgcmVzdEFyci5yZXN0YXVyYW50X3Bob25lX25vLFxyXG4gICAgICAgICAgICAgICAgcmVzdEFyci5yZXN0YXVyYW50X2VtYWlsLCByZXN0QXJyLnJlc3RhdXJhbnRfcGFzc3dvcmQsIHJlc3RBcnIucmVzdGF1cmFudF91c2VybmFtZSwgbWVudXR5cGUpO1xyXG4gICAgICAgICAgICB0aGlzLmFsbHJlc3RhdXJhbnRzW2ldID0gcmVzdDtcclxuICAgICAgICAgICAgdGhpcy5yZXN0YXVyYW50U2VydmljZS5yZXN0YXVyYW50c1tpXSA9IHJlc3Q7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pc0J1c3k9ZmFsc2U7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vZm9yIHNpZGUgZHJhd2VyXHJcbiAgICBnZXQgbWFpbkNvbnRlbnRUZXh0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYWluQ29udGVudFRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1haW5Db250ZW50VGV4dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fbWFpbkNvbnRlbnRUZXh0ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uSXRlbVRhcChhcmdzKSB7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmFsbHJlc3RhdXJhbnRzW2FyZ3MuaW5kZXhdLmlkO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEl0ZW1UYXBwZWQ6IFwiICsgYXJncy5pbmRleCArIFwiICBcIiArIHRoaXMuYWxscmVzdGF1cmFudHNbYXJncy5pbmRleF0uaWQpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9yZXN0YXVyYW50cy1kZXRhaWxcIiwgdGhpcy5hbGxyZXN0YXVyYW50c1thcmdzLmluZGV4XS5pZF0pO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0ZGVsaXZlcmxvY2F0aW9uKCkge1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHRva2VuPWdldFN0cmluZyhcImFjY2Vzc190b2tlblwiKTtcclxuXHJcblxyXG4gICAgICAgIGlmKHRva2VuICl7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYodG9rZW4hPVwiXCIpIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGxheW91dDogU3RhY2tMYXlvdXQgPSA8U3RhY2tMYXlvdXQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwibG9jYXRpb25waWNrZXJcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGxheW91dDogU3RhY2tMYXlvdXQgPSA8U3RhY2tMYXlvdXQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwidGltZXBpY2tlclwiKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxheW91dC52aXNpYmlsaXR5ID09IFwiY29sbGFwc2VcIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsYXlvdXQudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGxsYXlvdXQudmlzaWJpbGl0eSA9IFwiY29sbGFwc2VcIjtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsYXlvdXQudmlzaWJpbGl0eSA9IFwiY29sbGFwc2VcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBsYXlvdXQ6IEFic29sdXRlTGF5b3V0ID0gPEFic29sdXRlTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImN1c3RvbWFsZXJ0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxheW91dC52aXNpYmlsaXR5PVwidmlzaWJsZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qIGxldCB0aGF0PXRoaXM7XHJcbiAgICAgICAgICAgICBkaWFsb2cuc2hvdyh7XHJcbiAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkF0dGVudGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlBsZWFzZSBsb2dpbiBmaXJzdCB0byBhZGQgbG9jYXRpb24hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDpcIkxvZ2luXCJcclxuXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgKS50aGVuKGZ1bmN0aW9uKHIpe1xyXG5cclxuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3VsdDogXCIgKyByKTtcclxuICAgICAgICAgICAgICAgICBpZihyPT10cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwaG9uZS5kaWFsKGFiYyxmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIHRoYXQucm91dGVyLm5hdmlnYXRlKFtcIi9sb2dpblwiXSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgfSk7Ki9cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgbGF5b3V0OiBBYnNvbHV0ZUxheW91dCA9IDxBYnNvbHV0ZUxheW91dD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJjdXN0b21hbGVydFwiKTtcclxuXHJcbiAgICAgICAgICAgIGxheW91dC52aXNpYmlsaXR5PVwidmlzaWJsZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgLyogbGV0IHRoYXQ9dGhpcztcclxuICAgICAgICAgICAgZGlhbG9nLnNob3coe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkF0dGVudGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiUGxlYXNlIGxvZ2luIGZpcnN0IHRvIGFkZCBsb2NhdGlvbiFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDpcIkxvZ2luXCJcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkudGhlbihmdW5jdGlvbihyKXtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3VsdDogXCIgKyByKTtcclxuICAgICAgICAgICAgICAgIGlmKHI9PXRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgLy8gcGhvbmUuZGlhbChhYmMsZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucm91dGVyLm5hdmlnYXRlKFtcIi9sb2dpblwiXSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pOyovXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0ZGVsaXZlcnRpbWUoKSB7XHJcblxyXG4gICAgICAgIGxldCBsYXlvdXQ6IFN0YWNrTGF5b3V0ID0gPFN0YWNrTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcInRpbWVwaWNrZXJcIik7XHJcbiAgICAgICAgbGV0IGxsYXlvdXQ6IFN0YWNrTGF5b3V0ID0gPFN0YWNrTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImxvY2F0aW9ucGlja2VyXCIpO1xyXG5cclxuICAgICAgICBpZiAobGF5b3V0LnZpc2liaWxpdHkgPT0gXCJjb2xsYXBzZVwiKSB7XHJcblxyXG4gICAgICAgICAgICBsYXlvdXQudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG4gICAgICAgICAgICBsbGF5b3V0LnZpc2liaWxpdHkgPSBcImNvbGxhcHNlXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGxheW91dC52aXNpYmlsaXR5ID0gXCJjb2xsYXBzZVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblBpY2tlckxvYWRlZChhcmdzKSB7XHJcbiAgICAgICAgbGV0IHRpbWVQaWNrZXIgPSA8dGltZVBpY2tlck1vZHVsZS5UaW1lUGlja2VyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0X2hvdXIgPSB0aW1lUGlja2VyLmhvdXI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RfbWludCA9IHRpbWVQaWNrZXIubWludXRlO1xyXG5cclxuXHJcbiAgICAgICAgdGltZVBpY2tlci5ob3VyID0gOTtcclxuICAgICAgICB0aW1lUGlja2VyLm1pbnV0ZSA9IDI1O1xyXG4gICAgfVxyXG5cclxuICAgIG9udGFwc2V0ZGVsaXZlcnl0aW1lKCkge1xyXG5cclxuICAgICAgICBsZXQgdGltZVBpY2tlcjogVGltZVBpY2tlciA9IDxUaW1lUGlja2VyPnRoaXMudHAubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICAgICAgbGV0IGxhYmxlOiBMYWJlbCA9IDxMYWJlbD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJkZWxpdmVyeXRpbWVcIik7XHJcbiAgICAgICAgbGFibGUudGV4dCA9IFwiVG9kYXkgXCIgKyB0aW1lUGlja2VyLmhvdXIgKyBcIjpcIiArIHRpbWVQaWNrZXIubWludXRlO1xyXG5cclxuICAgICAgICBsZXQgbGF5b3V0OiBBYnNvbHV0ZUxheW91dCA9IDxBYnNvbHV0ZUxheW91dD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJ0aW1lcGlja2VyXCIpO1xyXG4gICAgICAgIGxheW91dC52aXNpYmlsaXR5ID0gXCJjb2xsYXBzZVwiO1xyXG4gICAgICAgLy8gYWxlcnQobGFibGUudGV4dCk7XHJcbiAgICAgICAgc2V0U3RyaW5nKFwiZGVsaXZlcl90b191c2VyXCIsbGFibGUudGV4dCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uVGFwVG9tb3Jyb3dTZXQoKSB7XHJcblxyXG4gICAgICAgIGxldCB0aW1lUGlja2VyMjogVGltZVBpY2tlciA9IDxUaW1lUGlja2VyPnRoaXMudHAyLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGxldCBsYWJsZTogTGFiZWwgPSA8TGFiZWw+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiZGVsaXZlcnl0aW1lXCIpO1xyXG4gICAgICAgIGxhYmxlLnRleHQgPSBcIlRvbW9ycm93IFwiICsgdGltZVBpY2tlcjIuaG91ciArIFwiOlwiICsgdGltZVBpY2tlcjIubWludXRlO1xyXG5cclxuICAgICAgICBsZXQgbGF5b3V0OiBBYnNvbHV0ZUxheW91dCA9IDxBYnNvbHV0ZUxheW91dD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJ0aW1lcGlja2VyXCIpO1xyXG4gICAgICAgIGxheW91dC52aXNpYmlsaXR5ID0gXCJjb2xsYXBzZVwiO1xyXG4gICAgICAgLy8gYWxlcnQobGFibGUudGV4dCk7XHJcbiAgICAgICAgc2V0U3RyaW5nKFwiZGVsaXZlcl90b191c2VyXCIsbGFibGUudGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25lbXB0eSgpIHtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uU2VhcmNoUmVzdGF1cmFudHMoKXtcclxuXHJcbiAgICAgICAgbGV0IHNiYXI6U2VhcmNoQmFyPTxTZWFyY2hCYXI+dGhpcyAucGFnZS5nZXRWaWV3QnlJZChcInNlYXJjaGJhclwiKTtcclxuICAgICAgICBzYmFyLnZpc2liaWxpdHk9XCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgbGV0IHNpbWFnZTpJbWFnZT08SW1hZ2U+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwic2ltYWdlXCIpO1xyXG4gICAgICAgIHNpbWFnZS52aXNpYmlsaXR5PVwiY29sbGFwc2VcIjtcclxuICAgICAgICB0aGlzLmFsbHJlc3RhdXJhbnRzbGVuZ3RoPTE7XHJcbiAgICB9XHJcblxyXG4gICAgb25TZWFyY2hUZXh0Q2hhbmdlZChhcmdzKXtcclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuXHJcbiAgICAgICAgbGV0IHBvc3RhbENvZGU9c2VhcmNoQmFyLnRleHQ7XHJcbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLmFsbHJlc3RhdXJhbnRzPW51bGw7XHJcbiAgICAgICAgdGhpcy5hbGxyZXN0YXVyYW50c2xlbmd0aD0xO1xyXG4gICAgICAgIHRoaXMucmVzdGF1cmFudFNlcnZpY2Uuc2VhcmNoUmVzdGF1cmFudHNmcm9tYXBpKHBvc3RhbENvZGUpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlbHBlciA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoaGVscGVyKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YVwiK0pTT04uc3RyaW5naWZ5KGRhdGEuc3RhdHVzKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbHJlc3RhdXJhbnRzbGVuZ3RoPTE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeT1mYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dyZXN0YXVyYW50cyhkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxscmVzdGF1cmFudHNsZW5ndGg9MDtcclxuICAgICAgICAgICAgICAgIC8vIGFsZXJ0KEpTT04uc3RyaW5naWZ5KGVycm9yLl9ib2R5Lm1lc3NhZ2UpKTtcclxuXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgIGNvbnNvbGUubG9nKFwidGV4dGNoYW5nZVwiK3NlYXJjaEJhci50ZXh0KTtcclxuICAgIH1cclxuICAgIG9uU3VibWl0KGFyZ3Mpe1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdWJtaXRcIitzZWFyY2hCYXIudGV4dCk7XHJcbiAgICAgICAgbGV0IHNiYXI6U2VhcmNoQmFyPTxTZWFyY2hCYXI+dGhpcyAucGFnZS5nZXRWaWV3QnlJZChcInNlYXJjaGJhclwiKTtcclxuICAgICAgICBzYmFyLnZpc2liaWxpdHk9XCJjb2xsYXBzZVwiO1xyXG4gICAgICAgIGxldCBzaW1hZ2U6SW1hZ2U9PEltYWdlPnRoaXMucGFnZS5nZXRWaWV3QnlJZChcInNpbWFnZVwiKTtcclxuICAgICAgICBzaW1hZ2UudmlzaWJpbGl0eT1cInZpc2libGVcIjtcclxuXHJcbiAgICAgICBsZXQgcG9zdGFsQ29kZT1zZWFyY2hCYXIudGV4dDtcclxuICAgICAgICB0aGlzLmlzQnVzeSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hbGxyZXN0YXVyYW50cz1udWxsO1xyXG5cclxuICAgICAgICB0aGlzLnJlc3RhdXJhbnRTZXJ2aWNlLnNlYXJjaFJlc3RhdXJhbnRzZnJvbWFwaShwb3N0YWxDb2RlKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBoZWxwZXIgPSBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGhlbHBlcik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImRhdGFcIitKU09OLnN0cmluZ2lmeShkYXRhLnN0YXR1cykpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd3Jlc3RhdXJhbnRzKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQnVzeT1mYWxzZTtcclxuXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIH1cclxuICAgIG9uQ2xlYXIoYXJncyl7XHJcblxyXG4gICAgICAgIGxldCBzYmFyOlNlYXJjaEJhcj08U2VhcmNoQmFyPnRoaXMgLnBhZ2UuZ2V0Vmlld0J5SWQoXCJzZWFyY2hiYXJcIik7XHJcbiAgICAgICAgc2Jhci52aXNpYmlsaXR5PVwiY29sbGFwc2VcIjtcclxuICAgICAgICBsZXQgc2ltYWdlOkltYWdlPTxJbWFnZT50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJzaW1hZ2VcIik7XHJcbiAgICAgICAgc2ltYWdlLnZpc2liaWxpdHk9XCJ2aXNpYmxlXCI7XHJcbiAgICB9XHJcblxyXG4gICAgb25BbGVydENhbmNlbCgpe1xyXG4gICAgICAgIGxldCBsYXlvdXQ6IEFic29sdXRlTGF5b3V0ID0gPEFic29sdXRlTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImN1c3RvbWFsZXJ0XCIpO1xyXG4gICAgICAgIGxheW91dC52aXNpYmlsaXR5PVwiY29sbGFwc2VcIjtcclxuXHJcbiAgICB9XHJcbiAgICBPbkFsZXJ0T0soKXtcclxuXHJcbiAgICAgICAgbGV0IGxheW91dDogQWJzb2x1dGVMYXlvdXQgPSA8QWJzb2x1dGVMYXlvdXQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiY3VzdG9tYWxlcnRcIik7XHJcbiAgICAgICAgbGF5b3V0LnZpc2liaWxpdHk9XCJjb2xsYXBzZVwiO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9sb2dpblwiXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXX0=