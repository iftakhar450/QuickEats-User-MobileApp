"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var order_service_1 = require("./order.service");
var application_settings_1 = require("tns-core-modules/application-settings");
var router_1 = require("@angular/router");
var MyordersComponent = /** @class */ (function () {
    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.
    function MyordersComponent(page, orderservice, router) {
        this.page = page;
        this.orderservice = orderservice;
        this.router = router;
        this.user_orders = [];
        this.orders = [];
        this.user_completed_orders = [];
        this.completed_orders = [];
        this.sta = 1;
        this.order_details = [];
        this.completed_order_details = [];
    }
    MyordersComponent.prototype.ngOnInit = function () {
        this.user_orders = order_service_1.orderService.ordersFromService;
        this.orderslength = order_service_1.orderService.ordersLength;
        var id = JSON.parse(application_settings_1.getString("user_id"));
    };
    MyordersComponent.prototype.refreshpage = function () {
        var _this = this;
        var currentUrl = this.router.url;
        var refreshUrl = currentUrl.indexOf('login') > -1 ? '/login' : '/login';
        this.router.navigateByUrl(refreshUrl).then(function () { return _this.router.navigateByUrl(currentUrl); });
    };
    MyordersComponent.prototype.search_restaurant_in_your_area = function () {
        this.router.navigate(["/restaurants"]);
    };
    MyordersComponent.prototype.CompletedOrderDetail = function (args) {
        alert("tapped" + this.user_completed_orders[args.index].order_status);
        this.order_details = this.user_completed_orders[args.index].menuitems;
        this.status = this.user_completed_orders[args.index].order_status;
        this.order_id = this.user_completed_orders[args.index].order_id;
        var ablayout = this.page.getViewById("completedorderdetail");
        ablayout.visibility = "visible";
    };
    MyordersComponent.prototype.PendingOrderDetail = function (args) {
        this.order_details = this.user_orders[args.index].menuitems;
        this.status = this.user_orders[args.index].order_status;
        this.order_id = this.user_orders[args.index].order_id;
        this.grossamount = this.user_orders[args.index].order_payment;
        this.ridertip = this.user_orders[args.index].rider_tip;
        this.totalamount = parseInt(this.user_orders[args.index].order_payment) + parseInt(this.ridertip);
        console.log("order detail" + JSON.stringify(this.user_orders[args.index]));
        console.log(this.user_orders[args.index]);
        var orderlist = this.page.getViewById("orderlist");
        orderlist.visibility = "collapse";
        var ablayout = this.page.getViewById("completedorderdetail");
        ablayout.visibility = "visible";
        var btn = this.page.getViewById("trackriderbtn");
        if (this.status == "Going") {
            btn.isEnabled = true;
            btn.opacity = 1;
        }
        else {
            btn.isEnabled = false;
            btn.opacity = .5;
        }
    };
    MyordersComponent.prototype.OkorderDetail = function () {
        var ablayout = this.page.getViewById("completedorderdetail");
        ablayout.visibility = "collapse";
        var orderlist = this.page.getViewById("orderlist");
        orderlist.visibility = "visible";
    };
    MyordersComponent.prototype.trackyourRider = function () {
        this.router.navigate(["/trackrider", this.order_id]);
    };
    MyordersComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./myorders.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            styleUrls: ['./myorders.css']
        }),
        __metadata("design:paramtypes", [page_1.Page, order_service_1.orderService, router_1.Router])
    ], MyordersComponent);
    return MyordersComponent;
}());
exports.MyordersComponent = MyordersComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlvcmRlcnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXlvcmRlcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBRXpFLGdDQUE2QjtBQUM3QixpREFBNkM7QUFDN0MsOEVBQWdFO0FBT2hFLDBDQUF1QztBQVV2QztJQW1CSSw0SUFBNEk7SUFDNUksaUhBQWlIO0lBR2pILDJCQUFvQixJQUFVLEVBQVUsWUFBMEIsRUFBVSxNQUFjO1FBQXRFLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFwQm5GLGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBUTNCLFdBQU0sR0FBYSxFQUFFLENBQUM7UUFDdEIsMEJBQXFCLEdBQWEsRUFBRSxDQUFDO1FBQ3JDLHFCQUFnQixHQUFhLEVBQUUsQ0FBQztRQUNoQyxRQUFHLEdBQVcsQ0FBQyxDQUFDO1FBQ2hCLGtCQUFhLEdBQVksRUFBRSxDQUFDO1FBQzVCLDRCQUF1QixHQUFZLEVBQUUsQ0FBQztJQVU3QyxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUMsNEJBQVksQ0FBQyxpQkFBaUIsQ0FBQztRQUNoRCxJQUFJLENBQUMsWUFBWSxHQUFDLDRCQUFZLENBQUMsWUFBWSxDQUFDO1FBRzVDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0NBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRTlDLENBQUM7SUFFRCx1Q0FBVyxHQUFYO1FBQUEsaUJBU0M7UUFMSSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNqQyxJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FB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bkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiXHJcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHtvcmRlclNlcnZpY2V9IGZyb20gXCIuL29yZGVyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtnZXRTdHJpbmd9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7T3JkZXJzfSBmcm9tIFwiLi91c2VyT3JkZXJzXCI7XHJcbmltcG9ydCB7SXRlbXN9IGZyb20gXCIuL0Zvb2RpdGVtXCI7XHJcbmltcG9ydCB7QWJzb2x1dGVMYXlvdXR9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvYWJzb2x1dGUtbGF5b3V0XCI7XHJcbmltcG9ydCB7QnV0dG9ufSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9idXR0b25cIjtcclxuaW1wb3J0IHtnZXRWaWV3QnlJZH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3LWJhc2VcIjtcclxuaW1wb3J0IHtTdGFja0xheW91dH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcclxuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL215b3JkZXJzLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIHN0eWxlVXJsczogWycuL215b3JkZXJzLmNzcyddXHJcblxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXlvcmRlcnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuXHJcbiAgICBwdWJsaWMgdXNlcl9vcmRlcnM6IE9yZGVyc1tdID0gW107XHJcbiAgICBwdWJsaWMgb3JkZXJzbGVuZ3RoOm51bWJlcjtcclxuICAgIHB1YmxpYyB0b3RhbGFtb3VudDphbnk7XHJcbiAgICBwdWJsaWMgcmlkZXJ0aXA6YW55O1xyXG4gICAgcHVibGljIGdyb3NzYW1vdW50OmFueTtcclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBvcmRlcnM6IE9yZGVyc1tdID0gW107XHJcbiAgICBwdWJsaWMgdXNlcl9jb21wbGV0ZWRfb3JkZXJzOiBPcmRlcnNbXSA9IFtdO1xyXG4gICAgcHVibGljIGNvbXBsZXRlZF9vcmRlcnM6IE9yZGVyc1tdID0gW107XHJcbiAgICBwdWJsaWMgc3RhOiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIG9yZGVyX2RldGFpbHM6IEl0ZW1zW10gPSBbXTtcclxuICAgIHB1YmxpYyBjb21wbGV0ZWRfb3JkZXJfZGV0YWlsczogSXRlbXNbXSA9IFtdO1xyXG4gICAgcHVibGljIHN0YXR1czogYW55O1xyXG4gICAgcHVibGljIG9yZGVyX2lkOiBhbnk7XHJcbiAgICAvLyBUaGlzIHBhdHRlcm4gbWFrZXMgdXNlIG9mIEFuZ3VsYXLvv71zIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGltcGxlbWVudGF0aW9uIHRvIGluamVjdCBhbiBpbnN0YW5jZSBvZiB0aGUgSXRlbVNlcnZpY2Ugc2VydmljZSBpbnRvIHRoaXMgY2xhc3MuXHJcbiAgICAvLyBBbmd1bGFyIGtub3dzIGFib3V0IHRoaXMgc2VydmljZSBiZWNhdXNlIGl0IGlzIGluY2x1ZGVkIGluIHlvdXIgYXBw77+9cyBtYWluIE5nTW9kdWxlLCBkZWZpbmVkIGluIGFwcC5tb2R1bGUudHMuXHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBvcmRlcnNlcnZpY2U6IG9yZGVyU2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51c2VyX29yZGVycz1vcmRlclNlcnZpY2Uub3JkZXJzRnJvbVNlcnZpY2U7XHJcbiAgICAgICAgdGhpcy5vcmRlcnNsZW5ndGg9b3JkZXJTZXJ2aWNlLm9yZGVyc0xlbmd0aDtcclxuXHJcblxyXG4gICAgICAgIGxldCBpZCA9IEpTT04ucGFyc2UoZ2V0U3RyaW5nKFwidXNlcl9pZFwiKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hwYWdlKCl7XHJcblxyXG5cclxuXHJcbiAgICAgICAgIHZhciBjdXJyZW50VXJsID0gdGhpcy5yb3V0ZXIudXJsO1xyXG4gICAgICAgICB2YXIgcmVmcmVzaFVybCA9IGN1cnJlbnRVcmwuaW5kZXhPZignbG9naW4nKSA+IC0xID8gJy9sb2dpbicgOiAnL2xvZ2luJztcclxuXHJcbiAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwocmVmcmVzaFVybCkudGhlbigoKSA9PiB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKGN1cnJlbnRVcmwpKTtcclxuXHJcbiAgICB9XHJcbiAgICBzZWFyY2hfcmVzdGF1cmFudF9pbl95b3VyX2FyZWEoKXtcclxuXHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3Jlc3RhdXJhbnRzXCJdKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgQ29tcGxldGVkT3JkZXJEZXRhaWwoYXJncykge1xyXG5cclxuXHJcbiAgICAgICAgYWxlcnQoXCJ0YXBwZWRcIiArIHRoaXMudXNlcl9jb21wbGV0ZWRfb3JkZXJzW2FyZ3MuaW5kZXhdLm9yZGVyX3N0YXR1cyk7XHJcbiAgICAgICAgdGhpcy5vcmRlcl9kZXRhaWxzID0gdGhpcy51c2VyX2NvbXBsZXRlZF9vcmRlcnNbYXJncy5pbmRleF0ubWVudWl0ZW1zO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gdGhpcy51c2VyX2NvbXBsZXRlZF9vcmRlcnNbYXJncy5pbmRleF0ub3JkZXJfc3RhdHVzO1xyXG4gICAgICAgIHRoaXMub3JkZXJfaWQgPSB0aGlzLnVzZXJfY29tcGxldGVkX29yZGVyc1thcmdzLmluZGV4XS5vcmRlcl9pZDtcclxuXHJcbiAgICAgICAgbGV0IGFibGF5b3V0OiBBYnNvbHV0ZUxheW91dCA9IDxBYnNvbHV0ZUxheW91dD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJjb21wbGV0ZWRvcmRlcmRldGFpbFwiKTtcclxuICAgICAgICBhYmxheW91dC52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFBlbmRpbmdPcmRlckRldGFpbChhcmdzKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5vcmRlcl9kZXRhaWxzID0gdGhpcy51c2VyX29yZGVyc1thcmdzLmluZGV4XS5tZW51aXRlbXM7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSB0aGlzLnVzZXJfb3JkZXJzW2FyZ3MuaW5kZXhdLm9yZGVyX3N0YXR1cztcclxuICAgICAgICB0aGlzLm9yZGVyX2lkID0gdGhpcy51c2VyX29yZGVyc1thcmdzLmluZGV4XS5vcmRlcl9pZDtcclxuICAgICAgICB0aGlzLmdyb3NzYW1vdW50ID0gdGhpcy51c2VyX29yZGVyc1thcmdzLmluZGV4XS5vcmRlcl9wYXltZW50O1xyXG5cclxuICAgICAgICB0aGlzLnJpZGVydGlwPXRoaXMudXNlcl9vcmRlcnNbYXJncy5pbmRleF0ucmlkZXJfdGlwO1xyXG4gICAgICAgIHRoaXMudG90YWxhbW91bnQ9cGFyc2VJbnQodGhpcy51c2VyX29yZGVyc1thcmdzLmluZGV4XS5vcmRlcl9wYXltZW50KStwYXJzZUludCh0aGlzLnJpZGVydGlwKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9yZGVyIGRldGFpbFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy51c2VyX29yZGVyc1thcmdzLmluZGV4XSkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlcl9vcmRlcnNbYXJncy5pbmRleF0pO1xyXG5cclxuICAgICAgICBsZXQgb3JkZXJsaXN0OiBBYnNvbHV0ZUxheW91dCA9IDxBYnNvbHV0ZUxheW91dD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJvcmRlcmxpc3RcIik7XHJcbiAgICAgICAgb3JkZXJsaXN0LnZpc2liaWxpdHk9XCJjb2xsYXBzZVwiO1xyXG4gICAgICAgIGxldCBhYmxheW91dDogQWJzb2x1dGVMYXlvdXQgPSA8QWJzb2x1dGVMYXlvdXQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiY29tcGxldGVkb3JkZXJkZXRhaWxcIik7XHJcbiAgICAgICAgYWJsYXlvdXQudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG5cclxuICAgICAgICBsZXQgYnRuOiBCdXR0b24gPSA8QnV0dG9uPnRoaXMucGFnZS5nZXRWaWV3QnlJZChcInRyYWNrcmlkZXJidG5cIik7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnN0YXR1cz09XCJHb2luZ1wiKXtcclxuICAgICAgICAgICAgICAgICAgICBidG4uaXNFbmFibGVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLm9wYWNpdHk9MTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBidG4uaXNFbmFibGVkPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5vcGFjaXR5PS41O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIE9rb3JkZXJEZXRhaWwoKSB7XHJcblxyXG5cclxuICAgICAgICBsZXQgYWJsYXlvdXQ6IEFic29sdXRlTGF5b3V0ID0gPEFic29sdXRlTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImNvbXBsZXRlZG9yZGVyZGV0YWlsXCIpO1xyXG4gICAgICAgIGFibGF5b3V0LnZpc2liaWxpdHkgPSBcImNvbGxhcHNlXCI7XHJcblxyXG4gICAgICAgIGxldCBvcmRlcmxpc3Q6IEFic29sdXRlTGF5b3V0ID0gPEFic29sdXRlTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcIm9yZGVybGlzdFwiKTtcclxuICAgICAgICBvcmRlcmxpc3QudmlzaWJpbGl0eT1cInZpc2libGVcIjtcclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICB0cmFja3lvdXJSaWRlcigpIHtcclxuXHJcblxyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90cmFja3JpZGVyXCIsIHRoaXMub3JkZXJfaWRdKTtcclxuICAgIH1cclxufVxyXG5cclxuIl19