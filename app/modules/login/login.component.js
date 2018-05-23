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
        // this.test();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELGdDQUErQjtBQUMvQiw2REFBc0Q7QUFFdEQsaURBQTZDO0FBQzdDLDhFQUFvSDtBQUNwSCwwQ0FBeUM7QUFLekMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFRMUM7SUFPSSw2SUFBNkk7SUFDN0ksaUhBQWlIO0lBQ2xILHdCQUFvQixnQkFBa0MsRUFBUyxJQUFVLEVBQVMsY0FBMkIsRUFBUyxNQUFhO1FBQS9HLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVMsbUJBQWMsR0FBZCxjQUFjLENBQWE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFPO1FBRS9ILElBQUksQ0FBQyxXQUFXLENBQUM7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUV4QixDQUFDO0lBRUEsaUNBQVEsR0FBUjtRQUVHOzs7WUFHSTtRQUVMLGVBQWU7SUFDakIsQ0FBQztJQUdIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FxQks7SUFDSCxvQ0FBVyxHQUFYO1FBQ0ksNENBQTRDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0QsbUNBQVUsR0FBVjtRQUNHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUVyQyxDQUFDO0lBQ0QsbUNBQVUsR0FBVjtRQUVBLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUUsRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUUsRUFBRSxDQUFDLENBQUEsQ0FBQztZQUM1QyxJQUFJLE1BQUksR0FBQyxJQUFJLENBQUM7WUFDbEIsTUFBSSxDQUFDLGNBQWM7aUJBQ2QsbUJBQW1CLENBQUMsRUFBRSxTQUFTLEVBQUUsTUFBSSxDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsTUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUN4RixTQUFTLENBQUMsVUFBQSxHQUFHO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEIsQ0FBQyxFQUNELFVBQUMsS0FBSztnQkFFRixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUU1QywyQkFBMkI7Z0JBQzNCLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUcvQyxDQUFDLENBQUMsQ0FBQztRQUVmLENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUVGLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7SUFHRCxDQUFDO0lBRUQsa0NBQVMsR0FBVCxVQUFVLEdBQUc7UUFFSCxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekMsZ0NBQVMsQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBRXZFLGdDQUFTLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMvRCxnQ0FBUyxDQUFDLE9BQU8sRUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuRCxnQ0FBUyxDQUFDLE1BQU0sRUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRCxnQ0FBUyxDQUFDLGdCQUFnQixFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUM5RSw0RUFBNEU7UUFDN0UsNEVBQTRFO1FBQzNFLDhEQUE4RDtRQUV2RCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBQyxnQ0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFDLGdDQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFJakQsQ0FBQztJQUNELHVDQUFjLEdBQWQ7UUFFSSxJQUFJLE1BQU0sR0FBeUIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckUsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbkMsQ0FBQztJQUNNLCtCQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBSUQsdUNBQWMsR0FBZDtRQUNJLElBQUksT0FBTyxHQUEyQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4RSxPQUFPLENBQUMsVUFBVSxHQUFDLFVBQVUsQ0FBQztRQUM5QixJQUFJLE1BQU0sR0FBNkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUVwRixNQUFNLENBQUMsVUFBVSxHQUFDLFNBQVMsQ0FBQztJQUtoQyxDQUFDO0lBRUQsbUNBQVUsR0FBVjtRQUFBLGlCQWdDQztRQTlCRyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFFLElBQUssQ0FBQyxDQUFBLENBQUM7WUFDeEIsSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDO1lBQ2QsSUFBSSxDQUFDLGNBQWM7aUJBQ2QsbUJBQW1CLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBQyxDQUFDO2lCQUNuRCxTQUFTLENBQUMsVUFBQSxHQUFHO2dCQUNWLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN4QywrQkFBK0I7Z0JBQzlCLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBQ3JGLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDYixJQUFJLE9BQU8sR0FBMkIsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3hFLE9BQU8sQ0FBQyxVQUFVLEdBQUMsU0FBUyxDQUFDO2dCQUM3QixJQUFJLE1BQU0sR0FBNkIsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFFcEYsTUFBTSxDQUFDLFVBQVUsR0FBQyxVQUFVLENBQUM7WUFDakMsQ0FBQyxFQUNELFVBQUMsS0FBSztnQkFFRixHQUFHO2dCQUNILEtBQUssQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFHdkQsQ0FBQyxDQUFDLENBQUM7UUFHZixDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFFRixLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM1QixDQUFDO0lBR0wsQ0FBQztJQUVELHFDQUFZLEdBQVo7UUFFSSxJQUFJLE9BQU8sR0FBMkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEUsT0FBTyxDQUFDLFVBQVUsR0FBQyxTQUFTLENBQUM7UUFDN0IsSUFBSSxNQUFNLEdBQTZCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFcEYsTUFBTSxDQUFDLFVBQVUsR0FBQyxVQUFVLENBQUM7SUFJakMsQ0FBQztJQTVLUSxjQUFjO1FBUDFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7U0FFN0IsQ0FBQzt5Q0FVdUMsdUNBQWdCLEVBQWUsV0FBSSxFQUF3Qiw0QkFBWSxFQUFnQixlQUFNO09BVHpILGNBQWMsQ0E2SzFCO0lBQUQscUJBQUM7Q0FBQSxBQTdLRCxJQTZLQztBQTdLWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIlxyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcclxuaW1wb3J0IHtNeWRldGFpbFNlcnZpY2V9IGZyb20gXCIuLi9teWRldGFpbC9teWRldGFpbC5jb21wb25lbnQuc2VydmljZVwiO1xyXG5pbXBvcnQge2xvZ2luU2VydmljZX0gZnJvbSBcIi4vbG9naW4uc2VydmljZVwiO1xyXG5pbXBvcnQge3NldFN0cmluZyxnZXRTdHJpbmcsc2V0TnVtYmVyLGdldE51bWJlcixzZXRCb29sZWFuLGdldEJvb2xlYW59IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtMYWJlbH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWxcIjtcclxuaW1wb3J0IHtBYnNvbHV0ZUxheW91dH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9hYnNvbHV0ZS1sYXlvdXRcIjtcclxuaW1wb3J0IHtHcmlkTGF5b3V0fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2dyaWQtbGF5b3V0XCI7XHJcbmltcG9ydCB7U3RhY2tMYXlvdXR9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XHJcbnZhciBUb2FzdCA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtdG9hc3RcIik7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2xvZ2luLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9sb2dpbi5jc3MnXVxyXG4gICAgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBsb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICBwdWJsaWMgbG9naW5fZW1haWw6IHN0cmluZztcclxuICAgcHVibGljIGxvZ2luX3Bvc3N3b3JkOiBzdHJpbmc7XHJcbiAgIHB1YmxpYyByZXNldF9lbWFpbDogc3RyaW5nO1xyXG5cclxuXHJcbiAgICAvLyBUaGlzIHBhdHRlcm4gbWFrZXMgdXNlIG9mIEFuZ3VsYXLvv71zIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGltcGxlbWVudGF0aW9uIHRvIGluamVjdCBhbiBpbnN0YW5jZSBvZiB0aGUgSXRlbVNlcnZpY2Ugc2VydmljZSBpbnRvIHRoaXMgY2xhc3MuIFxyXG4gICAgLy8gQW5ndWxhciBrbm93cyBhYm91dCB0aGlzIHNlcnZpY2UgYmVjYXVzZSBpdCBpcyBpbmNsdWRlZCBpbiB5b3VyIGFwcO+/vXMgbWFpbiBOZ01vZHVsZSwgZGVmaW5lZCBpbiBhcHAubW9kdWxlLnRzLlxyXG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMscHJpdmF0ZSBwYWdlOiBQYWdlLHByaXZhdGUgbXlsb2dpbnNlcnZpY2U6bG9naW5TZXJ2aWNlLHByaXZhdGUgcm91dGVyOlJvdXRlcikge1xyXG5cclxuICAgICAgIHRoaXMubG9naW5fZW1haWw7XHJcbiAgICAgICB0aGlzLmxvZ2luX3Bvc3N3b3JkO1xyXG5cclxuICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgICAgIC8qIGlmKGdldFN0cmluZyhcImFjY2Vzc190b2tlblwiKSAhPW51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvcmVzdGF1cmFudHNcIl0pO1xyXG5cclxuICAgICAgICB9Ki9cclxuXHJcbiAgICAgIC8vIHRoaXMudGVzdCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgLyogIHRlc3QoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImVudGVyXCIpO1xyXG4gICAgICAgIHRoaXMubXlsb2dpbnNlcnZpY2VcclxuICAgICAgICAgICAgLnRlc3RzZXJ2aWNlKClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0cmluZ19yZXNwb25zZSA9IEpTT04uc3RyaW5naWZ5KGVycm9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hbGVydChcInVzZXIgbm90IGV4c2lzdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcImVycm9yXCIrSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0KEpTT04uc3RyaW5naWZ5KGVycm9yLl9ib2R5Lm1lc3NhZ2UpKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIH0qL1xyXG4gICAgb25OYXZCdG5UYXAoKSB7XHJcbiAgICAgICAgLy8gVGhpcyBjb2RlIHdpbGwgYmUgY2FsbGVkIG9ubHkgaW4gQW5kcm9pZC5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpb24gYnV0dG9uIHRhcHBlZCFcIik7XHJcbiAgICB9XHJcbiAgICBvblNpZ25wVGFwKCkge1xyXG4gICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc2lnbnVwJ10pO1xyXG5cclxuICAgIH1cclxuICAgIG9uTG9naW5UYXAoKSB7XHJcblxyXG4gICAgaWYodGhpcy5sb2dpbl9lbWFpbCE9XCJcIiAmJiB0aGlzLmxvZ2luX3Bvc3N3b3JkIT1cIlwiKXtcclxuICAgICAgICAgICAgbGV0IHRoYXQ9dGhpcztcclxuICAgICAgICB0aGF0Lm15bG9naW5zZXJ2aWNlXHJcbiAgICAgICAgICAgIC51c2VyX2xvZ2luX2FwaV9jYWxsKHsgdXNlcl9uYW1lOiB0aGF0LmxvZ2luX2VtYWlsLCB1c2VyX3Bhc3N3b3JkOiB0aGF0LmxvZ2luX3Bvc3N3b3JkIH0pXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5vblN1Y2Nlc3MocmVzKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0cmluZ19yZXNwb25zZSA9IEpTT04uc3RyaW5naWZ5KGVycm9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hbGVydChcInVzZXIgbm90IGV4c2lzdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChKU09OLnN0cmluZ2lmeShlcnJvci5fYm9keS5tZXNzYWdlKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH1lbHNle1xyXG5cclxuICAgICAgICBhbGVydChcIkVtYWlsIG9yIFBhc3N3b3JkIHJlcXVpcmVkXCIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25TdWNjZXNzKHJlcyl7XHJcblxyXG4gICAgICAgICAgICAgIGxldCBzdHJpbmdfcmVzcG9uc2UgPSBKU09OLnN0cmluZ2lmeShyZXMpO1xyXG4gICAgICAgICAgICAgIGxldCBoZWxwZXIgPSBKU09OLnBhcnNlKHN0cmluZ19yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgc2V0U3RyaW5nKFwiYWNjZXNzX3Rva2VuXCIsSlNPTi5zdHJpbmdpZnkoaGVscGVyLl9ib2R5LnVzZXIudXNlcl90b2tlbikpO1xyXG5cclxuICAgICAgICAgICAgICBzZXRTdHJpbmcoXCJ1c2VyX2lkXCIsSlNPTi5zdHJpbmdpZnkoaGVscGVyLl9ib2R5LnVzZXIudXNlcl9pZCkpO1xyXG4gICAgICAgICAgICAgIHNldFN0cmluZyhcImVtYWlsXCIsaGVscGVyLl9ib2R5LnVzZXIudXNlcl91c2VybmFtZSk7XHJcbiAgICAgICAgICAgICAgc2V0U3RyaW5nKFwibmFtZVwiLGhlbHBlci5fYm9keS51c2VyLnVzZXJfbmFtZSk7XHJcbiAgICAgICAgc2V0U3RyaW5nKFwidXNlcl9tb2JpbGVfbm9cIixKU09OLnN0cmluZ2lmeShoZWxwZXIuX2JvZHkudXNlci51c2VyX21vYmlsZV9ubykpO1xyXG4gICAgICAgLy8gc2V0U3RyaW5nKFwidXNlcl9hZGRyZXNzXCIsSlNPTi5zdHJpbmdpZnkoaGVscGVyLl9ib2R5LnVzZXIudXNlcl9hZGRyZXNzKSk7XHJcbiAgICAgIC8vICBzZXRTdHJpbmcoXCJ1c2VyX3BjXCIsSlNPTi5zdHJpbmdpZnkoaGVscGVyLl9ib2R5LnVzZXIudXNlcl9wb3N0YWxfY29kZSkpO1xyXG4gICAgICAgLy8gYWxlcnQoZ2V0U3RyaW5nKFwidXNlcl9hZGRyZXNzXCIpLGdldFN0cmluZyhcInVzZXJfYWRkcmVzc1wiKSk7XHJcblxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiampqampcIitnZXRTdHJpbmcoXCJ1c2VyX2lkXCIpLGdldFN0cmluZyhcImFjY2Vzc190b2tlblwiKSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3Jlc3RhdXJhbnRzXCJdKTtcclxuXHJcblxyXG5cclxuICAgIH1cclxuICAgIHRvZ2dsZXBhc3Nvd3JkKCkge1xyXG5cclxuICAgICAgICBsZXQgdGZpZWxkOiBUZXh0RmllbGQgPSA8VGV4dEZpZWxkPnRoaXMucGFnZS5nZXRWaWV3QnlJZChcInBhc3N3b3JkXCIpO1xyXG4gICAgICAgIHRmaWVsZC5zZWN1cmUgPSAhdGZpZWxkLnNlY3VyZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgZm9yZ290cGFzc3dvcmQoKXtcclxuICAgICAgICBsZXQgbGF5b3V0MTogR3JpZExheW91dCA9IDxHcmlkTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImxvZ2luZGl2XCIpO1xyXG4gICAgICAgIGxheW91dDEudmlzaWJpbGl0eT1cImNvbGxhcHNlXCI7XHJcbiAgICAgICAgbGV0IGxheW91dDogU3RhY2tMYXlvdXQgPSA8U3RhY2tMYXlvdXQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiZm9yZ290cGFzc3dvcmRsYWJlbFwiKTtcclxuXHJcbiAgICAgICAgbGF5b3V0LnZpc2liaWxpdHk9XCJ2aXNpYmxlXCI7XHJcblxyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9ucmVzZXRidG4oKXtcclxuXHJcbiAgICAgICAgaWYodGhpcy5yZXNldF9lbWFpbCE9bnVsbCApe1xyXG4gICAgICAgICAgICBsZXQgdGhhdD10aGlzO1xyXG4gICAgICAgICAgICB0aGF0Lm15bG9naW5zZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAudXNlcl9yZXNldF9wYXNzd29yZCh7IHVzZXJfbmFtZTogdGhhdC5yZXNldF9lbWFpbH0pXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhlbHBlcj1KU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIC8vIGFsZXJ0KGhlbHBlci5fYm9keS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvYXN0ID0gVG9hc3QubWFrZVRleHQoXCJZb3VyIFwiK2hlbHBlci5fYm9keS5tZXNzYWdlK1wiIHBsZWFzZSBDaGVjayBZb3VyIEVtYWlsIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3Quc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGF5b3V0MTogR3JpZExheW91dCA9IDxHcmlkTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImxvZ2luZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQxLnZpc2liaWxpdHk9XCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsYXlvdXQ6IFN0YWNrTGF5b3V0ID0gPFN0YWNrTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImZvcmdvdHBhc3N3b3JkbGFiZWxcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQudmlzaWJpbGl0eT1cImNvbGxhcHNlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcImVycm9yXCIrSlNPTi5zdHJpbmdpZnkoZXJyb3IuX2JvZHkubWVzc2FnZSkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRW1haWwgcmVxdWlyZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25yZXNldGxvZ2luKCl7XHJcblxyXG4gICAgICAgIGxldCBsYXlvdXQxOiBHcmlkTGF5b3V0ID0gPEdyaWRMYXlvdXQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwibG9naW5kaXZcIik7XHJcbiAgICAgICAgbGF5b3V0MS52aXNpYmlsaXR5PVwidmlzaWJsZVwiO1xyXG4gICAgICAgIGxldCBsYXlvdXQ6IFN0YWNrTGF5b3V0ID0gPFN0YWNrTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImZvcmdvdHBhc3N3b3JkbGFiZWxcIik7XHJcblxyXG4gICAgICAgIGxheW91dC52aXNpYmlsaXR5PVwiY29sbGFwc2VcIjtcclxuXHJcblxyXG5cclxuICAgIH1cclxufVxyXG4gXHJcbiJdfQ==