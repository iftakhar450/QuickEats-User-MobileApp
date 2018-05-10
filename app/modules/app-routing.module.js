"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var home_component_1 = require("./home/home.component");
var about_component_1 = require("./about/about.component");
var contact_component_1 = require("./contact/contact.component");
var profile_component_1 = require("./profile/profile.component");
var login_component_1 = require("./login/login.component");
var signup_component_1 = require("./signup/signup.component");
var restaurants_component_1 = require("./restaurants/restaurants.component");
var restaurant_detail_component_1 = require("./restaurant-detail/restaurant-detail.component");
var add_to_cart_detail_component_1 = require("./add-to-cart-datail/add-to-cart-detail.component");
var myorders_component_1 = require("./myorders/myorders.component");
var maps_component_1 = require("./maps/maps.component");
var add_new_address_component_1 = require("./addnewaddress/add-new-address.component");
var deliveryaddress_component_1 = require("./deliveryaddresses/deliveryaddress.component");
var aboutus_component_1 = require("./aboutus/aboutus.component");
var checkout_component_1 = require("./checkout/checkout.component");
var payment_component_1 = require("./payment/payment.component");
var mydetail_component_1 = require("./mydetail/mydetail.component");
var trackRider_component_1 = require("./track-rider/trackRider.component");
var change_password_component_1 = require("./change-password/change-password.component");
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.NativeScriptRouterModule.forRoot([
                    { path: "", component: restaurants_component_1.restaurantsComponent },
                    { path: "about", component: about_component_1.AboutComponent },
                    { path: "contact", component: contact_component_1.ContactComponent },
                    { path: "myorders", component: myorders_component_1.MyordersComponent },
                    { path: "login", component: login_component_1.loginComponent },
                    { path: "signup", component: signup_component_1.signupComponent },
                    { path: "restaurants", component: restaurants_component_1.restaurantsComponent },
                    { path: "restaurants-detail/:id", component: restaurant_detail_component_1.restaurantdetailComponent },
                    { path: "restaurants-detail", component: restaurant_detail_component_1.restaurantdetailComponent },
                    { path: "add-to-cart-detail", component: add_to_cart_detail_component_1.addtocartdetailComponent },
                    { path: "map", component: maps_component_1.mapsComponent },
                    { path: "checkout/:totalPrice", component: checkout_component_1.CheckoutComponent },
                    { path: "payment", component: payment_component_1.PaymentComponent },
                    { path: "add-new-address", component: add_new_address_component_1.addnewaddressComponent },
                    { path: "deliveryaddress", component: deliveryaddress_component_1.deliveryaddressComponent },
                    { path: "aboutus", component: aboutus_component_1.aboutusComponent },
                    { path: "mydetail", component: mydetail_component_1.MydetailComponent },
                    { path: 'about', component: about_component_1.AboutComponent },
                    { path: 'contact', component: contact_component_1.ContactComponent },
                    { path: 'home', component: home_component_1.HomeComponent },
                    { path: 'profile', component: profile_component_1.ProfileComponent },
                    { path: 'trackrider/:orderid', component: trackRider_component_1.TrackRiderComponent },
                    { path: 'changepassword', component: change_password_component_1.changePasswordComponent },
                    { path: 'logout', component: restaurants_component_1.restaurantsComponent }
                ])
            ],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBRXpDLHNEQUF1RTtBQUV2RSx3REFBc0Q7QUFDdEQsMkRBQXlEO0FBQ3pELGlFQUErRDtBQUMvRCxpRUFBK0Q7QUFDL0QsMkRBQXlEO0FBQ3pELDhEQUE0RDtBQUM1RCw2RUFBMkU7QUFDM0UsK0ZBQTRGO0FBQzVGLGtHQUE2RjtBQUM3RixvRUFBa0U7QUFDbEUsd0RBQXNEO0FBQ3RELHVGQUFtRjtBQUNuRiwyRkFBdUY7QUFDdkYsaUVBQTZEO0FBQzdELG9FQUFnRTtBQUNoRSxpRUFBNkQ7QUFDN0Qsb0VBQWdFO0FBQ2hFLDJFQUF1RTtBQUN2RSx5RkFBb0Y7QUFrQ3BGO0lBQUE7SUFFQSxDQUFDO0lBRlksZ0JBQWdCO1FBaEM1QixlQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsaUNBQXdCLENBQUMsT0FBTyxDQUFDO29CQUM3QixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLDRDQUFvQixFQUFFO29CQUM3QyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGdDQUFjLEVBQUU7b0JBQzVDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsb0NBQWdCLEVBQUU7b0JBQ2hELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsc0NBQWlCLEVBQUU7b0JBQ2xELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBRTtvQkFDNUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxrQ0FBZSxFQUFFO29CQUM5QyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLDRDQUFvQixFQUFFO29CQUN4RCxFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxTQUFTLEVBQUUsdURBQXlCLEVBQUU7b0JBQ3hFLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSx1REFBeUIsRUFBRTtvQkFDcEUsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLHVEQUF3QixFQUFFO29CQUNuRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLDhCQUFhLEVBQUU7b0JBQ3pDLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLFNBQVMsRUFBRSxzQ0FBaUIsRUFBQztvQkFDN0QsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxvQ0FBZ0IsRUFBQztvQkFDL0MsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLGtEQUFzQixFQUFFO29CQUM5RCxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsb0RBQXdCLEVBQUU7b0JBQ2hFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsb0NBQWdCLEVBQUU7b0JBQ2hELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsc0NBQWlCLEVBQUU7b0JBQ2xELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBRTtvQkFDNUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxvQ0FBZ0IsRUFBRTtvQkFDaEQsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSw4QkFBYSxFQUFFO29CQUMxQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLG9DQUFnQixFQUFFO29CQUNoRCxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUsMENBQW1CLEVBQUU7b0JBQy9ELEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxtREFBdUIsRUFBRTtvQkFDOUQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSw0Q0FBb0IsRUFBRTtpQkFFdEQsQ0FBQzthQUNIO1lBQ0QsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDcEMsQ0FBQztPQUNXLGdCQUFnQixDQUU1QjtJQUFELHVCQUFDO0NBQUEsQUFGRCxJQUVDO0FBRlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gJy4vaG9tZS9ob21lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBYm91dENvbXBvbmVudCB9IGZyb20gJy4vYWJvdXQvYWJvdXQuY29tcG9uZW50JztcbmltcG9ydCB7IENvbnRhY3RDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhY3QvY29udGFjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvZmlsZUNvbXBvbmVudCB9IGZyb20gJy4vcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBsb2dpbkNvbXBvbmVudCB9IGZyb20gXCIuL2xvZ2luL2xvZ2luLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgc2lnbnVwQ29tcG9uZW50IH0gZnJvbSBcIi4vc2lnbnVwL3NpZ251cC5jb21wb25lbnRcIjtcbmltcG9ydCB7IHJlc3RhdXJhbnRzQ29tcG9uZW50IH0gZnJvbSBcIi4vcmVzdGF1cmFudHMvcmVzdGF1cmFudHMuY29tcG9uZW50XCI7XG5pbXBvcnQgeyByZXN0YXVyYW50ZGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIi4vcmVzdGF1cmFudC1kZXRhaWwvcmVzdGF1cmFudC1kZXRhaWwuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBhZGR0b2NhcnRkZXRhaWxDb21wb25lbnQgfSBmcm9tIFwiLi9hZGQtdG8tY2FydC1kYXRhaWwvYWRkLXRvLWNhcnQtZGV0YWlsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTXlvcmRlcnNDb21wb25lbnQgfSBmcm9tIFwiLi9teW9yZGVycy9teW9yZGVycy5jb21wb25lbnRcIjtcbmltcG9ydCB7IG1hcHNDb21wb25lbnQgfSBmcm9tIFwiLi9tYXBzL21hcHMuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBhZGRuZXdhZGRyZXNzQ29tcG9uZW50IH0gZnJvbSBcIi4vYWRkbmV3YWRkcmVzcy9hZGQtbmV3LWFkZHJlc3MuY29tcG9uZW50XCI7XG5pbXBvcnQge2RlbGl2ZXJ5YWRkcmVzc0NvbXBvbmVudH0gZnJvbSBcIi4vZGVsaXZlcnlhZGRyZXNzZXMvZGVsaXZlcnlhZGRyZXNzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHthYm91dHVzQ29tcG9uZW50fSBmcm9tIFwiLi9hYm91dHVzL2Fib3V0dXMuY29tcG9uZW50XCI7XG5pbXBvcnQge0NoZWNrb3V0Q29tcG9uZW50fSBmcm9tIFwiLi9jaGVja291dC9jaGVja291dC5jb21wb25lbnRcIjtcbmltcG9ydCB7UGF5bWVudENvbXBvbmVudH0gZnJvbSBcIi4vcGF5bWVudC9wYXltZW50LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNeWRldGFpbENvbXBvbmVudH0gZnJvbSBcIi4vbXlkZXRhaWwvbXlkZXRhaWwuY29tcG9uZW50XCI7XG5pbXBvcnQge1RyYWNrUmlkZXJDb21wb25lbnR9IGZyb20gXCIuL3RyYWNrLXJpZGVyL3RyYWNrUmlkZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge2NoYW5nZVBhc3N3b3JkQ29tcG9uZW50fSBmcm9tIFwiLi9jaGFuZ2UtcGFzc3dvcmQvY2hhbmdlLXBhc3N3b3JkLmNvbXBvbmVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3QoW1xuICAgICAgICB7IHBhdGg6IFwiXCIsIGNvbXBvbmVudDogcmVzdGF1cmFudHNDb21wb25lbnQgfSxcbiAgICAgICAgeyBwYXRoOiBcImFib3V0XCIsIGNvbXBvbmVudDogQWJvdXRDb21wb25lbnQgfSxcbiAgICAgICAgeyBwYXRoOiBcImNvbnRhY3RcIiwgY29tcG9uZW50OiBDb250YWN0Q29tcG9uZW50IH0sXG4gICAgICAgIHsgcGF0aDogXCJteW9yZGVyc1wiLCBjb21wb25lbnQ6IE15b3JkZXJzQ29tcG9uZW50IH0sXG4gICAgICAgIHsgcGF0aDogXCJsb2dpblwiLCBjb21wb25lbnQ6IGxvZ2luQ29tcG9uZW50IH0sXG4gICAgICAgIHsgcGF0aDogXCJzaWdudXBcIiwgY29tcG9uZW50OiBzaWdudXBDb21wb25lbnQgfSxcbiAgICAgICAgeyBwYXRoOiBcInJlc3RhdXJhbnRzXCIsIGNvbXBvbmVudDogcmVzdGF1cmFudHNDb21wb25lbnQgfSxcbiAgICAgICAgeyBwYXRoOiBcInJlc3RhdXJhbnRzLWRldGFpbC86aWRcIiwgY29tcG9uZW50OiByZXN0YXVyYW50ZGV0YWlsQ29tcG9uZW50IH0sXG4gICAgICAgIHsgcGF0aDogXCJyZXN0YXVyYW50cy1kZXRhaWxcIiwgY29tcG9uZW50OiByZXN0YXVyYW50ZGV0YWlsQ29tcG9uZW50IH0sXG4gICAgICAgIHsgcGF0aDogXCJhZGQtdG8tY2FydC1kZXRhaWxcIiwgY29tcG9uZW50OiBhZGR0b2NhcnRkZXRhaWxDb21wb25lbnQgfSxcbiAgICAgICAgeyBwYXRoOiBcIm1hcFwiLCBjb21wb25lbnQ6IG1hcHNDb21wb25lbnQgfSxcbiAgICAgICAgeyBwYXRoOiBcImNoZWNrb3V0Lzp0b3RhbFByaWNlXCIsIGNvbXBvbmVudDogQ2hlY2tvdXRDb21wb25lbnR9LFxuICAgICAgICB7IHBhdGg6IFwicGF5bWVudFwiLCBjb21wb25lbnQ6IFBheW1lbnRDb21wb25lbnR9LFxuICAgICAgICB7IHBhdGg6IFwiYWRkLW5ldy1hZGRyZXNzXCIsIGNvbXBvbmVudDogYWRkbmV3YWRkcmVzc0NvbXBvbmVudCB9LFxuICAgICAgICB7IHBhdGg6IFwiZGVsaXZlcnlhZGRyZXNzXCIsIGNvbXBvbmVudDogZGVsaXZlcnlhZGRyZXNzQ29tcG9uZW50IH0sXG4gICAgICAgIHsgcGF0aDogXCJhYm91dHVzXCIsIGNvbXBvbmVudDogYWJvdXR1c0NvbXBvbmVudCB9LFxuICAgICAgICB7IHBhdGg6IFwibXlkZXRhaWxcIiwgY29tcG9uZW50OiBNeWRldGFpbENvbXBvbmVudCB9LFxuICAgICAgICB7IHBhdGg6ICdhYm91dCcsIGNvbXBvbmVudDogQWJvdXRDb21wb25lbnQgfSxcbiAgICAgICAgeyBwYXRoOiAnY29udGFjdCcsIGNvbXBvbmVudDogQ29udGFjdENvbXBvbmVudCB9LFxuICAgICAgICB7IHBhdGg6ICdob21lJywgY29tcG9uZW50OiBIb21lQ29tcG9uZW50IH0sXG4gICAgICAgIHsgcGF0aDogJ3Byb2ZpbGUnLCBjb21wb25lbnQ6IFByb2ZpbGVDb21wb25lbnQgfSxcbiAgICAgICAgeyBwYXRoOiAndHJhY2tyaWRlci86b3JkZXJpZCcsIGNvbXBvbmVudDogVHJhY2tSaWRlckNvbXBvbmVudCB9LFxuICAgICAgICB7IHBhdGg6ICdjaGFuZ2VwYXNzd29yZCcsIGNvbXBvbmVudDogY2hhbmdlUGFzc3dvcmRDb21wb25lbnQgfSxcbiAgICAgICAgeyBwYXRoOiAnbG9nb3V0JywgY29tcG9uZW50OiByZXN0YXVyYW50c0NvbXBvbmVudCB9XG5cbiAgICBdKVxuICBdLFxuICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHtcblxufVxuIl19