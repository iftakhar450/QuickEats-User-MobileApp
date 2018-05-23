"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mapsModule = require("nativescript-google-maps-sdk");
var router_1 = require("@angular/router");
var trackRider_service_1 = require("./trackRider.service");
var image_1 = require("ui/image");
var image_source_1 = require("image-source");
var phone = require("nativescript-phone");
/*for dialog*/
var platform = require("platform");
var application = require("application");
var dialog = require("nativescript-dialog");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var polyline = require('polyline');
var color_1 = require("color");
var TrackRiderComponent = /** @class */ (function () {
    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.
    function TrackRiderComponent(trackriderService, route) {
        this.trackriderService = trackriderService;
        this.route = route;
        this.latitude = 51.517899;
        this.maplat = 51.517899;
        this.longitude = -0.124439;
        this.maplan = -0.124439;
        var order_id = +this.route.snapshot.params["orderid"];
        this.map = new nativescript_google_maps_sdk_1.MapView();
        this.trackRider(order_id);
    }
    TrackRiderComponent.prototype.ngOnInit = function () {
        /*const order_id=+this.route.snapshot.params["orderid"];
        this.trackRider(order_id);
        */
    };
    TrackRiderComponent.prototype.onMapReady = function (args) {
        console.log("Map Ready");
        this.map = args.object;
        this.map.addMarker(this.marker);
        this.map.addMarker(this.ridermarker);
        /*this.marker = new mapsModule.Marker();
       this.marker.position = mapsModule.Position.positionFromLatLng(48.87, 2.35);
        // this.marker.title = "Sydney";
        // this.marker.snippet = "Australia";
        // this.marker.userData = { index: 1 };
        //
        // this.map.addMarker(this.marker);*/
    };
    TrackRiderComponent.prototype.trackRider = function (id) {
        var _this = this;
        this.map = new nativescript_google_maps_sdk_1.MapView();
        this.trackriderService.getorderDetailForTrackingRider(id)
            .subscribe(function (result) {
            var helper = JSON.stringify(result);
            var data = JSON.parse(helper);
            console.log("Rider info " + JSON.stringify(data));
            var orderlat = data._body.response.order_lat;
            var orderlan = data._body.response.order_lan;
            var riderlat = data._body.response.rider_id.rider_lat;
            var riderlan = data._body.response.rider_id.rider_lan;
            _this.rider_number = data._body.response.rider_id.rider_mobile_no;
            //  this.rider_number="03064148933";
            console.log("------------------------------" + orderlat + " " + orderlan + " " + riderlat + " " + riderlan + " " + _this.rider_number);
            _this.latitude = orderlat;
            _this.longitude = orderlan;
            _this.marker = new mapsModule.Marker();
            _this.ridermarker = new mapsModule.Marker();
            _this.marker.position = mapsModule.Position.positionFromLatLng(orderlat, orderlan);
            _this.ridermarker.position = mapsModule.Position.positionFromLatLng(riderlat, riderlan);
            var imgSrc = new image_source_1.ImageSource();
            imgSrc.fromResource("deliverymen");
            var image = new image_1.Image();
            image.imageSource = imgSrc;
            _this.marker.icon = image;
            _this.drawpolyline(riderlat, riderlan, orderlat, orderlan);
            /*  this.map.addMarker(this.marker);
               this.map.addMarker(this.ridermarker);*/
        }, function (error) {
            // this.onGetDataError(error);
            console.log(JSON.stringify(error));
        });
    };
    TrackRiderComponent.prototype.drawpolyline = function (rlatitude, rlongitude, ulatitude, ulongitude) {
        var _this = this;
        // alert(rlatitude+rlongitude+rlongitude+ulongitude);
        this.trackriderService.MapData(rlatitude, rlongitude, ulatitude, ulongitude)
            .subscribe(function (result) {
            _this.onSuccess(result);
            console.log("on succes -----" + JSON.stringify(result));
            alert("succes");
        }, function (error) {
            // this.onGetDataError(error);
            alert("error");
            console.log(JSON.stringify(error));
        });
    };
    TrackRiderComponent.prototype.onSuccess = function (response) {
        var respoise = response._body;
        var res = JSON.stringify(respoise);
        var route = JSON.parse(res);
        var routeString = JSON.stringify(route.routes);
        //  console.log("routeString..."+JSON.stringify(routeString));
        var routeStringparse = JSON.parse(routeString);
        var routeStringparsesssssPoints = routeStringparse[0].overview_polyline.points;
        //  console.log("resssssssssssssssssssssssssssssssss..............................................."+routeStringparsesssssPoints);
        this.polyPoints = polyline.decode(routeStringparsesssssPoints);
        console.log("polyPoints..............................................." + this.polyPoints);
        console.log("polyPointsLength..............................................." + this.polyPoints.length);
        var flightPath;
        var poly = new nativescript_google_maps_sdk_1.Polyline();
        for (var i = 0; i < this.polyPoints.length; i++) {
            var value = this.polyPoints[i];
            poly.addPoint(nativescript_google_maps_sdk_1.Position.positionFromLatLng(value[0], value[1]));
            // console.log(i);
        }
        poly.color = new color_1.Color("#e27900");
        poly.width = 8;
        poly.geodesic = true;
        console.log("---------------------------------------------------Polyline 1:");
        this.map.addPolyline(poly);
        console.log("----------------------------------------------------Polyline 2:");
        var position = new nativescript_google_maps_sdk_1.Position();
        console.log("current postion is ....." + position.latitude + "...,,,,...." + position.longitude);
    };
    TrackRiderComponent.prototype.methodOfMapFailure = function (error) {
        console.log("error......" + JSON.stringify(error));
    };
    TrackRiderComponent.prototype.onridercalltap = function () {
        var abc = this.rider_number;
        dialog.show({
            title: "Attention",
            message: "Call  your rider?",
            cancelButtonText: "Cancel",
            okButtonText: "Call"
        }).then(function (r) {
            console.log("Result: " + r);
            if (r == true) {
                phone.dial(abc, false);
            }
        });
    };
    TrackRiderComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./trackRider.html",
            styleUrls: ['./trackRider.css']
        }),
        __metadata("design:paramtypes", [trackRider_service_1.TrackRiderService, router_1.ActivatedRoute])
    ], TrackRiderComponent);
    return TrackRiderComponent;
}());
exports.TrackRiderComponent = TrackRiderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tSaWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cmFja1JpZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRDtBQUloRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN6RCwwQ0FBdUQ7QUFDdkQsMkRBQXVEO0FBQ3ZELGtDQUErQjtBQUMvQiw2Q0FBeUM7QUFFekMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDMUMsY0FBYztBQUNkLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuQyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDekMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDNUMsNkVBQWlGO0FBRWpGLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuQywrQkFBNEI7QUFtQjVCO0lBY0ksNElBQTRJO0lBQzVJLGlIQUFpSDtJQUdqSCw2QkFBb0IsaUJBQW9DLEVBQVUsS0FBcUI7UUFBbkUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBZmhGLGFBQVEsR0FBSyxTQUFTLENBQUM7UUFDdkIsV0FBTSxHQUFLLFNBQVMsQ0FBQztRQUNyQixjQUFTLEdBQUssQ0FBQyxRQUFRLENBQUM7UUFDeEIsV0FBTSxHQUFLLENBQUMsUUFBUSxDQUFDO1FBYXhCLElBQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxHQUFHLEdBQUUsSUFBSSxzQ0FBTyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFR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QixFQUFpQix1QkFBYztPQWxCOUUsbUJBQW1CLENBOEwvQjtJQUFELDBCQUFDO0NBQUEsQUE5TEQsSUE4TEM7QUE5TFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCJcclxuaW1wb3J0IHtQYWdlfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5cclxudmFyIG1hcHNNb2R1bGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNka1wiKTtcclxuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7VHJhY2tSaWRlclNlcnZpY2V9IGZyb20gXCIuL3RyYWNrUmlkZXIuc2VydmljZVwiO1xyXG5pbXBvcnQge0ltYWdlfSBmcm9tIFwidWkvaW1hZ2VcIjtcclxuaW1wb3J0IHtJbWFnZVNvdXJjZX0gZnJvbSBcImltYWdlLXNvdXJjZVwiO1xyXG5cclxudmFyIHBob25lID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1waG9uZVwiKTtcclxuLypmb3IgZGlhbG9nKi9cclxudmFyIHBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xyXG52YXIgYXBwbGljYXRpb24gPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbnZhciBkaWFsb2cgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWRpYWxvZ1wiKTtcclxuaW1wb3J0IHtNYXBWaWV3LCBNYXJrZXIsIFBvbHlsaW5lLCBQb3NpdGlvbn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGtcIjtcclxuXHJcbnZhciBwb2x5bGluZSA9IHJlcXVpcmUoJ3BvbHlsaW5lJyk7XHJcbmltcG9ydCB7Q29sb3J9IGZyb20gXCJjb2xvclwiO1xyXG5pbXBvcnQge1xyXG4gICAgaXNFbmFibGVkLFxyXG4gICAgZW5hYmxlTG9jYXRpb25SZXF1ZXN0LFxyXG4gICAgZ2V0Q3VycmVudExvY2F0aW9uLFxyXG4gICAgd2F0Y2hMb2NhdGlvbixcclxuICAgIGRpc3RhbmNlLFxyXG4gICAgY2xlYXJXYXRjaFxyXG59IGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcclxuaW1wb3J0IHtEaXJlY3Rpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRpcmVjdGlvbnNcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RyYWNrUmlkZXIuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vdHJhY2tSaWRlci5jc3MnXVxyXG5cclxuXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmFja1JpZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcblxyXG4gICAgcHVibGljIGxhdGl0dWRlOmFueT01MS41MTc4OTk7XHJcbiAgICBwdWJsaWMgbWFwbGF0OmFueT01MS41MTc4OTk7XHJcbiAgICBwdWJsaWMgbG9uZ2l0dWRlOmFueT0tMC4xMjQ0Mzk7XHJcbiAgICBwdWJsaWMgbWFwbGFuOmFueT0tMC4xMjQ0Mzk7XHJcblxyXG4gICAgbWFwOiBNYXBWaWV3O1xyXG4gICAgbWFya2VyOiBNYXJrZXI7XHJcbiAgICByaWRlcm1hcmtlcjogTWFya2VyO1xyXG4gICAgcHVibGljIHJpZGVyX251bWJlcjogc3RyaW5nO1xyXG4gICAgcHVibGljIHBvbHlQb2ludHM6IGFueTtcclxuXHJcbiAgICAvLyBUaGlzIHBhdHRlcm4gbWFrZXMgdXNlIG9mIEFuZ3VsYXLvv71zIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGltcGxlbWVudGF0aW9uIHRvIGluamVjdCBhbiBpbnN0YW5jZSBvZiB0aGUgSXRlbVNlcnZpY2Ugc2VydmljZSBpbnRvIHRoaXMgY2xhc3MuXHJcbiAgICAvLyBBbmd1bGFyIGtub3dzIGFib3V0IHRoaXMgc2VydmljZSBiZWNhdXNlIGl0IGlzIGluY2x1ZGVkIGluIHlvdXIgYXBw77+9cyBtYWluIE5nTW9kdWxlLCBkZWZpbmVkIGluIGFwcC5tb2R1bGUudHMuXHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhY2tyaWRlclNlcnZpY2U6IFRyYWNrUmlkZXJTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgICAgIGNvbnN0IG9yZGVyX2lkID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wib3JkZXJpZFwiXTtcclxuICAgICAgICB0aGlzLm1hcD0gbmV3IE1hcFZpZXcoKTtcclxuICAgICAgICB0aGlzLnRyYWNrUmlkZXIob3JkZXJfaWQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvKmNvbnN0IG9yZGVyX2lkPSt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcIm9yZGVyaWRcIl07XHJcbiAgICAgICAgdGhpcy50cmFja1JpZGVyKG9yZGVyX2lkKTtcclxuICAgICAgICAqL1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICBvbk1hcFJlYWR5KGFyZ3MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1hcCBSZWFkeVwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAgPSBhcmdzLm9iamVjdDtcclxuICAgICAgICB0aGlzLm1hcC5hZGRNYXJrZXIodGhpcy5tYXJrZXIpO1xyXG4gICAgICAgIHRoaXMubWFwLmFkZE1hcmtlcih0aGlzLnJpZGVybWFya2VyKTtcclxuXHJcbiAgICAgICAgLyp0aGlzLm1hcmtlciA9IG5ldyBtYXBzTW9kdWxlLk1hcmtlcigpO1xyXG4gICAgICAgdGhpcy5tYXJrZXIucG9zaXRpb24gPSBtYXBzTW9kdWxlLlBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyg0OC44NywgMi4zNSk7XHJcbiAgICAgICAgLy8gdGhpcy5tYXJrZXIudGl0bGUgPSBcIlN5ZG5leVwiO1xyXG4gICAgICAgIC8vIHRoaXMubWFya2VyLnNuaXBwZXQgPSBcIkF1c3RyYWxpYVwiO1xyXG4gICAgICAgIC8vIHRoaXMubWFya2VyLnVzZXJEYXRhID0geyBpbmRleDogMSB9O1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gdGhpcy5tYXAuYWRkTWFya2VyKHRoaXMubWFya2VyKTsqL1xyXG4gICAgfVxyXG5cclxuICAgIHRyYWNrUmlkZXIoaWQpIHtcclxuXHJcbiAgICAgICAgdGhpcy5tYXA9IG5ldyBNYXBWaWV3KCk7XHJcblxyXG4gICAgICAgIHRoaXMudHJhY2tyaWRlclNlcnZpY2UuZ2V0b3JkZXJEZXRhaWxGb3JUcmFja2luZ1JpZGVyKGlkKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaGVscGVyID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShoZWxwZXIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSaWRlciBpbmZvIFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9yZGVybGF0ID0gZGF0YS5fYm9keS5yZXNwb25zZS5vcmRlcl9sYXQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3JkZXJsYW4gPSBkYXRhLl9ib2R5LnJlc3BvbnNlLm9yZGVyX2xhbjtcclxuICAgICAgICAgICAgICAgIGxldCByaWRlcmxhdCA9IGRhdGEuX2JvZHkucmVzcG9uc2UucmlkZXJfaWQucmlkZXJfbGF0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHJpZGVybGFuID0gZGF0YS5fYm9keS5yZXNwb25zZS5yaWRlcl9pZC5yaWRlcl9sYW47XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZGVyX251bWJlciA9IGRhdGEuX2JvZHkucmVzcG9uc2UucmlkZXJfaWQucmlkZXJfbW9iaWxlX25vO1xyXG4gICAgICAgICAgICAgICAgLy8gIHRoaXMucmlkZXJfbnVtYmVyPVwiMDMwNjQxNDg5MzNcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiICsgb3JkZXJsYXQgKyBcIiBcIiArIG9yZGVybGFuICsgXCIgXCIgKyByaWRlcmxhdCArIFwiIFwiICsgcmlkZXJsYW4gKyBcIiBcIiArIHRoaXMucmlkZXJfbnVtYmVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhdGl0dWRlID0gb3JkZXJsYXQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvbmdpdHVkZSA9IG9yZGVybGFuO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrZXIgPSBuZXcgbWFwc01vZHVsZS5NYXJrZXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmlkZXJtYXJrZXIgPSBuZXcgbWFwc01vZHVsZS5NYXJrZXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFya2VyLnBvc2l0aW9uID0gbWFwc01vZHVsZS5Qb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcob3JkZXJsYXQsIG9yZGVybGFuKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmlkZXJtYXJrZXIucG9zaXRpb24gPSBtYXBzTW9kdWxlLlBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhyaWRlcmxhdCwgcmlkZXJsYW4pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaW1nU3JjID0gbmV3IEltYWdlU291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICBpbWdTcmMuZnJvbVJlc291cmNlKFwiZGVsaXZlcnltZW5cIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgIGltYWdlLmltYWdlU291cmNlID0gaW1nU3JjO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrZXIuaWNvbiA9IGltYWdlO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdwb2x5bGluZShyaWRlcmxhdCwgcmlkZXJsYW4sIG9yZGVybGF0LCBvcmRlcmxhbik7XHJcbiAgICAgICAgICAgICAgICAvKiAgdGhpcy5tYXAuYWRkTWFya2VyKHRoaXMubWFya2VyKTtcclxuICAgICAgICAgICAgICAgICAgIHRoaXMubWFwLmFkZE1hcmtlcih0aGlzLnJpZGVybWFya2VyKTsqL1xyXG5cclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdwb2x5bGluZShybGF0aXR1ZGUsIHJsb25naXR1ZGUsIHVsYXRpdHVkZSwgdWxvbmdpdHVkZSkge1xyXG5cclxuICAgICAgICAvLyBhbGVydChybGF0aXR1ZGUrcmxvbmdpdHVkZStybG9uZ2l0dWRlK3Vsb25naXR1ZGUpO1xyXG4gICAgICAgIHRoaXMudHJhY2tyaWRlclNlcnZpY2UuTWFwRGF0YShybGF0aXR1ZGUsIHJsb25naXR1ZGUsIHVsYXRpdHVkZSwgdWxvbmdpdHVkZSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU3VjY2VzcyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvbiBzdWNjZXMgLS0tLS1cIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJzdWNjZXNcIik7XHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25TdWNjZXNzKHJlc3BvbnNlKSB7XHJcblxyXG5cclxuICAgICAgICBsZXQgcmVzcG9pc2UgPSByZXNwb25zZS5fYm9keTtcclxuXHJcbiAgICAgICAgbGV0IHJlcyA9IEpTT04uc3RyaW5naWZ5KHJlc3BvaXNlKTtcclxuICAgICAgICBsZXQgcm91dGUgPSBKU09OLnBhcnNlKHJlcyk7XHJcbiAgICAgICAgbGV0IHJvdXRlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkocm91dGUucm91dGVzKTtcclxuICAgICAgICAvLyAgY29uc29sZS5sb2coXCJyb3V0ZVN0cmluZy4uLlwiK0pTT04uc3RyaW5naWZ5KHJvdXRlU3RyaW5nKSk7XHJcbiAgICAgICAgbGV0IHJvdXRlU3RyaW5ncGFyc2UgPSBKU09OLnBhcnNlKHJvdXRlU3RyaW5nKTtcclxuICAgICAgICBsZXQgcm91dGVTdHJpbmdwYXJzZXNzc3NzUG9pbnRzID0gcm91dGVTdHJpbmdwYXJzZVswXS5vdmVydmlld19wb2x5bGluZS5wb2ludHM7XHJcblxyXG4gICAgICAgIC8vICBjb25zb2xlLmxvZyhcInJlc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3NzLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cIityb3V0ZVN0cmluZ3BhcnNlc3Nzc3NQb2ludHMpO1xyXG5cclxuICAgICAgICB0aGlzLnBvbHlQb2ludHMgPSBwb2x5bGluZS5kZWNvZGUocm91dGVTdHJpbmdwYXJzZXNzc3NzUG9pbnRzKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJwb2x5UG9pbnRzLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cIiArIHRoaXMucG9seVBvaW50cyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJwb2x5UG9pbnRzTGVuZ3RoLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cIiArIHRoaXMucG9seVBvaW50cy5sZW5ndGgpO1xyXG5cclxuICAgICAgICBsZXQgZmxpZ2h0UGF0aDtcclxuICAgICAgICBsZXQgcG9seSA9IG5ldyBQb2x5bGluZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wb2x5UG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnBvbHlQb2ludHNbaV07XHJcblxyXG4gICAgICAgICAgICBwb2x5LmFkZFBvaW50KFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyh2YWx1ZVswXSwgdmFsdWVbMV0pKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwb2x5LmNvbG9yID0gbmV3IENvbG9yKFwiI2UyNzkwMFwiKTtcclxuICAgICAgICBwb2x5LndpZHRoID0gODtcclxuICAgICAgICBwb2x5Lmdlb2Rlc2ljID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Qb2x5bGluZSAxOlwiKTtcclxuICAgICAgICB0aGlzLm1hcC5hZGRQb2x5bGluZShwb2x5KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Qb2x5bGluZSAyOlwiKTtcclxuXHJcblxyXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3VycmVudCBwb3N0aW9uIGlzIC4uLi4uXCIgKyBwb3NpdGlvbi5sYXRpdHVkZSArIFwiLi4uLCwsLC4uLi5cIiArIHBvc2l0aW9uLmxvbmdpdHVkZSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RPZk1hcEZhaWx1cmUoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvci4uLi4uLlwiICsgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbnJpZGVyY2FsbHRhcCgpIHtcclxuXHJcbiAgICAgICAgbGV0IGFiYyA9IHRoaXMucmlkZXJfbnVtYmVyO1xyXG5cclxuXHJcbiAgICAgICAgZGlhbG9nLnNob3coe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQXR0ZW50aW9uXCIsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkNhbGwgIHlvdXIgcmlkZXI/XCIsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkNhbGxcIlxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICkudGhlbihmdW5jdGlvbiAocikge1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXN1bHQ6IFwiICsgcik7XHJcbiAgICAgICAgICAgIGlmIChyID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHBob25lLmRpYWwoYWJjLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIl19