"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var application_settings_1 = require("tns-core-modules/application-settings");
var CheckoutService = /** @class */ (function () {
    function CheckoutService(http) {
        this.http = http;
        this.serverUrl = "http://46.101.88.80:81";
    }
    CheckoutService.prototype.getlatlonfromapi = function (pc) {
        var headers = this.createRequestHeader();
        return this.http.get(this.serverUrl + "/get/latlon/" + pc, { headers: headers })
            .map(function (res) { return res; });
    };
    CheckoutService.prototype.post_order = function (data) {
        var options = this.headerForOrder();
        return this.http.post(this.serverUrl + "/post/order", { data: data }, { headers: options })
            .map(function (res) { return res; });
    };
    CheckoutService.prototype.headerForOrder = function () {
        var headers = new http_1.Headers();
        var user_token = application_settings_1.getString("access_token");
        //  headers.set("AuthKey", "my-key");
        headers.set("token", user_token);
        headers.set("Content-Type", "application/json");
        return headers;
    };
    CheckoutService.prototype.removeusercartapi = function (id) {
        var headers = this.createRequestHeader();
        return this.http.get(this.serverUrl + "/remove/cart/" + id, { headers: headers })
            .map(function (res) { return res; });
    };
    CheckoutService.prototype.createRequestHeader = function () {
        var headers = new http_1.Headers();
        var token = application_settings_1.getString("access_token");
        // set headers here e.g.
        //  headers.append("AuthKey", "my-key");
        headers.append("token", token);
        headers.append("Content-Type", "application/json");
        return headers;
    };
    CheckoutService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], CheckoutService);
    return CheckoutService;
}());
exports.CheckoutService = CheckoutService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoZWNrb3V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0Msc0NBQThDO0FBQzlDLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFDOUIsOEVBQWdFO0FBR2hFO0lBT0kseUJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBRnRCLGNBQVMsR0FBRyx3QkFBd0IsQ0FBQztJQUVYLENBQUM7SUFHbkMsMENBQWdCLEdBQWhCLFVBQWlCLEVBQUU7UUFDZixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBQyxjQUFjLEdBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ3ZFLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsb0NBQVUsR0FBVixVQUFXLElBQVM7UUFDaEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksTUFBQSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDOUUsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTyx3Q0FBYyxHQUF0QjtRQUVJLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUM7UUFDNUIsSUFBSSxVQUFVLEdBQUMsZ0NBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6QyxxQ0FBcUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCwyQ0FBaUIsR0FBakIsVUFBa0IsRUFBRTtRQUNoQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBQyxlQUFlLEdBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ3hFLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBSUQsNkNBQW1CLEdBQW5CO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLEtBQUssR0FBQyxnQ0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BDLHdCQUF3QjtRQUN4Qix3Q0FBd0M7UUFDeEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsS0FBSyxDQUFFLENBQUM7UUFDL0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUVuRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFqRFEsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQVFpQixXQUFJO09BUHJCLGVBQWUsQ0FtRDNCO0lBQUQsc0JBQUM7Q0FBQSxBQW5ERCxJQW1EQztBQW5EWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycyB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5pbXBvcnQge2dldFN0cmluZ30gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENoZWNrb3V0U2VydmljZSB7XHJcblxyXG5cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly80Ni4xMDEuODguODA6ODFcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxyXG5cclxuXHJcbiAgICBnZXRsYXRsb25mcm9tYXBpKHBjKSB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZlclVybCtcIi9nZXQvbGF0bG9uL1wiK3BjLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3N0X29yZGVyKGRhdGE6IGFueSkge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5oZWFkZXJGb3JPcmRlcigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLnNlcnZlclVybCtcIi9wb3N0L29yZGVyXCIsIHsgZGF0YSB9LCB7IGhlYWRlcnM6IG9wdGlvbnMgfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhlYWRlckZvck9yZGVyKCkge1xyXG5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgbGV0IHVzZXJfdG9rZW49Z2V0U3RyaW5nKFwiYWNjZXNzX3Rva2VuXCIpO1xyXG4gICAgICAgIC8vICBoZWFkZXJzLnNldChcIkF1dGhLZXlcIiwgXCJteS1rZXlcIik7XHJcbiAgICAgICAgaGVhZGVycy5zZXQoXCJ0b2tlblwiLCB1c2VyX3Rva2VuKTtcclxuICAgICAgICBoZWFkZXJzLnNldChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZldXNlcmNhcnRhcGkoaWQpIHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuc2VydmVyVXJsK1wiL3JlbW92ZS9jYXJ0L1wiK2lkLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGNyZWF0ZVJlcXVlc3RIZWFkZXIoKSB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGxldCB0b2tlbj1nZXRTdHJpbmcoXCJhY2Nlc3NfdG9rZW5cIik7XHJcbiAgICAgICAgLy8gc2V0IGhlYWRlcnMgaGVyZSBlLmcuXHJcbiAgICAgICAgLy8gIGhlYWRlcnMuYXBwZW5kKFwiQXV0aEtleVwiLCBcIm15LWtleVwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcInRva2VuXCIsdG9rZW4gKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=