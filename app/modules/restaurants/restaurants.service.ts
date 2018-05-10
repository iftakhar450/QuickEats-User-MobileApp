import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import {Restaurant} from "./resturants";
import { Http, Headers } from "@angular/http";
import {Page} from "ui/page";
import {getString} from "tns-core-modules/application-settings";
import {itemdetail} from "../restaurant-detail/itemdetail";

@Injectable()
export class RestaurantService {
   /* public restaurants = new Array<Restaurant>(
        { id: 1, name: "Rola Wala", url:"http://image.cleveland.com/home/cleve-media/width620/img/dining-guide/photo/cleveland-classic-restaurants-aldos-8e76cfa14bae1238.jpg", items: "Items", rating: "Rating", delivery_time: "20-30" },
        { id: 2, name: "LEON", url: "https://data.luebeck-tourismus.de/typo3temp/GB/csm_shutterstock_73748515_01_cf1fd34057_519ffe33ac.jpg", items: "Items", rating: "Rating", delivery_time: "20-30" },
        { id: 3, name: "LYSS", url: "http://stz.india.com/sites/default/files/styles/zeebiz_850x478/public/2017/06/21/20710-service2-pixabay.jpg", items: "Items", rating: "Rating", delivery_time: "20-30" },
        { id: 4, name: "WUWY", url: "http://svcdn.simpleviewinc.com/v3/cache/www_visitlagunabeach_com/A1CF40555EF76CBFA43D9747C3B492C9.jpg", items: "Items", rating: "Rating", delivery_time: "20-30" },
      
    );*/

    private serverUrl = "http://46.101.88.80:81";
    public static add_to_cart_items:itemdetail[]=[];///make static to use in add_to_cart detail
    public restaurants:Array<Restaurant> = new Array<Restaurant>();



    constructor(private http: Http,private page:Page) { }
    getRestaurants(data: any) {
        console.log("from service"+JSON.stringify(data));
        let options = this.createRequestOptions();
        return this.http.post(this.serverUrl + "/restaurant/getrestaurants", {data}, {headers: options})
            .map(res => res);
    }
    searchRestaurantsfromapi(postalCode: any) {
        console.log("Postal Code "+postalCode);
        let options = this.createRequestOptions();
        return this.http.post(this.serverUrl + "/search/restaurants", {postalCode:postalCode}, {headers: options})
            .map(res => res);
    }



    getRestaurant(id: number){
        //console.log(this.restaurants[0].name);
        return this.restaurants.filter(item => item.id === id)[0];
    }





    getaddress_from_api(lat:any,lon:any) {
        let headers = this.createRequestHeader();

        return this.http.get(this.serverUrl+"/get/postalcode/"+lat+"/"+lon, { headers: headers })
            .map(res => res);
    }
    update_firebase_token(data) {
        let headers = this.createRequestHeader();

        return this.http.put(this.serverUrl+"/user/update/firebase",{data} ,{ headers: headers })
            .map(res => res);
    }

    private createRequestHeader() {
        let headers = new Headers();
        let user_token=getString("access_token");
        //headers.set("AuthKey", "my-key");
        headers.append("token", user_token);
        headers.append("Content-Type", "application/json");

        return headers;
    }

    private createRequestOptions() {
        let headers = new Headers();
        let user_token=getString("access_token");
        //headers.set("AuthKey", "my-key");
        //headers.set("token", user_token);
        headers.set("Content-Type", "application/json");
        return headers;
    }



}
