"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var application_settings_1 = require("tns-core-modules/application-settings");
var MydetailService = /** @class */ (function () {
    function MydetailService(http) {
        this.http = http;
        this.serverUrl = "http://46.101.88.80:81";
    }
    MydetailService.prototype.getUserProfileFromApi = function (id) {
        var headers = this.createRequestHeader();
        return this.http.get(this.serverUrl + "/user/getprofile/" + id, { headers: headers })
            .map(function (res) { return res; });
    };
    MydetailService.prototype.updateuserProfileFromApi = function (user) {
        // console.log("service"+JSON.stringify(user));
        var headers = this.createRequestHeader();
        return this.http.put(this.serverUrl + "/user/updateprofile", user, { headers: headers })
            .map(function (res) { return res; });
    };
    MydetailService.prototype.getResponseInfo = function () {
        var headers = this.createRequestHeader();
        return this.http.get(this.serverUrl, { headers: headers })
            .do(function (res) { return res; });
    };
    MydetailService.prototype.createRequestHeader = function () {
        var headers = new http_1.Headers();
        var token = application_settings_1.getString("access_token");
        // set headers here e.g.
        //  headers.append("AuthKey", "my-key");
        headers.append("token", token);
        headers.append("Content-Type", "application/json");
        return headers;
    };
    MydetailService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], MydetailService);
    return MydetailService;
}());
exports.MydetailService = MydetailService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlkZXRhaWwuY29tcG9uZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteWRldGFpbC5jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUczQyxzQ0FBOEM7QUFDOUMsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qiw4RUFBZ0U7QUFHaEU7SUFPSSx5QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFGdEIsY0FBUyxHQUFHLHdCQUF3QixDQUFDO0lBRVgsQ0FBQztJQUVuQywrQ0FBcUIsR0FBckIsVUFBc0IsRUFBRTtRQUNwQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBQyxtQkFBbUIsR0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDNUUsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFHRCxrREFBd0IsR0FBeEIsVUFBeUIsSUFBSTtRQUMxQiwrQ0FBK0M7UUFDOUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUMscUJBQXFCLEVBQUMsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxDQUFDO2FBQzlFLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUV6QixDQUFDO0lBRUQseUNBQWUsR0FBZjtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ3JELEVBQUUsQ0FBQyxVQUFBLEdBQUcsSUFBSyxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUEsNkNBQW1CLEdBQW5CO1FBQ0csSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLEtBQUssR0FBQyxnQ0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BDLHdCQUF3QjtRQUMxQix3Q0FBd0M7UUFDdEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsS0FBSyxDQUFFLENBQUM7UUFDL0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUVuRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUF2Q1EsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQVFpQixXQUFJO09BUHJCLGVBQWUsQ0F5QzNCO0lBQUQsc0JBQUM7Q0FBQSxBQXpDRCxJQXlDQztBQXpDWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcbmltcG9ydCB7Z2V0U3RyaW5nfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTXlkZXRhaWxTZXJ2aWNlIHtcclxuXHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIHNlcnZlclVybCA9IFwiaHR0cDovLzQ2LjEwMS44OC44MDo4MVwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkgeyB9XHJcblxyXG4gICAgZ2V0VXNlclByb2ZpbGVGcm9tQXBpKGlkKSB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZlclVybCtcIi91c2VyL2dldHByb2ZpbGUvXCIraWQsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB1cGRhdGV1c2VyUHJvZmlsZUZyb21BcGkodXNlcikge1xyXG4gICAgICAgLy8gY29uc29sZS5sb2coXCJzZXJ2aWNlXCIrSlNPTi5zdHJpbmdpZnkodXNlcikpO1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5zZXJ2ZXJVcmwrXCIvdXNlci91cGRhdGVwcm9maWxlXCIsdXNlciwge2hlYWRlcnM6IGhlYWRlcnN9KVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRSZXNwb25zZUluZm8oKSB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZlclVybCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5kbyhyZXMgPT4gIHJlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgIGNyZWF0ZVJlcXVlc3RIZWFkZXIoKSB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGxldCB0b2tlbj1nZXRTdHJpbmcoXCJhY2Nlc3NfdG9rZW5cIik7XHJcbiAgICAgICAgLy8gc2V0IGhlYWRlcnMgaGVyZSBlLmcuXHJcbiAgICAgIC8vICBoZWFkZXJzLmFwcGVuZChcIkF1dGhLZXlcIiwgXCJteS1rZXlcIik7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJ0b2tlblwiLHRva2VuICk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gaGVhZGVycztcclxuICAgIH1cclxuXHJcbn1cclxuIl19