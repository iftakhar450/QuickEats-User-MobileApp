"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var application_settings_1 = require("tns-core-modules/application-settings");
var TrackRiderService = /** @class */ (function () {
    function TrackRiderService(http) {
        this.http = http;
        this.serverUrl = "http://46.101.88.80:81";
    }
    TrackRiderService.prototype.getorderDetailForTrackingRider = function (id) {
        var headers = this.createRequestHeader();
        return this.http.get(this.serverUrl + "/get/order/tracking/" + id, { headers: headers })
            .map(function (res) { return res; });
    };
    TrackRiderService.prototype.createRequestHeader = function () {
        var headers = new http_1.Headers();
        // set headers here e.g.
        var user_token = application_settings_1.getString("access_token");
        //headers.set("AuthKey", "my-key");
        headers.append("token", user_token);
        headers.append("Content-Type", "application/json");
        return headers;
    };
    TrackRiderService.prototype.MapData = function (riderLat, riderLong, userLat, userLong) {
        /*   console.log("lat....."+riderLat);
           console.log("lng....."+riderLong);
           console.log("lng....."+userLat);
           console.log("lng....."+userLong);*/
        var originLat = riderLat;
        var originLng = riderLong;
        var origin = originLat + "," + originLng;
        var desLat = userLat;
        var desLng = userLong;
        var destination = desLat + "," + desLng;
        //  console.log(origin+"     "+destination);
        // let  MapUrl = " https://maps.googleapis.com/maps/api/directions/json?alternatives=true&origin=51.517899,-0.124439&destination=51.515608,-0.115242&sensor=false&key=AIzaSyAjO8tWINXG5zpuQZSbey9eOInhMdjGvdg";
        var MapUrl = " https://maps.googleapis.com/maps/api/directions/json?alternatives=true&origin=" + origin + "&destination=" + destination + "&sensor=false&key=AIzaSyDyamBO1Heo8nwXfy5vwk6QrnTt--mSCVM";
        // let MapUrl = "https://maps.googleapis.com/maps/api/directions/json?alternatives=true&origin="+origin+"&destination="+destination+"&sensor=false&key=AIzaSyAjO8tWINXG5zpuQZSbey9eOInhMdjGvdg";
        var headers = this.MapHeader();
        console.log("map data method in service....");
        return this.http.get(MapUrl, { headers: headers })
            .map(function (res) { return res; });
    };
    TrackRiderService.prototype.MapHeader = function () {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    };
    TrackRiderService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], TrackRiderService);
    return TrackRiderService;
}());
exports.TrackRiderService = TrackRiderService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tSaWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhY2tSaWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRzNDLHNDQUE4QztBQUM5QyxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBQzlCLDhFQUFnRTtBQUdoRTtJQU9JLDJCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUZ0QixjQUFTLEdBQUcsd0JBQXdCLENBQUM7SUFFWCxDQUFDO0lBS25DLDBEQUE4QixHQUE5QixVQUErQixFQUFFO1FBRTdCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRXpDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFDLHNCQUFzQixHQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUMvRSxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUlPLCtDQUFtQixHQUEzQjtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUM7UUFDNUIsd0JBQXdCO1FBQ3hCLElBQUksVUFBVSxHQUFDLGdDQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDekMsbUNBQW1DO1FBQ25DLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFHbkQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsbUNBQU8sR0FBUCxVQUFRLFFBQVEsRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLFFBQVE7UUFFMUM7Ozs4Q0FHc0M7UUFFbkMsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMxQixJQUFJLE1BQU0sR0FBRyxTQUFTLEdBQUMsR0FBRyxHQUFDLFNBQVMsQ0FBQztRQUNyQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUM7UUFDckIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3RCLElBQUksV0FBVyxHQUFHLE1BQU0sR0FBQyxHQUFHLEdBQUMsTUFBTSxDQUFDO1FBQ3RDLDRDQUE0QztRQUV6QywrTUFBK007UUFDeE4sSUFBSyxNQUFNLEdBQUcsaUZBQWlGLEdBQUMsTUFBTSxHQUFDLGVBQWUsR0FBQyxXQUFXLEdBQUMsMkRBQTJELENBQUM7UUFDekwsZ01BQWdNO1FBRTlMLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUM3QyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNELHFDQUFTLEdBQVQ7UUFHSSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFbkQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUVuQixDQUFDO0lBbEVRLGlCQUFpQjtRQUQ3QixpQkFBVSxFQUFFO3lDQVFpQixXQUFJO09BUHJCLGlCQUFpQixDQW9FN0I7SUFBRCx3QkFBQztDQUFBLEFBcEVELElBb0VDO0FBcEVZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcbmltcG9ydCB7Z2V0U3RyaW5nfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVHJhY2tSaWRlclNlcnZpY2Uge1xyXG5cclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgc2VydmVyVXJsID0gXCJodHRwOi8vNDYuMTAxLjg4LjgwOjgxXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cclxuXHJcblxyXG5cclxuXHJcbiAgICBnZXRvcmRlckRldGFpbEZvclRyYWNraW5nUmlkZXIoaWQpIHtcclxuXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZXJ2ZXJVcmwrXCIvZ2V0L29yZGVyL3RyYWNraW5nL1wiK2lkLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlUmVxdWVzdEhlYWRlcigpIHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgLy8gc2V0IGhlYWRlcnMgaGVyZSBlLmcuXHJcbiAgICAgICAgbGV0IHVzZXJfdG9rZW49Z2V0U3RyaW5nKFwiYWNjZXNzX3Rva2VuXCIpO1xyXG4gICAgICAgIC8vaGVhZGVycy5zZXQoXCJBdXRoS2V5XCIsIFwibXkta2V5XCIpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwidG9rZW5cIiwgdXNlcl90b2tlbik7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgTWFwRGF0YShyaWRlckxhdCxyaWRlckxvbmcsdXNlckxhdCx1c2VyTG9uZyl7XHJcblxyXG4gICAgIC8qICAgY29uc29sZS5sb2coXCJsYXQuLi4uLlwiK3JpZGVyTGF0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImxuZy4uLi4uXCIrcmlkZXJMb25nKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImxuZy4uLi4uXCIrdXNlckxhdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJsbmcuLi4uLlwiK3VzZXJMb25nKTsqL1xyXG5cclxuICAgICAgICBsZXQgb3JpZ2luTGF0ID0gcmlkZXJMYXQ7XHJcbiAgICAgICAgbGV0IG9yaWdpbkxuZyA9IHJpZGVyTG9uZztcclxuICAgICAgICBsZXQgb3JpZ2luID0gb3JpZ2luTGF0K1wiLFwiK29yaWdpbkxuZztcclxuICAgICAgICBsZXQgZGVzTGF0ID0gdXNlckxhdDtcclxuICAgICAgICBsZXQgZGVzTG5nID0gdXNlckxvbmc7XHJcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gZGVzTGF0K1wiLFwiK2Rlc0xuZztcclxuICAgICAgLy8gIGNvbnNvbGUubG9nKG9yaWdpbitcIiAgICAgXCIrZGVzdGluYXRpb24pO1xyXG5cclxuICAgICAgICAgLy8gbGV0ICBNYXBVcmwgPSBcIiBodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZGlyZWN0aW9ucy9qc29uP2FsdGVybmF0aXZlcz10cnVlJm9yaWdpbj01MS41MTc4OTksLTAuMTI0NDM5JmRlc3RpbmF0aW9uPTUxLjUxNTYwOCwtMC4xMTUyNDImc2Vuc29yPWZhbHNlJmtleT1BSXphU3lBak84dFdJTlhHNXpwdVFaU2JleTllT0luaE1kakd2ZGdcIjtcclxubGV0ICBNYXBVcmwgPSBcIiBodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZGlyZWN0aW9ucy9qc29uP2FsdGVybmF0aXZlcz10cnVlJm9yaWdpbj1cIitvcmlnaW4rXCImZGVzdGluYXRpb249XCIrZGVzdGluYXRpb24rXCImc2Vuc29yPWZhbHNlJmtleT1BSXphU3lEeWFtQk8xSGVvOG53WGZ5NXZ3azZRcm5UdC0tbVNDVk1cIjtcclxuICAgICAgLy8gbGV0IE1hcFVybCA9IFwiaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2RpcmVjdGlvbnMvanNvbj9hbHRlcm5hdGl2ZXM9dHJ1ZSZvcmlnaW49XCIrb3JpZ2luK1wiJmRlc3RpbmF0aW9uPVwiK2Rlc3RpbmF0aW9uK1wiJnNlbnNvcj1mYWxzZSZrZXk9QUl6YVN5QWpPOHRXSU5YRzV6cHVRWlNiZXk5ZU9JbmhNZGpHdmRnXCI7XHJcblxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5NYXBIZWFkZXIoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm1hcCBkYXRhIG1ldGhvZCBpbiBzZXJ2aWNlLi4uLlwiKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChNYXBVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpO1xyXG4gICAgfVxyXG4gICAgTWFwSGVhZGVyKCkge1xyXG5cclxuXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=