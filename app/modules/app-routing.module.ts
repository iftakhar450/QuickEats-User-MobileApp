import { NgModule } from '@angular/core';

import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { loginComponent } from "./login/login.component";
import { signupComponent } from "./signup/signup.component";
import { restaurantsComponent } from "./restaurants/restaurants.component";
import { restaurantdetailComponent } from "./restaurant-detail/restaurant-detail.component";
import { addtocartdetailComponent } from "./add-to-cart-datail/add-to-cart-detail.component";
import { MyordersComponent } from "./myorders/myorders.component";
import { mapsComponent } from "./maps/maps.component";
import { addnewaddressComponent } from "./addnewaddress/add-new-address.component";
import {deliveryaddressComponent} from "./deliveryaddresses/deliveryaddress.component";
import {aboutusComponent} from "./aboutus/aboutus.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {PaymentComponent} from "./payment/payment.component";
import {MydetailComponent} from "./mydetail/mydetail.component";
import {TrackRiderComponent} from "./track-rider/trackRider.component";
import {changePasswordComponent} from "./change-password/change-password.component";

@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot([
        { path: "", component: restaurantsComponent },
        { path: "about", component: AboutComponent },
        { path: "contact", component: ContactComponent },
        { path: "myorders", component: MyordersComponent },
        { path: "login", component: loginComponent },
        { path: "signup", component: signupComponent },
        { path: "restaurants", component: restaurantsComponent },
        { path: "restaurants-detail/:id", component: restaurantdetailComponent },
        { path: "restaurants-detail", component: restaurantdetailComponent },
        { path: "add-to-cart-detail", component: addtocartdetailComponent },
        { path: "map", component: mapsComponent },
        { path: "checkout/:totalPrice", component: CheckoutComponent},
        { path: "payment", component: PaymentComponent},
        { path: "add-new-address", component: addnewaddressComponent },
        { path: "deliveryaddress", component: deliveryaddressComponent },
        { path: "aboutus", component: aboutusComponent },
        { path: "mydetail", component: MydetailComponent },
        { path: 'about', component: AboutComponent },
        { path: 'contact', component: ContactComponent },
        { path: 'home', component: HomeComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'trackrider/:orderid', component: TrackRiderComponent },
        { path: 'changepassword', component: changePasswordComponent },
        { path: 'logout', component: restaurantsComponent }

    ])
  ],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {

}
