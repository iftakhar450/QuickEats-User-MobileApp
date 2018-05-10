"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var application_settings_1 = require("tns-core-modules/application-settings");
var orderService = /** @class */ (function () {
    function orderService(http) {
        this.http = http;
        this.serverUrl = "http://46.101.88.80:81";
    }
    orderService.prototype.getUserOrderDetailFromApi = function (id) {
        var headers = this.createRequestHeader();
        return this.http.get(this.serverUrl + "/get/orders/detail/" + id, { headers: headers })
            .map(function (res) { return res; });
    };
    orderService.prototype.createRequestHeader = function () {
        var headers = new http_1.Headers();
        var user_token = application_settings_1.getString("access_token");
        //headers.set("AuthKey", "my-key");
        headers.set("token", user_token);
        headers.append("Content-Type", "application/json");
        return headers;
    };
    orderService.ordersFromService = [];
    orderService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], orderService);
    return orderService;
}());
exports.orderService = orderService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9yZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFHM0Msc0NBQThDO0FBQzlDLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFDOUIsOEVBQWdFO0FBSWhFO0lBT0ksc0JBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBRnRCLGNBQVMsR0FBRyx3QkFBd0IsQ0FBQztJQUVYLENBQUM7SUFDbkMsZ0RBQXlCLEdBQXpCLFVBQTBCLEVBQUU7UUFDeEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUMscUJBQXFCLEdBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQzlFLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBT0QsMENBQW1CLEdBQW5CO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLFVBQVUsR0FBQyxnQ0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pDLG1DQUFtQztRQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRW5ELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQXpCRyw4QkFBaUIsR0FBVSxFQUFFLENBQUM7SUFGekIsWUFBWTtRQUR4QixpQkFBVSxFQUFFO3lDQVFpQixXQUFJO09BUHJCLFlBQVksQ0E2QnhCO0lBQUQsbUJBQUM7Q0FBQSxBQTdCRCxJQTZCQztBQTdCWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcbmltcG9ydCB7Z2V0U3RyaW5nfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQge09yZGVyc30gZnJvbSBcIi4vdXNlck9yZGVyc1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3Mgb3JkZXJTZXJ2aWNlIHtcclxuXHJcbiBzdGF0aWMgb3JkZXJzRnJvbVNlcnZpY2U6T3JkZXJzW109W107XHJcbiBzdGF0aWMgb3JkZXJzTGVuZ3RoO1xyXG5cclxuICAgIHByaXZhdGUgc2VydmVyVXJsID0gXCJodHRwOi8vNDYuMTAxLjg4LjgwOjgxXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cclxuICAgIGdldFVzZXJPcmRlckRldGFpbEZyb21BcGkoaWQpIHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuc2VydmVyVXJsK1wiL2dldC9vcmRlcnMvZGV0YWlsL1wiK2lkLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIGNyZWF0ZVJlcXVlc3RIZWFkZXIoKSB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGxldCB1c2VyX3Rva2VuPWdldFN0cmluZyhcImFjY2Vzc190b2tlblwiKTtcclxuICAgICAgICAvL2hlYWRlcnMuc2V0KFwiQXV0aEtleVwiLCBcIm15LWtleVwiKTtcclxuICAgICAgICBoZWFkZXJzLnNldChcInRva2VuXCIsIHVzZXJfdG9rZW4pO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==