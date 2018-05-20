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
        //   this.test();
    };
    /*  test(){
          console.log("enter");
          this.myloginservice
              .testservice()
              .subscribe(res => {
                     alert(JSON.stringify(res));
  
  
                  },
                  (error) => {
  
                      let string_response = JSON.stringify(error);
  
                      //alert("user not exsist");
                      alert("error"+JSON.stringify(error));
                      //alert(JSON.stringify(error._body.message));
  
  
                  });
  
  
      }*/
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELGdDQUErQjtBQUMvQiw2REFBc0Q7QUFFdEQsaURBQTZDO0FBQzdDLDhFQUFvSDtBQUNwSCwwQ0FBeUM7QUFLekMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFRMUM7SUFPSSw2SUFBNkk7SUFDN0ksaUhBQWlIO0lBQ2xILHdCQUFvQixnQkFBa0MsRUFBUyxJQUFVLEVBQVMsY0FBMkIsRUFBUyxNQUFhO1FBQS9HLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVMsbUJBQWMsR0FBZCxjQUFjLENBQWE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFPO1FBRS9ILElBQUksQ0FBQyxXQUFXLENBQUM7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUV4QixDQUFDO0lBRUEsaUNBQVEsR0FBUjtRQUVHOzs7WUFHSTtRQUVOLGlCQUFpQjtJQUNsQixDQUFDO0lBR0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQXFCSztJQUNILG9DQUFXLEdBQVg7UUFDSSw0Q0FBNEM7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFDRCxtQ0FBVSxHQUFWO1FBQ0csSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRXJDLENBQUM7SUFDRCxtQ0FBVSxHQUFWO1FBRUEsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBRSxFQUFFLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBRSxFQUFFLENBQUMsQ0FBQSxDQUFDO1lBQzVDLElBQUksTUFBSSxHQUFDLElBQUksQ0FBQztZQUNsQixNQUFJLENBQUMsY0FB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LFNBQVMsQ0FBQztRQUM3QixJQUFJLE1BQU0sR0FBNkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUVwRixNQUFNLENBQUMsVUFBVSxHQUFDLFVBQVUsQ0FBQztJQUlqQyxDQUFDO0lBNUtRLGNBQWM7UUFQMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztTQUU3QixDQUFDO3lDQVV1Qyx1Q0FBZ0IsRUFBZSxXQUFJLEVBQXdCLDRCQUFZLEVBQWdCLGVBQU07T0FUekgsY0FBYyxDQTZLMUI7SUFBRCxxQkFBQztDQUFBLEFBN0tELElBNktDO0FBN0tZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiXHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xyXG5pbXBvcnQge015ZGV0YWlsU2VydmljZX0gZnJvbSBcIi4uL215ZGV0YWlsL215ZGV0YWlsLmNvbXBvbmVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7bG9naW5TZXJ2aWNlfSBmcm9tIFwiLi9sb2dpbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7c2V0U3RyaW5nLGdldFN0cmluZyxzZXROdW1iZXIsZ2V0TnVtYmVyLHNldEJvb2xlYW4sZ2V0Qm9vbGVhbn0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge0xhYmVsfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYWJlbFwiO1xyXG5pbXBvcnQge0Fic29sdXRlTGF5b3V0fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2Fic29sdXRlLWxheW91dFwiO1xyXG5pbXBvcnQge0dyaWRMYXlvdXR9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZ3JpZC1sYXlvdXRcIjtcclxuaW1wb3J0IHtTdGFja0xheW91dH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcclxudmFyIFRvYXN0ID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC10b2FzdFwiKTtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbG9naW4uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL2xvZ2luLmNzcyddXHJcbiAgICBcclxufSlcclxuZXhwb3J0IGNsYXNzIGxvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgIHB1YmxpYyBsb2dpbl9lbWFpbDogc3RyaW5nO1xyXG4gICBwdWJsaWMgbG9naW5fcG9zc3dvcmQ6IHN0cmluZztcclxuICAgcHVibGljIHJlc2V0X2VtYWlsOiBzdHJpbmc7XHJcblxyXG5cclxuICAgIC8vIFRoaXMgcGF0dGVybiBtYWtlcyB1c2Ugb2YgQW5ndWxhcu+/vXMgZGVwZW5kZW5jeSBpbmplY3Rpb24gaW1wbGVtZW50YXRpb24gdG8gaW5qZWN0IGFuIGluc3RhbmNlIG9mIHRoZSBJdGVtU2VydmljZSBzZXJ2aWNlIGludG8gdGhpcyBjbGFzcy4gXHJcbiAgICAvLyBBbmd1bGFyIGtub3dzIGFib3V0IHRoaXMgc2VydmljZSBiZWNhdXNlIGl0IGlzIGluY2x1ZGVkIGluIHlvdXIgYXBw77+9cyBtYWluIE5nTW9kdWxlLCBkZWZpbmVkIGluIGFwcC5tb2R1bGUudHMuXHJcbiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxwcml2YXRlIHBhZ2U6IFBhZ2UscHJpdmF0ZSBteWxvZ2luc2VydmljZTpsb2dpblNlcnZpY2UscHJpdmF0ZSByb3V0ZXI6Um91dGVyKSB7XHJcblxyXG4gICAgICAgdGhpcy5sb2dpbl9lbWFpbDtcclxuICAgICAgIHRoaXMubG9naW5fcG9zc3dvcmQ7XHJcblxyXG4gICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgLyogaWYoZ2V0U3RyaW5nKFwiYWNjZXNzX3Rva2VuXCIpICE9bnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9yZXN0YXVyYW50c1wiXSk7XHJcblxyXG4gICAgICAgIH0qL1xyXG5cclxuICAgICAvLyAgIHRoaXMudGVzdCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgLyogIHRlc3QoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImVudGVyXCIpO1xyXG4gICAgICAgIHRoaXMubXlsb2dpbnNlcnZpY2VcclxuICAgICAgICAgICAgLnRlc3RzZXJ2aWNlKClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0cmluZ19yZXNwb25zZSA9IEpTT04uc3RyaW5naWZ5KGVycm9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hbGVydChcInVzZXIgbm90IGV4c2lzdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcImVycm9yXCIrSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0KEpTT04uc3RyaW5naWZ5KGVycm9yLl9ib2R5Lm1lc3NhZ2UpKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIH0qL1xyXG4gICAgb25OYXZCdG5UYXAoKSB7XHJcbiAgICAgICAgLy8gVGhpcyBjb2RlIHdpbGwgYmUgY2FsbGVkIG9ubHkgaW4gQW5kcm9pZC5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpb24gYnV0dG9uIHRhcHBlZCFcIik7XHJcbiAgICB9XHJcbiAgICBvblNpZ25wVGFwKCkge1xyXG4gICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc2lnbnVwJ10pO1xyXG5cclxuICAgIH1cclxuICAgIG9uTG9naW5UYXAoKSB7XHJcblxyXG4gICAgaWYodGhpcy5sb2dpbl9lbWFpbCE9XCJcIiAmJiB0aGlzLmxvZ2luX3Bvc3N3b3JkIT1cIlwiKXtcclxuICAgICAgICAgICAgbGV0IHRoYXQ9dGhpcztcclxuICAgICAgICB0aGF0Lm15bG9naW5zZXJ2aWNlXHJcbiAgICAgICAgICAgIC51c2VyX2xvZ2luX2FwaV9jYWxsKHsgdXNlcl9uYW1lOiB0aGF0LmxvZ2luX2VtYWlsLCB1c2VyX3Bhc3N3b3JkOiB0aGF0LmxvZ2luX3Bvc3N3b3JkIH0pXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5vblN1Y2Nlc3MocmVzKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0cmluZ19yZXNwb25zZSA9IEpTT04uc3RyaW5naWZ5KGVycm9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hbGVydChcInVzZXIgbm90IGV4c2lzdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChKU09OLnN0cmluZ2lmeShlcnJvci5fYm9keS5tZXNzYWdlKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH1lbHNle1xyXG5cclxuICAgICAgICBhbGVydChcIkVtYWlsIG9yIFBhc3N3b3JkIHJlcXVpcmVkXCIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25TdWNjZXNzKHJlcyl7XHJcblxyXG4gICAgICAgICAgICAgIGxldCBzdHJpbmdfcmVzcG9uc2UgPSBKU09OLnN0cmluZ2lmeShyZXMpO1xyXG4gICAgICAgICAgICAgIGxldCBoZWxwZXIgPSBKU09OLnBhcnNlKHN0cmluZ19yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgc2V0U3RyaW5nKFwiYWNjZXNzX3Rva2VuXCIsSlNPTi5zdHJpbmdpZnkoaGVscGVyLl9ib2R5LnVzZXIudXNlcl90b2tlbikpO1xyXG5cclxuICAgICAgICAgICAgICBzZXRTdHJpbmcoXCJ1c2VyX2lkXCIsSlNPTi5zdHJpbmdpZnkoaGVscGVyLl9ib2R5LnVzZXIudXNlcl9pZCkpO1xyXG4gICAgICAgICAgICAgIHNldFN0cmluZyhcImVtYWlsXCIsaGVscGVyLl9ib2R5LnVzZXIudXNlcl91c2VybmFtZSk7XHJcbiAgICAgICAgICAgICAgc2V0U3RyaW5nKFwibmFtZVwiLGhlbHBlci5fYm9keS51c2VyLnVzZXJfbmFtZSk7XHJcbiAgICAgICAgc2V0U3RyaW5nKFwidXNlcl9tb2JpbGVfbm9cIixKU09OLnN0cmluZ2lmeShoZWxwZXIuX2JvZHkudXNlci51c2VyX21vYmlsZV9ubykpO1xyXG4gICAgICAgLy8gc2V0U3RyaW5nKFwidXNlcl9hZGRyZXNzXCIsSlNPTi5zdHJpbmdpZnkoaGVscGVyLl9ib2R5LnVzZXIudXNlcl9hZGRyZXNzKSk7XHJcbiAgICAgIC8vICBzZXRTdHJpbmcoXCJ1c2VyX3BjXCIsSlNPTi5zdHJpbmdpZnkoaGVscGVyLl9ib2R5LnVzZXIudXNlcl9wb3N0YWxfY29kZSkpO1xyXG4gICAgICAgLy8gYWxlcnQoZ2V0U3RyaW5nKFwidXNlcl9hZGRyZXNzXCIpLGdldFN0cmluZyhcInVzZXJfYWRkcmVzc1wiKSk7XHJcblxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiampqampcIitnZXRTdHJpbmcoXCJ1c2VyX2lkXCIpLGdldFN0cmluZyhcImFjY2Vzc190b2tlblwiKSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3Jlc3RhdXJhbnRzXCJdKTtcclxuXHJcblxyXG5cclxuICAgIH1cclxuICAgIHRvZ2dsZXBhc3Nvd3JkKCkge1xyXG5cclxuICAgICAgICBsZXQgdGZpZWxkOiBUZXh0RmllbGQgPSA8VGV4dEZpZWxkPnRoaXMucGFnZS5nZXRWaWV3QnlJZChcInBhc3N3b3JkXCIpO1xyXG4gICAgICAgIHRmaWVsZC5zZWN1cmUgPSAhdGZpZWxkLnNlY3VyZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgZm9yZ290cGFzc3dvcmQoKXtcclxuICAgICAgICBsZXQgbGF5b3V0MTogR3JpZExheW91dCA9IDxHcmlkTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImxvZ2luZGl2XCIpO1xyXG4gICAgICAgIGxheW91dDEudmlzaWJpbGl0eT1cImNvbGxhcHNlXCI7XHJcbiAgICAgICAgbGV0IGxheW91dDogU3RhY2tMYXlvdXQgPSA8U3RhY2tMYXlvdXQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiZm9yZ290cGFzc3dvcmRsYWJlbFwiKTtcclxuXHJcbiAgICAgICAgbGF5b3V0LnZpc2liaWxpdHk9XCJ2aXNpYmxlXCI7XHJcblxyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9ucmVzZXRidG4oKXtcclxuXHJcbiAgICAgICAgaWYodGhpcy5yZXNldF9lbWFpbCE9bnVsbCApe1xyXG4gICAgICAgICAgICBsZXQgdGhhdD10aGlzO1xyXG4gICAgICAgICAgICB0aGF0Lm15bG9naW5zZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAudXNlcl9yZXNldF9wYXNzd29yZCh7IHVzZXJfbmFtZTogdGhhdC5yZXNldF9lbWFpbH0pXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhlbHBlcj1KU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIC8vIGFsZXJ0KGhlbHBlci5fYm9keS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvYXN0ID0gVG9hc3QubWFrZVRleHQoXCJZb3VyIFwiK2hlbHBlci5fYm9keS5tZXNzYWdlK1wiIHBsZWFzZSBDaGVjayBZb3VyIEVtYWlsIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3Quc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGF5b3V0MTogR3JpZExheW91dCA9IDxHcmlkTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImxvZ2luZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQxLnZpc2liaWxpdHk9XCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsYXlvdXQ6IFN0YWNrTGF5b3V0ID0gPFN0YWNrTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImZvcmdvdHBhc3N3b3JkbGFiZWxcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQudmlzaWJpbGl0eT1cImNvbGxhcHNlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcImVycm9yXCIrSlNPTi5zdHJpbmdpZnkoZXJyb3IuX2JvZHkubWVzc2FnZSkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRW1haWwgcmVxdWlyZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25yZXNldGxvZ2luKCl7XHJcblxyXG4gICAgICAgIGxldCBsYXlvdXQxOiBHcmlkTGF5b3V0ID0gPEdyaWRMYXlvdXQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwibG9naW5kaXZcIik7XHJcbiAgICAgICAgbGF5b3V0MS52aXNpYmlsaXR5PVwidmlzaWJsZVwiO1xyXG4gICAgICAgIGxldCBsYXlvdXQ6IFN0YWNrTGF5b3V0ID0gPFN0YWNrTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImZvcmdvdHBhc3N3b3JkbGFiZWxcIik7XHJcblxyXG4gICAgICAgIGxheW91dC52aXNpYmlsaXR5PVwiY29sbGFwc2VcIjtcclxuXHJcblxyXG5cclxuICAgIH1cclxufVxyXG4gXHJcbiJdfQ==