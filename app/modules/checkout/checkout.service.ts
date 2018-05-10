import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {getString} from "tns-core-modules/application-settings";

@Injectable()
export class CheckoutService {




    private serverUrl = "http://46.101.88.80:81";

    constructor(private http: Http) { }


    getlatlonfromapi(pc) {
        let headers = this.createRequestHeader();
        return this.http.get(this.serverUrl+"/get/latlon/"+pc, { headers: headers })
            .map(res => res);
    }

    post_order(data: any) {
        let options = this.headerForOrder();
        return this.http.post(this.serverUrl+"/post/order", { data }, { headers: options })
            .map(res => res);
    }

    private headerForOrder() {

        let headers = new Headers();
        let user_token=getString("access_token");
        //  headers.set("AuthKey", "my-key");
        headers.set("token", user_token);
        headers.set("Content-Type", "application/json");
        return headers;
    }

    removeusercartapi(id) {
        let headers = this.createRequestHeader();
        return this.http.get(this.serverUrl+"/remove/cart/"+id, { headers: headers })
            .map(res => res);
    }



    createRequestHeader() {
        let headers = new Headers();
        let token=getString("access_token");
        // set headers here e.g.
        //  headers.append("AuthKey", "my-key");
        headers.append("token",token );
        headers.append("Content-Type", "application/json");

        return headers;
    }

}
