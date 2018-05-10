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
        this.maplat = 0;
        this.maplan = 0;
        var order_id = +this.route.snapshot.params["orderid"];
        this.intervalfuncation = setInterval(function () {
            console.log(order_id);
            //
        }, 5000);
        this.trackRider(order_id);
    }
    TrackRiderComponent.prototype.ngOnInit = function () {
        /*const order_id=+this.route.snapshot.params[orderid"];
        this.trackRider(order_id);"
        */
    };
    TrackRiderComponent.prototype.ngOnDestroy = function () {
        console.log("clear interval called");
        clearInterval(this.intervalfuncation);
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
            _this.maplat = orderlat;
            _this.maplan = orderlan;
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
            // console.log("on succes -----" + JSON.stringify(result));
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
        poly.width = 20;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tSaWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cmFja1JpZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRDtBQUloRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN6RCwwQ0FBdUQ7QUFDdkQsMkRBQXVEO0FBQ3ZELGtDQUErQjtBQUMvQiw2Q0FBeUM7QUFFekMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDMUMsY0FBYztBQUNkLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuQyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDekMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDNUMsNkVBQWlGO0FBRWpGLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuQywrQkFBNEI7QUFtQjVCO0lBZ0JJLDRJQUE0STtJQUM1SSxpSEFBaUg7SUFHakgsNkJBQW9CLGlCQUFvQyxFQUFVLEtBQXFCO1FBQW5FLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQWhCaEYsV0FBTSxHQUFLLENBQUMsQ0FBQztRQUNiLFdBQU0sR0FBSyxDQUFDLENBQUM7UUFnQmhCLElBQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBR3hELElBQUksQ0FBQyxpQkFBaUIsR0FBQyxXQUFXLENBQUM7WUFFL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUN0QixFQUFFO1FBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsSUFBSSxDQUFDLFVB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QjlFLG1CQUFtQixDQThNL0I7SUFBRCwwQkFBQztDQUFBLEFBOU1ELElBOE1DO0FBOU1ZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiXHJcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcclxuXHJcbnZhciBtYXBzTW9kdWxlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGtcIik7XHJcbmltcG9ydCB7QWN0aXZhdGVkUm91dGUsIFJvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge1RyYWNrUmlkZXJTZXJ2aWNlfSBmcm9tIFwiLi90cmFja1JpZGVyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJbWFnZX0gZnJvbSBcInVpL2ltYWdlXCI7XHJcbmltcG9ydCB7SW1hZ2VTb3VyY2V9IGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcclxuXHJcbnZhciBwaG9uZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGhvbmVcIik7XHJcbi8qZm9yIGRpYWxvZyovXHJcbnZhciBwbGF0Zm9ybSA9IHJlcXVpcmUoXCJwbGF0Zm9ybVwiKTtcclxudmFyIGFwcGxpY2F0aW9uID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG52YXIgZGlhbG9nID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1kaWFsb2dcIik7XHJcbmltcG9ydCB7TWFwVmlldywgTWFya2VyLCBQb2x5bGluZSwgUG9zaXRpb259IGZyb20gXCJuYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrXCI7XHJcblxyXG52YXIgcG9seWxpbmUgPSByZXF1aXJlKCdwb2x5bGluZScpO1xyXG5pbXBvcnQge0NvbG9yfSBmcm9tIFwiY29sb3JcIjtcclxuaW1wb3J0IHtcclxuICAgIGlzRW5hYmxlZCxcclxuICAgIGVuYWJsZUxvY2F0aW9uUmVxdWVzdCxcclxuICAgIGdldEN1cnJlbnRMb2NhdGlvbixcclxuICAgIHdhdGNoTG9jYXRpb24sXHJcbiAgICBkaXN0YW5jZSxcclxuICAgIGNsZWFyV2F0Y2hcclxufSBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XHJcbmltcG9ydCB7RGlyZWN0aW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kaXJlY3Rpb25zXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90cmFja1JpZGVyLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL3RyYWNrUmlkZXIuY3NzJ11cclxuXHJcblxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJhY2tSaWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgbWFwbGF0OmFueT0wO1xyXG4gICAgcHVibGljIG1hcGxhbjphbnk9MDtcclxuXHJcblxyXG5cclxuXHJcbiAgICBtYXA6IE1hcFZpZXc7XHJcbiAgICBtYXJrZXI6IE1hcmtlcjtcclxuICAgIHJpZGVybWFya2VyOiBNYXJrZXI7XHJcbiAgICBwdWJsaWMgcmlkZXJfbnVtYmVyOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcG9seVBvaW50czogYW55O1xyXG4gICAgcHVibGljIGludGVydmFsZnVuY2F0aW9uOmFueTtcclxuICAgIC8vIFRoaXMgcGF0dGVybiBtYWtlcyB1c2Ugb2YgQW5ndWxhcu+/vXMgZGVwZW5kZW5jeSBpbmplY3Rpb24gaW1wbGVtZW50YXRpb24gdG8gaW5qZWN0IGFuIGluc3RhbmNlIG9mIHRoZSBJdGVtU2VydmljZSBzZXJ2aWNlIGludG8gdGhpcyBjbGFzcy5cclxuICAgIC8vIEFuZ3VsYXIga25vd3MgYWJvdXQgdGhpcyBzZXJ2aWNlIGJlY2F1c2UgaXQgaXMgaW5jbHVkZWQgaW4geW91ciBhcHDvv71zIG1haW4gTmdNb2R1bGUsIGRlZmluZWQgaW4gYXBwLm1vZHVsZS50cy5cclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFja3JpZGVyU2VydmljZTogVHJhY2tSaWRlclNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcbiAgICAgICAgY29uc3Qgb3JkZXJfaWQgPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJvcmRlcmlkXCJdO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbGZ1bmNhdGlvbj1zZXRJbnRlcnZhbCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhvcmRlcl9pZClcclxuICAgICAgICAgICAvL1xyXG4gICAgICAgIH0sIDUwMDApO1xyXG5cclxuICAgICAgICB0aGlzLnRyYWNrUmlkZXIob3JkZXJfaWQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvKmNvbnN0IG9yZGVyX2lkPSt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tvcmRlcmlkXCJdO1xyXG4gICAgICAgIHRoaXMudHJhY2tSaWRlcihvcmRlcl9pZCk7XCJcclxuICAgICAgICAqL1xyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjbGVhciBpbnRlcnZhbCBjYWxsZWRcIik7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsZnVuY2F0aW9uKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICBvbk1hcFJlYWR5KGFyZ3MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1hcCBSZWFkeVwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAgPSBhcmdzLm9iamVjdDtcclxuICAgICAgICB0aGlzLm1hcC5hZGRNYXJrZXIodGhpcy5tYXJrZXIpO1xyXG4gICAgICAgIHRoaXMubWFwLmFkZE1hcmtlcih0aGlzLnJpZGVybWFya2VyKTtcclxuXHJcbiAgICAgICAgLyp0aGlzLm1hcmtlciA9IG5ldyBtYXBzTW9kdWxlLk1hcmtlcigpO1xyXG4gICAgICAgdGhpcy5tYXJrZXIucG9zaXRpb24gPSBtYXBzTW9kdWxlLlBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyg0OC44NywgMi4zNSk7XHJcbiAgICAgICAgLy8gdGhpcy5tYXJrZXIudGl0bGUgPSBcIlN5ZG5leVwiO1xyXG4gICAgICAgIC8vIHRoaXMubWFya2VyLnNuaXBwZXQgPSBcIkF1c3RyYWxpYVwiO1xyXG4gICAgICAgIC8vIHRoaXMubWFya2VyLnVzZXJEYXRhID0geyBpbmRleDogMSB9O1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gdGhpcy5tYXAuYWRkTWFya2VyKHRoaXMubWFya2VyKTsqL1xyXG4gICAgfVxyXG5cclxuICAgIHRyYWNrUmlkZXIoaWQpIHtcclxuXHJcbiAgICAgICAgdGhpcy50cmFja3JpZGVyU2VydmljZS5nZXRvcmRlckRldGFpbEZvclRyYWNraW5nUmlkZXIoaWQpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBoZWxwZXIgPSBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGhlbHBlcik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJpZGVyIGluZm8gXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3JkZXJsYXQgPSBkYXRhLl9ib2R5LnJlc3BvbnNlLm9yZGVyX2xhdDtcclxuICAgICAgICAgICAgICAgIGxldCBvcmRlcmxhbiA9IGRhdGEuX2JvZHkucmVzcG9uc2Uub3JkZXJfbGFuO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJpZGVybGF0ID0gZGF0YS5fYm9keS5yZXNwb25zZS5yaWRlcl9pZC5yaWRlcl9sYXQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmlkZXJsYW4gPSBkYXRhLl9ib2R5LnJlc3BvbnNlLnJpZGVyX2lkLnJpZGVyX2xhbjtcclxuICAgICAgICAgICAgICAgIHRoaXMucmlkZXJfbnVtYmVyID0gZGF0YS5fYm9keS5yZXNwb25zZS5yaWRlcl9pZC5yaWRlcl9tb2JpbGVfbm87XHJcbiAgICAgICAgICAgICAgICAvLyAgdGhpcy5yaWRlcl9udW1iZXI9XCIwMzA2NDE0ODkzM1wiO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIgKyBvcmRlcmxhdCArIFwiIFwiICsgb3JkZXJsYW4gKyBcIiBcIiArIHJpZGVybGF0ICsgXCIgXCIgKyByaWRlcmxhbiArIFwiIFwiICsgdGhpcy5yaWRlcl9udW1iZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubWFwbGF0ID0gb3JkZXJsYXQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcGxhbj0gb3JkZXJsYW47XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlciA9IG5ldyBtYXBzTW9kdWxlLk1hcmtlcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWRlcm1hcmtlciA9IG5ldyBtYXBzTW9kdWxlLk1hcmtlcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrZXIucG9zaXRpb24gPSBtYXBzTW9kdWxlLlBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhvcmRlcmxhdCwgb3JkZXJsYW4pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWRlcm1hcmtlci5wb3NpdGlvbiA9IG1hcHNNb2R1bGUuUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHJpZGVybGF0LCByaWRlcmxhbik7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpbWdTcmMgPSBuZXcgSW1hZ2VTb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgIGltZ1NyYy5mcm9tUmVzb3VyY2UoXCJkZWxpdmVyeW1lblwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2UuaW1hZ2VTb3VyY2UgPSBpbWdTcmM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlci5pY29uID0gaW1hZ2U7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd3BvbHlsaW5lKHJpZGVybGF0LCByaWRlcmxhbiwgb3JkZXJsYXQsIG9yZGVybGFuKTtcclxuICAgICAgICAgICAgICAgIC8qICB0aGlzLm1hcC5hZGRNYXJrZXIodGhpcy5tYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5tYXAuYWRkTWFya2VyKHRoaXMucmlkZXJtYXJrZXIpOyovXHJcblxyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd3BvbHlsaW5lKHJsYXRpdHVkZSwgcmxvbmdpdHVkZSwgdWxhdGl0dWRlLCB1bG9uZ2l0dWRlKSB7XHJcblxyXG4gICAgICAgIC8vIGFsZXJ0KHJsYXRpdHVkZStybG9uZ2l0dWRlK3Jsb25naXR1ZGUrdWxvbmdpdHVkZSk7XHJcbiAgICAgICAgdGhpcy50cmFja3JpZGVyU2VydmljZS5NYXBEYXRhKHJsYXRpdHVkZSwgcmxvbmdpdHVkZSwgdWxhdGl0dWRlLCB1bG9uZ2l0dWRlKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25TdWNjZXNzKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwib24gc3VjY2VzIC0tLS0tXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuXHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25TdWNjZXNzKHJlc3BvbnNlKSB7XHJcblxyXG5cclxuICAgICAgICBsZXQgcmVzcG9pc2UgPSByZXNwb25zZS5fYm9keTtcclxuXHJcbiAgICAgICAgbGV0IHJlcyA9IEpTT04uc3RyaW5naWZ5KHJlc3BvaXNlKTtcclxuICAgICAgICBsZXQgcm91dGUgPSBKU09OLnBhcnNlKHJlcyk7XHJcbiAgICAgICAgbGV0IHJvdXRlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkocm91dGUucm91dGVzKTtcclxuICAgICAgICAvLyAgY29uc29sZS5sb2coXCJyb3V0ZVN0cmluZy4uLlwiK0pTT04uc3RyaW5naWZ5KHJvdXRlU3RyaW5nKSk7XHJcbiAgICAgICAgbGV0IHJvdXRlU3RyaW5ncGFyc2UgPSBKU09OLnBhcnNlKHJvdXRlU3RyaW5nKTtcclxuICAgICAgICBsZXQgcm91dGVTdHJpbmdwYXJzZXNzc3NzUG9pbnRzID0gcm91dGVTdHJpbmdwYXJzZVswXS5vdmVydmlld19wb2x5bGluZS5wb2ludHM7XHJcblxyXG4gICAgICAgIC8vICBjb25zb2xlLmxvZyhcInJlc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3NzLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cIityb3V0ZVN0cmluZ3BhcnNlc3Nzc3NQb2ludHMpO1xyXG5cclxuICAgICAgICB0aGlzLnBvbHlQb2ludHMgPSBwb2x5bGluZS5kZWNvZGUocm91dGVTdHJpbmdwYXJzZXNzc3NzUG9pbnRzKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJwb2x5UG9pbnRzLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cIiArIHRoaXMucG9seVBvaW50cyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJwb2x5UG9pbnRzTGVuZ3RoLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cIiArIHRoaXMucG9seVBvaW50cy5sZW5ndGgpO1xyXG5cclxuICAgICAgICBsZXQgZmxpZ2h0UGF0aDtcclxuICAgICAgICBsZXQgcG9seSA9IG5ldyBQb2x5bGluZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wb2x5UG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnBvbHlQb2ludHNbaV07XHJcblxyXG4gICAgICAgICAgICBwb2x5LmFkZFBvaW50KFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyh2YWx1ZVswXSwgdmFsdWVbMV0pKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwb2x5LmNvbG9yID0gbmV3IENvbG9yKFwiI2UyNzkwMFwiKTtcclxuICAgICAgICBwb2x5LndpZHRoID0gMjA7XHJcbiAgICAgICAgcG9seS5nZW9kZXNpYyA9IHRydWU7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tUG9seWxpbmUgMTpcIik7XHJcbiAgICAgICAgdGhpcy5tYXAuYWRkUG9seWxpbmUocG9seSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tUG9seWxpbmUgMjpcIik7XHJcblxyXG5cclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBuZXcgUG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjdXJyZW50IHBvc3Rpb24gaXMgLi4uLi5cIiArIHBvc2l0aW9uLmxhdGl0dWRlICsgXCIuLi4sLCwsLi4uLlwiICsgcG9zaXRpb24ubG9uZ2l0dWRlKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZE9mTWFwRmFpbHVyZShlcnJvcikge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yLi4uLi4uXCIgKyBKU09OLnN0cmluZ2lmeShlcnJvcikpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9ucmlkZXJjYWxsdGFwKCkge1xyXG5cclxuICAgICAgICBsZXQgYWJjID0gdGhpcy5yaWRlcl9udW1iZXI7XHJcblxyXG5cclxuICAgICAgICBkaWFsb2cuc2hvdyh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJBdHRlbnRpb25cIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQ2FsbCAgeW91ciByaWRlcj9cIixcclxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCIsXHJcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiQ2FsbFwiXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3VsdDogXCIgKyByKTtcclxuICAgICAgICAgICAgaWYgKHIgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgcGhvbmUuZGlhbChhYmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iXX0=