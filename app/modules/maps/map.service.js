"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mapsModule = require("nativescript-google-maps-sdk");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("MapView", function () { return require("nativescript-google-maps-sdk").MapView; });
var http = require("http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var http_1 = require("@angular/http");
var mapService = /** @class */ (function () {
    function mapService(http) {
        this.http = http;
        this.serverUrl = "http://46.101.88.80:81/get/postalcode";
    }
    // public getlocation() {
    //
    //       let that = this;
    //       let marker1;
    //       let your_current_loc;
    //        let apikeyforloc: string = "AIzaSyDyamBO1Heo8nwXfy5vwk6QrnTt--mSCVM";  //this key privided by google on enabling tha geocoding api
    //
    //    var location = getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000 }).
    //        then(function (loc) {
    //            if (loc) {
    //
    //                console.log("Current lat/long: " + loc.latitude, loc.longitude);
    //
    //                that.getaddress_from_api(loc.latitude,loc.longitude)
    //                    .subscribe((result) => {
    //                        let helper=JSON.parse(JSON.stringify(result));
    //
    //                        //console.log(JSON.stringify(helper.address));
    //                        that.current_address=helper.address;
    //
    //
    //                    }, (error) => {
    //                        console.log(JSON.stringify(error));
    //                    });
    //
    //
    //                }
    //
    //
    //        }, function (e) {
    //            console.log("Error: " + e.message);
    //        });
    //
    //
    //
    //    }
    mapService.prototype.getaddress_from_api = function (lat, lon) {
        var headers = this.createRequestHeader();
        return this.http.get(this.serverUrl + "/" + lat + "/" + lon, { headers: headers })
            .map(function (res) { return res; });
    };
    mapService.prototype.createRequestHeader = function () {
        var headers = new http_1.Headers();
        //let user_token=getString("access_token");
        //headers.set("AuthKey", "my-key");
        // headers.set("token", user_token);
        headers.append("Content-Type", "application/json");
        return headers;
    };
    mapService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], mapService);
    return mapService;
}());
exports.mapService = mapService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUV6RCwwRUFBd0U7QUFFeEUsa0NBQWUsQ0FBQyxTQUFTLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLE9BQU8sRUFBL0MsQ0FBK0MsQ0FBQyxDQUFDO0FBQ2xGLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUczQixpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBRTlCLHNDQUE4QztBQUU5QztJQVFJLG9CQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUN0QixjQUFTLEdBQUcsdUNBQXVDLENBQUM7SUFEMUIsQ0FBQztJQUduQyx5QkFBeUI7SUFDekIsRUFBRTtJQUNGLHlCQUF5QjtJQUN6QixxQkFBcUI7SUFDckIsOEJBQThCO0lBQzlCLDRJQUE0STtJQUM1SSxFQUFFO0lBQ0YsdUhBQXVIO0lBQ3ZILCtCQUErQjtJQUMvQix3QkFBd0I7SUFDeEIsRUFBRTtJQUNGLGtGQUFrRjtJQUNsRixFQUFFO0lBQ0Ysc0VBQXNFO0lBQ3RFLDhDQUE4QztJQUM5Qyx3RUFBd0U7SUFDeEUsRUFBRTtJQUNGLHdFQUF3RTtJQUN4RSw4REFBOEQ7SUFDOUQsRUFBRTtJQUNGLEVBQUU7SUFDRixxQ0FBcUM7SUFDckMsNkRBQTZEO0lBQzdELHlCQUF5QjtJQUN6QixFQUFFO0lBQ0YsRUFBRTtJQUNGLG1CQUFtQjtJQUNuQixFQUFFO0lBQ0YsRUFBRTtJQUNGLDJCQUEyQjtJQUMzQixpREFBaUQ7SUFDakQsYUFBYTtJQUNiLEVBQUU7SUFDRixFQUFFO0lBQ0YsRUFBRTtJQUNGLE9BQU87SUFFUCx3Q0FBbUIsR0FBbkIsVUFBb0IsR0FBTyxFQUFDLEdBQU87UUFDL0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUMsR0FBRyxHQUFDLEdBQUcsR0FBQyxHQUFHLEdBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ3JFLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBSU8sd0NBQW1CLEdBQTNCO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1QiwyQ0FBMkM7UUFDM0MsbUNBQW1DO1FBQ3BDLG9DQUFvQztRQUNuQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRW5ELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQWhFUSxVQUFVO1FBRHRCLGlCQUFVLEVBQUU7eUNBU2lCLFdBQUk7T0FSckIsVUFBVSxDQWtFdEI7SUFBRCxpQkFBQztDQUFBLEFBbEVELElBa0VDO0FBbEVZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbnZhciBtYXBzTW9kdWxlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGtcIik7XHJcbmltcG9ydCB7IGlzRW5hYmxlZCwgZW5hYmxlTG9jYXRpb25SZXF1ZXN0LCBnZXRDdXJyZW50TG9jYXRpb24sIHdhdGNoTG9jYXRpb24sIGRpc3RhbmNlLCBjbGVhcldhdGNoIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xyXG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xyXG5pbXBvcnQgeyBNYXBWaWV3LCBNYXJrZXIsIFBvc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGtcIjtcclxucmVnaXN0ZXJFbGVtZW50KFwiTWFwVmlld1wiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNka1wiKS5NYXBWaWV3KTtcclxudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcbmltcG9ydCB7Z2V0U3RyaW5nfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgbWFwU2VydmljZSB7XHJcbiAgICBtYXA6IE1hcFZpZXc7XHJcbiAgICBtYXJrZXI6IE1hcmtlcjtcclxuICAgIHB1YmxpYyBzZWxlY3RfYWRkcmVzczpzdHJpbmc7XHJcbiAgICBwdWJsaWMgcG9zdGFsX2NvZGU6c3RyaW5nO1xyXG4gICAgcHVibGljICBjdXJyZW50X2FkZHJlc3M6c3RyaW5nO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxyXG4gICAgcHJpdmF0ZSBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly80Ni4xMDEuODguODA6ODEvZ2V0L3Bvc3RhbGNvZGVcIjtcclxuXHJcbiAgICAvLyBwdWJsaWMgZ2V0bG9jYXRpb24oKSB7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgLy8gICAgICAgbGV0IG1hcmtlcjE7XHJcbiAgICAvLyAgICAgICBsZXQgeW91cl9jdXJyZW50X2xvYztcclxuICAgIC8vICAgICAgICBsZXQgYXBpa2V5Zm9ybG9jOiBzdHJpbmcgPSBcIkFJemFTeUR5YW1CTzFIZW84bndYZnk1dndrNlFyblR0LS1tU0NWTVwiOyAgLy90aGlzIGtleSBwcml2aWRlZCBieSBnb29nbGUgb24gZW5hYmxpbmcgdGhhIGdlb2NvZGluZyBhcGlcclxuICAgIC8vXHJcbiAgICAvLyAgICB2YXIgbG9jYXRpb24gPSBnZXRDdXJyZW50TG9jYXRpb24oeyBkZXNpcmVkQWNjdXJhY3k6IDMsIHVwZGF0ZURpc3RhbmNlOiAxMCwgbWF4aW11bUFnZTogMjAwMDAsIHRpbWVvdXQ6IDIwMDAwIH0pLlxyXG4gICAgLy8gICAgICAgIHRoZW4oZnVuY3Rpb24gKGxvYykge1xyXG4gICAgLy8gICAgICAgICAgICBpZiAobG9jKSB7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDdXJyZW50IGxhdC9sb25nOiBcIiArIGxvYy5sYXRpdHVkZSwgbG9jLmxvbmdpdHVkZSk7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgICAgICAgICAgICAgdGhhdC5nZXRhZGRyZXNzX2Zyb21fYXBpKGxvYy5sYXRpdHVkZSxsb2MubG9uZ2l0dWRlKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVscGVyPUpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGhlbHBlci5hZGRyZXNzKSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY3VycmVudF9hZGRyZXNzPWhlbHBlci5hZGRyZXNzO1xyXG4gICAgLy9cclxuICAgIC8vXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAvL1xyXG4gICAgLy9cclxuICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgIC8vXHJcbiAgICAvL1xyXG4gICAgLy8gICAgICAgIH0sIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZS5tZXNzYWdlKTtcclxuICAgIC8vICAgICAgICB9KTtcclxuICAgIC8vXHJcbiAgICAvL1xyXG4gICAgLy9cclxuICAgIC8vICAgIH1cclxuXHJcbiAgICBnZXRhZGRyZXNzX2Zyb21fYXBpKGxhdDphbnksbG9uOmFueSkge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZXJ2ZXJVcmwrXCIvXCIrbGF0K1wiL1wiK2xvbiwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZVJlcXVlc3RIZWFkZXIoKSB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIC8vbGV0IHVzZXJfdG9rZW49Z2V0U3RyaW5nKFwiYWNjZXNzX3Rva2VuXCIpO1xyXG4gICAgICAgIC8vaGVhZGVycy5zZXQoXCJBdXRoS2V5XCIsIFwibXkta2V5XCIpO1xyXG4gICAgICAgLy8gaGVhZGVycy5zZXQoXCJ0b2tlblwiLCB1c2VyX3Rva2VuKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=