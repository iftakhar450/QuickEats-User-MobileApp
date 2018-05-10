import {NativeScriptHttpClientModule} from "nativescript-angular/http-client";
import {NgModule} from '@angular/core';
import {NativeScriptModule} from 'nativescript-angular/nativescript.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {ProfileComponent} from './profile/profile.component';
import {SharedModule} from './shared';
import {MyordersComponent} from './myorders/myorders.component';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import {loginComponent} from "./login/login.component";
import {signupComponent} from "./signup/signup.component";
import {NativeScriptFormsModule} from "nativescript-angular/forms"
import {restaurantsComponent} from "./restaurants/restaurants.component";
import {restaurantdetailComponent} from "./restaurant-detail/restaurant-detail.component";
import {RestaurantService} from "./restaurants/restaurants.service";
import {mapsComponent} from "./maps/maps.component";
import {addtocartdetailComponent} from "./add-to-cart-datail/add-to-cart-detail.component";
import {addnewaddressComponent} from "./addnewaddress/add-new-address.component";
import {deliveryaddressComponent} from "./deliveryaddresses/deliveryaddress.component";
import {aboutusComponent} from "./aboutus/aboutus.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {PaymentComponent} from "./payment/payment.component";
import {MydetailComponent} from "./mydetail/mydetail.component";
import { NgShadowModule } from "nativescript-ng-shadow";
import {mapService} from "./maps/map.service";
import {RestaurantDetailService} from "./restaurant-detail/restaurant-detail.service";
import {DeliverAddressService} from "./deliveryaddresses/deliveryaddress.service";
import {orderService} from "./myorders/order.service";


import {AddnewAddressService} from "./addnewaddress/add-new-address.service";
import {MydetailService} from "./mydetail/mydetail.component.service";
import {TrackRiderComponent} from "./track-rider/trackRider.component";
import {TrackRiderService} from "./track-rider/trackRider.service";
import {SignupService} from "./signup/signup.service";
import {loginService} from "./login/login.service";
import {CheckoutService} from "./checkout/checkout.service";
import {addToCartService} from "./add-to-cart-datail/add-to-cart.service";
import {changePasswordComponent} from "./change-password/change-password.component";
import {changePasswordService} from "./change-password/change-password.service";


@NgModule({
    imports: [
        NativeScriptModule,
        AppRoutingModule,

        NativeScriptHttpClientModule,
        NativeScriptHttpModule,
        SharedModule,
        NativeScriptFormsModule,
        NgShadowModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        ContactComponent,
        ProfileComponent,
        MyordersComponent,
        loginComponent,
        signupComponent,
        restaurantsComponent,
        restaurantdetailComponent,
        addtocartdetailComponent,
        mapsComponent,
        addnewaddressComponent,
        deliveryaddressComponent,
        aboutusComponent,
        PaymentComponent,
        CheckoutComponent,
        MydetailComponent,
        changePasswordComponent,
        TrackRiderComponent
    ],
    providers: [
        NativeScriptHttpClientModule,
        RestaurantService,
        mapService,
        RestaurantDetailService,
        DeliverAddressService,
        orderService,

        AddnewAddressService,
        MydetailService,
        TrackRiderService,
        SignupService,
        loginService,
        CheckoutService,
        changePasswordService,
        addToCartService


    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
