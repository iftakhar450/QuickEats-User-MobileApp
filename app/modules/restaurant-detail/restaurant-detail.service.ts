import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {getString} from "tns-core-modules/application-settings";

@Injectable()
export class RestaurantDetailService {
    private serverUrl = "http://46.101.88.80:81";

    constructor(private http: Http) { }

    getData(id:number) {
        //console.log(id+"service");
        let headers = this.createRequestHeader();
        return this.http.get(this.serverUrl+"/restaurant/getrestaurantdetail/"+id, { headers: headers })
            .map(res => res);
    }

    getResponseInfo() {
        let headers = this.createRequestHeader();
        return this.http.get(this.serverUrl, { headers: headers })
            .do(res =>  res);
    }

    private createRequestHeader() {
        let headers = new Headers();
        let user_token=getString("access_token");
        //headers.set("AuthKey", "my-key");
        headers.append("token", user_token);
        headers.append("Content-Type", "application/json");

        return headers;
    }
    post_to_cart(data: any) {
        console.log(JSON.stringify(data));
        let options = this.headerForCart();
        return this.http.post(this.serverUrl+"/device/cart", { data }, { headers: options })
            .map(res => res);
    }

    private headerForCart() {

        let headers = new Headers();
        //  headers.set("AuthKey", "my-key");
        //  headers.set("AuthToken", "my-token");
        headers.set("Content-Type", "application/json");
        return headers;
    }

}