"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var http_1 = require("@angular/http");
var page_1 = require("ui/page");
var application_settings_1 = require("tns-core-modules/application-settings");
var RestaurantService = /** @class */ (function () {
    function RestaurantService(http, page) {
        this.http = http;
        this.page = page;
        /* public restaurants = new Array<Restaurant>(
             { id: 1, name: "Rola Wala", url:"http://image.cleveland.com/home/cleve-media/width620/img/dining-guide/photo/cleveland-classic-restaurants-aldos-8e76cfa14bae1238.jpg", items: "Items", rating: "Rating", delivery_time: "20-30" },
             { id: 2, name: "LEON", url: "https://data.luebeck-tourismus.de/typo3temp/GB/csm_shutterstock_73748515_01_cf1fd34057_519ffe33ac.jpg", items: "Items", rating: "Rating", delivery_time: "20-30" },
             { id: 3, name: "LYSS", url: "http://stz.india.com/sites/default/files/styles/zeebiz_850x478/public/2017/06/21/20710-service2-pixabay.jpg", items: "Items", rating: "Rating", delivery_time: "20-30" },
             { id: 4, name: "WUWY", url: "http://svcdn.simpleviewinc.com/v3/cache/www_visitlagunabeach_com/A1CF40555EF76CBFA43D9747C3B492C9.jpg", items: "Items", rating: "Rating", delivery_time: "20-30" },
           
         );*/
        this.serverUrl = "http://46.101.88.80:81";
        this.restaurants = new Array();
    }
    RestaurantService.prototype.getRestaurants = function (data) {
        console.log("from service" + JSON.stringify(data));
        var options = this.createRequestOptions();
        return this.http.post(this.serverUrl + "/restaurant/getrestaurants", { data: data }, { headers: options })
            .map(function (res) { return res; });
    };
    RestaurantService.prototype.searchRestaurantsfromapi = function (postalCode) {
        console.log("Postal Code " + postalCode);
        var options = this.createRequestOptions();
        return this.http.post(this.serverUrl + "/search/restaurants", { postalCode: postalCode }, { headers: options })
            .map(function (res) { return res; });
    };
    RestaurantService.prototype.getRestaurant = function (id) {
        //console.log(this.restaurants[0].name);
        return this.restaurants.filter(function (item) { return item.id === id; })[0];
    };
    RestaurantService.prototype.getaddress_from_api = function (lat, lon) {
        var headers = this.createRequestHeader();
        return this.http.get(this.serverUrl + "/get/postalcode/" + lat + "/" + lon, { headers: headers })
            .map(function (res) { return res; });
    };
    RestaurantService.prototype.update_firebase_token = function (data) {
        var headers = this.createRequestHeader();
        return this.http.put(this.serverUrl + "/user/update/firebase", { data: data }, { headers: headers })
            .map(function (res) { return res; });
    };
    RestaurantService.prototype.createRequestHeader = function () {
        var headers = new http_1.Headers();
        var user_token = application_settings_1.getString("access_token");
        //headers.set("AuthKey", "my-key");
        headers.append("token", user_token);
        headers.append("Content-Type", "application/json");
        return headers;
    };
    RestaurantService.prototype.createRequestOptions = function () {
        var headers = new http_1.Headers();
        var user_token = application_settings_1.getString("access_token");
        //headers.set("AuthKey", "my-key");
        //headers.set("token", user_token);
        headers.set("Content-Type", "application/json");
        return headers;
    };
    RestaurantService.add_to_cart_items = []; ///make static to use in add_to_cart detail
    RestaurantService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, page_1.Page])
    ], RestaurantService);
    return RestaurantService;
}());
exports.RestaurantService = RestaurantService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGF1cmFudHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlc3RhdXJhbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsaUNBQStCO0FBRy9CLHNDQUE4QztBQUM5QyxnQ0FBNkI7QUFDN0IsOEVBQWdFO0FBSWhFO0lBZUksMkJBQW9CLElBQVUsRUFBUyxJQUFTO1FBQTVCLFNBQUksR0FBSixJQUFJLENBQU07UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFLO1FBZGpEOzs7Ozs7YUFNSztRQUVJLGNBQVMsR0FBRyx3QkFBd0IsQ0FBQztRQUV0QyxnQkFBVyxHQUFxQixJQUFJLEtBQUssRUFBYyxDQUFDO0lBSVgsQ0FBQztJQUNyRCwwQ0FBYyxHQUFkLFVBQWUsSUFBUztRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsNEJBQTRCLEVBQUUsRUFBQyxJQUFJLE1BQUEsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxDQUFDO2FBQzNGLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0Qsb0RBQXdCLEdBQXhCLFVBQXlCLFVBQWU7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLEVBQUUsRUFBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUM7YUFDckcsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFJRCx5Q0FBYSxHQUFiLFVBQWMsRUFBVTtRQUNwQix3Q0FBd0M7UUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQWQsQ0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQU1ELCtDQUFtQixHQUFuQixVQUFvQixHQUFPLEVBQUMsR0FBTztRQUMvQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUV6QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBQyxrQkFBa0IsR0FBQyxHQUFHLEdBQUMsR0FBRyxHQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUNwRixHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNELGlEQUFxQixHQUFyQixVQUFzQixJQUFJO1FBQ3RCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRXpDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFDLHVCQUF1QixFQUFDLEVBQUMsSUFBSSxNQUFBLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUNwRixHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVPLCtDQUFtQixHQUEzQjtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUM7UUFDNUIsSUFBSSxVQUFVLEdBQUMsZ0NBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6QyxtQ0FBbUM7UUFDbkMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDcEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUVuRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTyxnREFBb0IsR0FBNUI7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLElBQUksVUFBVSxHQUFDLGdDQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDekMsbUNBQW1DO1FBQ25DLG1DQUFtQztRQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQTVEYSxtQ0FBaUIsR0FBYyxFQUFFLENBQUMsQ0FBQSwyQ0FBMkM7SUFWbEYsaUJBQWlCO1FBRDdCLGlCQUFVLEVBQUU7eUNBZ0JpQixXQUFJLEVBQWMsV0FBSTtPQWZ2QyxpQkFBaUIsQ0EwRTdCO0lBQUQsd0JBQUM7Q0FBQSxBQTFFRCxJQTBFQztBQTFFWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCB7UmVzdGF1cmFudH0gZnJvbSBcIi4vcmVzdHVyYW50c1wiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHtQYWdlfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQge2dldFN0cmluZ30gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHtpdGVtZGV0YWlsfSBmcm9tIFwiLi4vcmVzdGF1cmFudC1kZXRhaWwvaXRlbWRldGFpbFwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUmVzdGF1cmFudFNlcnZpY2Uge1xyXG4gICAvKiBwdWJsaWMgcmVzdGF1cmFudHMgPSBuZXcgQXJyYXk8UmVzdGF1cmFudD4oXHJcbiAgICAgICAgeyBpZDogMSwgbmFtZTogXCJSb2xhIFdhbGFcIiwgdXJsOlwiaHR0cDovL2ltYWdlLmNsZXZlbGFuZC5jb20vaG9tZS9jbGV2ZS1tZWRpYS93aWR0aDYyMC9pbWcvZGluaW5nLWd1aWRlL3Bob3RvL2NsZXZlbGFuZC1jbGFzc2ljLXJlc3RhdXJhbnRzLWFsZG9zLThlNzZjZmExNGJhZTEyMzguanBnXCIsIGl0ZW1zOiBcIkl0ZW1zXCIsIHJhdGluZzogXCJSYXRpbmdcIiwgZGVsaXZlcnlfdGltZTogXCIyMC0zMFwiIH0sXHJcbiAgICAgICAgeyBpZDogMiwgbmFtZTogXCJMRU9OXCIsIHVybDogXCJodHRwczovL2RhdGEubHVlYmVjay10b3VyaXNtdXMuZGUvdHlwbzN0ZW1wL0dCL2NzbV9zaHV0dGVyc3RvY2tfNzM3NDg1MTVfMDFfY2YxZmQzNDA1N181MTlmZmUzM2FjLmpwZ1wiLCBpdGVtczogXCJJdGVtc1wiLCByYXRpbmc6IFwiUmF0aW5nXCIsIGRlbGl2ZXJ5X3RpbWU6IFwiMjAtMzBcIiB9LFxyXG4gICAgICAgIHsgaWQ6IDMsIG5hbWU6IFwiTFlTU1wiLCB1cmw6IFwiaHR0cDovL3N0ei5pbmRpYS5jb20vc2l0ZXMvZGVmYXVsdC9maWxlcy9zdHlsZXMvemVlYml6Xzg1MHg0NzgvcHVibGljLzIwMTcvMDYvMjEvMjA3MTAtc2VydmljZTItcGl4YWJheS5qcGdcIiwgaXRlbXM6IFwiSXRlbXNcIiwgcmF0aW5nOiBcIlJhdGluZ1wiLCBkZWxpdmVyeV90aW1lOiBcIjIwLTMwXCIgfSxcclxuICAgICAgICB7IGlkOiA0LCBuYW1lOiBcIldVV1lcIiwgdXJsOiBcImh0dHA6Ly9zdmNkbi5zaW1wbGV2aWV3aW5jLmNvbS92My9jYWNoZS93d3dfdmlzaXRsYWd1bmFiZWFjaF9jb20vQTFDRjQwNTU1RUY3NkNCRkE0M0Q5NzQ3QzNCNDkyQzkuanBnXCIsIGl0ZW1zOiBcIkl0ZW1zXCIsIHJhdGluZzogXCJSYXRpbmdcIiwgZGVsaXZlcnlfdGltZTogXCIyMC0zMFwiIH0sXHJcbiAgICAgIFxyXG4gICAgKTsqL1xyXG5cclxuICAgIHByaXZhdGUgc2VydmVyVXJsID0gXCJodHRwOi8vNDYuMTAxLjg4LjgwOjgxXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZF90b19jYXJ0X2l0ZW1zOml0ZW1kZXRhaWxbXT1bXTsvLy9tYWtlIHN0YXRpYyB0byB1c2UgaW4gYWRkX3RvX2NhcnQgZGV0YWlsXHJcbiAgICBwdWJsaWMgcmVzdGF1cmFudHM6QXJyYXk8UmVzdGF1cmFudD4gPSBuZXcgQXJyYXk8UmVzdGF1cmFudD4oKTtcclxuXHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCxwcml2YXRlIHBhZ2U6UGFnZSkgeyB9XHJcbiAgICBnZXRSZXN0YXVyYW50cyhkYXRhOiBhbnkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImZyb20gc2VydmljZVwiK0pTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuY3JlYXRlUmVxdWVzdE9wdGlvbnMoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5zZXJ2ZXJVcmwgKyBcIi9yZXN0YXVyYW50L2dldHJlc3RhdXJhbnRzXCIsIHtkYXRhfSwge2hlYWRlcnM6IG9wdGlvbnN9KVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpO1xyXG4gICAgfVxyXG4gICAgc2VhcmNoUmVzdGF1cmFudHNmcm9tYXBpKHBvc3RhbENvZGU6IGFueSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUG9zdGFsIENvZGUgXCIrcG9zdGFsQ29kZSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RPcHRpb25zKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuc2VydmVyVXJsICsgXCIvc2VhcmNoL3Jlc3RhdXJhbnRzXCIsIHtwb3N0YWxDb2RlOnBvc3RhbENvZGV9LCB7aGVhZGVyczogb3B0aW9uc30pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBnZXRSZXN0YXVyYW50KGlkOiBudW1iZXIpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5yZXN0YXVyYW50c1swXS5uYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXN0YXVyYW50cy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkID09PSBpZClbMF07XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIGdldGFkZHJlc3NfZnJvbV9hcGkobGF0OmFueSxsb246YW55KSB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZXJ2ZXJVcmwrXCIvZ2V0L3Bvc3RhbGNvZGUvXCIrbGF0K1wiL1wiK2xvbiwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVfZmlyZWJhc2VfdG9rZW4oZGF0YSkge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHRoaXMuc2VydmVyVXJsK1wiL3VzZXIvdXBkYXRlL2ZpcmViYXNlXCIse2RhdGF9ICx7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZVJlcXVlc3RIZWFkZXIoKSB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGxldCB1c2VyX3Rva2VuPWdldFN0cmluZyhcImFjY2Vzc190b2tlblwiKTtcclxuICAgICAgICAvL2hlYWRlcnMuc2V0KFwiQXV0aEtleVwiLCBcIm15LWtleVwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcInRva2VuXCIsIHVzZXJfdG9rZW4pO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVSZXF1ZXN0T3B0aW9ucygpIHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgbGV0IHVzZXJfdG9rZW49Z2V0U3RyaW5nKFwiYWNjZXNzX3Rva2VuXCIpO1xyXG4gICAgICAgIC8vaGVhZGVycy5zZXQoXCJBdXRoS2V5XCIsIFwibXkta2V5XCIpO1xyXG4gICAgICAgIC8vaGVhZGVycy5zZXQoXCJ0b2tlblwiLCB1c2VyX3Rva2VuKTtcclxuICAgICAgICBoZWFkZXJzLnNldChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuIl19