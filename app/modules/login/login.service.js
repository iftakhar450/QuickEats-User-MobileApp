"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var loginService = /** @class */ (function () {
    function loginService(http) {
        this.http = http;
        this.serverUrl = "http://46.101.88.80:81";
    }
    loginService.prototype.user_reset_password = function (data) {
        //console.log(JSON.stringify(data));
        var options = this.createRequestOptions();
        return this.http.put(this.serverUrl + "/user/forget/password", { data: data }, { headers: options })
            .map(function (res) { return res; });
    };
    loginService.prototype.user_login_api_call = function (data) {
        // console.log("data"+JSON.stringify(data));
        var options = this.createRequestOptions();
        return this.http.post(this.serverUrl + "/user/login", { data: data }, { headers: options })
            .map(function (res) { return res; });
    };
    loginService.prototype.createRequestOptions = function () {
        var headers = new http_1.Headers();
        //  headers.set("AuthKey", "my-key");
        // headers.set("token", "my-token");
        headers.set("Content-Type", "application/json");
        return headers;
    };
    loginService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], loginService);
    return loginService;
}());
exports.loginService = loginService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ2luLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFHM0Msc0NBQThDO0FBQzlDLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFHOUI7SUFPSSxzQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFGdEIsY0FBUyxHQUFHLHdCQUF3QixDQUFDO0lBRVgsQ0FBQztJQUduQywwQ0FBbUIsR0FBbkIsVUFBb0IsSUFBUztRQUN6QixvQ0FBb0M7UUFDcEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUMsdUJBQXVCLEVBQUUsRUFBRSxJQUFJLE1BQUEsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ3ZGLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsMENBQW1CLEdBQW5CLFVBQW9CLElBQVM7UUFDMUIsNENBQTRDO1FBQzNDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksTUFBQSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDOUUsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTywyQ0FBb0IsR0FBNUI7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzlCLHFDQUFxQztRQUNwQyxvQ0FBb0M7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUE5QlEsWUFBWTtRQUR4QixpQkFBVSxFQUFFO3lDQVFpQixXQUFJO09BUHJCLFlBQVksQ0FnQ3hCO0lBQUQsbUJBQUM7Q0FBQSxBQWhDRCxJQWdDQztBQWhDWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBsb2dpblNlcnZpY2Uge1xyXG5cclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgc2VydmVyVXJsID0gXCJodHRwOi8vNDYuMTAxLjg4LjgwOjgxXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cclxuXHJcblxyXG4gICAgdXNlcl9yZXNldF9wYXNzd29yZChkYXRhOiBhbnkpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuY3JlYXRlUmVxdWVzdE9wdGlvbnMoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh0aGlzLnNlcnZlclVybCtcIi91c2VyL2ZvcmdldC9wYXNzd29yZFwiLCB7IGRhdGEgfSwgeyBoZWFkZXJzOiBvcHRpb25zIH0pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlcl9sb2dpbl9hcGlfY2FsbChkYXRhOiBhbnkpIHtcclxuICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZGF0YVwiK0pTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuY3JlYXRlUmVxdWVzdE9wdGlvbnMoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5zZXJ2ZXJVcmwrXCIvdXNlci9sb2dpblwiLCB7IGRhdGEgfSwgeyBoZWFkZXJzOiBvcHRpb25zIH0pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVSZXF1ZXN0T3B0aW9ucygpIHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgIC8vICBoZWFkZXJzLnNldChcIkF1dGhLZXlcIiwgXCJteS1rZXlcIik7XHJcbiAgICAgICAvLyBoZWFkZXJzLnNldChcInRva2VuXCIsIFwibXktdG9rZW5cIik7XHJcbiAgICAgICAgaGVhZGVycy5zZXQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=