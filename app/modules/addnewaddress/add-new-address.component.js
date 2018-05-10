"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var map_service_1 = require("../maps/map.service");
var application_settings_1 = require("tns-core-modules/application-settings");
var add_new_address_service_1 = require("./add-new-address.service");
var router_1 = require("@angular/router");
var addnewaddressComponent = /** @class */ (function () {
    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.
    function addnewaddressComponent(router, page, mapservice, addnewlocservice) {
        this.router = router;
        this.page = page;
        this.mapservice = mapservice;
        this.addnewlocservice = addnewlocservice;
    }
    addnewaddressComponent.prototype.ngOnInit = function () {
        this.address_lin1 = this.mapservice.select_address;
        this.post_code = this.mapservice.postal_code;
    };
    addnewaddressComponent.prototype.submitLocation = function () {
        console.log("called");
        var that = this;
        this.addnewlocservice.post_new_location({ user_id: application_settings_1.getString("user_id"), user_nickname: this.nickname, user_flat_no: this.flatnumber, user_address: this.address_lin1, user_postal_code: this.post_code, user_phone_no: this.phone_number, rider_instructions: this.instruction_to_rider })
            .subscribe(function (res) {
            console.log("ffff" + JSON.stringify(res));
            var helper = JSON.stringify(res);
            var data = JSON.parse(helper);
            alert(JSON.stringify(data._body.message));
            that.router.navigate(['/deliveryaddress']);
        }, function (error) {
            //this.onGetDataError(error);
            ///alert("error");
            var helper = JSON.stringify(error);
            var data = JSON.parse(helper);
            console.log("error" + JSON.stringify(data._body));
            alert(JSON.stringify(data._body.error.message));
        });
    };
    addnewaddressComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./add-new-address.component.html",
            styleUrls: ['./add-new-address.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, page_1.Page, map_service_1.mapService, add_new_address_service_1.AddnewAddressService])
    ], addnewaddressComponent);
    return addnewaddressComponent;
}());
exports.addnewaddressComponent = addnewaddressComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLW5ldy1hZGRyZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkZC1uZXctYWRkcmVzcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsZ0NBQStCO0FBQy9CLG1EQUErQztBQUMvQyw4RUFBb0g7QUFDcEgscUVBQStEO0FBQy9ELDBDQUF5QztBQVF6QztJQVdJLDRJQUE0STtJQUM1SSxpSEFBaUg7SUFHakgsZ0NBQW9CLE1BQWEsRUFBUyxJQUFVLEVBQVMsVUFBcUIsRUFBUyxnQkFBcUM7UUFBNUcsV0FBTSxHQUFOLE1BQU0sQ0FBTztRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFXO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFxQjtJQUFJLENBQUM7SUFFckkseUNBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxZQUFZLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztJQUUvQyxDQUFDO0lBRUQsK0NBQWMsR0FBZDtRQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEIsSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLEVBQUUsT0FBTyxFQUFDLGdDQUFTLENBQUMsU0FBUyxDQUFDLEVBQUMsYUFBYSxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsZ0JBQWdCLEVBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxhQUFhLEVBQUMsSUFBSSxDQUFDLFlBQVksRUFBQyxrQkFBa0IsRUFBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzthQUN6USxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU5QixLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUE7UUFFOUMsQ0FBQyxFQUNHLFVBQUMsS0FBSztZQUNGLDZCQUE2QjtZQUM3QixrQkFBa0I7WUFDbEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDaEQsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUduRCxDQUFDLENBQUMsQ0FBQztJQUlmLENBQUM7SUFsRFEsc0JBQXNCO1FBUGxDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUV2QyxDQUFDO3lDQWdCNkIsZUFBTSxFQUFlLFdBQUksRUFBb0Isd0JBQVUsRUFBMEIsOENBQW9CO09BZnZILHNCQUFzQixDQW9EbEM7SUFBRCw2QkFBQztDQUFBLEFBcERELElBb0RDO0FBcERZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIlxyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHttYXBTZXJ2aWNlfSBmcm9tIFwiLi4vbWFwcy9tYXAuc2VydmljZVwiO1xyXG5pbXBvcnQge3NldFN0cmluZyxnZXRTdHJpbmcsc2V0TnVtYmVyLGdldE51bWJlcixzZXRCb29sZWFuLGdldEJvb2xlYW59IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7QWRkbmV3QWRkcmVzc1NlcnZpY2V9IGZyb20gXCIuL2FkZC1uZXctYWRkcmVzcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vYWRkLW5ldy1hZGRyZXNzLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hZGQtbmV3LWFkZHJlc3MuY3NzJ11cclxuXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBhZGRuZXdhZGRyZXNzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcblxyXG4gICAgcHVibGljIG5pY2tuYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZmxhdG51bWJlcjogc3RyaW5nO1xyXG4gICAgcHVibGljIGFkZHJlc3NfbGluMTogc3RyaW5nO1xyXG4gICAgcHVibGljIHBvc3RfY29kZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHBob25lX251bWJlcjogc3RyaW5nO1xyXG4gICAgcHVibGljIGluc3RydWN0aW9uX3RvX3JpZGVyOiBzdHJpbmc7XHJcblxyXG5cclxuICAgIC8vIFRoaXMgcGF0dGVybiBtYWtlcyB1c2Ugb2YgQW5ndWxhcu+/vXMgZGVwZW5kZW5jeSBpbmplY3Rpb24gaW1wbGVtZW50YXRpb24gdG8gaW5qZWN0IGFuIGluc3RhbmNlIG9mIHRoZSBJdGVtU2VydmljZSBzZXJ2aWNlIGludG8gdGhpcyBjbGFzcy5cclxuICAgIC8vIEFuZ3VsYXIga25vd3MgYWJvdXQgdGhpcyBzZXJ2aWNlIGJlY2F1c2UgaXQgaXMgaW5jbHVkZWQgaW4geW91ciBhcHDvv71zIG1haW4gTmdNb2R1bGUsIGRlZmluZWQgaW4gYXBwLm1vZHVsZS50cy5cclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6Um91dGVyLHByaXZhdGUgcGFnZTogUGFnZSxwcml2YXRlIG1hcHNlcnZpY2U6bWFwU2VydmljZSxwcml2YXRlIGFkZG5ld2xvY3NlcnZpY2U6QWRkbmV3QWRkcmVzc1NlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLmFkZHJlc3NfbGluMT10aGlzLm1hcHNlcnZpY2Uuc2VsZWN0X2FkZHJlc3M7XHJcbiAgICAgICAgdGhpcy5wb3N0X2NvZGU9dGhpcy5tYXBzZXJ2aWNlLnBvc3RhbF9jb2RlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdWJtaXRMb2NhdGlvbigpe1xyXG4gICAgY29uc29sZS5sb2coXCJjYWxsZWRcIik7XHJcbiAgICAgICAgbGV0IHRoYXQ9dGhpcztcclxuICAgICAgICB0aGlzLmFkZG5ld2xvY3NlcnZpY2UucG9zdF9uZXdfbG9jYXRpb24oeyB1c2VyX2lkOmdldFN0cmluZyhcInVzZXJfaWRcIiksdXNlcl9uaWNrbmFtZTp0aGlzLm5pY2tuYW1lLHVzZXJfZmxhdF9ubzp0aGlzLmZsYXRudW1iZXIsdXNlcl9hZGRyZXNzOnRoaXMuYWRkcmVzc19saW4xLHVzZXJfcG9zdGFsX2NvZGU6dGhpcy5wb3N0X2NvZGUsdXNlcl9waG9uZV9ubzp0aGlzLnBob25lX251bWJlcixyaWRlcl9pbnN0cnVjdGlvbnM6dGhpcy5pbnN0cnVjdGlvbl90b19yaWRlciB9KVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZmZmZcIiArIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlbHBlciA9IEpTT04uc3RyaW5naWZ5KHJlcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoaGVscGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhbGVydChKU09OLnN0cmluZ2lmeShkYXRhLl9ib2R5Lm1lc3NhZ2UpKTtcclxuICAgICAgICAgICAgICAgIHRoYXQucm91dGVyLm5hdmlnYXRlKFsnL2RlbGl2ZXJ5YWRkcmVzcyddKVxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8vYWxlcnQoXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGVscGVyID0gSlNPTi5zdHJpbmdpZnkoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShoZWxwZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIitKU09OLnN0cmluZ2lmeShkYXRhLl9ib2R5KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoSlNPTi5zdHJpbmdpZnkoZGF0YS5fYm9keS5lcnJvci5tZXNzYWdlKSlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==