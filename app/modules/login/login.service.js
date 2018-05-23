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
    loginService.prototype.testservice = function () {
        // console.log("data"+JSON.stringify(data));
        var options = this.createRequestOptions();
        return this.http.get("https://api.atom.purevpn.com/inventory/v1/getCountries?iResellerId=" + 272, { headers: options })
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
        headers.set("X-AccessToken", "bdfb7a61e60b94d07926e32b6f46bdcd83bd21fb267c113c1399eb2e69595429");
        return headers;
    };
    loginService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], loginService);
    return loginService;
}());
exports.loginService = loginService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ2luLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFHM0Msc0NBQThDO0FBQzlDLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFHOUI7SUFPSSxzQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFGdEIsY0FBUyxHQUFHLHdCQUF3QixDQUFDO0lBRVgsQ0FBQztJQUduQywwQ0FBbUIsR0FBbkIsVUFBb0IsSUFBUztRQUN6QixvQ0FBb0M7UUFDcEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUMsdUJBQXVCLEVBQUUsRUFBRSxJQUFJLE1BQUEsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ3ZGLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBR0Qsa0NBQVcsR0FBWDtRQUNJLDRDQUE0QztRQUM1QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMscUVBQXFFLEdBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2hILEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0QsMENBQW1CLEdBQW5CLFVBQW9CLElBQVM7UUFDMUIsNENBQTRDO1FBQzNDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksTUFBQSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDOUUsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTywyQ0FBb0IsR0FBNUI7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzlCLHFDQUFxQztRQUNwQyxvQ0FBb0M7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxrRUFBa0UsQ0FBQyxDQUFDO1FBQ2pHLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQXRDUSxZQUFZO1FBRHhCLGlCQUFVLEVBQUU7eUNBUWlCLFdBQUk7T0FQckIsWUFBWSxDQXdDeEI7SUFBRCxtQkFBQztDQUFBLEFBeENELElBd0NDO0FBeENZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIGxvZ2luU2VydmljZSB7XHJcblxyXG5cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly80Ni4xMDEuODguODA6ODFcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxyXG5cclxuXHJcbiAgICB1c2VyX3Jlc2V0X3Bhc3N3b3JkKGRhdGE6IGFueSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5jcmVhdGVSZXF1ZXN0T3B0aW9ucygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHRoaXMuc2VydmVyVXJsK1wiL3VzZXIvZm9yZ2V0L3Bhc3N3b3JkXCIsIHsgZGF0YSB9LCB7IGhlYWRlcnM6IG9wdGlvbnMgfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdGVzdHNlcnZpY2UoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJkYXRhXCIrSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5jcmVhdGVSZXF1ZXN0T3B0aW9ucygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFwiaHR0cHM6Ly9hcGkuYXRvbS5wdXJldnBuLmNvbS9pbnZlbnRvcnkvdjEvZ2V0Q291bnRyaWVzP2lSZXNlbGxlcklkPVwiKzI3MiwgeyBoZWFkZXJzOiBvcHRpb25zIH0pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7XHJcbiAgICB9XHJcbiAgICB1c2VyX2xvZ2luX2FwaV9jYWxsKGRhdGE6IGFueSkge1xyXG4gICAgICAgLy8gY29uc29sZS5sb2coXCJkYXRhXCIrSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5jcmVhdGVSZXF1ZXN0T3B0aW9ucygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLnNlcnZlclVybCtcIi91c2VyL2xvZ2luXCIsIHsgZGF0YSB9LCB7IGhlYWRlcnM6IG9wdGlvbnMgfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZVJlcXVlc3RPcHRpb25zKCkge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgLy8gIGhlYWRlcnMuc2V0KFwiQXV0aEtleVwiLCBcIm15LWtleVwiKTtcclxuICAgICAgIC8vIGhlYWRlcnMuc2V0KFwidG9rZW5cIiwgXCJteS10b2tlblwiKTtcclxuICAgICAgICBoZWFkZXJzLnNldChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAgaGVhZGVycy5zZXQoXCJYLUFjY2Vzc1Rva2VuXCIsIFwiYmRmYjdhNjFlNjBiOTRkMDc5MjZlMzJiNmY0NmJkY2Q4M2JkMjFmYjI2N2MxMTNjMTM5OWViMmU2OTU5NTQyOVwiKTtcclxuICAgICAgICByZXR1cm4gaGVhZGVycztcclxuICAgIH1cclxuXHJcbn1cclxuIl19