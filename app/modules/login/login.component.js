"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var nativescript_angular_1 = require("nativescript-angular");
var login_service_1 = require("./login.service");
var application_settings_1 = require("tns-core-modules/application-settings");
var router_1 = require("@angular/router");
var Toast = require("nativescript-toast");
var loginComponent = /** @class */ (function () {
    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.
    function loginComponent(routerExtensions, page, myloginservice, router) {
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.myloginservice = myloginservice;
        this.router = router;
        this.login_email;
        this.login_possword;
    }
    loginComponent.prototype.ngOnInit = function () {
        /* if(getString("access_token") !=null){
             this.router.navigate(["/restaurants"]);
 
         }*/
    };
    loginComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    loginComponent.prototype.onSignpTap = function () {
        this.router.navigate(['/signup']);
    };
    loginComponent.prototype.onLoginTap = function () {
        if (this.login_email != "" && this.login_possword != "") {
            var that_1 = this;
            that_1.myloginservice
                .user_login_api_call({ user_name: that_1.login_email, user_password: that_1.login_possword })
                .subscribe(function (res) {
                console.log("Success");
                that_1.onSuccess(res);
            }, function (error) {
                var string_response = JSON.stringify(error);
                //alert("user not exsist");
                alert(JSON.stringify(error._body.message));
            });
        }
        else {
            alert("Email or Password required");
        }
    };
    loginComponent.prototype.onSuccess = function (res) {
        var string_response = JSON.stringify(res);
        var helper = JSON.parse(string_response);
        application_settings_1.setString("access_token", JSON.stringify(helper._body.user.user_token));
        application_settings_1.setString("user_id", JSON.stringify(helper._body.user.user_id));
        application_settings_1.setString("email", helper._body.user.user_username);
        application_settings_1.setString("name", helper._body.user.user_name);
        application_settings_1.setString("user_mobile_no", JSON.stringify(helper._body.user.user_mobile_no));
        // setString("user_address",JSON.stringify(helper._body.user.user_address));
        //  setString("user_pc",JSON.stringify(helper._body.user.user_postal_code));
        // alert(getString("user_address"),getString("user_address"));
        console.log("jjjjj" + application_settings_1.getString("user_id"), application_settings_1.getString("access_token"));
        this.router.navigate(["/restaurants"]);
    };
    loginComponent.prototype.togglepassowrd = function () {
        var tfield = this.page.getViewById("password");
        tfield.secure = !tfield.secure;
    };
    loginComponent.prototype.goBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    loginComponent.prototype.forgotpassword = function () {
        var layout1 = this.page.getViewById("logindiv");
        layout1.visibility = "collapse";
        var layout = this.page.getViewById("forgotpasswordlabel");
        layout.visibility = "visible";
    };
    loginComponent.prototype.onresetbtn = function () {
        var _this = this;
        if (this.reset_email != null) {
            var that = this;
            that.myloginservice
                .user_reset_password({ user_name: that.reset_email })
                .subscribe(function (res) {
                var helper = JSON.parse(JSON.stringify(res));
                // alert(helper._body.message);
                var toast = Toast.makeText("Your " + helper._body.message + " please Check Your Email!");
                toast.show();
                var layout1 = _this.page.getViewById("logindiv");
                layout1.visibility = "visible";
                var layout = _this.page.getViewById("forgotpasswordlabel");
                layout.visibility = "collapse";
            }, function (error) {
                ///
                alert("error" + JSON.stringify(error._body.message));
            });
        }
        else {
            alert("Email required");
        }
    };
    loginComponent.prototype.onresetlogin = function () {
        var layout1 = this.page.getViewById("logindiv");
        layout1.visibility = "visible";
        var layout = this.page.getViewById("forgotpasswordlabel");
        layout.visibility = "collapse";
    };
    loginComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./login.component.html",
            styleUrls: ['./login.css']
        }),
        __metadata("design:paramtypes", [nativescript_angular_1.RouterExtensions, page_1.Page, login_service_1.loginService, router_1.Router])
    ], loginComponent);
    return loginComponent;
}());
exports.loginComponent = loginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELGdDQUErQjtBQUMvQiw2REFBc0Q7QUFFdEQsaURBQTZDO0FBQzdDLDhFQUFvSDtBQUNwSCwwQ0FBeUM7QUFLekMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFRMUM7SUFPSSw2SUFBNkk7SUFDN0ksaUhBQWlIO0lBQ2xILHdCQUFvQixnQkFBa0MsRUFBUyxJQUFVLEVBQVMsY0FBMkIsRUFBUyxNQUFhO1FBQS9HLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVMsbUJBQWMsR0FBZCxjQUFjLENBQWE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFPO1FBRS9ILElBQUksQ0FBQyxXQUFXLENBQUM7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUV4QixDQUFDO0lBRUEsaUNBQVEsR0FBUjtRQUVHOzs7WUFHSTtJQUdQLENBQUM7SUFDRCxvQ0FBVyxHQUFYO1FBQ0ksNENBQTRDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0QsbUNBQVUsR0FBVjtRQUNHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUVyQyxDQUFDO0lBQ0QsbUNBQVUsR0FBVjtRQUVBLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUUsRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUUsRUFBRSxDQUFDLENBQUEsQ0FBQztZQUM1QyxJQUFJLE1BQUksR0FBQyxJQUFJLENBQUM7WUFDbEIsTUFBSSxDQUFDLGNBQWM7aUJBQ2QsbUJBQW1CLENBQUMsRUFBRSxTQUFTLEVBQUUsTUFBSSxDQUFD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QUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFcEYsTUFBTSxDQUFDLFVBQVUsR0FBQyxVQUFVLENBQUM7SUFJakMsQ0FBQztJQXBKUSxjQUFjO1FBUDFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7U0FFN0IsQ0FBQzt5Q0FVdUMsdUNBQWdCLEVBQWUsV0FBSSxFQUF3Qiw0QkFBWSxFQUFnQixlQUFNO09BVHpILGNBQWMsQ0FxSjFCO0lBQUQscUJBQUM7Q0FBQSxBQXJKRCxJQXFKQztBQXJKWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIlxyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcclxuaW1wb3J0IHtNeWRldGFpbFNlcnZpY2V9IGZyb20gXCIuLi9teWRldGFpbC9teWRldGFpbC5jb21wb25lbnQuc2VydmljZVwiO1xyXG5pbXBvcnQge2xvZ2luU2VydmljZX0gZnJvbSBcIi4vbG9naW4uc2VydmljZVwiO1xyXG5pbXBvcnQge3NldFN0cmluZyxnZXRTdHJpbmcsc2V0TnVtYmVyLGdldE51bWJlcixzZXRCb29sZWFuLGdldEJvb2xlYW59IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtMYWJlbH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWxcIjtcclxuaW1wb3J0IHtBYnNvbHV0ZUxheW91dH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9hYnNvbHV0ZS1sYXlvdXRcIjtcclxuaW1wb3J0IHtHcmlkTGF5b3V0fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2dyaWQtbGF5b3V0XCI7XHJcbmltcG9ydCB7U3RhY2tMYXlvdXR9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XHJcbnZhciBUb2FzdCA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtdG9hc3RcIik7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2xvZ2luLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9sb2dpbi5jc3MnXVxyXG4gICAgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBsb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICBwdWJsaWMgbG9naW5fZW1haWw6IHN0cmluZztcclxuICAgcHVibGljIGxvZ2luX3Bvc3N3b3JkOiBzdHJpbmc7XHJcbiAgIHB1YmxpYyByZXNldF9lbWFpbDogc3RyaW5nO1xyXG5cclxuXHJcbiAgICAvLyBUaGlzIHBhdHRlcm4gbWFrZXMgdXNlIG9mIEFuZ3VsYXLvv71zIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGltcGxlbWVudGF0aW9uIHRvIGluamVjdCBhbiBpbnN0YW5jZSBvZiB0aGUgSXRlbVNlcnZpY2Ugc2VydmljZSBpbnRvIHRoaXMgY2xhc3MuIFxyXG4gICAgLy8gQW5ndWxhciBrbm93cyBhYm91dCB0aGlzIHNlcnZpY2UgYmVjYXVzZSBpdCBpcyBpbmNsdWRlZCBpbiB5b3VyIGFwcO+/vXMgbWFpbiBOZ01vZHVsZSwgZGVmaW5lZCBpbiBhcHAubW9kdWxlLnRzLlxyXG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMscHJpdmF0ZSBwYWdlOiBQYWdlLHByaXZhdGUgbXlsb2dpbnNlcnZpY2U6bG9naW5TZXJ2aWNlLHByaXZhdGUgcm91dGVyOlJvdXRlcikge1xyXG5cclxuICAgICAgIHRoaXMubG9naW5fZW1haWw7XHJcbiAgICAgICB0aGlzLmxvZ2luX3Bvc3N3b3JkO1xyXG5cclxuICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgICAgIC8qIGlmKGdldFN0cmluZyhcImFjY2Vzc190b2tlblwiKSAhPW51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvcmVzdGF1cmFudHNcIl0pO1xyXG5cclxuICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBvbk5hdkJ0blRhcCgpIHtcclxuICAgICAgICAvLyBUaGlzIGNvZGUgd2lsbCBiZSBjYWxsZWQgb25seSBpbiBBbmRyb2lkLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGlvbiBidXR0b24gdGFwcGVkIVwiKTtcclxuICAgIH1cclxuICAgIG9uU2lnbnBUYXAoKSB7XHJcbiAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zaWdudXAnXSk7XHJcblxyXG4gICAgfVxyXG4gICAgb25Mb2dpblRhcCgpIHtcclxuXHJcbiAgICBpZih0aGlzLmxvZ2luX2VtYWlsIT1cIlwiICYmIHRoaXMubG9naW5fcG9zc3dvcmQhPVwiXCIpe1xyXG4gICAgICAgICAgICBsZXQgdGhhdD10aGlzO1xyXG4gICAgICAgIHRoYXQubXlsb2dpbnNlcnZpY2VcclxuICAgICAgICAgICAgLnVzZXJfbG9naW5fYXBpX2NhbGwoeyB1c2VyX25hbWU6IHRoYXQubG9naW5fZW1haWwsIHVzZXJfcGFzc3dvcmQ6IHRoYXQubG9naW5fcG9zc3dvcmQgfSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm9uU3VjY2VzcyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyaW5nX3Jlc3BvbnNlID0gSlNPTi5zdHJpbmdpZnkoZXJyb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0KFwidXNlciBub3QgZXhzaXN0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KEpTT04uc3RyaW5naWZ5KGVycm9yLl9ib2R5Lm1lc3NhZ2UpKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfWVsc2V7XHJcblxyXG4gICAgICAgIGFsZXJ0KFwiRW1haWwgb3IgUGFzc3dvcmQgcmVxdWlyZWRcIik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBvblN1Y2Nlc3MocmVzKXtcclxuXHJcbiAgICAgICAgICAgICAgbGV0IHN0cmluZ19yZXNwb25zZSA9IEpTT04uc3RyaW5naWZ5KHJlcyk7XHJcbiAgICAgICAgICAgICAgbGV0IGhlbHBlciA9IEpTT04ucGFyc2Uoc3RyaW5nX3Jlc3BvbnNlKTtcclxuICAgICAgICAgICAgICBzZXRTdHJpbmcoXCJhY2Nlc3NfdG9rZW5cIixKU09OLnN0cmluZ2lmeShoZWxwZXIuX2JvZHkudXNlci51c2VyX3Rva2VuKSk7XHJcblxyXG4gICAgICAgICAgICAgIHNldFN0cmluZyhcInVzZXJfaWRcIixKU09OLnN0cmluZ2lmeShoZWxwZXIuX2JvZHkudXNlci51c2VyX2lkKSk7XHJcbiAgICAgICAgICAgICAgc2V0U3RyaW5nKFwiZW1haWxcIixoZWxwZXIuX2JvZHkudXNlci51c2VyX3VzZXJuYW1lKTtcclxuICAgICAgICAgICAgICBzZXRTdHJpbmcoXCJuYW1lXCIsaGVscGVyLl9ib2R5LnVzZXIudXNlcl9uYW1lKTtcclxuICAgICAgICBzZXRTdHJpbmcoXCJ1c2VyX21vYmlsZV9ub1wiLEpTT04uc3RyaW5naWZ5KGhlbHBlci5fYm9keS51c2VyLnVzZXJfbW9iaWxlX25vKSk7XHJcbiAgICAgICAvLyBzZXRTdHJpbmcoXCJ1c2VyX2FkZHJlc3NcIixKU09OLnN0cmluZ2lmeShoZWxwZXIuX2JvZHkudXNlci51c2VyX2FkZHJlc3MpKTtcclxuICAgICAgLy8gIHNldFN0cmluZyhcInVzZXJfcGNcIixKU09OLnN0cmluZ2lmeShoZWxwZXIuX2JvZHkudXNlci51c2VyX3Bvc3RhbF9jb2RlKSk7XHJcbiAgICAgICAvLyBhbGVydChnZXRTdHJpbmcoXCJ1c2VyX2FkZHJlc3NcIiksZ2V0U3RyaW5nKFwidXNlcl9hZGRyZXNzXCIpKTtcclxuXHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJqampqalwiK2dldFN0cmluZyhcInVzZXJfaWRcIiksZ2V0U3RyaW5nKFwiYWNjZXNzX3Rva2VuXCIpKTtcclxuICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvcmVzdGF1cmFudHNcIl0pO1xyXG5cclxuXHJcblxyXG4gICAgfVxyXG4gICAgdG9nZ2xlcGFzc293cmQoKSB7XHJcblxyXG4gICAgICAgIGxldCB0ZmllbGQ6IFRleHRGaWVsZCA9IDxUZXh0RmllbGQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwicGFzc3dvcmRcIik7XHJcbiAgICAgICAgdGZpZWxkLnNlY3VyZSA9ICF0ZmllbGQuc2VjdXJlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBmb3Jnb3RwYXNzd29yZCgpe1xyXG4gICAgICAgIGxldCBsYXlvdXQxOiBHcmlkTGF5b3V0ID0gPEdyaWRMYXlvdXQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwibG9naW5kaXZcIik7XHJcbiAgICAgICAgbGF5b3V0MS52aXNpYmlsaXR5PVwiY29sbGFwc2VcIjtcclxuICAgICAgICBsZXQgbGF5b3V0OiBTdGFja0xheW91dCA9IDxTdGFja0xheW91dD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJmb3Jnb3RwYXNzd29yZGxhYmVsXCIpO1xyXG5cclxuICAgICAgICBsYXlvdXQudmlzaWJpbGl0eT1cInZpc2libGVcIjtcclxuXHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25yZXNldGJ0bigpe1xyXG5cclxuICAgICAgICBpZih0aGlzLnJlc2V0X2VtYWlsIT1udWxsICl7XHJcbiAgICAgICAgICAgIGxldCB0aGF0PXRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQubXlsb2dpbnNlcnZpY2VcclxuICAgICAgICAgICAgICAgIC51c2VyX3Jlc2V0X3Bhc3N3b3JkKHsgdXNlcl9uYW1lOiB0aGF0LnJlc2V0X2VtYWlsfSlcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGVscGVyPUpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxlcnQoaGVscGVyLl9ib2R5Lm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9hc3QgPSBUb2FzdC5tYWtlVGV4dChcIllvdXIgXCIraGVscGVyLl9ib2R5Lm1lc3NhZ2UrXCIgcGxlYXNlIENoZWNrIFlvdXIgRW1haWwhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2FzdC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsYXlvdXQxOiBHcmlkTGF5b3V0ID0gPEdyaWRMYXlvdXQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwibG9naW5kaXZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dDEudmlzaWJpbGl0eT1cInZpc2libGVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxheW91dDogU3RhY2tMYXlvdXQgPSA8U3RhY2tMYXlvdXQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiZm9yZ290cGFzc3dvcmRsYWJlbFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dC52aXNpYmlsaXR5PVwiY29sbGFwc2VcIjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiZXJyb3JcIitKU09OLnN0cmluZ2lmeShlcnJvci5fYm9keS5tZXNzYWdlKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgYWxlcnQoXCJFbWFpbCByZXF1aXJlZFwiKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbnJlc2V0bG9naW4oKXtcclxuXHJcbiAgICAgICAgbGV0IGxheW91dDE6IEdyaWRMYXlvdXQgPSA8R3JpZExheW91dD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJsb2dpbmRpdlwiKTtcclxuICAgICAgICBsYXlvdXQxLnZpc2liaWxpdHk9XCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgbGV0IGxheW91dDogU3RhY2tMYXlvdXQgPSA8U3RhY2tMYXlvdXQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiZm9yZ290cGFzc3dvcmRsYWJlbFwiKTtcclxuXHJcbiAgICAgICAgbGF5b3V0LnZpc2liaWxpdHk9XCJjb2xsYXBzZVwiO1xyXG5cclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiBcclxuIl19