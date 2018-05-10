"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var application_settings_1 = require("tns-core-modules/application-settings");
var http_1 = require("@angular/http");
var AddnewAddressService = /** @class */ (function () {
    function AddnewAddressService(http) {
        this.http = http;
        this.serverUrl = "http://46.101.88.80:81";
    }
    AddnewAddressService.prototype.post_new_location = function (data) {
        // console.log(JSON.stringify(data));
        var options = this.createRequestOptions();
        return this.http.post(this.serverUrl + "/add/location", { data: data }, { headers: options })
            .map(function (res) { return res; });
    };
    AddnewAddressService.prototype.createRequestOptions = function () {
        var headers = new http_1.Headers();
        var user_token = application_settings_1.getString("access_token");
        //headers.set("AuthKey", "my-key");
        headers.set("token", user_token);
        headers.set("Content-Type", "application/json");
        return headers;
    };
    AddnewAddressService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AddnewAddressService);
    return AddnewAddressService;
}());
exports.AddnewAddressService = AddnewAddressService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLW5ldy1hZGRyZXNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGQtbmV3LWFkZHJlc3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUczQyxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBQzlCLDhFQUFnRTtBQUNoRSxzQ0FBOEM7QUFFOUM7SUFPSSw4QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFGdEIsY0FBUyxHQUFHLHdCQUF3QixDQUFDO0lBRVgsQ0FBQztJQUduQyxnREFBaUIsR0FBakIsVUFBa0IsSUFBUztRQUN4QixxQ0FBcUM7UUFDcEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxNQUFBLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUNoRixHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVPLG1EQUFvQixHQUE1QjtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUM7UUFDNUIsSUFBSSxVQUFVLEdBQUMsZ0NBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6QyxtQ0FBbUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUF4QlEsb0JBQW9CO1FBRGhDLGlCQUFVLEVBQUU7eUNBUWlCLFdBQUk7T0FQckIsb0JBQW9CLENBMkJoQztJQUFELDJCQUFDO0NBQUEsQUEzQkQsSUEyQkM7QUEzQlksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5pbXBvcnQge2dldFN0cmluZ30gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycyB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFkZG5ld0FkZHJlc3NTZXJ2aWNlIHtcclxuXHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIHNlcnZlclVybCA9IFwiaHR0cDovLzQ2LjEwMS44OC44MDo4MVwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkgeyB9XHJcblxyXG5cclxuICAgIHBvc3RfbmV3X2xvY2F0aW9uKGRhdGE6IGFueSkge1xyXG4gICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5jcmVhdGVSZXF1ZXN0T3B0aW9ucygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLnNlcnZlclVybCtcIi9hZGQvbG9jYXRpb25cIiwgeyBkYXRhIH0sIHsgaGVhZGVyczogb3B0aW9ucyB9KVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlUmVxdWVzdE9wdGlvbnMoKSB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGxldCB1c2VyX3Rva2VuPWdldFN0cmluZyhcImFjY2Vzc190b2tlblwiKTtcclxuICAgICAgICAvL2hlYWRlcnMuc2V0KFwiQXV0aEtleVwiLCBcIm15LWtleVwiKTtcclxuICAgICAgICBoZWFkZXJzLnNldChcInRva2VuXCIsIHVzZXJfdG9rZW4pO1xyXG4gICAgICAgIGhlYWRlcnMuc2V0KFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICByZXR1cm4gaGVhZGVycztcclxuICAgIH1cclxuXHJcblxyXG59XHJcbiJdfQ==