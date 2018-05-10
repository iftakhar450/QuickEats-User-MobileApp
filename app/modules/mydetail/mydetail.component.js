"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var mydetail_component_service_1 = require("./mydetail.component.service");
var application_settings_1 = require("tns-core-modules/application-settings");
var MydetailComponent = /** @class */ (function () {
    function MydetailComponent(mydetailService, page) {
        this.mydetailService = mydetailService;
        this.page = page;
        // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class.
        // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.
        this.name = "";
        this.username = "";
        this.phoneno = "";
    }
    MydetailComponent.prototype.ngOnInit = function () {
        var token = application_settings_1.getString("access_token");
        var id = JSON.parse(application_settings_1.getString("user_id"));
        console.log("token=" + token);
        console.log("id=" + id);
        this.getUserProfile(id);
    };
    MydetailComponent.prototype.getUserProfile = function (id) {
        var _this = this;
        this.mydetailService.getUserProfileFromApi(id)
            .subscribe(function (result) {
            var string_response = JSON.stringify(result);
            var helper = JSON.parse(string_response);
            _this.name = helper._body.response.user_name;
            _this.phoneno = helper._body.response.user_mobile_no;
            _this.user = helper._body.response;
            _this.username = "your account email address is " + helper._body.response.user_username + ".You can change this by visting the Quickeats website";
        }, function (error) {
            //this.onGetDataError(error);
            console.log(JSON.stringify(error));
            alert(console.log(JSON.stringify(error.message)));
        });
    };
    MydetailComponent.prototype.onGetDataSuccess = function (res) {
        // console.log("fjsdfh"+JSON.stringify(res));
    };
    MydetailComponent.prototype.onGetDataError = function (error) {
        var body = error.json() || "";
        var err = body.error || JSON.stringify(body);
        console.log("onGetDataError: " + err);
    };
    MydetailComponent.prototype.editprofile = function () {
        var layout = this.page.getViewById("editprofile");
        if (layout.visibility == "collapse") {
            layout.visibility = "visible";
        }
        else {
            layout.visibility = "collapse";
        }
    };
    MydetailComponent.prototype.onSaveEditProfile = function () {
        this.user.user_name = this.name;
        this.user.user_mobile_no = this.phoneno;
        this.mydetailService.updateuserProfileFromApi(this.user)
            .subscribe(function (result) {
            console.log("update result" + result);
        }, function (error) {
            //this.onGetDataError(error);
            console.log(JSON.stringify(error));
        });
        var layout = this.page.getViewById("editprofile");
        layout.visibility = "collapse";
    };
    MydetailComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./mydetail.component.html",
            styleUrls: ['./mydetail.css']
        }),
        __metadata("design:paramtypes", [mydetail_component_service_1.MydetailService, page_1.Page])
    ], MydetailComponent);
    return MydetailComponent;
}());
exports.MydetailComponent = MydetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlkZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXlkZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELGdDQUErQjtBQUMvQiwyRUFBNkQ7QUFJN0QsOEVBQW9IO0FBU3BIO0lBYUksMkJBQW9CLGVBQWdDLEVBQVMsSUFBVTtRQUFuRCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBUnZFLDRJQUE0STtRQUM1SSxpSEFBaUg7UUFDMUcsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQUNmLGFBQVEsR0FBUyxFQUFFLENBQUM7UUFDcEIsWUFBTyxHQUFRLEVBQUUsQ0FBQztJQUlrRCxDQUFDO0lBRTVFLG9DQUFRLEdBQVI7UUFFSSxJQUFJLEtBQUssR0FBQyxnQ0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksRUFBRSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0NBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBRXZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXBCLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFM0IsQ0FBQztJQUdELDBDQUFjLEdBQWQsVUFBZSxFQUFFO1FBQWpCLGlCQWdCQztRQWZHLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDO2FBQ3pDLFNBQVMsQ0FBQyxVQUFDLE1BQU07WUFDZCxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFekMsS0FBSSxDQUFD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b25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCJcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7TXlkZXRhaWxTZXJ2aWNlfSBmcm9tIFwiLi9teWRldGFpbC5jb21wb25lbnQuc2VydmljZVwiO1xyXG5pbXBvcnQge0xhYmVsfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYWJlbFwiO1xyXG5pbXBvcnQge1RpbWVQaWNrZXJ9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RpbWUtcGlja2VyXCI7XHJcbmltcG9ydCB7QWJzb2x1dGVMYXlvdXR9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvYWJzb2x1dGUtbGF5b3V0XCI7XHJcbmltcG9ydCB7c2V0U3RyaW5nLGdldFN0cmluZyxzZXROdW1iZXIsZ2V0TnVtYmVyLHNldEJvb2xlYW4sZ2V0Qm9vbGVhbn0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL215ZGV0YWlsLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9teWRldGFpbC5jc3MnXVxyXG5cclxufSlcclxuZXhwb3J0IGNsYXNzIE15ZGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcblxyXG5cclxuXHJcbiAgICAvLyBUaGlzIHBhdHRlcm4gbWFrZXMgdXNlIG9mIEFuZ3VsYXLvv71zIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGltcGxlbWVudGF0aW9uIHRvIGluamVjdCBhbiBpbnN0YW5jZSBvZiB0aGUgSXRlbVNlcnZpY2Ugc2VydmljZSBpbnRvIHRoaXMgY2xhc3MuXHJcbiAgICAvLyBBbmd1bGFyIGtub3dzIGFib3V0IHRoaXMgc2VydmljZSBiZWNhdXNlIGl0IGlzIGluY2x1ZGVkIGluIHlvdXIgYXBw77+9cyBtYWluIE5nTW9kdWxlLCBkZWZpbmVkIGluIGFwcC5tb2R1bGUudHMuXHJcbiAgICBwdWJsaWMgbmFtZTpzdHJpbmc9XCJcIjtcclxuICAgIHB1YmxpYyB1c2VybmFtZSA6c3RyaW5nPVwiXCI7XHJcbiAgICBwdWJsaWMgcGhvbmVubzpzdHJpbmc9XCJcIjtcclxuICAgIHB1YmxpYyB1c2VyOmFueTtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBteWRldGFpbFNlcnZpY2U6IE15ZGV0YWlsU2VydmljZSxwcml2YXRlIHBhZ2U6IFBhZ2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG5cclxuICAgICAgICBsZXQgdG9rZW49Z2V0U3RyaW5nKFwiYWNjZXNzX3Rva2VuXCIpO1xyXG4gICAgICBsZXQgaWQ9SlNPTi5wYXJzZShnZXRTdHJpbmcoXCJ1c2VyX2lkXCIpKTtcclxuXHJcbiAgICAgICBjb25zb2xlLmxvZyhcInRva2VuPVwiK3Rva2VuKTtcclxuICAgICBjb25zb2xlLmxvZyhcImlkPVwiK2lkKTtcclxuXHJcbiAgICAgICB0aGlzLmdldFVzZXJQcm9maWxlKGlkKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldFVzZXJQcm9maWxlKGlkKSB7XHJcbiAgICAgICAgdGhpcy5teWRldGFpbFNlcnZpY2UuZ2V0VXNlclByb2ZpbGVGcm9tQXBpKGlkKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBzdHJpbmdfcmVzcG9uc2UgPSBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlbHBlciA9IEpTT04ucGFyc2Uoc3RyaW5nX3Jlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWU9aGVscGVyLl9ib2R5LnJlc3BvbnNlLnVzZXJfbmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGhvbmVubz1oZWxwZXIuX2JvZHkucmVzcG9uc2UudXNlcl9tb2JpbGVfbm87XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXI9aGVscGVyLl9ib2R5LnJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VybmFtZT1cInlvdXIgYWNjb3VudCBlbWFpbCBhZGRyZXNzIGlzIFwiK2hlbHBlci5fYm9keS5yZXNwb25zZS51c2VyX3VzZXJuYW1lK1wiLllvdSBjYW4gY2hhbmdlIHRoaXMgYnkgdmlzdGluZyB0aGUgUXVpY2tlYXRzIHdlYnNpdGVcIjtcclxuXHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgICAgICBhbGVydCggY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IubWVzc2FnZSkpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkdldERhdGFTdWNjZXNzKHJlcykge1xyXG5cclxuICAgICAgLy8gY29uc29sZS5sb2coXCJmanNkZmhcIitKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcclxuICAgICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8IFwiXCI7XHJcbiAgICAgICAgY29uc3QgZXJyID0gYm9keS5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShib2R5KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uR2V0RGF0YUVycm9yOiBcIiArIGVycik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGVkaXRwcm9maWxlKCl7XHJcblxyXG4gICAgICAgIGxldCBsYXlvdXQ6IEFic29sdXRlTGF5b3V0ID0gPEFic29sdXRlTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImVkaXRwcm9maWxlXCIpO1xyXG4gICAgICAgIGlmIChsYXlvdXQudmlzaWJpbGl0eSA9PSBcImNvbGxhcHNlXCIpIHtcclxuXHJcbiAgICAgICAgICAgIGxheW91dC52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGxheW91dC52aXNpYmlsaXR5ID0gXCJjb2xsYXBzZVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgb25TYXZlRWRpdFByb2ZpbGUoKXtcclxuICAgICAgICB0aGlzLnVzZXIudXNlcl9uYW1lPXRoaXMubmFtZTtcclxuICAgICAgICB0aGlzLnVzZXIudXNlcl9tb2JpbGVfbm89dGhpcy5waG9uZW5vO1xyXG5cclxuICAgICAgICB0aGlzLm15ZGV0YWlsU2VydmljZS51cGRhdGV1c2VyUHJvZmlsZUZyb21BcGkodGhpcy51c2VyKVxyXG4gICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1cGRhdGUgcmVzdWx0XCIrcmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgbGF5b3V0OiBBYnNvbHV0ZUxheW91dCA9IDxBYnNvbHV0ZUxheW91dD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJlZGl0cHJvZmlsZVwiKTtcclxuICAgICAgICBsYXlvdXQudmlzaWJpbGl0eSA9IFwiY29sbGFwc2VcIjtcclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==