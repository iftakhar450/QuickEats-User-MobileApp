import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {getString} from "tns-core-modules/application-settings";
import { Http, Headers } from "@angular/http";
@Injectable()
export class DeliverAddressService {




    private serverUrl = "http://46.101.88.80:81";

    constructor(private http: Http) { }



    get_user_locations_from_api(id) {

        let headers = this.createRequestHeader();

        return this.http.get(this.serverUrl+"/get/user/locations/"+id, { headers: headers })
            .map(res => res);
    }



    private createRequestHeader() {
        let headers = new Headers();
        // set headers here e.g.
        let user_token=getString("access_token");
        //headers.set("AuthKey", "my-key");
        headers.append("token", user_token);
        headers.append("Content-Type", "application/json");


        return headers;
    }

}
