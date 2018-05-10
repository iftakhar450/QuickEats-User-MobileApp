"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_client_1 = require("nativescript-angular/http-client");
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var home_component_1 = require("./home/home.component");
var about_component_1 = require("./about/about.component");
var contact_component_1 = require("./contact/contact.component");
var profile_component_1 = require("./profile/profile.component");
var shared_1 = require("./shared");
var myorders_component_1 = require("./myorders/myorders.component");
var http_1 = require("nativescript-angular/http");
var login_component_1 = require("./login/login.component");
var signup_component_1 = require("./signup/signup.component");
var forms_1 = require("nativescript-angular/forms");
var restaurants_component_1 = require("./restaurants/restaurants.component");
var restaurant_detail_component_1 = require("./restaurant-detail/restaurant-detail.component");
var restaurants_service_1 = require("./restaurants/restaurants.service");
var maps_component_1 = require("./maps/maps.component");
var add_to_cart_detail_component_1 = require("./add-to-cart-datail/add-to-cart-detail.component");
var add_new_address_component_1 = require("./addnewaddress/add-new-address.component");
var deliveryaddress_component_1 = require("./deliveryaddresses/deliveryaddress.component");
var aboutus_component_1 = require("./aboutus/aboutus.component");
var checkout_component_1 = require("./checkout/checkout.component");
var payment_component_1 = require("./payment/payment.component");
var mydetail_component_1 = require("./mydetail/mydetail.component");
var nativescript_ng_shadow_1 = require("nativescript-ng-shadow");
var map_service_1 = require("./maps/map.service");
var restaurant_detail_service_1 = require("./restaurant-detail/restaurant-detail.service");
var deliveryaddress_service_1 = require("./deliveryaddresses/deliveryaddress.service");
var order_service_1 = require("./myorders/order.service");
var add_new_address_service_1 = require("./addnewaddress/add-new-address.service");
var mydetail_component_service_1 = require("./mydetail/mydetail.component.service");
var trackRider_component_1 = require("./track-rider/trackRider.component");
var trackRider_service_1 = require("./track-rider/trackRider.service");
var signup_service_1 = require("./signup/signup.service");
var login_service_1 = require("./login/login.service");
var checkout_service_1 = require("./checkout/checkout.service");
var add_to_cart_service_1 = require("./add-to-cart-datail/add-to-cart.service");
var change_password_component_1 = require("./change-password/change-password.component");
var change_password_service_1 = require("./change-password/change-password.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                app_routing_module_1.AppRoutingModule,
                http_client_1.NativeScriptHttpClientModule,
                http_1.NativeScriptHttpModule,
                shared_1.SharedModule,
                forms_1.NativeScriptFormsModule,
                nativescript_ng_shadow_1.NgShadowModule,
            ],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                about_component_1.AboutComponent,
                contact_component_1.ContactComponent,
                profile_component_1.ProfileComponent,
                myorders_component_1.MyordersComponent,
                login_component_1.loginComponent,
                signup_component_1.signupComponent,
                restaurants_component_1.restaurantsComponent,
                restaurant_detail_component_1.restaurantdetailComponent,
                add_to_cart_detail_component_1.addtocartdetailComponent,
                maps_component_1.mapsComponent,
                add_new_address_component_1.addnewaddressComponent,
                deliveryaddress_component_1.deliveryaddressComponent,
                aboutus_component_1.aboutusComponent,
                payment_component_1.PaymentComponent,
                checkout_component_1.CheckoutComponent,
                mydetail_component_1.MydetailComponent,
                change_password_component_1.changePasswordComponent,
                trackRider_component_1.TrackRiderComponent
            ],
            providers: [
                http_client_1.NativeScriptHttpClientModule,
                restaurants_service_1.RestaurantService,
                map_service_1.mapService,
                restaurant_detail_service_1.RestaurantDetailService,
                deliveryaddress_service_1.DeliverAddressService,
                order_service_1.orderService,
                add_new_address_service_1.AddnewAddressService,
                mydetail_component_service_1.MydetailService,
                trackRider_service_1.TrackRiderService,
                signup_service_1.SignupService,
                login_service_1.loginService,
                checkout_service_1.CheckoutService,
                change_password_service_1.changePasswordService,
                add_to_cart_service_1.addToCartService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnRUFBOEU7QUFDOUUsc0NBQXVDO0FBQ3ZDLGdGQUE0RTtBQUM1RSwyREFBc0Q7QUFDdEQsaURBQTZDO0FBQzdDLHdEQUFvRDtBQUNwRCwyREFBdUQ7QUFDdkQsaUVBQTZEO0FBQzdELGlFQUE2RDtBQUM3RCxtQ0FBc0M7QUFDdEMsb0VBQWdFO0FBQ2hFLGtEQUFtRTtBQUNuRSwyREFBdUQ7QUFDdkQsOERBQTBEO0FBQzFELG9EQUFrRTtBQUNsRSw2RUFBeUU7QUFDekUsK0ZBQTBGO0FBQzFGLHlFQUFvRTtBQUNwRSx3REFBb0Q7QUFDcEQsa0dBQTJGO0FBQzNGLHVGQUFpRjtBQUNqRiwyRkFBdUY7QUFDdkYsaUVBQTZEO0FBQzdELG9FQUFnRTtBQUNoRSxpRUFBNkQ7QUFDN0Qsb0VBQWdFO0FBQ2hFLGlFQUF3RDtBQUN4RCxrREFBOEM7QUFDOUMsMkZBQXNGO0FBQ3RGLHVGQUFrRjtBQUNsRiwwREFBc0Q7QUFHdEQsbUZBQTZFO0FBQzdFLG9GQUFzRTtBQUN0RSwyRUFBdUU7QUFDdkUsdUVBQW1FO0FBQ25FLDBEQUFzRDtBQUN0RCx1REFBbUQ7QUFDbkQsZ0VBQTREO0FBQzVELGdGQUEwRTtBQUMxRSx5RkFBb0Y7QUFDcEYscUZBQWdGO0FBeURoRjtJQUFBO0lBRUEsQ0FBQztJQUZZLFNBQVM7UUF0RHJCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLHFDQUFnQjtnQkFFaEIsMENBQTRCO2dCQUM1Qiw2QkFBc0I7Z0JBQ3RCLHFCQUFZO2dCQUNaLCtCQUF1QjtnQkFDdkIsdUNBQWM7YUFDakI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osOEJBQWE7Z0JBQ2IsZ0NBQWM7Z0JBQ2Qsb0NBQWdCO2dCQUNoQixvQ0FBZ0I7Z0JBQ2hCLHNDQUFpQjtnQkFDakIsZ0NBQWM7Z0JBQ2Qsa0NBQWU7Z0JBQ2YsNENBQW9CO2dCQUNwQix1REFBeUI7Z0JBQ3pCLHVEQUF3QjtnQkFDeEIsOEJBQWE7Z0JBQ2Isa0RBQXNCO2dCQUN0QixvREFBd0I7Z0JBQ3hCLG9DQUFnQjtnQkFDaEIsb0NBQWdCO2dCQUNoQixzQ0FBaUI7Z0JBQ2pCLHNDQUFpQjtnQkFDakIsbURBQXVCO2dCQUN2QiwwQ0FBbUI7YUFDdEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsMENBQTRCO2dCQUM1Qix1Q0FBaUI7Z0JBQ2pCLHdCQUFVO2dCQUNWLG1EQUF1QjtnQkFDdkIsK0NBQXFCO2dCQUNyQiw0QkFBWTtnQkFFWiw4Q0FBb0I7Z0JBQ3BCLDRDQUFlO2dCQUNmLHNDQUFpQjtnQkFDakIsOEJBQWE7Z0JBQ2IsNEJBQVk7Z0JBQ1osa0NBQWU7Z0JBQ2YsK0NBQXFCO2dCQUNyQixzQ0FBZ0I7YUFHbkI7WUFDRCxTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO1NBQzVCLENBQUM7T0FDVyxTQUFTLENBRXJCO0lBQUQsZ0JBQUM7Q0FBQSxBQUZELElBRUM7QUFGWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAtY2xpZW50XCI7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmF0aXZlU2NyaXB0TW9kdWxlfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlJztcbmltcG9ydCB7QXBwUm91dGluZ01vZHVsZX0gZnJvbSAnLi9hcHAtcm91dGluZy5tb2R1bGUnO1xuaW1wb3J0IHtBcHBDb21wb25lbnR9IGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XG5pbXBvcnQge0hvbWVDb21wb25lbnR9IGZyb20gJy4vaG9tZS9ob21lLmNvbXBvbmVudCc7XG5pbXBvcnQge0Fib3V0Q29tcG9uZW50fSBmcm9tICcuL2Fib3V0L2Fib3V0LmNvbXBvbmVudCc7XG5pbXBvcnQge0NvbnRhY3RDb21wb25lbnR9IGZyb20gJy4vY29udGFjdC9jb250YWN0LmNvbXBvbmVudCc7XG5pbXBvcnQge1Byb2ZpbGVDb21wb25lbnR9IGZyb20gJy4vcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudCc7XG5pbXBvcnQge1NoYXJlZE1vZHVsZX0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtNeW9yZGVyc0NvbXBvbmVudH0gZnJvbSAnLi9teW9yZGVycy9teW9yZGVycy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwXCI7XG5pbXBvcnQge2xvZ2luQ29tcG9uZW50fSBmcm9tIFwiLi9sb2dpbi9sb2dpbi5jb21wb25lbnRcIjtcbmltcG9ydCB7c2lnbnVwQ29tcG9uZW50fSBmcm9tIFwiLi9zaWdudXAvc2lnbnVwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCJcbmltcG9ydCB7cmVzdGF1cmFudHNDb21wb25lbnR9IGZyb20gXCIuL3Jlc3RhdXJhbnRzL3Jlc3RhdXJhbnRzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtyZXN0YXVyYW50ZGV0YWlsQ29tcG9uZW50fSBmcm9tIFwiLi9yZXN0YXVyYW50LWRldGFpbC9yZXN0YXVyYW50LWRldGFpbC5jb21wb25lbnRcIjtcbmltcG9ydCB7UmVzdGF1cmFudFNlcnZpY2V9IGZyb20gXCIuL3Jlc3RhdXJhbnRzL3Jlc3RhdXJhbnRzLnNlcnZpY2VcIjtcbmltcG9ydCB7bWFwc0NvbXBvbmVudH0gZnJvbSBcIi4vbWFwcy9tYXBzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHthZGR0b2NhcnRkZXRhaWxDb21wb25lbnR9IGZyb20gXCIuL2FkZC10by1jYXJ0LWRhdGFpbC9hZGQtdG8tY2FydC1kZXRhaWwuY29tcG9uZW50XCI7XG5pbXBvcnQge2FkZG5ld2FkZHJlc3NDb21wb25lbnR9IGZyb20gXCIuL2FkZG5ld2FkZHJlc3MvYWRkLW5ldy1hZGRyZXNzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtkZWxpdmVyeWFkZHJlc3NDb21wb25lbnR9IGZyb20gXCIuL2RlbGl2ZXJ5YWRkcmVzc2VzL2RlbGl2ZXJ5YWRkcmVzcy5jb21wb25lbnRcIjtcbmltcG9ydCB7YWJvdXR1c0NvbXBvbmVudH0gZnJvbSBcIi4vYWJvdXR1cy9hYm91dHVzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDaGVja291dENvbXBvbmVudH0gZnJvbSBcIi4vY2hlY2tvdXQvY2hlY2tvdXQuY29tcG9uZW50XCI7XG5pbXBvcnQge1BheW1lbnRDb21wb25lbnR9IGZyb20gXCIuL3BheW1lbnQvcGF5bWVudC5jb21wb25lbnRcIjtcbmltcG9ydCB7TXlkZXRhaWxDb21wb25lbnR9IGZyb20gXCIuL215ZGV0YWlsL215ZGV0YWlsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTmdTaGFkb3dNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW5nLXNoYWRvd1wiO1xuaW1wb3J0IHttYXBTZXJ2aWNlfSBmcm9tIFwiLi9tYXBzL21hcC5zZXJ2aWNlXCI7XG5pbXBvcnQge1Jlc3RhdXJhbnREZXRhaWxTZXJ2aWNlfSBmcm9tIFwiLi9yZXN0YXVyYW50LWRldGFpbC9yZXN0YXVyYW50LWRldGFpbC5zZXJ2aWNlXCI7XG5pbXBvcnQge0RlbGl2ZXJBZGRyZXNzU2VydmljZX0gZnJvbSBcIi4vZGVsaXZlcnlhZGRyZXNzZXMvZGVsaXZlcnlhZGRyZXNzLnNlcnZpY2VcIjtcbmltcG9ydCB7b3JkZXJTZXJ2aWNlfSBmcm9tIFwiLi9teW9yZGVycy9vcmRlci5zZXJ2aWNlXCI7XG5cblxuaW1wb3J0IHtBZGRuZXdBZGRyZXNzU2VydmljZX0gZnJvbSBcIi4vYWRkbmV3YWRkcmVzcy9hZGQtbmV3LWFkZHJlc3Muc2VydmljZVwiO1xuaW1wb3J0IHtNeWRldGFpbFNlcnZpY2V9IGZyb20gXCIuL215ZGV0YWlsL215ZGV0YWlsLmNvbXBvbmVudC5zZXJ2aWNlXCI7XG5pbXBvcnQge1RyYWNrUmlkZXJDb21wb25lbnR9IGZyb20gXCIuL3RyYWNrLXJpZGVyL3RyYWNrUmlkZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge1RyYWNrUmlkZXJTZXJ2aWNlfSBmcm9tIFwiLi90cmFjay1yaWRlci90cmFja1JpZGVyLnNlcnZpY2VcIjtcbmltcG9ydCB7U2lnbnVwU2VydmljZX0gZnJvbSBcIi4vc2lnbnVwL3NpZ251cC5zZXJ2aWNlXCI7XG5pbXBvcnQge2xvZ2luU2VydmljZX0gZnJvbSBcIi4vbG9naW4vbG9naW4uc2VydmljZVwiO1xuaW1wb3J0IHtDaGVja291dFNlcnZpY2V9IGZyb20gXCIuL2NoZWNrb3V0L2NoZWNrb3V0LnNlcnZpY2VcIjtcbmltcG9ydCB7YWRkVG9DYXJ0U2VydmljZX0gZnJvbSBcIi4vYWRkLXRvLWNhcnQtZGF0YWlsL2FkZC10by1jYXJ0LnNlcnZpY2VcIjtcbmltcG9ydCB7Y2hhbmdlUGFzc3dvcmRDb21wb25lbnR9IGZyb20gXCIuL2NoYW5nZS1wYXNzd29yZC9jaGFuZ2UtcGFzc3dvcmQuY29tcG9uZW50XCI7XG5pbXBvcnQge2NoYW5nZVBhc3N3b3JkU2VydmljZX0gZnJvbSBcIi4vY2hhbmdlLXBhc3N3b3JkL2NoYW5nZS1wYXNzd29yZC5zZXJ2aWNlXCI7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcblxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxuICAgICAgICBTaGFyZWRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgICAgICBOZ1NoYWRvd01vZHVsZSxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBDb21wb25lbnQsXG4gICAgICAgIEhvbWVDb21wb25lbnQsXG4gICAgICAgIEFib3V0Q29tcG9uZW50LFxuICAgICAgICBDb250YWN0Q29tcG9uZW50LFxuICAgICAgICBQcm9maWxlQ29tcG9uZW50LFxuICAgICAgICBNeW9yZGVyc0NvbXBvbmVudCxcbiAgICAgICAgbG9naW5Db21wb25lbnQsXG4gICAgICAgIHNpZ251cENvbXBvbmVudCxcbiAgICAgICAgcmVzdGF1cmFudHNDb21wb25lbnQsXG4gICAgICAgIHJlc3RhdXJhbnRkZXRhaWxDb21wb25lbnQsXG4gICAgICAgIGFkZHRvY2FydGRldGFpbENvbXBvbmVudCxcbiAgICAgICAgbWFwc0NvbXBvbmVudCxcbiAgICAgICAgYWRkbmV3YWRkcmVzc0NvbXBvbmVudCxcbiAgICAgICAgZGVsaXZlcnlhZGRyZXNzQ29tcG9uZW50LFxuICAgICAgICBhYm91dHVzQ29tcG9uZW50LFxuICAgICAgICBQYXltZW50Q29tcG9uZW50LFxuICAgICAgICBDaGVja291dENvbXBvbmVudCxcbiAgICAgICAgTXlkZXRhaWxDb21wb25lbnQsXG4gICAgICAgIGNoYW5nZVBhc3N3b3JkQ29tcG9uZW50LFxuICAgICAgICBUcmFja1JpZGVyQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSxcbiAgICAgICAgUmVzdGF1cmFudFNlcnZpY2UsXG4gICAgICAgIG1hcFNlcnZpY2UsXG4gICAgICAgIFJlc3RhdXJhbnREZXRhaWxTZXJ2aWNlLFxuICAgICAgICBEZWxpdmVyQWRkcmVzc1NlcnZpY2UsXG4gICAgICAgIG9yZGVyU2VydmljZSxcblxuICAgICAgICBBZGRuZXdBZGRyZXNzU2VydmljZSxcbiAgICAgICAgTXlkZXRhaWxTZXJ2aWNlLFxuICAgICAgICBUcmFja1JpZGVyU2VydmljZSxcbiAgICAgICAgU2lnbnVwU2VydmljZSxcbiAgICAgICAgbG9naW5TZXJ2aWNlLFxuICAgICAgICBDaGVja291dFNlcnZpY2UsXG4gICAgICAgIGNoYW5nZVBhc3N3b3JkU2VydmljZSxcbiAgICAgICAgYWRkVG9DYXJ0U2VydmljZVxuXG5cbiAgICBdLFxuICAgIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHtcblxufVxuIl19