"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var nativescript_angular_1 = require("nativescript-angular");
var PaymentComponent = /** @class */ (function () {
    function PaymentComponent(routerExtensions, page) {
        this.routerExtensions = routerExtensions;
        this.page = page;
    }
    PaymentComponent.prototype.ngOnInit = function () {
    };
    PaymentComponent.prototype.togglepassowrd = function () {
        var cardtfield = this.page.getViewById("cardnum");
        cardtfield.secure = !cardtfield.secure;
    };
    PaymentComponent.prototype.saveCard = function () {
        alert("card saved");
    };
    PaymentComponent.prototype.goBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    PaymentComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./payment.component.html",
            styleUrls: ['./payment.component.css']
        }),
        __metadata("design:paramtypes", [nativescript_angular_1.RouterExtensions, page_1.Page])
    ], PaymentComponent);
    return PaymentComponent;
}());
exports.PaymentComponent = PaymentComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXltZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxnQ0FBK0I7QUFFL0IsNkRBQXNEO0FBV3REO0lBT0ksMEJBQW9CLGdCQUFrQyxFQUFTLElBQVU7UUFBckQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07SUFBSSxDQUFDO0lBRTlFLG1DQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQseUNBQWMsR0FBZDtRQUNJLElBQUksVUFBVSxHQUF1QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUMzQyxDQUFDO0lBQ0QsbUNBQVEsR0FBUjtRQUNJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBQ00saUNBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFyQlEsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUN6QyxDQUFDO3lDQVF3Qyx1Q0FBZ0IsRUFBZSxXQUFJO09BUGhFLGdCQUFnQixDQXNCNUI7SUFBRCx1QkFBQztDQUFBLEFBdEJELElBc0JDO0FBdEJZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtZmllbGRcIjtcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5cblxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BheW1lbnQuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9wYXltZW50LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQYXltZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHB1YmxpYyBjYXJkX251bTpudW1iZXI7XG4gICAgcHVibGljIGNhcmRfZXhwOm51bWJlcjtcbiAgICBwdWJsaWMgY2FyZF9jdnY6bnVtYmVyO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMscHJpdmF0ZSBwYWdlOiBQYWdlKSB7IH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIH1cblxuICAgIHRvZ2dsZXBhc3Nvd3JkKCl7XG4gICAgICAgIGxldCBjYXJkdGZpZWxkOlRleHRGaWVsZD08VGV4dEZpZWxkPiB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJjYXJkbnVtXCIpO1xuICAgICAgICBjYXJkdGZpZWxkLnNlY3VyZSA9ICFjYXJkdGZpZWxkLnNlY3VyZTtcbiAgICB9XG4gICAgc2F2ZUNhcmQoKXtcbiAgICAgICAgYWxlcnQoXCJjYXJkIHNhdmVkXCIpO1xuICAgIH1cbiAgICBwdWJsaWMgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XG4gICAgfVxufSJdfQ==