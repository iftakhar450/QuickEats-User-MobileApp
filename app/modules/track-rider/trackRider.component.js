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
        // maplat:string;
        this.maplat = 31.584416;
        this.zoom = 8;
        this.minZoom = 0;
        this.maxZoom = 22;
        this.bearing = 0;
        this.tilt = 0;
        //  maplan :string;
        this.maplan = 74.382781;
        var order_id = +this.route.snapshot.params["orderid"];
        this.map = new nativescript_google_maps_sdk_1.MapView();
        console.log("map view..........................constructure...................." + this.map);
        this.order_id_id = order_id;
        console.log("order_id_id.........................constructure...................." + this.order_id_id);
    }
    TrackRiderComponent.prototype.onCameraChanged = function (args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    };
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
        console.log("Map Ready1");
        // this.marker = new Marker();
        // this.map = new MapView();
        // this.marker = new mapsModule.Marker();
        // this.ridermarker = new mapsModule.Marker();
        // this.map.addMarker(this.marker);
        console.log("Map Ready2");
        // this.map.addMarker(this.ridermarker);
        // this.map.setMyLocationEnabled(true);
        console.log("map view..............................................");
        // this.map = new MapView();
        this.map.myLocationEnabled = true;
        console.log("map view.................................................");
        this.trackRider(this.order_id_id);
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
        console.log("track rider...");
        this.map = new nativescript_google_maps_sdk_1.MapView();
        console.log("track rider...");
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
            //  this.map.removeAllMarkers();
            console.log("map");
            // this.map = new MapView();
            console.log("map");
            _this.maplat = orderlat;
            _this.maplan = orderlan;
            _this.marker = new mapsModule.Marker();
            _this.ridermarker = new mapsModule.Marker();
            _this.marker.position = mapsModule.Position.positionFromLatLng(orderlat, orderlan);
            _this.ridermarker.position = mapsModule.Position.positionFromLatLng(riderlat, riderlan);
            console.log("6map" + _this.marker);
            console.log("6map" + _this.map);
            // this.map.addMarker(this.marker);
            console.log("7map");
            _this.map.addMarker(_this.ridermarker);
            console.log("8map");
            var imgSrc = new image_source_1.ImageSource();
            console.log("map1");
            imgSrc.fromResource("deliverymen");
            console.log("map2");
            var image = new image_1.Image();
            console.log("map3");
            image.imageSource = imgSrc;
            console.log("map4");
            _this.marker.icon = image;
            console.log("map5");
            console.log("map view.........." + _this.map);
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
        console.log("map poly ");
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
        // this.map = new MapView();
        console.log("map view.........." + this.map);
        console.log("map view..........");
        console.log("map view..............................................." + this.map);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tSaWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cmFja1JpZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRDtBQUloRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN6RCwwQ0FBdUQ7QUFDdkQsMkRBQXVEO0FBQ3ZELGtDQUErQjtBQUMvQiw2Q0FBeUM7QUFFekMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDMUMsY0FBYztBQUNkLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuQyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDekMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDNUMsNkVBQWlGO0FBRWpGLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuQywrQkFBNEI7QUFtQjVCO0lBdUJJLDRJQUE0STtJQUM1SSxpSEFBaUg7SUFHakgsNkJBQW9CLGlCQUFvQyxFQUFVLEtBQXFCO1FBQW5FLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQXZCdEYsaUJBQWlCO1FBQ2pCLFdBQU0sR0FBRyxTQUFTLENBQUM7UUFDbkIsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFNBQUksR0FBRyxDQUFDLENBQUM7UUFFVixtQkFBbUI7UUFDbEIsV0FBTSxHQUFHLFNBQVMsQ0FBQztRQWVoQixJQUFNLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxT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ImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiXHJcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcclxuXHJcbnZhciBtYXBzTW9kdWxlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGtcIik7XHJcbmltcG9ydCB7QWN0aXZhdGVkUm91dGUsIFJvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge1RyYWNrUmlkZXJTZXJ2aWNlfSBmcm9tIFwiLi90cmFja1JpZGVyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJbWFnZX0gZnJvbSBcInVpL2ltYWdlXCI7XHJcbmltcG9ydCB7SW1hZ2VTb3VyY2V9IGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcclxuXHJcbnZhciBwaG9uZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGhvbmVcIik7XHJcbi8qZm9yIGRpYWxvZyovXHJcbnZhciBwbGF0Zm9ybSA9IHJlcXVpcmUoXCJwbGF0Zm9ybVwiKTtcclxudmFyIGFwcGxpY2F0aW9uID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG52YXIgZGlhbG9nID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1kaWFsb2dcIik7XHJcbmltcG9ydCB7TWFwVmlldywgTWFya2VyLCBQb2x5bGluZSwgUG9zaXRpb259IGZyb20gXCJuYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrXCI7XHJcblxyXG52YXIgcG9seWxpbmUgPSByZXF1aXJlKCdwb2x5bGluZScpO1xyXG5pbXBvcnQge0NvbG9yfSBmcm9tIFwiY29sb3JcIjtcclxuaW1wb3J0IHtcclxuICAgIGlzRW5hYmxlZCxcclxuICAgIGVuYWJsZUxvY2F0aW9uUmVxdWVzdCxcclxuICAgIGdldEN1cnJlbnRMb2NhdGlvbixcclxuICAgIHdhdGNoTG9jYXRpb24sXHJcbiAgICBkaXN0YW5jZSxcclxuICAgIGNsZWFyV2F0Y2hcclxufSBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XHJcbmltcG9ydCB7RGlyZWN0aW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kaXJlY3Rpb25zXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90cmFja1JpZGVyLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL3RyYWNrUmlkZXIuY3NzJ11cclxuXHJcblxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJhY2tSaWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG5cclxuXHJcbiAgICAgLy8gbWFwbGF0OnN0cmluZztcclxuICAgICBtYXBsYXQgPSAzMS41ODQ0MTY7XHJcbiAgICAgem9vbSA9IDg7XHJcbiAgICAgbWluWm9vbSA9IDA7XHJcbiAgICAgbWF4Wm9vbSA9IDIyO1xyXG4gICAgIGJlYXJpbmcgPSAwO1xyXG4gICAgIHRpbHQgPSAwO1xyXG4gICAgbGFzdENhbWVyYTogU3RyaW5nO1xyXG4gICAgLy8gIG1hcGxhbiA6c3RyaW5nO1xyXG4gICAgIG1hcGxhbiA9IDc0LjM4Mjc4MTtcclxuXHJcblxyXG4gICAgbWFwOiBNYXBWaWV3O1xyXG4gICAgbWFya2VyOiBNYXJrZXI7XHJcbiAgICByaWRlcm1hcmtlcjogTWFya2VyO1xyXG4gICAgcHVibGljIHJpZGVyX251bWJlcjogc3RyaW5nO1xyXG4gICAgcHVibGljIHBvbHlQb2ludHM6IGFueTtcclxuICAgIHB1YmxpYyBpbnRlcnZhbGZ1bmNhdGlvbjphbnk7XHJcbiAgICBvcmRlcl9pZF9pZCA6YW55O1xyXG4gICAgLy8gVGhpcyBwYXR0ZXJuIG1ha2VzIHVzZSBvZiBBbmd1bGFy77+9cyBkZXBlbmRlbmN5IGluamVjdGlvbiBpbXBsZW1lbnRhdGlvbiB0byBpbmplY3QgYW4gaW5zdGFuY2Ugb2YgdGhlIEl0ZW1TZXJ2aWNlIHNlcnZpY2UgaW50byB0aGlzIGNsYXNzLlxyXG4gICAgLy8gQW5ndWxhciBrbm93cyBhYm91dCB0aGlzIHNlcnZpY2UgYmVjYXVzZSBpdCBpcyBpbmNsdWRlZCBpbiB5b3VyIGFwcO+/vXMgbWFpbiBOZ01vZHVsZSwgZGVmaW5lZCBpbiBhcHAubW9kdWxlLnRzLlxyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYWNrcmlkZXJTZXJ2aWNlOiBUcmFja1JpZGVyU2VydmljZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgICAgICBjb25zdCBvcmRlcl9pZCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcIm9yZGVyaWRcIl07XHJcblxyXG4gICAgICAgIHRoaXMubWFwPSBuZXcgTWFwVmlldygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibWFwIHZpZXcuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLmNvbnN0cnVjdHVyZS4uLi4uLi4uLi4uLi4uLi4uLi4uXCIrdGhpcy5tYXApO1xyXG5cclxuICAgICAgICB0aGlzLm9yZGVyX2lkX2lkPSBvcmRlcl9pZDtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvcmRlcl9pZF9pZC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5jb25zdHJ1Y3R1cmUuLi4uLi4uLi4uLi4uLi4uLi4uLlwiK3RoaXMub3JkZXJfaWRfaWQpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25DYW1lcmFDaGFuZ2VkKGFyZ3MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSBjaGFuZ2VkOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSwgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpID09PSB0aGlzLmxhc3RDYW1lcmEpO1xyXG4gICAgICAgIHRoaXMubGFzdENhbWVyYSA9IEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvKmNvbnN0IG9yZGVyX2lkPSt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tvcmRlcmlkXCJdO1xyXG4gICAgICAgIHRoaXMudHJhY2tSaWRlcihvcmRlcl9pZCk7XCJcclxuICAgICAgICAqL1xyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjbGVhciBpbnRlcnZhbCBjYWxsZWRcIik7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsZnVuY2F0aW9uKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICBvbk1hcFJlYWR5KGFyZ3MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1hcCBSZWFkeVwiKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLm1hcCA9IGFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFwIFJlYWR5MVwiKTtcclxuICAgICAgICAvLyB0aGlzLm1hcmtlciA9IG5ldyBNYXJrZXIoKTtcclxuICAgICAgICAvLyB0aGlzLm1hcCA9IG5ldyBNYXBWaWV3KCk7XHJcbiAgICAgICAgLy8gdGhpcy5tYXJrZXIgPSBuZXcgbWFwc01vZHVsZS5NYXJrZXIoKTtcclxuICAgICAgICAvLyB0aGlzLnJpZGVybWFya2VyID0gbmV3IG1hcHNNb2R1bGUuTWFya2VyKCk7XHJcblxyXG5cclxuICAgICAgICAvLyB0aGlzLm1hcC5hZGRNYXJrZXIodGhpcy5tYXJrZXIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFwIFJlYWR5MlwiKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5tYXAuYWRkTWFya2VyKHRoaXMucmlkZXJtYXJrZXIpO1xyXG4gICAgICAgIC8vIHRoaXMubWFwLnNldE15TG9jYXRpb25FbmFibGVkKHRydWUpO1xyXG5cclxuICAgICAgICAgY29uc29sZS5sb2coXCJtYXAgdmlldy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cIik7XHJcblxyXG4gICAgICAgIC8vIHRoaXMubWFwID0gbmV3IE1hcFZpZXcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAubXlMb2NhdGlvbkVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibWFwIHZpZXcuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXCIpO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLnRyYWNrUmlkZXIodGhpcy5vcmRlcl9pZF9pZCk7XHJcblxyXG5cclxuICAgICAgICAvKnRoaXMubWFya2VyID0gbmV3IG1hcHNNb2R1bGUuTWFya2VyKCk7XHJcbiAgICAgICB0aGlzLm1hcmtlci5wb3NpdGlvbiA9IG1hcHNNb2R1bGUuUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKDQ4Ljg3LCAyLjM1KTtcclxuICAgICAgICAvLyB0aGlzLm1hcmtlci50aXRsZSA9IFwiU3lkbmV5XCI7XHJcbiAgICAgICAgLy8gdGhpcy5tYXJrZXIuc25pcHBldCA9IFwiQXVzdHJhbGlhXCI7XHJcbiAgICAgICAgLy8gdGhpcy5tYXJrZXIudXNlckRhdGEgPSB7IGluZGV4OiAxIH07XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyB0aGlzLm1hcC5hZGRNYXJrZXIodGhpcy5tYXJrZXIpOyovXHJcbiAgICB9XHJcblxyXG4gICAgdHJhY2tSaWRlcihpZCkge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInRyYWNrIHJpZGVyLi4uXCIpO1xyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IE1hcFZpZXcoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRyYWNrIHJpZGVyLi4uXCIpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMudHJhY2tyaWRlclNlcnZpY2UuZ2V0b3JkZXJEZXRhaWxGb3JUcmFja2luZ1JpZGVyKGlkKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGhlbHBlciA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoaGVscGVyKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmlkZXIgaW5mbyBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICAgICAgICAgIGxldCBvcmRlcmxhdCA9IGRhdGEuX2JvZHkucmVzcG9uc2Uub3JkZXJfbGF0O1xyXG4gICAgICAgICAgICAgICAgbGV0IG9yZGVybGFuID0gZGF0YS5fYm9keS5yZXNwb25zZS5vcmRlcl9sYW47XHJcbiAgICAgICAgICAgICAgICBsZXQgcmlkZXJsYXQgPSBkYXRhLl9ib2R5LnJlc3BvbnNlLnJpZGVyX2lkLnJpZGVyX2xhdDtcclxuICAgICAgICAgICAgICAgIGxldCByaWRlcmxhbiA9IGRhdGEuX2JvZHkucmVzcG9uc2UucmlkZXJfaWQucmlkZXJfbGFuO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWRlcl9udW1iZXIgPSBkYXRhLl9ib2R5LnJlc3BvbnNlLnJpZGVyX2lkLnJpZGVyX21vYmlsZV9ubztcclxuICAgICAgICAgICAgICAgIC8vICB0aGlzLnJpZGVyX251bWJlcj1cIjAzMDY0MTQ4OTMzXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIiArIG9yZGVybGF0ICsgXCIgXCIgKyBvcmRlcmxhbiArIFwiIFwiICsgcmlkZXJsYXQgKyBcIiBcIiArIHJpZGVybGFuICsgXCIgXCIgKyB0aGlzLnJpZGVyX251bWJlcik7XHJcblxyXG4gICAgICAgICAgICAgIC8vICB0aGlzLm1hcC5yZW1vdmVBbGxNYXJrZXJzKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1hcFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm1hcCA9IG5ldyBNYXBWaWV3KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYXBcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBsYXQgPSBvcmRlcmxhdDtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwbGFuPSBvcmRlcmxhbjtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFya2VyID0gbmV3IG1hcHNNb2R1bGUuTWFya2VyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZGVybWFya2VyID0gbmV3IG1hcHNNb2R1bGUuTWFya2VyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlci5wb3NpdGlvbiA9IG1hcHNNb2R1bGUuUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKG9yZGVybGF0LCBvcmRlcmxhbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZGVybWFya2VyLnBvc2l0aW9uID0gbWFwc01vZHVsZS5Qb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcocmlkZXJsYXQsIHJpZGVybGFuKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiNm1hcFwiK3RoaXMubWFya2VyKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiNm1hcFwiK3RoaXMubWFwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm1hcC5hZGRNYXJrZXIodGhpcy5tYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCI3bWFwXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuYWRkTWFya2VyKHRoaXMucmlkZXJtYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCI4bWFwXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaW1nU3JjID0gbmV3IEltYWdlU291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1hcDFcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgaW1nU3JjLmZyb21SZXNvdXJjZShcImRlbGl2ZXJ5bWVuXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYXAyXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYXAzXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGltYWdlLmltYWdlU291cmNlID0gaW1nU3JjO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYXA0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubWFya2VyLmljb24gPSBpbWFnZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWFwNVwiKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYXAgdmlldy4uLi4uLi4uLi5cIit0aGlzLm1hcCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd3BvbHlsaW5lKHJpZGVybGF0LCByaWRlcmxhbiwgb3JkZXJsYXQsIG9yZGVybGFuKTtcclxuICAgICAgICAgICAgICAgIC8qICB0aGlzLm1hcC5hZGRNYXJrZXIodGhpcy5tYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5tYXAuYWRkTWFya2VyKHRoaXMucmlkZXJtYXJrZXIpOyovXHJcblxyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd3BvbHlsaW5lKHJsYXRpdHVkZSwgcmxvbmdpdHVkZSwgdWxhdGl0dWRlLCB1bG9uZ2l0dWRlKSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibWFwIHBvbHkgXCIpO1xyXG5cclxuXHJcbiAgICAgICAgLy8gYWxlcnQocmxhdGl0dWRlK3Jsb25naXR1ZGUrcmxvbmdpdHVkZSt1bG9uZ2l0dWRlKTtcclxuICAgICAgICB0aGlzLnRyYWNrcmlkZXJTZXJ2aWNlLk1hcERhdGEocmxhdGl0dWRlLCBybG9uZ2l0dWRlLCB1bGF0aXR1ZGUsIHVsb25naXR1ZGUpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblN1Y2Nlc3MocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJvbiBzdWNjZXMgLS0tLS1cIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG5cclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBvblN1Y2Nlc3MocmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5tYXAgPSBuZXcgTWFwVmlldygpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIm1hcCB2aWV3Li4uLi4uLi4uLlwiK3RoaXMubWFwKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm1hcCB2aWV3Li4uLi4uLi4uLlwiKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJtYXAgdmlldy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXCIrdGhpcy5tYXApO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGxldCByZXNwb2lzZSA9IHJlc3BvbnNlLl9ib2R5O1xyXG5cclxuICAgICAgICBsZXQgcmVzID0gSlNPTi5zdHJpbmdpZnkocmVzcG9pc2UpO1xyXG4gICAgICAgIGxldCByb3V0ZSA9IEpTT04ucGFyc2UocmVzKTtcclxuICAgICAgICBsZXQgcm91dGVTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShyb3V0ZS5yb3V0ZXMpO1xyXG4gICAgICAgIC8vICBjb25zb2xlLmxvZyhcInJvdXRlU3RyaW5nLi4uXCIrSlNPTi5zdHJpbmdpZnkocm91dGVTdHJpbmcpKTtcclxuICAgICAgICBsZXQgcm91dGVTdHJpbmdwYXJzZSA9IEpTT04ucGFyc2Uocm91dGVTdHJpbmcpO1xyXG4gICAgICAgIGxldCByb3V0ZVN0cmluZ3BhcnNlc3Nzc3NQb2ludHMgPSByb3V0ZVN0cmluZ3BhcnNlWzBdLm92ZXJ2aWV3X3BvbHlsaW5lLnBvaW50cztcclxuXHJcbiAgICAgICAgLy8gIGNvbnNvbGUubG9nKFwicmVzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3MuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlwiK3JvdXRlU3RyaW5ncGFyc2Vzc3Nzc1BvaW50cyk7XHJcblxyXG4gICAgICAgIHRoaXMucG9seVBvaW50cyA9IHBvbHlsaW5lLmRlY29kZShyb3V0ZVN0cmluZ3BhcnNlc3Nzc3NQb2ludHMpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInBvbHlQb2ludHMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlwiICsgdGhpcy5wb2x5UG9pbnRzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInBvbHlQb2ludHNMZW5ndGguLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlwiICsgdGhpcy5wb2x5UG9pbnRzLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIGxldCBmbGlnaHRQYXRoO1xyXG4gICAgICAgIGxldCBwb2x5ID0gbmV3IFBvbHlsaW5lKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBvbHlQb2ludHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMucG9seVBvaW50c1tpXTtcclxuXHJcbiAgICAgICAgICAgIHBvbHkuYWRkUG9pbnQoUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHZhbHVlWzBdLCB2YWx1ZVsxXSkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGkpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBvbHkuY29sb3IgPSBuZXcgQ29sb3IoXCIjZTI3OTAwXCIpO1xyXG4gICAgICAgIHBvbHkud2lkdGggPSAyMDtcclxuICAgICAgICBwb2x5Lmdlb2Rlc2ljID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Qb2x5bGluZSAxOlwiKTtcclxuICAgICAgICB0aGlzLm1hcC5hZGRQb2x5bGluZShwb2x5KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Qb2x5bGluZSAyOlwiKTtcclxuXHJcblxyXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcImN1cnJlbnQgcG9zdGlvbiBpcyAuLi4uLlwiICsgcG9zaXRpb24ubGF0aXR1ZGUgKyBcIi4uLiwsLCwuLi4uXCIgKyBwb3NpdGlvbi5sb25naXR1ZGUpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kT2ZNYXBGYWlsdXJlKGVycm9yKSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IuLi4uLi5cIiArIEpTT04uc3RyaW5naWZ5KGVycm9yKSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25yaWRlcmNhbGx0YXAoKSB7XHJcblxyXG4gICAgICAgIGxldCBhYmMgPSB0aGlzLnJpZGVyX251bWJlcjtcclxuXHJcblxyXG4gICAgICAgIGRpYWxvZy5zaG93KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkF0dGVudGlvblwiLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJDYWxsICB5b3VyIHJpZGVyP1wiLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIixcclxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJDYWxsXCJcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHIpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVzdWx0OiBcIiArIHIpO1xyXG4gICAgICAgICAgICBpZiAociA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBwaG9uZS5kaWFsKGFiYywgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcbiJdfQ==