"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var application_settings_1 = require("tns-core-modules/application-settings");
var RestaurantDetailService = /** @class */ (function () {
    function RestaurantDetailService(http) {
        this.http = http;
        this.serverUrl = "http://46.101.88.80:81";
    }
    RestaurantDetailService.prototype.getData = function (id) {
        //console.log(id+"service");
        var headers = this.createRequestHeader();
        return this.http.get(this.serverUrl + "/restaurant/getrestaurantdetail/" + id, { headers: headers })
            .map(function (res) { return res; });
    };
    RestaurantDetailService.prototype.getResponseInfo = function () {
        var headers = this.createRequestHeader();
        return this.http.get(this.serverUrl, { headers: headers })
            .do(function (res) { return res; });
    };
    RestaurantDetailService.prototype.createRequestHeader = function () {
        var headers = new http_1.Headers();
        var user_token = application_settings_1.getString("access_token");
        //headers.set("AuthKey", "my-key");
        headers.append("token", user_token);
        headers.append("Content-Type", "application/json");
        return headers;
    };
    RestaurantDetailService.prototype.post_to_cart = function (data) {
        console.log(JSON.stringify(data));
        var options = this.headerForCart();
        return this.http.post(this.serverUrl + "/device/cart", { data: data }, { headers: options })
            .map(function (res) { return res; });
    };
    RestaurantDetailService.prototype.headerForCart = function () {
        var headers = new http_1.Headers();
        //  headers.set("AuthKey", "my-key");
        //  headers.set("AuthToken", "my-token");
        headers.set("Content-Type", "application/json");
        return headers;
    };
    RestaurantDetailService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], RestaurantDetailService);
    return RestaurantDetailService;
}());
exports.RestaurantDetailService = RestaurantDetailService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGF1cmFudC1kZXRhaWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlc3RhdXJhbnQtZGV0YWlsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFHM0Msc0NBQThDO0FBQzlDLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFDOUIsOEVBQWdFO0FBR2hFO0lBR0ksaUNBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBRnRCLGNBQVMsR0FBRyx3QkFBd0IsQ0FBQztJQUVYLENBQUM7SUFFbkMseUNBQU8sR0FBUCxVQUFRLEVBQVM7UUFDYiw0QkFBNEI7UUFDNUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUMsa0NBQWtDLEdBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQzNGLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsaURBQWUsR0FBZjtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ3JELEVBQUUsQ0FBQyxVQUFBLEdBQUcsSUFBSyxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRU8scURBQW1CLEdBQTNCO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLFVBQVUsR0FBQyxnQ0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pDLG1DQUFtQztRQUNuQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRW5ELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUNELDhDQUFZLEdBQVosVUFBYSxJQUFTO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLE1BQUEsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQy9FLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRU8sK0NBQWEsR0FBckI7UUFFSSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLHFDQUFxQztRQUNyQyx5Q0FBeUM7UUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUF6Q1EsdUJBQXVCO1FBRG5DLGlCQUFVLEVBQUU7eUNBSWlCLFdBQUk7T0FIckIsdUJBQXVCLENBMkNuQztJQUFELDhCQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7QUEzQ1ksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuaW1wb3J0IHtnZXRTdHJpbmd9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSZXN0YXVyYW50RGV0YWlsU2VydmljZSB7XHJcbiAgICBwcml2YXRlIHNlcnZlclVybCA9IFwiaHR0cDovLzQ2LjEwMS44OC44MDo4MVwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkgeyB9XHJcblxyXG4gICAgZ2V0RGF0YShpZDpudW1iZXIpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGlkK1wic2VydmljZVwiKTtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuc2VydmVyVXJsK1wiL3Jlc3RhdXJhbnQvZ2V0cmVzdGF1cmFudGRldGFpbC9cIitpZCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVzcG9uc2VJbmZvKCkge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZXJ2ZXJVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAuZG8ocmVzID0+ICByZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlUmVxdWVzdEhlYWRlcigpIHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgbGV0IHVzZXJfdG9rZW49Z2V0U3RyaW5nKFwiYWNjZXNzX3Rva2VuXCIpO1xyXG4gICAgICAgIC8vaGVhZGVycy5zZXQoXCJBdXRoS2V5XCIsIFwibXkta2V5XCIpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwidG9rZW5cIiwgdXNlcl90b2tlbik7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gaGVhZGVycztcclxuICAgIH1cclxuICAgIHBvc3RfdG9fY2FydChkYXRhOiBhbnkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLmhlYWRlckZvckNhcnQoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5zZXJ2ZXJVcmwrXCIvZGV2aWNlL2NhcnRcIiwgeyBkYXRhIH0sIHsgaGVhZGVyczogb3B0aW9ucyB9KVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGVhZGVyRm9yQ2FydCgpIHtcclxuXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIC8vICBoZWFkZXJzLnNldChcIkF1dGhLZXlcIiwgXCJteS1rZXlcIik7XHJcbiAgICAgICAgLy8gIGhlYWRlcnMuc2V0KFwiQXV0aFRva2VuXCIsIFwibXktdG9rZW5cIik7XHJcbiAgICAgICAgaGVhZGVycy5zZXQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xyXG4gICAgfVxyXG5cclxufSJdfQ==