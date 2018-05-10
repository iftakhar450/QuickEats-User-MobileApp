import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {getString} from "tns-core-modules/application-settings";
import {itemdetail} from "../restaurant-detail/itemdetail";

@Injectable()
export class addToCartService {




    static user_cart:itemdetail[]=[];
    private serverUrl = "http://46.101.88.80:81";

    constructor(private http: Http) { }




    get_From_Cart(id) {
        let headers = this.createRequestHeader();

        return this.http.get(this.serverUrl+"/get/cart/"+id, { headers: headers })
            .map(res => res);
    }
    del_cart_item(id) {
        let headers = this.createDelHeader();
        return this.http.get(this.serverUrl+"/del/cart/"+id, { headers: headers })
            .map(res => res);
    }

    private createRequestHeader() {
        let headers = new Headers();
        // set headers here e.g.
        //  headers.append("AuthKey", "my-key");
        headers.append("Content-Type", "application/json");

        return headers;
    }
    private createDelHeader() {
        let headers = new Headers();
        // set headers here e.g.
        //  headers.append("AuthKey", "my-key");
        headers.append("Content-Type", "application/json");

        return headers;
    }


}
