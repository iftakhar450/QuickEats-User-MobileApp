"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var nativescript_angular_1 = require("nativescript-angular");
var change_password_service_1 = require("./change-password.service");
var application_settings_1 = require("tns-core-modules/application-settings");
var router_1 = require("@angular/router");
var changePasswordComponent = /** @class */ (function () {
    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.
    function changePasswordComponent(routerExtensions, page, router, changepasswordservice) {
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.router = router;
        this.changepasswordservice = changepasswordservice;
    }
    changePasswordComponent.prototype.ngOnInit = function () {
    };
    changePasswordComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    changePasswordComponent.prototype.togglepassowrdone = function () {
        var tfield = this.page.getViewById("cpassword");
        tfield.secure = !tfield.secure;
    };
    changePasswordComponent.prototype.togglepassowrdtwo = function () {
        var tfield = this.page.getViewById("npassword1");
        tfield.secure = !tfield.secure;
    };
    changePasswordComponent.prototype.togglepassowrdthree = function () {
        var tfield = this.page.getViewById("npassword2");
        tfield.secure = !tfield.secure;
    };
    changePasswordComponent.prototype.goBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    changePasswordComponent.prototype.changepasswordbtn = function () {
        var _this = this;
        //alert("called"+this.new_password1+this.new_password2+this.current_password);
        if ((this.current_password != null || this.current_password != "") && (this.new_password1 != null || this.new_password1 != "")
            && (this.new_password2 || this.new_password2 != "")) {
            if (this.new_password1 == this.new_password2) {
                this.changepasswordservice.changepasswordapi({ curr_password: this.current_password, new_password: this.new_password1 })
                    .subscribe(function (res) {
                    //console.log("Success"+JSON.stringify(res));
                    var helper = JSON.parse(JSON.stringify(res));
                    alert(helper._body.message);
                    //this.sidedrawer.logout();
                    console.log("logout");
                    application_settings_1.setString("access_token", "");
                    application_settings_1.setString("name", "");
                    application_settings_1.setString("email", "");
                    application_settings_1.setString("user_pc", "");
                    _this.router.navigate(["/logout"]);
                }, function (error) {
                    var string_response = JSON.stringify(error);
                    //console.log(JSON.stringify(error));
                    alert(JSON.stringify(error._body.message));
                });
            }
            else {
                alert("New password incorrect");
            }
        }
        else {
            alert("All field required");
        }
    };
    changePasswordComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./change-password.component.html",
            styleUrls: ['./change-password.css']
        }),
        __metadata("design:paramtypes", [nativescript_angular_1.RouterExtensions, page_1.Page, router_1.Router, change_password_service_1.changePasswordService])
    ], changePasswordComponent);
    return changePasswordComponent;
}());
exports.changePasswordComponent = changePasswordComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLXBhc3N3b3JkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYW5nZS1wYXNzd29yZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsZ0NBQStCO0FBQy9CLDZEQUFzRDtBQUN0RCxxRUFBZ0U7QUFJaEUsOEVBQW9IO0FBQ3BILDBDQUF5QztBQVV6QztJQU9JLDRJQUE0STtJQUM1SSxpSEFBaUg7SUFDakgsaUNBQW9CLGdCQUFrQyxFQUFTLElBQVUsRUFBUyxNQUFhLEVBQVMscUJBQTJDO1FBQS9ILHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBTztRQUFTLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBc0I7SUFJbkosQ0FBQztJQUVELDBDQUFRLEdBQVI7SUFLQSxDQUFDO0lBQ0QsNkNBQVcsR0FBWDtRQUNJLDRDQUE0QztRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUNELG1EQUFpQixHQUFqQjtRQUVJLElBQUksTUFBTSxHQUF5QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0RSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNuQyxDQUFDO0lBQ0QsbURBQWlCLEdBQWpCO1FBRUksSUFBSSxNQUFNLEdBQXlCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ25DLENBQUM7SUFDRCxxREFBbUIsR0FBbkI7UUFFSSxJQUFJLE1BQU0sR0FBeUIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdkUsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbkMsQ0FBQztJQUNNLHdDQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBR0QsbURBQWlCLEdBQWpCO1FBQUEsaUJBNkNDO1FBMUNHLDhFQUE4RTtRQUM5RSxFQUFFLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBRSxFQUFFLENBQUM7ZUFDOUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBRW5ELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBLENBQUM7Z0JBRXhDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxhQUFhLEVBQUMsQ0FBQztxQkFDOUcsU0FBUyxDQUFDLFVBQUEsR0FBRztvQkFDTiw2Q0FBNkM7b0JBQzdDLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUMzQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDNUIsMkJBQTJCO29CQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUV0QixnQ0FBUyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDOUIsZ0NBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3RCLGdDQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUN2QixnQ0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDekIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDLEVBQ0QsVUFBQyxLQUFLO29CQUVGLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRTVDLHFDQUFxQztvQkFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUcvQyxDQUFDLENBQUMsQ0FBQztZQUVkLENBQUM7WUFBQSxJQUFJLENBQUEsQ0FBQztnQkFHRixLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNwQyxDQUFDO1FBRUwsQ0FBQztRQUNELElBQUksQ0FBQSxDQUFDO1lBRUQsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFaEMsQ0FBQztJQUNMLENBQUM7SUExRlEsdUJBQXVCO1FBUG5DLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUV2QyxDQUFDO3lDQVV3Qyx1Q0FBZ0IsRUFBZSxXQUFJLEVBQWdCLGVBQU0sRUFBK0IsK0NBQXFCO09BVDFJLHVCQUF1QixDQTJGbkM7SUFBRCw4QkFBQztDQUFBLEFBM0ZELElBMkZDO0FBM0ZZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIlxyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcclxuaW1wb3J0IHtjaGFuZ2VQYXNzd29yZFNlcnZpY2V9IGZyb20gXCIuL2NoYW5nZS1wYXNzd29yZC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7U2lkZURyYXdlclBhZ2VDb21wb25lbnR9IGZyb20gXCIuLi9zaGFyZWQvc2lkZS1kcmF3ZXItcGFnZS9zaWRlLWRyYXdlci1wYWdlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQge015ZGV0YWlsU2VydmljZX0gZnJvbSBcIi4uL215ZGV0YWlsL215ZGV0YWlsLmNvbXBvbmVudC5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQge3NldFN0cmluZyxnZXRTdHJpbmcsc2V0TnVtYmVyLGdldE51bWJlcixzZXRCb29sZWFuLGdldEJvb2xlYW59IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9jaGFuZ2UtcGFzc3dvcmQuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL2NoYW5nZS1wYXNzd29yZC5jc3MnXVxyXG5cclxufSlcclxuZXhwb3J0IGNsYXNzIGNoYW5nZVBhc3N3b3JkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBwdWJsaWMgY3VycmVudF9wYXNzd29yZDogc3RyaW5nO1xyXG4gICAgcHVibGljIG5ld19wYXNzd29yZDE6IHN0cmluZztcclxuICAgIHB1YmxpYyBuZXdfcGFzc3dvcmQyOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2lkZWRyYXdlcjpTaWRlRHJhd2VyUGFnZUNvbXBvbmVudDtcclxuXHJcbiAgICAvLyBUaGlzIHBhdHRlcm4gbWFrZXMgdXNlIG9mIEFuZ3VsYXLvv71zIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGltcGxlbWVudGF0aW9uIHRvIGluamVjdCBhbiBpbnN0YW5jZSBvZiB0aGUgSXRlbVNlcnZpY2Ugc2VydmljZSBpbnRvIHRoaXMgY2xhc3MuXHJcbiAgICAvLyBBbmd1bGFyIGtub3dzIGFib3V0IHRoaXMgc2VydmljZSBiZWNhdXNlIGl0IGlzIGluY2x1ZGVkIGluIHlvdXIgYXBw77+9cyBtYWluIE5nTW9kdWxlLCBkZWZpbmVkIGluIGFwcC5tb2R1bGUudHMuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMscHJpdmF0ZSBwYWdlOiBQYWdlLHByaXZhdGUgcm91dGVyOlJvdXRlcixwcml2YXRlIGNoYW5nZXBhc3N3b3Jkc2VydmljZTpjaGFuZ2VQYXNzd29yZFNlcnZpY2UpIHtcclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcblxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBvbk5hdkJ0blRhcCgpIHtcclxuICAgICAgICAvLyBUaGlzIGNvZGUgd2lsbCBiZSBjYWxsZWQgb25seSBpbiBBbmRyb2lkLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGlvbiBidXR0b24gdGFwcGVkIVwiKTtcclxuICAgIH1cclxuICAgIHRvZ2dsZXBhc3Nvd3Jkb25lKCkge1xyXG5cclxuICAgICAgICBsZXQgdGZpZWxkOiBUZXh0RmllbGQgPSA8VGV4dEZpZWxkPnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImNwYXNzd29yZFwiKTtcclxuICAgICAgICB0ZmllbGQuc2VjdXJlID0gIXRmaWVsZC5zZWN1cmU7XHJcbiAgICB9XHJcbiAgICB0b2dnbGVwYXNzb3dyZHR3bygpIHtcclxuXHJcbiAgICAgICAgbGV0IHRmaWVsZDogVGV4dEZpZWxkID0gPFRleHRGaWVsZD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJucGFzc3dvcmQxXCIpO1xyXG4gICAgICAgIHRmaWVsZC5zZWN1cmUgPSAhdGZpZWxkLnNlY3VyZTtcclxuICAgIH1cclxuICAgIHRvZ2dsZXBhc3Nvd3JkdGhyZWUoKSB7XHJcblxyXG4gICAgICAgIGxldCB0ZmllbGQ6IFRleHRGaWVsZCA9IDxUZXh0RmllbGQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwibnBhc3N3b3JkMlwiKTtcclxuICAgICAgICB0ZmllbGQuc2VjdXJlID0gIXRmaWVsZC5zZWN1cmU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY2hhbmdlcGFzc3dvcmRidG4oKXtcclxuXHJcblxyXG4gICAgICAgIC8vYWxlcnQoXCJjYWxsZWRcIit0aGlzLm5ld19wYXNzd29yZDErdGhpcy5uZXdfcGFzc3dvcmQyK3RoaXMuY3VycmVudF9wYXNzd29yZCk7XHJcbiAgICAgICAgaWYoKHRoaXMuY3VycmVudF9wYXNzd29yZCE9bnVsbCB8fCB0aGlzLmN1cnJlbnRfcGFzc3dvcmQhPVwiXCIpICYmICh0aGlzLm5ld19wYXNzd29yZDEhPW51bGwgfHwgdGhpcy5uZXdfcGFzc3dvcmQxIT1cIlwiKVxyXG4gICAgICAgICAgICAmJiAodGhpcy5uZXdfcGFzc3dvcmQyIHx8IHRoaXMubmV3X3Bhc3N3b3JkMiE9XCJcIikpe1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5uZXdfcGFzc3dvcmQxPT10aGlzLm5ld19wYXNzd29yZDIpe1xyXG5cclxuICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VwYXNzd29yZHNlcnZpY2UuY2hhbmdlcGFzc3dvcmRhcGkoe2N1cnJfcGFzc3dvcmQ6dGhpcy5jdXJyZW50X3Bhc3N3b3JkLG5ld19wYXNzd29yZDp0aGlzLm5ld19wYXNzd29yZDF9KVxyXG4gICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiU3VjY2Vzc1wiK0pTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVscGVyPUpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGhlbHBlci5fYm9keS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNpZGVkcmF3ZXIubG9nb3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9nb3V0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U3RyaW5nKFwiYWNjZXNzX3Rva2VuXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTdHJpbmcoXCJuYW1lXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTdHJpbmcoXCJlbWFpbFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U3RyaW5nKFwidXNlcl9wY1wiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2xvZ291dFwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHJpbmdfcmVzcG9uc2UgPSBKU09OLnN0cmluZ2lmeShlcnJvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KEpTT04uc3RyaW5naWZ5KGVycm9yLl9ib2R5Lm1lc3NhZ2UpKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiTmV3IHBhc3N3b3JkIGluY29ycmVjdFwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuXHJcbiAgICAgICAgICAgIGFsZXJ0KFwiQWxsIGZpZWxkIHJlcXVpcmVkXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==