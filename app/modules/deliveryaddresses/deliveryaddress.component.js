"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var deliveryaddress_service_1 = require("./deliveryaddress.service");
var deliveryaddress_1 = require("./deliveryaddress");
var application_settings_1 = require("tns-core-modules/application-settings");
var http = require("http");
var deliveryaddressComponent = /** @class */ (function () {
    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.
    function deliveryaddressComponent(page, deliveraddressservice) {
        this.page = page;
        this.deliveraddressservice = deliveraddressservice;
        this.user_loc = [];
    }
    deliveryaddressComponent.prototype.ngOnInit = function () {
        this.get_user_locations();
    };
    deliveryaddressComponent.prototype.get_user_locations = function () {
        var _this = this;
        var id = JSON.parse(application_settings_1.getString("user_id"));
        this.deliveraddressservice.get_user_locations_from_api(id)
            .subscribe(function (result) {
            //this.onGetDataSuccess(result);
            var helper = JSON.stringify(result);
            var data = JSON.parse(helper);
            _this.onsucces(data);
        }, function (error) {
            // this.onGetDataError(error);
            console.log(JSON.stringify(error));
        });
    };
    deliveryaddressComponent.prototype.onsucces = function (data) {
        //console.log(JSON.stringify(data.userLocations));
        var that = this;
        for (var i = 0; i < data._body.userLocations.length; i++) {
            var item = new deliveryaddress_1.locations(data._body.userLocations[i].user_address, data._body.userLocations[i].user_postal_code);
            that.user_loc.push(item);
            //console.log("called");
            console.log("call" + that.user_loc[i]);
        }
    };
    deliveryaddressComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./deliveryaddresses.component.html",
            styleUrls: ['./deliveryaddresses.css']
        }),
        __metadata("design:paramtypes", [page_1.Page, deliveryaddress_service_1.DeliverAddressService])
    ], deliveryaddressComponent);
    return deliveryaddressComponent;
}());
exports.deliveryaddressComponent = deliveryaddressComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsaXZlcnlhZGRyZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlbGl2ZXJ5YWRkcmVzcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsZ0NBQStCO0FBQy9CLHFFQUFnRTtBQUNoRSxxREFBNEM7QUFDNUMsOEVBQWdFO0FBQ2hFLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQVMzQjtJQVFJLDRJQUE0STtJQUM1SSxpSEFBaUg7SUFDakgsa0NBQW9CLElBQVUsRUFBUyxxQkFBMkM7UUFBOUQsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFTLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBc0I7UUFMdkUsYUFBUSxHQUFhLEVBQUUsQ0FBQztJQVNuQyxDQUFDO0lBRUQsMkNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFHRCxxREFBa0IsR0FBbEI7UUFBQSxpQkFtQkM7UUFsQkcsSUFBSSxFQUFFLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQ0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLDJCQUEyQixDQUFDLEVBQUUsQ0FBQzthQUNyRCxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ2QsZ0NBQWdDO1lBQ2hDLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsSUFBSSxJQUFJLEdBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBTzVCLENBQUMsRUFBRSxVQUFDLEtBQUs7WUFDTiw4QkFBOEI7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBSUQsMkNBQVEsR0FBUixVQUFTLElBQUk7UUFDVCxrREFBa0Q7UUFDOUMsSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDO1FBQ2xCLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDL0MsSUFBSSxJQUFJLEdBQUMsSUFBSSwyQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTdCLHdCQUF3QjtZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFHeEMsQ0FBQztJQUVMLENBQUM7SUF6RFEsd0JBQXdCO1FBUHBDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUV6QyxDQUFDO3lDQVc0QixXQUFJLEVBQStCLCtDQUFxQjtPQVZ6RSx3QkFBd0IsQ0EyRHBDO0lBQUQsK0JBQUM7Q0FBQSxBQTNERCxJQTJEQztBQTNEWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCJcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7RGVsaXZlckFkZHJlc3NTZXJ2aWNlfSBmcm9tIFwiLi9kZWxpdmVyeWFkZHJlc3Muc2VydmljZVwiO1xyXG5pbXBvcnQge2xvY2F0aW9uc30gZnJvbSBcIi4vZGVsaXZlcnlhZGRyZXNzXCI7XHJcbmltcG9ydCB7Z2V0U3RyaW5nfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vZGVsaXZlcnlhZGRyZXNzZXMuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL2RlbGl2ZXJ5YWRkcmVzc2VzLmNzcyddXHJcblxyXG59KVxyXG5leHBvcnQgY2xhc3MgZGVsaXZlcnlhZGRyZXNzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBwdWJsaWMgbG9naW5fZW1haWw6IHN0cmluZztcclxuICAgIHB1YmxpYyBsb2dpbl9wb3Nzd29yZDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgdXNlcl9sb2M6bG9jYXRpb25zW109W107XHJcblxyXG5cclxuICAgIC8vIFRoaXMgcGF0dGVybiBtYWtlcyB1c2Ugb2YgQW5ndWxhcu+/vXMgZGVwZW5kZW5jeSBpbmplY3Rpb24gaW1wbGVtZW50YXRpb24gdG8gaW5qZWN0IGFuIGluc3RhbmNlIG9mIHRoZSBJdGVtU2VydmljZSBzZXJ2aWNlIGludG8gdGhpcyBjbGFzcy5cclxuICAgIC8vIEFuZ3VsYXIga25vd3MgYWJvdXQgdGhpcyBzZXJ2aWNlIGJlY2F1c2UgaXQgaXMgaW5jbHVkZWQgaW4geW91ciBhcHDvv71zIG1haW4gTmdNb2R1bGUsIGRlZmluZWQgaW4gYXBwLm1vZHVsZS50cy5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSxwcml2YXRlIGRlbGl2ZXJhZGRyZXNzc2VydmljZTpEZWxpdmVyQWRkcmVzc1NlcnZpY2UpIHtcclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdldF91c2VyX2xvY2F0aW9ucygpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRfdXNlcl9sb2NhdGlvbnMoKSB7XHJcbiAgICAgICAgbGV0IGlkPUpTT04ucGFyc2UoZ2V0U3RyaW5nKFwidXNlcl9pZFwiKSk7XHJcblxyXG4gICAgICAgIHRoaXMuZGVsaXZlcmFkZHJlc3NzZXJ2aWNlLmdldF91c2VyX2xvY2F0aW9uc19mcm9tX2FwaShpZClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlbHBlcj1KU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPUpTT04ucGFyc2UoaGVscGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uc3VjY2VzKGRhdGEpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgLy8gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIG9uc3VjY2VzKGRhdGEpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YS51c2VyTG9jYXRpb25zKSk7XHJcbiAgICAgICAgICAgIGxldCB0aGF0PXRoaXM7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTxkYXRhLl9ib2R5LnVzZXJMb2NhdGlvbnMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtPW5ldyBsb2NhdGlvbnMoZGF0YS5fYm9keS51c2VyTG9jYXRpb25zW2ldLnVzZXJfYWRkcmVzcyxkYXRhLl9ib2R5LnVzZXJMb2NhdGlvbnNbaV0udXNlcl9wb3N0YWxfY29kZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnVzZXJfbG9jLnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2FsbGVkXCIpO1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FsbFwiK3RoYXQudXNlcl9sb2NbaV0pO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==