import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {getString} from "tns-core-modules/application-settings";
import {Orders} from "./userOrders";

@Injectable()
export class orderService {

 static ordersFromService:Orders[]=[];
 static ordersLength;

    private serverUrl = "http://46.101.88.80:81";

    constructor(private http: Http) { }
    getUserOrderDetailFromApi(id) {
        let headers = this.createRequestHeader();
        return this.http.get(this.serverUrl+"/get/orders/detail/"+id, { headers: headers })
            .map(res => res);
    }






    createRequestHeader() {
        let headers = new Headers();
        let user_token=getString("access_token");
        //headers.set("AuthKey", "my-key");
        headers.set("token", user_token);
        headers.append("Content-Type", "application/json");

        return headers;
    }

}
