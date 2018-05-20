"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var nativescript_angular_1 = require("nativescript-angular");
var signup_service_1 = require("./signup.service");
var router_1 = require("@angular/router");
var login_service_1 = require("../login/login.service");
var application_settings_1 = require("tns-core-modules/application-settings");
var Toast = require("nativescript-toast");
var signupComponent = /** @class */ (function () {
    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.
    function signupComponent(routerExtensions, page, mysignupservice, router, myloginservice) {
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.mysignupservice = mysignupservice;
        this.router = router;
        this.myloginservice = myloginservice;
    }
    signupComponent.prototype.ngOnInit = function () {
    };
    signupComponent.prototype.isValidEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        return re.test(email);
    };
    signupComponent.prototype.getVerificationCode = function () {
        var _this = this;
        var check = this.isValidEmail(this.signup_email);
        //console.log(check);
        if (check == true && this.signup_name != "" && this.signup_phone != "" && this.postal_code != "" && this.signup_password != "") {
            console.log(check);
            this.mysignupservice
                .get_verification_code({ user_username: this.signup_email })
                .subscribe(function (res) {
                var toast = Toast.makeText("Please Check Your Email for Code");
                toast.show();
                console.log("---------------------------------------------------------------------");
                var helper = JSON.parse(JSON.stringify(res));
                console.log(JSON.stringify(helper._body.Code));
                console.log("---------------------------------------------------------------------");
                application_settings_1.setString("signup_verification_code", helper._body.Code);
                _this.addVarificationCode();
            }, function (error) {
                //this.onGetDataError(error);
                console.log(JSON.stringify("error" + error));
            });
        }
        else {
            alert("Invaild Inputs");
        }
    };
    signupComponent.prototype.addVarificationCode = function () {
        var layout = this.page.getViewById("verification_layout");
        layout.visibility = "visible";
        var layout1 = this.page.getViewById("signup_form");
        layout1.visibility = "collapse";
    };
    signupComponent.prototype.submitVerificationCode = function () {
        var code = application_settings_1.getString("signup_verification_code");
        //alert(this.v_code+"--------"+code);
        if (this.v_code.toUpperCase() == code) {
            this.signup();
        }
        else {
            var toast = Toast.makeText("Incorrect Please try again");
            toast.show();
        }
    };
    signupComponent.prototype.signup = function () {
        var _this = this;
        var check = this.isValidEmail(this.signup_email);
        //console.log(check);
        if (check == true && this.signup_name != "" && this.signup_phone != "" && this.postal_code != "" && this.signup_password != "") {
            console.log(check);
            this.mysignupservice
                .user_signup_api_call({ user_name: this.signup_name, user_password: this.signup_password, user_username: this.signup_email, user_mobile_no: this.signup_phone, user_postal_code: this.postal_code, user_email_status: "verified" })
                .subscribe(function (res) {
                console.log("res" + JSON.stringify(res));
                _this.router.navigate(["/login"]);
            }, function (error) {
                var helper = JSON.parse(JSON.stringify(error));
                //  alert(helper._body.err.invalidAttributes.user_username[0].message);
                alert(JSON.stringify(error));
            });
        }
        else {
            alert("Invaild Inputs");
        }
    };
    signupComponent.prototype.onSuccess = function (res) {
        var string_response = JSON.stringify(res);
        var helper = JSON.parse(string_response);
        application_settings_1.setString("access_token", JSON.stringify(helper._body.user.user_token));
        application_settings_1.setString("user_id", JSON.stringify(helper._body.user.user_id));
        application_settings_1.setString("email", helper._body.user.user_username);
        application_settings_1.setString("name", helper._body.user.user_name);
        application_settings_1.setString("user_mobile_no", JSON.stringify(helper._body.user.user_mobile_no));
        application_settings_1.setString("user_address", JSON.stringify(helper._body.user.user_address));
        console.log("jjjjj" + application_settings_1.getString("user_id"), application_settings_1.getString("access_token"));
        this.router.navigate(["/restaurants"]);
    };
    signupComponent.prototype.togglepassowrd = function () {
        var tfield = this.page.getViewById("password");
        tfield.secure = !tfield.secure;
    };
    signupComponent.prototype.goBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    signupComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./signup.component.html",
            styleUrls: ['./signup.css']
        }),
        __metadata("design:paramtypes", [nativescript_angular_1.RouterExtensions, page_1.Page, signup_service_1.SignupService, router_1.Router, login_service_1.loginService])
    ], signupComponent);
    return signupComponent;
}());
exports.signupComponent = signupComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpZ251cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsZ0NBQStCO0FBQy9CLDZEQUFzRDtBQUN0RCxtREFBK0M7QUFDL0MsMENBQXlDO0FBQ3pDLHdEQUFzRDtBQUN0RCw4RUFBMkU7QUFHM0UsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFRMUM7SUFXSSw2SUFBNkk7SUFDN0ksaUhBQWlIO0lBSWpILHlCQUFvQixnQkFBa0MsRUFBUyxJQUFVLEVBQVMsZUFBNkIsRUFBUyxNQUFhLEVBQVUsY0FBMkI7UUFBdEoscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUFBUyxvQkFBZSxHQUFmLGVBQWUsQ0FBYztRQUFTLFdBQU0sR0FBTixNQUFNLENBQU87UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBYTtJQUFJLENBQUM7SUFFL0ssa0NBQVEsR0FBUjtJQUVBLENBQUM7SUFDRCxzQ0FBWSxHQUFaLFVBQWEsS0FBSztRQUNkLElBQUksRUFBRSxHQUFHLHlKQUF5SixDQUFDO1FBQ25LLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCw2Q0FBbUIsR0FBbkI7UUFBQSxpQkF1Q0M7UUF0Q0csSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDL0MscUJBQXFCO1FBQ3JCLEVBQUUsQ0FBQSxDQUFDLEtBQUssSUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBRSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksSUFBRSxFQUFFLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBRSxFQUFFLElBQUcsSUFBSSxDQUFDLGVBQWUsSUFBRSxF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SSxFQUF5Qiw4QkFBYSxFQUFnQixlQUFNLEVBQXlCLDRCQUFZO09BaEJqSyxlQUFlLENBdUozQjtJQUFELHNCQUFDO0NBQUEsQUF2SkQsSUF1SkM7QUF2SlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCJcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XHJcbmltcG9ydCB7U2lnbnVwU2VydmljZX0gZnJvbSBcIi4vc2lnbnVwLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBsb2dpblNlcnZpY2UgfSBmcm9tIFwiLi4vbG9naW4vbG9naW4uc2VydmljZVwiO1xyXG5pbXBvcnQge2dldFN0cmluZywgc2V0U3RyaW5nfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQge0Fic29sdXRlTGF5b3V0fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2Fic29sdXRlLWxheW91dFwiO1xyXG5pbXBvcnQge1N0YWNrTGF5b3V0fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xyXG52YXIgVG9hc3QgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXRvYXN0XCIpO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zaWdudXAuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL3NpZ251cC5jc3MnXVxyXG5cclxufSlcclxuZXhwb3J0IGNsYXNzIHNpZ251cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzaWdudXBfbmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHBvc3RhbF9jb2RlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2lnbnVwX2VtYWlsOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2lnbnVwX3Bob25lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2lnbnVwX3Bhc3N3b3JkOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdl9jb2RlOiBzdHJpbmc7XHJcblxyXG5cclxuICAgIC8vIFRoaXMgcGF0dGVybiBtYWtlcyB1c2Ugb2YgQW5ndWxhcu+/vXMgZGVwZW5kZW5jeSBpbmplY3Rpb24gaW1wbGVtZW50YXRpb24gdG8gaW5qZWN0IGFuIGluc3RhbmNlIG9mIHRoZSBJdGVtU2VydmljZSBzZXJ2aWNlIGludG8gdGhpcyBjbGFzcy4gXHJcbiAgICAvLyBBbmd1bGFyIGtub3dzIGFib3V0IHRoaXMgc2VydmljZSBiZWNhdXNlIGl0IGlzIGluY2x1ZGVkIGluIHlvdXIgYXBw77+9cyBtYWluIE5nTW9kdWxlLCBkZWZpbmVkIGluIGFwcC5tb2R1bGUudHMuXHJcbiBcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLHByaXZhdGUgcGFnZTogUGFnZSxwcml2YXRlIG15c2lnbnVwc2VydmljZTpTaWdudXBTZXJ2aWNlLHByaXZhdGUgcm91dGVyOlJvdXRlcixwcml2YXRlICBteWxvZ2luc2VydmljZTpsb2dpblNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuICAgIGlzVmFsaWRFbWFpbChlbWFpbCkge1xyXG4gICAgICAgIHZhciByZSA9IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvaTtcclxuICAgICAgICByZXR1cm4gcmUudGVzdChlbWFpbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmVyaWZpY2F0aW9uQ29kZSgpe1xyXG4gICAgICAgIGxldCBjaGVjaz10aGlzLmlzVmFsaWRFbWFpbCh0aGlzLnNpZ251cF9lbWFpbCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjaGVjayk7XHJcbiAgICAgICAgaWYoY2hlY2s9PXRydWUgJiYgdGhpcy5zaWdudXBfbmFtZSE9XCJcIiAmJiB0aGlzLnNpZ251cF9waG9uZSE9XCJcIiAmJiB0aGlzLnBvc3RhbF9jb2RlIT1cIlwiICYmdGhpcy5zaWdudXBfcGFzc3dvcmQhPVwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjaGVjayk7XHJcbiAgICAgICAgICAgIHRoaXMubXlzaWdudXBzZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAuZ2V0X3ZlcmlmaWNhdGlvbl9jb2RlKHsgdXNlcl91c2VybmFtZTp0aGlzLnNpZ251cF9lbWFpbH0pXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b2FzdCA9IFRvYXN0Lm1ha2VUZXh0KFwiUGxlYXNlIENoZWNrIFlvdXIgRW1haWwgZm9yIENvZGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0LnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGhlbHBlciA9SlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGhlbHBlci5fYm9keS5Db2RlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTdHJpbmcoXCJzaWdudXBfdmVyaWZpY2F0aW9uX2NvZGVcIixoZWxwZXIuX2JvZHkuQ29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVmFyaWZpY2F0aW9uQ29kZSgpO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShcImVycm9yXCIrZXJyb3IpKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsc2V7XHJcblxyXG4gICAgICAgICAgICBhbGVydChcIkludmFpbGQgSW5wdXRzXCIpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBhZGRWYXJpZmljYXRpb25Db2RlKCl7XHJcblxyXG4gICAgICAgIGxldCBsYXlvdXQ6U3RhY2tMYXlvdXQ9PFN0YWNrTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcInZlcmlmaWNhdGlvbl9sYXlvdXRcIik7XHJcbiAgICAgICAgbGF5b3V0LnZpc2liaWxpdHk9XCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgbGV0IGxheW91dDE6U3RhY2tMYXlvdXQ9PFN0YWNrTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcInNpZ251cF9mb3JtXCIpO1xyXG4gICAgICAgIGxheW91dDEudmlzaWJpbGl0eT1cImNvbGxhcHNlXCI7XHJcblxyXG5cclxuICAgIH1cclxuICAgIHN1Ym1pdFZlcmlmaWNhdGlvbkNvZGUoKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBjb2RlPWdldFN0cmluZyhcInNpZ251cF92ZXJpZmljYXRpb25fY29kZVwiKTtcclxuICAgICAgICAvL2FsZXJ0KHRoaXMudl9jb2RlK1wiLS0tLS0tLS1cIitjb2RlKTtcclxuICAgICAgICBpZih0aGlzLnZfY29kZS50b1VwcGVyQ2FzZSgpPT1jb2RlKXtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLnNpZ251cCgpO1xyXG4gICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvYXN0ID0gVG9hc3QubWFrZVRleHQoXCJJbmNvcnJlY3QgUGxlYXNlIHRyeSBhZ2FpblwiKTtcclxuICAgICAgICAgICAgdG9hc3Quc2hvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBzaWdudXAoKSB7XHJcbiAgICAgICAgbGV0IGNoZWNrPXRoaXMuaXNWYWxpZEVtYWlsKHRoaXMuc2lnbnVwX2VtYWlsKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGNoZWNrKTtcclxuICAgICAgICBpZihjaGVjaz09dHJ1ZSAmJiB0aGlzLnNpZ251cF9uYW1lIT1cIlwiICYmIHRoaXMuc2lnbnVwX3Bob25lIT1cIlwiICYmIHRoaXMucG9zdGFsX2NvZGUhPVwiXCIgJiZ0aGlzLnNpZ251cF9wYXNzd29yZCE9XCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoZWNrKTtcclxuICAgICAgICAgICAgdGhpcy5teXNpZ251cHNlcnZpY2VcclxuICAgICAgICAgICAgICAgIC51c2VyX3NpZ251cF9hcGlfY2FsbCh7IHVzZXJfbmFtZTogdGhpcy5zaWdudXBfbmFtZSwgIHVzZXJfcGFzc3dvcmQ6IHRoaXMuc2lnbnVwX3Bhc3N3b3JkLHVzZXJfdXNlcm5hbWU6dGhpcy5zaWdudXBfZW1haWwsdXNlcl9tb2JpbGVfbm86dGhpcy5zaWdudXBfcGhvbmUgLCB1c2VyX3Bvc3RhbF9jb2RlOnRoaXMucG9zdGFsX2NvZGUsdXNlcl9lbWFpbF9zdGF0dXM6XCJ2ZXJpZmllZFwifSlcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzXCIrSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbG9naW5cIl0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlbHBlcj1KU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgYWxlcnQoaGVscGVyLl9ib2R5LmVyci5pbnZhbGlkQXR0cmlidXRlcy51c2VyX3VzZXJuYW1lWzBdLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsc2V7XHJcblxyXG4gICAgICAgICAgICBhbGVydChcIkludmFpbGQgSW5wdXRzXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBvblN1Y2Nlc3MocmVzKXtcclxuXHJcbiAgICAgICAgbGV0IHN0cmluZ19yZXNwb25zZSA9IEpTT04uc3RyaW5naWZ5KHJlcyk7XHJcbiAgICAgICAgbGV0IGhlbHBlciA9IEpTT04ucGFyc2Uoc3RyaW5nX3Jlc3BvbnNlKTtcclxuICAgICAgICBzZXRTdHJpbmcoXCJhY2Nlc3NfdG9rZW5cIixKU09OLnN0cmluZ2lmeShoZWxwZXIuX2JvZHkudXNlci51c2VyX3Rva2VuKSk7XHJcbiAgICAgICAgc2V0U3RyaW5nKFwidXNlcl9pZFwiLEpTT04uc3RyaW5naWZ5KGhlbHBlci5fYm9keS51c2VyLnVzZXJfaWQpKTtcclxuICAgICAgICBzZXRTdHJpbmcoXCJlbWFpbFwiLGhlbHBlci5fYm9keS51c2VyLnVzZXJfdXNlcm5hbWUpO1xyXG4gICAgICAgIHNldFN0cmluZyhcIm5hbWVcIixoZWxwZXIuX2JvZHkudXNlci51c2VyX25hbWUpO1xyXG4gICAgICAgIHNldFN0cmluZyhcInVzZXJfbW9iaWxlX25vXCIsSlNPTi5zdHJpbmdpZnkoaGVscGVyLl9ib2R5LnVzZXIudXNlcl9tb2JpbGVfbm8pKTtcclxuICAgICAgICBzZXRTdHJpbmcoXCJ1c2VyX2FkZHJlc3NcIixKU09OLnN0cmluZ2lmeShoZWxwZXIuX2JvZHkudXNlci51c2VyX2FkZHJlc3MpKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJqampqalwiK2dldFN0cmluZyhcInVzZXJfaWRcIiksZ2V0U3RyaW5nKFwiYWNjZXNzX3Rva2VuXCIpKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvcmVzdGF1cmFudHNcIl0pO1xyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZXBhc3Nvd3JkKCkge1xyXG5cclxuICAgICAgICBsZXQgdGZpZWxkOiBUZXh0RmllbGQgPSA8VGV4dEZpZWxkPnRoaXMucGFnZS5nZXRWaWV3QnlJZChcInBhc3N3b3JkXCIpO1xyXG4gICAgICAgIHRmaWVsZC5zZWN1cmUgPSAhdGZpZWxkLnNlY3VyZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=