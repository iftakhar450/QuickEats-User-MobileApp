"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var SignupService = /** @class */ (function () {
    function SignupService(http) {
        this.http = http;
        this.serverUrl = "http://46.101.88.80:81";
    }
    SignupService.prototype.user_signup_api_call = function (data) {
        console.log(JSON.stringify(data));
        var options = this.createRequestOptions();
        return this.http.post(this.serverUrl + "/user/register", { data: data }, { headers: options })
            .map(function (res) { return res; });
    };
    SignupService.prototype.get_verification_code = function (data) {
        console.log(JSON.stringify(data));
        var options = this.createRequestOptions();
        return this.http.post(this.serverUrl + "/get/verification/code", { data: data }, { headers: options })
            .map(function (res) { return res; });
    };
    SignupService.prototype.createRequestOptions = function () {
        var headers = new http_1.Headers();
        //  headers.set("AuthKey", "my-key");
        //  headers.set("AuthToken", "my-token");
        headers.set("Content-Type", "application/json");
        return headers;
    };
    SignupService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], SignupService);
    return SignupService;
}());
exports.SignupService = SignupService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaWdudXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUczQyxzQ0FBOEM7QUFDOUMsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUc5QjtJQU9JLHVCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUZ0QixjQUFTLEdBQUcsd0JBQXdCLENBQUM7SUFFWCxDQUFDO0lBS25DLDRDQUFvQixHQUFwQixVQUFxQixJQUFTO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxNQUFBLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUNqRixHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNELDZDQUFxQixHQUFyQixVQUFzQixJQUFTO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRTFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFDLHdCQUF3QixFQUFFLEVBQUUsSUFBSSxNQUFBLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUN6RixHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNPLDRDQUFvQixHQUE1QjtRQUVJLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUM7UUFDNUIscUNBQXFDO1FBQ3JDLHlDQUF5QztRQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQWhDUSxhQUFhO1FBRHpCLGlCQUFVLEVBQUU7eUNBUWlCLFdBQUk7T0FQckIsYUFBYSxDQWtDekI7SUFBRCxvQkFBQztDQUFBLEFBbENELElBa0NDO0FBbENZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNpZ251cFNlcnZpY2Uge1xyXG5cclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgc2VydmVyVXJsID0gXCJodHRwOi8vNDYuMTAxLjg4LjgwOjgxXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cclxuXHJcblxyXG5cclxuXHJcbiAgICB1c2VyX3NpZ251cF9hcGlfY2FsbChkYXRhOiBhbnkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RPcHRpb25zKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuc2VydmVyVXJsK1wiL3VzZXIvcmVnaXN0ZXJcIiwgeyBkYXRhIH0sIHsgaGVhZGVyczogb3B0aW9ucyB9KVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpO1xyXG4gICAgfVxyXG4gICAgZ2V0X3ZlcmlmaWNhdGlvbl9jb2RlKGRhdGE6IGFueSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuY3JlYXRlUmVxdWVzdE9wdGlvbnMoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuc2VydmVyVXJsK1wiL2dldC92ZXJpZmljYXRpb24vY29kZVwiLCB7IGRhdGEgfSwgeyBoZWFkZXJzOiBvcHRpb25zIH0pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNyZWF0ZVJlcXVlc3RPcHRpb25zKCkge1xyXG5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgLy8gIGhlYWRlcnMuc2V0KFwiQXV0aEtleVwiLCBcIm15LWtleVwiKTtcclxuICAgICAgICAvLyAgaGVhZGVycy5zZXQoXCJBdXRoVG9rZW5cIiwgXCJteS10b2tlblwiKTtcclxuICAgICAgICBoZWFkZXJzLnNldChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==